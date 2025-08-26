# Decimal Builders — Next.js App

A production-ready starter aligned to your request: Next.js (App Router), Tailwind (brand color **#958f39**),
shadcn-style UI primitives, Material UI (cards/stepper/inputs), dark mode, Lucide icons, Recharts (charts),
Leaflet map, PDF viewer, WhatsApp chat, responsive header with hamburger, and all requested pages.

## Quick start
```bash
pnpm i   # or npm i / yarn
pnpm dev # http://localhost:3000
```

## Notes
- Dark/light theming via `next-themes`. Brand color set in `tailwind.config.ts` and CSS variables.
- MUI is integrated using `@mui/material-nextjs/v14-appRouter` provider in `lib/providers.tsx`.
- Routes match your screenshot. Edit page content in `app/*/page.tsx`.
- PDF upload/preview: **/floor-plans**.
- Estimator with Stepper & inputs: **/estimators**.
- Calculator with chart: **/cost-calculator**.
- WhatsApp floating button in bottom-right.
- Map on **/contact** (Dubai location).

## Deploy
You can deploy to Vercel (recommended). Set framework to **Next.js**.
# decimal-builders
