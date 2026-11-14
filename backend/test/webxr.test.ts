// The WebXR client is served by the backend. These tests check the serving and the bundle; the
// client itself is exercised in a real browser by webxr/check.cjs (needs Playwright).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { startServer } from '../src/server.js';
import { opts } from './helpers.js';

test('webxr: the page, the bundled client and the character are served', async () => {
  const { port, close } = await startServer(opts({ url: 'http://127.0.0.1:9' }, { brain: 'mock' }));
  try {
    const get = (path: string) => fetch(`http://127.0.0.1:${port}${path}`, { redirect: 'manual' });

    const redirect = await get('/xr');
    assert.equal(redirect.status, 302);
    assert.equal(redirect.headers.get('location'), '/xr/');

    const page = await get('/xr/');
    assert.equal(page.status, 200);
    assert.match(page.headers.get('content-type') ?? '', /text\/html/);
    assert.match(await page.text(), /\/xr\/app\.js/);

    const app = await get('/xr/app.js');
    assert.equal(app.status, 200, 'the client bundles without errors');
    const js = await app.text();
    assert.ok(js.length > 200_000, 'three.js and the client are in the bundle');
    assert.match(js, /immersive-ar/);
    assert.match(js, /plane-detection/);
    assert.match(js, /action_result/, 'the shared core is in the bundle');

    const fbx = await get('/xr/avatar/RocketboxAdult.fbx');
    assert.equal(fbx.status, 200);
    assert.ok((await fbx.arrayBuffer()).byteLength > 1_000_000);
    assert.equal((await get('/xr/avatar/f006_body_color.png')).headers.get('content-type'), 'image/png');

    // Nothing outside the three served folders is reachable.
    assert.equal((await get('/xr/avatar/../../../../backend/package.json')).status, 404);
    assert.equal((await get('/xr/main.js')).status, 404);
  } finally {
    await close();
  }
});
