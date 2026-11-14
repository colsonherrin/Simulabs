// Simulacra on Snap Spectacles (2024): the binding between the glasses and SimulacraCore.
//
// Lens Studio 5.15.x. Every platform call here follows usage found in Snap's official samples on
// their 5.15.4 branch (AI Playground / Remote Service Gateway helpers, Path Pioneer, Throw Lab,
// Mocopi receiver). It has NOT been run in Lens Studio or on glasses: see ../../README.md.
//
// Needs, in the project: Experimental APIs enabled (a plain WebSocket to your own server together
// with the microphone is an experimental combination; such a lens cannot be published), and
// Extended Permissions enabled on the glasses.

import { SimulacraBody } from './SimulacraBody';
import { Host, protocolToLens, lensToProtocol, SimulacraCore, Vec, yawToLensDirection } from './SimulacraCore';

@component
export class SimulacraLens extends BaseScriptComponent {
  @input
  @hint('Backend address, e.g. ws://192.168.1.20:8787/device (the backend prints it on start). The glasses and the laptop must be on the same network.')
  serverUrl: string = 'ws://192.168.1.2:8787/device';

  @input
  @hint('The scene camera object (the one with Device Tracking set to World).')
  cameraObject: SceneObject;

  @input
  @hint('Root object of the character. It is moved and turned every frame; put the model under it with its feet at the origin.')
  avatar: SceneObject;

  @input
  @hint('An "Audio From Microphone" asset.')
  micAudioTrack: AudioTrackAsset;

  @input
  @hint('An "Audio Output" asset. The voice is played from the avatar object.')
  audioOutputTrack: AudioTrackAsset;

  @input
  @allowUndefined
  @hint('Optional Text for status while setting up.')
  debugText: Text;

  @input
  @allowUndefined
  @hint('Optional: the Animation Player of the character, with an idle clip and a walk clip.')
  animationPlayer: AnimationPlayer;

  @input idleClip: string = 'idle';
  @input walkClip: string = 'walk';

  @input
  @allowUndefined
  @hint('Optional: the face mesh, to open the mouth while speaking.')
  faceMesh: RenderMeshVisual;

  @input mouthBlendShape: string = 'blendShape1.AK_25_JawOpen';

  @input
  @hint('Degrees to turn the model if it walks sideways or backwards.')
  modelYawOffset: number = 0;

  @input spawnDistanceMetres: number = 2.5;

  private internetModule: InternetModule = require('LensStudio:InternetModule');
  private worldQuery: WorldQueryModule = require('LensStudio:WorldQueryModule') as WorldQueryModule;
  private gestureModule: GestureModule = require('LensStudio:GestureModule') as GestureModule;

  private core: SimulacraCore;
  private socket: WebSocket = null;
  private reconnectIn = 0;
  private camera: Transform;
  private hitSession: HitTestSession;

  private mic: MicrophoneAudioProvider;
  private micRate = 24000;
  private micBuffer: Float32Array;
  private out: AudioOutputProvider;
  private speaker: AudioComponent;
  private micHold = 0;

  // Floor knowledge, built from hit tests. Lens-space centimetres.
  private floorCm: number | null = null;
  private floorVotes = 0;
  private floorCandidate = 0;
  private cells: { [key: string]: { ok: boolean; at: number } } = {};
  private probeQueue: string[] = [];
  private pointerCm: vec3 = null;
  private placeTimer = 0;
  private clock = 0;
  private clipsStarted = false;
  private body: SimulacraBody = null;
  private bodyFailed = false;
  private lastPos: Vec = null;

  onAwake(): void {
    this.camera = this.cameraObject.getTransform();

    const options = HitTestSessionOptions.create();
    options.filter = true;
    this.hitSession = this.worldQuery.createHitTestSessionWithOptions(options);
    this.hitSession.start();

    const host: Host = {
      send: (text: string) => {
        if (this.socket !== null) this.socket.send(text);
      },
      headPosition: () => {
        const p = this.camera.getWorldPosition();
        return lensToProtocol(p.x, p.y, p.z);
      },
      headForward: () => {
        // A Lens Studio camera looks down its own -Z, so the looking direction is minus "forward".
        const f = this.camera.forward;
        const v = lensToProtocol(-f.x * 100, -f.y * 100, -f.z * 100);
        return v;
      },
      floorY: () => (this.floorCm === null ? null : this.floorCm / 100),
      isFloor: (p: Vec) => this.isFloor(p),
      pointerHit: () => (this.pointerCm === null ? null : lensToProtocol(this.pointerCm.x, this.pointerCm.y, this.pointerCm.z)),
      playAudio: (samples: Int16Array) => this.play(samples),
      stopAudio: () => {
        // The samples interrupt speech this way; queued frames are expected to be dropped.
        if (this.speaker.isPlaying()) this.speaker.stop(false);
      },
      log: (message: string) => print('[Simulacra] ' + message),
    };
    this.core = new SimulacraCore(host, 'spectacles');

    // Speaker: an Audio Output asset played through an AudioComponent on the avatar.
    this.out = this.audioOutputTrack.control as AudioOutputProvider;
    this.out.sampleRate = SimulacraCore.AUDIO_RATE;
    this.speaker = this.avatar.createComponent('AudioComponent') as AudioComponent;
    this.speaker.audioTrack = this.audioOutputTrack;
    this.speaker.play(-1);

    // Microphone. The requested rate is not always honoured: read back what we actually get.
    this.mic = this.micAudioTrack.control as MicrophoneAudioProvider;
    this.mic.sampleRate = SimulacraCore.AUDIO_RATE;
    this.micRate = this.mic.sampleRate;
    this.micBuffer = new Float32Array(this.mic.maxFrameSize);
    this.mic.start();

    // Right-hand pinch interrupts the character.
    this.gestureModule.getPinchDownEvent(GestureModule.HandType.Right).add(() => this.core.interrupt());

    this.avatar.enabled = false; // shown once the floor is found
    this.createEvent('UpdateEvent').bind(() => this.onUpdate());
    this.connect();
  }

  // ---- connection

  private connect(): void {
    this.reconnectIn = 3;
    let socket: WebSocket;
    try {
      socket = this.internetModule.createWebSocket(this.serverUrl);
    } catch (e) {
      print('[Simulacra] could not open ' + this.serverUrl + ': ' + e);
      return;
    }
    socket.binaryType = 'blob';
    socket.onopen = () => {
      this.socket = socket;
      this.core.onOpen();
    };
    socket.onmessage = (event: WebSocketMessageEvent) => {
      if (typeof event.data === 'string') this.core.onMessage(event.data);
    };
    socket.onclose = () => {
      if (this.socket === socket) this.socket = null;
      this.core.onClose();
    };
    socket.onerror = () => {
      if (this.socket === socket) this.socket = null;
      this.core.onClose();
    };
  }

  // ---- audio

  private play(samples: Int16Array): void {
    const frame = new Float32Array(samples.length);
    for (let i = 0; i < samples.length; i++) frame[i] = samples[i] / 32768.0;
    if (!this.speaker.isPlaying()) this.speaker.play(-1);
    this.out.enqueueAudioFrame(frame, new vec3(frame.length, 1, 1));
  }

  // ---- floor and surfaces

  private cellKey(xCm: number, zCm: number): string {
    return Math.round(xCm / 25) + ':' + Math.round(zCm / 25);
  }

  /**
   * Is there real floor under this point? Answers come from vertical hit tests, which are
   * asynchronous, so a cell not yet tested counts as floor and is queued for testing; the walker
   * looks 30 cm ahead, so results normally arrive before the avatar does.
   */
  private isFloor(p: Vec): boolean {
    if (this.floorCm === null) return false;
    const l = protocolToLens(p);
    const key = this.cellKey(l.x, l.z);
    const cell = this.cells[key];
    if (cell !== undefined && this.clock - cell.at < 20) return cell.ok;
    if (this.probeQueue.indexOf(key) < 0 && this.probeQueue.length < 200) this.probeQueue.push(key);
    return cell !== undefined ? cell.ok : true;
  }

  private runProbes(): void {
    for (let n = 0; n < 6 && this.probeQueue.length > 0; n++) {
      const key = this.probeQueue.shift();
      const parts = key.split(':');
      const x = parseInt(parts[0]) * 25;
      const z = parseInt(parts[1]) * 25;
      const floor = this.floorCm;
      const start = new vec3(x, floor + 110, z);
      const end = new vec3(x, floor - 40, z);
      this.hitSession.hitTest(start, end, (hit) => {
        if (hit === null) return; // no depth there right now: stay undecided
        const level = hit.normal.distance(vec3.up()) < 0.25;
        this.cells[key] = { ok: level && Math.abs(hit.position.y - floor) < 12, at: this.clock };
      });
    }
  }

  /** The gaze ray: finds the floor at start-up, and is where "this is a chair" lands. */
  private castGaze(): void {
    const dir = this.camera.forward; // points backward: the camera looks along minus this
    const origin = this.camera.getWorldPosition();
    const start = origin.add(dir.uniformScale(-30));
    const end = origin.add(dir.uniformScale(-600));
    this.hitSession.hitTest(start, end, (hit) => {
      if (hit === null) {
        this.pointerCm = null;
        return;
      }
      this.pointerCm = hit.position;
      // A level surface well below the eyes, seen steadily, is the floor.
      const level = hit.normal.distance(vec3.up()) < 0.1;
      const below = origin.y - hit.position.y;
      if (!level || below < 70 || below > 230) return;
      if (this.floorCm !== null) {
        // Keep refining slowly; never jump.
        if (Math.abs(hit.position.y - this.floorCm) < 8) this.floorCm += (hit.position.y - this.floorCm) * 0.05;
        return;
      }
      if (Math.abs(hit.position.y - this.floorCandidate) < 5) this.floorVotes++;
      else {
        this.floorCandidate = hit.position.y;
        this.floorVotes = 0;
      }
      if (this.floorVotes >= 20) this.floorCm = this.floorCandidate;
    });
  }

  // ---- frame

  private onUpdate(): void {
    const dt = getDeltaTime();
    this.clock += dt;

    if (this.socket === null) {
      this.reconnectIn -= dt;
      if (this.reconnectIn <= 0) this.connect();
    }

    this.castGaze();
    if (this.floorCm !== null) this.runProbes();

    // Appear in front of the wearer as soon as there is floor to stand on.
    if (!this.core.placed && this.floorCm !== null) {
      this.placeTimer -= dt;
      if (this.placeTimer <= 0) {
        this.placeTimer = 0.5;
        if (this.core.placeInFrontOfUser(this.spawnDistanceMetres)) this.avatar.enabled = true;
      }
    }

    // Microphone -> backend. Muted (as silence) while the character speaks: the speakers are next to the mics.
    if (this.core.speakingFor > 0) this.micHold = 0.35;
    else this.micHold = Math.max(0, this.micHold - dt);
    this.core.micMuted = this.micHold > 0;
    const shape = this.mic.getAudioFrame(this.micBuffer);
    if (shape.x > 0) this.core.pushMic(this.micBuffer, shape.x, this.micRate);

    this.core.update(dt);

    // Apply the avatar pose.
    const a = this.core.avatar;
    if (this.core.placed) {
      const p = protocolToLens(a.pos);
      const t = this.avatar.getTransform();
      t.setWorldPosition(new vec3(p.x, p.y, p.z));
      const d = yawToLensDirection(a.yaw + (this.modelYawOffset * Math.PI) / 180);
      t.setWorldRotation(quat.lookAt(new vec3(d.x, 0, d.z), vec3.up()));
    }
    this.animate(a.speed01);
    this.animateBody(a.pos, a.yaw, a.speed01, dt);

    if (!isNull(this.debugText)) {
      const floor = this.floorCm === null ? 'look at the floor' : 'floor ok';
      this.debugText.text =
        (this.socket === null ? 'connecting ' + this.serverUrl : 'connected brain=' + this.core.brain) + '\n' + floor + '  ' + a.state + '\n' + this.core.lastAction + '\n' + this.core.lastTranscript + (this.core.lastError ? '\n' + this.core.lastError : '');
    }
  }

  /** No clips assigned: move the limbs procedurally. Any failure switches this off rather than breaking the lens. */
  private animateBody(pos: Vec, yaw: number, speed01: number, dt: number): void {
    if (this.bodyFailed || !isNull(this.animationPlayer) || !this.core.placed) return;
    try {
      if (this.body === null) this.body = new SimulacraBody(this.avatar);
      const moved = this.lastPos === null ? 0 : Math.sqrt((pos.x - this.lastPos.x) * (pos.x - this.lastPos.x) + (pos.z - this.lastPos.z) * (pos.z - this.lastPos.z));
      this.lastPos = { x: pos.x, y: pos.y, z: pos.z };
      const d = yawToLensDirection(yaw);
      this.body.update(new vec3(d.x, 0, d.z), moved, speed01, dt);
    } catch (e) {
      this.bodyFailed = true;
      print('[Simulacra] procedural body animation disabled: ' + e);
    }
  }

  private animate(speed01: number): void {
    if (!isNull(this.faceMesh)) {
      const open = this.core.speakingFor > 0 ? 0.25 + 0.25 * Math.sin(this.clock * 14) + 0.15 * Math.sin(this.clock * 23) : 0;
      this.faceMesh.setBlendShapeWeight(this.mouthBlendShape, Math.max(0, open));
    }
    if (isNull(this.animationPlayer)) return;
    // The samples reach clips through an untyped handle; weights are ramped here for a cross-fade.
    const player = this.animationPlayer as any;
    const idle = player.getClip(this.idleClip);
    const walk = player.getClip(this.walkClip);
    if (!idle || !walk) return;
    if (!this.clipsStarted) {
      this.clipsStarted = true;
      player.playClipAt(this.idleClip, 0);
      player.playClipAt(this.walkClip, 0);
      walk.weight = 0;
      idle.weight = 1;
    }
    const k = Math.min(1, getDeltaTime() * 6);
    walk.weight += (speed01 - walk.weight) * k;
    idle.weight = 1 - walk.weight;
  }
}
