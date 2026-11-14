using UnityEngine;

namespace Simulacra
{
    /// <summary>
    /// Loudness-driven speaking animation that works on any rig: opens a mouth blendshape or jaw
    /// bone if one exists, and always adds a subtle head bob. This is the documented fallback for
    /// full viseme lip sync (swap in uLipSync on a VRM/ARKit-blendshape avatar for Project 2).
    /// </summary>
    public class SimpleLipSync : MonoBehaviour
    {
        public StreamingAudioPlayer voice;
        [Tooltip("Optional: found automatically by name (jaw/mouth/viseme_aa/aa).")]
        public SkinnedMeshRenderer face;
        public int blendShapeIndex = -1;
        public Transform jaw;
        public Transform head;
        public Transform mouthVisual; // placeholder avatar: scaled on Y
        public float jawOpenDegrees = 14f;

        private Animator _animator;
        private Quaternion _jawRest;
        private Vector3 _mouthRest;
        private bool _hasSpeakingParam;
        private float _phase;

        private static readonly string[] Names = { "jawopen", "jaw_open", "mouthopen", "mouth_open", "viseme_aa", "fcl_mth_a", "vrc.v_aa", "aa", "jaw" };

        private void Start()
        {
            _animator = GetComponentInChildren<Animator>();
            if (_animator != null)
            {
                foreach (var p in _animator.parameters) if (p.name == "Speaking") _hasSpeakingParam = true;
                if (_animator.isHuman)
                {
                    if (jaw == null) jaw = _animator.GetBoneTransform(HumanBodyBones.Jaw);
                    if (head == null) head = _animator.GetBoneTransform(HumanBodyBones.Head);
                }
            }
            if (face == null || blendShapeIndex < 0) FindBlendShape();
            if (jaw != null) _jawRest = jaw.localRotation;
            if (mouthVisual != null) _mouthRest = mouthVisual.localScale;
        }

        private void FindBlendShape()
        {
            foreach (string wanted in Names)
            {
                foreach (var smr in GetComponentsInChildren<SkinnedMeshRenderer>())
                {
                    Mesh m = smr.sharedMesh;
                    if (m == null) continue;
                    for (int i = 0; i < m.blendShapeCount; i++)
                    {
                        if (!m.GetBlendShapeName(i).ToLowerInvariant().Contains(wanted)) continue;
                        face = smr;
                        blendShapeIndex = i;
                        return;
                    }
                }
            }
        }

        // After the Animator has posed the skeleton.
        private void LateUpdate()
        {
            float level = voice != null ? voice.Level : 0f;
            bool speaking = voice != null && voice.IsSpeaking;
            if (_hasSpeakingParam) _animator.SetBool("Speaking", speaking);

            if (face != null && blendShapeIndex >= 0) face.SetBlendShapeWeight(blendShapeIndex, level * 100f);
            if (jaw != null) jaw.localRotation = _jawRest * Quaternion.Euler(level * jawOpenDegrees, 0f, 0f);
            if (mouthVisual != null) mouthVisual.localScale = new Vector3(_mouthRest.x, _mouthRest.y * (1f + level * 5f), _mouthRest.z);

            if (head != null && speaking)
            {
                _phase += Time.deltaTime * (5f + level * 6f);
                head.localRotation *= Quaternion.Euler(Mathf.Sin(_phase) * 2.5f * level, Mathf.Sin(_phase * 0.63f) * 3f * level, 0f);
            }
        }
    }
}
