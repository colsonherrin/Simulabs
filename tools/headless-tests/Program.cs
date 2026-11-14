using System;
using System.Linq;
using Simulacra;
using UnityEngine;

static class T
{
    static int _pass, _fail;
    static void Check(string name, bool ok, string detail = "")
    {
        if (ok) _pass++; else _fail++;
        Console.WriteLine($"{(ok ? "PASS" : "FAIL")}  {name}{(detail.Length > 0 ? "  [" + detail + "]" : "")}");
    }
    static bool Near(float a, float b, float tol = 0.01f) => MathF.Abs(a - b) <= tol;
    static bool Near(Vector3 a, Vector3 b, float tol = 0.01f) => (a - b).magnitude <= tol;

    static int Main()
    {
        // ---- A. Avatar scale and grounding arithmetic
        Check("scale: a 1.78 m body is left as authored", AvatarFit.ScaleFor(1.78f, 0f) == 1f);
        Check("scale: a 178 m body (centimetres imported as metres) becomes life-size", Near(178f * AvatarFit.ScaleFor(178f, 0f), AvatarFit.DefaultHeight));
        Check("scale: a 1.8 cm body (metres imported as centimetres) becomes life-size", Near(0.018f * AvatarFit.ScaleFor(0.018f, 0f), AvatarFit.DefaultHeight));
        Check("scale: a requested height is honoured even for a plausible body", Near(1.9f * AvatarFit.ScaleFor(1.9f, 1.65f), 1.65f));
        Check("scale: an empty measurement never produces NaN or zero", AvatarFit.ScaleFor(0f, 0f) == 1f);
        Check("grounding: soles 6 cm below the pivot are lifted to it", Near(AvatarFit.LiftFor(-0.06f, 0f), 0.06f));
        Check("grounding: a pivot at the hips (soles 0.95 m below) is lifted by 0.95 m", Near(AvatarFit.LiftFor(-0.95f, 0f), 0.95f));
        Check("grounding: a body floating 3 cm above its pivot is lowered", Near(AvatarFit.LiftFor(0.03f, 0f), -0.03f));

        // ---- B. Room anchors -> upright boxes (the one coordinate reduction every platform goes through)
        // Quest floor anchor: local XY is the plane, local +Z is the normal (up). 4 x 3 m, rotated 30 deg about up.
        Quaternion floorRot = Quaternion.Euler(0f, 30f, 0f) * Quaternion.Euler(-90f, 0f, 0f);
        Check("stub sanity: floor anchor's local +Z points up", Near(floorRot * Vector3.forward, Vector3.up));
        UprightBox floor = UprightBox.FromOriented(new Vector3(1f, 0f, 2f), floorRot, new Vector3(4f, 3f, 0.02f));
        var dims = new[] { floor.size.x, floor.size.z }.OrderBy(v => v).ToArray();
        Check("floor anchor: footprint keeps its 4 x 3 m size", Near(dims[0], 3f) && Near(dims[1], 4f), $"{floor.size}");
        Check("floor anchor: stays thin and at floor height", floor.size.y < 0.05f && Near(floor.center, new Vector3(1f, 0f, 2f)), $"{floor.center}");
        float yawMod = ((floor.yawDegrees % 90f) + 90f) % 90f;
        Check("floor anchor: yaw is preserved (30 deg, up to a quarter turn)", Near(yawMod, 30f, 0.5f), $"{floor.yawDegrees}");

        // Wall anchor: plane 5 m wide, 2.5 m tall, normal horizontal, centred 1.25 m up.
        Quaternion wallRot = Quaternion.Euler(0f, 90f, 0f); // local XY plane now spans world Z and Y
        UprightBox wall = UprightBox.FromOriented(new Vector3(3f, 1.25f, 0f), wallRot, new Vector3(5f, 2.5f, 0.08f));
        Check("wall anchor: becomes a tall thin box", Near(wall.size.y, 2.5f) && Near(MathF.Min(wall.size.x, wall.size.z), 0.08f) && Near(MathF.Max(wall.size.x, wall.size.z), 5f), $"{wall.size}");
        Check("wall anchor: spans floor to ceiling", Near(wall.MinY, 0f) && Near(wall.MaxY, 2.5f));

        // Table volume: bounds offset from the anchor origin, anchor rotated 45 deg.
        Quaternion tableRot = Quaternion.Euler(0f, 45f, 0f);
        Vector3 tableCentre = new Vector3(-1f, 0f, 1f) + tableRot * new Vector3(0f, 0.375f, 0f);
        UprightBox table = UprightBox.FromOriented(tableCentre, tableRot, new Vector3(1.4f, 0.75f, 0.8f));
        Check("furniture volume: size, height and yaw survive", Near(table.size.y, 0.75f) && Near(table.MinY, 0f) && Near(table.MaxY, 0.75f) && Near(((table.yawDegrees % 90f) + 90f) % 90f, 45f, 0.5f), $"{table.size} yaw {table.yawDegrees}");

        // A tilted box is replaced by its upright bounding box (never smaller than the real thing).
        UprightBox tilted = UprightBox.FromOriented(Vector3.zero, Quaternion.Euler(20f, 0f, 0f), new Vector3(1f, 1f, 1f));
        Check("tilted volume: upright fit fully contains it", tilted.size.y > 1.2f && MathF.Max(tilted.size.x, tilted.size.z) > 1.2f && Near(MathF.Min(tilted.size.x, tilted.size.z), 1f), $"{tilted.size}");

        // ---- C. Image point -> world position fallback raycast (used when depth is unavailable)
        var room = new RoomGeometry { source = "test", floorY = 0.02f };
        room.floor.Add(new UprightBox { center = new Vector3(0f, 0.02f, 0f), size = new Vector3(6f, 0.02f, 6f) });
        room.obstacles.Add(new UprightBox { center = new Vector3(0f, 0.4f, 2f), size = new Vector3(1f, 0.8f, 1f), yawDegrees = 45f });
        Vector3 eye = new Vector3(0f, 1.6f, 0f);
        Check("raycast: looking down at the floor hits the floor at its measured height",
            room.Raycast(new Ray(eye, new Vector3(1f, -1f, 0f)), 8f, out Vector3 hit1) && Near(hit1, new Vector3(1.58f, 0.02f, 0f), 0.02f), $"{hit1}");
        Check("raycast: a ray toward furniture stops at the furniture, not the floor behind it",
            room.Raycast(new Ray(eye, new Vector3(0f, -0.6f, 1f)), 8f, out Vector3 hit2) && hit2.y > 0.3f && hit2.z < 2.1f, $"{hit2}");
        Check("raycast: looking at the ceiling hits nothing", !room.Raycast(new Ray(eye, Vector3.up), 8f, out _));
        Check("raycast: rotated obstacle is tested in its own frame (corner ray along +x misses a 45-degree box edge-on)",
            !new UprightBox { center = new Vector3(0f, 0.5f, 0f), size = new Vector3(1f, 1f, 1f), yawDegrees = 45f }.Raycast(new Ray(new Vector3(-3f, 0.5f, 0.75f), Vector3.right), out _));
        Bounds fb = room.FloorBounds();
        Check("floor bounds cover the floor piece", fb.min.x <= -3f && fb.max.x >= 3f && fb.min.z <= -3f && fb.max.z >= 3f);
        RoomGeometry open = RoomGeometry.OpenFloor(new Vector3(2f, 1.6f, -1f), 0f, 4f, "fallback_open_floor");
        Check("fallback floor is centred under the user at the given height", Near(open.floor[0].center, new Vector3(2f, 0f, -1f)) && open.source == "fallback_open_floor");

        // ---- D. Object identity, tracking and provenance
        var world = new WorldModel();
        Time.time = 10f;
        TrackedObject chair = world.Upsert("Chair", new Vector3(1f, 0.4f, 2f), new Vector3(0.4f, 0.4f, 0.4f), ObjectSource.Detected, 0.7f);
        Check("first sighting gets id chair_1 and is marked detected", chair.id == "chair_1" && chair.SourceKey == "detected");
        Time.time = 14f;
        TrackedObject again = world.Upsert("chair", new Vector3(1.2f, 0.4f, 2.1f), Vector3.zero, ObjectSource.Detected, 0.9f);
        Check("re-sighting 22 cm away keeps the same id and refines the position", again == chair && world.objects.Count == 1 && Near(chair.position.x, 1.1f, 0.02f) && chair.lastSeenTime == 14f, $"{chair.position}");
        Check("confidence follows the best recent sighting", Near(chair.confidence, 0.9f));
        TrackedObject other = world.Upsert("chair", new Vector3(4f, 0.4f, 2f), Vector3.zero, ObjectSource.Detected, 0.8f);
        Check("a chair 3 m away is a different object: chair_2", other.id == "chair_2" && world.objects.Count == 2);

        TrackedObject marked = world.Upsert("lamp", new Vector3(-2f, 1f, 0f), Vector3.one * 0.5f, ObjectSource.Manual, 1f);
        Vector3 markedAt = marked.position;
        world.Upsert("lamp", new Vector3(-2.1f, 1f, 0.1f), Vector3.zero, ObjectSource.Detected, 0.6f);
        Check("a camera sighting never overwrites a user-registered object's origin or position", marked.SourceKey == "manual" && marked.position == markedAt && world.objects.Count == 3);

        world.Upsert("couch", new Vector3(0f, 0.4f, -3f), new Vector3(2f, 0.8f, 0.9f), ObjectSource.RoomScan, 1f);
        world.RemoveBySource(ObjectSource.RoomScan);
        Check("replacing room-scan data leaves detected and registered objects alone", world.objects.Count == 3 && !world.TryGet("couch_1", out _));
        Check("ids resolve case-insensitively and unknown ids do not resolve", world.TryGet("CHAIR_1", out _) && !world.TryGet("sofa_9", out _) && !world.TryGet(null, out _));
        Check("labels are sanitised into safe ids", WorldModel.Sanitize("  Coffee Table! ") == "coffee_table" && WorldModel.Sanitize("") == "object");
        Check("stand-off distance grows with the object and stays within 0.6-2 m",
            Near(WorldModel.StandOff(new TrackedObject { size = new Vector3(1.4f, 0.75f, 0.8f) }), 1.15f) && Near(WorldModel.StandOff(new TrackedObject { size = Vector3.zero }), 0.6f) && Near(WorldModel.StandOff(new TrackedObject { size = Vector3.one * 9f }), 2f));

        // Room data is refreshed often (plane detection, sensed obstacles). Ids the AI already uses must survive.
        var room2 = new WorldModel();
        var scan = new[] {
            new ObjectSeed { label = "table", position = new Vector3(1f, 0.4f, 1f), size = new Vector3(1.4f, 0.75f, 0.8f), source = ObjectSource.RoomScan },
            new ObjectSeed { label = "couch", position = new Vector3(-2f, 0.4f, 0f), size = new Vector3(2f, 0.8f, 0.9f), source = ObjectSource.RoomScan },
        };
        room2.SyncSeeds(scan);
        room2.Upsert("chair", new Vector3(0f, 0.4f, 3f), Vector3.one * 0.5f, ObjectSource.Manual, 1f);
        for (int i = 0; i < 5; i++) { scan[0].position += new Vector3(0.02f, 0f, 0.01f); room2.SyncSeeds(scan); } // plane refines a little each time
        Check("refreshing the room five times keeps table_1 and couch_1 (no table_2 ... table_6)", room2.objects.Count == 3 && room2.TryGet("table_1", out TrackedObject t1) && room2.TryGet("couch_1", out _) && Near(t1.position.x, 1.1f, 0.06f), string.Join(",", room2.objects.Keys));
        room2.SyncSeeds(new[] { scan[0] });
        Check("an object that left the room scan is dropped; registered objects are untouched", room2.objects.Count == 2 && !room2.TryGet("couch_1", out _) && room2.TryGet("chair_1", out _));

        Time.time = 20f;
        var json = world.ToJson(new Vector3(0, 1.6f, 0), Vector3.forward, new Vector3(0, 0, 2), -Vector3.forward, "idle");
        var first = json["objects"]![0]!;
        Check("snapshot sent to the backend carries id, source, confidence and age", (string)first["id"] == "chair_1" && (string)first["source"] == "detected" && Near((float)first["lastSeen"], 6f) && Near((float)first["confidence"], 0.9f));

        Console.WriteLine($"\n{_pass} passed, {_fail} failed");
        return _fail == 0 ? 0 : 1;
    }
}
