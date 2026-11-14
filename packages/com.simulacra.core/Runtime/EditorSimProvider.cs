using System;
using UnityEngine;

namespace Simulacra
{
    /// <summary>
    /// Desktop stand-in for a headset: a fake room with a table and a chair, the scene camera as the
    /// user's head, and a text box to "speak". Lets the AI, skills and navigation be developed with
    /// no hardware. Objects it creates are tagged Simulated and are reported to the AI as such.
    /// </summary>
    public class EditorSimProvider : SpatialProvider
    {
        public Camera userCamera;
        public Vector2 roomSize = new Vector2(5f, 6f);

        public override string DeviceName => "editor-sim";
        public override Transform Head => userCamera.transform;
        public override bool HasVision => false;
        public override bool InterruptPressed => Consume(ref _interrupt);
        public override bool ToggleHudPressed => Consume(ref _hud);

        private bool _interrupt, _hud;
        private string _text = "Hey, can you come over here?";
        private SimulacraApp _app;

        private static bool Consume(ref bool flag) { bool v = flag; flag = false; return v; }

        private void Awake()
        {
            if (userCamera == null) userCamera = Camera.main;
            userCamera.transform.position = new Vector3(0f, 1.6f, -roomSize.y * 0.5f + 0.8f);
            userCamera.transform.rotation = Quaternion.Euler(12f, 0f, 0f);

            var room = new RoomGeometry { source = "simulated", floorY = 0f };
            room.floor.Add(new UprightBox { center = Vector3.zero, size = new Vector3(roomSize.x, 0.02f, roomSize.y) });
            Visual(PrimitiveType.Cube, "Floor", new Vector3(0, -0.01f, 0), new Vector3(roomSize.x, 0.02f, roomSize.y), new Color(0.35f, 0.35f, 0.38f));

            AddThing(room, "table", new Vector3(-1.2f, 0.375f, 0.6f), new Vector3(1.4f, 0.75f, 0.8f), new Color(0.5f, 0.35f, 0.2f));
            AddThing(room, "chair", new Vector3(1.4f, 0.45f, 1.6f), new Vector3(0.5f, 0.9f, 0.5f), new Color(0.2f, 0.45f, 0.5f));
            Room = room;
        }

        private void AddThing(RoomGeometry room, string label, Vector3 center, Vector3 size, Color color)
        {
            room.obstacles.Add(new UprightBox { center = center, size = size });
            Seeds.Add(new ObjectSeed { label = label, position = center, size = size, source = ObjectSource.Simulated });
            Visual(PrimitiveType.Cube, label, center, size, color);
        }

        private static void Visual(PrimitiveType type, string name, Vector3 pos, Vector3 scale, Color color)
        {
            GameObject go = GameObject.CreatePrimitive(type);
            go.name = "Sim " + name;
            go.transform.position = pos;
            go.transform.localScale = scale;
            go.GetComponent<Renderer>().material.color = color;
        }

        private void OnGUI()
        {
            if (_app == null) _app = FindObjectOfType<SimulacraApp>();
            GUILayout.BeginArea(new Rect(10, Screen.height - 70, Mathf.Min(700, Screen.width - 20), 60), GUI.skin.box);
            GUILayout.BeginHorizontal();
            _text = GUILayout.TextField(_text, GUILayout.MinWidth(300));
            bool enter = Event.current.type == EventType.KeyUp && Event.current.keyCode == KeyCode.Return;
            if ((GUILayout.Button("Say", GUILayout.Width(60)) || enter) && _app != null) { _app.SendText(_text); _text = ""; }
            if (GUILayout.Button("Interrupt", GUILayout.Width(80))) _interrupt = true;
            if (GUILayout.Button("HUD", GUILayout.Width(50))) _hud = true;
            GUILayout.EndHorizontal();
            GUILayout.Label("Typed text is sent as speech. The microphone is live too when the backend runs the realtime brain. Move the Main Camera to move the user.");
            GUILayout.EndArea();
        }
    }
}
