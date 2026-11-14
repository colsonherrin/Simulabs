using UnityEngine;

namespace Simulacra
{
    /// <summary>
    /// Brings a humanoid to life with no animation clips at all: arms at the sides, a walk cycle
    /// whose stride is derived from the distance actually covered (so the feet cannot slide),
    /// breathing and weight shift when standing, and head-and-neck gaze toward the user.
    /// Used automatically when the avatar's Animator has no controller; a character with real clips
    /// (see the avatar setup tool) uses those instead. Works on any humanoid rig: every rotation is
    /// applied in body space, not in the rig's own bone axes, and bones are found by Humanoid
    /// mapping or by name (see BoneFinder), so a Generic import works too.
    /// </summary>
    [DefaultExecutionOrder(-50)] // before gestures and lip sync, which layer on top
    public class ProceduralHumanoid : MonoBehaviour
    {
        public AvatarController body;
        /// <summary>Normally the wearer's head.</summary>
        public Transform lookTarget;

        public float swingDegrees = 24f;

        private Transform[] _bones;
        private Quaternion[] _rest;
        private Transform _hips;
        private Vector3 _hipsRest;
        private float _legLength = 0.85f, _phase, _walk, _look;
        private Vector3 _focus;
        private float _focusUntil;

        private const int Spine = 0, Chest = 1, Neck = 2, Head = 3, LUA = 4, LLA = 5, RUA = 6, RLA = 7, LUL = 8, LLL = 9, RUL = 10, RLL = 11, Hips = 12;
        private static readonly HumanBodyBones[] Map =
        {
            HumanBodyBones.Spine, HumanBodyBones.Chest, HumanBodyBones.Neck, HumanBodyBones.Head,
            HumanBodyBones.LeftUpperArm, HumanBodyBones.LeftLowerArm, HumanBodyBones.RightUpperArm, HumanBodyBones.RightLowerArm,
            HumanBodyBones.LeftUpperLeg, HumanBodyBones.LeftLowerLeg, HumanBodyBones.RightUpperLeg, HumanBodyBones.RightLowerLeg,
            HumanBodyBones.Hips,
        };

        private void Start()
        {
            if (!BoneFinder.HasLegsAndArms(gameObject)) { enabled = false; return; }
            _bones = new Transform[Map.Length];
            _rest = new Quaternion[Map.Length];
            for (int i = 0; i < Map.Length; i++)
            {
                _bones[i] = BoneFinder.Find(gameObject, Map[i]);
                if (_bones[i] != null) _rest[i] = _bones[i].localRotation;
            }
            _hips = _bones[Hips];
            if (_hips != null) _hipsRest = _hips.localPosition;
            Transform foot = BoneFinder.Find(gameObject, HumanBodyBones.LeftFoot);
            if (_bones[LUL] != null && _bones[LLL] != null && foot != null)
                _legLength = Vector3.Distance(_bones[LUL].position, _bones[LLL].position) + Vector3.Distance(_bones[LLL].position, foot.position);
        }

        /// <summary>Look at a world point for a few seconds, then back to the user.</summary>
        public void Focus(Vector3 point, float seconds = 3f)
        {
            _focus = point;
            _focusUntil = Time.time + seconds;
        }

        private void LateUpdate()
        {
            if (_bones == null) return;
            // Start every frame from the bind pose: nothing here accumulates.
            for (int i = 0; i < _bones.Length; i++) if (_bones[i] != null) _bones[i].localRotation = _rest[i];
            if (_hips != null) _hips.localPosition = _hipsRest;

            Transform root = body != null ? body.transform : transform;
            Vector3 right = root.right, fwd = root.forward, up = Vector3.up;
            float dt = Time.deltaTime, t = Time.time;

            // Arms hang at the sides whatever the bind pose (T or A).
            HangArm(_bones[LUA], _bones[LLA], -right);
            HangArm(_bones[RUA], _bones[RLA], right);
            Turn(_bones[LLA], right, -14f);
            Turn(_bones[RLA], right, -14f);

            // Walk: phase advances with distance covered, so one stride on screen is one stride of travel.
            float speed = body != null ? body.GroundSpeed : 0f;
            float full = body != null ? Mathf.Max(0.1f, body.walkSpeed) : 1f;
            _walk = Mathf.MoveTowards(_walk, speed > 0.06f ? 1f : 0f, dt * 4f);
            float swing = swingDegrees * Mathf.Clamp(speed / full, 0.35f, 1.2f);
            float cycleMetres = Mathf.Max(0.25f, 4f * _legLength * Mathf.Sin(swing * Mathf.Deg2Rad));
            _phase += 2f * Mathf.PI * speed * dt / cycleMetres;
            float s = Mathf.Sin(_phase), c = Mathf.Cos(_phase);

            Turn(_bones[LUL], right, -s * swing * _walk);                 // negative about the right axis = forward
            Turn(_bones[RUL], right, s * swing * _walk);
            Turn(_bones[LLL], right, Mathf.Max(0f, c) * 34f * _walk);    // the knee bends as the leg comes through
            Turn(_bones[RLL], right, Mathf.Max(0f, -c) * 34f * _walk);
            Turn(_bones[LUA], right, s * swing * 0.6f * _walk);           // arms counter-swing
            Turn(_bones[RUA], right, -s * swing * 0.6f * _walk);
            if (_hips != null) _hips.position += up * ((Mathf.Abs(c) - 0.6f) * 0.018f * _walk);

            // Standing: breathe and shift weight a little, never perfectly still.
            float still = 1f - _walk;
            // Applied to the chest, not the lower spine: on Biped rigs the thighs hang off the spine,
            // and swaying it would drag the feet across the floor.
            Transform torso = _bones[Chest] != null ? _bones[Chest] : _bones[Neck];
            Turn(torso, right, Mathf.Sin(t * 1.5f) * 1.1f);
            Turn(torso, fwd, Mathf.Sin(t * 0.43f) * 1.4f * still);
            Turn(torso, up, Mathf.Sin(t * 0.31f + 1f) * 2f * still);

            // Gaze: neck and head share a turn toward the user (or the thing just mentioned).
            Transform head = _bones[Head];
            if (head == null) return;
            Vector3 target;
            bool has = true;
            if (Time.time < _focusUntil) target = _focus;
            else if (lookTarget != null) target = lookTarget.position;
            else { target = default; has = false; }
            Vector3 to = target - head.position;
            Vector3 flat = new Vector3(to.x, 0f, to.z);
            bool inFront = has && flat.sqrMagnitude > 0.01f && Vector3.Angle(fwd, flat) < 75f;
            _look = Mathf.MoveTowards(_look, inFront ? 1f : 0f, dt * 2.5f);
            if (_look > 0.001f && to.sqrMagnitude > 1e-4f)
            {
                Quaternion full360 = Quaternion.FromToRotation(fwd, to.normalized);
                if (_bones[Neck] != null) _bones[Neck].rotation = Quaternion.Slerp(Quaternion.identity, full360, 0.3f * _look) * _bones[Neck].rotation;
                head.rotation = Quaternion.Slerp(Quaternion.identity, full360, 0.45f * _look) * head.rotation;
            }
        }

        private static void Turn(Transform bone, Vector3 axis, float degrees)
        {
            if (bone != null && degrees != 0f) bone.rotation = Quaternion.AngleAxis(degrees, axis) * bone.rotation;
        }

        private static void HangArm(Transform upper, Transform lower, Vector3 side)
        {
            if (upper == null || lower == null) return;
            Vector3 current = lower.position - upper.position;
            if (current.sqrMagnitude < 1e-6f) return;
            Vector3 wanted = (Vector3.down + side * 0.13f).normalized;
            upper.rotation = Quaternion.FromToRotation(current.normalized, wanted) * upper.rotation;
        }
    }
}
