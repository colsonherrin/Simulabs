using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEditor;
using UnityEditor.Animations;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace Simulacra.EditorTools
{
    /// <summary>Platform-neutral editor helpers: simulator scene and avatar import.</summary>
    public static class SimulacraSetup
    {
        public const string AvatarFolder = "Assets/Simulacra/Avatar";
        private const string ControllerPath = AvatarFolder + "/SimulacraAvatar.controller";
        private const string PrefabPath = AvatarFolder + "/SimulacraAvatar.prefab";
        private const string SimScenePath = "Assets/Simulacra/Scenes/SimulacraEditorSim.unity";

        [MenuItem("Simulacra/2. Create Editor Sim Scene (no headset)")]
        public static void CreateSimScene()
        {
            if (!EditorSceneManager.SaveCurrentModifiedScenesIfUserWantsTo()) return;
            var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);

            var camGo = new GameObject("Main Camera") { tag = "MainCamera" };
            var cam = camGo.AddComponent<Camera>();
            cam.nearClipPlane = 0.1f;
            cam.backgroundColor = new Color(0.1f, 0.1f, 0.12f);
            cam.clearFlags = CameraClearFlags.SolidColor;
            camGo.AddComponent<AudioListener>();
            AddLight();

            var appGo = new GameObject("Simulacra");
            var provider = appGo.AddComponent<EditorSimProvider>();
            provider.userCamera = cam;
            var app = appGo.AddComponent<SimulacraApp>();
            app.provider = provider;
            app.backendUrl = "ws://localhost:8787/device";
            app.halfDuplex = true;
            app.avatarPrefab = FindAvatarPrefab();

            SaveScene(scene, SimScenePath, false);
            Debug.Log("[Simulacra] Sim scene created. Start the backend (npm start in backend/), then press Play.");
        }

        /// <summary>
        /// Turns the model + animation files in Assets/Simulacra/Avatar into a ready prefab:
        /// humanoid rig, looping clips, an Animator Controller with the Speed/Turn/Speaking contract.
        /// Clips are matched by FILE name: *idle*, *walk*, *talk*|*speak*, *turn*left*, *turn*right*.
        /// </summary>
        [MenuItem("Simulacra/3. Setup Avatar From Assets-Simulacra-Avatar")]
        public static void SetupAvatar()
        {
            string[] modelPaths = AssetDatabase.FindAssets("t:Model", new[] { AvatarFolder }).Select(AssetDatabase.GUIDToAssetPath).ToArray();
            if (modelPaths.Length == 0)
            {
                EditorUtility.DisplayDialog("Simulacra", "Put a rigged character (FBX) and its idle / walk / talk animation files in " + AvatarFolder + " first. See README > Avatar.", "OK");
                return;
            }

            // 1. Find the file that carries the skinned mesh: that is the character.
            string characterPath = modelPaths
                .OrderByDescending(p => AssetDatabase.LoadAllAssetsAtPath(p).OfType<SkinnedMeshRenderer>().Count())
                .ThenByDescending(p => new FileInfo(p).Length)
                .First();

            // 2. Humanoid rig everywhere, character first so the others can copy its avatar.
            ConfigureImporter(characterPath, null);
            var characterAvatar = AssetDatabase.LoadAllAssetsAtPath(characterPath).OfType<Avatar>().FirstOrDefault();
            foreach (string p in modelPaths) if (p != characterPath) ConfigureImporter(p, characterAvatar);

            // 3. Collect clips, named after their file (Mixamo calls every clip "mixamo.com").
            var clips = new Dictionary<string, AnimationClip>();
            foreach (string p in modelPaths)
            {
                AnimationClip clip = AssetDatabase.LoadAllAssetsAtPath(p).OfType<AnimationClip>().FirstOrDefault(c => !c.name.StartsWith("__preview__"));
                if (clip != null) clips[Path.GetFileNameWithoutExtension(p).ToLowerInvariant()] = clip;
            }
            AnimationClip idle = Pick(clips, "idle", "breath", "stand");
            AnimationClip walk = Pick(clips, "walk");
            AnimationClip talk = Pick(clips, "talk", "speak");
            AnimationClip turnL = clips.FirstOrDefault(kv => kv.Key.Contains("turn") && kv.Key.Contains("left")).Value;
            AnimationClip turnR = clips.FirstOrDefault(kv => kv.Key.Contains("turn") && kv.Key.Contains("right")).Value;

            AnimatorController controller = BuildController(idle, walk, talk, turnL, turnR);

            // 4. Prefab.
            var characterAsset = AssetDatabase.LoadAssetAtPath<GameObject>(characterPath);
            var instance = (GameObject)PrefabUtility.InstantiatePrefab(characterAsset);
            var animator = instance.GetComponent<Animator>();
            if (animator == null) animator = instance.AddComponent<Animator>();
            animator.runtimeAnimatorController = controller;
            animator.applyRootMotion = false;
            animator.cullingMode = AnimatorCullingMode.AlwaysAnimate;
            GameObject prefab = PrefabUtility.SaveAsPrefabAsset(instance, PrefabPath);
            Object.DestroyImmediate(instance);

            foreach (var app in Object.FindObjectsOfType<SimulacraApp>())
            {
                app.avatarPrefab = prefab;
                EditorUtility.SetDirty(app);
                EditorSceneManager.MarkSceneDirty(app.gameObject.scene);
            }

            string report = $"Character: {Path.GetFileName(characterPath)}\nidle: {Name(idle)}\nwalk: {Name(walk)}\ntalk: {Name(talk)}\nturn left/right: {Name(turnL)} / {Name(turnR)}\n\nPrefab: {PrefabPath}\n" +
                            (walk == null ? "\nNo *walk* clip found: the avatar will glide. Add a walking animation exported 'In Place'." : "") +
                            (animator.isHuman ? "" : "\nWarning: the rig did not import as Humanoid; head/jaw lookup will be skipped.");
            Debug.Log("[Simulacra] Avatar ready.\n" + report);
            EditorUtility.DisplayDialog("Simulacra avatar", report + "\nSave the scene to keep the assignment.", "OK");
        }

        private static string Name(AnimationClip c) => c == null ? "(none)" : "found";

        private static AnimationClip Pick(Dictionary<string, AnimationClip> clips, params string[] keys)
        {
            foreach (string k in keys)
                foreach (var kv in clips)
                    if (kv.Key.Contains(k) && !kv.Key.Contains("turn")) return kv.Value;
            return null;
        }

        private static void ConfigureImporter(string path, Avatar copyFrom)
        {
            var importer = AssetImporter.GetAtPath(path) as ModelImporter;
            if (importer == null) return;
            importer.animationType = ModelImporterAnimationType.Human;
            if (copyFrom != null && AssetDatabase.LoadAllAssetsAtPath(path).OfType<SkinnedMeshRenderer>().Count() == 0)
            {
                importer.avatarSetup = ModelImporterAvatarSetup.CopyFromOther;
                importer.sourceAvatar = copyFrom;
            }
            else importer.avatarSetup = ModelImporterAvatarSetup.CreateFromThisModel;

            ModelImporterClipAnimation[] clips = importer.defaultClipAnimations;
            foreach (var c in clips)
            {
                c.loopTime = true;
                c.lockRootRotation = true;
                c.keepOriginalOrientation = true;
                c.lockRootHeightY = true;
                c.keepOriginalPositionY = true;
            }
            if (clips.Length > 0) importer.clipAnimations = clips;
            importer.SaveAndReimport();
        }

        private static AnimatorController BuildController(AnimationClip idle, AnimationClip walk, AnimationClip talk, AnimationClip turnL, AnimationClip turnR)
        {
            AssetDatabase.DeleteAsset(ControllerPath);
            var controller = AnimatorController.CreateAnimatorControllerAtPath(ControllerPath);
            controller.AddParameter("Speed", AnimatorControllerParameterType.Float);
            controller.AddParameter("Turn", AnimatorControllerParameterType.Float);
            controller.AddParameter("Speaking", AnimatorControllerParameterType.Bool);
            AnimatorStateMachine sm = controller.layers[0].stateMachine;

            // Locomotion: idle <-> walk blended by real speed.
            AnimatorState locomotion = controller.CreateBlendTreeInController("Locomotion", out BlendTree tree, 0);
            tree.blendType = BlendTreeType.Simple1D;
            tree.blendParameter = "Speed";
            tree.useAutomaticThresholds = false;
            if (idle != null) tree.AddChild(idle, 0f);
            if (walk != null) tree.AddChild(walk, 0.9f);
            sm.defaultState = locomotion;

            if (talk != null)
            {
                AnimatorState talking = sm.AddState("Talk");
                talking.motion = talk;
                var enter = locomotion.AddTransition(talking);
                enter.hasExitTime = false; enter.duration = 0.3f;
                enter.AddCondition(AnimatorConditionMode.If, 0, "Speaking");
                enter.AddCondition(AnimatorConditionMode.Less, 0.1f, "Speed");
                foreach (bool moving in new[] { false, true })
                {
                    var exit = talking.AddTransition(locomotion);
                    exit.hasExitTime = false; exit.duration = 0.3f;
                    if (moving) exit.AddCondition(AnimatorConditionMode.Greater, 0.1f, "Speed");
                    else exit.AddCondition(AnimatorConditionMode.IfNot, 0, "Speaking");
                }
            }

            AddTurn(sm, locomotion, "TurnLeft", turnL, AnimatorConditionMode.Less, -0.35f, AnimatorConditionMode.Greater, -0.15f);
            AddTurn(sm, locomotion, "TurnRight", turnR, AnimatorConditionMode.Greater, 0.35f, AnimatorConditionMode.Less, 0.15f);

            EditorUtility.SetDirty(controller);
            AssetDatabase.SaveAssets();
            return controller;
        }

        private static void AddTurn(AnimatorStateMachine sm, AnimatorState locomotion, string name, AnimationClip clip,
            AnimatorConditionMode enterMode, float enterAt, AnimatorConditionMode exitMode, float exitAt)
        {
            if (clip == null) return;
            AnimatorState state = sm.AddState(name);
            state.motion = clip;
            var enter = locomotion.AddTransition(state);
            enter.hasExitTime = false; enter.duration = 0.15f;
            enter.AddCondition(enterMode, enterAt, "Turn");
            enter.AddCondition(AnimatorConditionMode.Less, 0.1f, "Speed");
            var exit = state.AddTransition(locomotion);
            exit.hasExitTime = false; exit.duration = 0.2f;
            exit.AddCondition(exitMode, exitAt, "Turn");
            var walkOut = state.AddTransition(locomotion);
            walkOut.hasExitTime = false; walkOut.duration = 0.15f;
            walkOut.AddCondition(AnimatorConditionMode.Greater, 0.1f, "Speed");
        }

        // ---- shared helpers

        public static GameObject FindAvatarPrefab() => AssetDatabase.LoadAssetAtPath<GameObject>(PrefabPath);

        public static void AddLight()
        {
            var light = new GameObject("Directional Light").AddComponent<Light>();
            light.type = LightType.Directional;
            light.intensity = 1.1f;
            light.shadows = LightShadows.None;
            light.transform.rotation = Quaternion.Euler(50f, -30f, 0f);
            RenderSettings.ambientMode = UnityEngine.Rendering.AmbientMode.Flat;
            RenderSettings.ambientLight = new Color(0.55f, 0.55f, 0.55f);
        }

        public static void SaveScene(Scene scene, string path, bool makeBuildScene)
        {
            Directory.CreateDirectory(Path.GetDirectoryName(path));
            EditorSceneManager.SaveScene(scene, path);
            if (makeBuildScene) EditorBuildSettings.scenes = new[] { new EditorBuildSettingsScene(path, true) };
            AssetDatabase.Refresh();
        }

        /// <summary>Set a serialized field by name; logs instead of failing if an SDK update renamed it.</summary>
        public static void SetProperty(Object target, string propertyPath, object value)
        {
            var so = new SerializedObject(target);
            SerializedProperty prop = so.FindProperty(propertyPath);
            if (prop == null)
            {
                Debug.LogWarning($"[Simulacra] {target.GetType().Name}.{propertyPath} not found; set it by hand in the Inspector.");
                return;
            }
            if (value is bool b) prop.boolValue = b;
            else if (value is int i) { if (prop.propertyType == SerializedPropertyType.Enum) prop.enumValueIndex = i; else prop.intValue = i; }
            else if (value is float f) prop.floatValue = f;
            so.ApplyModifiedPropertiesWithoutUndo();
        }
    }
}
