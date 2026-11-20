"""How a deformation model is judged against the teacher.

All in model units (centimetres for these characters), over the Gaussians and frames given.
"""
import numpy as np


def rmse(pred, target):
    """Root-mean-square distance between predicted and target Gaussian displacements."""
    return float(np.sqrt(((pred - target) ** 2).sum(-1).mean()))


def worst(pred, target, q=99.9):
    """The error that all but the worst 0.1% of Gaussian-frames stay under."""
    return float(np.percentile(np.linalg.norm(pred - target, axis=-1), q))


def flicker(seq):
    """Frame-to-frame jitter: mean size of the second difference in time. Smooth motion scores low;
    the teacher's own score on the same frames is the reference, since real motion is not zero."""
    return float(np.linalg.norm(seq[2:] - 2 * seq[1:-1] + seq[:-2], axis=-1).mean())
