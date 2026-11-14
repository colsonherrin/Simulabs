// Browser check for the WebXR client. Needs Playwright with Chromium, and a backend running
// with the mock brain:
//
//   cd backend && BRAIN=mock PORT=8791 npm start
//   node webxr/check.cjs http://localhost:8791 [screenshot-folder]
//
// Part 1 drives the 45-second demo in preview mode (simulated room, typed input).
// Part 2 starts an emulated Quest 3 AR session (Meta's IWER, a captured living room) and checks
// the room scan is read and the avatar walks across it without leaving the floor.
// Neither part is a headset test.
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://localhost:8791';
const shots = process.argv[3];
const args = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'];
const fail = (m) => { console.error('FAIL ' + m); process.exitCode = 1; };

async function open(browser, query) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(base + '/xr/' + query);
  await page.waitForFunction(() => window.simulacra && window.simulacra.core.connected, null, { timeout: 90000 });
  return { page, errors };
}
const state = (page) => page.evaluate(() => {
  const s = window.simulacra, c = s.core, a = c.avatar.pos;
  const h = c.host.headPosition();
  return { state: c.avatar.state, toUser: Math.hypot(a.x - h.x, a.z - h.z), onFloor: s.isFloor(a.x, -a.z), action: c.lastAction, said: c.lastTranscript, y: a.y, features: s.features, source: s.room.source, floors: s.room.floors.length, obstacles: s.room.obstacles.length, objects: c.objects.map((o) => o.id + ':' + o.source), kind: s.body.kind, bones: s.body.ready };
});
const dist = (page, id) => page.evaluate((id) => { const c = window.simulacra.core, o = c.find(id); return Math.hypot(c.avatar.pos.x - o.pos.x, c.avatar.pos.z - o.pos.z); }, id);

(async () => {
  const browser = await chromium.launch({ args });

  // ---- Part 1: preview mode, the demo sequence
  let { page, errors } = await open(browser, '');
  await page.waitForFunction(() => window.simulacra.core.placed, null, { timeout: 30000 });
  const say = async (text, re) => {
    await page.fill('#text', text);
    await page.press('#text', 'Enter');
    await page.waitForFunction((r) => new RegExp(r).test(window.simulacra.core.lastAction + ' | ' + window.simulacra.core.lastTranscript), re, { timeout: 30000 });
  };
  let s = await state(page);
  console.log(`preview: character=${s.kind} skeleton=${s.bones} spawn ${s.toUser.toFixed(2)} m from the user`);
  if (s.kind !== 'rocketbox' || !s.bones) fail('the bundled character did not load with its skeleton');
  await page.evaluate(() => window.simulacra.camera.position.set(1.6, 1.6, 0.6));
  await say('Hey, come over here.', 'approach_user user ok');
  s = await state(page);
  console.log(`  "come over here": ${s.toUser.toFixed(2)} m from the user`);
  if (s.toUser > 1.6) fail('did not come to the user');
  await page.evaluate(() => { const c = window.simulacra.camera; c.rotation.y = Math.atan2(c.position.x + 1.5, c.position.z + 3.6); c.rotation.x = -0.25; });
  await page.waitForTimeout(900);
  await say('What do you see over there?', 'Sim: .*chair');
  console.log(`  "what do you see over there": ${(await state(page)).said}`);
  await page.fill('#text', 'Yeah, go check it out.');
  await page.press('#text', 'Enter');
  let off = 0;
  for (let t = Date.now(); Date.now() - t < 30000 && !/inspect_object chair_1 (ok|FAILED)/.test((s = await state(page)).action); await page.waitForTimeout(100)) if (!s.onFloor) off++;
  const d = await dist(page, 'chair_1');
  console.log(`  "go check it out": ${s.action}; ${d.toFixed(2)} m from the chair; samples off the floor: ${off}`);
  if (!/ ok$/.test(s.action) || d > 1.3 || off > 0) fail('walk to the chair');
  if (shots) await page.screenshot({ path: shots + '/webxr-preview.png' });
  if (errors.length) fail('page errors: ' + errors.join('; '));
  await page.close();

  // ---- Part 2: emulated AR session
  ({ page, errors } = await open(browser, '?emulate=1&debug=1'));
  await page.waitForFunction(() => !document.getElementById('enter').disabled, null, { timeout: 30000 });
  await page.click('#enter');
  await page.waitForFunction(() => !window.simulacra.preview && window.simulacra.core.placed, null, { timeout: 30000 });
  await page.waitForTimeout(1200);
  s = await state(page);
  console.log(`emulated AR: features ${s.features.join(',')}`);
  console.log(`  room: ${s.source}, ${s.floors} floor outline, ${s.obstacles} obstacles; objects ${s.objects.join(' ')}`);
  console.log(`  avatar on the floor: ${s.onFloor} (y=${s.y.toFixed(3)}), ${s.toUser.toFixed(2)} m from the user`);
  if (s.source !== 'room_scan' || s.obstacles === 0 || !s.onFloor) fail('room scan or placement');
  if (s.objects.some((o) => !o.endsWith(':room_scan'))) fail('an object in AR is not from the room scan');
  const target = await page.evaluate(() => { const c = window.simulacra.core; return c.objects.slice().sort((a, b) => Math.hypot(b.pos.x - c.avatar.pos.x, b.pos.z - c.avatar.pos.z) - Math.hypot(a.pos.x - c.avatar.pos.x, a.pos.z - c.avatar.pos.z))[0].id; });
  await page.evaluate((t) => window.simulacra.core.onMessage(JSON.stringify({ type: 'action', id: 'w1', action: 'walk_to', target_id: t })), target);
  off = 0;
  for (let t = Date.now(); Date.now() - t < 40000 && !/walk_to .* (ok|FAILED)/.test((s = await state(page)).action); await page.waitForTimeout(100)) if (!s.onFloor) off++;
  console.log(`  walk to the farthest scanned object: ${s.action}; ${(await dist(page, target)).toFixed(2)} m away; samples off the floor: ${off}`);
  if (!/ ok$/.test(s.action) || off > 0) fail('walk across the scanned room');
  if (shots) await page.screenshot({ path: shots + '/webxr-emulated-ar.png' });
  if (errors.length) fail('page errors: ' + errors.join('; '));
  await browser.close();
  console.log(process.exitCode ? 'FAILED' : 'ok');
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
