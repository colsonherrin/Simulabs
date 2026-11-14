# Simulacra in the browser (WebXR)

The same headset role as the Unity and Lens Studio clients, as a web page served by the backend.
Nothing to build or install on the headset.

**Status: runs in a desktop browser and in an emulated Quest 3 AR session. Never run on a
physical headset.**

## Run it

```bash
cd backend
npm install
npm start
```

| Where | Address | What you get |
|---|---|---|
| Quest 3 / 3S | plug the headset into the laptop by USB, open **Meta Quest Browser**, go to `http://localhost:8787/xr/`, press **Enter AR** | the avatar in your room |
| Any desktop browser | `http://localhost:8787/xr/` | preview in a simulated room: type or talk, drag to look, WASD to move |
| Desktop, emulated headset | `http://localhost:8787/xr/?emulate=1` | the AR code path against a captured living room (Meta's IWER emulator) |

USB matters: WebXR and the microphone only work on a secure page, and `localhost` counts as
secure. The backend sets up the USB tunnel (`adb reverse`) by itself when a headset with developer
mode is plugged in. Over Wi-Fi you need HTTPS in front of the backend, for example
`cloudflared tunnel --url http://localhost:8787`.

On first entry the headset asks for the microphone and for access to your room layout. Allow both.
If the headset has no saved room, it is asked to run room setup.

In AR: **trigger or pinch** cuts the avatar off mid-sentence; **grip** brings it back in front of you.

## What it uses

| Capability | Source |
|---|---|
| Floor height | `local-floor` reference space |
| Walkable floor, obstacles | the headset's room scan: `plane-detection` and `mesh-detection` |
| Known objects | room-scan furniture with the headset's own labels (table, couch, door, window, screen, ...), source `room_scan`; plus anything you point at and name ("this is a chair"), source `manual` |
| Path around furniture | A* on a 20 cm grid in the shared core (`spectacles/Assets/Scripts/SimulacraCore.ts`) |
| Occlusion by real objects | `depth-sensing`, drawn by three.js |
| Character | the bundled Rocketbox adult, scaled to 1.70 m, procedural walk, head look, jaw from speech loudness, blink |
| Voice | microphone to the backend as 24 kHz PCM; speech played with WebAudio |

Without a room scan the avatar still appears, standing at floor level, and stays within 4 m of
where the session started. It then knows no obstacles and says so to the backend
(`room.source = floor_level_only`).

## Limits

- No camera object detection. "Scan the room" is refused with an explanation; objects come from
  the room scan and from pointing. Nothing is presented as visually recognised.
- Pointed-at markers are not remembered between sessions (the Unity clients do remember them).
- No spatial anchor: if the headset recentres, the avatar moves with the coordinate system.
- Quest's furniture volumes are used as axis-aligned footprints, so a table standing diagonally
  blocks a slightly larger rectangle than it occupies.

## Options (add to the address)

`?depth=0` no occlusion · `?hud=0` no status text · `?halfduplex=1|0` mute the microphone while
the avatar speaks (default on for Quest) · `?debug=1` draw floor and obstacle outlines ·
`?height=1.8` character height · `?backend=ws://host:8787` another backend · `?avatar=placeholder`

## Checked here, and not

```bash
cd backend && BRAIN=mock PORT=8791 npm start
node webxr/check.cjs http://localhost:8791
```

(needs Playwright). In headless Chromium with the mock brain this passes: the character loads with
its skeleton; "come over here" ends 1.2 m from the user; "what do you see over there" names the
chair being looked at; "go check it out" walks around the table to 0.7 m from the chair; in the
emulated AR session all requested features are granted, the room scan yields one floor outline,
8 obstacles and 12 labelled objects, and the avatar crosses the room to the farthest one without
a single sample off the floor.

Not checked: anything on a physical headset. In particular tracking, what Quest Browser actually
reports for a given room, depth occlusion (the emulator logs a WebGL warning for the occlusion
draw; use `?depth=0` if the avatar looks wrong), microphone echo, audio level, frame rate.

## Hosting the page on GitHub Pages

The page can be served from `https://<you>.github.io/simulacra/` instead of from the backend.
Only the page moves: the backend (the mind, the voice and your keys) still runs on your computer.

```bash
cd backend && npm run build:webxr -- ../webxr-site
```

Publish that folder as the `gh-pages` branch, then in the repository's Settings → Pages choose
"Deploy from a branch", `gh-pages`, `/ (root)`.

The hosted page connects to `ws://localhost:8787` by default (the laptop, when the headset is on
USB) and has a "Backend address" box for anything else. Because the page is HTTPS, any backend
other than localhost must be `wss://` (for example a tunnel). Not tested on a headset; a browser
may ask permission before letting a public page reach a local address.
