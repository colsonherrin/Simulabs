using UnityEngine;

namespace Simulacra
{
    /// <summary>
    /// Makes any imported character life-sized and stands it on its own feet.
    /// One place decides scale and vertical offset, so "tiny", "giant", "floating" and "sunk into
    /// the floor" are all the same check instead of four separate bugs.
    /// </summary>
    public static partial class AvatarFit
    {
        /// <summary>World-space vertical extent of everything the body renders. False if it renders nothing.</summary>
        public static bool Measure(GameObject body, out float minY, out float maxY)
        {
            minY = float.MaxValue;
            maxY = float.MinValue;
            foreach (Renderer r in body.GetComponentsInChildren<Renderer>())
            {
                if (r is ParticleSystemRenderer || r is TrailRenderer || r is LineRenderer) continue;
                Bounds b = r.bounds;
                if (b.size.sqrMagnitude < 1e-8f) continue;
                minY = Mathf.Min(minY, b.min.y);
                maxY = Mathf.Max(maxY, b.max.y);
            }
            return maxY > minY;
        }

        /// <summary>
        /// Scale and lift <paramref name="body"/> (a child of the avatar root, root at identity) so it
        /// is life-sized with its soles on the root's origin. Returns the final height in metres and a
        /// one-line report for the log / HUD.
        /// </summary>
        public static float Apply(GameObject body, float requestedHeight, out string report)
        {
            if (!Measure(body, out float minY, out float maxY))
            {
                report = "avatar has no renderers; size not checked";
                return 0f;
            }
            float measured = maxY - minY;
            float scale = ScaleFor(measured, requestedHeight);
            if (!Mathf.Approximately(scale, 1f))
            {
                body.transform.localScale *= scale;
                Measure(body, out minY, out maxY);
            }
            float parentY = body.transform.parent != null ? body.transform.parent.position.y : 0f;
            Vector3 lp = body.transform.localPosition;
            lp.y = LiftFor(minY - parentY, lp.y);
            body.transform.localPosition = lp;

            float height = maxY - minY;
            report = Mathf.Approximately(scale, 1f)
                ? $"avatar height {height:0.00} m (as authored)"
                : $"avatar height {measured:0.00} m rescaled x{scale:0.###} to {height:0.00} m";
            return height;
        }
    }
}
