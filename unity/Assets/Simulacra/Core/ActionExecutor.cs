using System;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace Simulacra
{
    /// <summary>
    /// The action layer. Receives the AI's action requests ({action, target_id}), resolves ids to
    /// positions through the world model, validates them against the NavMesh, drives the avatar and
    /// reports success or failure. The AI can never pass coordinates; anything not resolvable to a
    /// validated standing point is refused with a reason.
    /// </summary>
    public class ActionExecutor
    {
        public float userDistance = 1.2f;

        private readonly WorldModel _world;
        private readonly AvatarController _avatar;
        private readonly SpatialProvider _provider;
        private readonly BackendClient _backend;
        private readonly MonoBehaviour _host;

        private string _pendingFrameId;
        private JArray _pendingDetections;
        private string _pendingDetectionError;

        public string LastAction { get; private set; } = "";

        public ActionExecutor(WorldModel world, AvatarController avatar, SpatialProvider provider, BackendClient backend, MonoBehaviour host)
        {
            _world = world;
            _avatar = avatar;
            _provider = provider;
            _backend = backend;
            _host = host;
        }

        public void Handle(JObject msg)
        {
            string id = (string)msg["id"];
            string action = (string)msg["action"] ?? "";
            string target = (string)msg["target_id"];
            var p = msg["params"] as JObject;
            LastAction = action + (string.IsNullOrEmpty(target) ? "" : " " + target) + " ...";

            Action<bool, string, JObject> reply = (ok, reason, data) =>
            {
                LastAction = action + (string.IsNullOrEmpty(target) ? "" : " " + target) + (ok ? " ok" : " FAILED: " + reason);
                var r = new JObject { ["type"] = "action_result", ["id"] = id, ["status"] = ok ? "succeeded" : "failed" };
                if (!string.IsNullOrEmpty(reason)) r["reason"] = reason;
                if (data != null) r["data"] = data;
                _backend.Send(r);
            };

            try
            {
                switch (action)
                {
                    case "walk_to": WalkTo(target, reply); break;
                    case "inspect_object": WalkTo(target, reply); break;
                    case "approach_user": ApproachUser(reply); break;
                    case "look_at": LookAt(target, reply); break;
                    case "stop": _avatar.Stop(); reply(true, null, null); break;
                    case "register_marker": RegisterMarker((string)p?["label"], reply); break;
                    case "forget_object": reply(_world.Remove(target), "no such object", null); break;
                    case "scan_surroundings": _host.StartCoroutine(Scan(id, reply)); break;
                    default: reply(false, "this headset does not implement action '" + action + "'", null); break;
                }
            }
            catch (Exception e)
            {
                Debug.LogException(e);
                reply(false, "device error: " + e.Message, null);
            }
        }

        public void OnDetections(JObject msg)
        {
            if ((string)msg["frameId"] != _pendingFrameId) return;
            _pendingDetections = msg["items"] as JArray ?? new JArray();
            _pendingDetectionError = (string)msg["error"];
        }

        private Vector3 UserFloorPosition()
        {
            Vector3 p = _provider.Head.position;
            p.y = _world.room != null ? _world.room.floorY : 0f;
            return p;
        }

        private bool ResolveTarget(string target, out Vector3 position, out float standOff, out string error)
        {
            position = default; standOff = 0.6f; error = null;
            if (string.Equals(target, "user", StringComparison.OrdinalIgnoreCase))
            {
                position = UserFloorPosition();
                standOff = userDistance;
                return true;
            }
            if (_world.TryGet(target, out TrackedObject o))
            {
                position = o.position;
                standOff = WorldModel.StandOff(o);
                return true;
            }
            error = "unknown target '" + target + "'";
            return false;
        }

        private void WalkTo(string target, Action<bool, string, JObject> reply)
        {
            if (!ResolveTarget(target, out Vector3 pos, out float standOff, out string error)) { reply(false, error, null); return; }
            if (!RoomNavMesh.IsBuilt) { reply(false, "no walkable floor has been mapped yet", null); return; }
            Vector3 gap = pos - _avatar.transform.position; gap.y = 0f;
            if (gap.magnitude <= standOff + 0.25f)
            {
                // Already there: just face it.
                _avatar.Face(pos, (ok, reason) => reply(ok, reason, new JObject { ["metres_from_target"] = Mathf.Round(gap.magnitude * 10f) / 10f, ["note"] = "was already next to it" }));
                return;
            }
            if (!RoomNavMesh.FindStandPoint(pos, standOff, _avatar.transform.position, out Vector3 stand))
            {
                reply(false, "there is no reachable floor next to " + target, null);
                return;
            }
            _avatar.WalkTo(stand, pos, (ok, reason) =>
            {
                Vector3 flat = pos - _avatar.transform.position; flat.y = 0f;
                reply(ok, reason, new JObject { ["metres_from_target"] = Mathf.Round(flat.magnitude * 10f) / 10f });
            });
        }

        private void ApproachUser(Action<bool, string, JObject> reply)
        {
            WalkTo("user", reply);
        }

        private void LookAt(string target, Action<bool, string, JObject> reply)
        {
            if (!ResolveTarget(target, out Vector3 pos, out _, out string error)) { reply(false, error, null); return; }
            _avatar.Face(pos, (ok, reason) => reply(ok, reason, null));
        }

        private void RegisterMarker(string label, Action<bool, string, JObject> reply)
        {
            if (string.IsNullOrWhiteSpace(label)) { reply(false, "a label is required", null); return; }
            if (!_provider.RaycastEnvironment(_provider.PointerRay, out Vector3 point))
            {
                reply(false, "could not tell where the user is pointing; ask them to point at the object or the floor beside it", null);
                return;
            }
            TrackedObject o = _world.Upsert(label, point, new Vector3(0.5f, 0.5f, 0.5f), ObjectSource.Manual, 1f);
            _world.RefreshReachability(_avatar.transform.position);
            reply(true, null, new JObject { ["id"] = o.id, ["label"] = o.label, ["origin"] = "registered by the user, not camera-detected", ["reachable"] = o.reachable });
        }

        /// <summary>Camera frame -> backend vision model -> image points -> depth raycast -> world model.</summary>
        private IEnumerator Scan(string id, Action<bool, string, JObject> reply)
        {
            if (!_provider.HasVision || !_provider.TryCaptureFrame(out byte[] jpeg, out Func<Vector2, Vector3?> locate))
            {
                reply(false, "the headset camera is not available (no permission or unsupported device)", null);
                yield break;
            }
            _pendingFrameId = id;
            _pendingDetections = null;
            _pendingDetectionError = null;
            _backend.Send(new JObject { ["type"] = "frame", ["id"] = id, ["jpeg"] = Convert.ToBase64String(jpeg) });

            float deadline = Time.time + 25f;
            while (_pendingDetections == null && Time.time < deadline) yield return null;
            _pendingFrameId = null;
            if (_pendingDetections == null) { reply(false, "the vision model did not answer in time", null); yield break; }
            if (!string.IsNullOrEmpty(_pendingDetectionError)) { reply(false, "vision failed: " + _pendingDetectionError, null); yield break; }

            var found = new JArray();
            int unlocated = 0;
            var seen = new HashSet<string>();
            foreach (JToken item in _pendingDetections)
            {
                var pt = new Vector2((float)item["x"], (float)item["y"]);
                Vector3? worldPos = locate(pt);
                if (!worldPos.HasValue) { unlocated++; continue; }
                TrackedObject o = _world.Upsert((string)item["label"], worldPos.Value, new Vector3(0.4f, 0.4f, 0.4f), ObjectSource.Detected, (float)item["confidence"]);
                if (seen.Add(o.id)) found.Add(new JObject { ["id"] = o.id, ["label"] = o.label, ["origin"] = o.source == ObjectSource.Detected ? "seen by the headset camera" : "already known, re-confirmed by camera" });
            }
            _world.RefreshReachability(_avatar.transform.position);
            reply(true, null, new JObject { ["objects"] = found, ["seen_but_not_located_in_3d"] = unlocated });
        }
    }
}
