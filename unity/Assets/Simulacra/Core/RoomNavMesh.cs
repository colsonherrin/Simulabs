using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

namespace Simulacra
{
    /// <summary>
    /// Builds a runtime NavMesh from RoomGeometry. Pure UnityEngine.AI, no platform SDK, so the
    /// same navigation runs on Quest, XREAL and in the editor. The LLM never touches this layer.
    /// </summary>
    public static class RoomNavMesh
    {
        public const float AgentRadius = 0.22f;
        public const float AgentHeight = 1.7f;

        private static NavMeshDataInstance s_instance;
        private static NavMeshData s_data;

        public static bool IsBuilt => s_instance.valid;

        public static bool Build(RoomGeometry room)
        {
            Clear();
            if (room == null || room.floor.Count == 0) return false;

            var sources = new List<NavMeshBuildSource>();
            foreach (var f in room.floor)
            {
                // Thin slab whose top face sits exactly on the physical floor.
                var size = new Vector3(f.size.x, 0.02f, f.size.z);
                sources.Add(new NavMeshBuildSource
                {
                    shape = NavMeshBuildSourceShape.Box,
                    size = size,
                    transform = Matrix4x4.TRS(new Vector3(f.center.x, room.floorY - 0.01f, f.center.z), f.Rotation, Vector3.one),
                    area = 0, // Walkable
                });
            }
            foreach (var o in room.obstacles)
            {
                // Anything that starts above head height is not in the way.
                if (o.MinY > room.floorY + AgentHeight) continue;
                float top = Mathf.Max(o.MaxY, room.floorY + 0.3f);
                float height = top - room.floorY + 0.2f;
                sources.Add(new NavMeshBuildSource
                {
                    shape = NavMeshBuildSourceShape.ModifierBox,
                    size = new Vector3(o.size.x, height, o.size.z),
                    transform = Matrix4x4.TRS(new Vector3(o.center.x, room.floorY - 0.1f + height * 0.5f, o.center.z), o.Rotation, Vector3.one),
                    area = 1, // Not Walkable
                });
            }

            NavMeshBuildSettings settings = NavMesh.GetSettingsByID(0);
            settings.agentRadius = AgentRadius;
            settings.agentHeight = AgentHeight;
            settings.agentClimb = 0.05f;
            settings.agentSlope = 5f;
            settings.overrideVoxelSize = true;
            settings.voxelSize = 0.04f;
            settings.minRegionArea = 0.1f;

            Bounds bounds = room.FloorBounds();
            bounds.Expand(new Vector3(1f, 0f, 1f));
            bounds.SetMinMax(new Vector3(bounds.min.x, room.floorY - 0.5f, bounds.min.z), new Vector3(bounds.max.x, room.floorY + 2.5f, bounds.max.z));

            s_data = NavMeshBuilder.BuildNavMeshData(settings, sources, bounds, Vector3.zero, Quaternion.identity);
            if (s_data == null) return false;
            s_instance = NavMesh.AddNavMeshData(s_data);
            return s_instance.valid && NavMesh.SamplePosition(bounds.center, out _, Mathf.Max(bounds.extents.x, bounds.extents.z) + 1f, NavMesh.AllAreas);
        }

        public static void Clear()
        {
            if (s_instance.valid) s_instance.Remove();
            if (s_data != null) Object.Destroy(s_data);
            s_data = null;
        }

        /// <summary>Nearest walkable point within <paramref name="radius"/>, or false.</summary>
        public static bool Snap(Vector3 p, float radius, out Vector3 snapped)
        {
            if (NavMesh.SamplePosition(p, out NavMeshHit hit, radius, NavMesh.AllAreas)) { snapped = hit.position; return true; }
            snapped = p;
            return false;
        }

        public static bool HasCompletePath(Vector3 from, Vector3 to, NavMeshPath path = null)
        {
            path = path ?? new NavMeshPath();
            return NavMesh.CalculatePath(from, to, NavMesh.AllAreas, path) && path.status == NavMeshPathStatus.PathComplete;
        }

        /// <summary>
        /// A reachable place to stand next to something: tries points on a ring around the target,
        /// nearest to <paramref name="from"/> first.
        /// </summary>
        public static bool FindStandPoint(Vector3 target, float ringRadius, Vector3 from, out Vector3 stand)
        {
            stand = target;
            if (!Snap(from, 1.0f, out Vector3 start)) return false;
            Vector3 toFrom = from - target; toFrom.y = 0f;
            float baseAngle = toFrom.sqrMagnitude > 1e-4f ? Mathf.Atan2(toFrom.x, toFrom.z) * Mathf.Rad2Deg : 0f;
            var path = new NavMeshPath();
            foreach (float r in new[] { ringRadius, ringRadius + 0.3f, ringRadius + 0.7f })
            {
                for (int i = 0; i < 12; i++)
                {
                    // 0, +30, -30, +60, -60 ... fan out from the side facing the walker.
                    float offset = ((i + 1) / 2) * 30f * ((i % 2 == 0) ? -1f : 1f);
                    Vector3 dir = Quaternion.Euler(0f, baseAngle + offset, 0f) * Vector3.forward;
                    Vector3 candidate = new Vector3(target.x, start.y, target.z) + dir * r;
                    if (!Snap(candidate, 0.2f, out Vector3 snapped)) continue;
                    if (!HasCompletePath(start, snapped, path)) continue;
                    stand = snapped;
                    return true;
                }
            }
            return false;
        }
    }
}
