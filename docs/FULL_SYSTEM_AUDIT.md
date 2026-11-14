# Full-system QA audit

Scope: the whole experience, judged from the point of view of a first-time wearer. Audited at the
state of branch `qa-audit`.

## Bottom line

**Nobody has yet seen this character through a headset.** No Quest or XREAL device, no Unity editor
licence and no Claude/OpenAI credentials were available where this audit ran. So the honest answer
to "can someone wear the headset and feel a life-sized intelligent human is present" is **not
tested**, and two things are known to be missing for it: real furniture does not hide the character
(no depth occlusion), and no rigged human is in the repository (a primitive mannequin stands in).

What this audit did do: read every source file skeptically, found 17 defects that would have hurt
a first run (4 of them likely demo-killers), fixed them, and added 41 automated checks that were run here (49 now run in total) plus 8 in-editor
tests that need Unity. Results:

| Result | Count | Questions |
|---|---|---|
| PASS | 8 | 13, 18, 26, 27, 28, 29, 30, 48 |
| FAIL | 6 | 10, 14, 37, 39, 47, 49 |
| NOT TESTED | 36 | all others |

A question is marked PASS only when the thing it asks about was exercised by a test or settled by
reading the real SDK source. Where the logic passes but the question is about what the wearer
sees or hears, it is NOT TESTED and the hardware procedure is given.

### How things were tested

| Label used below | Meaning |
|---|---|
| **backend test** | `backend/test/*.test.ts`, 17 tests. Real server, real WebSockets and HTTP. Claude, speech-to-text, text-to-speech and the headset are stand-in servers. No live API. |
| **headless** | `tools/headless-tests`, 32 checks. The real `RoomGeometry.cs`, `WorldModel.cs` and `AvatarFit.Math.cs` compiled outside Unity against a small stand-in for Unity's vector maths. |
| **editor test** | `packages/com.simulacra.core/Tests/Editor`, 8 tests using the real engine (NavMesh, renderers). **Written and compile-checked, not run**: they need a Unity editor. |
| **simulator** | Browser stand-in for the headset driven by Playwright against the real backend with the mock (keyword) brain. Exercises the protocol, not AI and not Unity. |
| **compile check** | Every C# method body bound against the real Meta SDK 85, XREAL SDK 3.1.0, AR Foundation 5.2 sources and the real Unity 6000.0.66f2 / 2022.3.62f2 assemblies: 0 errors on both targets. |
| **source read** | Behaviour confirmed by reading the vendor SDK source, not by running it. |

## Issues found and fixed in this pass

Ordered by how badly each would have hurt a live demo.

| # | Problem found | Consequence | Fix | Verified by |
|---|---|---|---|---|
| 1 | Any sound the speech service took for "speech started" cut the character's voice and aborted the reasoning call, and nothing restarted it | In a noisy hall the character goes silent mid-sentence and requests vanish | Nothing is cut until real words arrive; punctuation-only transcripts are ignored | backend test "noise does not cut the character off" |
| 2 | Avatar could spawn inside furniture, or on floor beyond a wall that is not connected to the user | Character appears in a table, or every walk fails with "no path" | Spawn search: in front of the user, on floor connected to them, with a clear line across the floor | editor test (not run) |
| 3 | No size check on the imported character | A model imported at the wrong scale appears 1.8 cm or 178 m tall | Body is measured at spawn; implausible height is rescaled to 1.72 m; `Avatar Height` can force a value; result shown on the HUD | headless + editor test (not run) |
| 4 | Feet were placed at NavMesh height and at the model's pivot | NavMesh is voxelised a few cm off the floor, and a hip-pivot model would be waist-deep | Soles are computed from the rendered bounds and pinned to the measured floor height every frame | headless (arithmetic) |
| 5 | Claude requests had the SDK's default 10-minute timeout | One hung request freezes the character | 20 s timeout, one retry | code read |
| 6 | A model that keeps retrying a failing action looped model calls | Runaway latency and cost, character repeats itself | After two consecutive failures of the same action within 30 s the backend refuses the third without touching the headset and tells the model to stop | backend test "cannot become a loop" |
| 7 | While muted (character speaking) the microphone stream stopped entirely | Speech-to-text needs continuous audio to detect end of speech; gaps can stall it | Stream never stops; it carries silence while muted. Also enables push-to-talk | code read |
| 8 | Walk cycle played at authored speed regardless of ground speed | Feet slide | `Speed` is normalised, playback rate follows real speed, `Walk Clip Speed` tunable on the headset | compile check only |
| 9 | XREAL: avatar spawned 1.8 m away | With a field of view of roughly 27° vertical only half the body is visible | XREAL scene spawns at 3.2 m | calculation (see Q3) |
| 10 | Reachability of every object re-checked at once every 3 s | Up to 36 path queries per object in one frame: periodic hitch | One object per half second | code read |
| 11 | Debug HUD text rebuilt every frame | Garbage every frame | 5 Hz | code read |
| 12 | Character never looked at the user | Stares straight ahead | Head and eyes follow the user, and glance at the object an action concerns (humanoids) | compile check only |
| 13 | Nothing tied the feet to the floor visually | Character looks pasted on | Soft contact shadow on displays that can darken the world (off on XREAL) | compile check only |
| 14 | No way to tell whether the camera frame sent for detection is upright | An upside-down frame would place every detected object wrongly | Last frame saved as `last_scan.jpg`; `Flip Scan Image` switch | compile check only |
| 15 | The model was not told how old or how certain a camera detection is | It may describe a stale detection as current | Age and confidence added to each detected object in the prompt | backend test |
| 16 | No audio listener guarantee | If a rig lacks one the voice is silent | Added at the head if missing | compile check only |
| 17 | No pre-flight check of keys and models | Wrong key discovered only when the first sentence fails on stage | `npm run doctor` | ran without keys: reports the problem and exits non-zero |

Also removed as unused or duplicated: idle-autonomy timer, `forget_object` action, the `save_skill`
tool (duplicate of `run_sequence` with `save_as`), and three configuration switches. See
`SIMPLIFICATION_AUDIT.md`.

Discovered and **not** fixed: depth occlusion cannot work with the packages currently installed
(Q10).

---

## The 50 questions

### A. Human avatar: scale, positioning, realism

| # | Question | Result | Evidence and what remains |
|---|---|---|---|
| 1 | Correct physical size | NOT TESTED | Fix 3. Scale arithmetic passes headless (1.8 cm, 178 m and 1.78 m inputs). On the real renderer it is an editor test, not run. **Hardware:** tape a mark on a wall at 1.72 m; walk the character beside it (`register_marker` "wall mark", then "go to the wall mark"); the top of the head should be within 3 cm. The HUD line `avatar height …` states what the app believes. |
| 2 | Feet on the floor | NOT TESTED | Fix 4. **Hardware:** crouch and look at the soles against a floor line or a sheet of paper on the floor; record the gap in mm on Quest and on XREAL. On XREAL repeat after 30 s (floor plane refines). |
| 3 | Believable spawn distance, inside the field of view | NOT TESTED | Quest: spawns 1.8 m ahead; a 1.72 m body spans about 51° of roughly 96° vertical, so it fits. XREAL: needs about 3.6 m to fit fully; set to 3.2 m (fix 9). Field-of-view figures are from published specifications as recalled, not measured. **Hardware:** on launch, is the whole body visible without moving the head? |
| 4 | Height and orientation hold when the user sits or stands | NOT TESTED | By design the body is a world-space object with no dependence on head height. Known exception: XREAL before any floor plane is found assumes the floor is 1.6 m below the head, so starting seated puts the character about 0.4 m too low until the floor is detected. **Hardware:** sit, stand, crouch; the feet must not move. |
| 5 | Natural initial position and facing | NOT TESTED | Fix 2; the avatar is turned to face the user when placed and re-faces them when idle. Editor test covers "not in furniture, not behind the user, not across a wall" but was not run. **Hardware:** launch three times facing a table, a wall 1 m away, and open floor. |

### B. Spatial anchoring and coordinates

| # | Question | Result | Evidence and what remains |
|---|---|---|---|
| 6 | Stays put when the user walks around | NOT TESTED | Quest: MR Utility Kit's world lock is on by default and re-solves the tracking space against room anchors every frame (source read). XREAL: no anchor is used; position depends on the glasses' tracking alone. **Hardware:** put tape on the floor at the character's feet, walk a 3 m loop, measure offset. |
| 7 | Drift, jitter, sliding | NOT TESTED | Nothing in the app moves the idle avatar except ground pinning and turning to face the user. **Hardware:** stand still 60 s, then shake the head; film through the lens. Expect more drift on XREAL. |
| 8 | Coordinate systems aligned | NOT TESTED | One world space is used everywhere (Unity world, metres, y up); anchors, planes, detections, NavMesh and avatar are never converted between frames except at two boundaries: room anchor → upright box (headless: floor, wall, rotated furniture, tilted volume all correct) and image point → world ray (SDK call; orientation unverified, fix 14). Backend direction words follow Unity's handedness (backend test). **Hardware:** the scan test in Q17 is the check for the image boundary. |
| 9 | Tracking loss, recentre, relocalisation | NOT TESTED | Quest: world lock should absorb a recentre (source read; behaviour on recentre is inferred, the SDK text does not mention it). XREAL: **not handled**; after a recentre the planes move and the avatar does not. **Hardware:** hold the Meta button to recentre; cover the cameras 5 s; record where the character ends up. |
| 10 | Real furniture occludes the character | **FAIL** | Not implemented. The character is drawn over everything. Depth occlusion needs the `com.unity.xr.meta-openxr` (≥ 2.1) or `com.unity.xr.oculus` (≥ 4.2) package, which this project does not have: `EnvironmentDepthManager` returns "not supported" without one (source read). Not added blind because it changes the project's XR provider setup. Steps are under "Three highest-priority fixes". Impossible on XREAL's optical display in the same way; would need its depth mesh. |

### C. Room mapping and depth

| # | Question | Result | Evidence and what remains |
|---|---|---|---|
| 11 | Floor detected, with elevation | NOT TESTED | Quest: floor anchor from Space Setup; its height is used, not assumed zero. XREAL: lowest large upward plane at least 0.6 m below the head. Reduction to geometry passes headless. **Hardware:** HUD shows `room=room_scan` / `plane_detection`, never `fallback_…`. |
| 12 | Walls, tables, chairs become obstacles | NOT TESTED | Quest: walls and every furniture volume in the Space Setup scan. **Chairs are usually not in that scan**, so the character will walk through a real chair unless it was added as a volume. XREAL: vertical planes and raised horizontal planes only; chair legs and clutter are invisible to it. |
| 13 | Real sensor data, not canned geometry | PASS | Code read: the Quest scene loads the device's own room scan; XREAL uses live plane detection. Simulated geometry exists only in the editor/browser simulators and is labelled `simulated` to the AI. Both fallbacks are labelled (`fallback_open_floor`, `fallback_assumed_floor`) and shown on the HUD. Caveat: on Quest the room is the scan the user made earlier, not live depth meshing. |
| 14 | Map updates when the room changes | **FAIL** | Quest: geometry is read once at load; a moved chair or a person stepping in is not seen. XREAL: planes are re-read every second and the NavMesh rebuilt with a walk in progress replanned, but only for planes, and untested. |
| 15 | Missing or noisy depth | NOT TESTED | Depth is used only to place detected or pointed-at objects. If the depth ray fails the simplified room geometry is used instead (headless), else the object is reported "seen but not located". Navigation does not depend on depth. |

### D. Object recognition and tracking

| # | Question | Result | Evidence and what remains |
|---|---|---|---|
| 16 | Camera recognises real objects | NOT TESTED | Quest only: one camera frame on request → cloud vision model → labelled points. Needs a headset, the camera permission and an OpenAI key; never run. XREAL Air 2 Ultra: not available. **Hardware:** look at a chair and a bottle, say "look around and tell me what you see", then pull `last_scan.jpg` and check it is upright. |
| 17 | Detections get real 3D positions | NOT TESTED | Method: ray through the image point using the camera pose captured with the frame, intersected with the Depth API. This is the same method Meta's Spatial Lingo sample uses. Depth raycasting works with the installed packages (source read: it uses the OVRPlugin provider). Risk: the depth ray only works inside the current view, so turn away during the 2–5 s wait and it falls back to room geometry. **Hardware:** scan one object on open floor, then "go to the …"; measure where the character stops. |
| 18 | Detected vs registered vs room-scan vs simulated are distinguished | PASS | headless: a camera sighting never changes the origin or position of a user-registered object. backend test: each object reaches the model with its origin in words, and the prompt forbids calling non-camera objects "seen". |
| 19 | Stable identity and position over time | NOT TESTED | headless: re-sighting within 0.75 m keeps the id and refines the position; a same-label object 3 m away gets a new id. Limits: objects never expire, and the same object labelled differently by the vision model ("armchair" vs "chair") becomes two. Behaviour as the user moves is a hardware question. |
| 20 | "What is that?" answered from observations | NOT TESTED | backend test: the prompt contains the object the user is looking toward and only known objects, no coordinates. Whether live Claude sticks to it has not been run. **Test:** in the simulator with real keys ask about something not in the room. |

### E. Navigation and movement

| # | Question | Result | Evidence and what remains |
|---|---|---|---|
| 21 | Walks to a valid destination | NOT TESTED | simulator: approach and walk-to-chair complete (straight-line walker, not Unity). Unity NavMesh path: editor test, not run. |
| 22 | Routes around furniture | NOT TESTED | Editor test "path goes around furniture" (table between start and goal) written, not run. And see Q12: only scanned furniture exists for the planner. |
| 23 | Walk animation matches motion | NOT TESTED | Fix 8. **Hardware:** watch the feet against a floor pattern; adjust `Walk Clip Speed` until they stop slipping; record the value. |
| 24 | Follows the user | NOT TESTED | Implemented on the headset (re-paths every 0.4 s when the user is more than about 0.6 m beyond the follow distance, turns to face when standing). Never run in Unity. |
| 25 | Unreachable, blocked or unmapped targets | NOT TESTED | backend tests: unknown target refused before reaching the headset; a headset failure is spoken, not hidden; repeated failure is cut off. Headset side (no standing point, no complete path, stuck for 2.5 s, timeout) is in the code and in an editor test, not run. |

### F. AI decisions and memory

All of F was tested with a stand-in for Claude that returns scripted tool calls. This proves what
the system does with Claude's output. It says nothing about how well live Claude chooses.

| # | Question | Result | Evidence and what remains |
|---|---|---|---|
| 26 | Claude gets current, accurate world state | PASS | backend test: every request carries the avatar state and distance, what the user looks toward, each object with origin and distances; after the headset sent a changed world the next request reflects it. |
| 27 | Valid actions only, arguments checked | PASS | backend test: wrong enum value, missing field, wrong type, unknown skill with raw coordinates and malformed JSON are each rejected with an error result and produce no device action. |
| 28 | Multi-step task without a call per step | PASS | backend test: "walk to the chair, look at it, come back" = 1 model call, 3 device actions in order, 1 call when all are done. |
| 29 | Skill memory saves and reuses behaviour | PASS | Same test: the sequence is written to `memory.json` with a placeholder target (not chat history), shown to the model on later turns with its success count, and replayed on the table with one call. |
| 30 | Failure does not loop model calls | PASS | backend test with a model that retries forever: the headset is asked twice, the third attempt is refused locally, total calls stay ≤ 8 and then stop. |

### G. Voice

| # | Question | Result | Evidence and what remains |
|---|---|---|---|
| 31 | Microphone works in a noisy room | NOT TESTED | Fixes 1 and 7 remove the two failure modes found by reading; push-to-talk added for loud rooms. Capture quality itself needs the headset. **Hardware:** play crowd noise at conversation volume; give 10 commands; count misses, with and without push-to-talk. |
| 32 | Natural replies reach the speakers | NOT TESTED | Never run with live models or a headset. |
| 33 | Interrupt while speaking or moving | NOT TESTED | backend test: "Stop!" reaches the headset in under 100 ms, before the model answers, and cancels the rest of a sequence. simulator: body idle 77 ms after the click. Headset: A button or the talk trigger cuts speech locally. Unity side not run. |
| 34 | Mouth and speaking state follow the voice | NOT TESTED | Loudness-driven mouth plus a talk clip; no visemes. Mixamo characters have no mouth blendshapes, so on them only the talk clip and head motion show. |
| 35 | Measured latencies | NOT TESTED | No live measurement exists. Measured without any model: input → action sent 1 ms; → body started 10–18 ms; stop 77 ms; path planning in the browser stand-in 0.1 ms. Expected dominant stages, unmeasured: speech-to-text after end of speech, Claude's time to its first tool call (the default model always thinks first), first text-to-speech audio. **To measure:** `npm run bench` (typed input, live Claude), then five spoken commands on the headset and read `/metrics`. |

### H. Animation and presence

| # | Question | Result | Evidence and what remains |
|---|---|---|---|
| 36 | Smooth transitions | NOT TESTED | Blend tree idle↔walk, 0.15–0.3 s cross-fades, gestures layered procedurally. Needs eyes on it. |
| 37 | Face: expressions, blinking, eyes | **FAIL** | No facial expressions exist. Blinking works only on a model with a blink blendshape, which a Mixamo character lacks. Eye direction: humanoid look-at only. |
| 38 | Looks at the user or the relevant object | NOT TESTED | Fix 12; needs a humanoid with the generated controller (re-run *Simulacra > 3. Setup Avatar* to enable its IK pass). |
| 39 | Lighting, shadows, materials, occlusion | **FAIL** | One fixed directional light and flat ambient, no estimate of room lighting, no occlusion (Q10), placeholder body unless a model is imported. Contact shadow added (fix 13), unseen. |
| 40 | Stereo depth and comfort | NOT TESTED | Standard shaders only; nothing custom that could render to one eye. **Hardware:** close each eye in turn at the HUD and the character. |

### I. Performance and recovery

| # | Question | Result | Evidence and what remains |
|---|---|---|---|
| 41 | Frame rate with everything running | NOT TESTED | No profiling possible. Fixes 10 and 11 removed two per-frame costs. **Hardware:** OVR Metrics Tool on Quest; note FPS idle, walking, during a scan. |
| 42 | Memory, CPU/GPU, heat, battery | NOT TESTED | Same. A high-polygon avatar is the likely risk. |
| 43 | Network drop, backend loss, API timeout | NOT TESTED | backend test: a model outage is reported to the HUD and the next request works with the failed one still in context; a headset dropping mid-walk and reconnecting gets a working session. Headset reconnect loop (retry every 1.5 s) is not run. After a reconnect the conversation starts fresh. |
| 44 | Permissions, credentials, configuration errors | NOT TESTED | `npm run doctor` (run here without keys: reports and exits 1). HUD shows the socket error, `mic=OFF`, `vision=no`, room fallback and backend errors. Permission prompts need the headset. |
| 45 | Ten minutes without leaks or stale state | NOT TESTED | backend test: 300 turns, conversation sent to the model stays ≤ 42 messages, heap growth under the limit, last request carries the latest world. Headset side not run. |

### J. Hardware and the demo

| # | Question | Result | Evidence and what remains |
|---|---|---|---|
| 46 | Quest 3S builds, deploys, runs | NOT TESTED | compile check: 0 errors against the real SDK. No build has been made. |
| 47 | XREAL Air 2 Ultra works, incl. depth meshing and anchors | **FAIL** | compile check passes, never run. Marked FAIL because two things the question names are not used at all: the app reads planes only, not the depth mesh, and uses no spatial anchors. |
| 48 | Features adapted to each headset's limits | PASS | Code read and backend test: XREAL declares no camera, so `scan_surroundings` is refused with an explanation and the AI is told to use pointing; no shadow is drawn on its additive display; spawn distance suits its field of view. Nothing unsupported is reported as working. |
| 49 | New user completes the demo with no developer help | **FAIL** | Today it needs: a laptop running the backend on a reachable network, two API keys, Space Setup done on the Quest, the HUD hidden, and (without a camera scan) the chair introduced by pointing. No coordinates are edited by hand and no response is scripted. |
| 50 | Does it feel like an intelligent human is present? | NOT TESTED | Cannot be claimed. See below. |

---

## Three highest-priority remaining fixes

| Priority | Weakness | Why it matters | Fix | Time |
|---|---|---|---|---|
| 1 | **No rigged human, and it has never been seen in a headset** | Everything in sections A, E, G, H and I is unverified until someone looks | Import a humanoid (README "Avatar"), build to the Quest, run the hardware checklist below, fix what it shows | 2–3 h |
| 2 | **Furniture does not occlude the character** | The single cue that most breaks presence: the body shows through tables and walls | In `unity-quest`: add `com.unity.xr.meta-openxr` 2.1+, enable its Occlusion feature and run Meta's Project Setup Tool "Fix All"; add an `EnvironmentDepthManager`; switch the avatar's materials to `Meta/EnvironmentDepth/Built-in Render Pipeline/OcclusionSurfaceLit` (ships in the SDK; keeps colour and texture, drops normal maps). Keep a build without it as fallback | 1–2 h, needs the headset |
| 3 | **Voice latency and robustness are unmeasured** | A two-second pause before every reply kills the illusion more than any visual flaw | `npm run bench` on `claude-opus-5-5` and `claude-haiku-5-5`; five spoken commands on the headset; if speech-to-action is over about 1.5 s switch `PLANNER_MODEL` or `BRAIN=realtime`; decide on push-to-talk for the venue | 30 min |

Next after those: the room only contains what Space Setup captured, so add the demo chair as a
furniture volume in Space Setup, which makes it both an obstacle and a known object.

## Readiness

| | Quest 3S | XREAL Air 2 Ultra |
|---|---|---|
| Compiles against the real SDK | yes | yes |
| Built and run on device | no | no |
| Room source | Space Setup scan (static) | live planes (grows) |
| Object source | room-scan furniture, pointing, camera scan (untested) | pointing only |
| Occlusion | not implemented | not possible the same way |
| Anchoring | SDK world lock | none |
| Verdict | the demo target; needs the first hardware run | keep as a second target; do not demo before Quest works |

Snap Spectacles: no client exists. Future work.

## Hardware checklist

Do this in order on the Quest, then repeat the starred rows on XREAL. Write the number down, not
"looks fine".

| Step | Do | Record |
|---|---|---|
| 0 | `npm run doctor`, `npm start`, `adb reverse tcp:8787 tcp:8787`, launch | HUD line 1 says `ready brain=claude`; line 3 room, navmesh, objects, vision |
| 1★ | Read the HUD line `avatar height` | metres |
| 2★ | Wall mark at 1.72 m; send the character next to it | head-to-mark gap, cm |
| 3★ | Crouch, look at the soles on a sheet of paper | gap or sink, mm |
| 4★ | Tape at the feet; walk a 3 m loop and return | offset, cm |
| 5★ | Stand 60 s; shake head | visible drift or jitter, yes/no, cm |
| 6 | Recentre (hold Meta button) | where the character is afterwards |
| 7★ | "Hey, come over here." five times from different spots | arrivals out of 5; final distance; HUD latency line each time |
| 8 | Put a scanned table between you; "come over here" | walks around / through |
| 9 | Look at a chair on open floor; "look around, what do you see?" then pull `last_scan.jpg` | upright? listed objects; `seen_but_not_located` count |
| 10 | "Go to the chair." | stop distance from the real chair, cm |
| 11★ | Point at a chair; "this is a chair"; "go check it out" | stop distance, cm |
| 12★ | "Follow me"; walk 5 m with two turns; "stop" | keeps about 1.2 m? stops within 1 s? |
| 13★ | Ask for something behind a wall or outside the room | spoken refusal, no movement |
| 14★ | Interrupt mid-sentence with A, and by speaking | time until silence |
| 15★ | Play crowd noise; 10 commands; repeat with push-to-talk | misses out of 10, each way |
| 16★ | Feet against a floor pattern while walking | slide yes/no; final `Walk Clip Speed` |
| 17 | OVR Metrics Tool: idle, walking, during a scan | FPS, CPU/GPU level |
| 18★ | Ten minutes of mixed use | crashes, stalls, memory at start and end, battery % used |
| 19★ | Turn the laptop's Wi-Fi off for 10 s and on | HUD shows disconnect then `ready`; works again without restart |
| 20★ | Close each eye in turn | anything visible in one eye only |

Also run the editor tests once: open `unity-quest`, *Window > General > Test Runner > EditMode >
Run All*. Eight tests; the planning-time test logs milliseconds per path query.

## Phase 4 run: the ten-step interaction

Run in the **browser simulator with the mock brain**. This exercises the protocol, dispatcher,
feedback and timing. It is **not** AI (keyword rules), **not** Unity navigation (straight-line
walker) and the chair is a **simulated** object, not a detection.

| Step | Result |
|---|---|
| 1 Spawn | avatar 2.40 m from the user, idle |
| 2–3 Approach | "Of course." then arrived 1.22 m from the user in 1.5 s |
| 4–5 Look toward the chair, ask | resolved to `chair_1` from gaze, answered in 82 ms |
| 6–7 Walk to the chair | stopped 0.73 m from its centre in 3.2 s |
| 8 Observation | completion message only (the mock brain cannot observe) |
| 9–10 "Come back", then "Stop!" mid-walk | body idle 77 ms after the command, 6 cm further on |

Latency in that run: action sent 1 ms after input, body started 10–14 ms, 0 model calls.

The same interaction with live Claude and with the headset has not been run.

## Reproducing the 45-second demo

One-time setup:

1. `cd backend && npm install && cp .env.example .env`, add both keys, `npm run doctor`.
2. Import a humanoid into `unity-quest/Assets/Simulacra/Avatar/` and run *Simulacra > 3. Setup Avatar*.
3. Quest: Settings > Environment setup > Space Setup. Add the demo chair as a furniture volume.
4. *Simulacra > 1. Create Quest Scene*, set the backend URL, Build And Run, accept the three prompts.

Each run:

1. `npm start`; USB: `adb reverse tcp:8787 tcp:8787`.
2. Launch the app facing open floor. Wait for HUD `ready`, `room=room_scan`, `navmesh=yes`. Press **B** to hide the HUD.
3. "Hey, can you come over here?" The character answers and walks to you.
4. Look at the chair. If it is not known yet, point the right controller at it and say "this is a chair".
   That makes it a **user-registered** object; say so if asked. For a camera detection instead say
   "look around and tell me what you see" (untested path).
5. "What do you see over there?"
6. "Yeah, go check it out." It walks to the chair and remarks on it.
7. "Come back." or "Stop."

Before the event, record a backup take with the Quest's built-in capture.
