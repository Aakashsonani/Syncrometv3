from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
src = root / 'logo.png'
dst_png = root / 'assets' / 'logo.png'
dst_webp = root / 'assets' / 'logo.webp'

if not src.exists():
    raise SystemExit(f"Source logo not found: {src}")

# Ensure assets dir exists
dst_png.parent.mkdir(parents=True, exist_ok=True)

# Copy source to assets/logo.png
with Image.open(src) as im:
    # Preserve alpha if present, otherwise convert to RGBA so background stays transparent where needed
    if im.mode in ('RGBA', 'LA'):
        out = im.copy()
    else:
        out = im.convert('RGBA')
    out.save(dst_png, format='PNG')

# Save webp
with Image.open(dst_png) as im:
    im.save(dst_webp, format='WEBP', quality=90, method=6)

print(f"Saved: {dst_png}\nSaved: {dst_webp}")
