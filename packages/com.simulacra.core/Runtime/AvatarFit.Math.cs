namespace Simulacra
{
    /// <summary>The pure arithmetic of avatar fitting, kept free of engine types so it can be tested anywhere.</summary>
    public static partial class AvatarFit
    {
        /// <summary>Heights outside this range are treated as an import-scale mistake, not a design choice.</summary>
        public const float MinPlausible = 1.45f, MaxPlausible = 2.05f;
        public const float DefaultHeight = 1.72f;

        /// <summary>
        /// Scale factor to apply to a body measured at <paramref name="measured"/> metres.
        /// <paramref name="requested"/> &gt; 0 forces that height; 0 keeps a plausible body as authored
        /// and only corrects an implausible one to <see cref="DefaultHeight"/>.
        /// </summary>
        public static float ScaleFor(float measured, float requested)
        {
            if (measured < 0.01f) return 1f;
            if (requested > 0f) return requested / measured;
            if (measured < MinPlausible || measured > MaxPlausible) return DefaultHeight / measured;
            return 1f;
        }

        /// <summary>Local Y to give the body so its lowest point sits exactly at the parent's origin.</summary>
        public static float LiftFor(float lowestPointY, float currentLocalY) => currentLocalY - lowestPointY;
    }
}
