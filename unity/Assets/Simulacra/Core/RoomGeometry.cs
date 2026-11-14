using System.Collections.Generic;
using UnityEngine;

namespace Simulacra
{
    /// <summary>
    /// A box standing upright on the floor: yaw only. Every platform reduces its room data
    /// (MRUK anchors, AR planes, depth mesh bounds) to these, which is all navigation needs.
    /// </summary>
    public struct UprightBox
    {
        public Vector3 center;
        public Vector3 size;      // x = along heading's right, y = up, z = along heading
        public float yawDegrees;

        public Quaternion Rotation => Quaternion.Euler(0f, yawDegrees, 0f);
        public float MinY => center.y - size.y * 0.5f;
        public float MaxY => center.y + size.y * 0.5f;

        /// <summary>Fit an upright box around any oriented box (centre, rotation, size).</summary>
        public static UprightBox FromOriented(Vector3 center, Quaternion rotation, Vector3 size)
        {
            // Heading = the local axis that lies flattest on the floor.
            Vector3[] axes = { rotation * Vector3.right, rotation * Vector3.up, rotation * Vector3.forward };
            Vector3 heading = axes[0];
            float flattest = float.MaxValue;
            foreach (var a in axes)
            {
                if (Mathf.Abs(a.y) < flattest) { flattest = Mathf.Abs(a.y); heading = a; }
            }
            heading.y = 0f;
            heading = heading.sqrMagnitude < 1e-6f ? Vector3.forward : heading.normalized;
            Vector3 right = Vector3.Cross(Vector3.up, heading);

            Vector3 half = size * 0.5f;
            Vector3 min = Vector3.positiveInfinity, max = Vector3.negativeInfinity;
            for (int i = 0; i < 8; i++)
            {
                var local = new Vector3((i & 1) == 0 ? -half.x : half.x, (i & 2) == 0 ? -half.y : half.y, (i & 4) == 0 ? -half.z : half.z);
                Vector3 d = rotation * local;
                var p = new Vector3(Vector3.Dot(d, right), d.y, Vector3.Dot(d, heading));
                min = Vector3.Min(min, p);
                max = Vector3.Max(max, p);
            }
            Vector3 mid = (min + max) * 0.5f;
            return new UprightBox
            {
                center = center + right * mid.x + Vector3.up * mid.y + heading * mid.z,
                size = max - min,
                yawDegrees = Mathf.Atan2(heading.x, heading.z) * Mathf.Rad2Deg,
            };
        }

        public bool Raycast(Ray ray, out float distance)
        {
            // Ray vs box in the box's local frame.
            Quaternion inv = Quaternion.Inverse(Rotation);
            var local = new Ray(inv * (ray.origin - center), inv * ray.direction);
            return new Bounds(Vector3.zero, size).IntersectRay(local, out distance) && distance >= 0f;
        }
    }

    /// <summary>The simplified collision map: walkable floor pieces and static obstacles.</summary>
    public class RoomGeometry
    {
        /// <summary>Where this came from, reported verbatim to the AI: "room_scan", "fallback_open_floor", "simulated".</summary>
        public string source = "unknown";
        public float floorY;
        public readonly List<UprightBox> floor = new List<UprightBox>();
        public readonly List<UprightBox> obstacles = new List<UprightBox>();

        public Bounds FloorBounds()
        {
            var b = new Bounds(new Vector3(0, floorY, 0), Vector3.zero);
            bool first = true;
            foreach (var f in floor)
            {
                float r = new Vector2(f.size.x, f.size.z).magnitude * 0.5f;
                var fb = new Bounds(f.center, new Vector3(r * 2, 0.1f, r * 2));
                if (first) { b = fb; first = false; } else b.Encapsulate(fb);
            }
            return b;
        }

        /// <summary>Geometric raycast against the simplified room. Fallback when no depth raycast exists.</summary>
        public bool Raycast(Ray ray, float maxDistance, out Vector3 point)
        {
            float best = maxDistance;
            bool hit = false;
            foreach (var o in obstacles)
            {
                if (o.Raycast(ray, out float d) && d < best) { best = d; hit = true; }
            }
            if (new Plane(Vector3.up, new Vector3(0, floorY, 0)).Raycast(ray, out float fd) && fd < best) { best = fd; hit = true; }
            point = ray.GetPoint(best);
            return hit;
        }

        public static RoomGeometry OpenFloor(Vector3 around, float floorY, float side, string source)
        {
            var g = new RoomGeometry { source = source, floorY = floorY };
            g.floor.Add(new UprightBox { center = new Vector3(around.x, floorY, around.z), size = new Vector3(side, 0.02f, side) });
            return g;
        }
    }
}
