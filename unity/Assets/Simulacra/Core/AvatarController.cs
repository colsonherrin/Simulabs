using System;
using System.Collections;
using UnityEngine;
using UnityEngine.AI;

namespace Simulacra
{
    /// <summary>
    /// The avatar's body: NavMeshAgent locomotion plus Animator parameters derived from actual
    /// movement. Knows nothing about the AI; it takes validated world positions and reports
    /// success or failure.
    ///
    /// Animator contract (all optional): float "Speed" (m/s), float "Turn" (-1..1), bool "Speaking".
    /// </summary>
    [RequireComponent(typeof(NavMeshAgent))]
    public class AvatarController : MonoBehaviour
    {
        public float walkSpeed = 0.9f;
        public float turnSpeedDegrees = 200f;

        public string State { get; private set; } = "idle"; // idle | walking | turning
        public bool IsBusy => _routine != null;

        private NavMeshAgent _agent;
        private Animator _animator;
        private bool _hasSpeed, _hasTurn;
        private Coroutine _routine;
        private Action<bool, string> _done;
        private float _animSpeed, _animTurn, _lastYaw;

        private void Awake()
        {
            _agent = GetComponent<NavMeshAgent>();
            _agent.radius = RoomNavMesh.AgentRadius;
            _agent.height = RoomNavMesh.AgentHeight;
            _agent.speed = walkSpeed;
            _agent.acceleration = 3f;
            _agent.angularSpeed = turnSpeedDegrees;
            _agent.stoppingDistance = 0.05f;
            _agent.autoBraking = true;
            _agent.obstacleAvoidanceType = ObstacleAvoidanceType.NoObstacleAvoidance;
            _agent.enabled = false; // enabled once a NavMesh exists under us
        }

        private void Start()
        {
            _animator = GetComponentInChildren<Animator>();
            if (_animator != null)
            {
                _animator.applyRootMotion = false; // the agent moves us; clips should be in-place
                foreach (var p in _animator.parameters)
                {
                    if (p.name == "Speed") _hasSpeed = true;
                    if (p.name == "Turn") _hasTurn = true;
                }
            }
            _lastYaw = transform.eulerAngles.y;
        }

        /// <summary>Put the avatar on the NavMesh at (or near) a position. False if there is no floor there.</summary>
        public bool PlaceAt(Vector3 position, Vector3 lookAt)
        {
            if (!RoomNavMesh.Snap(position, 2f, out Vector3 snapped)) return false;
            Cancel("repositioned");
            _agent.enabled = false;
            transform.position = snapped;
            FaceInstant(lookAt);
            _agent.enabled = true;
            return _agent.isOnNavMesh;
        }

        public bool OnNavMesh => _agent.enabled && _agent.isOnNavMesh;

        /// <summary>Call after the NavMesh was rebuilt.</summary>
        public void Reattach()
        {
            Cancel("navmesh rebuilt");
            _agent.enabled = false;
            if (RoomNavMesh.Snap(transform.position, 3f, out Vector3 snapped))
            {
                transform.position = snapped;
                _agent.enabled = true;
            }
        }

        /// <summary>Walk to a point. The destination must already be validated to be on the NavMesh.</summary>
        public void WalkTo(Vector3 destination, Vector3? faceAfter, Action<bool, string> done)
        {
            Cancel("superseded by a newer action");
            _done = done;
            _routine = StartCoroutine(WalkRoutine(destination, faceAfter));
        }

        public void Face(Vector3 point, Action<bool, string> done)
        {
            Cancel("superseded by a newer action");
            _done = done;
            _routine = StartCoroutine(FaceRoutine(point));
        }

        public void Stop()
        {
            Cancel("stopped");
        }

        private void Cancel(string reason)
        {
            if (_routine != null) StopCoroutine(_routine);
            _routine = null;
            if (_agent.enabled && _agent.isOnNavMesh) _agent.ResetPath();
            State = "idle";
            var cb = _done;
            _done = null;
            cb?.Invoke(false, reason);
        }

        private void Finish(bool ok, string reason)
        {
            _routine = null;
            if (_agent.enabled && _agent.isOnNavMesh) _agent.ResetPath();
            State = "idle";
            var cb = _done;
            _done = null;
            cb?.Invoke(ok, reason);
        }

        private IEnumerator WalkRoutine(Vector3 destination, Vector3? faceAfter)
        {
            if (!OnNavMesh) { Finish(false, "the avatar is not standing on walkable floor"); yield break; }

            var path = new NavMeshPath();
            if (!_agent.CalculatePath(destination, path) || path.status != NavMeshPathStatus.PathComplete)
            {
                Finish(false, "no clear path to that spot");
                yield break;
            }

            if (Vector3.Distance(transform.position, destination) > 0.15f)
            {
                // Turn toward the first leg before stepping off, like a person would.
                Vector3 firstLeg = path.corners.Length > 1 ? path.corners[1] : destination;
                yield return TurnToward(firstLeg, 25f);

                State = "walking";
                _agent.updateRotation = true;
                _agent.SetPath(path);

                float timeout = Time.time + 12f + PathLength(path) / Mathf.Max(0.1f, walkSpeed) * 2f;
                Vector3 lastPos = transform.position;
                float lastProgress = Time.time;
                while (_agent.pathPending || _agent.remainingDistance > _agent.stoppingDistance + 0.03f)
                {
                    if (_agent.pathStatus != NavMeshPathStatus.PathComplete) { Finish(false, "the path became blocked"); yield break; }
                    if (Vector3.Distance(transform.position, lastPos) > 0.05f) { lastPos = transform.position; lastProgress = Time.time; }
                    if (Time.time - lastProgress > 2.5f) { Finish(false, "got stuck on the way"); yield break; }
                    if (Time.time > timeout) { Finish(false, "took too long to get there"); yield break; }
                    yield return null;
                }
                _agent.ResetPath();
            }

            if (faceAfter.HasValue) yield return TurnToward(faceAfter.Value, 4f);
            Finish(true, null);
        }

        private IEnumerator FaceRoutine(Vector3 point)
        {
            yield return TurnToward(point, 4f);
            Finish(true, null);
        }

        private IEnumerator TurnToward(Vector3 point, float toleranceDegrees)
        {
            Vector3 dir = point - transform.position;
            dir.y = 0f;
            if (dir.sqrMagnitude < 1e-4f) yield break;
            Quaternion target = Quaternion.LookRotation(dir.normalized, Vector3.up);
            State = "turning";
            _agent.updateRotation = false;
            float giveUp = Time.time + 4f;
            while (Quaternion.Angle(transform.rotation, target) > toleranceDegrees && Time.time < giveUp)
            {
                transform.rotation = Quaternion.RotateTowards(transform.rotation, target, turnSpeedDegrees * Time.deltaTime);
                yield return null;
            }
            _agent.updateRotation = true;
        }

        private void FaceInstant(Vector3 point)
        {
            Vector3 dir = point - transform.position;
            dir.y = 0f;
            if (dir.sqrMagnitude > 1e-4f) transform.rotation = Quaternion.LookRotation(dir.normalized, Vector3.up);
        }

        private static float PathLength(NavMeshPath path)
        {
            float len = 0f;
            for (int i = 1; i < path.corners.Length; i++) len += Vector3.Distance(path.corners[i - 1], path.corners[i]);
            return len;
        }

        private void Update()
        {
            // Animation follows what the body is really doing, not what was requested.
            float dt = Mathf.Max(Time.deltaTime, 1e-4f);
            float speed = _agent.enabled ? _agent.velocity.magnitude : 0f;
            float yaw = transform.eulerAngles.y;
            float yawRate = Mathf.DeltaAngle(_lastYaw, yaw) / dt;
            _lastYaw = yaw;

            _animSpeed = Mathf.Lerp(_animSpeed, speed, 1f - Mathf.Exp(-10f * dt));
            _animTurn = Mathf.Lerp(_animTurn, Mathf.Clamp(yawRate / turnSpeedDegrees, -1f, 1f), 1f - Mathf.Exp(-10f * dt));
            if (_animator != null)
            {
                if (_hasSpeed) _animator.SetFloat("Speed", _animSpeed);
                if (_hasTurn) _animator.SetFloat("Turn", _animTurn);
            }
        }
    }
}
