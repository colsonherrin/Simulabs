"""Distil a teacher into the student, measure it, and export it for the headset.

    python3 -m distillation.training.train_student <canonical-base> <out-base> [K]

Steps (each is a stage of the plan, at small scale):
  1. dataset     sample controls; ask the teacher for its displacement of every Gaussian
  2. basis       find K shared displacement fields that explain the teacher's outputs (PCA)
  3. distil      train the MLP to produce the K coefficients from the controls:
                 loss = distillation (match the teacher) + temporal (match its change frame to frame)
  4. compare     against the teacher on held-out poses, and against two baselines:
                 no correction at all (conventional skinning) and a linear decoder (blendshapes)
  5. quantise    basis to 8 bits per value, weights to 16-bit floats; measure what that costs
  6. export      one binary and one JSON the runtime loads
The teacher is whatever `make_teacher` returns; today that is the stand-in (see its file).
"""
import json
import sys
import time
import numpy as np

from avatar.canonical import Canonical
from diffusion.teacher import controls as C
from diffusion.teacher.standin_teacher import StandInTeacher
from distillation.student.model import Student, Adam
from evaluation.metrics.metrics import rmse, worst, flicker


def make_teacher(canonical):
    return StandInTeacher(canonical)


def main(base, out, k=12):
    rng = np.random.default_rng(7)
    canon = Canonical(base)
    teacher = make_teacher(canon)
    n = canon.count
    report = {'character': base.split('/')[-1], 'gaussians': n, 'teacher': teacher.name, 'controls': C.NAMES, 'k': k}

    # 1. Dataset: random poses for coverage, plus continuous stretches for the temporal term.
    t0 = time.time()
    x_rand = C.random_controls(rng, 420)
    seqs = [C.smooth_sequence(rng, 60) for _ in range(6)]
    x_train = np.concatenate([x_rand] + seqs)
    d_train = np.concatenate([teacher.targets(x_train[i:i + 60]) for i in range(0, len(x_train), 60)]).reshape(len(x_train), -1)
    x_test = C.random_controls(rng, 120)
    d_test = teacher.targets(x_test)
    seq_test = C.smooth_sequence(rng, 144)
    d_seq = teacher.targets(seq_test)
    report['dataset'] = {'train_frames': int(len(x_train)), 'test_frames': int(len(x_test)), 'sequence_frames': int(len(seq_test)), 'seconds': round(time.time() - t0, 1)}

    # 2. Basis by PCA, through the small (frames x frames) matrix.
    t0 = time.time()
    gram = d_train @ d_train.T
    vals, vecs = np.linalg.eigh(gram)
    order = np.argsort(vals)[::-1][:k]
    sing = np.sqrt(np.maximum(vals[order], 1e-12))
    basis = (vecs[:, order].T @ d_train) / sing[:, None]          # (k, n*3), orthonormal rows
    explained = float(vals[order].sum() / vals.sum())
    # Scale each field so its coefficients are of order one.
    scale = sing / np.sqrt(len(x_train))
    basis = basis * scale[:, None]
    coeff = lambda d: (d.reshape(len(d), -1) @ basis.T) / (scale ** 2)[None]
    y_train = coeff(d_train)
    report['basis'] = {'variance_explained': round(explained, 5), 'seconds': round(time.time() - t0, 1)}
    decode = lambda y, b=None: (y @ (basis if b is None else b)).reshape(len(y), n, 3)

    # 3. Distil. Losses are in coefficient space weighted by each field's size, which equals
    #    displacement error inside the basis.
    t0 = time.time()
    xn = C.normalise(x_train)
    weight = (scale ** 2 / (scale ** 2).mean()).astype(np.float32)
    student = Student(C.DIM, k)
    opt = Adam(student.parameters(), lr=4e-3)
    n_rand = len(x_rand)
    seq_slices = [(n_rand + i * 60, n_rand + (i + 1) * 60) for i in range(len(seqs))]
    lam_t = 0.5
    for step in range(4000):
        if step == 2800:
            opt.lr = 1e-3
        pred, acts = student.forward(xn, keep=True)
        err = (pred - y_train) * weight
        grad = 2 * err / len(xn)
        loss_d = float((err * (pred - y_train)).sum() / len(xn))
        # Temporal: the change between consecutive frames should match the teacher's change.
        loss_t = 0.0
        for a, b in seq_slices:
            dv = ((pred[a + 1:b] - pred[a:b - 1]) - (y_train[a + 1:b] - y_train[a:b - 1])) * weight
            loss_t += float((dv ** 2 / weight).sum())
            g = 2 * lam_t * dv / (60 * len(seq_slices))
            grad[a + 1:b] += g
            grad[a:b - 1] -= g
        gw, gb = student.backward(acts, grad.astype(np.float32))
        opt.step(gw + gb)
    report['training'] = {'steps': 4000, 'parameters': student.count(), 'distill_loss': round(loss_d, 6), 'temporal_loss': round(loss_t / (60 * len(seq_slices)), 6), 'seconds': round(time.time() - t0, 1)}

    # 4. Compare on poses the student never saw.
    pred_test = decode(student.forward(C.normalise(x_test)))
    zero = np.zeros_like(d_test)
    A = np.concatenate([C.normalise(x_train), np.ones((len(x_train), 1), np.float32)], 1)
    lin, *_ = np.linalg.lstsq(A, y_train, rcond=None)                     # linear decoder baseline
    lin_test = decode(np.concatenate([C.normalise(x_test), np.ones((len(x_test), 1), np.float32)], 1) @ lin)
    ceiling = decode(coeff(d_test))                                       # the best this basis could do
    pred_seq = decode(student.forward(C.normalise(seq_test)))
    report['held_out'] = {
        'units': 'cm',
        'teacher_displacement_rms': round(rmse(d_test, zero), 4),
        'error_no_correction': round(rmse(zero, d_test), 4),
        'error_linear_decoder': round(rmse(lin_test, d_test), 4),
        'error_student': round(rmse(pred_test, d_test), 4),
        'error_basis_ceiling': round(rmse(ceiling, d_test), 4),
        'student_worst_0.1pct': round(worst(pred_test, d_test), 4),
        'flicker_teacher': round(flicker(d_seq), 5),
        'flicker_student': round(flicker(pred_seq), 5),
    }

    # 5. Quantise: basis to int8 per field, weights to float16.
    peak = np.abs(basis).max(1)
    q_basis = np.clip(np.round(basis / peak[:, None] * 127), -127, 127).astype(np.int8)
    basis_q = q_basis.astype(np.float32) / 127 * peak[:, None]
    w16 = [p.astype(np.float16) for p in student.w]
    b16 = [p.astype(np.float16) for p in student.b]
    sq = Student(C.DIM, k)
    sq.w, sq.b = [p.astype(np.float32) for p in w16], [p.astype(np.float32) for p in b16]
    pred_q = decode(sq.forward(C.normalise(x_test)), basis_q)
    report['quantised'] = {'error_student': round(rmse(pred_q, d_test), 4), 'added_error': round(rmse(pred_q, pred_test), 4), 'basis_bytes': int(q_basis.size), 'weight_bytes': int(sum(p.size for p in w16 + b16) * 2)}

    # Inference cost of the network itself (the per-Gaussian sum is done by the GPU).
    one = C.normalise(x_test[:1])
    t0 = time.perf_counter()
    for _ in range(2000):
        sq.forward(one)
    report['inference'] = {'mlp_ms_numpy_this_machine': round((time.perf_counter() - t0) / 2000 * 1000, 4), 'note': 'the headset figure must be measured on the headset'}

    # 6. Export. Basis laid out per Gaussian: (n, k, 3) int8, so one Gaussian's fields sit together.
    per_gaussian = q_basis.reshape(k, n, 3).transpose(1, 0, 2).copy()
    open(out + '.student.bin', 'wb').write(per_gaussian.tobytes())
    json.dump({
        'version': 1,
        'teacher': teacher.name,
        'count': n,
        'k': k,
        'controls': [{'name': a, 'low': b, 'high': c} for a, b, c in C.CONTROLS],
        'basis': {'layout': '(gaussian, field, xyz) int8', 'peak': [float(v) for v in peak]},
        'mlp': {'activation': 'tanh', 'weights': [p.astype(np.float32).round(5).tolist() for p in w16], 'biases': [p.astype(np.float32).round(5).tolist() for p in b16]},
        'report': report,
    }, open(out + '.student.json', 'w'))
    json.dump(report, open(out + '.report.json', 'w'), indent=1)
    print(json.dumps(report, indent=1))


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else 12)
