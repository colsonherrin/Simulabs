# Simulacra on Snap Spectacles (2024)

A Lens Studio client for the same backend the Quest and XREAL apps use. The mind, the skills and
the memory are unchanged; this folder is only the device side.

> **Status.** `SimulacraCore.ts` (protocol, world model, movement, audio conversion) is tested
> outside Lens Studio against the real backend: `cd backend && npm test`. `SimulacraLens.ts` and
> `SimulacraBody.ts` (everything that touches the glasses) follow API usage taken from Snap's
> official samples on their `5.15.4` branch and type-check against declarations written from
> those samples, but **have never been opened in Lens Studio or run on Spectacles**. Expect to fix
> small things on first compile.

## What you need

- Spectacles (2024) and **Lens Studio 5.15.4**. Snap's current `main` samples target newer
  hardware and say they will not work on Spectacles (2024).
- **Experimental APIs** enabled in the project, and **Extended Permissions** enabled on the
  glasses. A lens that uses the microphone and talks to your own server over a WebSocket is an
  experimental combination: it runs for a demo and **cannot be published**.
- The laptop running the backend on the **same Wi-Fi** as the glasses. There is no USB tunnel
  here; use the `Wi-Fi` address the backend prints.

## Setup in Lens Studio

1. Create a new Spectacles project. In the Preview panel set the device to *Spectacles (2024)*.
2. *Project Settings > General > Enable Experimental Mode.*
3. Copy the three files from `Assets/Scripts/` into the project's `Assets` folder.
4. Check the camera object has a **Device Tracking** component in **World** mode (the template has it).
5. In the Asset Browser add an **Audio From Microphone** asset and an **Audio Output** asset.
6. Import the character: drag `packages/com.simulacra.core/Avatar/Rocketbox/RocketboxAdult.fbx`
   and its PNG textures into the project. Create an empty object named `Avatar`, put the model
   under it with its feet at the object's origin, and check it stands about 175 units tall
   (Lens Studio units are centimetres).
7. Create an empty object, add a **Script** component with `SimulacraLens`, and assign:
   | Input | Assign |
   |---|---|
   | Server Url | `ws://<laptop-ip>:8787/device` |
   | Camera Object | the camera |
   | Avatar | the `Avatar` object |
   | Mic Audio Track | the microphone asset |
   | Audio Output Track | the audio output asset |
   | Debug Text (optional) | a Text component, to see connection and floor status |
   | Face Mesh (optional) | the character's mesh visual that carries the blendshapes |
   | Animation Player, Idle/Walk Clip (optional) | only if your character has clips; without them the limbs are animated procedurally |
8. Start the backend (`npm run doctor`, then `npm start` in `backend/`), push the lens to the glasses.

## Using it

- **Look at the floor** for a second or two. The character appears about 2.5 m in front of you
  once the floor is found.
- Talk to it. **Pinch with the right hand** to interrupt.
- Look at something and say "this is a chair" to register it. It is stored as user-registered.

## What is different from the Quest version

| | Spectacles |
|---|---|
| Room | Floor height from a gaze hit test; "is this floor?" from vertical hit tests cached in 25 cm cells |
| Navigation | No path planner. Straight lines with side-stepping around what the hit tests find. It gets around a chair, not out of a maze, and reports "the way became blocked" when stuck |
| Objects | Pointing and naming only. No camera detection (camera + open internet needs further permissions) |
| Occlusion | None |
| Voice | Mic is muted while the character speaks; pinch to cut in |
| Memory of registered objects | Lost when the lens restarts |
| Mouth | Opens and closes while speaking (not driven by loudness) |

## First-compile checklist

If Lens Studio reports errors, they will be in `SimulacraLens.ts` or `SimulacraBody.ts`. The calls
most worth checking against Lens Studio's own typings:

- `AnimationPlayer.getClip(...).weight` / `playClipAt` (the samples reach these through `any`).
- `SceneObject.getChild` / `getChildrenCount` / `name`, `Transform.getLocalRotation`, `quat.angleAxis`, `vec3.length` (standard API, but not confirmed from the samples).
- `AudioComponent.stop(false)` as the way to drop queued speech.
- Whether the microphone delivers 24 kHz; the code reads the actual rate back and resamples.
- If the character walks backwards or sideways, set **Model Yaw Offset** (try 180).
