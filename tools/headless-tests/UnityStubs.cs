// Stand-ins for the UnityEngine types used by the files under test, following Unity's conventions:
// left-handed, y up, Euler order Z-X-Y, positive yaw turns +z toward +x. Only what is needed.
using System;

namespace UnityEngine
{
    public static class Mathf
    {
        public const float Rad2Deg = 180f / MathF.PI, Deg2Rad = MathF.PI / 180f;
        public static float Abs(float v) => MathF.Abs(v);
        public static float Atan2(float y, float x) => MathF.Atan2(y, x);
        public static float Min(float a, float b) => MathF.Min(a, b);
        public static float Max(float a, float b) => MathF.Max(a, b);
        public static int Min(int a, int b) => Math.Min(a, b);
        public static float Clamp(float v, float lo, float hi) => v < lo ? lo : v > hi ? hi : v;
        public static float Clamp01(float v) => Clamp(v, 0f, 1f);
        public static float Round(float v) => MathF.Round(v, MidpointRounding.ToEven);
        public static float Lerp(float a, float b, float t) => a + (b - a) * Clamp01(t);
        public static bool Approximately(float a, float b) => MathF.Abs(a - b) < 1e-5f;
    }

    public struct Vector2
    {
        public float x, y;
        public Vector2(float x, float y) { this.x = x; this.y = y; }
        public float magnitude => MathF.Sqrt(x * x + y * y);
    }

    public struct Vector3
    {
        public float x, y, z;
        public Vector3(float x, float y, float z) { this.x = x; this.y = y; this.z = z; }
        public static Vector3 zero => new Vector3(0, 0, 0);
        public static Vector3 one => new Vector3(1, 1, 1);
        public static Vector3 up => new Vector3(0, 1, 0);
        public static Vector3 right => new Vector3(1, 0, 0);
        public static Vector3 forward => new Vector3(0, 0, 1);
        public static Vector3 positiveInfinity => new Vector3(float.PositiveInfinity, float.PositiveInfinity, float.PositiveInfinity);
        public static Vector3 negativeInfinity => new Vector3(float.NegativeInfinity, float.NegativeInfinity, float.NegativeInfinity);
        public float sqrMagnitude => x * x + y * y + z * z;
        public float magnitude => MathF.Sqrt(sqrMagnitude);
        public Vector3 normalized { get { float m = magnitude; return m > 1e-9f ? this / m : zero; } }
        public static Vector3 operator +(Vector3 a, Vector3 b) => new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
        public static Vector3 operator -(Vector3 a, Vector3 b) => new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
        public static Vector3 operator -(Vector3 a) => new Vector3(-a.x, -a.y, -a.z);
        public static Vector3 operator *(Vector3 a, float s) => new Vector3(a.x * s, a.y * s, a.z * s);
        public static Vector3 operator *(float s, Vector3 a) => a * s;
        public static Vector3 operator /(Vector3 a, float s) => new Vector3(a.x / s, a.y / s, a.z / s);
        public static bool operator ==(Vector3 a, Vector3 b) => (a - b).sqrMagnitude < 1e-10f;
        public static bool operator !=(Vector3 a, Vector3 b) => !(a == b);
        public override bool Equals(object o) => o is Vector3 v && this == v;
        public override int GetHashCode() => HashCode.Combine(x, y, z);
        public static float Dot(Vector3 a, Vector3 b) => a.x * b.x + a.y * b.y + a.z * b.z;
        public static Vector3 Cross(Vector3 a, Vector3 b) => new Vector3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
        public static Vector3 Min(Vector3 a, Vector3 b) => new Vector3(MathF.Min(a.x, b.x), MathF.Min(a.y, b.y), MathF.Min(a.z, b.z));
        public static Vector3 Max(Vector3 a, Vector3 b) => new Vector3(MathF.Max(a.x, b.x), MathF.Max(a.y, b.y), MathF.Max(a.z, b.z));
        public static float Distance(Vector3 a, Vector3 b) => (a - b).magnitude;
        public static Vector3 Lerp(Vector3 a, Vector3 b, float t) => a + (b - a) * Mathf.Clamp01(t);
        public override string ToString() => $"({x:0.###}, {y:0.###}, {z:0.###})";
    }

    public struct Quaternion
    {
        public float x, y, z, w;
        public Quaternion(float x, float y, float z, float w) { this.x = x; this.y = y; this.z = z; this.w = w; }
        public static Quaternion identity => new Quaternion(0, 0, 0, 1);
        public static Quaternion AngleAxis(float degrees, Vector3 axis)
        {
            axis = axis.normalized;
            float h = degrees * Mathf.Deg2Rad * 0.5f, s = MathF.Sin(h);
            return new Quaternion(axis.x * s, axis.y * s, axis.z * s, MathF.Cos(h));
        }
        // Unity applies Z, then X, then Y (extrinsic), i.e. q = qy * qx * qz.
        public static Quaternion Euler(float x, float y, float z) => AngleAxis(y, Vector3.up) * AngleAxis(x, Vector3.right) * AngleAxis(z, Vector3.forward);
        public static Quaternion Inverse(Quaternion q) => new Quaternion(-q.x, -q.y, -q.z, q.w);
        public static Quaternion operator *(Quaternion a, Quaternion b) => new Quaternion(
            a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
            a.w * b.y + a.y * b.w + a.z * b.x - a.x * b.z,
            a.w * b.z + a.z * b.w + a.x * b.y - a.y * b.x,
            a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z);
        public static Vector3 operator *(Quaternion q, Vector3 v)
        {
            var u = new Vector3(q.x, q.y, q.z);
            return v + 2f * Vector3.Cross(u, Vector3.Cross(u, v) + q.w * v);
        }
    }

    public struct Ray
    {
        public Vector3 origin, direction;
        public Ray(Vector3 origin, Vector3 direction) { this.origin = origin; this.direction = direction.normalized; }
        public Vector3 GetPoint(float d) => origin + direction * d;
    }

    public struct Plane
    {
        private Vector3 _n; private float _d;
        public Plane(Vector3 normal, Vector3 point) { _n = normal.normalized; _d = -Vector3.Dot(_n, point); }
        public bool Raycast(Ray ray, out float enter)
        {
            float vdot = Vector3.Dot(ray.direction, _n), ndot = -Vector3.Dot(ray.origin, _n) - _d;
            if (MathF.Abs(vdot) < 1e-6f) { enter = 0f; return false; }
            enter = ndot / vdot;
            return enter > 0f;
        }
    }

    public struct Bounds
    {
        public Vector3 center, extents;
        public Bounds(Vector3 center, Vector3 size) { this.center = center; extents = size * 0.5f; }
        public Vector3 size { get => extents * 2f; set => extents = value * 0.5f; }
        public Vector3 min => center - extents;
        public Vector3 max => center + extents;
        public void SetMinMax(Vector3 mn, Vector3 mx) { extents = (mx - mn) * 0.5f; center = mn + extents; }
        public void Encapsulate(Bounds b) => SetMinMax(Vector3.Min(min, b.min), Vector3.Max(max, b.max));
        public void Expand(Vector3 amount) => extents = extents + amount * 0.5f;
        public bool IntersectRay(Ray ray, out float distance)
        {
            float tmin = float.NegativeInfinity, tmax = float.PositiveInfinity;
            float[] o = { ray.origin.x, ray.origin.y, ray.origin.z }, d = { ray.direction.x, ray.direction.y, ray.direction.z };
            float[] lo = { min.x, min.y, min.z }, hi = { max.x, max.y, max.z };
            for (int i = 0; i < 3; i++)
            {
                if (MathF.Abs(d[i]) < 1e-9f) { if (o[i] < lo[i] || o[i] > hi[i]) { distance = 0; return false; } continue; }
                float t1 = (lo[i] - o[i]) / d[i], t2 = (hi[i] - o[i]) / d[i];
                tmin = MathF.Max(tmin, MathF.Min(t1, t2));
                tmax = MathF.Min(tmax, MathF.Max(t1, t2));
            }
            distance = tmin;
            return tmax >= MathF.Max(tmin, 0f);
        }
    }

    public static class Time { public static float time; }
}

namespace Simulacra
{
    /// <summary>Navigation needs the engine; reachability is exercised by the in-editor tests instead.</summary>
    public static class RoomNavMesh
    {
        public static bool IsBuilt => false;
        public static bool FindStandPoint(UnityEngine.Vector3 target, float ring, UnityEngine.Vector3 from, out UnityEngine.Vector3 stand) { stand = target; return false; }
    }
}
