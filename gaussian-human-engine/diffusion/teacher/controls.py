"""The controls every deformation model in this engine is driven by.

One vector per frame. The teacher is conditioned on it during training, the student reads it at
run time, and the headset computes it from the skeleton and the voice, so all three must agree
on the order and the ranges here. (runtime/gaussian-avatar.js mirrors this list.)
"""
import numpy as np

CONTROLS = [
    ('breath_sin', -1.0, 1.0),   # breathing phase, as a point on a circle
    ('breath_cos', -1.0, 1.0),
    ('jaw', 0.0, 1.0),           # mouth open, from the voice level
    ('elbow_l', 0.0, 2.4),       # joint flexion, radians from the rest pose
    ('elbow_r', 0.0, 2.4),
    ('knee_l', 0.0, 2.2),
    ('knee_r', 0.0, 2.2),
    ('shoulder_l', 0.0, 1.8),
    ('shoulder_r', 0.0, 1.8),
    ('spine', 0.0, 0.9),
    ('head_turn', 0.0, 1.2),
    ('smile', 0.0, 1.0),         # expression
]
NAMES = [c[0] for c in CONTROLS]
LOW = np.array([c[1] for c in CONTROLS], np.float32)
HIGH = np.array([c[2] for c in CONTROLS], np.float32)
DIM = len(CONTROLS)


def normalise(x):
    """Controls scaled to about -1..1, the form the student network takes."""
    return (np.asarray(x, np.float32) - (LOW + HIGH) / 2) / ((HIGH - LOW) / 2)


def random_controls(rng, count):
    """Independent random poses, for coverage."""
    x = rng.uniform(LOW, HIGH, size=(count, DIM)).astype(np.float32)
    phase = rng.uniform(0, 2 * np.pi, count)
    x[:, 0], x[:, 1] = np.sin(phase), np.cos(phase)
    # Most of the time most joints are near rest: bias toward small flexion.
    x[:, 2:] = LOW[2:] + (x[:, 2:] - LOW[2:]) * rng.uniform(0, 1, size=(count, 1)) ** 0.6
    return x


def smooth_sequence(rng, frames, fps=72.0):
    """A plausible stretch of continuous motion, for the temporal terms and the flicker metric."""
    t = np.arange(frames) / fps
    x = np.zeros((frames, DIM), np.float32)
    x[:, 0], x[:, 1] = np.sin(2 * np.pi * 0.25 * t), np.cos(2 * np.pi * 0.25 * t)
    for k in range(2, DIM):
        f1, f2 = rng.uniform(0.15, 0.9, 2)
        p1, p2 = rng.uniform(0, 2 * np.pi, 2)
        wave = 0.5 + 0.3 * np.sin(2 * np.pi * f1 * t + p1) + 0.2 * np.sin(2 * np.pi * f2 * t + p2)
        x[:, k] = LOW[k] + (HIGH[k] - LOW[k]) * np.clip(wave * rng.uniform(0.3, 1.0), 0, 1)
    return x
