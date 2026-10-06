"""
Generates the WeaveSources identity: mark, horizontal & primary lockups,
on-light / on-dark versions, favicon sources, and the path data used by the
site's <Logo> component. Text is converted to outlines so files render the
same everywhere (business cards, invoices, labels).

    pip install fonttools brotli && python3 scripts/make_logo.py
"""
import json, os
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NM = os.path.join(ROOT, "node_modules")
OUT = os.path.join(ROOT, "public", "brand")
os.makedirs(OUT, exist_ok=True)

INK, PAPER, CLAY = "#1d1c1a", "#f5f2ec", "#a14a2a"
WORD, TAG = "WeaveSources", "GLOBAL TEXTILE SOURCING"

# ── Mark: a 3×3 plain weave turned 45°. Threads pass over and under in turn.
def mark_lines(w=2.0, gap=1.15, pitch=6.2, span=20, n=3):
    c = 16
    pos = [c + (i - (n - 1) / 2) * pitch for i in range(n)]
    lo, hi, k = c - span / 2, c + span / 2, w / 2 + gap
    over = lambda i, j: (i + j) % 2 == 0
    segs = []
    for i, x in enumerate(pos):
        cuts = [lo]
        for j, y in enumerate(pos):
            if not over(i, j): cuts += [y - k, y + k]
        cuts.append(hi)
        segs += [(x, cuts[a], x, cuts[a + 1]) for a in range(0, len(cuts), 2)]
    for j, y in enumerate(pos):
        cuts = [lo]
        for i, x in enumerate(pos):
            if over(i, j): cuts += [x - k, x + k]
        cuts.append(hi)
        segs += [(cuts[a], y, cuts[a + 1], y) for a in range(0, len(cuts), 2)]
    return segs

MARK = dict(n=int(os.environ.get("N", 3)), pitch=float(os.environ.get("P", 6.4)), span=float(os.environ.get("S", 21)))
def mark_lines_cfg(w, gap): return mark_lines(w, gap, MARK["pitch"], MARK["span"], MARK["n"])
def mark_group(color, w=float(os.environ.get("W", 1.9)), gap=float(os.environ.get("G", 1.05))):
    d = " ".join(f"M{x1:.2f} {y1:.2f}L{x2:.2f} {y2:.2f}" for x1, y1, x2, y2 in mark_lines_cfg(w, gap))
    return f'<path d="{d}" transform="rotate(45 16 16)" fill="none" stroke="{color}" stroke-width="{w}" stroke-linecap="round"/>'

# ── Text outlines
def load(path, wght=None):
    f = TTFont(path)
    if wght is not None and "fvar" in f:
        f = instantiateVariableFont(f, {"wght": wght})
    return f

def outline(font, text, size, tracking_em):
    gs, cmap = font.getGlyphSet(), font.getBestCmap()
    upm = font["head"].unitsPerEm
    s = size / upm
    hmtx = font["hmtx"]
    x, parts = 0.0, []
    for i, ch in enumerate(text):
        gname = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        gs[gname].draw(TransformPen(pen, (s, 0, 0, -s, x, 0)))
        parts.append(pen.getCommands())
        x += hmtx[gname][0] * s
        if i < len(text) - 1: x += tracking_em * size
    d = " ".join(parts)
    bp = BoundsPen(gs)
    cap = font["OS/2"].sCapHeight * s if hasattr(font["OS/2"], "sCapHeight") else 0.7 * size
    return d, x, cap

sans = load(os.path.join(NM, "@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2"), wght=600)
mono = load(os.path.join(NM, "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2"))

WORD_SIZE, WORD_TRACK = 20, -0.015
wd, ww, wcap = outline(sans, WORD, WORD_SIZE, WORD_TRACK)
td, tw, tcap = outline(mono, TAG, 7.6, 0.16)

def svg(w, h, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" width="{w:.0f}" height="{h:.0f}" role="img" aria-label="{title}">'
            f"<title>{title}</title>{body}</svg>\n")

def write(name, content):
    with open(os.path.join(OUT, name), "w") as f: f.write(content)

# Mark (32 viewBox)
for tag, col in (("on-light", INK), ("on-dark", PAPER)):
    write(f"weavesources-mark-{tag}.svg", svg(32, 32, mark_group(col), "WeaveSources"))

# Horizontal: mark 32 tall, wordmark cap-height centred on mark
GAP = 12
def horizontal(col, bg=None):
    h = 32
    w = 32 + GAP + ww
    ty = 16 + wcap / 2
    body = (f'<rect width="{w:.2f}" height="{h}" fill="{bg}"/>' if bg else "") + mark_group(col) + \
           f'<path d="{wd}" transform="translate({32 + GAP} {ty:.2f})" fill="{col}"/>'
    return w, h, body
for tag, col in (("on-light", INK), ("on-dark", PAPER)):
    w, h, body = horizontal(col)
    write(f"weavesources-horizontal-{tag}.svg", svg(w, h, body, "WeaveSources"))

# Primary (stacked): mark, wordmark, tagline
def primary(col, tagcol):
    w = max(ww, tw) + 8
    mark_s = 56
    y_word = mark_s + 22 + wcap
    y_tag = y_word + 14 + tcap
    h = y_tag + 4
    body = (f'<g transform="translate({(w - mark_s) / 2:.2f} 0) scale({mark_s / 32})">{mark_group(col)}</g>'
            f'<path d="{wd}" transform="translate({(w - ww) / 2:.2f} {y_word:.2f})" fill="{col}"/>'
            f'<path d="{td}" transform="translate({(w - tw) / 2:.2f} {y_tag:.2f})" fill="{tagcol}"/>')
    return w, h, body
for tag, col, tcol in (("on-light", INK, "#6f6a62"), ("on-dark", PAPER, "#b9af9f")):
    w, h, body = primary(col, tcol)
    write(f"weavesources-primary-{tag}.svg", svg(w, h, body, "WeaveSources — Global Textile Sourcing"))

# Compact mark in a tile (social avatar, favicon, app icon). Heavier strokes for small sizes.
def tile(fg, bg, w=None, gap=None, inset=0.0):
    w = w or float(os.environ.get('TW', 3.1)); gap = gap or float(os.environ.get('TG', 1.0))
    return f'<rect width="32" height="32" rx="7" fill="{bg}"/><g transform="translate(16 16) scale({1 - inset}) translate(-16 -16)">{mark_group(fg, w, gap)}</g>'
write("weavesources-tile-dark.svg", svg(32, 32, tile(PAPER, INK, inset=0.12), "WeaveSources"))
write("weavesources-tile-light.svg", svg(32, 32, tile(INK, PAPER, inset=0.12), "WeaveSources"))
icon = svg(32, 32, tile(PAPER, INK, inset=0.1), "WeaveSources")
with open(os.path.join(ROOT, "src", "app", "icon.svg"), "w") as f: f.write(icon)

# Path data for the React <Logo> component
with open(os.path.join(ROOT, "src", "content", "brand-paths.json"), "w") as f:
    json.dump({"mark": " ".join(f"M{a:.2f} {b:.2f}L{c:.2f} {d:.2f}" for a, b, c, d in mark_lines_cfg(float(os.environ.get("W", 1.9)), float(os.environ.get("G", 1.05)))),
               "markStroke": float(os.environ.get("W", 1.9)),
               "word": wd, "wordWidth": round(ww, 2), "wordCap": round(wcap, 2),
               "tag": td, "tagWidth": round(tw, 2), "tagCap": round(tcap, 2)}, f)
print("ok", round(ww, 1), round(wcap, 2), round(tw, 1))
