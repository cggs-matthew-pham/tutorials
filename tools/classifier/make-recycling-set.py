"""Make the recycling test set and training folders for the classifier board from TrashNet.

TrashNet (github.com/garythung/trashnet, MIT licence, Gary Thung and Mindy Yang): about 2,500 photos of paper, plastic,
cardboard, glass, metal and trash, each on a white posterboard. Download data/dataset-resized.zip from that repo, unzip
it and pass the dataset-resized folder:

    python3 tools/classifier/make-recycling-set.py path/to/dataset-resized

Writes playground-board/media/classifier/recycling/:
    test/<group>-<label>-<n>.jpg and test.json   the fixed test set the board marks (8 per group per class)
    recycling-biased.zip, recycling-good.zip      training folders to upload into Teachable Machine (one folder per class)

Groups: plain (as photographed), messy (the item cut out and put on a cluttered bench), dim (low light), squashed
(crumpled items at odd angles, cropped off centre), neither (glass and metal: not paper or plastic).
The messy bench is drawn (wood grain, pens, sticky notes) with real photos of other items on it. Fixed seed: running it
again makes the same set. Every image is used once across test and both training sets' plain photos.
"""
import io, json, random, sys, zipfile
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageChops

SIZE = 256
SRC = Path(sys.argv[1] if len(sys.argv) > 1 else 'dataset-resized')
OUT = Path(__file__).resolve().parents[2] / 'playground-board' / 'media' / 'classifier' / 'recycling'
rng = random.Random(20261010)


def files(cls):
    fs = sorted((SRC / cls).glob('*.jpg'))
    rng.shuffle(fs)
    return fs


def square(im):
    w, h = im.size
    s = min(w, h)
    return im.crop(((w - s) // 2, (h - s) // 2, (w + s) // 2, (h + s) // 2)).resize((SIZE, SIZE), Image.LANCZOS)


def mask_of(im):
    """The item, as a soft mask, found by its difference from the posterboard. None when it is not clean enough."""
    im = im.convert('RGB')
    w, h = im.size
    px = im.load()
    border = [px[x, y] for x in range(0, w, 4) for y in (0, 1, h - 2, h - 1)] + [px[x, y] for y in range(0, h, 4) for x in (0, 1, w - 2, w - 1)]
    bg = tuple(sorted(c[i] for c in border)[len(border) // 2] for i in range(3))
    diff = ImageChops.difference(im, Image.new('RGB', im.size, bg)).convert('L')
    # Shadows and posterboard vary gently; edges and colour do not.
    edges = im.convert('L').filter(ImageFilter.FIND_EDGES).filter(ImageFilter.MaxFilter(5))
    m = ImageChops.lighter(diff.point(lambda v: 255 if v > 38 else 0), edges.point(lambda v: 255 if v > 40 else 0))
    m = m.filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.MinFilter(9))
    ImageDraw.Draw(m).rectangle([0, 0, w - 1, h - 1], outline=0, width=6)   # the photo's own edge is not an edge
    # Fill holes: flood the background from the corners, then everything not reached is the item.
    inv = m.copy()
    for c in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
        if inv.getpixel(c) == 0:
            ImageDraw.floodfill(inv, c, 128)
    m = inv.point(lambda v: 0 if v == 128 else 255).filter(ImageFilter.MinFilter(5))
    hist = m.histogram()
    frac = hist[255] / (w * h)
    edge_on = sum(1 for x in range(0, w, 2) for y in (10, h - 11) if m.getpixel((x, y))) + sum(1 for y in range(0, h, 2) for x in (10, w - 11) if m.getpixel((x, y)))
    if not (0.08 < frac < 0.7) or edge_on > 0.12 * (w + h):
        return None
    return hull(m).filter(ImageFilter.GaussianBlur(2))


def hull(m):
    """Fill the mask's convex hull: a white sheet on a white board is found only where it is printed or shadowed."""
    w, h = m.size
    pts = sorted({(x, y) for y in range(0, h, 3) for x in range(0, w, 3) if m.getpixel((x, y))})
    if len(pts) < 3:
        return m
    cross = lambda o, a, b: (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    lo, hi = [], []
    for p in pts:
        while len(lo) >= 2 and cross(lo[-2], lo[-1], p) <= 0:
            lo.pop()
        lo.append(p)
    for p in reversed(pts):
        while len(hi) >= 2 and cross(hi[-2], hi[-1], p) <= 0:
            hi.pop()
        hi.append(p)
    out = Image.new('L', m.size, 0)
    ImageDraw.Draw(out).polygon(lo[:-1] + hi[:-1], fill=255)
    return out


def cutout(path):
    im = Image.open(path).convert('RGB')
    m = mask_of(im)
    if m is None:
        return None
    box = m.point(lambda v: 255 if v > 60 else 0).getbbox()
    return im.crop(box), m.crop(box)


def bench():
    """A cluttered wooden bench: grain, a mat, pens and sticky notes."""
    base = rng.choice([(150, 105, 70), (120, 85, 55), (175, 135, 95), (95, 90, 85)])
    im = Image.new('RGB', (SIZE, SIZE), base)
    d = ImageDraw.Draw(im)
    for y in range(0, SIZE, 3):
        k = rng.randint(-18, 18)
        d.line([(0, y), (SIZE, y + rng.randint(-6, 6))], fill=tuple(max(0, min(255, c + k)) for c in base), width=rng.randint(1, 3))
    if rng.random() < 0.5:
        x, y = rng.randint(-60, 120), rng.randint(-60, 120)
        d.rectangle([x, y, x + rng.randint(120, 200), y + rng.randint(80, 160)], fill=rng.choice([(40, 60, 50), (60, 60, 70), (30, 50, 80)]))
    for _ in range(rng.randint(4, 8)):
        kind = rng.random()
        x, y = rng.randint(0, SIZE), rng.randint(0, SIZE)
        col = rng.choice([(220, 50, 50), (40, 90, 200), (30, 30, 30), (250, 210, 40), (60, 170, 80), (240, 240, 235)])
        if kind < 0.45:   # a pen
            L, a = rng.randint(60, 120), rng.uniform(0, 3.14)
            import math
            d.line([(x, y), (x + L * math.cos(a), y + L * math.sin(a))], fill=col, width=rng.randint(5, 8))
        elif kind < 0.8:  # a sticky note or card
            s = rng.randint(30, 60)
            d.rectangle([x, y, x + s, y + s], fill=col)
        else:             # a mug ring or a coin
            r = rng.randint(10, 26)
            d.ellipse([x - r, y - r, x + r, y + r], outline=col, width=rng.randint(3, 6))
    return im.filter(ImageFilter.GaussianBlur(0.6))


def paste(canvas, item, scale, at=None):
    im, m = item
    k = scale * SIZE / max(im.size)
    im, m = im.resize((max(1, int(im.width * k)), max(1, int(im.height * k))), Image.LANCZOS), m.resize((max(1, int(m.width * k)), max(1, int(m.height * k))), Image.LANCZOS)
    a = rng.uniform(-40, 40)
    im, m = im.rotate(a, expand=True, resample=Image.BICUBIC), m.rotate(a, expand=True, resample=Image.BICUBIC)
    if at is None:
        at = ((SIZE - im.width) // 2 + rng.randint(-20, 20), (SIZE - im.height) // 2 + rng.randint(-20, 20))
    canvas.paste(im, at, m)


def messy(item, distractors):
    c = bench()
    for dist in distractors:   # other real items around the edges, partly off the bench
        paste(c, dist, rng.uniform(0.3, 0.45), (rng.choice([rng.randint(-60, 10), rng.randint(170, 220)]), rng.randint(-40, 200)))
    paste(c, item, rng.uniform(0.6, 0.75))
    return c


def dim(path):
    im = square(Image.open(path).convert('RGB'))
    im = ImageEnhance.Brightness(im).enhance(rng.uniform(0.28, 0.42))
    im = ImageEnhance.Contrast(im).enhance(0.8)
    tint = Image.new('RGB', im.size, rng.choice([(255, 200, 120), (140, 170, 255)]))
    im = Image.blend(im, ImageChops.multiply(im, tint), 0.6)
    noise = Image.effect_noise(im.size, 28).convert('RGB')
    return Image.blend(im, ImageChops.multiply(im, noise), 0.25).filter(ImageFilter.GaussianBlur(0.8))


def squashed(path):
    im = Image.open(path).convert('RGB')
    w, h = im.size
    px = im.load()
    bg = px[2, 2]
    im = im.rotate(rng.choice([1, -1]) * rng.uniform(35, 75), resample=Image.BICUBIC, fillcolor=bg)
    s = int(min(w, h) * rng.uniform(0.55, 0.7))   # zoomed in and off centre: part of the item is cut off
    x, y = rng.randint(0, w - s), rng.randint(0, h - s)
    return im.crop((x, y, x + s, y + s)).resize((SIZE, SIZE), Image.LANCZOS)


def busy(im):
    """True when there is something in the picture (not mostly bare board)."""
    from PIL import ImageStat
    return ImageStat.Stat(im.convert('L').filter(ImageFilter.FIND_EDGES)).mean[0] > 6


def save(im, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, quality=82)


def jpeg(im):
    b = io.BytesIO()
    im.save(b, 'JPEG', quality=82)
    return b.getvalue()


def main():
    paper, plastic = files('paper'), files('plastic')
    glass, metal, trash = files('glass'), files('metal'), files('trash')
    other = glass[60:] + metal[60:] + trash[60:]
    rng.shuffle(other)

    def take(lst, n, cut=False):
        out = []
        while len(out) < n:
            f = lst.pop()
            if cut:
                c = cutout(f)
                if c is None:
                    continue
                out.append((f, c))
            else:
                out.append(f)
        return out

    distractor_pool = []
    while len(distractor_pool) < 16:
        c = cutout(other.pop())
        if c:
            distractor_pool.append(c)

    test, tests = OUT / 'test', []
    if test.exists():
        for f in test.glob('*.jpg'):
            f.unlink()
    for label, lst in (('Paper', paper), ('Plastic', plastic)):
        groups = {
            'plain': [square(Image.open(f).convert('RGB')) for f in take(lst, 4)],
            'messy': [messy(c, rng.sample(distractor_pool, rng.randint(2, 3))) for f, c in take(lst, 4, cut=True)],
            'dim': [dim(f) for f in take(lst, 4)],
            'squashed': [squashed(f) for f in take(lst, 4)],
        }
        for g, ims in groups.items():
            for i, im in enumerate(ims, 1):
                name = f'{g}-{label.lower()}-{i}.jpg'
                save(im, test / name)
                tests.append({'label': label, 'group': g, 'src': 'test/' + name})
    neither = [f for f in glass[40:60] if busy(square(Image.open(f)))][:4] + [f for f in metal[40:60] if busy(square(Image.open(f)))][:4]
    for i, f in enumerate(neither, 1):
        name = f'neither-{f.parent.name}-{i}.jpg'
        save(square(Image.open(f).convert('RGB')), test / name)
        tests.append({'label': 'Neither', 'group': 'neither', 'src': 'test/' + name})

    manifest = {
        'title': 'Recycling: paper or plastic',
        'classes': ['Paper', 'Plastic'],
        'groups': {'plain': 'Plain background', 'messy': 'Messy bench', 'dim': 'Low light', 'squashed': 'Crumpled, odd angles', 'neither': 'Not paper or plastic'},
        'credit': 'Photos from TrashNet (Gary Thung and Mindy Yang, MIT licence); messy benches, low light and crops made from them.',
        'images': tests,
    }
    (OUT / 'test.json').write_text(json.dumps(manifest, indent=1) + '\n')

    # Training folders: biased = 30 plain photos per class; good = varied photos per class plus a Neither class.
    def zipped(name, classes):
        with zipfile.ZipFile(OUT / name, 'w', zipfile.ZIP_STORED) as z:
            z.writestr('README.txt', 'Upload each folder into its own class in Teachable Machine (Image Project, Standard; '
                       'on a class, choose Upload and select all the photos in its folder).\n\n' + manifest['credit'] + '\n')
            for cls, ims in classes.items():
                for i, im in enumerate(ims, 1):
                    z.writestr(f'{cls}/{cls.lower()}-{i:02d}.jpg', jpeg(im))

    biased = {label: [square(Image.open(f).convert('RGB')) for f in take(lst, 30)] for label, lst in (('Paper', paper), ('Plastic', plastic))}
    zipped('recycling-biased.zip', biased)
    good = {}
    for label, lst in (('Paper', paper), ('Plastic', plastic)):
        good[label] = ([square(Image.open(f).convert('RGB')) for f in take(lst, 10)]
                       + [messy(c, rng.sample(distractor_pool, rng.randint(2, 3))) for f, c in take(lst, 10, cut=True)]
                       + [dim(f) for f in take(lst, 5)] + [squashed(f) for f in take(lst, 5)])
    good['Neither'] = [square(Image.open(f).convert('RGB')) for f in (glass[50:60] + metal[50:60] + trash[50:60])]
    zipped('recycling-good.zip', good)
    print(f'{len(tests)} test images, biased {sum(map(len, biased.values()))}, good {sum(map(len, good.values()))} training photos -> {OUT}')


main()
