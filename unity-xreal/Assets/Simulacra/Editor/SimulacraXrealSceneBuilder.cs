using System.Linq;
using Unity.XR.CoreUtils;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

namespace Simulacra.EditorTools
{
    /// <summary>
    /// Menu: Simulacra > 1. Create XREAL Scene. Starts from XREAL's own PlaneDetection sample scene
    /// (known-good rig, AR Session and plane manager) and adds the Simulacra objects to a copy of it.
    /// </summary>
    public static class SimulacraXrealSceneBuilder
    {
        private const string ScenePath = "Assets/Simulacra/Scenes/SimulacraXreal.unity";
        private const string RigPrefab = "Packages/com.xreal.xr/Runtime/Prefabs/XR Interaction Setup.prefab";

        [MenuItem("Simulacra/1. Create XREAL Scene")]
        public static void Create()
        {
            if (!EditorSceneManager.SaveCurrentModifiedScenesIfUserWantsTo()) return;

            string sample = AssetDatabase.FindAssets("PlaneDetection t:Scene")
                .Select(AssetDatabase.GUIDToAssetPath)
                .FirstOrDefault(p => p.Contains("XREAL") && p.EndsWith("PlaneDetection.unity"));

            Scene scene;
            if (sample != null)
            {
                scene = EditorSceneManager.OpenScene(sample, OpenSceneMode.Single);
            }
            else
            {
                Debug.LogWarning("[Simulacra] XREAL 'AR Features' sample not found; building the rig from the SDK prefab instead.");
                scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);
                var rig = AssetDatabase.LoadAssetAtPath<GameObject>(RigPrefab);
                if (rig == null)
                {
                    EditorUtility.DisplayDialog("Simulacra", "The XREAL SDK is not installed. Put com.xreal.xr.tar.gz in the unity-xreal folder (see README) and reopen the project.", "OK");
                    return;
                }
                PrefabUtility.InstantiatePrefab(rig);
                SimulacraSetup.AddLight();
            }

            var origin = Object.FindObjectOfType<XROrigin>();
            if (origin == null)
            {
                EditorUtility.DisplayDialog("Simulacra", "No XR Origin found in the scene; cannot continue.", "OK");
                return;
            }

            var planes = origin.GetComponent<ARPlaneManager>();
            if (planes == null)
            {
                planes = origin.gameObject.AddComponent<ARPlaneManager>();
                planes.requestedDetectionMode = PlaneDetectionMode.Horizontal | PlaneDetectionMode.Vertical;
            }
            if (Object.FindObjectOfType<ARSession>() == null)
            {
                var session = new GameObject("AR Session");
                session.AddComponent<ARSession>();
                session.AddComponent<ARInputManager>();
            }

            // The sample's floating logo is not part of our scene.
            foreach (GameObject go in scene.GetRootGameObjects())
                if (go.name.Contains("XREALLogo")) Object.DestroyImmediate(go);

            RenderSettings.ambientMode = UnityEngine.Rendering.AmbientMode.Flat;
            RenderSettings.ambientLight = new Color(0.6f, 0.6f, 0.6f);

            var appGo = new GameObject("Simulacra");
            var provider = appGo.AddComponent<XrealSpatialProvider>();
            provider.origin = origin;
            provider.planeManager = planes;
            var app = appGo.AddComponent<SimulacraApp>();
            app.provider = provider;
            // Narrow field of view (about 46 x 27 degrees): a 1.7 m body only fits in view from roughly 3.5 m.
            app.spawnDistance = 3.2f;
            app.avatarPrefab = SimulacraSetup.FindAvatarPrefab();

            SimulacraSetup.SaveScene(scene, ScenePath, true);
            Selection.activeGameObject = appGo;
            Debug.Log("[Simulacra] XREAL scene created at " + ScenePath + ". Set the backend URL on the 'Simulacra' object, then build for Android.");
        }
    }
}
