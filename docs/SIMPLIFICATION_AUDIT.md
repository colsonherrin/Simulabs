# Simplification audit

Question asked: what can be removed, merged or replaced so that the system has fewer ways to fail,
without losing the experience?

## Summary answer

| | Before this pass | Now | Achievable next (needs a measurement or the headset) |
|---|---|---|---|
| Things a person must configure in the backend | 15 settings | 2 keys (10 optional, commented out) | 1 key if the speech-to-speech brain wins the benchmark |
| Minds in the codebase | 3 (Claude, speech-to-speech, mock) | 3 | 2: keep whichever of the first two measures faster, delete the other |
| Skills offered to the model | 15 | 14 (13 to Claude) | same |
| Device actions | 10 | 9 | same |
| Cloud calls for a routine request | 1 model call + speech in + speech out | same | same |
| Cloud calls caused by a noise burst | 1 aborted model call, request lost | 0 | 0 |
| Model calls when an action keeps failing | unbounded | at most 8, then none | same |
| Runtime dependencies | backend 2, Unity 1 beyond the vendor SDKs | same | same |
| Pre-demo checks done by hand | all of them | one command (`npm run doctor`) | same |
| Cloud services in the demo's critical path | 3 (Claude, speech-to-text, text-to-speech) + vision if scanning | 3, vision avoidable | 1 with the speech-to-speech brain |

**Honest accounting of code size.** This pass did not make the codebase smaller. Backend source is
flat (+100 / −89 lines: features removed, a doctor command added). The Unity runtime grew by about
340 lines, all of it fixes for defects found in the QA audit (avatar fitting, spawn search, ground
pinning, gaze, push-to-talk). Tests grew by about 700 lines. What shrank is the number of things
that can go wrong: configuration, duplicated tools, unbounded behaviours and silent failure paths.

The structural result: **the system already is the four-component design**, so nothing was
restructured. The remaining large simplification, one mind instead of two, should be decided by a
ten-minute benchmark rather than by taste.

## Existing architecture against the proposed four components

| Proposed component | What exists | Verdict |
|---|---|---|
| **A. Spatial world model** | `WorldModel.cs` on the headset is the single authority: ids → positions, origin, confidence, age, room geometry. The backend holds a read-only mirror (`world.ts`) that only turns it into words. One coordinate system: Unity world space, metres, y up. Two device boundaries: room anchor → upright box, image point → world ray. | Already matches. The mirror is not duplicated state: nothing is ever written to it except the headset's snapshot. |
| **B. AI brain** | One brain is active per session, chosen at start: `ClaudeBrain` (+ `speech.ts` for hearing and voice) or `RealtimeBrain`. No verification loop, no second planner. | Matches at run time. Two implementations exist; see simplification 1. |
| **C. Action controller** | `ActionExecutor.cs` (validate, resolve ids) → `AvatarController.cs` (move, replan) → `RoomNavMesh.cs`. One action message format. | Already matches. |
| **D. Hardware adapter** | `SpatialProvider` with three subclasses: Quest (~240 lines), XREAL (~190), editor simulator (~75). Nothing else touches a vendor SDK. | Already matches. |

Dependencies: backend `ws`, `@anthropic-ai/sdk` (run time), `tsx`, `typescript` (build). Unity:
Newtonsoft JSON plus the vendor SDKs (Meta MR Utility Kit 85; XREAL SDK 3.1.0 with AR Foundation
5.2). No database, no queue, no vector store, no orchestration framework.

## Shared root causes

Several symptoms were traced to one cause each, and fixed there.

| Root cause | Symptoms it produced or would produce | Single fix |
|---|---|---|
| The imported body was never measured | Tiny or giant character; floating; sunk to the waist when the pivot is at the hips; voice coming from the wrong height | `AvatarFit`: measure once at spawn, set scale and sole height, report on the HUD |
| Placement was not tied to floor the user can reach | Spawning inside a table; spawning beyond a wall; every later walk failing with "no path" because the character stands on a disconnected island | Spawn uses the same connected-floor test as walking (`FindSpawnPoint`) |
| Sound events were treated as intent | Background noise silencing the character; requests lost after a noise burst; end-of-speech never detected while muted | Act on words, not on "speech started"; microphone stream never stops, it carries silence when muted |
| Failures had no bound | A hung model call freezing the character for minutes; a model retrying a doomed action forever | 20 s request timeout; two-strikes refusal in the skill layer |
| The body stood on the navigation mesh, not on the floor | Feet a few centimetres off the ground, different in every room | Body pinned to the measured floor height |
| The room is only what the room scan contains (**not fixed**) | Walking through an unscanned chair; "chair" unknown until pointed at; no reaction to moved furniture | For the demo: add the chair as a furniture volume in Space Setup. Later: subscribe to the SDK's room-update events |

Checked and found **not** to be a problem: inconsistent coordinate systems. Everything shares one
world space and the conversions that exist are tested. The one unverified boundary is the
orientation of the camera frame sent for detection (now inspectable through `last_scan.jpg`).

## Five highest-leverage simplifications

| # | Simplification | Problems it removes | Status | Reliability | Dev time | Latency | Maintainability |
|---|---|---|---|---|---|---|---|
| 1 | **One mind.** Benchmark Claude + speech services against the speech-to-speech brain; delete the loser | A whole untested code path; one vendor and two cloud hops if speech-to-speech wins (−590 lines: `claudeBrain.ts`, `speech.ts`), or −216 lines if Claude wins | Not done: needs `npm run bench` and five spoken commands | ↑ | 30 min | possibly large | ↑ |
| 2 | **Take the camera out of the demo path.** Introduce the chair through Space Setup (or pointing) instead of a live scan | Camera permission, frame orientation, vision-model call, depth ray inside the current view, 2–5 s wait: five failure points for one object | Available now, no code. The scan stays as an optional extra | ↑↑ | 5 min | −2 to −5 s on that step | = |
| 3 | **Tether or fix the address.** USB with `adb reverse`, so the headset always uses `127.0.0.1` | Wi-Fi client isolation, changing laptop IPs, typing addresses into a headset | Available now; `doctor` prints both options | ↑↑ | 0 | = | = |
| 4 | **Measure the avatar once, place it once** (root causes 1, 2, 5) | Six visual defects | Done | ↑ | done | = | ↑ |
| 5 | **Remove what the demo does not use** | Idle-autonomy timer, `forget_object`, duplicate `save_skill` tool, three switches, 13 required settings | Done | ↑ | done | = | ↑ |

## Open-source options considered

Each repository was cloned and read; nothing was run. Compatibility is judged against this
project: Unity 6000.0, built-in render pipeline, Meta SDK 85.

| Project | Licence, state | What it would replace | Decision | Reason |
|---|---|---|---|---|
| MR Utility Kit `SceneNavigation` (inside the SDK already) | SDK licence | Our 120-line NavMesh builder | **Reject** | It makes the same `NavMeshBuilder` call internally, but is 1,080 lines, creates an obstacle object per anchor and changes agent types. It is Quest-only, so XREAL would need a second navigation path. More moving parts, not fewer. Worth revisiting only for its automatic rebuild on room updates. |
| Meta Phanto | MIT; Unity 6000.0, built-in pipeline, SDK 83 | Navigation, occlusion | **Reject as code, use as reference** | Its navigation is 7 files and ~1,700 lines of its own. It does demonstrate depth occlusion on the built-in pipeline, which is the reference for the occlusion fix. |
| Meta Spatial Lingo | MIT; URP, SDK 81 | Cloud vision call | **Reject** | On-device YOLO: adds an inference runtime, a model file and ~3,500 lines to replace one HTTP call, limited to 80 fixed classes. Its 2D→3D step is the same as ours. One idea worth borrowing later: cast several rays inside the box and discard outliers. |
| Meta Depth API shaders (`com.meta.xr.depthapi`) | Oculus SDK licence; announced for archival | Occlusion | **Defer** | A full Standard-shader copy with occlusion. The SDK already ships a simpler occlusion surface shader; use that first. Either needs an XR provider package this project lacks. |
| uLipSync | MIT | 80-line loudness mouth | **Defer** | Adds Burst, Mathematics, ~3,400 lines and a per-voice calibration step. Gives nothing on a Mixamo character, which has no mouth blendshapes. Worth it only together with an avatar that has visemes. |
| UniVRM | MIT | Avatar import | **Defer** | ~860 scripts. The reason to adopt it is an avatar with standard mouth and blink expressions; that is the photorealism stage, not the MVP. Its toon shader would not take depth occlusion without edits. |
| Unity ML-Agents | Apache-2.0 | NavMesh locomotion | **Reject** | No pretrained navigation policy; the only humanoid is a physics ragdoll. Needs a Python training stack. NavMesh already solves path-finding in milliseconds. |
| Voyager | MIT; no commits since 2023; Python | Skill memory | **Reject as code** | Minecraft-specific, and by design uses four model roles with several calls per action (action, critic, curriculum, skill description), which is the latency pattern this project removed. Its transferable idea, a library of named reusable skills, is what `memory.json` already is, without embeddings. |

No library was adopted. In every case the existing code was smaller than the integration, or the
library solved a problem the MVP does not have.

## Keep / replace / merge / remove / defer

| Subsystem | Depends on | Why it exists | Decision |
|---|---|---|---|
| Device world model (`WorldModel.cs`) | – | Single authority for positions | **Keep** |
| Backend world mirror (`world.ts`) | headset snapshots | Turns positions into words for the model | **Keep** (read-only) |
| Runtime NavMesh (`RoomNavMesh.cs`) | Unity AI module | Same navigation on every headset | **Keep** |
| Avatar controller, action executor | NavMesh | Local movement and validation | **Keep** |
| Claude brain + speech modules | Anthropic SDK, OpenAI speech | Claude as planner | **Keep or remove after benchmark** (simplification 1) |
| Speech-to-speech brain | OpenAI Realtime | Lowest-hop voice path, works with one key | **Keep or remove after benchmark** |
| Mock brain | – | Tests and wiring without keys | **Keep** (78 lines; every backend test without a model uses it or the stand-in server) |
| Skill executor + memory | JSON file | Validation, sequences, reuse | **Keep** |
| `save_skill` tool | – | Second way to store a sequence | **Removed** (merged into `run_sequence` + `save_as`, which now generalises automatically) |
| Idle autonomy | timers | Speculative self-initiated behaviour | **Removed** |
| `forget_object` action | – | No skill ever called it | **Removed** |
| Settings `STOP_REFLEX`, `PLANNER_THINKING`, `AUTONOMY_IDLE_SEC` | – | Switches nobody should flip at a demo | **Removed** |
| Camera detection (`vision.ts`, frame capture) | camera permission, OpenAI, depth | Real visual detection | **Keep, out of the demo path** (simplification 2) |
| Latency tracker, `/metrics`, bench | – | The only evidence about delay | **Keep** |
| Doctor command | – | Replaces manual pre-flight | **Added** |
| Browser simulator | – | Development without a headset; reference client | **Keep** |
| Editor simulator provider | – | Runs the Unity side without a headset | **Keep** |
| XREAL project | XREAL SDK, AR Foundation | Second device | **Defer further work** until Quest runs; nothing to delete, it shares the core |
| Snap Spectacles client | – | Third device | **Defer** (does not exist) |
| Depth occlusion | extra XR package | Presence | **Defer to first hardware session** (highest visual payoff) |
| Laptop backend | network | Holds keys, runs the mind | **Keep for the hackathon.** Moving the mind onto the headset means rewriting it in C# and shipping keys in the app |

## Changes made and how they were checked

| Change | Check |
|---|---|
| Removed idle autonomy, `forget_object`, `save_skill`, three settings | Type check; 17 backend tests pass |
| `run_sequence` saves generalised skills | backend test: saved with `$target`, replayed on another object |
| Act on words, not noise; continuous mic stream | backend test with a stand-in speech service |
| Request timeout; retry breaker | backend test with a model that retries forever |
| `AvatarFit`, ground pinning, spawn search | headless arithmetic checks; engine tests written, not run; compile check on both SDKs |
| Staggered reachability, throttled HUD | compile check |
| Settings reduced to two keys; doctor | ran doctor without keys |

All C# still binds with 0 errors against the real Meta SDK 85 and XREAL SDK 3.1.0 sources.

## Measurements

No live latency exists yet, before or after, because no credentials were available. What can be
compared:

| | Before | After |
|---|---|---|
| Input → action sent (no model) | 1 ms | 1 ms |
| Input → body started, simulator | 18 ms | 10–14 ms (same code; run-to-run variation) |
| "Stop" → body idle, simulator | not measured | 77 ms |
| Model calls for a three-step task | 1 + 1 | 1 + 1 (now asserted by a test) |
| Model calls wasted per noise burst | 1 | 0 |
| Model calls on a permanently failing action | unbounded | ≤ 8 |

## Remaining hardware validation

Everything in `FULL_SYSTEM_AUDIT.md` marked NOT TESTED, using its hardware checklist. The three
that decide architecture, not just quality:

1. `npm run bench` and spoken trials: picks the mind (simplification 1).
2. Path-planning time on the Quest (`plan_ms` on the HUD): confirms navigation needs no change.
3. Whether depth occlusion works after adding the XR package: decides if that dependency stays.

## The simplest architecture that still delivers the demo

```
 Headset app (Unity)                      Laptop (one Node process)
 ──────────────────────                   ─────────────────────────
 Hardware adapter  (1 class per device)   One mind: hears, decides, speaks
 World model       (ids -> positions)  ⇄  Skill layer: validate, sequence, remember
 Action controller (NavMesh + avatar)     One JSON file of memory
```

Four parts on the headset, one process off it, one WebSocket between them, two keys (one if the
speech-to-speech mind is chosen), no camera in the critical path, USB tether. Everything else in
the repository is either a test, a development tool, or the second device.
