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
        private SkinnedMeshRenderer _blinkMesh;
        private readonly System.Collections.Generic.List<int> _blinkShapes = new System.Collections.Generic.List<int>();
        private float _nextBlink, _blinkEnd;

        // In priority order. Matched as "ends with" first so "AK_25_JawOpen" wins over anything merely containing a fragment.
        private static readonly string[] Names = { "jawopen", "jaw_open", "mouthopen", "mouth_open", "viseme_aa", "vi_10_aa", "fcl_mth_a", "vrc.v_aa", "jawdrop" };
        private static readonly string[] SmileNames = { "mouthsmileleft", "mouthsmileright" };
        private readonly System.Collections.Generic.List<int> _smileShapes = new System.Collections.Generic.List<int>();
        private float _smile;

        private void Start()
        {
            _animator = GetComponentInChildren<Animator>();
            if (_animator != null)
            {
                foreach (var p in _animator.parameters) if (p.name == "Speaking") _hasSpeakingParam = true;
            }
            if (face == null || blendShapeIndex < 0) FindBlendShape();
            // A mouth blendshape is the better mouth; only fall back to rotating a jaw bone without one.
            if (jaw == null && (face == null || blendShapeIndex < 0)) jaw = BoneFinder.Find(gameObject, HumanBodyBones.Jaw);
            FindBlinkShapes();
            _nextBlink = Time.time + Random.Range(1.5f, 4f);
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
                        if (!m.GetBlendShapeName(i).ToLowerInvariant().EndsWith(wanted)) continue;
                        face = smr;
                        blendShapeIndex = i;
                        return;
                    }
                }
            }
        }

        private void FindBlinkShapes()
        {
            // A face often has several blink shapes (ARKit pair, FACS, tracker sets). Driving them all
            // at once closes the eyes three times over, so pick exactly one set, best first.
            string[][] sets = { new[] { "eyeblinkleft", "eyeblinkright" }, new[] { "blink_l", "blink_r" }, new[] { "blink" }, new[] { "eyesclosed" }, new[] { "eyeclosed" } };
            foreach (var smr in GetComponentsInChildren<SkinnedMeshRenderer>())
            {
                Mesh m = smr.sharedMesh;
                if (m == null || m.blendShapeCount == 0) continue;
                foreach (string[] set in sets)
                {
                    _blinkShapes.Clear();
                    foreach (string wanted in set)
                    {
                        for (int i = 0; i < m.blendShapeCount; i++)
                        {
                            if (!m.GetBlendShapeName(i).ToLowerInvariant().EndsWith(wanted)) continue;
                            _blinkShapes.Add(i);
                            break;
                        }
                    }
                    if (_blinkShapes.Count == set.Length) { _blinkMesh = smr; FindSmile(smr); return; }
                }
                _blinkShapes.Clear();
            }
        }

        private void FindSmile(SkinnedMeshRenderer smr)
        {
            Mesh m = smr.sharedMesh;
            foreach (string wanted in SmileNames)
                for (int i = 0; i < m.blendShapeCount; i++)
                    if (m.GetBlendShapeName(i).ToLowerInvariant().EndsWith(wanted)) { _smileShapes.Add(i); break; }
        }

        // After the Animator has posed the skeleton.
        private void LateUpdate()
        {
            float level = voice != null ? voice.Level : 0f;
            bool speaking = voice != null && voice.IsSpeaking;
            if (_hasSpeakingParam) _animator.SetBool("Speaking", speaking);

            if (_blinkMesh != null)
            {
                if (Time.time >= _nextBlink) { _blinkEnd = Time.time + 0.13f; _nextBlink = Time.time + Random.Range(2.2f, 5.5f); }
                float closed = Time.time < _blinkEnd ? 100f : 0f;
                foreach (int i in _blinkShapes) _blinkMesh.SetBlendShapeWeight(i, closed);
                // A resting face is slightly pleasant, a speaking one a little more so; never a blank stare.
                _smile = Mathf.MoveTowards(_smile, speaking ? 26f : 10f, Time.deltaTime * 40f);
                foreach (int i in _smileShapes) _blinkMesh.SetBlendShapeWeight(i, _smile);
            }

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
