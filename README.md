# Simulacra

An embodied AI companion: a human character that stands on the floor of your real room, talks with
you by voice, knows what is around it, and decides for itself when to walk somewhere.

Built for Immerse the Bay (Stanford XR Hackathon). Quest 3S first; the brain and the protocol are
device-independent so XREAL and Spectacles clients can reuse them.

> **Status — read this first.** Nothing here has run on a headset or inside a Unity editor yet;
> that first run is yours. What has been verified:
> - **Backend:** unit and end-to-end tests pass, and the simulator was driven in a real browser.
>   The OpenAI Realtime link has only been exercised against a fake upstream, not the live API.
> - **Quest C#:** every method body binds without errors against the real Meta SDK 85 source
>   (MR Utility Kit + Core) and the real Unity 6000.0.66f2 assemblies.
> - **XREAL C#:** same check against the real XREAL SDK 3.1.0, AR Foundation 5.2.0, Input System
>   and Unity 2022.3.62f2 assemblies.
> - **Not verifiable without the hardware:** scene assembly in the editor, tracking quality, plane
>   detection behaviour, audio levels, frame rate. See [Troubleshooting](#troubleshooting).
> - **Snap Spectacles:** not built yet. The backend and protocol are ready for it.

## How it fits together

```
 Headset (Unity)                                Laptop (Node)                       Cloud
┌───────────────────────────────┐   WebSocket   ┌──────────────────────────┐
│ SpatialProvider  (device layer)│   protocol v1 │ Session                  │
│   Quest: MRUK room, depth      │◄─────────────►│  WorldModel (ids, no xyz │
│   raycast, passthrough camera  │  audio, world,│   ever shown to the LLM) │      OpenAI Realtime
│ WorldModel  id -> position     │  actions,     │  SkillExecutor + Memory  │◄────► (speech in/out,
│ ActionExecutor  validate, act  │  results      │   Voyager-style skills   │       picks skills)
│ RoomNavMesh + AvatarController │               │  Brain: realtime | mock  │      Vision model
│ Mic / spatial voice / lip sync │               │  Vision (frame -> points)│◄────► (object detection)
└───────────────────────────────┘               └──────────────────────────┘
```

- **The AI chooses what and when; it never chooses where.** It can only name an object id or
  `"user"`. The headset resolves ids to positions, finds a reachable standing point on the NavMesh,
  and either walks there or reports why it could not.
- **Movement is asynchronous.** A walk returns `started`, the character says "on my way", and the
  real outcome comes back as an `[action_result]` the model must react to. Failures are spoken, not
  hidden.
- **Provenance is tracked.** Every object carries its origin: `detected` (camera + vision model),
  `room_scan` (your Quest Space Setup), `manual` (you pointed and named it), `simulated`. The model
  is told which is which and instructed not to claim it "sees" anything that is not `detected`.

## Run it

### 1. Backend (2 minutes)

```bash
cd backend
```
```bash
npm install
```
```bash
cp .env.example .env
```
Put your `OPENAI_API_KEY` in `.env`, then:
```bash
npm start
```

Open `http://localhost:8787/` — the browser simulator. Click **Mic on** and talk, or type. This is
the fastest way to work on the AI without a headset. With no key the server starts a **mock brain**
(keyword rules, typed text only, clearly labelled, not AI) so wiring can still be tested.

```bash
npm test
```

### 2. Quest 3S

1. Open `unity-quest/` with **Unity 6000.0.66f2** (or a newer 6000.0 LTS) with Android Build Support.
   First import pulls the Meta packages (MR Utility Kit 85 and its dependencies).
2. **File > Build Profiles > Android > Switch Platform.** If **Meta > Tools > Project Setup Tool**
   lists issues, press **Fix All**.
3. Menu **Simulacra > 1. Create Quest Scene.** This generates the passthrough scene (camera rig,
   passthrough underlay, MRUK, depth raycast, passthrough camera, the `Simulacra` object) and makes
   it the build scene.
4. Select the `Simulacra` object and set **Backend Url**:
   - USB (most reliable on hackathon Wi-Fi): keep `ws://127.0.0.1:8787/device` and run
     ```bash
     adb reverse tcp:8787 tcp:8787
     ```
   - Wi-Fi: `ws://<laptop-ip>:8787/device` (the backend prints its addresses on start). If the
     network isolates clients, use a phone hotspot.
5. On the headset, run **Settings > Environment setup > Space Setup** once so the room has a floor,
   walls and furniture. Label a couch/table/bed if you have one.
6. **Build And Run.** Accept the Spatial data, Headset camera and Microphone prompts.

You should see a placeholder mannequin ~1.8 m in front of you with a green debug HUD.
**A** = interrupt the AI, **B** = hide/show the HUD. Say *"Hey, can you come over here?"*

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

The project runs with a primitive mannequin until you add a rigged human. Fastest route:

1. On [Mixamo](https://www.mixamo.com/) pick a character and download it as **FBX for Unity**, T-pose,
   *with skin*.
2. Download animations for the same character, **without skin**, 30 fps: an idle, a walk with
   **In Place** ticked, and a talking loop. Optional: left turn, right turn.
3. Name the files so they contain `idle`, `walk`, `talk`, `turn_left`, `turn_right` and drop
   everything into `unity-quest/Assets/Simulacra/Avatar/` (or `unity-xreal/Assets/Simulacra/Avatar/`).
4. **Simulacra > 3. Setup Avatar.** It sets the rigs to Humanoid, loops the clips, builds an Animator
   Controller with the `Speed` / `Turn` / `Speaking` parameters, saves a prefab and assigns it.

Any humanoid works (VRM via UniVRM, Ready Player Me, your own). The contract is just: an `Animator`
with optional `Speed` (float, m/s), `Turn` (float, −1..1), `Speaking` (bool). Animation is driven by
how the body is actually moving, not by what was requested. Mouth: a blendshape named like
`jawOpen` / `viseme_aa` / `mouthOpen` or a humanoid jaw bone is driven by voice loudness; otherwise
you get the talk clip plus a head bob. Check the licence of whatever model you use.

## Skills

| Skill | What happens |
|---|---|
| `get_world_state()` | Distances, directions, origins, what the user is looking toward. No coordinates. |
| `look_at(target)` | Turn to face an object or the user. |
| `walk_to(target)` | Path-plan to a standing point beside it; async result. |
| `approach_user()` | Walk to ~1.2 m from the user and face them. |
| `inspect_object(id)` | Walk up, face it, return its record plus saved notes. |
| `remember_object(id, note)` | Long-term note, kept across sessions. |
| `scan_surroundings()` | Camera frame → vision model → depth raycast → new `detected` objects. |
| `register_marker(label)` | "This is my desk" while pointing: stores a `manual` object. |
| `stop_moving()` | Halt. |
| `save_skill(...)` / `run_skill(...)` | Compose primitives into a reusable named skill (`$target` placeholder) and replay it. |
| speak | The model's own voice; there is no separate tool. |

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

**Snap Spectacles (Lens Studio / TypeScript)** is not built yet. It cannot use Unity, so it
implements the device side of the protocol in TypeScript; `backend/public/index.html` is a complete
reference client (world snapshots, action handling, PCM16 audio both ways). The backend is unchanged.

The protocol is defined in `backend/src/protocol.ts`: JSON text frames over one WebSocket at
`/device`, audio as base64 PCM16 mono 24 kHz.

## Troubleshooting

- **HUD says `connecting…` with a socket error:** wrong URL, backend not running, or client
  isolation on Wi-Fi. Use `adb reverse` over USB.
- **HUD `brain=-` and a `[error] brain failed to start`:** bad/missing `OPENAI_API_KEY`, or the
  account has no access to `REALTIME_MODEL`. Change the model in `.env`.
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
- **Model/vision IDs:** `REALTIME_MODEL`, `REALTIME_VOICE` and `VISION_MODEL` in `.env` are defaults,
  not verified against your account.

## Repository layout

```
backend/                       Node/TypeScript brain: protocol, world model, skills, memory, voice, vision
  public/                      browser simulator (also the reference client for non-Unity devices)
packages/com.simulacra.core/   shared Unity package: world model, NavMesh, avatar, audio, backend link,
                               editor simulator, avatar importer
unity-quest/                   Unity 6000.0.66f2 project for Quest 3 / 3S   (Assets/Simulacra/Quest)
unity-xreal/                   Unity 2022.3.62f2 project for XREAL glasses  (Assets/Simulacra/Xreal)
```

Each Unity project starts from its vendor's own sample project so the platform settings are the
vendor's; see `unity-quest/THIRD_PARTY.md` and `unity-xreal/THIRD_PARTY.md`.
