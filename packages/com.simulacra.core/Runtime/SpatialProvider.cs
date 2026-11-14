using System;
using System.Collections.Generic;
using UnityEngine;

namespace Simulacra
{
    /// <summary>A room feature a platform already knows about (e.g. a couch from Quest room setup).</summary>
    public struct ObjectSeed
    {
        public string label;
        public Vector3 position;
        public Vector3 size;
        public ObjectSource source;
    }

    /// <summary>
    /// The device layer. Everything hardware specific sits behind this class; the world model, agent
    /// skills, navigation, audio and backend link never reference a platform SDK. To port Simulacra to
    /// another headset, subclass this (see QuestSpatialProvider and EditorSimProvider).
    /// </summary>
    public abstract class SpatialProvider : MonoBehaviour
    {
        /// <summary>Reported to the backend, e.g. "quest3s".</summary>
        public abstract string DeviceName { get; }

        /// <summary>The wearer's head.</summary>
        public abstract Transform Head { get; }

        /// <summary>True when RGB camera frames can be captured for object detection.</summary>
        public abstract bool HasVision { get; }

        /// <summary>Null until the platform has delivered (or given up on) room data.</summary>
        public RoomGeometry Room { get; protected set; }

        /// <summary>Objects known from the platform's room data. Never camera detections.</summary>
        public readonly List<ObjectSeed> Seeds = new List<ObjectSeed>();

        /// <summary>Raised whenever Room / Seeds are replaced.</summary>
        public event Action RoomChanged;
        protected void RaiseRoomChanged() => RoomChanged?.Invoke();

        /// <summary>Raycast against the real environment (depth if available, else simplified room).</summary>
        public virtual bool RaycastEnvironment(Ray ray, out Vector3 point)
        {
            point = default;
            return Room != null && Room.Raycast(ray, 8f, out point);
        }

        /// <summary>Where the user is pointing: a controller/hand ray if tracked, else the gaze ray.</summary>
        public virtual Ray PointerRay => new Ray(Head.position, Head.forward);

        /// <summary>
        /// Grab one camera frame as JPEG plus a function that maps a normalised image point
        /// (0..1, origin top-left) to a world position using the pose the frame was taken at.
        /// </summary>
        public virtual bool TryCaptureFrame(out byte[] jpeg, out Func<Vector2, Vector3?> locate)
        {
            jpeg = null;
            locate = null;
            return false;
        }

        /// <summary>Where the debug HUD sits relative to the head. Narrow-FOV glasses need it closer to centre.</summary>
        public virtual Vector3 HudLocalPosition => new Vector3(-0.28f, -0.12f, 0.9f);

        /// <summary>Called when the debug HUD is shown or hidden, so providers can hide their own debug visuals too.</summary>
        public virtual void SetDebugVisible(bool visible) { }

        /// <summary>True while the push-to-talk control is held (Quest: right index trigger).</summary>
        public virtual bool TalkHeld => false;

        /// <summary>
        /// True if rendering black darkens the real world (video passthrough). False on optical
        /// see-through displays, where black is simply invisible and a drawn shadow cannot work.
        /// </summary>
        public virtual bool CanDarkenWorld => true;

        /// <summary>Give the provider a chance to adapt a freshly spawned avatar (e.g. depth occlusion).</summary>
        public virtual void PrepareAvatar(GameObject avatarRoot) { }

        /// <summary>True during the frame the user pressed "interrupt" (Quest: A).</summary>
        public virtual bool InterruptPressed => false;

        /// <summary>True during the frame the user pressed "toggle debug HUD" (Quest: B).</summary>
        public virtual bool ToggleHudPressed => false;
    }
}
