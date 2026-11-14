using UnityEngine;

namespace Simulacra
{
    /// <summary>
    /// Stand-in body built from primitives so the whole pipeline runs before a rigged human is
    /// imported. Replace by assigning an avatar prefab on SimulacraApp (see README, "Avatar").
    /// </summary>
    public static class PlaceholderAvatar
    {
        public static GameObject Create(out Transform head, out Transform mouth, out Transform rightArm, out Transform leftArm)
        {
            var root = new GameObject("Avatar (placeholder)");
            var skin = new Color(0.87f, 0.72f, 0.62f);
            var cloth = new Color(0.20f, 0.33f, 0.55f);
            var dark = new Color(0.12f, 0.12f, 0.14f);

            Part(PrimitiveType.Capsule, "Legs", root.transform, new Vector3(0, 0.45f, 0), new Vector3(0.28f, 0.45f, 0.22f), new Color(0.42f, 0.42f, 0.5f)); // not black: black is transparent on see-through glasses
            Part(PrimitiveType.Capsule, "Torso", root.transform, new Vector3(0, 1.15f, 0), new Vector3(0.38f, 0.32f, 0.24f), cloth);
            // Arms hang from shoulder pivots so gestures can swing them.
            leftArm = Pivot("ShoulderL", root.transform, new Vector3(-0.25f, 1.38f, 0));
            rightArm = Pivot("ShoulderR", root.transform, new Vector3(0.25f, 1.38f, 0));
            Part(PrimitiveType.Capsule, "ArmL", leftArm, new Vector3(0, -0.28f, 0), new Vector3(0.09f, 0.3f, 0.09f), cloth);
            Part(PrimitiveType.Capsule, "ArmR", rightArm, new Vector3(0, -0.28f, 0), new Vector3(0.09f, 0.3f, 0.09f), cloth);
            head = Part(PrimitiveType.Sphere, "Head", root.transform, new Vector3(0, 1.6f, 0), new Vector3(0.21f, 0.25f, 0.23f), skin);
            // Children of the head use head-local units.
            Part(PrimitiveType.Sphere, "EyeL", head, new Vector3(-0.2f, 0.1f, 0.42f), new Vector3(0.14f, 0.12f, 0.1f), dark);
            Part(PrimitiveType.Sphere, "EyeR", head, new Vector3(0.2f, 0.1f, 0.42f), new Vector3(0.14f, 0.12f, 0.1f), dark);
            mouth = Part(PrimitiveType.Cube, "Mouth", head, new Vector3(0, -0.22f, 0.44f), new Vector3(0.3f, 0.03f, 0.08f), dark);
            Part(PrimitiveType.Sphere, "Nose", head, new Vector3(0, -0.03f, 0.5f), new Vector3(0.1f, 0.12f, 0.12f), skin);
            return root;
        }

        private static Transform Pivot(string name, Transform parent, Vector3 localPos)
        {
            var go = new GameObject(name);
            go.transform.SetParent(parent, false);
            go.transform.localPosition = localPos;
            return go.transform;
        }

        private static Transform Part(PrimitiveType type, string name, Transform parent, Vector3 localPos, Vector3 localScale, Color color)
        {
            GameObject go = GameObject.CreatePrimitive(type);
            go.name = name;
            if (Application.isPlaying) Object.Destroy(go.GetComponent<Collider>()); else Object.DestroyImmediate(go.GetComponent<Collider>());
            go.transform.SetParent(parent, false);
            go.transform.localPosition = localPos;
            go.transform.localScale = localScale;
            go.GetComponent<Renderer>().material.color = color;
            return go.transform;
        }
    }
}
