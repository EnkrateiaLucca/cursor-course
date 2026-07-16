# Image PDF Layout

Upload images, arrange them on printable pages, and save as PDF via the browser print dialog.

## Features

- Drag-and-drop image upload (JPG, PNG, WebP, HEIC, and more)
- Multi-page A4 / Letter layouts with margin guides
- Drag to move, corner handles to resize (aspect ratio locked)
- Image tray sidebar — drag thumbnails onto pages
- Auto-arrange grid, snap-to-grid, keyboard nudge (arrow keys)
- Zoom controls for workspace preview
- Dark mode
- Save PDF via browser print dialog

## Local Development

```bash
cd sections/01-cursor-intro/image-pdf-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Deploy

The app is **not currently deployed**. See **[DEPLOY-GUIDE.md](./DEPLOY-GUIDE.md)** for the full path from prototype → public launch → auth → payments.

Quick redeploy when ready:

```bash
cd sections/01-cursor-intro/image-pdf-app
npm run build
vercel deploy --prod
```

## Project Structure

```
app/           Route shell, global styles, print CSS
components/    UI pieces (toolbar, canvas, image tray, etc.)
hooks/         Editor state and pointer interaction
lib/           Pure utilities (layout math, image processing)
types/         TypeScript data shapes
```

## Tech Stack

- Next.js 15 (App Router)
- TypeScript, Tailwind CSS v4
- shadcn/ui, next-themes, react-dropzone, heic2any, sonner

## Reference

The single-file HTML prototype lives at [`../image-pdf-layout.html`](../image-pdf-layout.html).
