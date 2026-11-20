"""The student: a small network that stands in for the teacher at run time.

    controls (12)  ->  MLP (12 -> 32 -> 32 -> K)  ->  K coefficients
    displacement of Gaussian i  =  sum_k  coefficient_k * basis[k, i]

The basis is shared by all frames (K displacement fields over the Gaussians, found from the
teacher's outputs), so per frame the network produces only K numbers and the per-Gaussian work is
K multiply-adds, which a vertex shader does. Written in plain numpy: the network is a few
thousand weights and trains in seconds on a CPU.
"""
import numpy as np


class Student:
    def __init__(self, dim_in, k, hidden=32, seed=0):
        rng = np.random.default_rng(seed)
        sizes = [dim_in, hidden, hidden, k]
        self.w = [rng.normal(0, np.sqrt(1.0 / a), (a, b)).astype(np.float32) for a, b in zip(sizes[:-1], sizes[1:])]
        self.b = [np.zeros(b, np.float32) for b in sizes[1:]]

    def forward(self, x, keep=False):
        acts = [x]
        h = x
        for i, (w, b) in enumerate(zip(self.w, self.b)):
            h = h @ w + b
            if i < len(self.w) - 1:
                h = np.tanh(h)
            acts.append(h)
        return (h, acts) if keep else h

    def backward(self, acts, grad_out):
        """Gradients of the weights given d(loss)/d(output)."""
        gw, gb = [None] * len(self.w), [None] * len(self.w)
        g = grad_out
        for i in reversed(range(len(self.w))):
            if i < len(self.w) - 1:
                g = g * (1 - acts[i + 1] ** 2)
            gw[i] = acts[i].T @ g
            gb[i] = g.sum(0)
            g = g @ self.w[i].T
        return gw, gb

    def parameters(self):
        return self.w + self.b

    def count(self):
        return int(sum(p.size for p in self.parameters()))


class Adam:
    def __init__(self, params, lr=3e-3):
        self.params, self.lr, self.t = params, lr, 0
        self.m = [np.zeros_like(p) for p in params]
        self.v = [np.zeros_like(p) for p in params]

    def step(self, grads):
        self.t += 1
        for p, g, m, v in zip(self.params, grads, self.m, self.v):
            m *= 0.9
            m += 0.1 * g
            v *= 0.999
            v += 0.001 * g * g
            p -= self.lr * (m / (1 - 0.9 ** self.t)) / (np.sqrt(v / (1 - 0.999 ** self.t)) + 1e-8)
