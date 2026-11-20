# gaussian-human-engine

A real-time engine for a 3D human drawn as deformable Gaussians, animated by a small "student"
network distilled from a generative "teacher". The plan this follows, and what each stage is for,
is in [docs/architecture.md](docs/architecture.md).

It lives in the Simulabs repository for now; it has no dependency on the game except that the
game is its first user (and lends it three.js for one build script).

## What exists today, and what does not

| Stage of the plan | State |
|---|---|
| Canonical Gaussians and skeletal attachment map | **Working.** Built from the two companions' rigged meshes: 60,000 Gaussians each, the face sampled about nine times more densely. |
| Pose-driven deformation, gaze, walking, jaw | **Working in WebXR/three.js**, driven by the character's existing skeleton and motion clips. |
| Diffusion teacher | **Not built.** There is a stand-in with the same interface whose outputs are hand-written corrective shapes. It exists so that everything after it could be built and measured. It is not diffusion and proves nothing about diffusion. |
| Distillation into a student | **Working against the stand-in.** PCA basis of 12 fields plus a 1,868-weight network, trained in numpy in a few seconds. |
| Quantisation and export | **Working.** Basis at 8 bits, weights at 16. |
| Runtime with the student in the loop | **Working in a desktop browser.** The network runs on the CPU each frame, the per-Gaussian sum in the vertex shader. |
| Revert to the standard bodies | **Working.** One call; also automatic if a headset misses frames for three seconds. |
| Unity/OpenXR/Vulkan Quest renderer | **Not started.** The runtime here is WebXR, because that is what could be built and run without a Unity editor. |
| Any measurement on a Quest | **None.** No frame time, memory or thermal figure in this folder comes from a headset. |
| Photorealism | **No.** The Gaussian body currently looks worse than the mesh it was sampled from, most of all in the face. |

## Measured so far (stand-in teacher, held-out poses, centimetres)

| | Sundai | Saturdai |
|---|---|---|
| Teacher displacement (RMS) | 0.175 | 0.163 |
| Error with no correction (plain skinning) | 0.175 | 0.163 |
| Error of a linear decoder (blendshape baseline) | 0.020 | 0.019 |
| Error of the student | 0.0054 | 0.0056 |
| Error of the student after quantisation | 0.0058 | 0.0060 |
| Flicker, teacher / student | 0.00016 / 0.00016 | 0.00015 / 0.00016 |

These say the distillation machinery works on an easy target. The stand-in teacher is low-rank
by construction (twelve fields explain all of it), which a diffusion teacher will not be; expect
every number here to get worse, and the choice of K and of network size to matter, once a real
teacher is plugged in. Reports are written to `distillation/export/<name>.report.json`.

## Run it

Build a character's Gaussians (needs the game's `node_modules` for three.js, and the textures as
raw 1024x1024 RGBA files):
```bash
node avatar/canonical_gaussians/build_canonical.mjs <model.fbx> <texture-dir> <prefix> avatar/canonical_gaussians/<name> 60000
```
Distil and export (numpy only):
```bash
python3 -m distillation.training.train_student avatar/canonical_gaussians/<name> distillation/export/<name> 12
```
See it: in the game, say or press "Gaussian body"; "revert" goes back. The runtime is
`runtime/gaussian-avatar.js`.

## Layout

```
avatar/         canonical Gaussians (builder, data, reader)
diffusion/      teacher: the shared control definition, and the stand-in teacher
distillation/   student model, training, exported students and their reports
evaluation/     metrics (error against the teacher, worst case, flicker)
runtime/        the WebXR runtime (three.js)
quest/          empty: the Unity/OpenXR renderer and headset benchmarks go here
docs/           architecture
```
