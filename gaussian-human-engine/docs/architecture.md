# Architecture

## Aim

Display a photorealistic, spatially persistent, AI-controlled human in mixed reality at headset
frame rates. The expensive generative model (a diffusion "teacher") runs only during
development; a small "student" reproduces its effect at run time.

```
 development (GPU)                              run time (headset, every frame)
 ┌────────────────────┐   targets   ┌─────────┐   K numbers   ┌───────────────────────────┐
 │ teacher            │ ──────────► │ student │ ────────────► │ Gaussian body             │
 │ controls -> a      │  distil     │ MLP +   │               │ canonical Gaussians       │
 │ displacement for   │             │ shared  │               │  + student correction     │
 │ every Gaussian     │             │ basis   │               │  + skeleton               │
 └────────────────────┘             └─────────┘               │  -> splats, both eyes     │
        ▲                                ▲                     └───────────────────────────┘
        └──────── controls (pose, face, voice, breath), one definition for all ────────────┘
```

## The pieces

**Canonical Gaussians** (`avatar/`). A character is a fixed set of Gaussians in its bind pose.
Each carries position, normal, colour, radius, and the four bones that move it with their
weights. They are stored in random order, so drawing the first N of them is an even subsample,
which is how a weaker device is given fewer.

**Controls** (`diffusion/teacher/controls.py`). One vector per frame: breathing phase, jaw,
flexion of elbows, knees, shoulders and spine, head turn, smile. The teacher is conditioned on
it, the student reads it, and the runtime computes it from the skeleton and the voice. All three
must agree on its order and ranges; the runtime reads them from the exported student file.

**Teacher** (`diffusion/teacher/`). Anything with `targets(controls) -> (frames, gaussians, 3)`
displacements in the bind pose. The plan's teacher is a temporal, pose-conditioned diffusion
model. Today's is a stand-in (hand-written correctives) so the rest could be built first; it is
the one file to replace.

**Student** (`distillation/`). `displacement_i = sum_k c_k * basis[k, i]`, with `c = MLP(controls)`.
The basis is K displacement fields shared by all frames (PCA of the teacher's outputs); the
network is 12 -> 32 -> 32 -> K. Trained with

    L = distillation (match the teacher) + lambda_t * temporal (match its frame-to-frame change)

The render and geometry terms of the plan's loss are not implemented: they need a differentiable
renderer and a real teacher to be meaningful.

**Runtime** (`runtime/gaussian-avatar.js`). Per frame on the CPU: controls, then the network
(a few thousand multiply-adds). Per Gaussian on the GPU: the K-term sum, four-bone skinning with
the character's own skeleton, and a soft round splat sized by distance. Splats are not sorted;
their soft edge is dithered and depth is written. That is cheaper than sorted blending and looks
grainier up close.

## Reverting

The Gaussian body is an alternative way to draw a character whose mesh is still loaded. The mesh's
surfaces are switched off, not removed, and its skeleton keeps running, so going back is
immediate and loses nothing: same companion, same conversation, same position and motion. It
reverts in three ways: by asking ("revert", "standard body"), by the panel button, and by itself
if a headset misses its frame time for three seconds.

## What is deliberately not here yet

- A diffusion teacher, and the dataset, consistency checks and GPU it needs.
- The Unity/OpenXR/Vulkan renderer for Quest (`quest/` is empty). The WebXR runtime is a way to
  exercise the representation and the student now; it is not a claim about Quest performance.
- Anisotropic Gaussians, view-dependent colour and sorted blending: each Gaussian is a round
  disc of one colour.
- Appearance corrections (opacity, colour): the student moves Gaussians only.
- Clothing over the Gaussian body: the companions' outfits are painted on the mesh.

## What to do next, in order

1. Run the WebXR Gaussian body on a Quest 3 and record frame time at 30,000 and 60,000
   Gaussians. If it does not hold frame rate, nothing later matters until it does.
2. Decide the Quest renderer: stay in WebXR, or port the three shader stages to Unity.
3. Replace the stand-in teacher, head only first, and rerun the same report.
