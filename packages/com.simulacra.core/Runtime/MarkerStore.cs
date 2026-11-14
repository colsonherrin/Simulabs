using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace Simulacra
{
    /// <summary>
    /// Remembers objects the user registered by pointing ("this is a chair") across launches.
    /// Positions are stored relative to a frame fixed to the physical room, so they come back in
    /// the right place even though the app's world origin differs every session. They remain
    /// marked as user-registered; nothing here turns them into detections.
    /// </summary>
    public static class MarkerStore
    {
        private static string FilePath => Path.Combine(Application.persistentDataPath, "markers.json");

        public static void Save(WorldModel world, string roomKey, Pose frame)
        {
            try
            {
                JObject all = File.Exists(FilePath) ? JObject.Parse(File.ReadAllText(FilePath)) : new JObject();
                var list = new JArray();
                Quaternion inverse = Quaternion.Inverse(frame.rotation);
                foreach (TrackedObject o in world.objects.Values)
                {
                    if (o.source != ObjectSource.Manual) continue;
                    list.Add(new JObject { ["label"] = o.label, ["pos"] = WorldModel.V(inverse * (o.position - frame.position)), ["size"] = WorldModel.V(o.size) });
                }
                all[roomKey] = list;
                File.WriteAllText(FilePath, all.ToString());
            }
            catch (System.Exception e) { Debug.LogWarning("[Simulacra] could not save markers: " + e.Message); }
        }

        /// <summary>Restore this room's registered objects. Returns how many were restored.</summary>
        public static int Load(WorldModel world, string roomKey, Pose frame)
        {
            try
            {
                if (!File.Exists(FilePath)) return 0;
                var list = JObject.Parse(File.ReadAllText(FilePath))[roomKey] as JArray;
                if (list == null) return 0;
                int n = 0;
                foreach (JToken item in list)
                {
                    Vector3 local = ToVector(item["pos"]);
                    world.Upsert((string)item["label"], frame.position + frame.rotation * local, ToVector(item["size"]), ObjectSource.Manual, 1f);
                    n++;
                }
                return n;
            }
            catch (System.Exception e)
            {
                Debug.LogWarning("[Simulacra] could not load markers: " + e.Message);
                return 0;
            }
        }

        private static Vector3 ToVector(JToken t)
        {
            var a = t as JArray;
            return a != null && a.Count == 3 ? new Vector3((float)a[0], (float)a[1], (float)a[2]) : Vector3.zero;
        }
    }
}
