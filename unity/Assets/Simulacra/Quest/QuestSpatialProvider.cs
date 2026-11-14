using System;
using System.Collections;
using System.Collections.Generic;
using Meta.XR;
using Meta.XR.MRUtilityKit;
using UnityEngine;

namespace Simulacra
{
    /// <summary>
    /// Meta Quest 3 / 3S device layer.
    ///  - Room: MR Utility Kit scene anchors (from the user's Space Setup) -> floor + obstacle boxes.
    ///  - Objects: furniture anchors are seeded as ObjectSource.RoomScan (truthfully not camera-detected).
    ///  - 3D positions: Depth API raycast (EnvironmentRaycastManager), falling back to room geometry.
    ///  - Vision: Passthrough Camera API frame + camera pose for image point -> world ray.
    /// This is the only file (besides the editor scene builder) that references the Meta SDK.
    /// </summary>
    public class QuestSpatialProvider : SpatialProvider
    {
        private const string ScenePermission = "com.oculus.permission.USE_SCENE";
        private const string CameraPermission = "horizonos.permission.HEADSET_CAMERA";

        public OVRCameraRig rig;
        public PassthroughCameraAccess cameraAccess;
        public EnvironmentRaycastManager raycastManager;

        [Tooltip("Seconds to wait for a scanned room before falling back to an open square of floor around the user.")]
        public float roomWaitSeconds = 10f;
        public float fallbackFloorSide = 4f;
        public int frameWidth = 768;

        public override string DeviceName => "quest";
        public override Transform Head => rig.centerEyeAnchor;
        public override bool HasVision => cameraAccess != null && cameraAccess.isActiveAndEnabled && cameraAccess.IsPlaying;
        public override bool InterruptPressed => OVRInput.GetDown(OVRInput.Button.One);
        public override bool ToggleHudPressed => OVRInput.GetDown(OVRInput.Button.Two);

        public override Ray PointerRay
        {
            get
            {
                if (OVRInput.IsControllerConnected(OVRInput.Controller.RTouch))
                    return new Ray(rig.rightControllerAnchor.position, rig.rightControllerAnchor.forward);
                return base.PointerRay;
            }
        }

        private Texture2D _full, _small;
        private bool _sceneCallbackRegistered;

        private void Awake()
        {
            if (rig == null) rig = FindObjectOfType<OVRCameraRig>();
            if (cameraAccess == null) cameraAccess = FindObjectOfType<PassthroughCameraAccess>();
            if (raycastManager == null) raycastManager = FindObjectOfType<EnvironmentRaycastManager>();

            // Passthrough needs a transparent clear so the real room shows behind the avatar.
            foreach (Camera cam in rig.GetComponentsInChildren<Camera>(true))
            {
                cam.clearFlags = CameraClearFlags.SolidColor;
                cam.backgroundColor = new Color(0, 0, 0, 0);
            }
            if (OVRManager.instance != null) OVRManager.instance.isInsightPassthroughEnabled = true;

#if UNITY_ANDROID && !UNITY_EDITOR
            var wanted = new List<string>();
            foreach (string p in new[] { ScenePermission, CameraPermission, UnityEngine.Android.Permission.Microphone })
                if (!UnityEngine.Android.Permission.HasUserAuthorizedPermission(p)) wanted.Add(p);
            if (wanted.Count > 0) UnityEngine.Android.Permission.RequestUserPermissions(wanted.ToArray());
#endif
        }

        private static bool HasScenePermission()
        {
#if UNITY_ANDROID && !UNITY_EDITOR
            return UnityEngine.Android.Permission.HasUserAuthorizedPermission(ScenePermission);
#else
            return true;
#endif
        }

        /// <summary>The camera component cannot start before its permission is granted: restart it afterwards.</summary>
        private IEnumerator StartCameraWhenPermitted()
        {
            if (cameraAccess == null) yield break;
#if UNITY_ANDROID && !UNITY_EDITOR
            while (!UnityEngine.Android.Permission.HasUserAuthorizedPermission(CameraPermission)) yield return new WaitForSeconds(0.5f);
#endif
            yield return new WaitForSeconds(1.5f);
            if (cameraAccess.IsPlaying) yield break;
            cameraAccess.enabled = false;
            yield return null;
            cameraAccess.enabled = true;
        }

        private IEnumerator Start()
        {
            StartCoroutine(StartCameraWhenPermitted());
            float start = Time.unscaledTime;
            bool retried = false;
            while (Room == null && Time.unscaledTime - start < roomWaitSeconds)
            {
                if (!_sceneCallbackRegistered && MRUK.Instance != null)
                {
                    _sceneCallbackRegistered = true;
                    MRUK.Instance.RegisterSceneLoadedCallback(OnSceneLoaded);
                }
                if (!HasScenePermission())
                {
                    start = Mathf.Max(start, Time.unscaledTime - roomWaitSeconds + 4f); // keep waiting while the dialog is up
                }
                else if (!retried && MRUK.Instance != null && Time.unscaledTime - start > 3f)
                {
                    // MRUK's startup load can run before the permission was granted: ask again.
                    retried = true;
                    RequestSceneLoad();
                }
                yield return null;
            }

            if (Room == null)
            {
                Debug.LogWarning("[Simulacra] No scanned room from Scene API (run Space Setup in Quest settings). Using an open floor square around the user; obstacles are NOT known.");
                Vector3 head = Head.position;
                float floorY = rig.trackingSpace != null ? rig.trackingSpace.position.y : 0f;
                Room = RoomGeometry.OpenFloor(head, floorY, fallbackFloorSide, "fallback_open_floor");
                RaiseRoomChanged();
            }
        }

        private static void RequestSceneLoad()
        {
            try
            {
                // Called through reflection so an SDK signature change cannot break compilation.
                var method = typeof(MRUK).GetMethod("LoadSceneFromDevice");
                if (method == null) return;
                var args = new object[method.GetParameters().Length];
                for (int i = 0; i < args.Length; i++) args[i] = Type.Missing;
                method.Invoke(MRUK.Instance, args);
            }
            catch (Exception e) { Debug.LogWarning("[Simulacra] scene reload failed: " + e.Message); }
        }

        private static readonly Dictionary<string, string> Labels = new Dictionary<string, string>
        {
            { "TABLE", "table" }, { "COUCH", "couch" }, { "BED", "bed" }, { "SCREEN", "screen" }, { "STORAGE", "storage" },
            { "LAMP", "lamp" }, { "PLANT", "plant" }, { "DOOR_FRAME", "door" }, { "WINDOW_FRAME", "window" }, { "WALL_ART", "wall_art" },
        };

        private void OnSceneLoaded()
        {
            MRUKRoom mrukRoom = MRUK.Instance.GetCurrentRoom();
            if (mrukRoom == null) return;

            var geometry = new RoomGeometry { source = "room_scan" };
            Seeds.Clear();
            foreach (MRUKAnchor anchor in mrukRoom.Anchors)
            {
                if (anchor == null) continue;
                // Flags enum -> names; string matching keeps this tolerant of SDK label changes.
                string labels = anchor.Label.ToString();
                Transform t = anchor.transform;

                if (labels.Contains("FLOOR"))
                {
                    if (!anchor.PlaneRect.HasValue) continue;
                    Rect r = anchor.PlaneRect.Value;
                    geometry.floor.Add(UprightBox.FromOriented(t.TransformPoint(r.center), t.rotation, new Vector3(r.width, r.height, 0.02f)));
                    geometry.floorY = t.position.y;
                    continue;
                }
                if (labels.Contains("CEILING") || labels.Contains("GLOBAL_MESH") || labels.Contains("INVISIBLE")) continue;

                UprightBox box;
                bool blocksFloor;
                if (anchor.VolumeBounds.HasValue)
                {
                    Bounds b = anchor.VolumeBounds.Value;
                    box = UprightBox.FromOriented(t.TransformPoint(b.center), t.rotation, b.size);
                    blocksFloor = true;
                }
                else if (anchor.PlaneRect.HasValue)
                {
                    Rect r = anchor.PlaneRect.Value;
                    box = UprightBox.FromOriented(t.TransformPoint(r.center), t.rotation, new Vector3(r.width, r.height, 0.08f));
                    blocksFloor = labels.Contains("WALL_FACE");
                }
                else continue;

                if (blocksFloor) geometry.obstacles.Add(box);

                foreach (var kv in Labels)
                {
                    if (!labels.Contains(kv.Key)) continue;
                    Seeds.Add(new ObjectSeed { label = kv.Value, position = box.center, size = box.size, source = ObjectSource.RoomScan });
                    break;
                }
            }

            if (geometry.floor.Count == 0)
            {
                Debug.LogWarning("[Simulacra] Scene loaded without a floor anchor; ignoring it.");
                return;
            }
            Debug.Log($"[Simulacra] MRUK room: {geometry.obstacles.Count} obstacles, {Seeds.Count} labelled objects");
            Room = geometry;
            RaiseRoomChanged();
        }

        public override bool RaycastEnvironment(Ray ray, out Vector3 point)
        {
            if (raycastManager != null && EnvironmentRaycastManager.IsSupported && raycastManager.Raycast(ray, out var hit))
            {
                point = hit.point;
                return true;
            }
            return base.RaycastEnvironment(ray, out point);
        }

        public override bool TryCaptureFrame(out byte[] jpeg, out Func<Vector2, Vector3?> locate)
        {
            jpeg = null;
            locate = null;
            if (!HasVision) return false;

            // Pose and pixels from the same moment, so image points map to the right world rays
            // even though the answer comes back seconds later and the head has moved.
            Pose pose = cameraAccess.GetCameraPose();
            Vector2Int size = cameraAccess.CurrentResolution;
            if (size.x <= 0 || size.y <= 0) return false;
            if (_full == null || _full.width != size.x || _full.height != size.y)
                _full = new Texture2D(size.x, size.y, TextureFormat.RGBA32, false);
            var pixels = cameraAccess.GetColors();
            _full.LoadRawTextureData(pixels);
            _full.Apply();

            int w = Mathf.Min(frameWidth, size.x);
            int h = Mathf.RoundToInt(w * (size.y / (float)size.x));
            RenderTexture rt = RenderTexture.GetTemporary(w, h, 0, RenderTextureFormat.ARGB32);
            Graphics.Blit(_full, rt);
            RenderTexture previous = RenderTexture.active;
            RenderTexture.active = rt;
            if (_small == null || _small.width != w || _small.height != h) _small = new Texture2D(w, h, TextureFormat.RGB24, false);
            _small.ReadPixels(new Rect(0, 0, w, h), 0, 0);
            _small.Apply();
            RenderTexture.active = previous;
            RenderTexture.ReleaseTemporary(rt);
            jpeg = _small.EncodeToJPG(70);

            locate = imagePoint =>
            {
                // Image origin is top-left; viewport origin is bottom-left.
                Ray ray = cameraAccess.ViewportPointToRay(new Vector2(imagePoint.x, 1f - imagePoint.y), pose);
                return RaycastEnvironment(ray, out Vector3 p) ? p : (Vector3?)null;
            };
            return true;
        }
    }
}
