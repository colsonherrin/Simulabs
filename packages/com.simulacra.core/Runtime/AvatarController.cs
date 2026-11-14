using System;
using System.Collections;
using UnityEngine;
using UnityEngine.AI;

namespace Simulacra
{
    /// <summary>
    /// The avatar's body: real-time local navigation plus Animator parameters derived from actual
    /// movement. It runs every frame on the device and never waits for the AI: it plans paths,
    /// replans when the destination moves or the NavMesh is rebuilt, detects being stuck, and
    /// reports the outcome through a callback.
    ///
    /// Animator contract (all optional): float "Speed" (0 = standing, 1 = walking at walkSpeed),
    /// float "Turn" (-1..1), float "MotionSpeed" (playback rate that keeps feet from sliding),
    /// bool "Speaking".
    /// </summary>
    [RequireComponent(typeof(NavMeshAgent))]
    public class AvatarController : MonoBehaviour
    {
        /// <summary>Returns where to stand and what to face, or false if the target cannot be reached right now.</summary>
        public delegate bool GoalProvider(out Vector3 stand, out Vector3 face);

        public float walkSpeed = 1.0f;
        public float turnSpeedDegrees = 200f;
        [Tooltip("Ground speed in m/s that the walk clip was animated for. Tune on the headset until the feet stop sliding: raise it if the feet slip backwards, lower it if they skate forwards.")]
        public float walkClipSpeed = 1.4f;

        /// <summary>The rendered body (child of this root). Kept exactly on the physical floor.</summary>
        public Transform visual;
        /// <summary>Optional things lying on the floor under the avatar (a contact shadow).</summary>
        public Transform groundDecal;
        private float _groundY;
        private bool _hasGround;
        private float _visualLift;

        /// <summary>
        /// The physical floor height. A NavMesh sits a few centimetres off the real surface (it is
        /// voxelised), so the body is pinned to the measured floor instead of the mesh.
        /// </summary>
        public void SetGround(float floorY)
        {
            _groundY = floorY;
            _hasGround = true;
            if (visual != null && _visualLift == 0f) _visualLift = visual.localPosition.y;
        }

        private void LateUpdate()
        {
            if (!_hasGround) return;
            if (visual != null) { Vector3 p = visual.position; p.y = _groundY + _visualLift; visual.position = p; }
            if (groundDecal != null) { Vector3 p = groundDecal.position; p.y = _groundY + 0.006f; groundDecal.position = p; }
        }

        public string State { get; private set; } = "idle"; // idle | walking | turning | following

        /// <summary>What the current walk is heading for (the thing to face on arrival), if any.</summary>
        public Vector3? Destination { get; private set; }

        /// <summary>Move the whole body with a correction of the world (tracking relocalised).</summary>
        public void ApplyWorldShift(Matrix4x4 oldToNew)
        {
            bool wasEnabled = _agent.enabled;
            _agent.enabled = false;
            transform.position = oldToNew.MultiplyPoint3x4(transform.position);
            Vector3 fwd = oldToNew.MultiplyVector(transform.forward); fwd.y = 0f;
            if (fwd.sqrMagnitude > 1e-4f) transform.rotation = Quaternion.LookRotation(fwd.normalized, Vector3.up);
            _agent.enabled = wasEnabled;
            if (_routine != null) _replan = true;
        }
        public bool IsBusy => _routine != null;

        /// <summary>Smoothed real ground speed in m/s.</summary>
        public float GroundSpeed => _animSpeed;

        private NavMeshAgent _agent;
        private Animator _animator;
        private bool _hasSpeed, _hasTurn, _hasMotionSpeed;
        private Coroutine _routine;
        private Action<bool, string> _done;
        private float _animSpeed, _animTurn, _lastYaw;
        private bool _replan;

        private void Awake()
        {
            _agent = GetComponent<NavMeshAgent>();
            _agent.radius = RoomNavMesh.AgentRadius;
            _agent.height = RoomNavMesh.AgentHeight;
            _agent.speed = walkSpeed;
            _agent.acceleration = 2.5f;
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
                    if (p.name == "MotionSpeed") _hasMotionSpeed = true;
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

        /// <summary>
        /// Call after the NavMesh was rebuilt (room geometry changed). A walk in progress is not
        /// cancelled: the body re-snaps to the new mesh and replans to the same goal by itself.
        /// </summary>
        public void Reattach()
        {
            _agent.enabled = false;
            if (RoomNavMesh.Snap(transform.position, 3f, out Vector3 snapped))
            {
                transform.position = snapped;
                _agent.enabled = true;
            }
            if (_routine != null) _replan = true;
        }

        /// <summary>
        /// Walk to wherever <paramref name="goal"/> says. The goal is re-evaluated while walking, so a
        /// moving target (the user) or a changed room is handled locally with no AI involvement.
        /// <paramref name="started"/> fires once the first path is planned: (planning ms, path metres).
        /// </summary>
        public void WalkTo(GoalProvider goal, Action<bool, string> done, Action<float, float> started = null)
        {
            Cancel("superseded by a newer action");
            _done = done;
            _routine = StartCoroutine(WalkRoutine(goal, started));
        }

        /// <summary>Stay near a moving point until cancelled by Stop() or another action.</summary>
        public void Follow(Func<Vector3> target, float distance)
        {
            Cancel("superseded by a newer action");
            _done = null;
            _routine = StartCoroutine(FollowRoutine(target, distance));
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
            Finish(false, reason);
        }

        private void Finish(bool ok, string reason)
        {
            _routine = null;
            _replan = false;
            Destination = null;
            if (_agent.enabled && _agent.isOnNavMesh) _agent.ResetPath();
            _agent.updateRotation = true;
            State = "idle";
            var cb = _done;
            _done = null;
            cb?.Invoke(ok, reason);
        }

        private bool Plan(Vector3 stand, NavMeshPath path)
        {
            return _agent.CalculatePath(stand, path) && path.status == NavMeshPathStatus.PathComplete;
        }

        private IEnumerator WalkRoutine(GoalProvider goal, Action<float, float> started)
        {
            if (!OnNavMesh) { Finish(false, "the avatar is not standing on walkable floor"); yield break; }

            var clock = System.Diagnostics.Stopwatch.StartNew();
            var path = new NavMeshPath();
            if (!goal(out Vector3 stand, out Vector3 face)) { Finish(false, "there is no reachable floor next to the target"); yield break; }
            if (!Plan(stand, path)) { Finish(false, "no clear path to that spot"); yield break; }
            Destination = face;
            clock.Stop();
            started?.Invoke((float)clock.Elapsed.TotalMilliseconds, PathLength(path));

            if (Vector3.Distance(transform.position, stand) > 0.15f)
            {
                // Turn toward the first leg before stepping off, like a person would.
                Vector3 firstLeg = path.corners.Length > 1 ? path.corners[1] : stand;
                yield return TurnToward(firstLeg, 25f);

                State = "walking";
                _agent.updateRotation = true;
                if (OnNavMesh) _agent.SetPath(path); else _replan = true;

                float deadline = Time.time + 15f + PathLength(path) / Mathf.Max(0.1f, walkSpeed) * 2.5f;
                Vector3 lastPos = transform.position;
                float lastProgress = Time.time, nextGoalCheck = Time.time + 0.4f;
                while (true)
                {
                    // Local replanning: the target moved, or the room geometry was rebuilt under us.
                    if (_replan || Time.time >= nextGoalCheck)
                    {
                        bool forced = _replan;
                        _replan = false;
                        nextGoalCheck = Time.time + 0.4f;
                        if (!OnNavMesh) { Finish(false, "lost the walkable floor while moving"); yield break; }
                        if (goal(out Vector3 newStand, out Vector3 newFace))
                        {
                            face = newFace;
                            Destination = face;
                            if (forced || (newStand - stand).sqrMagnitude > 0.3f * 0.3f)
                            {
                                if (Plan(newStand, path))
                                {
                                    stand = newStand;
                                    _agent.SetPath(path);
                                    lastProgress = Time.time;
                                }
                                else if (forced) { Finish(false, "the path became blocked"); yield break; }
                            }
                        }
                        else if (forced) { Finish(false, "the target is no longer reachable"); yield break; }
                    }

                    if (!_agent.pathPending && _agent.hasPath && _agent.pathStatus != NavMeshPathStatus.PathComplete) { Finish(false, "the path became blocked"); yield break; }
                    if (!_agent.pathPending && _agent.remainingDistance <= _agent.stoppingDistance + 0.03f) break;
                    if (Vector3.Distance(transform.position, lastPos) > 0.05f) { lastPos = transform.position; lastProgress = Time.time; }
                    if (Time.time - lastProgress > 2.5f) { Finish(false, "got stuck on the way"); yield break; }
                    if (Time.time > deadline) { Finish(false, "took too long to get there"); yield break; }
                    yield return null;
                }
                _agent.ResetPath();
            }

            yield return TurnToward(face, 4f);
            Finish(true, null);
        }

        private IEnumerator FollowRoutine(Func<Vector3> target, float distance)
        {
            float nextPlan = 0f;
            while (true)
            {
                State = "following";
                if (OnNavMesh)
                {
                    Vector3 t = target();
                    Vector3 gap = t - transform.position; gap.y = 0f;
                    if (Time.time >= nextPlan || _replan)
                    {
                        _replan = false;
                        nextPlan = Time.time + 0.4f;
                        // Hysteresis: start walking when the user gets away, not on every small step.
                        if (gap.magnitude > distance + 0.6f && RoomNavMesh.FindStandPoint(t, distance, transform.position, out Vector3 stand))
                        {
                            _agent.updateRotation = true;
                            _agent.SetDestination(stand);
                        }
                    }
                    bool moving = _agent.pathPending || (_agent.hasPath && _agent.remainingDistance > _agent.stoppingDistance + 0.03f);
                    if (!moving && gap.sqrMagnitude > 0.01f && Vector3.Angle(transform.forward, gap) > 30f)
                    {
                        _agent.updateRotation = false;
                        transform.rotation = Quaternion.RotateTowards(transform.rotation, Quaternion.LookRotation(gap.normalized, Vector3.up), turnSpeedDegrees * Time.deltaTime);
                    }
                }
                yield return null;
            }
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
                float normalized = Mathf.Clamp01(_animSpeed / Mathf.Max(0.1f, walkSpeed));
                if (_hasSpeed) _animator.SetFloat("Speed", normalized);
                // Play the walk cycle at the rate that matches real ground speed; leave idle untouched.
                if (_hasMotionSpeed) _animator.SetFloat("MotionSpeed", Mathf.Lerp(1f, walkSpeed / Mathf.Max(0.1f, walkClipSpeed), normalized));
                if (_hasTurn) _animator.SetFloat("Turn", _animTurn);
            }
        }
    }
}
