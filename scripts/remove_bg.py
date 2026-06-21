from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
src = root / 'assets' / 'logo.png'
dst_png = root / 'assets' / 'logo_alpha.png'
dst_webp = root / 'assets' / 'logo_alpha.webp'

if not src.exists():
    raise SystemExit(f"Source logo not found: {src}")

print('Opening', src)
with Image.open(src) as im:
    im = im.convert('RGBA')
    pixels = im.load()
    w,h = im.size
    # Make near-black pixels transparent
    # threshold can be tuned; currently uses luminance < 24
    def lum(r,g,b):
        return 0.2126*r + 0.7152*g + 0.0722*b
    thresh = 24
    for y in range(h):
        for x in range(w):
            r,g,b,a = pixels[x,y]
            if lum(r,g,b) < thresh:
                pixels[x,y] = (r,g,b,0)
    im.save(dst_png, 'PNG')
    im.save(dst_webp, 'WEBP', quality=90, method=6)

print(f'Saved transparent PNG: {dst_png}')
print(f'Saved webp: {dst_webp}')
