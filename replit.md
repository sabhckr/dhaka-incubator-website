# Dhaka Incubator & Electronic

Bilingual (English / বাংলা) e-commerce landing page with a built-in admin panel for the client to edit every product, image, video, price and label without touching code.

## Stack
- **Frontend:** React 19, Vite 6, TypeScript, Tailwind CSS v4, lucide-react, framer-motion, react-router-dom
- **Backend:** Node + Express, PostgreSQL (`pg`), bcryptjs, express-session, multer (file uploads)
- **Dev orchestration:** `concurrently` runs the Vite web server and the Express API together

## Run
- Workflow `Start application` runs `npm run dev`, which starts:
  - **Web** (Vite) on port `5000`
  - **API** (Express + tsx watch) on port `3001`
- Vite proxies `/api` and `/uploads` to the API server, so the public app is reached only through port 5000.
- Manual seed: `npm run seed` (idempotent — only inserts if tables are empty).
- TypeScript check: `npm run lint`.

## Public site
- `/` — bilingual landing page. All copy and product data are now fetched from `/api/content` on first paint, with the static files in `src/i18n.ts` and `src/data.ts` used as initial fallback.
- Components consume content via `useContent()` from `src/lib/content.tsx`.
- Hidden products (`in_stock = false`) are not shown publicly.

## Admin panel — `/admin`
- **Default credentials:** `admin` / `admin` — change immediately from the Password screen.
- Tabs:
  - **Products** — add/edit/delete, image upload, specs editor, price/old-price, low-stock badge, hide from site toggle.
  - **Categories** — add/rename/delete (with EN + BN names). Becomes the filter row on the public page.
  - **Hero & Video** — change the homepage headline, sub-headline, button labels and the background MP4 (paste URL or upload).
  - **Site Text** — every navbar / cart / trust / footer label, in both languages.
  - **Password** — change the admin password.
- Sessions are HTTP-only cookies; uploads go to `public/uploads/` and are served by Express.

## Database
- PostgreSQL via `DATABASE_URL`. Tables: `admin_users`, `settings` (key/value JSONB, holds the i18n bundle), `categories`, `products`.
- Schema was created during the initial backend setup; `server/seed.ts` only seeds rows.

## Project layout
- `index.html`, `src/main.tsx` — root with `BrowserRouter` + `ContentProvider` + routes for `/admin/*` and `/*`
- `src/App.tsx` — public landing page composition
- `src/components/*` — Hero, Navbar, ProductGrid, ProductModal, CartDrawer, TrustBadges, Testimonials, FAQ, Footer, FloatingWhatsApp
- `src/lib/content.tsx` — `ContentProvider` + `useContent()` hook
- `src/admin/*` — AdminApp, Login, ProductsPanel, CategoriesPanel, HeroPanel, ContentPanel, PasswordPanel, ImageInput
- `server/index.ts` — Express app: auth, content, products, categories, upload routes
- `server/db.ts` — `pg` pool helper
- `server/seed.ts` — seeds admin user, default i18n bundle, categories and products

## Deployment notes
- Static deployment is **no longer suitable** — the app now requires the Express server (Postgres + uploads + sessions). Use a server-style deployment (Replit Reserved VM / Autoscale with `npm run build` + a small production start script that serves `dist/` and runs the API).
- For multi-instance / autoscale use, replace local `public/uploads/` storage with object storage so files persist across instances.

## Notes
- Bengali copy is intentionally written in a casual, friendly shop-owner tone (with English loanwords like প্রোডাক্ট, ক্যাশ অন ডেলিভারি) — preserve that voice when adding new content.
- Vite watcher ignores `.local`, `.git`, `.cache`, `.agents`, `server`, and `public/uploads`.
