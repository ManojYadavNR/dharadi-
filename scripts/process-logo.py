#!/usr/bin/env python3
"""Strip cream/white background from public/image.png → public/logo.png (circular mark only)."""
from PIL import Image

SRC = "public/image.png"
OUT = "public/logo.png"


def is_bg(r, g, b, a):
    if a < 20:
        return True
    # cream / white
    if r > 220 and g > 215 and b > 195:
        return True
    if r > 200 and g > 200 and b > 200 and abs(r - g) < 15 and abs(g - b) < 20:
        return True
    # black / near-black (export artifacts)
    if r < 35 and g < 35 and b < 35:
        return True
    return False


def main():
    im = Image.open(SRC).convert("RGBA")
    w, h = im.size
    pixels = im.load()

    min_x, min_y, max_x, max_y = w, h, 0, 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if not is_bg(r, g, b, a):
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)
            elif is_bg(r, g, b, a):
                pixels[x, y] = (r, g, b, 0)

    pad = 8
    cx = (min_x + max_x) // 2
    cy = (min_y + max_y) // 2
    side = max(max_x - min_x, max_y - min_y) + pad * 2
    left = max(0, cx - side // 2)
    top = max(0, cy - side // 2)
    right = min(w, left + side)
    bottom = min(h, top + side)
    cropped = im.crop((left, top, right, bottom))
    cropped = cropped.resize((256, 256), Image.Resampling.LANCZOS)
    cropped.save(OUT, "PNG")
    print(f"Wrote {OUT} ({cropped.size[0]}×{cropped.size[1]}, transparent background)")


if __name__ == "__main__":
    main()
