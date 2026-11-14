using System;
using System.Collections.Generic;
using UnityEngine;

namespace Simulacra
{
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

        /// <summary>
        /// Live obstacle check: is there a real surface along this ray right now? Uses the device's
        /// depth sensing where it exists; false where it does not. Lets the body notice things the
        /// room scan does not contain (a chair that was moved, a bag on the floor).
        /// </summary>
        public virtual bool ProbeObstacle(Vector3 origin, Vector3 direction, float maxDistance, out Vector3 point)
        {
            point = default;
            return false;
        }

        /// <summary>
        /// A coordinate frame fixed to the physical room that is the same every session (Quest: the
        /// floor anchor of the scanned room), with a key identifying the room. Lets user-registered
        /// objects be remembered across launches. False where no such frame exists.
        /// </summary>
        public virtual bool TryGetRoomFrame(out string roomKey, out Pose frame)
        {
            roomKey = null;
            frame = default;
            return false;
        }

        /// <summary>Average brightness of the real room, 0 (dark) to 1 (bright), if the device can tell.</summary>
        public virtual bool TryEstimateBrightness(out float brightness)
        {
            brightness = 0f;
            return false;
        }

        /// <summary>
        /// Raised when the device corrects its idea of where the room is (tracking relocalised): the
        /// matrix maps old world positions to new ones. Everything placed in the room follows it.
        /// </summary>
        public event Action<Matrix4x4> WorldShifted;
        protected void RaiseWorldShifted(Matrix4x4 oldToNew) => WorldShifted?.Invoke(oldToNew);

        /// <summary>Short provider-specific note for the debug HUD (e.g. "occlusion=on").</summary>
        public virtual string DebugStatus => "";

        /// <summary>True during the frame the user pressed "interrupt" (Quest: A).</summary>
        public virtual bool InterruptPressed => false;

        /// <summary>True during the frame the user pressed "toggle debug HUD" (Quest: B).</summary>
        public virtual bool ToggleHudPressed => false;
    }
}
