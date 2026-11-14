using System.Collections;
using System.Collections.Generic;
using Unity.XR.CoreUtils;
using Unity.XR.XREAL;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

namespace Simulacra
{
    /// <summary>
    /// XREAL Air 2 Ultra device layer (XREAL SDK 3.x + AR Foundation plane detection).
    ///  - Floor: the lowest large upward-facing plane below the wearer's head.
    ///  - Obstacles: vertical planes (walls) and raised horizontal planes (table tops).
    ///  - Room data grows as the wearer looks around, so geometry is re-published when it changes.
    ///  - No RGB camera frames on this device: HasVision is false, and objects come from
    ///    register_marker ("this is a chair" while looking at it). Raised surfaces are reported as
    ///    plane-detected "raised_surface", never as recognised objects.
    /// Plane handling uses only AR Foundation types, so it also runs on other AR Foundation devices;
    /// only the controller buttons are XREAL specific.
    /// </summary>
    public class XrealSpatialProvider : SpatialProvider
    {
        public ARPlaneManager planeManager;
        public XROrigin origin;

        [Tooltip("Seconds to look for a floor plane before assuming one at eye height below the head.")]
        public float floorWaitSeconds = 12f;
        [Tooltip("Used only for the fallback floor: assumed standing eye height in metres.")]
        public float assumedEyeHeight = 1.6f;
        public float fallbackFloorSide = 3f;
        [Tooltip("Minimum seconds between geometry updates.")]
        public float minUpdateInterval = 3f;
        [Tooltip("Pin the room to a spatial anchor: when tracking relocalises, the avatar and registered objects move with the room instead of sliding.")]
        public bool useSpatialAnchor = true;
        [Tooltip("Also feed the reconstructed depth mesh to navigation, so clutter that is not a clean plane blocks the floor. Off until verified on the glasses: a noisy mesh can block real floor.")]
        public bool useDepthMesh = false;

        private ARAnchor _anchor;
        private Pose _anchorPose;
        private bool _anchorSeen;
        private ARMeshManager _meshManager;
        private readonly List<Mesh> _ownedMeshes = new List<Mesh>();

        public override string DebugStatus =>
            (useSpatialAnchor ? (_anchorSeen ? "anchor=tracking" : "anchor=waiting") : "anchor=off") + (useDepthMesh ? $" mesh={(_meshManager != null ? _meshManager.meshes.Count : 0)} blocks" : "");

        public override string DeviceName => "xreal";
        public override Transform Head => _head;
        public override bool HasVision => false;
        public override Vector3 HudLocalPosition => new Vector3(-0.2f, 0.02f, 1.1f);
        public override bool InterruptPressed => _triggerDown;
        public override bool ToggleHudPressed => _appDown;
        public override bool TalkHeld => _triggerHeld;
        public override bool CanDarkenWorld => false; // optical see-through: black is invisible

        private Transform _head;
        private bool _triggerDown, _triggerHeld, _appDown, _showPlanes = true, _hasRealFloor;
        private string _signature = "";
        private float _lastPublish = -100f;

        private void Awake()
        {
            if (origin == null) origin = FindObjectOfType<XROrigin>();
            if (planeManager == null) planeManager = FindObjectOfType<ARPlaneManager>();
            Camera cam = origin != null && origin.Camera != null ? origin.Camera : Camera.main;
            _head = cam.transform;
            // Optical see-through: black renders as transparent.
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = Color.black;
        }

        private float _startTime;

        private IEnumerator Start()
        {
            float start = Time.unscaledTime;
            _startTime = start;
            var wait = new WaitForSeconds(1f);
            while (true)
            {
                bool allowFallback = !_hasRealFloor && Room == null && Time.unscaledTime - start > floorWaitSeconds;
                Scan(allowFallback);
                yield return wait;
            }
        }

        private void Update()
        {
            _triggerDown = false;
            _triggerHeld = false;
            _appDown = false;
            foreach (InputDevice device in InputSystem.devices)
            {
                if (!(device is XREALController c)) continue;
                if (c.TriggerButton != null && c.TriggerButton.wasPressedThisFrame) _triggerDown = true;
                if (c.TriggerButton != null && c.TriggerButton.isPressed) _triggerHeld = true;
                if (c.ButtonId0 != null && c.ButtonId0.wasPressedThisFrame) _appDown = true;
            }
        }

        public override void SetDebugVisible(bool visible)
        {
            _showPlanes = visible;
            ApplyPlaneVisibility();
        }

        private void ApplyPlaneVisibility()
        {
            if (planeManager == null) return;
            foreach (ARPlane plane in planeManager.trackables)
                foreach (Renderer r in plane.GetComponentsInChildren<Renderer>(true))
                    r.enabled = _showPlanes;
        }

        private void Scan(bool allowFallback)
        {
            if (planeManager == null) { if (allowFallback) PublishFallback(); return; }
            if (!_showPlanes) ApplyPlaneVisibility(); // new planes arrive visible

            float headY = _head.position.y;
            var ups = new List<ARPlane>();
            var walls = new List<ARPlane>();
            foreach (ARPlane plane in planeManager.trackables)
            {
                if (plane == null || plane.subsumedBy != null || plane.trackingState == TrackingState.None) continue;
                if (plane.alignment == PlaneAlignment.HorizontalUp) ups.Add(plane);
                else if (plane.alignment == PlaneAlignment.Vertical) walls.Add(plane);
            }

            // Floor = lowest sizeable upward plane well below the head.
            float floorY = float.MaxValue;
            foreach (ARPlane p in ups)
            {
                float y = p.center.y;
                if (y > headY - 0.6f || p.size.x * p.size.y < 0.4f) continue;
                if (y < floorY) floorY = y;
            }
            if (floorY == float.MaxValue)
            {
                if (allowFallback) PublishFallback();
                return;
            }

            var geometry = new RoomGeometry { source = "plane_detection", floorY = floorY };
            var seeds = new List<ObjectSeed>();
            float floorArea = 0f;
            foreach (ARPlane p in ups)
            {
                float y = p.center.y;
                Vector2 size = p.size;
                if (Mathf.Abs(y - floorY) <= 0.12f)
                {
                    geometry.floor.Add(UprightBox.FromOriented(p.center, p.transform.rotation, new Vector3(size.x, 0.02f, size.y)));
                    floorArea += size.x * size.y;
                }
                else if (y > floorY + 0.3f && y < headY + 0.2f && size.x > 0.3f && size.y > 0.3f)
                {
                    // A table top or similar: block the floor underneath it.
                    UprightBox top = UprightBox.FromOriented(p.center, p.transform.rotation, new Vector3(size.x, 0.02f, size.y));
                    float height = y - floorY;
                    var box = new UprightBox
                    {
                        center = new Vector3(top.center.x, floorY + height * 0.5f, top.center.z),
                        size = new Vector3(top.size.x, height, top.size.z),
                        yawDegrees = top.yawDegrees,
                    };
                    geometry.obstacles.Add(box);
                    seeds.Add(new ObjectSeed { label = "raised_surface", position = box.center, size = box.size, source = ObjectSource.RoomScan });
                }
            }
            foreach (ARPlane p in walls)
            {
                Vector2 size = p.size;
                if (size.x < 0.4f || size.y < 0.4f) continue;
                geometry.obstacles.Add(UprightBox.FromOriented(p.center, p.transform.rotation, new Vector3(size.x, 0.06f, size.y)));
            }

            TrackAnchor(floorY);
            int meshVertices = useDepthMesh ? CountMeshVertices() : 0;

            // Do not start on a sliver of floor: the avatar would have nowhere to stand or walk, and
            // would jump when more floor appears. Wait for a usable patch, up to the fallback deadline.
            if (!_hasRealFloor && floorArea < 2.5f && Time.unscaledTime - _startTime < floorWaitSeconds) return;

            // Publish only when something material changed, and not too often: every publish rebuilds the NavMesh.
            string signature = Mathf.RoundToInt(floorY / 0.04f) + ":" + geometry.floor.Count + ":" + Mathf.RoundToInt(floorArea / 0.75f) + ":" + geometry.obstacles.Count + ":" + seeds.Count + ":" + (meshVertices / 2000);
            if (signature == _signature || Time.unscaledTime - _lastPublish < minUpdateInterval) return;
            _signature = signature;
            _lastPublish = Time.unscaledTime;
            _hasRealFloor = true;

            if (useDepthMesh) AddDepthMesh(geometry);
            Seeds.Clear();
            Seeds.AddRange(seeds);
            Room = geometry;
            Debug.Log($"[Simulacra] planes: floorY={floorY:0.00} floor pieces={geometry.floor.Count} area={floorArea:0.0}m2 obstacles={geometry.obstacles.Count}");
            RaiseRoomChanged();
        }

        /// <summary>
        /// One spatial anchor on the floor. The glasses keep it glued to the real room; when its pose
        /// in app space changes, tracking has corrected itself and everything in the room must follow.
        /// </summary>
        private void TrackAnchor(float floorY)
        {
            if (!useSpatialAnchor || origin == null) return;
            if (_anchor == null)
            {
                if (origin.GetComponent<ARAnchorManager>() == null) origin.gameObject.AddComponent<ARAnchorManager>();
                var go = new GameObject("Simulacra Room Anchor");
                Vector3 head = _head.position;
                go.transform.SetPositionAndRotation(new Vector3(head.x, floorY, head.z), Quaternion.identity);
                _anchor = go.AddComponent<ARAnchor>();
                return;
            }
            if (_anchor.trackingState != TrackingState.Tracking) return;
            var now = new Pose(_anchor.transform.position, _anchor.transform.rotation);
            if (!_anchorSeen) { _anchorSeen = true; _anchorPose = now; return; }
            if (Vector3.Distance(now.position, _anchorPose.position) < 0.03f && Quaternion.Angle(now.rotation, _anchorPose.rotation) < 1.5f) return;

            Matrix4x4 oldToNew = Matrix4x4.TRS(now.position, now.rotation, Vector3.one) * Matrix4x4.TRS(_anchorPose.position, _anchorPose.rotation, Vector3.one).inverse;
            _anchorPose = now;
            Debug.Log("[Simulacra] room anchor moved (tracking corrected); shifting the avatar and registered objects with it");
            RaiseWorldShifted(oldToNew);
        }

        private int CountMeshVertices()
        {
            if (_meshManager == null)
            {
                if (origin == null) return 0;
                // AR Foundation requires the mesh manager on a child of the XR Origin.
                var go = new GameObject("Simulacra Meshing");
                go.transform.SetParent(origin.transform, false);
                var template = new GameObject("Mesh Block").AddComponent<MeshFilter>();
                template.gameObject.SetActive(false);
                template.transform.SetParent(go.transform, false);
                go.SetActive(false);
                _meshManager = go.AddComponent<ARMeshManager>();
                _meshManager.meshPrefab = template;
                go.SetActive(true);
                return 0;
            }
            int n = 0;
            foreach (MeshFilter f in _meshManager.meshes) if (f != null && f.sharedMesh != null) n += f.sharedMesh.vertexCount;
            return n;
        }

        /// <summary>
        /// Depth-mesh triangles between ankle and head height become navigation blockers. Floor-level
        /// triangles are dropped: a bumpy reconstructed floor must not block the real, flat one.
        /// </summary>
        private void AddDepthMesh(RoomGeometry geometry)
        {
            foreach (Mesh old in _ownedMeshes) Destroy(old);
            _ownedMeshes.Clear();
            if (_meshManager == null) return;
            float low = geometry.floorY + 0.15f, high = geometry.floorY + 1.9f;
            var vertices = new List<Vector3>();
            var keptVertices = new List<Vector3>();
            var keptTriangles = new List<int>();
            foreach (MeshFilter f in _meshManager.meshes)
            {
                if (f == null || f.sharedMesh == null) continue;
                f.sharedMesh.GetVertices(vertices);
                int[] triangles = f.sharedMesh.triangles;
                Matrix4x4 toWorld = f.transform.localToWorldMatrix;
                keptVertices.Clear();
                keptTriangles.Clear();
                for (int i = 0; i + 2 < triangles.Length; i += 3)
                {
                    Vector3 a = toWorld.MultiplyPoint3x4(vertices[triangles[i]]), b = toWorld.MultiplyPoint3x4(vertices[triangles[i + 1]]), c = toWorld.MultiplyPoint3x4(vertices[triangles[i + 2]]);
                    if (a.y < low || b.y < low || c.y < low || a.y > high || b.y > high || c.y > high) continue;
                    keptTriangles.Add(keptVertices.Count); keptVertices.Add(a);
                    keptTriangles.Add(keptVertices.Count); keptVertices.Add(b);
                    keptTriangles.Add(keptVertices.Count); keptVertices.Add(c);
                }
                if (keptTriangles.Count == 0) continue;
                var mesh = new Mesh { indexFormat = UnityEngine.Rendering.IndexFormat.UInt32 };
                mesh.SetVertices(keptVertices);
                mesh.SetTriangles(keptTriangles, 0);
                _ownedMeshes.Add(mesh);
                geometry.meshes.Add(mesh);
            }
        }

        private void PublishFallback()
        {
            Debug.LogWarning("[Simulacra] No floor plane detected yet (look down at the floor and move around). Assuming a floor " + assumedEyeHeight + " m below the head; obstacles are NOT known.");
            Vector3 head = _head.position;
            Room = RoomGeometry.OpenFloor(head, head.y - assumedEyeHeight, fallbackFloorSide, "fallback_assumed_floor");
            _lastPublish = Time.unscaledTime;
            RaiseRoomChanged();
        }
    }
}
