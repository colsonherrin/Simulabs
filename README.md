# Sundai

**Team Simulabs · Immerse the Bay (Stanford XR Hackathon)**

Sundai is an embodied AI companion that sees, speaks, moves, and interacts with your world. Meet
her in **Swords and Arrows**, an immersive AR/VR strategy game where chess meets medieval combat.

It runs in the Meta Quest Browser on a Quest 3 or 3S, with nothing to install and nothing to type.
Press **Talk to Sundai** and allow the microphone and camera when asked.

## What she does

- **Talks with you in real time.** Live two-way voice; you can interrupt her.
- **Moves through your room.** "Come here", "stand on my left", "back up a step", "walk with me",
  "sit down". She can also wander on her own and choose where to go.
- **Carries herself like a person.** She stops at conversational distance, plans a path around
  you, turns toward where she is going before she steps, and keeps her eyes on you while her body
  stays relaxed. Her motion comes from motion-capture recordings.
- **Looks at your surroundings.** Ask what she sees and she names the objects in front of you and
  remembers where each one was. Recognition runs on the headset; no image leaves the device.
- **Plays with you.** Say "let's play a game" and your room opens into a castle terrace at sunset.
  She changes into a court gown and crown and becomes your opponent and your coach. Say "leave the
  game" to come back to your room.

## Swords and Arrows

A 5×5 board. Each side has two archers, two swordsmen and a monarch. Every piece steps one square
in any direction. Archers and swordsmen can attack a neighbouring piece, and then you fight for
the square yourself, in first person:

| Your piece | Against swordsmen | Against archers |
|---|---|---|
| Swordsman | Cut down twelve soldiers charging in two waves | Knock their arrows out of the air; a clean hit sends the arrow back |
| Archer | One hand holds the bow, the other draws the string; release to fire | Shoot the archers down, two volleys of five |

Win the duel and you take the square. Lose it and the attacking piece is removed. Strike the enemy
monarch and you win the game. Sundai teases you as you play, explains any matchup you ask about,
and gives a hint when you want one.

## Warstars mode and Saturdai

- **Warstars mode.** Say "let's turn this into Warstars mode" and the same game becomes a space
  battle aboard a starship: the Light Side with blue energy swords against the Dark Side with red
  ones, blaster troopers firing red laser bolts where the archers were, a hangar deck where the
  battlefield was, and its own set of sounds. Only the look and sound change; the rules, the game
  in progress and every speed, path and hit test are the same code. "Go back to the normal game"
  restores the medieval look. While it is on, Sundai wears a starship commander's tunic and
  Saturdai a pilot's flight jacket (original designs, painted on their own bodies).
- **Saturdai.** Say "change to Saturdai" (or "change to a guy") and the companion appears as a
  young man with a man's voice; "change to Sundai" switches back. It is one voice agent with two
  bodies and two voices, so the conversation, skills, permissions and game carry straight over.

## Experimental: the Gaussian body

Either companion can be drawn as 60,000 deformable Gaussians in place of their mesh ("Gaussian
body"; "revert" goes back). It is the first working slice of
[gaussian-human-engine](gaussian-human-engine/README.md), a separate engine for diffusion-distilled
Gaussian humans. It is a prototype: it does not look as good as the standard body yet, and it has
not been measured on a headset.

## Things to say to her

| Before a game | During a game |
|---|---|
| "What can you do?" | "How do I play?" |
| "Come here." / "Stand on my right." | "What should I do?" |
| "Go to your left." / "Back up a little." | "How do I win this fight?" |
| "Walk with me." / "Stop." | "Leave the game." |
| "Sit down." / "Stand up." | |
| "Walk around on your own." | |
| "What do you see?" / "Where is my cup?" | |
| "Let's play a game." | |
| "Goodbye, close everything." | |

## How it is built

| Part | How |
|---|---|
| Platform | WebXR on Three.js, a static site on GitHub Pages (`board-game/`, `webxr/`) |
| Voice and reasoning | An ElevenLabs conversational agent with Claude as the language model, over WebRTC. Her abilities are client tools (`come_here`, `stand_beside`, `step`, `walk_to`, `roam`, `follow_me`, `sit`, `look_around`, `start_game`, `leave_game`, ...) that run in the browser and move her body |
| Body | A rigged human avatar driven by 17 motion-capture clips, with cross-fades, gaze and lip movement from the live audio level (`webxr/avatar.js`) |
| Locomotion | Short planned routes that keep out of the player's personal space and go around them (`board-game/src/sim.js`) |
| Vision | TensorFlow.js COCO-SSD in the browser on the headset's outward camera, with a memory of where things were last seen (`board-game/src/see.js`) |
| Game AI | A three-ply search that adapts to how the player does in duels. The language model never picks moves; it is told what was played and why (`board-game/src/search.js`) |
| World and combat | Hand-modelled pieces, a battlefield with ruins, fire and catapults, a sunset castle, sword and bow combat with controllers or hands |

## Run it yourself

The game, with Sundai:
```bash
cd board-game
```
```bash
npm install
```
```bash
npm run dev
```
Her voice uses the public agent id in `webxr/sim-config.json`. To point it at your own ElevenLabs
agent, change `crownfallAgentId` there and push her instructions and tools to it:
```bash
ELEVENLABS_API_KEY=... node tools/update-agent.mjs
```

The published site is built from `main` into the `gh-pages` branch: the Simulacra page from
`webxr/` (`npm run build:webxr` in `backend/`) and the game from `board-game/` (`vite build`).

## What has been checked, and how

- **On a Quest headset (by the team):** entering AR, her voice, the board game and the duels.
- **In a desktop browser (automated):** her movement skills, following, sitting, starting and
  leaving a game, the costume change, and the vision path with a test camera.
- **Against the live voice agent (ElevenLabs test runner):** that each spoken command picks the
  right skill.
- **Depends on the headset's browser:** vision needs the Quest Browser to hand over its
  passthrough camera. Where it does not, she says she cannot see.

## Team

- **Cole** built Sundai: her real-time voice and reasoning, body and motion, movement and vision
  skills, the game search and coaching, and the castle world.
- **Arthur** built the WebXR board game into a headset-playable experience and keeps the live site
  current: seating across from Sundai, two-handed bow aiming, tile selection, the
  sword-versus-archer fights with arrow deflection and dodges, and the win/lose banners.
- **Tanaya** created the chess-piece characters, from low-poly models to detailed figures, and
  built the battlefield with ruins, fires, smoke, catapults, weapons and cinematic lighting.

## License

MIT. See [LICENSE](LICENSE). Third-party assets and libraries keep their own licenses (the avatar
and its animations come from Microsoft Rocketbox, which is also MIT licensed).

---

# Simulacra: the platform underneath

Sundai grew out of Simulacra, a device-independent embodied-AI stack: a backend "mind", a wire
protocol, and native clients for Quest (Unity), XREAL and Snap Spectacles. The rest of this file
documents that stack. The web experience above does not need any of it to run.

> **Status of the native clients.** The backend's tests pass and its simulator was driven in a
> real browser. The Quest and XREAL C# code was checked against the real SDK sources but has not
> been run in a Unity editor or on a device; the Spectacles Lens Studio binding has never been
> compiled. See [Troubleshooting](#troubleshooting).

## How it fits together

Three layers, so the character never stands still waiting for a model:

```
 MIND (laptop)                          NAVIGATION + BODY (headset, every frame)
┌─────────────────────────────┐ action ┌──────────────────────────────────────┐
│ Claude: understands, picks  │ ─────► │ World model: id -> position          │
│ a skill and a target id.    │        │ NavMesh: plan, replan, stuck checks  │
│ Called only on events: user │ ◄───── │ Avatar: walk/turn/idle from real     │
│ spoke, action ended, room   │ result │ motion, gestures, lip sync           │
│ changed. Skill library +    │        │ SpatialProvider: Quest / XREAL / sim │
│ memory.                     │        └──────────────────────────────────────┘
│ Ears (speech-to-text) and   │   one WebSocket, protocol v1: audio, world,
│ Mouth (text-to-speech)      │   actions, results
└─────────────────────────────┘
```

- **The AI chooses what and when; it never chooses where.** It can only name an object id or
  `"user"`. The headset resolves ids to positions, finds a reachable standing point on the NavMesh,
  and either walks there or reports why it could not.
- **One model call starts an action; none are needed while it runs.** The action is sent to the
  headset the moment Claude finishes writing it, while the rest of the reply is still streaming.
  Walking, following, replanning around a moving user or a changed room, gestures and speech
  playback all happen locally. Claude hears back once, when the action ends.
- **Failures are spoken, not hidden.** A refused or failed action goes straight back to Claude.
- **Provenance is tracked.** Every object carries its origin: `detected` (camera + vision model),
  `room_scan`, `manual` (you pointed and named it), `simulated`. The model is told which is which
  and instructed not to claim it "sees" anything that is not `detected`.

Design, the latency budget, measurements and the V-JEPA 2 evaluation are in
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Run it

### 1. Backend (2 minutes)

```bash
cd backend
```
```bash
npm install
```
```bash
npm start
```
Then open **http://localhost:8787/setup** on the same computer, paste your keys and press Save.
They are checked, saved to `backend/.env` and used straight away, with no restart. An OpenAI key
alone is enough to talk to the character; adding an Anthropic key lets Claude do the thinking.
(Editing `.env` by hand from `.env.example` still works.) To check the keys and get the address
the headset should use:
```bash
npm run doctor
```

Open `http://localhost:8787/` — the browser simulator. Click **Mic on** and talk, or type. This is
the fastest way to work on the AI without a headset. The latency of each turn is shown above the
log, and `http://localhost:8787/metrics` has the running medians.

Which mind runs is set by `BRAIN` in `.env`:

| `BRAIN` | What it is | Measured against the real service |
|---|---|---|
| `audio` (default with an OpenAI key) | one OpenAI model (`gpt-audio-mini`) hears your voice and answers in its own, in a single request | reply starts 0.8 to 1.2 s after you stop talking; body starts moving at about 0.8 s |
| `realtime` | OpenAI's live speech-to-speech connection; falls back to `audio` if it cannot start | **never run for real** (needs WebSockets, which the test machine lacks); expected to be the fastest |
| `gpt` | an OpenAI chat model plans; separate speech-to-text and text-to-speech | about 1.7 s to movement, 2.2 s to speech |
| `claude` | Claude plans; OpenAI hears and speaks | not run (no Anthropic key) |
| `mock` | keyword rules, typed text, not AI | n/a |

How `audio` gets its speed: it starts answering after a 120 ms pause and throws that answer away
unheard if you keep talking; short commands ("come here", "follow me", "stop") move the body by
reflex as soon as they are transcribed, without waiting for the model; and nothing is transcribed
before, or synthesised after, the model. `STT_SILENCE_MS` (default 350) is the pause that ends
your turn.

Between requests the WebXR character strolls around near you and turns to you when you start
speaking (`?wander=0` turns that off).

In every mind the body starts moving the moment the model's skill call is complete, without
waiting for the rest of its reply. `REALTIME_SILENCE_MS` (default 350) is the pause that ends your
turn: lower answers sooner, higher interrupts you less.

Hearing uses a live speech-to-text socket and falls back by itself to plain HTTPS uploads if the
network blocks it (`STT_MODE=http` forces that).

```bash
npm run bench
```

```bash
npm test
```

### 2. Quest 3S

1. Open `unity-quest/` with **Unity 6000.0.66f2** (or a newer 6000.0 LTS) with Android Build Support.
   First import pulls the Meta packages (MR Utility Kit 85 and its dependencies) and Unity's
   OpenXR Meta package, which depth occlusion needs. If that package causes trouble, delete the
   `com.unity.xr.meta-openxr` line from `Packages/manifest.json`; only occlusion is lost.
2. **File > Build Profiles > Android > Switch Platform.** If **Meta > Tools > Project Setup Tool**
   lists issues, press **Fix All**.
3. Menu **Simulacra > 1. Create Quest Scene.** This generates the passthrough scene (camera rig,
   passthrough underlay, MRUK, depth raycast, passthrough camera, the `Simulacra` object) and makes
   it the build scene.
4. Select the `Simulacra` object and set **Backend Url**:
   - USB (most reliable on hackathon Wi-Fi): keep `ws://127.0.0.1:8787/device`. The backend sets
     up the USB tunnel itself whenever a headset is plugged in (it needs `adb` on the laptop).
   - Wi-Fi: `ws://<laptop-ip>:8787/device` (the backend prints its addresses on start). If the
     network isolates clients, use a phone hotspot.
5. On the headset, run **Settings > Environment setup > Space Setup** once so the room has a floor,
   walls and furniture. Label a couch/table/bed if you have one.
6. **Build And Run.** Accept the Spatial data, Headset camera and Microphone prompts.

You should see the character about 1.8 m in front of you, and a green debug HUD that disappears
by itself once everything is ready (it comes back if something breaks).
**A** = interrupt the AI, **B** = show/hide the HUD. Say *"Hey, can you come over here?"*

Point the right controller at something and say *"this is a chair"* to register it; it is
remembered for that room on later launches.

In a loud room tick **Push To Talk** on the `Simulacra` object (or put `"pushToTalk": true` in
`simulacra.json`): the microphone then only listens while the right index trigger is held.

To change the URL without rebuilding:
```bash
echo '{"backendUrl":"ws://192.168.0.42:8787/device"}' > simulacra.json
```
```bash
adb push simulacra.json /sdcard/Android/data/com.simulacra.app/files/simulacra.json
```

### 3. XREAL Air 2 Ultra

Needs a Beam Pro or a supported Android phone (XREAL lists Samsung S24/S25-class flagships), with
XREAL's **ControlGlasses** app installed on a phone (Beam Pro has MyGlasses built in).

1. Download the XREAL SDK into the project folder (248 MB, not committed):
   ```bash
   sh unity-xreal/get-xreal-sdk.sh
   ```
   On Windows without a shell: download
   `https://public-resource.xreal.com/download/XREALSDK_Release_3.1.0.20251125/com.xreal.xr.tar.gz`
   and save it as `unity-xreal/com.xreal.xr.tar.gz`.
2. Open `unity-xreal/` with **Unity 2022.3.62f2** (the version XREAL's template is built on) with
   Android Build Support. Switch platform to Android if it is not already.
3. **Edit > Project Settings > XR Plug-in Management > Android**: XREAL should be ticked. Open
   **Project Validation** and press **Fix All** if anything is listed.
4. Menu **Simulacra > 1. Create XREAL Scene.** It copies XREAL's own PlaneDetection sample scene
   (their rig, AR Session and plane manager) and adds the `Simulacra` object.
5. Set **Backend Url** on the `Simulacra` object. The app runs on the phone/Beam Pro, so either
   `adb reverse tcp:8787 tcp:8787` over USB with `ws://127.0.0.1:8787/device`, or the laptop's
   Wi-Fi address.
6. **Build**, install the APK, unplug from the PC, plug in the glasses, and launch the app from
   ControlGlasses / MyGlasses. Allow the microphone and "display over other apps".
7. **Look down at the floor and walk around for a few seconds.** The floor comes from live plane
   detection, so the walkable area is only what the glasses have seen. Detected planes are drawn
   while the HUD is on.

On the phone's on-screen controller: **Trigger** = interrupt the AI, **App** = hide/show the HUD and
the plane overlay. There is no camera on these glasses for the app to use, so objects are added by
looking at something and saying *"this is a chair"*; table-height planes appear as
`raised_surface`. Black is transparent on see-through displays: pick an avatar without black
clothes or hair.

### 4. No headset: editor simulator

**Simulacra > 2. Create Editor Sim Scene**, start the backend, press Play. A fake room with a table
and a chair, real NavMesh navigation, the same code path as the headset minus the Meta provider.

## Avatar

A realistic adult ships with the project (Microsoft Rocketbox, MIT licence; see
`packages/com.simulacra.core/Avatar/Rocketbox/README.md`). Creating the scene prepares it
automatically: materials are rebuilt from its textures and a prefab is saved. It needs no animation
files: walking, idling and looking at you are generated from the skeleton, the mouth and a slight
smile follow the voice, and it blinks.

To use your own character instead, put a rigged FBX in `Assets/Simulacra/Avatar/` of the Unity
project and run **Simulacra > 3. Setup Avatar**. Alone, it is animated procedurally like the
bundled one (its bones are found by Unity's Humanoid mapping or by name: Biped, Mixamo and generic
names work). If you add animation files whose names contain `idle`, `walk` (exported **in place**),
`talk`, `turn_left`, `turn_right`, they are used instead, through an Animator Controller with the
parameters `Speed` (0 standing to 1 walking), `Turn` (−1..1), `MotionSpeed` and `Speaking`.

Whatever the model, it is measured at spawn: rescaled to 1.72 m only if its height is implausible
for a human, and its soles put on the floor wherever its pivot is. Check the licence of any model
you add.

Settings you may want, on the `Simulacra` object or in `simulacra.json` on the headset:

| Setting | Default | What it does |
|---|---|---|
| `pushToTalk` | off | Listen only while the right index trigger is held (loud rooms) |
| `dynamicObstacles` | on | Sense unmapped obstacles with depth while walking and go around them |
| `autoScanSeconds` | 20 | Quiet background camera scans for objects. **Sends room images to the vision provider.** 0 = only when asked |
| `hudAutoHideSeconds` | 8 | Hide the debug HUD once everything is ready. 0 = keep it |
| Depth Occlusion (Quest object only) | on | Real furniture hides the character; turns itself off if unsupported |
| Use Depth Mesh (XREAL object only) | off | Feed the reconstructed mesh to navigation |

## Skills

| Skill | What happens |
|---|---|
| world state | Prefetched into every Claude turn: distances, directions, origins, what the user is looking toward. No coordinates. |
| `look_at(target)` | Turn to face an object or the user. |
| `walk_to(target)` | Path-plan to a standing point beside it; async result. |
| `approach_user()` | Walk to ~1.2 m from the user and face them, tracking them if they move. |
| `follow_user()` | Keep following until told to stop. Runs entirely on the headset. |
| `gesture(type)` | `wave`, `nod`, `shake_head`, `shrug`. |
| `run_sequence(steps, save_as)` | Several steps in one go with no model call in between; remembered as a skill if it works. |
| `inspect_object(id)` | Walk up, face it, return its record plus saved notes. |
| `remember_object(id, note)` | Long-term note, kept across sessions. |
| `scan_surroundings()` | Camera frame → vision model → depth raycast → new `detected` objects. |
| `register_marker(label)` | "This is my desk" while pointing: stores a `manual` object. |
| `stop_moving()` | Halt. |
| `run_skill(name, target_id)` | Replay a sequence that was saved with `save_as`, on any object. |
| speak | Claude's text is spoken; with an action, the line rides in the action's `say` field so it starts with the movement. |

Memory (`backend/data/memory.json`) keeps per-skill success/failure counts with the last failure
reason, an episode log, object notes and composed skills, and feeds them back into the prompt. This
is Voyager-style bookkeeping over a fixed skill library. It is not reinforcement learning, and no
model-written code is ever executed.

## What is real, what is a fallback

| Requirement | Implemented as | If unavailable |
|---|---|---|
| Room geometry (Quest) | MRUK scene anchors from Space Setup → floor + obstacle boxes → runtime NavMesh | 4 m open square around the user, reported to the AI as `fallback_open_floor`, obstacles unknown |
| Room geometry (XREAL) | AR Foundation planes: lowest large upward plane = floor, vertical planes = walls, raised planes = obstacles; re-published as it grows | 3 m square assumed 1.6 m below the head, reported as `fallback_assumed_floor` |
| Object awareness | Furniture from Space Setup (`room_scan`) with zero camera use | `register_marker` by pointing and naming |
| Camera detection | Passthrough Camera API frame → vision model → Depth API raycast | Skill refuses with a reason; AI is told to use `register_marker` |
| Navigation | Unity NavMesh, path validated before moving, stuck/timeout detection | Action fails with a spoken reason |
| Lip sync | Loudness-driven mouth + talk clip | Head bob only |
| RL locomotion | Not attempted; NavMesh is the locomotion layer | — |

## Adding another device

Everything shared lives in the local Unity package `packages/com.simulacra.core`, referenced by
both Unity projects. A device adds exactly one class, a `SpatialProvider` subclass: the head
transform, a `RoomGeometry` (floor boxes + obstacle boxes), and optionally an environment raycast,
a camera frame grabber and two buttons. `QuestSpatialProvider` and `XrealSpatialProvider` are about
200 lines each; `EditorSimProvider` is about 80.

**Snap Spectacles (2024)** cannot use Unity, so `spectacles/` holds a Lens Studio TypeScript
client for the same backend. Its platform-free core is tested here against the real backend; the
part that touches the glasses has never been run. Setup and limits: [spectacles/README.md](spectacles/README.md).

**WebXR:** `webxr/` is a browser client served by the backend at `/xr/`: open it in Meta Quest
Browser and press Enter AR, with nothing to build. It shares its behaviour with the Spectacles
core. Details and limits: [webxr/README.md](webxr/README.md).

| Device | Unity | WebXR | Other |
|---|---|---|---|
| Quest 3 / 3S | `unity-quest` | yes, Meta Quest Browser | |
| XREAL Air 2 Ultra | `unity-xreal` | not expected: no known browser on it offers AR sessions | |
| Snap Spectacles (2024) | no (Unity is not supported) | unknown: untested, and it would have no room scan | Lens Studio client, `spectacles/` |

The protocol is defined in `backend/src/protocol.ts`: JSON text frames over one WebSocket at
`/device`, audio as base64 PCM16 mono 24 kHz.

## Troubleshooting

- **HUD says `connecting…` with a socket error:** wrong URL, backend not running, or client
  isolation on Wi-Fi. Use `adb reverse` over USB.
- **HUD `brain=-` and a `[error] brain failed to start`:** bad/missing `OPENAI_API_KEY`, or the
  account has no access to `REALTIME_MODEL`. Change the model in `.env`.
- **`[error] Claude rejected the request`:** a planner setting the model does not accept; clear
  `PLANNER_FAST` or change `PLANNER_MODEL`.
- **It hears you but never answers aloud:** speech-to-text or text-to-speech failed; the HUD shows
  the error. Both need `OPENAI_API_KEY`. `BRAIN=gpt` is the fallback that needs no Claude key.
- **It talks over itself / cuts itself off:** half-duplex is on by default (mic muted while it
  speaks; press **A** to cut in). If you turned it off, turn it back on.
- **`room=fallback_open_floor`:** no Space Setup data or the Spatial data permission was denied.
- **`navmesh=NO`:** the floor anchor was missing or tiny. Redo Space Setup.
- **`vision=no`:** Headset camera permission denied, or Horizon OS older than v74.
- **Avatar slides or moonwalks:** the walk clip was not exported In Place.
- **XREAL: `room=fallback_assumed_floor`:** no floor plane yet. Look at the floor and move; it
  switches to `plane_detection` on its own.
- **XREAL: package error on open:** `unity-xreal/com.xreal.xr.tar.gz` is missing (step 1).
- **XREAL: avatar stops with "navmesh rebuilt":** should not happen (geometry updates wait for
  the avatar to stand still); if it does, raise `Min Update Interval` on the provider.
- **A package version changed:** the SDK-specific code is only in `QuestSpatialProvider.cs`,
  `XrealSpatialProvider.cs` and the two scene builders.
- **Model IDs:** `REALTIME_MODEL`, `REALTIME_VOICE`, `STT_MODEL`, `TTS_MODEL` and `VISION_MODEL` in
  `.env` are defaults, not verified against your account.

## Tests

```bash
cd backend && npm test
```
21 backend tests (real server, WebSockets and HTTP; cloud services and headset are stand-ins),
including the Spectacles client core.

```bash
cd tools/headless-tests && dotnet run
```
38 checks of the real geometry, world-model and avatar-fit code outside Unity.

In either Unity project: **Window > General > Test Runner > EditMode > Run All** runs the NavMesh,
obstacle-avoidance, spawn-placement and avatar-scale tests against the real engine.

The audit of all of this, with what is and is not verified, is in
[docs/FULL_SYSTEM_AUDIT.md](docs/FULL_SYSTEM_AUDIT.md); the complexity review is in
[docs/SIMPLIFICATION_AUDIT.md](docs/SIMPLIFICATION_AUDIT.md).

## Repository layout

```
backend/                       Node/TypeScript brain: protocol, world model, skills, memory, voice, vision
  public/                      browser simulator (also the reference client for non-Unity devices)
packages/com.simulacra.core/   shared Unity package: world model, NavMesh, avatar, audio, backend link,
                               editor simulator, avatar importer, in-editor tests
tools/headless-tests/          runs the package's geometry and world-model code outside Unity
spectacles/                    Lens Studio client for Snap Spectacles (2024); its core is shared with webxr/
webxr/                         browser (WebXR) client, served by the backend at /xr/
unity-quest/                   Unity 6000.0.66f2 project for Quest 3 / 3S   (Assets/Simulacra/Quest)
unity-xreal/                   Unity 2022.3.62f2 project for XREAL glasses  (Assets/Simulacra/Xreal)
```

Each Unity project starts from its vendor's own sample project so the platform settings are the
vendor's; see `unity-quest/THIRD_PARTY.md` and `unity-xreal/THIRD_PARTY.md`.
