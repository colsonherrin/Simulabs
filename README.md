# Simulacra

An embodied AI companion: a human character that stands on the floor of your real room, talks with
you by voice, knows what is around it, and decides for itself when to walk somewhere.

Built for Immerse the Bay (Stanford XR Hackathon). Quest 3S first; the brain and the protocol are
device-independent so XREAL and Spectacles clients can reuse them.

> **Status — read this first.** The backend is tested (unit + end-to-end tests, and driven in a real
> browser through the simulator). The Unity code compiles against Unity reference assemblies and
> stand-ins for the Meta SDK types, but **it has not been opened in a Unity editor or run on a
> headset yet**, and the OpenAI Realtime connection has only been exercised against a fake upstream,
> not the live API. Expect a short shake-down on first run; see [Troubleshooting](#troubleshooting).

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

### 2. Unity project → Quest 3S

1. Open `unity/` with **Unity 6000.0.66f2** (or a newer 6000.0 LTS) with Android Build Support.
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

### 3. No headset: editor simulator

**Simulacra > 2. Create Editor Sim Scene**, start the backend, press Play. A fake room with a table
and a chair, real NavMesh navigation, the same code path as the headset minus the Meta provider.

## Avatar

The project runs with a primitive mannequin until you add a rigged human. Fastest route:

1. On [Mixamo](https://www.mixamo.com/) pick a character and download it as **FBX for Unity**, T-pose,
   *with skin*.
2. Download animations for the same character, **without skin**, 30 fps: an idle, a walk with
   **In Place** ticked, and a talking loop. Optional: left turn, right turn.
3. Name the files so they contain `idle`, `walk`, `talk`, `turn_left`, `turn_right` and drop
   everything into `unity/Assets/Simulacra/Avatar/`.
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
| Room geometry | MRUK scene anchors from Space Setup → floor + obstacle boxes → runtime NavMesh | 4 m open square around the user, reported to the AI as `fallback_open_floor`, obstacles unknown |
| Object awareness | Furniture from Space Setup (`room_scan`) with zero camera use | `register_marker` by pointing and naming |
| Camera detection | Passthrough Camera API frame → vision model → Depth API raycast | Skill refuses with a reason; AI is told to use `register_marker` |
| Navigation | Unity NavMesh, path validated before moving, stuck/timeout detection | Action fails with a spoken reason |
| Lip sync | Loudness-driven mouth + talk clip | Head bob only |
| RL locomotion | Not attempted; NavMesh is the locomotion layer | — |

## Porting to another device

Everything platform-specific is in one class. To add a headset, subclass `SpatialProvider`
(`unity/Assets/Simulacra/Core/SpatialProvider.cs`): supply the head transform, a `RoomGeometry`
(floor boxes + obstacle boxes), optionally an environment raycast and a camera frame grabber.
`QuestSpatialProvider` is ~250 lines; `EditorSimProvider` is ~80.

- **XREAL Air 2 Ultra (Unity):** copy `Assets/Simulacra/Core` + `Editor/SimulacraSetup.cs`, write an
  `XrealSpatialProvider` from AR Foundation planes (largest horizontal plane = floor, other
  planes/mesh bounds = obstacles). `HasVision` stays false: the SDK exposes no RGB frames, so objects
  come from `register_marker`.
- **Snap Spectacles (Lens Studio / TypeScript):** no Unity. Implement the device side of the protocol
  in TypeScript; `backend/public/index.html` is a complete ~200-line reference client (world
  snapshots, action handling, PCM16 audio both ways). The backend is unchanged.

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
- **A Meta SDK compile error:** only `Assets/Simulacra/Quest/QuestSpatialProvider.cs` and
  `Editor/SimulacraQuestSceneBuilder.cs` touch the Meta SDK. The API names in them were taken from
  Meta's current samples (MRUK 85); adjust there.
- **Model/vision IDs:** `REALTIME_MODEL`, `REALTIME_VOICE` and `VISION_MODEL` in `.env` are defaults,
  not verified against your account.

## Repository layout

```
backend/            Node/TypeScript brain: protocol, world model, skills, memory, realtime voice, vision
  public/           browser simulator (also the reference client for non-Unity devices)
  test/             unit + end-to-end tests
unity/              Unity 6 project, preconfigured for Quest 3/3S
  Assets/Simulacra/Core    device-independent: world model, NavMesh, avatar, audio, backend link
  Assets/Simulacra/Quest   Meta Quest device layer
  Assets/Simulacra/Sim     editor simulator device layer
  Assets/Simulacra/Editor  scene builders, avatar importer
```

Project settings and Meta config assets under `unity/` come from Meta's Passthrough Camera API
samples; see `unity/THIRD_PARTY.md`.
