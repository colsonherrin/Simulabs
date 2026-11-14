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
        private readonly GestureController _gestures;

        /// <summary>Optional: make the character glance at a world point for some seconds.</summary>
        public Action<Vector3, float> focus;

        /// <summary>Milliseconds the last movement spent on validation + path planning, measured on device.</summary>
        public float LastPlanMs { get; private set; }

        private string _pendingFrameId;
        private JArray _pendingDetections;
        private string _pendingDetectionError;

        public string LastAction { get; private set; } = "";

        public ActionExecutor(WorldModel world, AvatarController avatar, SpatialProvider provider, BackendClient backend, MonoBehaviour host, GestureController gestures = null)
        {
            _world = world;
            _avatar = avatar;
            _provider = provider;
            _backend = backend;
            _host = host;
            _gestures = gestures;
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
                    case "walk_to": WalkTo(id, target, reply); break;
                    case "inspect_object": WalkTo(id, target, reply); break;
                    case "approach_user": WalkTo(id, "user", reply); break;
                    case "follow_user": FollowUser(id, reply); break;
                    case "gesture": Gesture((string)p?["type"], reply); break;
                    case "look_at": LookAt(target, reply); break;
                    case "stop": _avatar.Stop(); reply(true, null, null); break;
                    case "register_marker": RegisterMarker((string)p?["label"], reply); break;
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
                focus?.Invoke(o.position, 4f);
                position = o.position;
                standOff = WorldModel.StandOff(o);
                return true;
            }
            error = "unknown target '" + target + "'";
            return false;
        }

        /// <summary>Tell the backend the body has begun: the end of the speech-to-action path.</summary>
        private void ReportStarted(string id, float planMs, float pathMetres)
        {
            LastPlanMs = planMs;
            _backend.Send(new JObject
            {
                ["type"] = "event",
                ["name"] = "action_started",
                ["data"] = new JObject { ["id"] = id, ["plan_ms"] = Mathf.Round(planMs * 10f) / 10f, ["path_m"] = Mathf.Round(pathMetres * 10f) / 10f },
            });
        }

        private void WalkTo(string id, string target, Action<bool, string, JObject> reply)
        {
            if (!ResolveTarget(target, out Vector3 pos, out float standOff, out string error)) { reply(false, error, null); return; }
            if (!RoomNavMesh.IsBuilt) { reply(false, "no walkable floor has been mapped yet", null); return; }
            Vector3 gap = pos - _avatar.transform.position; gap.y = 0f;
            if (gap.magnitude <= standOff + 0.25f)
            {
                // Already there: just face it.
                ReportStarted(id, 0f, 0f);
                _avatar.Face(pos, (ok, reason) => reply(ok, reason, new JObject { ["metres_from_target"] = Mathf.Round(gap.magnitude * 10f) / 10f, ["note"] = "was already next to it" }));
                return;
            }

            // The goal is a function, not a point: the controller re-evaluates it while walking, so a
            // user who keeps moving (or an object whose position was refined) is followed locally.
            Vector3 plannedFor = pos, plannedStand = default;
            bool havePlan = false;
            AvatarController.GoalProvider goal = (out Vector3 stand, out Vector3 face) =>
            {
                stand = default; face = default;
                if (!ResolveTarget(target, out Vector3 now, out float off, out _)) return false;
                face = now;
                if (havePlan && (now - plannedFor).sqrMagnitude < 0.25f * 0.25f) { stand = plannedStand; return true; }
                if (!RoomNavMesh.FindStandPoint(now, off, _avatar.transform.position, out stand)) return false;
                plannedFor = now; plannedStand = stand; havePlan = true;
                return true;
            };

            float started = Time.time;
            _avatar.WalkTo(goal,
                (ok, reason) =>
                {
                    ResolveTarget(target, out Vector3 at, out _, out _);
                    Vector3 flat = at - _avatar.transform.position; flat.y = 0f;
                    reply(ok, reason, new JObject
                    {
                        ["metres_from_target"] = Mathf.Round(flat.magnitude * 10f) / 10f,
                        ["seconds"] = Mathf.Round((Time.time - started) * 10f) / 10f,
                        ["plan_ms"] = Mathf.Round(LastPlanMs * 10f) / 10f,
                    });
                },
                (planMs, pathMetres) => ReportStarted(id, planMs, pathMetres));
        }

        private void FollowUser(string id, Action<bool, string, JObject> reply)
        {
            if (!RoomNavMesh.IsBuilt || !_avatar.OnNavMesh) { reply(false, "no walkable floor has been mapped yet", null); return; }
            _avatar.Follow(UserFloorPosition, userDistance);
            ReportStarted(id, 0f, 0f);
            reply(true, null, new JObject { ["following"] = true, ["note"] = "keeps following until stop_moving or another movement" });
        }

        private void Gesture(string type, Action<bool, string, JObject> reply)
        {
            if (_gestures == null) { reply(false, "this body cannot gesture", null); return; }
            if (!_gestures.Play(type)) { reply(false, "unknown gesture '" + type + "'", null); return; }
            reply(true, null, null);
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
