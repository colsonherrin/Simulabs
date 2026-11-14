using System.Collections.Generic;
using UnityEngine;

namespace Simulacra
{
    /// <summary>
    /// Finds the main body bones of a character whether or not Unity mapped it as a Humanoid:
    /// first through the Humanoid avatar, then by the bone names of common rigs (3ds Max Biped as
    /// used by Microsoft Rocketbox, Mixamo, generic "LeftUpperArm" style names).
    /// </summary>
    public static class BoneFinder
    {
        private static readonly Dictionary<HumanBodyBones, string[]> Names = new Dictionary<HumanBodyBones, string[]>
        {
            { HumanBodyBones.Hips, new[] { "bip01 pelvis", "hips", "pelvis" } },
            { HumanBodyBones.Spine, new[] { "bip01 spine", "spine" } },
            { HumanBodyBones.Chest, new[] { "bip01 spine1", "spine1", "chest" } },
            { HumanBodyBones.Neck, new[] { "bip01 neck", "neck" } },
            { HumanBodyBones.Head, new[] { "bip01 head", "head" } },
            { HumanBodyBones.Jaw, new[] { "bip01 mjaw", "jaw" } },
            { HumanBodyBones.LeftUpperArm, new[] { "bip01 l upperarm", "leftarm", "leftupperarm", "upperarm_l" } },
            { HumanBodyBones.LeftLowerArm, new[] { "bip01 l forearm", "leftforearm", "leftlowerarm", "lowerarm_l" } },
            { HumanBodyBones.RightUpperArm, new[] { "bip01 r upperarm", "rightarm", "rightupperarm", "upperarm_r" } },
            { HumanBodyBones.RightLowerArm, new[] { "bip01 r forearm", "rightforearm", "rightlowerarm", "lowerarm_r" } },
            { HumanBodyBones.LeftUpperLeg, new[] { "bip01 l thigh", "leftupleg", "leftupperleg", "thigh_l" } },
            { HumanBodyBones.LeftLowerLeg, new[] { "bip01 l calf", "leftleg", "leftlowerleg", "calf_l" } },
            { HumanBodyBones.LeftFoot, new[] { "bip01 l foot", "leftfoot", "foot_l" } },
            { HumanBodyBones.RightUpperLeg, new[] { "bip01 r thigh", "rightupleg", "rightupperleg", "thigh_r" } },
            { HumanBodyBones.RightLowerLeg, new[] { "bip01 r calf", "rightleg", "rightlowerleg", "calf_r" } },
            { HumanBodyBones.RightFoot, new[] { "bip01 r foot", "rightfoot", "foot_r" } },
        };

        public static Transform Find(GameObject body, HumanBodyBones bone)
        {
            if (body == null) return null;
            var animator = body.GetComponentInChildren<Animator>();
            if (animator != null && animator.isHuman)
            {
                Transform mapped = animator.GetBoneTransform(bone);
                if (mapped != null) return mapped;
            }
            if (!Names.TryGetValue(bone, out string[] candidates)) return null;
            Transform[] all = body.GetComponentsInChildren<Transform>(true);
            foreach (string candidate in candidates)
            {
                foreach (Transform t in all)
                {
                    // Compare without a rig prefix such as "mixamorig:".
                    string n = t.name.ToLowerInvariant();
                    int colon = n.LastIndexOf(':');
                    if (colon >= 0) n = n.Substring(colon + 1);
                    if (n == candidate) return t;
                }
            }
            return null;
        }

        /// <summary>True if enough of a skeleton was found to animate walking.</summary>
        public static bool HasLegsAndArms(GameObject body)
        {
            return Find(body, HumanBodyBones.LeftUpperLeg) != null && Find(body, HumanBodyBones.RightUpperLeg) != null
                && Find(body, HumanBodyBones.LeftLowerLeg) != null && Find(body, HumanBodyBones.Head) != null;
        }
    }
}
