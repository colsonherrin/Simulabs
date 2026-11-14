// Simulacra device protocol v1.
//
// One WebSocket (path /device) between a headset client and this backend. Every frame is a JSON
// text message with a `type` field. Audio is PCM16 mono 24 kHz, base64 encoded.
// Any device (Quest/Unity, XREAL/Unity, Spectacles/Lens Studio, the browser simulator) that
// speaks this protocol gets the same brain. Keep this file and docs/PROTOCOL.md in sync.

export const PROTOCOL_VERSION = 1;
export const AUDIO_RATE = 24000;

export type Vec3 = [number, number, number];

/** How an object got into the world model. Never report anything but `detected` as seen by camera. */
export type ObjectSource = 'detected' | 'room_scan' | 'manual' | 'simulated';

export interface WorldObject {
  id: string; // e.g. "chair_1"
  label: string; // e.g. "chair"
  pos: Vec3; // world space metres, y up
  size?: Vec3;
  source: ObjectSource;
  confidence: number; // 0..1
  lastSeen: number; // seconds since the device observed/registered it
  reachable?: boolean; // device could find a standing spot next to it
}

export interface Pose {
  pos: Vec3;
  fwd: Vec3; // unit forward vector
}

export interface WorldSnapshot {
  user: Pose;
  avatar: Pose & { state: string }; // idle | walking | turning | speaking
  objects: WorldObject[];
  room?: { source: string; floorY: number; size?: Vec3; obstacles: number; navmesh: boolean };
}

export type ActionName =
  | 'walk_to'
  | 'look_at'
  | 'approach_user'
  | 'inspect_object'
  | 'scan_surroundings'
  | 'register_marker'
  | 'forget_object'
  | 'stop';

/** The action contract from the spec: backend -> device. */
export interface ActionRequest {
  type: 'action';
  id: string;
  action: ActionName;
  target_id?: string;
  params?: Record<string, unknown>;
  speech?: string;
  status: 'requested';
}

export interface ActionResult {
  type: 'action_result';
  id: string;
  status: 'succeeded' | 'failed';
  reason?: string;
  data?: Record<string, unknown>;
}

export interface Detection {
  label: string;
  x: number; // normalised 0..1 from the left of the image
  y: number; // normalised 0..1 from the TOP of the image
  confidence: number;
}

// ---- device -> backend
export type DeviceMessage =
  | { type: 'hello'; protocol: number; device: string; capabilities?: Record<string, boolean> }
  | { type: 'audio'; pcm16: string }
  | { type: 'text'; text: string } // typed input, for simulators and tests
  | { type: 'world'; world: WorldSnapshot }
  | ActionResult
  | { type: 'frame'; id: string; jpeg: string } // camera frame answering a scan action
  | { type: 'interrupt' }
  | { type: 'event'; name: string; data?: Record<string, unknown> };

// ---- backend -> device
export type BackendMessage =
  | { type: 'ready'; protocol: number; brain: string; audioRate: number }
  | { type: 'audio'; pcm16: string }
  | { type: 'audio_stop' } // drop any queued speech (user barged in)
  | ActionRequest
  | { type: 'detections'; frameId: string; items: Detection[]; error?: string }
  | { type: 'transcript'; role: 'user' | 'assistant'; text: string }
  | { type: 'state'; status: 'idle' | 'listening' | 'thinking' | 'speaking' }
  | { type: 'log'; level: 'info' | 'warn' | 'error'; message: string };
