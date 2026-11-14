using System.Collections;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.AI;

namespace Simulacra
{
    /// <summary>
    /// Composition root. Wires device layer (SpatialProvider) -> world model -> backend link ->
    /// action layer -> avatar. Contains no platform code: put this in a scene next to any
    /// SpatialProvider subclass.
    /// </summary>
    public class SimulacraApp : MonoBehaviour
    {
        [Header("Backend")]
        [Tooltip("ws://<laptop-ip>:8787/device, or keep 127.0.0.1 and run `adb reverse tcp:8787 tcp:8787` over USB. Overridden by simulacra.json in Application.persistentDataPath if present.")]
        public string backendUrl = "ws://127.0.0.1:8787/device";

        [Header("Avatar")]
        [Tooltip("Rigged human prefab (Animator with Speed/Turn/Speaking parameters). Leave empty for the placeholder body.")]
        public GameObject avatarPrefab;
        public float spawnDistance = 1.8f;
        [Tooltip("Metres. 0 keeps the model's own height unless it is implausible for a human (then 1.72 m).")]
        public float avatarHeight = 0f;
        [Tooltip("Soft contact shadow under the avatar (only on displays that can darken the real world).")]
        public bool groundShadow = true;
        [Tooltip("Turn to face the user when idle and they have moved around.")]
        public bool idleFaceUser = true;

        [Header("Voice")]
        [Tooltip("Mute the mic while the avatar speaks. Prevents the headset speakers from interrupting the AI; press the interrupt button to cut in.")]
        public bool halfDuplex = true;
        [Tooltip("Only listen while the talk control is held (Quest: right index trigger). Use in loud rooms.")]
        public bool pushToTalk = false;

        [Header("Debug")]
        public bool showHud = true;

        public SpatialProvider provider;

        public WorldModel World { get; private set; } = new WorldModel();
        public BackendClient Backend { get; private set; }
        public AvatarController Avatar { get; private set; }

        private MicStreamer _mic;
        private StreamingAudioPlayer _voice;
        private ActionExecutor _executor;
        private GestureController _gestures;
        private string _latency = "", _avatarReport = "";
        private HeadLook _headLook;
        private float _nextHud, _talkOpenUntil;
        private bool _talkWasHeld;
        private TextMesh _hud;
        private readonly List<string> _lines = new List<string>();
        private string _brain = "-", _status = "starting", _aiState = "";
        private float _nextWorldSync, _micHoldUntil, _offAxisSince = -1f, _nextReach;
        private bool _ready, _roomDirty, _hudShown = true;

        private IEnumerator Start()
        {
            Application.runInBackground = true;
            if (provider == null) provider = FindObjectOfType<SpatialProvider>();
            if (provider == null) { Debug.LogError("[Simulacra] No SpatialProvider in the scene."); yield break; }
            LoadConfig();
            BuildHud();
            // Spatial voice needs exactly one listener at the wearer's ears.
            if (FindObjectOfType<AudioListener>() == null) provider.Head.gameObject.AddComponent<AudioListener>();

            _status = "waiting for room data";
            while (provider.Room == null) yield return null;
            ApplyRoom();
            provider.RoomChanged += () => _roomDirty = true;

            SpawnAvatar();

            Backend = gameObject.AddComponent<BackendClient>();
            Backend.enabled = false;
            Backend.url = backendUrl;
            Backend.Connected += OnConnected;
            Backend.Disconnected += () => { _status = "backend disconnected, retrying"; _brain = "-"; };
            Backend.Message += OnMessage;
            Backend.enabled = true;
            _status = "connecting to " + backendUrl;

            _mic = gameObject.AddComponent<MicStreamer>();
            _mic.Chunk += pcm => Backend.Send(new JObject { ["type"] = "audio", ["pcm16"] = pcm });

            _executor = new ActionExecutor(World, Avatar, provider, Backend, this, _gestures) { headLook = _headLook };
            _ready = true;
        }

        private void LoadConfig()
        {
            try
            {
                string path = Path.Combine(Application.persistentDataPath, "simulacra.json");
                if (!File.Exists(path)) return;
                var cfg = JObject.Parse(File.ReadAllText(path));
                if (cfg["backendUrl"] != null) backendUrl = (string)cfg["backendUrl"];
                if (cfg["halfDuplex"] != null) halfDuplex = (bool)cfg["halfDuplex"];
                if (cfg["showHud"] != null) showHud = (bool)cfg["showHud"];
                if (cfg["pushToTalk"] != null) pushToTalk = (bool)cfg["pushToTalk"];
                Debug.Log("[Simulacra] config loaded from " + path);
            }
            catch (System.Exception e) { Debug.LogWarning("[Simulacra] config ignored: " + e.Message); }
        }

        private void ApplyRoom()
        {
            World.room = provider.Room;
            bool ok = RoomNavMesh.Build(World.room);
            Debug.Log($"[Simulacra] room source={World.room.source} floorY={World.room.floorY:0.00} obstacles={World.room.obstacles.Count} navmesh={ok}");

            World.RemoveBySource(ObjectSource.RoomScan);
            World.RemoveBySource(ObjectSource.Simulated);
            foreach (ObjectSeed seed in provider.Seeds) World.Upsert(seed.label, seed.position, seed.size, seed.source, 1f);

            if (Avatar != null)
            {
                Avatar.SetGround(World.room.floorY);
                Avatar.Reattach();
                World.RefreshReachability(Avatar.transform.position);
            }
            _nextWorldSync = 0f;
        }

        private void SpawnAvatar()
        {
            GameObject body;
            Transform head = null, mouth = null, rightArm = null, leftArm = null;
            if (avatarPrefab != null) body = Instantiate(avatarPrefab);
            else body = PlaceholderAvatar.Create(out head, out mouth, out rightArm, out leftArm);

            var root = new GameObject("Simulacra Avatar");
            body.transform.SetParent(root.transform, false);
            body.transform.localPosition = Vector3.zero;
            body.transform.localRotation = Quaternion.identity;

            // Life-size check and feet-on-origin, before anything is measured from the body.
            float height = AvatarFit.Apply(body, avatarHeight, out _avatarReport);
            Debug.Log("[Simulacra] " + _avatarReport);

            root.AddComponent<NavMeshAgent>();
            Avatar = root.AddComponent<AvatarController>();
            Avatar.visual = body.transform;

            var animator = body.GetComponentInChildren<Animator>();
            if (head == null && animator != null && animator.isHuman) head = animator.GetBoneTransform(HumanBodyBones.Head);

            var voiceGo = new GameObject("Voice");
            voiceGo.transform.SetParent(head != null ? head : root.transform, false);
            if (head == null) voiceGo.transform.localPosition = new Vector3(0, height > 0f ? height * 0.93f : 1.6f, 0);
            var source = voiceGo.AddComponent<AudioSource>();
            source.spatialBlend = 1f;
            source.minDistance = 1.5f;
            source.maxDistance = 15f;
            source.rolloffMode = AudioRolloffMode.Linear;
            source.dopplerLevel = 0f;
            _voice = voiceGo.AddComponent<StreamingAudioPlayer>();

            var lips = root.AddComponent<SimpleLipSync>();
            lips.voice = _voice;
            lips.head = avatarPrefab != null ? head : null; // do not bob the placeholder's head
            lips.mouthVisual = mouth;

            _gestures = root.AddComponent<GestureController>();
            if (avatarPrefab == null)
            {
                _gestures.head = head;
                _gestures.rightUpperArm = rightArm;
                _gestures.leftUpperArm = leftArm;
            }

            if (animator != null && animator.isHuman)
            {
                _headLook = animator.gameObject.AddComponent<HeadLook>();
                _headLook.user = provider.Head;
            }
            if (groundShadow && provider.CanDarkenWorld) Avatar.groundDecal = CreateContactShadow(root.transform);
            provider.PrepareAvatar(root);

            // Spawn in front of the user on floor that connects to where they stand, facing them.
            Vector3 userPos = provider.Head.position;
            Vector3 userFloor = new Vector3(userPos.x, World.room.floorY, userPos.z);
            Avatar.SetGround(World.room.floorY);
            bool placed = RoomNavMesh.FindSpawnPoint(userFloor, provider.Head.forward, spawnDistance, out Vector3 spot) && Avatar.PlaceAt(spot, userPos);
            if (!placed)
            {
                Vector3 fwd = provider.Head.forward; fwd.y = 0f;
                fwd = fwd.sqrMagnitude < 1e-4f ? Vector3.forward : fwd.normalized;
                spot = userFloor + fwd * spawnDistance;
                if (!Avatar.PlaceAt(spot, userPos))
                {
                    root.transform.position = spot;
                    Debug.LogWarning("[Simulacra] no walkable floor near the spawn point; the avatar cannot walk until the room is mapped.");
                }
            }
            World.RefreshReachability(root.transform.position);
        }

        /// <summary>A soft dark disc under the feet. Cheap, and the single strongest cue that the body touches the floor.</summary>
        private static Transform CreateContactShadow(Transform parent)
        {
            Shader shader = Shader.Find("Sprites/Default");
            if (shader == null) return null;
            const int n = 64;
            var tex = new Texture2D(n, n, TextureFormat.RGBA32, false) { wrapMode = TextureWrapMode.Clamp };
            var px = new Color32[n * n];
            for (int y = 0; y < n; y++)
            {
                for (int x = 0; x < n; x++)
                {
                    float r = Vector2.Distance(new Vector2(x, y), new Vector2(n - 1, n - 1) * 0.5f) / (n * 0.5f);
                    float a = Mathf.Clamp01(1f - r);
                    px[y * n + x] = new Color32(0, 0, 0, (byte)(a * a * 140f));
                }
            }
            tex.SetPixels32(px);
            tex.Apply();

            GameObject quad = GameObject.CreatePrimitive(PrimitiveType.Quad);
            quad.name = "Contact Shadow";
            Destroy(quad.GetComponent<Collider>());
            quad.transform.SetParent(parent, false);
            quad.transform.localRotation = Quaternion.Euler(90f, 0f, 0f);
            quad.transform.localScale = new Vector3(0.95f, 0.95f, 1f);
            var renderer = quad.GetComponent<MeshRenderer>();
            renderer.sharedMaterial = new Material(shader) { mainTexture = tex };
            renderer.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            renderer.receiveShadows = false;
            return quad.transform;
        }

        private void OnConnected()
        {
            _status = "connected";
            Backend.Send(new JObject
            {
                ["type"] = "hello",
                ["protocol"] = 1,
                ["device"] = provider.DeviceName,
                ["capabilities"] = new JObject { ["vision"] = provider.HasVision, ["navmesh"] = RoomNavMesh.IsBuilt, ["room"] = World.room != null ? World.room.source : "none" },
            });
            _nextWorldSync = 0f;
        }

        private void OnMessage(string type, JObject msg)
        {
            switch (type)
            {
                case "ready": _brain = (string)msg["brain"]; _status = "ready"; break;
                case "audio": _voice.Enqueue((string)msg["pcm16"]); break;
                case "audio_stop": _voice.Clear(); break;
                case "action": _executor.Handle(msg); _nextWorldSync = 0f; break;
                case "detections": _executor.OnDetections(msg); break;
                case "state": _aiState = (string)msg["status"]; break;
                case "metrics": _latency = FormatLatency(msg["turn"] as JObject); break;
                case "transcript": AddLine(((string)msg["role"] == "user" ? "You: " : "Sim: ") + (string)msg["text"]); break;
                case "log":
                    AddLine("[" + (string)msg["level"] + "] " + (string)msg["message"]);
                    Debug.LogWarning("[Simulacra backend] " + (string)msg["message"]);
                    break;
            }
        }

        private void Update()
        {
            if (provider != null && provider.ToggleHudPressed) showHud = !showHud;
            if (_hud != null) UpdateHud();
            if (provider != null && _hudShown != showHud) { _hudShown = showHud; provider.SetDebugVisible(showHud); }
            if (!_ready) return;

            // Room data improves while the user looks around. The NavMesh is rebuilt at once and a walk
            // in progress replans locally (AvatarController.Reattach); nothing is cancelled.
            if (_roomDirty)
            {
                _roomDirty = false;
                ApplyRoom();
            }

            // Half-duplex echo guard, with a short tail for room reverb.
            if (_voice.IsSpeaking) _micHoldUntil = Time.unscaledTime + 0.35f;
            // Push-to-talk: pressing cuts the avatar off and opens the mic; it stays open briefly after release.
            bool talkHeld = pushToTalk && provider.TalkHeld;
            bool talkPressed = talkHeld && !_talkWasHeld;
            _talkWasHeld = talkHeld;
            if (talkHeld) _talkOpenUntil = Time.unscaledTime + 0.3f;
            bool talkClosed = pushToTalk && Time.unscaledTime >= _talkOpenUntil;
            bool echoGuard = halfDuplex && !talkHeld && Time.unscaledTime < _micHoldUntil;
            _mic.Muted = !Backend.IsConnected || talkClosed || echoGuard;

            if (provider.InterruptPressed || talkPressed)
            {
                _voice.Clear();
                _micHoldUntil = 0f;
                Backend.Send(new JObject { ["type"] = "interrupt" });
            }

            if (idleFaceUser) FaceUserWhenIdle();

            if (Time.unscaledTime >= _nextReach)
            {
                _nextReach = Time.unscaledTime + 0.5f;
                World.RefreshNextReachability(Avatar.transform.position);
            }

            if (Backend.IsConnected && Time.unscaledTime >= _nextWorldSync)
            {
                _nextWorldSync = Time.unscaledTime + 0.4f;
                Transform h = provider.Head, a = Avatar.transform;
                string state = Avatar.State == "idle" && _voice.IsSpeaking ? "speaking" : Avatar.State;
                Backend.Send(new JObject { ["type"] = "world", ["world"] = World.ToJson(h.position, h.forward, a.position, a.forward, state) });
            }
        }

        /// <summary>One HUD line from the backend's per-turn latency record.</summary>
        private static string FormatLatency(JObject turn)
        {
            if (turn == null) return "";
            var ms = turn["ms"] as JObject;
            if (ms == null) return "";
            var sb = new System.Text.StringBuilder("latency:");
            foreach (string key in new[] { "transcript", "llm_first_token", "action_dispatched", "device_started", "first_audio" })
                if (ms[key] != null) sb.Append(' ').Append(key.Replace("_", " ")).Append(' ').Append((int)ms[key]).Append("ms");
            if (turn["plan_ms"] != null) sb.Append(" (path plan ").Append((float)turn["plan_ms"]).Append("ms)");
            return sb.ToString();
        }

        private void FaceUserWhenIdle()
        {
            if (Avatar.IsBusy || !Avatar.OnNavMesh) { _offAxisSince = -1f; return; }
            Vector3 toUser = provider.Head.position - Avatar.transform.position; toUser.y = 0f;
            if (toUser.sqrMagnitude < 0.01f || Vector3.Angle(Avatar.transform.forward, toUser) < 40f) { _offAxisSince = -1f; return; }
            if (_offAxisSince < 0f) _offAxisSince = Time.time;
            if (Time.time - _offAxisSince < 1.2f) return;
            _offAxisSince = -1f;
            Avatar.Face(provider.Head.position, null);
        }

        /// <summary>Send typed text as if spoken (editor simulator, tests).</summary>
        public void SendText(string text)
        {
            if (Backend != null && !string.IsNullOrWhiteSpace(text)) Backend.Send(new JObject { ["type"] = "text", ["text"] = text });
        }

        private void AddLine(string line)
        {
            if (line.Length > 110) line = line.Substring(0, 110) + "...";
            _lines.Add(line);
            if (_lines.Count > 5) _lines.RemoveAt(0);
        }

        private void BuildHud()
        {
            var go = new GameObject("Simulacra HUD");
            go.transform.SetParent(provider.Head, false);
            go.transform.localPosition = provider.HudLocalPosition;
            _hud = go.AddComponent<TextMesh>();
            Font font = null;
            try { font = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf"); } catch { /* older Unity */ }
            if (font == null) { try { font = Resources.GetBuiltinResource<Font>("Arial.ttf"); } catch { } }
            if (font != null)
            {
                _hud.font = font;
                go.GetComponent<MeshRenderer>().sharedMaterial = font.material;
            }
            _hud.fontSize = 48;
            _hud.characterSize = 0.0045f;
            _hud.anchor = TextAnchor.UpperLeft;
            _hud.color = new Color(0.6f, 1f, 0.7f);
        }

        private void UpdateHud()
        {
            if (_hud.gameObject.activeSelf != showHud) _hud.gameObject.SetActive(showHud);
            if (!showHud || Time.unscaledTime < _nextHud) return;
            _nextHud = Time.unscaledTime + 0.2f;
            var sb = new System.Text.StringBuilder();
            sb.Append("SIMULACRA  ").Append(_status).Append("  brain=").Append(_brain).Append(' ').Append(_aiState).Append('\n');
            if (Backend != null && !Backend.IsConnected && Backend.LastError.Length > 0) sb.Append(Backend.LastError).Append('\n');
            if (World.room != null)
                sb.Append("room=").Append(World.room.source).Append(" navmesh=").Append(RoomNavMesh.IsBuilt ? "yes" : "NO").Append(" objects=").Append(World.objects.Count)
                  .Append(" vision=").Append(provider.HasVision ? "yes" : "no").Append('\n');
            if (_avatarReport.Length > 0) sb.Append(_avatarReport).Append('\n');
            if (_mic != null) sb.Append("mic=").Append(!_mic.IsCapturing ? "OFF" : _mic.Muted ? (pushToTalk ? "hold trigger to talk" : "muted") : "live").Append("  avatar=").Append(Avatar != null ? Avatar.State : "-").Append('\n');
            if (_executor != null && _executor.LastAction.Length > 0) sb.Append("action: ").Append(_executor.LastAction).Append('\n');
            if (_latency.Length > 0) sb.Append(_latency).Append('\n');
            foreach (string l in _lines) sb.Append(l).Append('\n');
            _hud.text = sb.ToString();
        }
    }
}
