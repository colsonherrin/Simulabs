"""Read a character's canonical Gaussians (written by canonical_gaussians/build_canonical.mjs)."""
import json
import numpy as np


class Canonical:
    def __init__(self, base):
        self.meta = json.load(open(base + '.gauss.json'))
        raw = open(base + '.gauss.bin', 'rb').read()
        n = self.count = self.meta['count']
        lay = self.meta['layout']
        self.position = np.frombuffer(raw, np.float32, n * 3, lay['position']).reshape(n, 3).copy()
        self.normal = np.frombuffer(raw, np.int8, n * 4, lay['normal']).reshape(n, 4)[:, :3].astype(np.float32) / 127.0
        colour = np.frombuffer(raw, np.uint8, n * 4, lay['colour']).reshape(n, 4)
        self.part = colour[:, 3].copy()  # 0 body, 1 head, 2 hair
        self.bone = np.frombuffer(raw, np.uint8, n * 4, lay['bone']).reshape(n, 4).copy()
        self.weight = np.frombuffer(raw, np.uint8, n * 4, lay['weight']).reshape(n, 4).astype(np.float32) / 255.0
        self.bones = self.meta['bones']
        self.bone_bind = np.array(self.meta['boneBind'], np.float32)

    def bone_index(self, suffix):
        for i, name in enumerate(self.bones):
            if name.endswith(suffix):
                return i
        raise KeyError(suffix)

    def influence(self, *suffixes):
        """How much each Gaussian is moved by the named bones (0..1)."""
        ids = [self.bone_index(s) for s in suffixes]
        return sum((self.weight * (self.bone == i)).sum(1) for i in ids)

    def forward(self):
        """Unit vector the character faces, in mesh space (heel to toe, both feet)."""
        d = sum(self.bone_bind[self.bone_index(f'{s}_Toe0')] - self.bone_bind[self.bone_index(f'{s}_Foot')] for s in 'LR')  # both feet: they splay
        d[2] = 0.0
        return d / (np.linalg.norm(d) + 1e-9)
