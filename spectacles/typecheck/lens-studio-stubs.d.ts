// Minimal declarations of the Lens Studio APIs that SimulacraLens.ts uses, written from their
// usage in Snap's official 5.15.4 samples. They exist only so the binding can be type-checked
// outside Lens Studio (`npx tsc -p spectacles/typecheck`). Lens Studio's own typings are the
// authority; if they disagree, they win.
declare function component<T>(target: T): T;
declare function input(...args: any[]): any;
declare function hint(text: string): any;
declare function allowUndefined(...args: any[]): any;
declare function require(name: string): any;
declare function print(message: any): void;
declare function getDeltaTime(): number;
declare function isNull(value: any): boolean;

declare class vec3 {
  constructor(x: number, y: number, z: number);
  x: number; y: number; z: number;
  add(v: vec3): vec3;
  sub(v: vec3): vec3;
  cross(v: vec3): vec3;
  dot(v: vec3): number;
  normalize(): vec3;
  length: number;
  uniformScale(s: number): vec3;
  distance(v: vec3): number;
  static up(): vec3;
}
declare class quat {
  static lookAt(forward: vec3, up: vec3): quat;
  static angleAxis(radians: number, axis: vec3): quat;
  multiply(q: quat): quat;
}
declare class Transform {
  forward: vec3;
  getWorldPosition(): vec3;
  setWorldPosition(p: vec3): void;
  setWorldRotation(q: quat): void;
  getWorldRotation(): quat;
  getLocalRotation(): quat;
  setLocalRotation(q: quat): void;
}
declare class SceneObject {
  enabled: boolean;
  getTransform(): Transform;
  createComponent(type: string): any;
  name: string;
  getChildrenCount(): number;
  getChild(index: number): SceneObject;
}
declare class SceneEvent { bind(cb: () => void): void; enabled: boolean; }
declare class BaseScriptComponent {
  sceneObject: SceneObject;
  createEvent(name: string): SceneEvent;
}
declare class Text { text: string; }
declare class AudioTrackAsset { control: any; }
declare class AudioComponent { audioTrack: AudioTrackAsset; play(loops: number): void; stop(fade: boolean): void; isPlaying(): boolean; }
declare class MicrophoneAudioProvider { sampleRate: number; maxFrameSize: number; start(): void; stop(): void; getAudioFrame(buffer: Float32Array): vec3; }
declare class AudioOutputProvider { sampleRate: number; enqueueAudioFrame(data: Float32Array, shape: vec3): void; }
declare class AnimationPlayer {}
declare class RenderMeshVisual { setBlendShapeWeight(name: string, weight: number): void; }
declare interface WebSocketMessageEvent { data: any; }
declare class WebSocket {
  binaryType: string;
  onopen: (event: any) => void;
  onmessage: (event: WebSocketMessageEvent) => void;
  onclose: (event: any) => void;
  onerror: (event: any) => void;
  send(data: string): void;
  close(): void;
}
declare class InternetModule { createWebSocket(url: string): WebSocket; }
declare interface WorldQueryHitTestResult { position: vec3; normal: vec3; }
declare class HitTestSession { start(): void; stop(): void; hitTest(start: vec3, end: vec3, cb: (hit: WorldQueryHitTestResult | null) => void): void; }
declare class HitTestSessionOptions { static create(): HitTestSessionOptions; filter: boolean; }
declare class WorldQueryModule { createHitTestSessionWithOptions(options: HitTestSessionOptions): HitTestSession; }
declare class GestureModule {
  static HandType: { Right: any; Left: any };
  getPinchDownEvent(hand: any): { add(cb: (args: any) => void): void };
}
