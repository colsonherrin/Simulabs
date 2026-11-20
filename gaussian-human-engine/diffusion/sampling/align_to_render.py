"""Warp each photograph so that it lies exactly over the render it was made from.
   python3 align_to_render.py <dir> <view names...>   reads render2-<v>.png and photo-<v>.png, writes aligned-<v>.png

   A generated photograph never keeps exactly the layout of the render it was asked to follow.
   Painting it as it comes smears the features; warping it onto the render first keeps them sharp."""
import sys, cv2, numpy as np
d = sys.argv[1]
for v in sys.argv[2:]:
    r = cv2.imread(f'{d}/render2-{v}.png'); p = cv2.imread(f'{d}/photo-{v}.png')
    p = cv2.resize(p, (r.shape[1], r.shape[0]), interpolation=cv2.INTER_AREA)
    def box(im):
        m = im.sum(2) > 90
        ys, xs = np.where(m)
        return xs.min(), ys.min(), xs.max(), ys.max()
    rx0, ry0, rx1, ry1 = box(r); px0, py0, px1, py1 = box(p)
    # 1. Outline over outline (scale by width, pin the top of the head).
    s = (rx1 - rx0) / max(1, px1 - px0)
    M = np.float32([[s, 0, rx0 - px0 * s], [0, s, ry0 - py0 * s]])
    p1 = cv2.warpAffine(p, M, (r.shape[1], r.shape[0]), flags=cv2.INTER_LANCZOS4)
    # 2. Dense flow from the render to the photograph, on local contrast (the two differ in shading, not in layout).
    def prep(im):
        g = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
        g = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8)).apply(g)
        return cv2.GaussianBlur(g, (0, 0), 1.5)
    dis = cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_MEDIUM)
    dis.setFinestScale(1)
    flow = dis.calc(prep(r), prep(p1), None)
    # Keep it smooth and modest: this corrects drift of features, it must not tear the picture.
    flow = cv2.GaussianBlur(flow, (0, 0), 9)
    mag = np.linalg.norm(flow, axis=2)
    flow *= np.minimum(1.0, 40.0 / np.maximum(mag, 1e-6))[..., None]
    h, w = r.shape[:2]
    gx, gy = np.meshgrid(np.arange(w, dtype=np.float32), np.arange(h, dtype=np.float32))
    p2 = cv2.remap(p1, gx + flow[..., 0], gy + flow[..., 1], cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_CONSTANT)
    cv2.imwrite(f'{d}/aligned-{v}.png', p2)
    print(v, 'scale %.3f' % s, 'mean flow %.1f px, max %.1f px' % (float(mag[r.sum(2) > 90].mean()), float(mag.max())))
