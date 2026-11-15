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

## Voice, sight and manners (hosted page)

- **Live conversation.** With a key in the page it opens OpenAI's live voice call (WebRTC,
  `gpt-realtime`): the microphone and her voice are real-time audio, so you talk as with a voice
  assistant and can interrupt. If the call cannot be set up it falls back by itself to one request
  per sentence (`gpt-audio-mini`); `?mind=audio` forces that. The status line shows which
  (`brain: realtime` or `brain: audio`).
- **Sight.** If the browser offers an outward camera, a still of your view goes to the live model
  when you start speaking, and every 10 s while idle a still goes to a vision model whose findings
  are placed in the room (source `detected`, positions approximate) so she can walk to them.
  `?look=0` stops the idle looks, `?camera=0` the camera, `?camfov=90` sets the assumed lens angle.
  An avatar or selfie "camera" is refused. In the fallback mind only the placing works: that model
  cannot look at pictures.
- **Manners.** She never enters a 0.65 m circle around you, plans paths around you, and steps back
  if you walk into her. She turns to you when you speak and while she speaks. She strolls only
  across floor the room scan has confirmed; with no room scan she stays where she is.
- **Debug.** The Debug button shows mind, microphone level, camera, room, positions, and a running
  log (heard / said / actions / timings / errors), with a Copy button. Switched on before entering
  AR, the same information stays visible in the headset.

Checked in a desktop browser against the real service: spoken input through the fallback mind,
the seeing loop on the rendered preview view (recognised, placed, walked to), personal space,
strolling, debug panel. **Not checked anywhere: the live call's audio** (the test machine cannot
carry it; OpenAI did accept the call request), and everything on a headset, including whether
Quest Browser offers the outward camera.

## Hosted page: no backend needed

`https://<you>.github.io/simulacra/` runs by itself. Paste an OpenAI key into the page and press
Save; the page then talks to OpenAI directly, using the same session code as the backend (bundled
into the page). No laptop, no USB. On a Quest: open the address in Meta Quest Browser, paste the
key, press Enter AR.

- The key is kept in that browser's storage and sent only to OpenAI. Anyone with access to that
  browser profile could read it, so use a key you can revoke.
- Learned skills and notes are kept in the same browser.
- "Use my own backend instead" on the page takes a backend address (`ws://localhost:8787` with the
  headset on USB, or a `wss://` address).

To rebuild and publish:

```bash
cd backend && npm run build:webxr -- ../webxr-site
```

then push that folder as the `gh-pages` branch (Settings → Pages → Deploy from a branch → `gh-pages`, `/`).

Checked in a desktop browser with no backend running, against the real OpenAI service: key
accepted, spoken replies, "come over here" and "go to the table" move the character. Not checked
on a headset.
