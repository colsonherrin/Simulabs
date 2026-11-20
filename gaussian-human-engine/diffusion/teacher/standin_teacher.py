"""A STAND-IN for the diffusion teacher.

The plan's teacher is a diffusion model, trained on a GPU, that produces high-detail deformation
targets for the Gaussians given the controls. That model does not exist yet. So that everything
downstream of it (the dataset, distillation, the student, export, the headset runtime, the
metrics) could be built and measured now, this file provides a teacher with the same interface
and the same kind of output: for a batch of control vectors, a displacement for every Gaussian,
in the bind pose, in model units.

Its displacements are hand-written corrective shapes (breathing, the jaw and lips, muscle bulge
at bent joints, cloth creasing with posture, a smile), deliberately non-linear in the controls
so that a linear decoder cannot reproduce them exactly. They are NOT diffusion output and say
nothing about what a diffusion teacher will achieve. Replace this class with the real teacher:
nothing else needs to change as long as `targets(controls)` keeps its shape.
"""
import numpy as np
from .controls import NAMES


class StandInTeacher:
    name = 'stand-in (hand-written correctives, not diffusion)'

    def __init__(self, canonical):
        c = self.c = canonical
        p, n = c.position, c.normal
        fwd = c.forward()
        up = np.array([0, 0, 1], np.float32)
        self.n = n
        self.up = up
        self.fwd = fwd
        front = np.clip(n @ fwd, 0, 1)                      # 1 on surfaces facing forward
        height = p[:, 2]
        head = c.bone_bind[c.bone_index('Head')]
        is_head = (c.part >= 1).astype(np.float32)
        # Chest: moved by the upper spine, facing forward.
        self.chest = c.influence('Spine1', 'Spine2') * front
        # Torso cloth: everything on the spine that is not the head.
        self.torso = c.influence('Spine', 'Spine1', 'Spine2') * (1 - is_head)
        # A crease pattern across the torso (fixed per Gaussian).
        side = p @ np.cross(up, fwd)
        self.crease = np.sin(height * 0.55 + side * 0.21) * np.cos(side * 0.37 - height * 0.12)
        # Joints: a soft region either side of each one, on the inside of the bend.
        def near(bone, radius):
            d = np.linalg.norm(p - c.bone_bind[c.bone_index(bone)], axis=1)
            return np.exp(-(d / radius) ** 2)
        self.elbow = {s: near(f'{s}_Forearm', 9.0) * c.influence(f'{s}_UpperArm', f'{s}_Forearm') for s in 'LR'}
        self.knee = {s: near(f'{s}_Calf', 11.0) * c.influence(f'{s}_Thigh', f'{s}_Calf') for s in 'LR'}
        self.shoulder = {s: near(f'{s}_UpperArm', 10.0) * c.influence(f'{s}_Clavicle', f'{s}_UpperArm', 'Spine2') for s in 'LR'}
        self.neck = near('Neck', 8.0) * c.influence('Neck', 'Spine2', 'Head')
        # Face: the mouth sits below and in front of the head joint.
        rel = p - head
        ahead = rel @ fwd
        mouth_centre = head + fwd * 9.0 + up * 3.5
        d_mouth = np.linalg.norm((p - mouth_centre) * np.array([1.0, 1.0, 1.6], np.float32), axis=1)
        face = is_head * np.clip(ahead / 6.0, 0, 1)
        self.jaw = face * np.exp(-(d_mouth / 5.5) ** 2) * (rel[:, 2] < 4.2)   # lower lip, chin
        self.lip_side = np.tanh(side * 0.5) * face * np.exp(-(d_mouth / 4.0) ** 2)
        self.cheek = face * np.exp(-(np.linalg.norm(p - (mouth_centre + up * 3.0), axis=1) / 6.0) ** 2)
        self.side_dir = np.cross(up, fwd)

    def targets(self, controls):
        """controls: (B, DIM) -> displacements (B, N, 3), model units."""
        x = {name: controls[:, i][:, None] for i, name in enumerate(NAMES)}
        n = self.n[None]
        up = self.up[None, None]
        out = np.zeros((controls.shape[0], self.c.count, 3), np.float32)
        # Breathing: the chest rises on the in-breath; the shoulders follow a little.
        breath = 0.5 + 0.5 * x['breath_sin']
        out += n * (self.chest[None, :, None] * (0.45 * breath[..., None]))
        # Jaw and lips: the chin drops, the lower lip follows, the corners pull in as it opens wide.
        jaw = x['jaw']
        out -= up * (self.jaw[None, :, None] * (1.5 * jaw + 0.6 * jaw ** 2)[..., None])
        out -= self.side_dir[None, None] * (self.lip_side[None, :, None] * (0.35 * jaw ** 2)[..., None])
        # A smile lifts the cheeks and widens the mouth.
        smile = x['smile']
        out += up * (self.cheek[None, :, None] * (0.5 * smile)[..., None])
        out += self.side_dir[None, None] * (self.lip_side[None, :, None] * (0.6 * np.sin(smile * 1.4))[..., None])
        # Bent joints bulge: quickly at first, then saturating.
        for s, side in (('L', 'l'), ('R', 'r')):
            out += n * (self.elbow[s][None, :, None] * (0.9 * np.tanh(1.3 * x[f'elbow_{side}']))[..., None])
            out += n * (self.knee[s][None, :, None] * (1.1 * np.tanh(1.1 * x[f'knee_{side}']))[..., None])
            out += n * (self.shoulder[s][None, :, None] * (0.7 * np.sin(x[f'shoulder_{side}']) ** 2)[..., None])
        # Cloth creases deepen as the spine bends and the arms lift, and shift with the breath.
        fold = np.tanh(2.2 * x['spine']) + 0.35 * (x['shoulder_l'] + x['shoulder_r'])
        out += n * ((self.torso * self.crease)[None, :, None] * (0.35 * fold * (1 + 0.3 * x['breath_cos']))[..., None])
        # Turning the head tightens the neck.
        out += n * (self.neck[None, :, None] * (0.5 * np.sin(x['head_turn'] * 1.3))[..., None])
        return out
