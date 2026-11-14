using Meta.XR;
using Meta.XR.MRUtilityKit;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

namespace Simulacra.EditorTools
{
    /// <summary>Menu: Simulacra > Create Quest Scene. Builds the passthrough scene from code so nothing depends on hand-edited scene files.</summary>
    public static class SimulacraQuestSceneBuilder
    {
        private const string ScenePath = "Assets/Simulacra/Scenes/SimulacraQuest.unity";

        [MenuItem("Simulacra/1. Create Quest Scene")]
        public static void Create()
        {
            if (!EditorSceneManager.SaveCurrentModifiedScenesIfUserWantsTo()) return;
            var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);

            // Camera rig: prefer Meta's prefab, fall back to building it from components.
            GameObject rigGo = null;
            var rigPrefab = AssetDatabase.LoadAssetAtPath<GameObject>("Packages/com.meta.xr.sdk.core/Prefabs/OVRCameraRig.prefab");
            if (rigPrefab != null) rigGo = (GameObject)PrefabUtility.InstantiatePrefab(rigPrefab);
            if (rigGo == null)
            {
                rigGo = new GameObject("OVRCameraRig");
                rigGo.AddComponent<OVRCameraRig>();
            }
            var rig = rigGo.GetComponent<OVRCameraRig>();
            var manager = rigGo.GetComponent<OVRManager>();
            if (manager == null) manager = rigGo.AddComponent<OVRManager>();
            SimulacraSetup.SetProperty(manager, "isInsightPassthroughEnabled", true);
            SimulacraSetup.SetProperty(manager, "_trackingOriginType", 1); // FloorLevel: y = 0 is the physical floor

            foreach (Camera cam in rigGo.GetComponentsInChildren<Camera>(true))
            {
                cam.clearFlags = CameraClearFlags.SolidColor;
                cam.backgroundColor = new Color(0, 0, 0, 0);
                cam.nearClipPlane = 0.1f;
            }

            var passthrough = new GameObject("Passthrough").AddComponent<OVRPassthroughLayer>();
            SimulacraSetup.SetProperty(passthrough, "overlayType", 1); // Underlay: real world behind virtual content

            new GameObject("MRUK").AddComponent<MRUK>(); // loads the Space Setup room on startup
            var raycast = new GameObject("EnvironmentRaycast").AddComponent<EnvironmentRaycastManager>();
            var camera = new GameObject("PassthroughCamera").AddComponent<PassthroughCameraAccess>();

            SimulacraSetup.AddLight();

            var appGo = new GameObject("Simulacra");
            var provider = appGo.AddComponent<QuestSpatialProvider>();
            provider.rig = rig;
            provider.raycastManager = raycast;
            provider.cameraAccess = camera;
            var app = appGo.AddComponent<SimulacraApp>();
            app.provider = provider;
            app.avatarPrefab = SimulacraSetup.FindAvatarPrefab();

            SimulacraSetup.SaveScene(scene, ScenePath, true);
            Debug.Log("[Simulacra] Quest scene created at " + ScenePath + ". Set the backend URL on the 'Simulacra' object, then Build And Run for Android. " +
                      "If Meta > Tools > Project Setup Tool shows outstanding issues, press Fix All first.");
            Selection.activeGameObject = appGo;
        }
    }
}
