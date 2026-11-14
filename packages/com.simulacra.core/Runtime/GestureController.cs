using UnityEngine;

namespace Simulacra
{
    /// <summary>
    /// Body gestures: wave, nod, shake_head, shrug. If the Animator has a trigger with the gesture's
    /// name (Wave, Nod, ShakeHead, Shrug) that clip is used; otherwise the gesture is animated
    /// procedurally on the head and arm bones, so it works on any humanoid and on the placeholder.
    /// Non-blocking: it layers on top of whatever locomotion and speech are doing.
    /// </summary>
    public class GestureController : MonoBehaviour
    {
        public Transform head, rightUpperArm, rightLowerArm, leftUpperArm;

        private Animator _animator;
        private string _type;
        private float _time, _duration;
        private bool _animated; // true when an Animator re-poses the bones every frame
        private Quaternion _headRest, _rUpperRest, _rLowerRest, _lUpperRest;

        private void Start()
        {
            _animator = GetComponentInChildren<Animator>();
            _animated = _animator != null && _animator.runtimeAnimatorController != null;
            if (_animator != null && _animator.isHuman)
            {
                if (head == null) head = _animator.GetBoneTransform(HumanBodyBones.Head);
                if (rightUpperArm == null) rightUpperArm = _animator.GetBoneTransform(HumanBodyBones.RightUpperArm);
                if (rightLowerArm == null) rightLowerArm = _animator.GetBoneTransform(HumanBodyBones.RightLowerArm);
                if (leftUpperArm == null) leftUpperArm = _animator.GetBoneTransform(HumanBodyBones.LeftUpperArm);
            }
            if (head != null) _headRest = head.localRotation;
            if (rightUpperArm != null) _rUpperRest = rightUpperArm.localRotation;
            if (rightLowerArm != null) _rLowerRest = rightLowerArm.localRotation;
            if (leftUpperArm != null) _lUpperRest = leftUpperArm.localRotation;
        }

        /// <summary>Start a gesture. Returns false for an unknown type.</summary>
        public bool Play(string type)
        {
            string trigger;
            switch (type)
            {
                case "wave": trigger = "Wave"; _duration = 1.8f; break;
                case "nod": trigger = "Nod"; _duration = 1.0f; break;
                case "shake_head": trigger = "ShakeHead"; _duration = 1.2f; break;
                case "shrug": trigger = "Shrug"; _duration = 1.2f; break;
                default: return false;
            }
            if (_animator != null)
            {
                foreach (var p in _animator.parameters)
                {
                    if (p.name == trigger && p.type == AnimatorControllerParameterType.Trigger) { _animator.SetTrigger(trigger); _type = null; return true; }
                }
            }
            _type = type;
            _time = 0f;
            return true;
        }

        // After the Animator has posed the skeleton.
        private void LateUpdate()
        {
            if (_type == null)
            {
                return;
            }
            _time += Time.deltaTime;
            float u = Mathf.Clamp01(_time / _duration);
            float envelope = Mathf.Sin(u * Mathf.PI); // ease in and out
            Vector3 fwd = transform.forward;

            switch (_type)
            {
                case "nod":
                    Local(head, _headRest, Quaternion.Euler(Mathf.Sin(u * Mathf.PI * 4f) * 12f * envelope, 0f, 0f));
                    break;
                case "shake_head":
                    Local(head, _headRest, Quaternion.Euler(0f, Mathf.Sin(u * Mathf.PI * 5f) * 18f * envelope, 0f));
                    break;
                case "wave":
                    // Rotations are applied in world space around the body's forward axis, so they do
                    // not depend on how a particular rig orients its bones.
                    World(rightUpperArm, _rUpperRest, Quaternion.AngleAxis(140f * envelope, fwd));
                    World(rightLowerArm, _rLowerRest, Quaternion.AngleAxis(Mathf.Sin(u * Mathf.PI * 6f) * 25f * envelope, fwd));
                    break;
                case "shrug":
                    World(rightUpperArm, _rUpperRest, Quaternion.AngleAxis(28f * envelope, fwd));
                    World(leftUpperArm, _lUpperRest, Quaternion.AngleAxis(-28f * envelope, fwd));
                    Local(head, _headRest, Quaternion.Euler(0f, 0f, 6f * envelope));
                    break;
            }

            if (u >= 1f)
            {
                _type = null;
                if (!_animated)
                {
                    // Nothing else will put the bones back.
                    if (head != null) head.localRotation = _headRest;
                    if (rightUpperArm != null) rightUpperArm.localRotation = _rUpperRest;
                    if (rightLowerArm != null) rightLowerArm.localRotation = _rLowerRest;
                    if (leftUpperArm != null) leftUpperArm.localRotation = _lUpperRest;
                }
            }
        }

        private void Local(Transform bone, Quaternion rest, Quaternion offset)
        {
            if (bone == null) return;
            bone.localRotation = (_animated ? bone.localRotation : rest) * offset;
        }

        private void World(Transform bone, Quaternion rest, Quaternion worldOffset)
        {
            if (bone == null) return;
            Quaternion current = _animated ? bone.rotation : (bone.parent != null ? bone.parent.rotation * rest : rest);
            bone.rotation = worldOffset * current;
        }
    }
}
