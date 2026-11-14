using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace Simulacra
{
    /// <summary>How an object entered the world model. Only Detected may be described as seen by camera.</summary>
    public enum ObjectSource { Detected, RoomScan, Manual, Simulated }

    public class TrackedObject
    {
        public string id;
        public string label;
        public Vector3 position;
        public Vector3 size;
        public ObjectSource source;
        public float confidence;
        public float lastSeenTime;
        public bool reachable = true;
        public int observations = 1;

        public string SourceKey
        {
            get
            {
                switch (source)
                {
                    case ObjectSource.Detected: return "detected";
                    case ObjectSource.RoomScan: return "room_scan";
                    case ObjectSource.Manual: return "manual";
                    default: return "simulated";
                }
            }
        }
    }

    /// <summary>
    /// Device-side world model: the single place that maps ids like "chair_1" to positions.
    /// The AI only ever names ids; positions are resolved and validated here.
    /// </summary>
    public class WorldModel
    {
        public RoomGeometry room;
        public readonly Dictionary<string, TrackedObject> objects = new Dictionary<string, TrackedObject>();
        private readonly Dictionary<string, int> _counters = new Dictionary<string, int>();

        /// <summary>Two sightings of the same label closer than this are the same object.</summary>
        public float mergeRadius = 0.75f;

        public bool TryGet(string id, out TrackedObject obj)
        {
            obj = null;
            if (string.IsNullOrEmpty(id)) return false;
            foreach (var kv in objects)
            {
                if (string.Equals(kv.Key, id.Trim(), System.StringComparison.OrdinalIgnoreCase)) { obj = kv.Value; return true; }
            }
            return false;
        }

        /// <summary>Add an observation. Re-observing a known object refines it instead of duplicating it.</summary>
        public TrackedObject Upsert(string label, Vector3 position, Vector3 size, ObjectSource source, float confidence)
        {
            label = Sanitize(label);
            TrackedObject match = null;
            float best = mergeRadius;
            foreach (var o in objects.Values)
            {
                if (o.label != label) continue;
                float d = Vector3.Distance(o.position, position);
                if (d < best) { best = d; match = o; }
            }
            if (match != null)
            {
                // A camera sighting must not overwrite a room-scan/manual position or its origin.
                if (match.source == source)
                {
                    match.observations++;
                    match.position = Vector3.Lerp(match.position, position, 1f / Mathf.Min(match.observations, 4));
                    match.confidence = Mathf.Max(match.confidence * 0.9f, confidence);
                    if (size != Vector3.zero) match.size = size;
                }
                match.lastSeenTime = Time.time;
                return match;
            }

            _counters.TryGetValue(label, out int n);
            _counters[label] = ++n;
            var obj = new TrackedObject
            {
                id = label + "_" + n,
                label = label,
                position = position,
                size = size,
                source = source,
                confidence = Mathf.Clamp01(confidence),
                lastSeenTime = Time.time,
            };
            objects[obj.id] = obj;
            return obj;
        }

        public bool Remove(string id)
        {
            return TryGet(id, out var o) && objects.Remove(o.id);
        }

        public void RemoveBySource(ObjectSource source)
        {
            var dead = new List<string>();
            foreach (var kv in objects) if (kv.Value.source == source) dead.Add(kv.Key);
            foreach (var k in dead) objects.Remove(k);
        }

        /// <summary>Distance from an object's centre at which the avatar should stand.</summary>
        public static float StandOff(TrackedObject o)
        {
            float footprint = Mathf.Max(o.size.x, o.size.z) * 0.5f;
            return Mathf.Clamp(footprint + 0.45f, 0.6f, 2.0f);
        }

        public void RefreshReachability(Vector3 from)
        {
            if (!RoomNavMesh.IsBuilt) return;
            foreach (var o in objects.Values)
                o.reachable = RoomNavMesh.FindStandPoint(o.position, StandOff(o), from, out _);
        }

        private int _reachCursor;

        /// <summary>Re-check one object per call (round robin), so the periodic refresh never causes a frame hitch.</summary>
        public void RefreshNextReachability(Vector3 from)
        {
            if (!RoomNavMesh.IsBuilt || objects.Count == 0) return;
            _reachCursor %= objects.Count;
            int i = 0;
            foreach (var o in objects.Values)
            {
                if (i++ != _reachCursor) continue;
                o.reachable = RoomNavMesh.FindStandPoint(o.position, StandOff(o), from, out _);
                break;
            }
            _reachCursor++;
        }

        public static string Sanitize(string label)
        {
            label = (label ?? "object").Trim().ToLowerInvariant().Replace(' ', '_');
            var sb = new System.Text.StringBuilder();
            foreach (char c in label) if (char.IsLetterOrDigit(c) || c == '_') sb.Append(c);
            return sb.Length == 0 ? "object" : sb.ToString();
        }

        public static JArray V(Vector3 v) => new JArray(Round(v.x), Round(v.y), Round(v.z));
        private static float Round(float f) => Mathf.Round(f * 1000f) / 1000f;

        public JObject ToJson(Vector3 userPos, Vector3 userFwd, Vector3 avatarPos, Vector3 avatarFwd, string avatarState)
        {
            var arr = new JArray();
            foreach (var o in objects.Values)
            {
                arr.Add(new JObject
                {
                    ["id"] = o.id,
                    ["label"] = o.label,
                    ["pos"] = V(o.position),
                    ["size"] = V(o.size),
                    ["source"] = o.SourceKey,
                    ["confidence"] = Round(o.confidence),
                    ["lastSeen"] = Round(Time.time - o.lastSeenTime),
                    ["reachable"] = o.reachable,
                });
            }
            var world = new JObject
            {
                ["user"] = new JObject { ["pos"] = V(userPos), ["fwd"] = V(userFwd) },
                ["avatar"] = new JObject { ["pos"] = V(avatarPos), ["fwd"] = V(avatarFwd), ["state"] = avatarState },
                ["objects"] = arr,
            };
            if (room != null)
            {
                Bounds b = room.FloorBounds();
                world["room"] = new JObject
                {
                    ["source"] = room.source,
                    ["floorY"] = Round(room.floorY),
                    ["size"] = V(b.size),
                    ["obstacles"] = room.obstacles.Count,
                    ["navmesh"] = RoomNavMesh.IsBuilt,
                };
            }
            return world;
        }
    }
}
