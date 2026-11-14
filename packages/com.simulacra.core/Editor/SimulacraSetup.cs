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
        /// <summary>The character that ships with Simulacra (Microsoft Rocketbox, MIT licence), used when the project folder is empty.</summary>
        public const string BundledAvatarFolder = "Packages/com.simulacra.core/Avatar/Rocketbox";
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
        /// humanoid rig, looping clips, an Animator Controller with the Speed/Turn/MotionSpeed/Speaking contract.
        /// Clips are matched by FILE name: *idle*, *walk*, *talk*|*speak*, *turn*left*, *turn*right*.
        /// </summary>
        [MenuItem("Simulacra/3. Setup Avatar (your model in Assets-Simulacra-Avatar, else the bundled one)")]
        public static void SetupAvatar()
        {
            // Your own character in the project folder wins; otherwise the bundled one is used.
            string sourceFolder = AvatarFolder;
            string[] modelPaths = FindModels(AvatarFolder);
            if (modelPaths.Length == 0)
            {
                sourceFolder = BundledAvatarFolder;
                modelPaths = FindModels(BundledAvatarFolder);
            }
            if (modelPaths.Length == 0)
            {
                EditorUtility.DisplayDialog("Simulacra", "No character found. Put a rigged character (FBX) in " + AvatarFolder + ". See README > Avatar.", "OK");
                return;
            }
            Directory.CreateDirectory(AvatarFolder);

            // 1. Find the file that carries the skinned mesh: that is the character.
            string characterPath = modelPaths
                .OrderByDescending(p => AssetDatabase.LoadAllAssetsAtPath(p).OfType<SkinnedMeshRenderer>().Count())
                .ThenByDescending(p => new FileInfo(p).Length)
                .First();

            // A character that comes alone (no animation files) is animated procedurally from its
            // skeleton, which needs no Humanoid mapping: import it as-is and skip the controller.
            bool hasClipFiles = modelPaths.Length > 1;
            if (!hasClipFiles)
            {
                var solo = AssetImporter.GetAtPath(characterPath) as ModelImporter;
                if (solo != null && (solo.animationType != ModelImporterAnimationType.Generic || solo.importAnimation))
                {
                    solo.animationType = ModelImporterAnimationType.Generic;
                    solo.importAnimation = false;
                    solo.importBlendShapes = true;
                    solo.SaveAndReimport();
                }
            }

            // 2. Humanoid rig everywhere, character first so the others can copy its avatar.
            if (hasClipFiles) ConfigureImporter(characterPath, null);
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

            AnimatorController controller = idle != null || walk != null ? BuildController(idle, walk, talk, turnL, turnR) : null;

            // 4. Prefab.
            var characterAsset = AssetDatabase.LoadAssetAtPath<GameObject>(characterPath);
            var instance = (GameObject)PrefabUtility.InstantiatePrefab(characterAsset);
            var animator = instance.GetComponent<Animator>();
            if (animator == null) animator = instance.AddComponent<Animator>();
            animator.runtimeAnimatorController = controller; // null = procedural animation at run time
            int materials = BuildMaterials(instance, Path.GetDirectoryName(characterPath).Replace('\\', '/'));
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

            int blendShapes = 0;
            foreach (var smr in prefab.GetComponentsInChildren<SkinnedMeshRenderer>()) if (smr.sharedMesh != null) blendShapes += smr.sharedMesh.blendShapeCount;
            string report = $"Character: {Path.GetFileName(characterPath)} (from {sourceFolder})\n" +
                            (controller != null
                                ? $"idle: {Name(idle)}\nwalk: {Name(walk)}\ntalk: {Name(talk)}\nturn left/right: {Name(turnL)} / {Name(turnR)}\n"
                                : "No animation files: walking, idling and gaze are generated procedurally.\n") +
                            $"Skeleton recognised: {(BoneFinder.HasLegsAndArms(prefab) ? "yes" : "NO - the body will not animate")}\n" +
                            $"Face blendshapes: {blendShapes}\nMaterials rebuilt: {materials}\n\nPrefab: {PrefabPath}\n" +
                            (controller != null && walk == null ? "\nNo *walk* clip found: the avatar will glide. Add a walking animation exported 'In Place'." : "");
            Debug.Log("[Simulacra] Avatar ready.\n" + report);
            EditorUtility.DisplayDialog("Simulacra avatar", report + "\nSave the scene to keep the assignment.", "OK");
        }

        private static string Name(AnimationClip c) => c == null ? "(none)" : "found";

        private static string[] FindModels(string folder)
        {
            return AssetDatabase.IsValidFolder(folder) ? AssetDatabase.FindAssets("t:Model", new[] { folder }).Select(AssetDatabase.GUIDToAssetPath).ToArray() : new string[0];
        }

        /// <summary>
        /// Rebuild materials from the textures that sit next to the model, by naming convention:
        /// material "x" gets "x_color" as albedo and "x_normal" as normal map. Fixes characters whose
        /// embedded texture paths are stale or whose materials import dark; a material whose name
        /// contains "opacity" (hair, lashes) becomes alpha cut-out. Materials without a matching
        /// texture are left exactly as imported.
        /// </summary>
        private static int BuildMaterials(GameObject instance, string modelFolder)
        {
            var textures = new Dictionary<string, string>();
            foreach (string guid in AssetDatabase.FindAssets("t:Texture2D", new[] { modelFolder }))
            {
                string path = AssetDatabase.GUIDToAssetPath(guid);
                textures[Path.GetFileNameWithoutExtension(path).ToLowerInvariant()] = path;
            }
            if (textures.Count == 0) return 0;
            Directory.CreateDirectory(AvatarFolder + "/Materials");

            int built = 0;
            foreach (Renderer r in instance.GetComponentsInChildren<Renderer>(true))
            {
                Material[] mats = r.sharedMaterials;
                for (int i = 0; i < mats.Length; i++)
                {
                    if (mats[i] == null) continue;
                    string slot = mats[i].name.ToLowerInvariant();
                    if (!textures.TryGetValue(slot + "_color", out string albedoPath)) continue;

                    var mat = new Material(Shader.Find("Standard")) { name = mats[i].name, color = Color.white };
                    mat.mainTexture = AssetDatabase.LoadAssetAtPath<Texture2D>(albedoPath);
                    mat.SetFloat("_Glossiness", 0.25f);
                    mat.SetFloat("_Metallic", 0f);
                    if (textures.TryGetValue(slot + "_normal", out string normalPath))
                    {
                        var ti = AssetImporter.GetAtPath(normalPath) as TextureImporter;
                        if (ti != null && ti.textureType != TextureImporterType.NormalMap) { ti.textureType = TextureImporterType.NormalMap; ti.SaveAndReimport(); }
                        mat.SetTexture("_BumpMap", AssetDatabase.LoadAssetAtPath<Texture2D>(normalPath));
                        mat.EnableKeyword("_NORMALMAP");
                    }
                    if (slot.Contains("opacity"))
                    {
                        // Alpha cut-out: stays in the opaque queue, so no sorting artefacts in the headset.
                        mat.SetFloat("_Mode", 1f);
                        mat.SetOverrideTag("RenderType", "TransparentCutout");
                        mat.SetFloat("_Cutoff", 0.4f);
                        mat.EnableKeyword("_ALPHATEST_ON");
                        mat.renderQueue = (int)UnityEngine.Rendering.RenderQueue.AlphaTest;
                    }
                    string matPath = AvatarFolder + "/Materials/" + mats[i].name + ".mat";
                    AssetDatabase.DeleteAsset(matPath);
                    AssetDatabase.CreateAsset(mat, matPath);
                    mats[i] = mat;
                    built++;
                }
                r.sharedMaterials = mats;
            }
            return built;
        }

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
            controller.AddParameter(new AnimatorControllerParameter { name = "MotionSpeed", type = AnimatorControllerParameterType.Float, defaultFloat = 1f });
            controller.AddParameter("Turn", AnimatorControllerParameterType.Float);
            controller.AddParameter("Speaking", AnimatorControllerParameterType.Bool);
            AnimatorStateMachine sm = controller.layers[0].stateMachine;

            // Locomotion: idle <-> walk blended by real speed.
            AnimatorState locomotion = controller.CreateBlendTreeInController("Locomotion", out BlendTree tree, 0);
            tree.blendType = BlendTreeType.Simple1D;
            tree.blendParameter = "Speed";
            tree.useAutomaticThresholds = false;
            if (idle != null) tree.AddChild(idle, 0f);
            if (walk != null) tree.AddChild(walk, 1f); // Speed is normalised: 1 = walking at full speed
            sm.defaultState = locomotion;
            // Playback rate is driven at runtime so the walk cycle matches real ground speed (no foot sliding).
            locomotion.speedParameter = "MotionSpeed";
            locomotion.speedParameterActive = true;
            // IK pass lets HeadLook turn the head and eyes toward the user.
            AnimatorControllerLayer[] layers = controller.layers;
            layers[0].iKPass = true;
            controller.layers = layers;

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

        /// <summary>True if there is a character model waiting in the Avatar folder.</summary>
        public static bool HasAvatarSources() => FindModels(AvatarFolder).Length > 0 || FindModels(BundledAvatarFolder).Length > 0;

        /// <summary>Build the avatar prefab if models are present and it has not been built yet.</summary>
        public static void EnsureAvatar()
        {
            if (FindAvatarPrefab() == null && HasAvatarSources()) SetupAvatar();
        }

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

        /// <summary>Add a shader to Graphics Settings > Always Included Shaders (needed for Shader.Find in a build).</summary>
        public static bool AlwaysIncludeShader(string shaderName)
        {
            Shader shader = Shader.Find(shaderName);
            if (shader == null)
            {
                Debug.LogWarning($"[Simulacra] shader '{shaderName}' not found; the feature that needs it will stay off.");
                return false;
            }
            var settings = new SerializedObject(AssetDatabase.LoadAllAssetsAtPath("ProjectSettings/GraphicsSettings.asset")[0]);
            SerializedProperty list = settings.FindProperty("m_AlwaysIncludedShaders");
            for (int i = 0; i < list.arraySize; i++)
                if (list.GetArrayElementAtIndex(i).objectReferenceValue == shader) return true;
            list.InsertArrayElementAtIndex(list.arraySize);
            list.GetArrayElementAtIndex(list.arraySize - 1).objectReferenceValue = shader;
            settings.ApplyModifiedPropertiesWithoutUndo();
            AssetDatabase.SaveAssets();
            return true;
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
