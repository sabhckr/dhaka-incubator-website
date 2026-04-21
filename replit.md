# Dhaka Incubator & Electronic

Static React + Vite + Tailwind CSS v4 marketing site for Dhaka Incubator & Electronic (Premium Egg Incubators in Bangladesh).

## Stack
- React 19, Vite 6, TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- lucide-react icons

## Project layout
- `index.html` — entry HTML, mounts `/src/main.tsx`
- `src/main.tsx` — React root
- `src/App.tsx` — landing page UI
- `src/index.css` — Tailwind import + base styles
- `vite.config.ts` — host 0.0.0.0, port 5000, allowedHosts true (Replit proxy)

## Run
- Dev: workflow `Start application` runs `npm run dev` on port 5000
- Build: `npm run build` → outputs to `dist/`

## Deployment
- Configured as `static` target: builds with `npm run build`, serves `dist/`.

## Notes
- Original repo from AI Studio had only config files; the React app entry/components were created during Replit setup.
- Vite watcher ignores `.local`, `.git`, `.cache`, `.agents` to avoid reload loops from agent state files.
