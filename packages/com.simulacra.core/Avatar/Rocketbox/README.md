# Bundled character

`RocketboxAdult.fbx` and its textures are the avatar "Female_Adult_17" (facial-blendshape version)
from the Microsoft Rocketbox avatar library, https://github.com/microsoft/Microsoft-Rocketbox,
commit 0943055. MIT licence, Copyright (c) 2020 Microsoft; the licence text is in `LICENSE.md`.

Changes from the original: the FBX was renamed; textures were converted from TGA to PNG without
resizing; the specular maps were left out (unused by the Standard shader's metallic workflow).

If you use the library in research, its authors ask that you cite: Gonzalez-Franco et al., "The
Rocketbox library and the utility of freely available rigged avatars", Frontiers in Virtual
Reality, 2020, doi:10.3389/frvir.2020.561558.

It is used automatically when `Assets/Simulacra/Avatar/` in a project holds no model of its own.
