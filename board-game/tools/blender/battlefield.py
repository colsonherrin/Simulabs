"""Build Crownfall's battlefield backdrop for the VR and flat-screen duels.

Run headless (does not touch your open Blender or its preferences):

    /Applications/Blender.app/Contents/MacOS/Blender --background --factory-startup \
        --python board-game/tools/blender/battlefield.py -- \
        board-game/public/models/battlefield.glb [preview.png]

Inspired by a ruined-castle battlefield: rolling muddy ground with grass,
puddles and scorch marks; scattered rocks; ruined curtain walls and towers
on the horizon (one half collapsed, beams showing) with a city beyond;
torn red banners on tall poles; broken palisades; dropped shields, helmets,
barrels and spears; smouldering ember patches. Empties named FIRE_* and
SMOKE_* tell the game where to light fires and raise smoke plumes.

Layout is in the duel arena's space: the player stands at the origin and the
enemy charges in from the front, Blender +Y (three.js -Z after the Y-up
export). The arena (radius 8 m) is flat and clear, and so is the charge lane.
Everything stays within 70 m, inside the game camera's 80 m far plane.
"""

import math
import random
import sys

import bmesh
import bpy
from mathutils import Matrix, Vector, noise

random.seed(11)

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
OUT = argv[0] if argv else "battlefield.glb"
PREVIEW = argv[1] if len(argv) > 1 else None

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
collection = scene.collection

# ------------------------------------------------------------ materials ---
MATS = {}


def mat(name, color, rough=0.9, metal=0.0, emit=None, strength=0.0, vertex_color=False):
    if name in MATS:
        return MATS[name]
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nodes = m.node_tree.nodes
    bsdf = nodes.get("Principled BSDF")
    bsdf.inputs["Roughness"].default_value = rough
    bsdf.inputs["Metallic"].default_value = metal
    if vertex_color:
        # Base colour comes from the mesh's colour attribute; glTF exports it
        # as COLOR_0 and three.js multiplies it in.
        attr = nodes.new("ShaderNodeVertexColor")
        attr.layer_name = "Color"
        m.node_tree.links.new(attr.outputs["Color"], bsdf.inputs["Base Color"])
    else:
        bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    if emit:
        bsdf.inputs["Emission Color"].default_value = (*emit, 1.0)
        bsdf.inputs["Emission Strength"].default_value = strength
    m.diffuse_color = (*color, 1.0)
    MATS[name] = m
    return m


GROUND = mat("ground", (0.3, 0.24, 0.17), 1.0, vertex_color=True)
ROCKS = mat("rocks", (0.4, 0.38, 0.35), 0.95, vertex_color=True)
STONE = mat("castle_stone", (0.46, 0.43, 0.39), 0.95, vertex_color=True)
STONE_DARK = mat("castle_stone_dark", (0.27, 0.25, 0.23), 0.95, vertex_color=True)
WOOD = mat("wood", (0.28, 0.18, 0.10), 0.85)
CHAR = mat("charred_wood", (0.07, 0.05, 0.04), 0.95)
RED = mat("banner_red", (0.42, 0.05, 0.04), 0.9)
IRON = mat("iron", (0.30, 0.30, 0.31), 0.5, metal=0.8)
LEATHER = mat("leather", (0.22, 0.14, 0.08), 0.9)
EMBER = mat("smoulder", (0.08, 0.02, 0.0), 0.9, emit=(1.0, 0.28, 0.04), strength=4.0)


# ---------------------------------------------------------------- terrain ---
def smoothstep(a, b, x):
    t = max(0.0, min(1.0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)


def ground_height(x, y):
    """Flat arena in the middle, rolling mud beyond, rising toward the ruins."""
    r = math.hypot(x, y)
    rough = smoothstep(8.0, 18.0, r)
    p = Vector((x * 0.045, y * 0.045, 0.0))
    h = noise.fractal(p, 1.0, 2.0, 4) * 1.4
    h += noise.noise(Vector((x * 0.22, y * 0.22, 3.0))) * 0.22
    h += max(0.0, r - 28.0) * 0.07
    return h * rough


def ground_color(x, y, z):
    r = math.hypot(x, y)
    mud = Vector((0.19, 0.14, 0.095))
    grass = Vector((0.2, 0.22, 0.1))
    wet = Vector((0.11, 0.09, 0.07))
    scorch = Vector((0.09, 0.07, 0.06))
    g = noise.noise(Vector((x * 0.09, y * 0.09, 7.0)))
    c = mud.lerp(grass, smoothstep(0.05, 0.45, g) * smoothstep(10.0, 20.0, r))
    # Puddles collect in the low spots.
    c = c.lerp(wet, smoothstep(-0.1, -0.5, z - 0.15 * noise.noise(Vector((x * 0.3, y * 0.3, 1.0)))) * 0.8)
    # Burnt earth around the fighting ground.
    c = c.lerp(scorch, (1 - smoothstep(6.0, 14.0, r)) * 0.55 * (0.6 + 0.4 * noise.noise(Vector((x * 0.4, y * 0.4, 5.0)))))
    # Churned mud: fine dark speckle and darker ruts.
    c *= 0.82 + 0.3 * noise.noise(Vector((x * 1.3, y * 1.3, 9.0)))
    rut = abs(noise.noise(Vector((x * 0.12, y * 0.6, 2.0))))
    c *= 0.75 + 0.25 * smoothstep(0.02, 0.12, rut)
    return (*c, 1.0)


def colorize(obj, fn):
    me = obj.data
    attr = me.color_attributes.new("Color", "BYTE_COLOR", "CORNER")
    for poly in me.polygons:
        for li in poly.loop_indices:
            co = obj.matrix_world @ me.vertices[me.loops[li].vertex_index].co
            attr.data[li].color = fn(co.x, co.y, co.z)
    me.color_attributes.active_color = attr


def to_object(name, bm, material):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    for poly in me.polygons:
        poly.use_smooth = False
    me.materials.append(material)
    obj = bpy.data.objects.new(name, me)
    collection.objects.link(obj)
    return obj


def terrain():
    bm = bmesh.new()
    bmesh.ops.create_grid(bm, x_segments=104, y_segments=104, size=62)
    for v in bm.verts:
        v.co.z = ground_height(v.co.x, v.co.y)
    obj = to_object("terrain", bm, GROUND)
    colorize(obj, ground_color)
    return obj


# ---------------------------------------------------------------- helpers ---
def add_box(bm, center, size, yaw=0.0, tilt=(0.0, 0.0)):
    m = (Matrix.Translation(center) @ Matrix.Rotation(yaw, 4, "Z") @ Matrix.Rotation(tilt[0], 4, "X")
         @ Matrix.Rotation(tilt[1], 4, "Y") @ Matrix.Diagonal((*size, 1.0)))
    bmesh.ops.create_cube(bm, size=1.0, matrix=m)


def add_cyl(bm, center, radius, depth, segments=8, radius2=None, rot=None):
    m = Matrix.Translation(center)
    if rot is not None:
        m = m @ rot
    bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=segments, radius1=radius,
                          radius2=radius if radius2 is None else radius2, depth=depth, matrix=m)


def lumpy_rock(bm, center, radius, squash=0.6, seed=0.0):
    start = len(bm.verts)
    bmesh.ops.create_icosphere(bm, subdivisions=2 if radius > 0.45 else 1, radius=radius, matrix=Matrix.Translation(center))
    bm.verts.ensure_lookup_table()
    for v in bm.verts[start:]:
        d = v.co - center
        n = noise.noise(d * (2.2 / max(radius, 0.05)) + Vector((seed, seed * 1.7, 0.0)))
        d *= 1.0 + 0.35 * n
        d.z *= squash
        v.co = center + d


# ------------------------------------------------------------------ rocks ---
def rocks():
    bm = bmesh.new()
    placed = 0
    while placed < 300:
        a = random.uniform(0, math.tau)
        r = random.uniform(8.5, 52.0) if random.random() < 0.8 else random.uniform(8.5, 18.0)
        x, y = math.cos(a) * r, math.sin(a) * r
        if y > 0 and abs(x) < 2.6 and r < 16:
            continue  # the charge lane
        size = random.uniform(0.12, 0.45) if random.random() < 0.82 else random.uniform(0.6, 1.4)
        z = ground_height(x, y) - size * 0.25
        lumpy_rock(bm, Vector((x, y, z)), size, squash=random.uniform(0.6, 0.9), seed=placed * 0.37)
        placed += 1
    obj = to_object("rocks", bm, ROCKS)

    def rock_color(x, y, z):
        base = 0.2 + 0.08 * noise.noise(Vector((x * 0.7, y * 0.7, z)))
        moss = smoothstep(0.1, 0.6, noise.noise(Vector((x * 0.3, y * 0.3, 4.0)))) * 0.35
        return (base * (1 - moss) + 0.22 * moss, base * (1 - moss) + 0.25 * moss, base * 0.93 * (1 - moss) + 0.12 * moss, 1.0)

    colorize(obj, rock_color)
    return obj


# ----------------------------------------------------------------- castle ---
def curtain_wall(bm_stone, bm_dark, a, b, height, broken=0.3, thickness=2.4):
    a, b = Vector(a), Vector(b)
    length = (b - a).length
    yaw = math.atan2(b.y - a.y, b.x - a.x)
    step = 1.4
    n = max(2, int(length / step))
    gap_start = random.randint(1, max(1, n - 4)) if random.random() < broken else -10
    gap_len = random.randint(2, 4)
    for i in range(n):
        t = (i + 0.5) / n
        p = a.lerp(b, t)
        base = ground_height(p.x, p.y)
        h = height
        if gap_start <= i < gap_start + gap_len:
            h = height * random.uniform(0.15, 0.4)  # breach
        elif random.random() < 0.18:
            h = height * random.uniform(0.6, 0.9)  # crumbled top
        bm = bm_dark if (i % 5 == 0) else bm_stone
        add_box(bm, Vector((p.x, p.y, base - 1 + (h + 1) / 2)), (step * 1.02, thickness, h + 1), yaw)
        if h >= height * 0.95:
            # Merlons along the outer edge.
            add_box(bm_stone, Vector((p.x, p.y, base + h + 0.45)) + Vector((-math.sin(yaw), math.cos(yaw), 0)) * (thickness * 0.35),
                    (step * 0.55, thickness * 0.3, 0.9), yaw)
        if h < height * 0.5:
            for k in range(4):
                lumpy_rock(bm_dark, Vector((p.x + random.uniform(-1.5, 1.5), p.y + random.uniform(-2.5, 2.5), base + 0.3)),
                           random.uniform(0.4, 0.9), 0.55, seed=i + k)


def round_tower(bm_stone, bm_dark, bm_wood, center, radius, height, collapse=0.0):
    cx, cy = center
    base = ground_height(cx, cy)
    segs = 18
    level_h = 1.6
    levels = int(height / level_h)
    for s in range(segs):
        a = s / segs * math.tau
        # One side falls away when the tower is collapsed.
        side = 0.5 + 0.5 * math.cos(a - 0.9)
        top = levels if collapse == 0 else int(levels * (1 - collapse * side * random.uniform(0.7, 1.0)))
        chord = 2 * radius * math.sin(math.pi / segs) * 1.08
        for lv in range(max(1, top)):
            if lv == levels - 3 and s % 6 == 0:
                continue  # arrow slits
            bm = bm_dark if (lv + s) % 7 == 0 else bm_stone
            add_box(bm, Vector((cx + math.cos(a) * radius, cy + math.sin(a) * radius, base + lv * level_h + level_h / 2 - 0.6)),
                    (chord, 1.3, level_h), a + math.pi / 2)
        if top >= levels and s % 2 == 0:
            add_box(bm_stone, Vector((cx + math.cos(a) * radius, cy + math.sin(a) * radius, base + levels * level_h + 0.1)),
                    (chord * 0.9, 1.3, 1.0), a + math.pi / 2)
    if collapse > 0:
        # Exposed floor beams and a rubble fan where the wall came down.
        for k in range(7):
            ang = random.uniform(-0.2, 1.8)
            add_box(bm_wood, Vector((cx + math.cos(ang) * radius * 0.4, cy + math.sin(ang) * radius * 0.4, base + height * random.uniform(0.35, 0.6))),
                    (radius * 2.0, 0.25, 0.25), ang, (random.uniform(-0.4, 0.4), random.uniform(-0.3, 0.3)))
        for k in range(26):
            ang = 0.9 + random.uniform(-0.9, 0.9)
            d = radius + random.uniform(0.0, 6.0)
            x, y = cx + math.cos(ang) * d, cy + math.sin(ang) * d
            lumpy_rock(bm_dark if k % 3 else bm_stone, Vector((x, y, ground_height(x, y) + 0.2)), random.uniform(0.5, 1.4), 0.6, seed=k)


def square_tower(bm_stone, bm_dark, center, size, height, yaw=0.0):
    cx, cy = center
    base = ground_height(cx, cy)
    add_box(bm_stone, Vector((cx, cy, base - 1 + (height + 1) / 2)), (size, size, height + 1), yaw)
    add_box(bm_dark, Vector((cx, cy, base + height - 0.6)), (size * 1.08, size * 1.08, 0.6), yaw)
    for i in range(4):
        for j in (-1, 0, 1):
            off = Vector((j * size * 0.35, size * 0.5, 0))
            off.rotate(Matrix.Rotation(yaw + i * math.pi / 2, 3, "Z"))
            add_box(bm_stone, Vector((cx, cy, base + height + 0.4)) + off, (size * 0.2, 0.6, 0.9), yaw + i * math.pi / 2)


def city_silhouette(bm):
    # A low medieval skyline far off: roofs, a few towers, one spire.
    for i in range(16):
        x = -22 + i * 2.9 + random.uniform(-0.5, 0.5)
        y = 66 + random.uniform(-1.5, 1.5)
        h = random.uniform(2.5, 5.0)
        w = random.uniform(2.0, 3.0)
        add_box(bm, Vector((x, y, h / 2 + 3)), (w, 2.4, h))
        # Pitched roof.
        add_cyl(bm, Vector((x, y, h + 3 + 0.9)), w * 0.72, 1.8, 4, radius2=0.0, rot=Matrix.Rotation(math.pi / 4, 4, "Z"))
    for x, h in ((-9, 10), (7, 12), (16, 8)):
        add_cyl(bm, Vector((x, 67, h / 2 + 3)), 1.4, h, 10)
        add_cyl(bm, Vector((x, 67, h + 3 + 1.5)), 1.6, 3.0, 10, radius2=0.0)
    add_cyl(bm, Vector((1, 68, 12)), 0.9, 18, 8, radius2=0.05)


def castle():
    bs, bd, bw = bmesh.new(), bmesh.new(), bmesh.new()
    # Far-left keep and curtain wall.
    round_tower(bs, bd, bw, (-46, 36), 3.2, 15)
    curtain_wall(bs, bd, (-43.5, 37.5), (-28, 43), 8, broken=0.6)
    square_tower(bs, bd, (-26, 43.5), 5.5, 14, 0.3)
    curtain_wall(bs, bd, (-23, 44), (-11, 47), 7, broken=0.9)
    round_tower(bs, bd, bw, (-8.5, 47.5), 2.8, 12)
    # The great tower on the right, half collapsed.
    round_tower(bs, bd, bw, (24, 33), 5.0, 19, collapse=0.65)
    curtain_wall(bs, bd, (28.5, 31), (44, 19), 7.5, broken=0.5)
    square_tower(bs, bd, (46, 17), 5, 12, -0.6)
    # A low ruined wall on the left flank.
    curtain_wall(bs, bd, (-38, 6), (-34, -16), 3.2, broken=1.0, thickness=1.8)
    # The city beyond, mostly lost in the haze.
    city_silhouette(bd)
    stone = to_object("castle_stone", bs, STONE)
    dark = to_object("castle_stone_dark", bd, STONE_DARK)

    def weathered(tone):
        def fn(x, y, z):
            # Block-to-block variation, grime rising from the ground, moss in
            # damp patches and soot streaks running down the walls.
            block = noise.noise(Vector((math.floor(x * 0.7) * 1.3, math.floor(y * 0.7) * 1.7, math.floor(z * 1.6) * 0.9)))
            c = Vector(tone) * (0.72 + 0.5 * block)
            grime = 1 - smoothstep(0.0, 6.0, z - ground_height(x, y))
            c = c.lerp(Vector((0.14, 0.11, 0.08)), grime * 0.7)
            moss = smoothstep(0.25, 0.6, noise.noise(Vector((x * 0.25, y * 0.25, z * 0.25 + 3)))) * (1 - smoothstep(2.0, 9.0, z))
            c = c.lerp(Vector((0.2, 0.24, 0.12)), moss * 0.6)
            soot = smoothstep(0.1, 0.5, noise.noise(Vector((x * 0.6, y * 0.6, z * 0.08 + 11))))
            c *= 1 - soot * 0.6
            return (*c, 1.0)
        return fn

    colorize(stone, weathered((0.36, 0.33, 0.29)))
    colorize(dark, weathered((0.22, 0.2, 0.19)))
    return [stone, dark, to_object("castle_beams", bw, CHAR)]


# ---------------------------------------------------------------- banners ---
def banner(bm_pole, bm_cloth, x, y, height, yaw, seed):
    base = ground_height(x, y)
    add_cyl(bm_pole, Vector((x, y, base + height / 2)), 0.07, height, 6)
    add_box(bm_pole, Vector((x, y, base + height - 0.2)), (1.6, 0.08, 0.08), yaw)
    add_cyl(bm_pole, Vector((x, y, base + height + 0.15)), 0.1, 0.3, 4, radius2=0.0)
    # A long tattered cloth hanging from the crossbar, rippled by the wind.
    w, l, cols, rows = 1.4, height * 0.45, 5, 12
    start = len(bm_cloth.faces)
    verts = []
    for j in range(rows + 1):
        row = []
        for i in range(cols + 1):
            u, v = i / cols, j / rows
            px = (u - 0.5) * w
            pz = -v * l
            py = math.sin(u * 3.0 + v * 4.0 + seed) * 0.12 * (0.3 + v)
            local = Vector((px, py, pz))
            local.rotate(Matrix.Rotation(yaw, 3, "Z"))
            row.append(bm_cloth.verts.new(Vector((x, y, base + height - 0.25)) + local))
        verts.append(row)
    for j in range(rows):
        for i in range(cols):
            # Tatters: drop cells near the bottom edge, more toward the tip.
            v = j / rows
            if v > 0.55 and random.random() < (v - 0.55) * 1.6:
                continue
            bm_cloth.faces.new((verts[j][i], verts[j][i + 1], verts[j + 1][i + 1], verts[j + 1][i]))
    del start


def banners():
    bp, bc = bmesh.new(), bmesh.new()
    spots = [(-10.5, 12, 8.5), (9.5, 14.5, 9.0), (-15, -5, 7.5), (14, -9, 8.0), (-5, 24, 10), (19, 6, 7.5),
             (-24, 18, 9), (30, -2, 8.5), (-30, 30, 11), (16, 28, 11)]
    for k, (x, y, h) in enumerate(spots):
        banner(bp, bc, x, y, h, random.uniform(-0.6, 0.6), k * 1.3)
    return [to_object("banner_poles", bp, WOOD), to_object("banner_cloth", bc, RED)]


# ---------------------------------------------------------------- debris ---
def palisades():
    bm = bmesh.new()
    lines = [((-24, 9), (-13, 19), 16), ((15, -14), (26, -4), 13), ((-22, -16), (-11, -21), 11)]
    for (a, b, n) in lines:
        a, b = Vector((*a, 0)), Vector((*b, 0))
        for i in range(n):
            if random.random() < 0.22:
                continue  # broken gaps
            p = a.lerp(b, i / (n - 1))
            h = random.uniform(1.4, 2.6)
            lean = random.uniform(-0.35, 0.35)
            z = ground_height(p.x, p.y)
            rot = Matrix.Rotation(lean, 4, "X") @ Matrix.Rotation(random.uniform(-0.2, 0.2), 4, "Y")
            add_cyl(bm, Vector((p.x, p.y, z + h / 2)), 0.11, h, 6, rot=rot)
            add_cyl(bm, Vector((p.x, p.y, z + h + 0.12)) + (rot.to_3x3() @ Vector((0, 0, 0))), 0.11, 0.3, 6, radius2=0.0, rot=rot)
    return to_object("palisades", bm, WOOD)


def debris():
    bw, bi, bl, be = bmesh.new(), bmesh.new(), bmesh.new(), bmesh.new()
    count = 0
    while count < 70:
        a = random.uniform(0, math.tau)
        r = random.uniform(6.5, 24)
        x, y = math.cos(a) * r, math.sin(a) * r
        if y > 0 and abs(x) < 2.4 and r < 14:
            continue
        z = ground_height(x, y)
        kind = random.random()
        if kind < 0.3:  # round shield, rim and boss
            tilt = Matrix.Rotation(random.uniform(-0.25, 0.25), 4, "X") @ Matrix.Rotation(random.uniform(-0.25, 0.25), 4, "Y")
            add_cyl(bw, Vector((x, y, z + 0.04)), 0.38, 0.05, 12, rot=tilt)
            add_cyl(bi, Vector((x, y, z + 0.08)), 0.1, 0.08, 8, radius2=0.04, rot=tilt)
        elif kind < 0.5:  # helmet
            start = len(bi.verts)
            bmesh.ops.create_uvsphere(bi, u_segments=10, v_segments=6, radius=0.17, matrix=Matrix.Translation((x, y, z + 0.06)))
            add_cyl(bi, Vector((x, y, z + 0.04)), 0.22, 0.02, 10)
        elif kind < 0.68:  # barrel, maybe on its side
            rot = Matrix.Rotation(math.pi / 2, 4, "X") @ Matrix.Rotation(random.uniform(0, 3), 4, "Z") if random.random() < 0.5 else None
            add_cyl(bw, Vector((x, y, z + 0.4)), 0.32, 0.85, 10, rot=rot)
            add_cyl(bi, Vector((x, y, z + 0.4)), 0.335, 0.06, 10, rot=rot)
        elif kind < 0.85:  # broken spear
            rot = Matrix.Rotation(random.uniform(1.2, 1.5), 4, "X") @ Matrix.Rotation(random.uniform(0, math.tau), 4, "Z")
            add_cyl(bl, Vector((x, y, z + 0.05)), 0.025, random.uniform(0.8, 1.8), 5, rot=rot)
        else:  # smouldering patch
            add_cyl(be, Vector((x, y, z + 0.01)), random.uniform(0.4, 0.9), 0.04, 9)
        count += 1
    return [to_object("debris_wood", bw, WOOD), to_object("debris_iron", bi, IRON),
            to_object("debris_shafts", bl, LEATHER), to_object("smoulder", be, EMBER)]


def marker(name, x, y, dz=0.3):
    e = bpy.data.objects.new(name, None)
    e.location = (x, y, ground_height(x, y) + dz)
    collection.objects.link(e)
    return e


# ------------------------------------------------------------------ build ---
objects = [terrain(), rocks(), *castle(), *banners(), palisades(), *debris()]
markers = [
    marker("FIRE_field_1", -12.5, 9.5), marker("FIRE_field_2", 11.0, 10.5), marker("FIRE_field_3", 15.5, -12.0),
    marker("SMOKE_tower", 24, 33, 10), marker("SMOKE_wall", -20, 44, 5), marker("SMOKE_city", 6, 62, 8),
    marker("SMOKE_field", -16, 22, 1),
]
tris = sum(sum(len(p.vertices) - 2 for p in o.data.polygons) for o in objects)
print(f"BATTLEFIELD objects={len(objects)} markers={len(markers)} triangles={tris}")

kwargs = dict(filepath=OUT, export_format="GLB", export_yup=True, export_apply=True, use_selection=False)
try:
    bpy.ops.export_scene.gltf(**kwargs, export_vertex_color="ACTIVE")
except TypeError:
    bpy.ops.export_scene.gltf(**kwargs)
print(f"BATTLEFIELD wrote {OUT}")

# ---------------------------------------------------------------- preview ---
if PREVIEW:
    world = bpy.data.worlds.new("sky")
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    bg.inputs["Color"].default_value = (0.62, 0.48, 0.33, 1.0)
    bg.inputs["Strength"].default_value = 0.9
    scene.world = world
    sun = bpy.data.lights.new("sun", "SUN")
    sun.energy = 3.5
    sun.color = (1.0, 0.82, 0.6)
    sun_obj = bpy.data.objects.new("sun", sun)
    sun_obj.rotation_euler = (math.radians(70), 0, math.radians(200))
    collection.objects.link(sun_obj)
    cam = bpy.data.cameras.new("cam")
    cam.lens = 18
    cam.clip_end = 200
    cam_obj = bpy.data.objects.new("cam", cam)
    cam_obj.location = (1.5, -9.0, 2.4)
    cam_obj.rotation_euler = (Vector((0, 40, 4)) - cam_obj.location).to_track_quat("-Z", "Y").to_euler()
    collection.objects.link(cam_obj)
    scene.camera = cam_obj
    for engine in ("BLENDER_EEVEE", "BLENDER_EEVEE_NEXT"):
        try:
            scene.render.engine = engine
            break
        except TypeError:
            continue
    scene.render.resolution_x = 1280
    scene.render.resolution_y = 720
    scene.view_settings.view_transform = "AgX" if "AgX" in [i.identifier for i in scene.view_settings.bl_rna.properties["view_transform"].enum_items] else "Filmic"
    scene.render.filepath = PREVIEW
    bpy.ops.render.render(write_still=True)
    print(f"BATTLEFIELD preview {PREVIEW}")
