"""Build the war-zone set pieces for Crownfall's duels in Blender.

Run headless (does not touch your open Blender or its preferences):

    /Applications/Blender.app/Contents/MacOS/Blender --background --factory-startup \
        --python board-game/tools/blender/war_props.py -- \
        board-game/public/models/war_props.glb [preview.png]

Writes a low-poly, flat-shaded glTF (GLB) of ruined walls, a wrecked
catapult, a burnt siege tower, an overturned cart, torn tents, a palisade,
craters, barrels, crates and a weapon rack, plus empties named FIRE_* where
the game sets fires burning.

Layout is in the duel arena's space: the player stands at the origin and the
enemy charges in from the front, which is Blender +Y (glTF/three.js -Z after
the Y-up export). The lane in front (|x| < 2.2, y > 0) and a 3.4 m circle
around the player are kept clear.
"""

import math
import random
import sys

import bmesh
import bpy
from mathutils import Euler, Vector

random.seed(7)

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
OUT = argv[0] if argv else "war_props.glb"
PREVIEW = argv[1] if len(argv) > 1 else None

# --------------------------------------------------------------- scene ---
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
collection = scene.collection

MATS = {}


def mat(name, color, rough=0.85, metal=0.0, emit=None, strength=0.0):
    if name in MATS:
        return MATS[name]
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Roughness"].default_value = rough
    bsdf.inputs["Metallic"].default_value = metal
    if emit:
        bsdf.inputs["Emission Color"].default_value = (*emit, 1.0)
        bsdf.inputs["Emission Strength"].default_value = strength
    m.diffuse_color = (*color, 1.0)
    MATS[name] = m
    return m


STONE = mat("stone", (0.36, 0.33, 0.30), 0.95)
STONE_DARK = mat("stone_dark", (0.22, 0.20, 0.19), 0.95)
WOOD = mat("wood", (0.30, 0.19, 0.11), 0.85)
CHAR = mat("charred_wood", (0.08, 0.06, 0.05), 0.95)
EMBER = mat("embers", (0.25, 0.05, 0.01), 0.9, emit=(1.0, 0.35, 0.05), strength=3.0)
CLOTH_GOLD = mat("cloth_gold", (0.55, 0.12, 0.14), 0.9)
CLOTH_VIOLET = mat("cloth_violet", (0.20, 0.12, 0.42), 0.9)
CANVAS = mat("canvas", (0.55, 0.50, 0.40), 0.95)
IRON = mat("iron", (0.35, 0.35, 0.36), 0.45, metal=0.8)
DIRT = mat("dirt", (0.17, 0.12, 0.08), 1.0)
ROPE = mat("rope", (0.45, 0.38, 0.25), 0.9)


def finish(obj, material, flat=True):
    obj.data.materials.clear()
    obj.data.materials.append(material)
    if flat:
        for poly in obj.data.polygons:
            poly.use_smooth = False
    return obj


def box(name, size, loc, rot=(0, 0, 0), material=WOOD):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    o = bpy.context.active_object
    o.name = name
    o.scale = size
    bpy.ops.object.transform_apply(scale=True)
    return finish(o, material)


def cyl(name, r, depth, loc, rot=(0, 0, 0), material=WOOD, verts=6, r2=None):
    if r2 is None:
        bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=depth, location=loc, rotation=rot)
    else:
        bpy.ops.mesh.primitive_cone_add(vertices=verts, radius1=r, radius2=r2, depth=depth, location=loc, rotation=rot)
    o = bpy.context.active_object
    o.name = name
    return finish(o, material)


def cone(name, r, depth, loc, rot=(0, 0, 0), material=WOOD, verts=5):
    bpy.ops.mesh.primitive_cone_add(vertices=verts, radius1=r, radius2=0, depth=depth, location=loc, rotation=rot)
    o = bpy.context.active_object
    o.name = name
    return finish(o, material)


def rock(name, r, loc, material=STONE):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=r, location=loc)
    o = bpy.context.active_object
    o.name = name
    o.scale = (random.uniform(0.8, 1.3), random.uniform(0.8, 1.3), random.uniform(0.5, 0.9))
    o.rotation_euler = Euler((random.random() * 3, random.random() * 3, random.random() * 3))
    bpy.ops.object.transform_apply(scale=True, rotation=True)
    return finish(o, material)


def group(name, parts, loc=(0, 0, 0), yaw=0.0):
    """Join parts into one object (one draw call per material) and place it."""
    bpy.ops.object.select_all(action="DESELECT")
    for p in parts:
        p.select_set(True)
    bpy.context.view_layer.objects.active = parts[0]
    bpy.ops.object.join()
    o = bpy.context.active_object
    o.name = name
    # Pivot at the group's own origin, then move it into place.
    bpy.ops.object.origin_set(type="ORIGIN_CURSOR")
    o.location = loc
    o.rotation_euler = (0, 0, yaw)
    return o


def fire(name, loc):
    e = bpy.data.objects.new(name, None)
    e.empty_display_type = "SPHERE"
    e.empty_display_size = 0.3
    e.location = loc
    collection.objects.link(e)
    return e


# ---------------------------------------------------------- set pieces ---
def ruined_wall(name, length, height, loc, yaw):
    parts = []
    blocks_x = int(length / 0.5)
    for i in range(blocks_x):
        col_h = height * (0.35 + 0.65 * abs(math.sin(i * 1.7 + 0.4))) * random.uniform(0.7, 1.0)
        rows = max(1, int(col_h / 0.32))
        for j in range(rows):
            jitter = random.uniform(-0.03, 0.03)
            parts.append(box(f"{name}_b{i}_{j}", (0.48, 0.5, 0.3), (-length / 2 + i * 0.5 + 0.25 + jitter, 0, 0.15 + j * 0.31),
                             (0, 0, random.uniform(-0.05, 0.05)), STONE if (i + j) % 3 else STONE_DARK))
    for k in range(6):
        parts.append(rock(f"{name}_rubble{k}", random.uniform(0.15, 0.3), (random.uniform(-length / 2, length / 2), random.uniform(-0.8, 0.8), 0.08), STONE_DARK))
    return group(name, parts, loc, yaw)


def catapult(name, loc, yaw):
    p = []
    for sx in (-0.7, 0.7):
        p.append(box(f"{name}_rail{sx}", (0.18, 2.6, 0.18), (sx, 0, 0.45)))
        for sy in (-1.0, 1.0):
            p.append(cyl(f"{name}_wheel{sx}{sy}", 0.42, 0.12, (sx * 1.18, sy, 0.42), (0, math.pi / 2, 0), CHAR, verts=10))
    for sy in (-1.1, 0.2, 1.1):
        p.append(box(f"{name}_cross{sy}", (1.6, 0.16, 0.16), (0, sy, 0.45)))
    # Upright frame and a snapped throwing arm.
    for sx in (-0.55, 0.55):
        p.append(box(f"{name}_post{sx}", (0.16, 0.16, 1.5), (sx, 0.2, 1.2), (0.12, 0, 0)))
    p.append(box(f"{name}_axle", (1.3, 0.14, 0.14), (0, 0.3, 1.85)))
    p.append(box(f"{name}_arm", (0.16, 0.16, 2.1), (0, -0.4, 1.55), (-1.05, 0, 0.15), CHAR))
    p.append(box(f"{name}_armstub", (0.16, 0.16, 0.7), (0.4, 1.3, 0.12), (1.4, 0.2, 0.5), CHAR))
    p.append(cyl(f"{name}_cup", 0.28, 0.22, (0.0, -1.35, 0.95), (0.5, 0, 0), IRON, verts=8, r2=0.18))
    p.append(cyl(f"{name}_rope", 0.04, 1.6, (0, 0.8, 0.9), (1.2, 0, 0), ROPE, verts=5))
    return group(name, p, loc, yaw)


def siege_tower(name, loc, yaw):
    p = []
    h = 4.8
    for sx in (-0.9, 0.9):
        for sy in (-0.9, 0.9):
            lean = random.uniform(-0.06, 0.06)
            p.append(box(f"{name}_leg{sx}{sy}", (0.2, 0.2, h), (sx, sy, h / 2), (lean, lean, 0), CHAR))
    for z in (0.5, 1.7, 2.9, 4.1):
        for (sx, sy, w, d) in ((0, -0.9, 2.0, 0.14), (0, 0.9, 2.0, 0.14), (-0.9, 0, 0.14, 2.0), (0.9, 0, 0.14, 2.0)):
            if random.random() < 0.8:
                p.append(box(f"{name}_beam{z}{sx}{sy}", (w, d, 0.14), (sx, sy, z), (0, 0, 0), CHAR if random.random() < 0.6 else WOOD))
    # Burnt cross bracing and a collapsed platform.
    p.append(box(f"{name}_brace", (0.12, 0.12, 2.6), (0, -0.92, 2.2), (0, 0.85, 0), CHAR))
    p.append(box(f"{name}_platform", (1.9, 1.0, 0.12), (0.1, 0.4, 3.0), (0.25, -0.15, 0), WOOD))
    for i in range(6):
        p.append(box(f"{name}_plank{i}", (0.18, random.uniform(0.9, 1.6), 0.05), (random.uniform(-1.6, 1.6), random.uniform(-1.6, 1.6), 0.04),
                     (0, 0, random.uniform(0, math.pi)), CHAR))
    p.append(box(f"{name}_glow", (1.2, 1.2, 0.06), (0, 0, 0.04), (0, 0, 0.4), EMBER))
    return group(name, p, loc, yaw)


def cart(name, loc, yaw):
    p = []
    p.append(box(f"{name}_bed", (1.4, 2.2, 0.12), (0, 0, 0.55), (0, 1.25, 0)))
    for sx in (-0.7, 0.7):
        p.append(box(f"{name}_side{sx}", (0.08, 2.2, 0.45), (sx * 0.6, 0, 0.75), (0, 1.25, 0)))
    p.append(cyl(f"{name}_wheel1", 0.5, 0.1, (0.75, 0.6, 1.25), (0, math.pi / 2, 0), WOOD, verts=10))
    p.append(cyl(f"{name}_wheel2", 0.5, 0.1, (0.6, -1.4, 0.06), (0, 0, 0.3), CHAR, verts=10))
    p.append(box(f"{name}_shaft", (0.08, 1.8, 0.08), (-0.5, 1.6, 0.06), (0, 0, 0.35)))
    for i in range(3):
        p.append(cyl(f"{name}_sack{i}", 0.22, 0.45, (-0.9 + i * 0.35, -0.6 + i * 0.2, 0.18), (math.pi / 2, 0, random.uniform(0, 3)), CANVAS, verts=6))
    return group(name, p, loc, yaw)


def tent(name, loc, yaw, cloth):
    p = []
    p.append(cone(f"{name}_roof", 1.5, 2.0, (0, 0, 1.0), (0, 0, 0), cloth, verts=6))
    p.append(cyl(f"{name}_pole", 0.04, 2.3, (0, 0, 1.15), material=WOOD, verts=5))
    for i in range(6):
        a = i / 6 * math.tau
        p.append(cyl(f"{name}_peg{i}", 0.03, 0.3, (math.cos(a) * 1.7, math.sin(a) * 1.7, 0.1), (0.5 * math.sin(a), -0.5 * math.cos(a), 0), WOOD, verts=4))
    o = group(name, p, loc, yaw)
    # Tear holes in the canvas: delete a few roof faces.
    bm = bmesh.new()
    bm.from_mesh(o.data)
    faces = [f for f in bm.faces if f.calc_center_median().z > 0.6 and f.calc_area() > 0.4]
    random.shuffle(faces)
    bmesh.ops.delete(bm, geom=faces[:2], context="FACES")
    bm.to_mesh(o.data)
    bm.free()
    for poly in o.data.polygons:
        poly.use_smooth = False
    return o


def palisade(name, center, radius, a0, a1, count):
    p = []
    for i in range(count):
        a = a0 + (a1 - a0) * i / (count - 1)
        h = random.uniform(1.6, 2.4)
        lean = random.uniform(-0.15, 0.15)
        x, y = math.cos(a) * radius + center[0], math.sin(a) * radius + center[1]
        p.append(cyl(f"{name}_log{i}", 0.12, h, (x, y, h / 2), (lean, lean * 0.5, 0), WOOD if i % 4 else CHAR, verts=6))
        p.append(cone(f"{name}_tip{i}", 0.12, 0.3, (x, y, h + 0.15), (lean, lean * 0.5, 0), WOOD, verts=6))
    return group(name, p)


def crater(name, loc, r):
    p = []
    n = 9
    for i in range(n):
        a = i / n * math.tau + random.uniform(-0.15, 0.15)
        p.append(rock(f"{name}_lip{i}", r * 0.35, (math.cos(a) * r, math.sin(a) * r, 0.02), DIRT))
    p.append(box(f"{name}_scorch", (r * 1.6, r * 1.6, 0.02), (0, 0, 0.005), (0, 0, random.uniform(0, 1)), CHAR))
    return group(name, p, loc, 0)


def barrels_and_crates(name, loc, yaw):
    p = []
    for i in range(3):
        p.append(cyl(f"{name}_barrel{i}", 0.3, 0.8, (i * 0.62, 0, 0.4), material=WOOD, verts=8))
        p.append(cyl(f"{name}_hoop{i}", 0.31, 0.06, (i * 0.62, 0, 0.62), material=IRON, verts=8))
    p.append(cyl(f"{name}_fallen", 0.3, 0.8, (0.5, 0.75, 0.3), (math.pi / 2, 0, 0.6), WOOD, verts=8))
    p.append(box(f"{name}_crate1", (0.7, 0.7, 0.7), (-0.8, 0.1, 0.35), (0, 0, 0.3)))
    p.append(box(f"{name}_crate2", (0.6, 0.6, 0.6), (-0.75, 0.15, 1.0), (0, 0, 0.8), CHAR))
    return group(name, p, loc, yaw)


def weapon_rack(name, loc, yaw):
    p = [box(f"{name}_beam", (1.8, 0.1, 0.1), (0, 0, 1.0)),
         box(f"{name}_foot1", (0.1, 0.6, 1.0), (-0.85, 0, 0.5)),
         box(f"{name}_foot2", (0.1, 0.6, 1.0), (0.85, 0, 0.5))]
    for i in range(5):
        x = -0.7 + i * 0.35
        p.append(cyl(f"{name}_spear{i}", 0.02, 2.0, (x, 0.08, 1.0), (0.18, 0, 0), WOOD, verts=4))
        p.append(cone(f"{name}_head{i}", 0.05, 0.22, (x, 0.26, 2.0), (0.18, 0, 0), IRON, verts=4))
    return group(name, p, loc, yaw)


# --------------------------------------------------------------- layout ---
# Front of the player is +Y. Keep the charge lane and the player's circle clear.
pieces = [
    ruined_wall("wall_left", 3.5, 1.8, (-6.0, 3.0, 0), 0.35),
    ruined_wall("wall_right", 3.0, 1.4, (6.2, 2.4, 0), -0.4),
    ruined_wall("wall_back", 4.0, 1.2, (2.5, -7.0, 0), 0.15),
    catapult("catapult_wreck", (6.8, 6.6, 0), -0.6),
    siege_tower("siege_tower", (-7.4, 7.2, 0), 0.25),
    cart("cart_overturned", (-4.8, -3.8, 0), 0.7),
    tent("tent_gold", (5.6, -4.6, 0), 0.2, CLOTH_GOLD),
    tent("tent_violet", (-6.6, -0.9, 0), 1.1, CLOTH_VIOLET),
    palisade("palisade", (0.0, 0.0), 8.6, math.radians(200), math.radians(340), 22),
    crater("crater_a", (3.2, 5.6, 0), 0.8),
    crater("crater_b", (-3.6, 6.2, 0), 0.65),
    crater("crater_c", (4.6, -1.6, 0), 0.55),
    barrels_and_crates("supplies", (3.4, -5.6, 0), 0.4),
    weapon_rack("weapon_rack", (-3.2, -5.8, 0), -0.3),
]

fires = [
    fire("FIRE_tower", (-7.4, 7.2, 0.3)),
    fire("FIRE_catapult", (6.6, 6.2, 0.5)),
    fire("FIRE_cart", (-4.6, -3.6, 0.6)),
    fire("FIRE_tent", (5.6, -4.6, 0.3)),
    fire("FIRE_wall", (-6.2, 3.4, 0.2)),
]

tris = sum(sum(len(p.vertices) - 2 for p in o.data.polygons) for o in pieces)
print(f"WAR_PROPS pieces={len(pieces)} fires={len(fires)} triangles={tris}")

# ---------------------------------------------------------------- export ---
bpy.ops.object.select_all(action="DESELECT")
bpy.ops.export_scene.gltf(
    filepath=OUT,
    export_format="GLB",
    export_yup=True,
    export_apply=True,
    export_extras=False,
    use_selection=False,
)
print(f"WAR_PROPS wrote {OUT}")

# --------------------------------------------------------------- preview ---
if PREVIEW:
    ground = None
    bpy.ops.mesh.primitive_circle_add(vertices=48, radius=10, fill_type="NGON", location=(0, 0, -0.01))
    ground = bpy.context.active_object
    finish(ground, DIRT)
    sun = bpy.data.lights.new("sun", "SUN")
    sun.energy = 3.0
    sun_obj = bpy.data.objects.new("sun", sun)
    sun_obj.rotation_euler = Euler((math.radians(50), 0, math.radians(30)))
    collection.objects.link(sun_obj)
    cam = bpy.data.cameras.new("cam")
    cam.lens = 22
    cam_obj = bpy.data.objects.new("cam", cam)
    cam_obj.location = (0, -12.5, 7.5)
    direction = Vector((0, 1.5, 0.5)) - cam_obj.location
    cam_obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    collection.objects.link(cam_obj)
    scene.camera = cam_obj
    scene.render.engine = "BLENDER_WORKBENCH"
    scene.display.shading.light = "STUDIO"
    scene.display.shading.color_type = "MATERIAL"
    scene.display.shading.show_shadows = True
    scene.display.shading.show_cavity = True
    scene.render.resolution_x = 1280
    scene.render.resolution_y = 720
    scene.render.filepath = PREVIEW
    bpy.ops.render.render(write_still=True)
    print(f"WAR_PROPS preview {PREVIEW}")
