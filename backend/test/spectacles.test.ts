// The Spectacles client core (real file from spectacles/Assets/Scripts) against the real backend.
// The glasses themselves are replaced by a virtual room; the brain is the keyword mock.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import WebSocket from 'ws';
import { base64ToPcm16, lensToProtocol, pcm16ToBase64, protocolToLens, SimulacraCore, yawToLensDirection, type Host, type Vec } from '../../spectacles/Assets/Scripts/SimulacraCore.js';
import { startServer } from '../src/server.js';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const base = { port: 0, brain: 'mock' as const, realtimeModel: 'x', realtimeVoice: 'x', visionModel: 'x', memoryPath: null, quiet: true };

/** A 6 x 6 m floor at y = -1.4 (glasses origin is at the head) with a table blocking the middle. */
function virtualRoom(port: number) {
  const ws = new WebSocket(`ws://127.0.0.1:${port}/device`);
  const sent: any[] = [];
  const played: Int16Array[] = [];
  const room = {
    head: { x: 0, y: 0.2, z: -2.2 } as Vec,
    fwd: { x: 0, y: 0, z: 1 } as Vec,
    pointer: null as Vec | null,
    floorY: -1.4 as number | null,
    stops: 0,
  };
  const table = { x: 0, z: 0.8, hx: 0.7, hz: 0.4 };
  const host: Host = {
    send: (t) => { sent.push(JSON.parse(t)); ws.send(t); },
    headPosition: () => room.head,
    headForward: () => room.fwd,
    floorY: () => room.floorY,
    isFloor: (p) => Math.abs(p.x) < 3 && Math.abs(p.z) < 3 && !(Math.abs(p.x - table.x) < table.hx + 0.2 && Math.abs(p.z - table.z) < table.hz + 0.2),
    pointerHit: () => room.pointer,
    playAudio: (s) => played.push(s),
    stopAudio: () => room.stops++,
    log: () => {},
  };
  const core = new SimulacraCore(host, 'spectacles-test');
  ws.on('open', () => core.onOpen());
  ws.on('message', (raw) => core.onMessage(raw.toString()));
  ws.on('close', () => core.onClose());
  /** Run the device loop for `seconds` of simulated time at 30 fps, letting the network breathe. */
  const run = async (seconds: number, until?: () => boolean) => {
    for (let t = 0; t < seconds; t += 1 / 30) {
      core.update(1 / 30);
      if (until && until()) return true;
      if (Math.round(t * 30) % 3 === 0) await sleep(2);
    }
    return until ? until() : true;
  };
  const say = (text: string) => ws.send(JSON.stringify({ type: 'text', text }));
  const flat = (a: Vec, b: Vec) => Math.hypot(a.x - b.x, a.z - b.z);
  return { ws, core, room, sent, played, run, say, flat, table };
}

test('spectacles core: base64 PCM16 conversion matches a reference implementation', () => {
  for (const n of [0, 1, 2, 3, 1440, 1441]) {
    const samples = new Int16Array(n).map((_, i) => ((i * 7919) % 65536) - 32768);
    const b64 = pcm16ToBase64(samples, n);
    assert.equal(b64, Buffer.from(samples.buffer, 0, n * 2).toString('base64'), `encode ${n} samples`);
    assert.deepEqual(Array.from(base64ToPcm16(b64)), Array.from(samples), `decode ${n} samples`);
  }
});

test('spectacles core: Lens Studio (cm, right-handed, camera looks down -Z) maps to protocol space correctly', () => {
  const same = (got: Vec, want: Vec, what: string) => assert.ok(Math.abs(got.x - want.x) + Math.abs(got.y - want.y) + Math.abs(got.z - want.z) < 1e-9, `${what}: got ${JSON.stringify(got)}`);
  // A point 2 m in front of a default Lens Studio camera is at z = -200 cm.
  same(lensToProtocol(0, 0, -200), { x: 0, y: 0, z: 2 }, 'point ahead');
  // The looking direction of that camera is minus its transform.forward (0,0,1): protocol +z, i.e. "ahead".
  const f = { x: 0, y: 0, z: 1 };
  same(lensToProtocol(-f.x * 100, -f.y * 100, -f.z * 100), { x: 0, y: 0, z: 1 }, 'gaze direction');
  // The wearer's right-hand side (+x in Lens Studio) stays +x: with +z ahead that is "right" for the backend.
  same(lensToProtocol(150, -140, 0), { x: 1.5, y: -1.4, z: 0 }, 'point to the right, on the floor');
  same(protocolToLens(lensToProtocol(12, 34, -56)), { x: 12, y: 34, z: -56 }, 'round trip');
  // An avatar with yaw 0 faces protocol +z, which is Lens Studio -z; a quarter turn right faces +x in both.
  same(yawToLensDirection(0), { x: 0, y: 0, z: -1 }, 'yaw 0');
  same(yawToLensDirection(Math.PI / 2), { x: 1, y: 0, z: 0 }, 'yaw 90');
});

test('spectacles core: the demo interaction against the real backend', async () => {
  const srv = await startServer(base);
  const dev = virtualRoom(srv.port);
  await new Promise<void>((r) => dev.ws.on('open', () => r()));
  await dev.run(0.5, () => dev.core.brain === 'mock');
  assert.equal(dev.core.brain, 'mock');

  // 1. The avatar appears in front of the user, on the floor, facing them, not in the table.
  assert.ok(dev.core.placeInFrontOfUser(1.8));
  const a = dev.core.avatar;
  assert.equal(a.pos.y, -1.4);
  assert.ok(Math.abs(dev.flat(a.pos, dev.room.head) - 1.8) < 0.01);
  const facing = { x: Math.sin(a.yaw), z: Math.cos(a.yaw) };
  assert.ok(facing.x * (dev.room.head.x - a.pos.x) + facing.z * (dev.room.head.z - a.pos.z) > 1.7, 'faces the user');

  // 2. "Come over here": the backend picks the skill, the device walks locally and reports.
  dev.say('Hey, come over here.');
  assert.ok(await dev.run(8, () => /approach_user user ok/.test(dev.core.lastAction)), dev.core.lastAction);
  assert.ok(Math.abs(dev.flat(a.pos, dev.room.head) - 1.2) < 0.1, `stopped ${dev.flat(a.pos, dev.room.head).toFixed(2)} m from the user`);
  assert.ok(dev.sent.some((m) => m.type === 'event' && m.name === 'action_started'));
  const world = dev.sent.filter((m) => m.type === 'world').at(-1).world;
  assert.equal(world.room.source, 'surface_hit_test');
  assert.deepEqual(world.user.pos, [0, 0.2, -2.2]);

  // 3. The user looks at a chair and names it: registered as manual, never as detected.
  dev.room.pointer = { x: 2, y: -1.0, z: 2 };
  dev.say('this is a chair');
  assert.ok(await dev.run(3, () => /register_marker ok/.test(dev.core.lastAction)), dev.core.lastAction);
  assert.equal(dev.core.find('chair_1')!.source, 'manual');

  // 4. "Go check out the chair": walks there, stands beside it, faces it.
  dev.say('go check out the chair');
  assert.ok(await dev.run(12, () => /inspect_object chair_1 ok/.test(dev.core.lastAction)), dev.core.lastAction);
  const chair = dev.core.find('chair_1')!.pos;
  assert.ok(dev.flat(a.pos, chair) < 1.0 && dev.flat(a.pos, chair) > 0.5, `beside the chair (${dev.flat(a.pos, chair).toFixed(2)} m)`);
  assert.ok(Math.abs(Math.atan2(chair.x - a.pos.x, chair.z - a.pos.z) - a.yaw) < 0.1, 'facing the chair');

  // 5. Follow, with the user walking away; then stop at once.
  dev.core.onMessage(JSON.stringify({ type: 'action', id: 'f1', action: 'follow_user', status: 'requested' }));
  dev.room.head = { x: -2, y: 0.2, z: -2.5 };
  await dev.run(10, () => dev.flat(a.pos, dev.room.head) < 1.8);
  assert.ok(dev.flat(a.pos, dev.room.head) < 1.8, 'followed the user across the room');
  dev.say('Stop!');
  assert.ok(await dev.run(2, () => a.state === 'idle'), 'stopped');
  const at = { ...a.pos };
  dev.room.head = { x: 2, y: 0.2, z: -2.5 };
  await dev.run(1.5);
  assert.ok(dev.flat(a.pos, at) < 0.01, 'stays put after stop');

  dev.ws.close();
  await srv.close();
});

test('spectacles core: blocked and unknown targets fail with a reason; microphone framing', async () => {
  const srv = await startServer(base);
  const dev = virtualRoom(srv.port);
  await new Promise<void>((r) => dev.ws.on('open', () => r()));
  await dev.run(0.3);
  dev.core.placeInFrontOfUser(1.8);

  const act = (m: object) => dev.core.onMessage(JSON.stringify({ type: 'action', status: 'requested', ...m }));
  const result = (id: string) => dev.sent.find((m) => m.type === 'action_result' && m.id === id);

  act({ id: 'u1', action: 'walk_to', target_id: 'sofa_9' });
  assert.match(result('u1').reason, /unknown target/);

  // An object outside the mapped floor cannot be reached by any path.
  dev.core.register('vase', { x: 0, y: -0.6, z: 5 }, 'manual');
  act({ id: 'u2', action: 'walk_to', target_id: 'vase_1' });
  assert.equal(result('u2').status, 'failed');
  assert.match(result('u2').reason, /no reachable floor/);

  // Path planning: the table sits between the avatar and a point behind it. The planner goes around.
  const start = { x: 0, y: -1.4, z: -0.4 };
  const behind = { x: 0, y: -1.4, z: 2.2 };
  const path = dev.core.planPath(start, behind)!;
  assert.ok(path.length >= 2, `a detour has corners (${path.length} points)`);
  let prev = start, length = 0;
  for (const p of path) {
    for (let t = 0; t <= 1; t += 0.05) {
      const q = { x: prev.x + (p.x - prev.x) * t, z: prev.z + (p.z - prev.z) * t };
      assert.ok(!(Math.abs(q.x - dev.table.x) < dev.table.hx && Math.abs(q.z - dev.table.z) < dev.table.hz), `path crosses the table at ${q.x.toFixed(2)},${q.z.toFixed(2)}`);
    }
    length += dev.flat(prev, p);
    prev = p;
  }
  assert.ok(dev.flat(prev, behind) < 1e-9 && length > 2.6 + 0.3 && length < 6, `detour length ${length.toFixed(2)} m`);
  assert.equal(dev.core.planPath(start, { x: 0, y: -1.4, z: 0.8 }), null, 'a point inside the table is unreachable');
  const t0 = performance.now();
  for (let i = 0; i < 20; i++) dev.core.planPath(start, behind);
  assert.ok((performance.now() - t0) / 20 < 20, 'planning is fast enough to redo while walking');

  // And the walk itself follows that path: a target behind the table is reached, not refused.
  dev.core.avatar.pos = { ...start };
  dev.core.register('plant', { x: 0, y: -1.0, z: 2.6 }, 'manual');
  act({ id: 'p1', action: 'walk_to', target_id: 'plant_1' });
  await dev.run(15, () => !!result('p1'));
  assert.equal(result('p1').status, 'succeeded', JSON.stringify(result('p1')));
  assert.ok(dev.flat(dev.core.avatar.pos, { x: 0, y: 0, z: 2.6 }) < 1.3);

  act({ id: 'u3', action: 'scan_surroundings' });
  assert.match(result('u3').reason, /not available on this device/);
  act({ id: 'u4', action: 'gesture', params: { type: 'backflip' } });
  assert.equal(result('u4').status, 'failed');
  act({ id: 'u5', action: 'gesture', params: { type: 'wave' } });
  assert.equal(result('u5').status, 'succeeded');

  // The floor disappears under the path while walking (a real obstacle): the walk fails, it does not push through.
  dev.core.register('lamp', { x: -2, y: -1.4, z: 2 }, 'manual');
  act({ id: 'u6', action: 'walk_to', target_id: 'lamp_1' });
  await dev.run(0.5);
  dev.room.floorY = -1.4;
  const realIsFloor = (dev.core as any).host.isFloor;
  (dev.core as any).host.isFloor = () => false;
  await dev.run(2, () => !!result('u6'));
  assert.match(result('u6').reason, /became blocked/);
  (dev.core as any).host.isFloor = realIsFloor;

  // Microphone: 16 kHz capture is resampled to 24 kHz and framed as 60 ms of PCM16.
  dev.sent.length = 0;
  const tone = new Float32Array(1600).map((_, i) => Math.sin(i / 5) * 0.5); // 100 ms at 16 kHz
  dev.core.pushMic(tone, tone.length, 16000);
  dev.core.pushMic(tone, tone.length, 16000);
  const frames = dev.sent.filter((m) => m.type === 'audio');
  assert.equal(frames.length, 3, '200 ms in -> three 60 ms frames out, remainder kept');
  const first = base64ToPcm16(frames[0].pcm16);
  assert.equal(first.length, 1440);
  assert.ok(Math.max(...first) > 15000 && Math.max(...first) < 17000, 'amplitude preserved');
  dev.core.micMuted = true;
  dev.sent.length = 0;
  dev.core.pushMic(tone, tone.length, 16000);
  dev.core.pushMic(tone, tone.length, 16000);
  const muted = dev.sent.filter((m) => m.type === 'audio');
  assert.ok(muted.length >= 3 && base64ToPcm16(muted.at(-1).pcm16).every((s) => s === 0), 'muted mic still streams, as silence');

  // Speech from the backend is decoded and handed to the device; audio_stop flushes it.
  dev.core.onMessage(JSON.stringify({ type: 'audio', pcm16: Buffer.from(new Int16Array([1, -2, 300]).buffer).toString('base64') }));
  assert.deepEqual(Array.from(dev.played.at(-1)!), [1, -2, 300]);
  dev.core.onMessage(JSON.stringify({ type: 'audio_stop' }));
  assert.equal(dev.room.stops, 1);

  dev.ws.close();
  await srv.close();
});
