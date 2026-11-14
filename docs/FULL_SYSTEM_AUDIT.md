# Full-system QA audit

Scope: the whole experience, judged from the point of view of a first-time wearer. Audited at the
state of branch `qa-audit`.

## Bottom line

**Nobody has yet seen this character through a headset.** No Quest or XREAL device, no Unity editor
licence and no Claude/OpenAI credentials were available where this work was done. The honest answer
to "can someone wear the headset and feel a life-sized intelligent human is present" is still
**not tested**.

**Demo readiness: partially ready.** Everything the 45-second script needs is implemented and
passes every check that can be run without hardware, and a realistic rigged human now ships in the
repository. It is not "ready" because the first build, the first headset run and the first live
model call have not happened.

| Result | After the first audit | Now | Questions now |
|---|---|---|---|
| PASS | 8 | 8 | 13, 18, 26, 27, 28, 29, 30, 48 |
| FAIL | 6 | 0 | – |
| NOT TESTED | 36 | 42 | all others |

**Read the zero carefully.** The six former failures (10, 14, 37, 39, 47, 49) were "not
implemented". They are now implemented and compile against the real SDKs, which moves them to NOT
TESTED, not to PASS. Nothing was promoted to PASS in this sprint, because nothing new could be
observed.

A question is marked PASS only when the thing it asks about was exercised by a test or settled by
reading the real SDK source. Where the logic passes but the question is about what the wearer
sees or hears, it is NOT TESTED and the hardware procedure is given.

### How things were tested

| Label used below | Meaning |
|---|---|
| **backend test** | `backend/test/*.test.ts`, 17 tests. Real server, real WebSockets and HTTP. Claude, speech-to-text, text-to-speech and the headset are stand-in servers. No live API. |
| **headless** | `tools/headless-tests`, 34 checks. The real `RoomGeometry.cs`, `WorldModel.cs` and `AvatarFit.Math.cs` compiled outside Unity against a small stand-in for Unity's vector maths. |
| **editor test** | `packages/com.simulacra.core/Tests/Editor`, 10 tests using the real engine (NavMesh, renderers). **Written and compile-checked, not run**: they need a Unity editor. |
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

## Second pass (engineering sprint): the six failures and what else turned up

| # | Was | Change | Verified by |
|---|---|---|---|
| S1 | Q10 no occlusion | Added `com.unity.xr.meta-openxr` 2.2.0 (the version Meta's own setup check asks for and its Phanto sample uses). At spawn the avatar's opaque Standard materials switch to the SDK's occlusion shader, with soft occlusion. If depth is unsupported or the shader is missing, nothing is changed and the HUD says why. Scene creation forces the shader into the build | compile check; source read |
| S2 | Q14 static room on Quest | (a) Room-scan update events from the SDK rebuild navigation. (b) Live sensing: while walking, two short depth rays look ahead; a real surface seen twice that the scan does not explain becomes a temporary obstacle and the walk replans, with no model call | compile check; editor test for the replan (not run) |
| S3 | Q37 no face | A realistic adult with 175 facial blendshapes is bundled (Microsoft Rocketbox, MIT). Mouth uses its jaw-open shape, eyes blink with one matched pair, a slight smile at rest and more while speaking, head and neck follow the user | compile check; blendshape names read from the FBX |
| S4 | Q39 flat visuals | Lighting follows the measured brightness of the room (passthrough camera); occlusion (S1); contact shadow (earlier); the body is never frozen: breathing and weight shift when standing | compile check |
| S5 | Q47 XREAL planes only | Spatial anchor on the floor: when tracking corrects itself the avatar, registered objects and obstacles move with the room. Depth mesh can feed navigation as blockers (off by default until seen on the glasses: a noisy mesh can block real floor) | compile check against XREAL SDK 3.1.0 / AR Foundation 5.2 |
| S6 | Q49 setup steps | Character ships in the repo and is prepared automatically when the scene is created; no animation files needed; HUD hides itself when healthy and returns if the backend drops; the backend opens the USB tunnel itself and keeps retrying; objects you register by pointing are remembered per room across launches | compile check; backend run |

New defects found during the sprint and fixed:

| # | Problem | Consequence | Fix | Verified by |
|---|---|---|---|---|
| 18 | Room-scan objects were deleted and recreated on every room refresh | `table_1` silently became `table_2`, `table_3`…; an id the AI had just used stopped resolving. Constant on XREAL, and on Quest whenever an obstacle is sensed | Seeds are reconciled in place; ids are stable | headless test |
| 19 | A character without separately downloaded clips had no animation | It would glide across the floor in its bind pose | Procedural walk, idle and gaze from the skeleton; stride length is derived from distance travelled, so feet cannot slide | compile check; gait arithmetic checked by hand |
| 20 | Body-bone lookup required Unity's Humanoid mapping | The bundled character's rig (3ds Max Biped, A-pose, unusual parenting) may not auto-map; then no head, gestures or gaze | Bones are found by Humanoid mapping or by name (Biped, Mixamo, generic) | compile check |
| 21 | Blink drove every blendshape whose name contained "blink" | On a face with several blink sets the eyes close three times over | Exactly one set is chosen | compile check |
| 22 | Mouth blendshape and jaw bone were both driven | Mouth opens twice as far as intended | Jaw bone only when there is no mouth shape | compile check |
| 23 | Noticing a new object triggered a model call | The character could start talking unprompted every time something was detected | Object notices ride along with the next turn; only the user walking away triggers a reaction | backend test |
| 24 | Idle sway was applied to the lower spine | On Biped rigs the thighs hang off the spine, so idle sway would drag the feet | Sway moved to the chest | code read |

Not used, by decision: the bundled character's own animation files. They have no in-place walk
(the root travels 1.46 m per cycle), no mesh, and a different node hierarchy; the procedural gait
avoids all three problems.

---

## The 50 questions

### A. Human avatar: scale, positioning, realism

| # | Question | Result | Evidence and what remains |
|---|---|---|---|
| 1 | Correct physical size | NOT TESTED | Fix 3. Scale arithmetic passes headless (1.8 cm, 178 m and 1.78 m inputs). On the real renderer it is an editor test, not run. **Hardware:** tape a mark on a wall at 1.72 m; walk the character beside it (`register_marker` "wall mark", then "go to the wall mark"); the top of the head should be within 3 cm. The HUD line `avatar height …` states what the app believes. |
| 2 | Feet on the floor | NOT TESTED | Fix 4. **Hardware:** crouch and look at the soles against a floor line or a sheet of paper on the floor; record the gap in mm on Quest and on XREAL. On XREAL repeat after 30 s (floor plane refines). |
| 3 | Believable spawn distance, inside the field of view | NOT TESTED | Quest: spawns 1.8 m ahead; a 1.75 m body spans about 51° of roughly 96° vertical, so it fits. XREAL: needs about 3.6 m to fit fully; set to 3.2 m. Field-of-view figures are from published specifications as recalled, not measured. **Hardware:** on launch, is the whole body visible without moving the head? |
| 4 | Height and orientation hold when the user sits or stands | NOT TESTED | By design the body is a world-space object with no dependence on head height. Known exception: XREAL before any floor plane is found assumes the floor is 1.6 m below the head, so starting seated puts the character about 0.4 m too low until the floor is detected. **Hardware:** sit, stand, crouch; the feet must not move. |
| 5 | Natural initial position and facing | NOT TESTED | Fix 2; the avatar is turned to face the user when placed and re-faces them when idle. Editor test covers "not in furniture, not behind the user, not across a wall" but was not run. **Hardware:** launch three times facing a table, a wall 1 m away, and open floor. |

### B. Spatial anchoring and coordinates

| # | Question | Result | Evidence and what remains |
|---|---|---|---|
| 6 | Stays put when the user walks around | NOT TESTED | Quest: MR Utility Kit's world lock is on by default and re-solves the tracking space against room anchors every frame (source read). XREAL: no anchor is used; position depends on the glasses' tracking alone. **Hardware:** put tape on the floor at the character's feet, walk a 3 m loop, measure offset. |
| 7 | Drift, jitter, sliding | NOT TESTED | Nothing in the app moves the idle avatar except ground pinning and turning to face the user. **Hardware:** stand still 60 s, then shake the head; film through the lens. Expect more drift on XREAL. |
| 8 | Coordinate systems aligned | NOT TESTED | One world space is used everywhere (Unity world, metres, y up); anchors, planes, detections, NavMesh and avatar are never converted between frames except at two boundaries: room anchor → upright box (headless: floor, wall, rotated furniture, tilted volume all correct) and image point → world ray (SDK call; orientation unverified, fix 14). Backend direction words follow Unity's handedness (backend test). **Hardware:** the scan test in Q17 is the check for the image boundary. |
| 9 | Tracking loss, recentre, relocalisation | NOT TESTED | Quest: world lock should absorb a recentre (source read; behaviour on recentre is inferred, the SDK text does not mention it). XREAL: **not handled**; after a recentre the planes move and the avatar does not. **Hardware:** hold the Meta button to recentre; cover the cameras 5 s; record where the character ends up. |
| 10 | Real furniture occludes the character | NOT TESTED | S1. Implemented with the SDK's depth occlusion; never seen. It needs, on first open of `unity-quest`: the new package to resolve, then Meta's *Project Setup Tool > Fix All* (it enables the Occlusion and Session OpenXR features, Vulkan and Multiview). **Hardware:** HUD must read `occlusion=on (N materials)`; stand so a table is between you and the character: legs must be hidden. If the avatar turns pink or vanishes, set **Depth Occlusion** off on the `Simulacra` object. Hair and lashes are not occluded (cut-out material). Not possible on XREAL's optical display. |

### C. Room mapping and depth

| # | Question | Result | Evidence and what remains |
|---|---|---|---|
| 11 | Floor detected, with elevation | NOT TESTED | Quest: floor anchor from Space Setup; its height is used, not assumed zero. XREAL: lowest large upward plane at least 0.6 m below the head. Reduction to geometry passes headless. **Hardware:** HUD shows `room=room_scan` / `plane_detection`, never `fallback_…`. |
| 12 | Walls, tables, chairs become obstacles | NOT TESTED | Quest: walls and every furniture volume in the Space Setup scan. **Chairs are usually not in that scan**, so the character will walk through a real chair unless it was added as a volume. XREAL: vertical planes and raised horizontal planes only; chair legs and clutter are invisible to it. |
| 13 | Real sensor data, not canned geometry | PASS | Code read: the Quest scene loads the device's own room scan; XREAL uses live plane detection. Simulated geometry exists only in the editor/browser simulators and is labelled `simulated` to the AI. Both fallbacks are labelled (`fallback_open_floor`, `fallback_assumed_floor`) and shown on the HUD. Caveat: on Quest the room is the scan the user made earlier, not live depth meshing. |
| 14 | Map updates when the room changes | NOT TESTED | S2. Quest: scan updates and live depth sensing while walking. Limits: sensing only sees what is inside the headset's current view, only ahead of the walking body, and forgets after 45 s. XREAL: planes re-read every second (and optionally the depth mesh). **Hardware:** send the character across open floor, then put a chair in its path and send it again; record whether it goes around. A false stop is as important to record as a collision. Disable with `"dynamicObstacles": false` in `simulacra.json`. |
| 15 | Missing or noisy depth | NOT TESTED | Depth is used only to place detected or pointed-at objects. If the depth ray fails the simplified room geometry is used instead (headless), else the object is reported "seen but not located". Navigation does not depend on depth. |

### D. Object recognition and tracking

| # | Question | Result | Evidence and what remains |
|---|---|---|---|
| 16 | Camera recognises real objects | NOT TESTED | Quest only: a camera frame → cloud vision model → labelled points; on request, and now also quietly in the background (at most every 20 s, only when you look somewhere new). **This sends room images to the vision provider without being asked**; set `"autoScanSeconds": 0` to stop it. Never run. XREAL Air 2 Ultra: not available. **Hardware:** look at a chair and a bottle for 30 s, then ask "what do you see?"; pull `last_scan.jpg` and check it is upright. |
| 17 | Detections get real 3D positions | NOT TESTED | Method: ray through the image point using the camera pose captured with the frame, intersected with the Depth API. This is the same method Meta's Spatial Lingo sample uses. Depth raycasting works with the installed packages (source read: it uses the OVRPlugin provider). Risk: the depth ray only works inside the current view, so turn away during the 2–5 s wait and it falls back to room geometry. **Hardware:** scan one object on open floor, then "go to the …"; measure where the character stops. |
| 18 | Detected vs registered vs room-scan vs simulated are distinguished | PASS | headless: a camera sighting never changes the origin or position of a user-registered object. backend test: each object reaches the model with its origin in words, and the prompt forbids calling non-camera objects "seen". |
| 19 | Stable identity and position over time | NOT TESTED | headless: re-sighting within 0.75 m keeps the id and refines the position; a same-label object 3 m away gets a new id; refreshing the room keeps room-scan ids (defect 18); registered objects are restored per room across launches (editor test, not run). Limits: detections never expire, and the same object labelled differently ("armchair" vs "chair") becomes two. |
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
| 34 | Mouth and speaking state follow the voice | NOT TESTED | Loudness drives the bundled character's jaw-open blendshape; a slight smile grows while speaking; no visemes (it has 15, unused). **Hardware:** watch the mouth during a long sentence; note lag between sound and movement. |
| 35 | Measured latencies | NOT TESTED | No live measurement exists. Measured without any model: input → action sent 1 ms; → body started 10–18 ms; stop 77 ms; path planning in the browser stand-in 0.1 ms. Expected dominant stages, unmeasured: speech-to-text after end of speech, Claude's time to its first tool call (the default model always thinks first), first text-to-speech audio. **To measure:** `npm run bench` (typed input, live Claude), then five spoken commands on the headset and read `/metrics`. |

### H. Animation and presence

| # | Question | Result | Evidence and what remains |
|---|---|---|---|
| 36 | Smooth transitions | NOT TESTED | With the bundled character all motion is procedural: walk blends in and out over about 0.25 s, gestures layer on top. It will read as stylised rather than motion-captured. With your own clips: blend tree and cross-fades. Needs eyes on it. |
| 37 | Face: expressions, blinking, eyes | NOT TESTED | S3. Blink every 2–5 s, resting and speaking smile, head and neck gaze. No emotional expressions beyond that, and the eyeballs themselves do not move. **Hardware:** stand 1 m away for 30 s: does it blink, does it hold your gaze as you step sideways? |
| 38 | Looks at the user or the relevant object | NOT TESTED | Head and neck turn toward the user, and toward the object an action concerns for about 4 s. Body re-faces the user when idle. |
| 39 | Lighting, shadows, materials, occlusion | NOT TESTED | S4. Brightness matching needs the camera permission; light direction is still a fixed guess. Materials are rebuilt from the character's textures (albedo + normal); the occlusion shader drops the normal map. **Hardware:** compare the character's brightness with your own hand in a bright and a dim room. |
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
| 47 | XREAL Air 2 Ultra works, incl. depth meshing and anchors | NOT TESTED | S5. Anchor: on by default; HUD shows `anchor=tracking`. Depth mesh: implemented, **off** by default (tick **Use Depth Mesh** on the `Simulacra` object to try it). Never run. |
| 48 | Features adapted to each headset's limits | PASS | Code read and backend test: XREAL declares no camera, so `scan_surroundings` is refused with an explanation and the AI is told to use pointing; no shadow is drawn on its additive display; spawn distance suits its field of view. Nothing unsupported is reported as working. |
| 49 | New user completes the demo with no developer help | NOT TESTED | S6. During the demo nothing needs a developer: no HUD to hide, no coordinates, no scripted replies, the chair is remembered. Before it, once: two API keys, Space Setup on the Quest, build and install, register the chair by pointing. Each session: `npm start` on a laptop and the headset on USB or the same network. Unproven until someone does it. |
| 50 | Does it feel like an intelligent human is present? | NOT TESTED | Cannot be claimed. See below. |

---

## Three highest-priority remaining tasks

| Priority | Task | Why | Time |
|---|---|---|---|
| 1 | **Open `unity-quest`, create the scene, build to the Quest, run checklist steps 0–8d** | Everything in A, E, G, H and I is unverified until someone looks. This is also the first test of the new XR package, the bundled character's import and the occlusion shader | 1–2 h |
| 2 | **Measure the voice path** with real keys: `npm run doctor`, `npm run bench`, five spoken commands, read `/metrics` | A long pause before each reply breaks the illusion more than any visual flaw; the model and brain choice depends on these numbers | 30 min |
| 3 | **Rehearse the 45-second script ten times in the demo room** and record every miss | Finds the failures that only repetition shows: tracking loss, a noisy hall, a mis-registered chair | 1 h |

## New blockers and risks introduced or found in the sprint

| Risk | What happens if it goes wrong | Way out |
|---|---|---|
| `com.unity.xr.meta-openxr` 2.2.0 was added to the Quest project without an editor to open it | Package resolution or compile errors on first open | Delete that one line from `unity-quest/Packages/manifest.json`; occlusion then reports itself off and everything else is unaffected |
| Bundled character's import is unverified (materials, skeleton names, scale) | Wrong look, or a static body | The avatar setup dialog reports "Skeleton recognised: yes/no", blendshape and material counts; the HUD shows the height. Any other rigged FBX can be dropped into `Assets/Simulacra/Avatar/` instead |
| Procedural gait has never been seen | May look robotic or have a sign error on an unusual rig | `Swing Degrees` on the avatar; or supply real clips, which take over automatically |
| Live obstacle sensing could misread depth noise | Needless detour or a "path blocked" stop | `"dynamicObstacles": false` |
| Background scans send room images to the vision provider | Privacy and cost you did not ask for | `"autoScanSeconds": 0` |
| Unity will generate `.meta` files for the bundled character on first import | Uncommitted files in the shared package | Commit them once |

## Readiness

| | Quest 3S | XREAL Air 2 Ultra |
|---|---|---|
| Compiles against the real SDK | yes | yes |
| Built and run on device | no | no |
| Room source | Space Setup scan + live depth sensing while walking | live planes (+ optional depth mesh) |
| Object source | room-scan furniture, pointing (remembered), camera scan (untested) | pointing only |
| Occlusion | implemented, untested | not possible the same way |
| Anchoring | SDK world lock | spatial anchor, untested |
| Character | bundled, procedural animation, untested | same |
| Verdict | the demo target; partially ready | second target; do not demo before Quest works |

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
| 8 | Put a scanned table between you; "come over here" | walks around / through; are its legs hidden behind the table (HUD `occlusion=on`)? |
| 8b | Send it across open floor; then stand a chair in the way and send it again | goes around / through / stops; any false stop on clear floor |
| 8c | Stand 1 m in front of it for 30 s; step sideways | blinks? head follows? mouth moves with speech? |
| 8d | Register a chair by pointing; quit; relaunch | chair still known and in the right place (cm off) |
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
Run All*. Ten tests; the planning-time test logs milliseconds per path query.

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
2. Quest: Settings > Environment setup > Space Setup for the demo room.
3. Open `unity-quest` in Unity 6000.0.66f2, switch platform to Android, run Meta's *Project Setup
   Tool > Fix All*, then *Simulacra > 1. Create Quest Scene* (this also prepares the bundled
   character). Build And Run; accept the three permission prompts.
4. Once, in the room: point the right controller at the chair and say "this is a chair". It is
   stored as a **user-registered** object and remembered for that room.

Each run:

1. `npm start` on the laptop; plug the headset in (the USB tunnel is automatic) or use the Wi-Fi address.
2. Launch the app facing open floor. The HUD disappears by itself when everything is ready; if it
   stays, it says what is wrong.

| Time | You | Expected |
|---|---|---|
| 0–10 s | "Come over here." | The character is standing about 1.8 m away facing you |
| 10–20 s | | It answers and walks to about 1.2 m from you |
| 20–30 s | Look toward the chair: "What do you see over there?" | It refers to the chair. If asked how it knows: it was told (registered), unless a camera scan found it, in which case it may say it sees it |
| 30–40 s | "Go take a look." | It walks to the chair |
| 40–45 s | | It stops, looks at the chair and remarks on it |

Do not present a registered chair as visual recognition. Record a backup take beforehand.
