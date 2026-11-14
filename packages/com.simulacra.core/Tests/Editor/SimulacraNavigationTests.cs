using System.Collections.Generic;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.AI;

namespace Simulacra.Tests
{
    /// <summary>
    /// Edit-mode tests that need the real engine: NavMesh building from room geometry, obstacle
    /// avoidance, standing points, spawn placement, and avatar scale/grounding on real renderers.
    /// Run in Unity: Window > General > Test Runner > EditMode > Run All.
    /// </summary>
    public class SimulacraNavigationTests
    {
        private const float FloorY = 0.3f; // deliberately not zero: catches code that assumes y = 0
        private readonly List<GameObject> _spawned = new List<GameObject>();

        /// <summary>6 x 6 m room, a table in the middle, optionally a wall splitting off the +z third.</summary>
        private static RoomGeometry Room(bool dividingWall = false)
        {
            var room = new RoomGeometry { source = "test", floorY = FloorY };
            room.floor.Add(new UprightBox { center = new Vector3(0, FloorY, 0), size = new Vector3(6, 0.02f, 6), yawDegrees = 20f });
            room.obstacles.Add(Table);
            if (dividingWall)
                room.obstacles.Add(new UprightBox { center = Quaternion.Euler(0, 20, 0) * new Vector3(0, 1.25f, 1.8f) + Vector3.up * FloorY, size = new Vector3(7f, 2.5f, 0.08f), yawDegrees = 20f });
            return room;
        }

        private static UprightBox Table => new UprightBox { center = new Vector3(0, FloorY + 0.375f, 0), size = new Vector3(1.4f, 0.75f, 0.8f), yawDegrees = 20f };

        private static bool InsideFootprint(UprightBox box, Vector3 p, float margin)
        {
            Vector3 local = Quaternion.Inverse(box.Rotation) * (p - box.center);
            return Mathf.Abs(local.x) < box.size.x * 0.5f + margin && Mathf.Abs(local.z) < box.size.z * 0.5f + margin;
        }

        private static Vector3 OnFloor(float x, float z) => Quaternion.Euler(0, 20, 0) * new Vector3(x, 0, z) + Vector3.up * FloorY;

        [TearDown]
        public void TearDown()
        {
            RoomNavMesh.Clear();
            foreach (GameObject go in _spawned) if (go != null) Object.DestroyImmediate(go);
            _spawned.Clear();
        }

        [Test]
        public void NavMesh_Builds_AtTheMeasuredFloorHeight()
        {
            Assert.IsTrue(RoomNavMesh.Build(Room()), "NavMesh build failed for a plain 6 x 6 m room");
            Assert.IsTrue(RoomNavMesh.Snap(OnFloor(-2, -2), 0.3f, out Vector3 p), "open floor is not walkable");
            Assert.That(p.y, Is.EqualTo(FloorY).Within(0.08f), "NavMesh is not at the floor's elevation");
            Assert.IsFalse(RoomNavMesh.Snap(OnFloor(0, 0), 0.25f, out _), "the middle of the table is walkable");
            Assert.IsFalse(RoomNavMesh.Snap(OnFloor(9, 9), 1f, out _), "floor exists outside the mapped room");
        }

        [Test]
        public void Path_GoesAroundFurniture_NotThroughIt()
        {
            Assert.IsTrue(RoomNavMesh.Build(Room()));
            Assert.IsTrue(RoomNavMesh.Snap(OnFloor(-2.2f, 0), 0.3f, out Vector3 a));
            Assert.IsTrue(RoomNavMesh.Snap(OnFloor(2.2f, 0), 0.3f, out Vector3 b));
            var path = new NavMeshPath();
            Assert.IsTrue(RoomNavMesh.HasCompletePath(a, b, path), "no path across the room");
            Assert.Greater(path.corners.Length, 2, "path is a straight line through the table");

            float length = 0f;
            for (int i = 1; i < path.corners.Length; i++)
            {
                length += Vector3.Distance(path.corners[i - 1], path.corners[i]);
                for (float t = 0; t <= 1f; t += 0.05f)
                {
                    Vector3 p = Vector3.Lerp(path.corners[i - 1], path.corners[i], t);
                    Assert.IsFalse(InsideFootprint(Table, p, RoomNavMesh.AgentRadius - 0.08f), $"path passes through the table at {p}");
                }
            }
            Assert.Greater(length, Vector3.Distance(a, b) + 0.05f, "detour is not longer than the straight line");
        }

        [Test]
        public void StandPoint_IsBesideTheObject_Reachable_AndOutsideIt()
        {
            Assert.IsTrue(RoomNavMesh.Build(Room()));
            var table = new TrackedObject { position = Table.center, size = Table.size };
            Vector3 from = OnFloor(-2.2f, -2.2f);
            Assert.IsTrue(RoomNavMesh.FindStandPoint(table.position, WorldModel.StandOff(table), from, out Vector3 stand));
            Assert.IsFalse(InsideFootprint(Table, stand, 0.1f), "standing point is inside the table");
            Vector3 flat = stand - table.position; flat.y = 0;
            Assert.That(flat.magnitude, Is.InRange(0.6f, 2.2f), "standing point is not beside the object");
            Assert.That(stand.y, Is.EqualTo(FloorY).Within(0.08f));
            // It should be on the walker's side, not the far side.
            Assert.Less(Vector3.Distance(stand, from), Vector3.Distance(table.position, from) + 0.3f);
        }

        [Test]
        public void Unreachable_Blocked_And_Unmapped_Targets_AreRefused()
        {
            Assert.IsTrue(RoomNavMesh.Build(Room(dividingWall: true)));
            Vector3 from = OnFloor(-2, -2);
            // Behind the wall: floor exists there but is not connected.
            Assert.IsTrue(RoomNavMesh.Snap(OnFloor(0, 2.5f), 0.3f, out _), "test setup: far side should have floor");
            Assert.IsFalse(RoomNavMesh.FindStandPoint(OnFloor(0, 2.6f), 0.6f, from, out _), "a target behind a full wall was reported reachable");
            // Outside the mapped area entirely.
            Assert.IsFalse(RoomNavMesh.FindStandPoint(new Vector3(30, FloorY, 30), 0.6f, from, out _), "a target outside the room was reported reachable");
            // A walker who is not on any floor cannot reach anything.
            Assert.IsFalse(RoomNavMesh.FindStandPoint(OnFloor(-1, -1), 0.6f, new Vector3(30, FloorY, 30), out _));
        }

        [Test]
        public void Spawn_IsInFront_Connected_NotInFurniture_NotAcrossAWall()
        {
            Assert.IsTrue(RoomNavMesh.Build(Room(dividingWall: true)));

            // User looking straight at the table from 2 m: the spot directly ahead is inside it.
            Vector3 user = OnFloor(-2f, 0f);
            Vector3 fwd = Quaternion.Euler(0, 20, 0) * Vector3.right;
            Assert.IsTrue(RoomNavMesh.FindSpawnPoint(user, fwd, 1.8f, out Vector3 spot));
            Assert.IsFalse(InsideFootprint(Table, spot, RoomNavMesh.AgentRadius - 0.08f), "avatar would spawn inside the table");
            Vector3 gap = spot - user; gap.y = 0;
            Assert.That(gap.magnitude, Is.InRange(0.8f, 2.6f), "spawn distance is not conversational");
            Assert.Greater(Vector3.Dot(gap.normalized, fwd), 0f, "avatar would spawn behind the user");
            Assert.IsTrue(RoomNavMesh.HasCompletePath(spot, user), "avatar would spawn on floor the user side cannot reach");

            // User 1 m from the dividing wall, facing it: 1.8 m ahead is on the other side.
            user = OnFloor(-2f, 0.9f);
            fwd = Quaternion.Euler(0, 20, 0) * Vector3.forward;
            Assert.IsTrue(RoomNavMesh.FindSpawnPoint(user, fwd, 1.8f, out spot));
            Vector3 local = Quaternion.Inverse(Quaternion.Euler(0, 20, 0)) * (spot - Vector3.up * FloorY);
            Assert.Less(local.z, 1.8f, "avatar would spawn on the far side of the wall");
        }

        [Test]
        public void PathPlanning_IsFastEnoughToRunEveryFewFrames()
        {
            Assert.IsTrue(RoomNavMesh.Build(Room()));
            Vector3 from = OnFloor(-2.2f, -2.2f);
            RoomNavMesh.FindStandPoint(Table.center, 1.15f, from, out _); // warm up
            var clock = System.Diagnostics.Stopwatch.StartNew();
            const int n = 50;
            for (int i = 0; i < n; i++) RoomNavMesh.FindStandPoint(Table.center, 1.15f, OnFloor(-2.2f + i * 0.05f, -2.2f), out _);
            double ms = clock.Elapsed.TotalMilliseconds / n;
            Debug.Log($"[Simulacra] stand-point search + path validation: {ms:0.00} ms per call on this machine");
            Assert.Less(ms, 10.0, "planning is too slow to re-run while walking");
        }

        [Test]
        public void AvatarFit_MakesAnyBodyLifeSized_WithSolesOnTheOrigin()
        {
            foreach (float importScale in new[] { 100f, 0.01f, 1f })
            {
                var root = new GameObject("root");
                _spawned.Add(root);
                GameObject body = GameObject.CreatePrimitive(PrimitiveType.Capsule); // 2 m tall, pivot at its centre
                body.transform.SetParent(root.transform, false);
                body.transform.localScale = Vector3.one * (0.89f * importScale);  // a 1.78 m figure at the given import scale
                float height = AvatarFit.Apply(body, 0f, out string report);
                Assert.That(height, Is.InRange(AvatarFit.MinPlausible, AvatarFit.MaxPlausible), $"import scale {importScale}: {report}");
                Assert.IsTrue(AvatarFit.Measure(body, out float minY, out float maxY));
                Assert.That(minY, Is.EqualTo(0f).Within(0.005f), $"import scale {importScale}: soles are not on the origin");
                Assert.That(maxY, Is.EqualTo(height).Within(0.005f));
            }
        }

        [Test]
        public void PlaceholderAvatar_IsHumanSized()
        {
            GameObject body = PlaceholderAvatar.Create(out _, out _, out _, out _);
            _spawned.Add(body);
            var root = new GameObject("root");
            _spawned.Add(root);
            body.transform.SetParent(root.transform, false);
            float height = AvatarFit.Apply(body, 0f, out string report);
            Assert.That(height, Is.InRange(1.6f, 1.9f), report);
            StringAssert.Contains("as authored", report, "the built-in body should not need rescaling");
        }
    }
}
