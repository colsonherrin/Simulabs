using UnityEngine;

namespace Simulacra
{
    /// <summary>
    /// Eye contact: turns the head and eyes of a humanoid toward the user, or briefly toward a thing
    /// being looked at. Uses Unity's built-in humanoid look-at IK, so it needs the Animator layer's
    /// "IK Pass" (the Simulacra avatar setup enables it). Must sit on the Animator's GameObject.
    /// Without IK support it simply does nothing.
    /// </summary>
    public class HeadLook : MonoBehaviour
    {
        /// <summary>Normally the wearer's head.</summary>
        public Transform user;

        private Animator _animator;
        private Vector3 _focus;
        private float _focusUntil;
        private float _weight;

        private void Awake() => _animator = GetComponent<Animator>();

        /// <summary>Look at a world point for a few seconds, then back to the user.</summary>
        public void Focus(Vector3 point, float seconds = 3f)
        {
            _focus = point;
            _focusUntil = Time.time + seconds;
        }

        private void OnAnimatorIK(int layerIndex)
        {
            if (_animator == null) return;
            Vector3 target;
            if (Time.time < _focusUntil) target = _focus;
            else if (user != null) target = user.position;
            else { _animator.SetLookAtWeight(0f); return; }

            // Do not wring the neck: only look at things roughly in front.
            Vector3 to = target - transform.position; to.y = 0f;
            float want = to.sqrMagnitude > 0.01f && Vector3.Angle(transform.forward, to) < 80f ? 1f : 0f;
            _weight = Mathf.MoveTowards(_weight, want, Time.deltaTime * 2.5f);
            _animator.SetLookAtWeight(_weight, 0.12f, 0.75f, 1f, 0.6f);
            _animator.SetLookAtPosition(target);
        }
    }
}
