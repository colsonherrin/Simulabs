# Low-latency architecture

The character must respond and move without waiting on repeated model calls. This document says
where model calls used to cost time, how the system is split now, what was measured, and whether
V-JEPA 2 belongs anywhere near it.

## Three layers

```
            events only (user spoke, action ended, room changed)
 ┌──────────────────────────────┐        ┌───────────────────────────────┐
 │ 1. MIND  Claude (backend)    │ action │ 2. NAVIGATION (on the headset)│
 │  understands, picks a skill  │ ─────► │  NavMesh from room geometry   │
 │  and a target id, keeps the  │        │  path planning, replanning,   │
 │  skill library and memory    │ ◄───── │  stuck detection, every frame │
 │  ~1 call per user request    │ result └──────────────┬────────────────┘
 └──────────────────────────────┘                       │ velocity, turn rate
        ▲ words        │ sentences                       ▼
   speech-to-text   text-to-speech        ┌───────────────────────────────┐
   (streaming)      (streamed, queued)    │ 3. BODY  rigged human         │
                                          │  walk / turn / idle from real │
                                          │  motion, gestures, lip sync   │
                                          └───────────────────────────────┘
```

The mind never sees a frame, a coordinate or a path. Navigation and the body never wait for the
mind: once an action is accepted they run at frame rate until it ends, then report.

### Action API (mind → body)

One JSON message per action over the device WebSocket (`backend/src/protocol.ts`):

```json
{ "type": "action", "id": "a7", "action": "walk_to", "target_id": "chair_1", "status": "requested" }
```

| Action | Executed locally as |
|---|---|
| `walk_to(target_id)` | Resolve id → position, find a reachable standing point, plan, walk, face it. Re-plans if the target moves or the room mesh is rebuilt. |
| `approach_user()` | `walk_to` the user at conversational distance; the goal is re-evaluated as they move. |
| `follow_user()` | Continuous local behaviour: re-path whenever the user gets more than ~0.6 m beyond the follow distance; runs until `stop` or another movement. Zero model calls while following. |
| `look_at(target_id)` | Turn in place. |
| `inspect_object(target_id)` | Walk up and face; the backend attaches the object record and saved notes to the result. |
| `gesture(type)` | `wave`, `nod`, `shake_head`, `shrug`: Animator trigger if the rig has one, else procedural bone motion. Layers over walking and speech. |
| `speak` | Claude's text is spoken by the text-to-speech stream; with an action, the line travels in the action's `say` field. Never blocks movement. |
| `stop()` | Halt at once. A bare spoken "stop" also triggers this locally in the backend before any model call. |
| `scan_surroundings`, `register_marker` | World-model updates (camera detection, user-pointed objects). |

Feedback (body → mind):

- `event action_started {id, plan_ms, path_m}` the moment the first path is planned;
- `action_result {id, status: succeeded|failed, reason, data}` when it ends;
- `world` snapshots a few times per second, independent of any model call.

## Where model calls cost time before, and what changed

The earlier build never had a simulate-and-verify loop (navigation was always local), so the
feared 30-second case did not exist. It did have avoidable round trips:

| Before | Cost | Now |
|---|---|---|
| The model called `get_world_state` before answering "what's over there?", then answered in a second turn | One extra model round trip per spatial question | Current world state is prefetched into every turn as text; Claude has no world-query tool |
| After every action call the brain requested another model turn just to say "on my way" | One extra round trip before the user heard anything | The spoken line rides inside the action call (`say`); no acknowledgement call is made |
| An action was executed only after the model finished its whole reply | Model generation time added to time-to-move | Each action is dispatched the moment its tool block finishes streaming, while the reply is still being generated |
| Multi-step requests needed one model turn per step | One round trip per step | `run_sequence` / `run_skill` execute all steps locally; one call starts them, one event ends them |
| A room-geometry update cancelled a walk in progress (XREAL), needing the model to re-issue it | A failed action and a new model turn | The body re-snaps and replans to the same goal by itself |
| A moving user was approached at the position they had when the command was given | Stale destination | The goal is a function re-evaluated every 0.4 s while walking |
| System prompt and tools re-read on every call | Longer time to first token | Stable prefix (tools + system) is marked for prompt caching; everything volatile lives in the messages |

A routine request now costs **one** Claude call to start and **one** when the action ends (so the
character can remark on arriving or continue a plan). Following, walking, replanning, gestures and
speech playback cost none.

## Event-driven reasoning

`backend/src/claudeBrain.ts` keeps a single-flight loop fed by an inbox:

- **user spoke** → call now; if a call is already in flight it is aborted and speech is cut (barge-in);
- **action succeeded / failed** → call when the loop is free;
- **room changed** (an object nobody asked for appeared or vanished, the user walked off) →
  batched and rate-limited, attached to the next turn or one quiet call of its own;
- nothing else. There is no polling and no per-frame call.

A failed action is the one case that triggers an immediate second call, because the user must be
told. A `say` line attached to a refused action is never spoken.

## Skill library and memory (Voyager-inspired)

Fixed primitives, composed as data: `run_sequence(steps, save_as)` runs a plan locally and, if every
step succeeds and `save_as` is given, stores it as a named skill; `save_skill` / `run_skill` store
and replay sequences with a `$target` placeholder. `backend/data/memory.json` keeps per-skill
success counts with the last failure reason, an episode log and object notes, all fed back into
each turn. This is skill memory, not reinforcement learning, and no model-written code is executed.

## Measurements

Every turn is timed from the end of the user's input and published at `/metrics`, on the headset
HUD and in the simulator: `transcript`, `llm_first_token`, `action_dispatched`, `device_started`,
`speech_text`, `first_audio`, plus the headset's own `plan_ms` and the number of model calls.

**Measured here** (no headset and no model credentials were available in the build environment):

| What | Result | How |
|---|---|---|
| Backend overhead, input → action sent | 1 ms | Mock brain, real server and WebSocket |
| Input → body reports it started moving | 18 ms | Browser simulator over a local WebSocket |
| Dispatcher overhead on top of the model | 0–3 ms after the tool block arrives | Stand-in model server with a 120 ms first byte: first event 126 ms, action sent 126–157 ms |
| Action sent before the reply finished | Yes, 500 ms earlier in the test | `test/claude.test.ts`, asserted |
| Model calls for "come over here" | 1 to start, 1 on arrival | Same test, asserted |

**Not measured, and where to read them once you run it:**

| What | Where it will show |
|---|---|
| Claude time to first event and to action, per model/effort | `npm run bench` (typed input, live API) and `/metrics` |
| Speech-to-text delay after the user stops talking | `transcript` in `/metrics` |
| Time to first spoken audio | `first_audio` in `/metrics` |
| Path-planning time on Quest / XREAL | `plan_ms` on the HUD and in `/metrics` |

Speech-to-action for a voice command is `transcript + (action_dispatched − transcript) + (device_started − action_dispatched)`.
The first term belongs to speech-to-text, the second to Claude, the third to the network and the
headset's planner.

### Tuning knobs, in order of expected effect

1. **Model and effort** (`PLANNER_MODEL`, `PLANNER_EFFORT`). The default is `claude-opus-5-5` at
   `low` effort. That model always thinks before answering, which delays the first visible output.
   Run the benchmark on it and on `claude-haiku-5-5` and keep the fastest one whose decisions hold up.
2. **Fast output mode** (`PLANNER_FAST=1`): faster generation at a higher price, on models that support it.
3. **`BRAIN=realtime`**: one speech-to-speech model hears, decides and talks. It has no
   speech-to-text or text-to-speech hop, so it is likely the lowest-latency voice path, at the cost
   of not using Claude for planning. Both brains share the dispatcher, skills and metrics, so the
   comparison is one environment variable.

## V-JEPA 2 evaluation

Repository inspected at commit `204698b`; licence MIT (three data-loading files Apache 2.0).

**What it is.** A video encoder (ViT-L 300M to ViT-g 1B parameters; a V-JEPA 2.1 ViT-B at about
80M) that turns a clip into one embedding per patch. It outputs no depth, pose, geometry or labels;
any task needs a trained probe on top. The action-conditioned variant, V-JEPA 2-AC, is a ViT-g
encoder plus a 305M-parameter predictor trained on the DROID robot-arm dataset. Its action space is
a 7-D end-effector delta for a Franka arm, and it plans by sampling many action sequences and
rolling each through the predictor toward a goal image.

**Measured inference time** (4 vCPUs, no GPU, random weights, so speed only, not quality):

| Model | Input | Median |
|---|---|---|
| ViT-L encoder | 2 frames, 256 px | 0.51 s |
| ViT-L encoder | 16 frames, 256 px | 4.86 s |
| ViT-L encoder | 64 frames, 256 px (native clip) | 34.8 s |
| V-JEPA 2.1 ViT-B encoder | 16 frames, 384 px | 4.75 s |
| AC: ViT-g encoder | one image | 1.49 s |
| AC predictor, one step | batch of 25 samples | 11.9 s |

The repository's own reduced "CPU-friendly" planning setting needs four such batched predictor
calls, so roughly 48 s per planned action on this machine; its default setting is 80 times more
sample-steps. The repository states no latency figures, strongly recommends a CUDA GPU, and has no
export, quantisation or mobile path. GPU and on-headset timings were not measured.

**Does it add anything over conventional navigation here?**

- Path planning: no. The NavMesh planner answers in milliseconds from geometry the headset already
  has; V-JEPA 2 produces embeddings, not walkable space.
- Predicting where to walk: no. The only released action-conditioned model predicts the effect of
  robot-arm motions seen from a fixed camera. Its action space has nothing to do with a character
  walking, and using it would mean collecting data and training a new predictor.
- Scene or activity understanding (what the user is doing, anticipating their next move): possibly,
  as a slow background signal from a GPU server, after training a probe. That is a research
  project, not a prototype improvement.

**Decision.** V-JEPA 2 is not in the movement loop or anywhere in the prototype. Nothing measured
justifies it: a single encoder pass takes from half a second to tens of seconds on CPU where a
NavMesh query is a per-frame operation, the repository offers no way to run it on the headsets, and
it answers a different question. Revisit only if anticipating user activity becomes
a goal and a GPU server is available.
