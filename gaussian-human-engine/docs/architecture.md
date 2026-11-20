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

## Live diffusion: "diffusion paints, Gaussians hold"

The direction now being explored for photorealism. Diffusion cannot produce the frames a headset
shows (too slow per image, flicker between frames, disagreement between the eyes). So it does not:
the headset draws the Gaussians at full frame rate, and a diffusion model running alongside
repaints the Gaussians the viewer can currently see. The paint is stored per Gaussian in the
body's own coordinates, so it persists as she moves and accumulates as the viewer looks around.
`paint(camera, image)` in `runtime/gaussian-avatar.js` is that write path.

**First experiment (one run, desktop browser, 260,000 Gaussians, 85% of them on the head).**
Seven views of the head were rendered from the mesh, a general image-editing model turned each
into a photograph, and each photograph was painted back from its camera.

- The mechanism works: the paint stays in place in 3D and views that were never photographed
  show a coherent head with photographic skin tones.
- The result is not sharp. Features are smeared and the eyes ghosted, because the image model
  does not keep the geometry it is given: each photograph had to be rescaled by up to 7% and
  shifted by up to 117 pixels (of 1024) just to bring its outline over the render, and inside the
  outline the features still land in slightly different places from view to view. Averaging
  those is blur.

So the problem to solve for live diffusion is geometric fidelity of the painter, before speed:
it must return, pixel for pixel, the surface it was shown. That means a diffusion model
conditioned on the render's depth and normals (and ideally on the current paint, at low
strength, so each pass refines what is there), running on a GPU beside the headset. That model
was not available in the environment this was written in.

**Second experiment (same seven photographs, no new generation).** Two changes:

- each photograph is warped onto its render before painting (outline first, then dense optical
  flow; the corrections averaged 25 to 37 pixels and reached 110), `diffusion/sampling/align_to_render.py`;
- the view that faces a Gaussian most squarely decides its colour almost alone (`sharpness: 12`),
  so different views are no longer averaged.

The head now reads as a photograph of one woman from angles that were never photographed, with
clear eyes, skin texture and hair. Remaining faults: a dark patch at the tip of the nose in the
front view, a visible seam at the neck, and a soft, fuzzy torso (it has few Gaussians in this
test). One run, one character, one still pose, on a desktop; nothing here has been tried with
motion or in a headset.

What this changes: a general image model plus alignment is good enough to paint a still head.
A geometry-locked model would remove the need for the warp and is still what a live loop needs.
