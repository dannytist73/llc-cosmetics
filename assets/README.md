# LLC Cosmetic — Downloaded Media

Downloaded from https://llccosmetic.com/ for the new project build.

## Folder structure

| Folder | Contents |
|--------|----------|
| `logos/` | Square logo, full logo, white hero logo |
| `services/` | 8 treatment tiles + Pico/HIFU layout graphics |
| `staff/` | Team portrait images (9 people) |
| `clinics/` | Brisbane, Sunnybank, Southport, Robina photos |
| `video/` | **Hero** background (`hero-video.mp4`), hero poster, plus consultation video |

## Inventory

See `manifest.csv` for source URLs, file sizes, and download status.

## Hero video (important)

The live site hero uses **YouTube**, not the consultation clip:

- Source: https://www.youtube.com/watch?v=aShBWRpDOyU (loops seconds 1–30)
- Local: `video/hero-video.mp4` (~10 MB), `video/hero-video-poster.jpg`

`consult-video.mp4` is only for the “What we do best” section on the original site.

## Re-download

```powershell
powershell -ExecutionPolicy Bypass -File ..\download-media.ps1
powershell -ExecutionPolicy Bypass -File ..\download-hero-video.ps1
```

## Note

`logos/logo-schema.png` (schema.org placeholder at `/wp-content/uploads/logo.png`) failed to download — use `logo-full.png` or `logo-square.png` instead.
