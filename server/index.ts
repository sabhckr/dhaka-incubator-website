import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import { q } from './db';
import { seed } from './seed';

const app = express();
const PORT = Number(process.env.SERVER_PORT || 3001);

app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dhaka-incubator-dev-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 24 * 30 },
  }),
);

declare module 'express-session' {
  interface SessionData { userId?: number; username?: string; }
}

// ---------- uploads ----------
const UPLOAD_DIR = path.resolve(process.cwd(), 'public/uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOAD_DIR),
  filename: (_, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}-${safe}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });
app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '1h' }));

// ---------- helpers ----------
function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!req.session.userId) return res.status(401).json({ error: 'unauthorized' });
  next();
}

// ---------- auth ----------
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'missing fields' });
  const rows = await q<{ id: number; username: string; password_hash: string }>(
    'SELECT id, username, password_hash FROM admin_users WHERE username = $1', [username],
  );
  if (rows.length === 0) return res.status(401).json({ error: 'invalid credentials' });
  const ok = await bcrypt.compare(password, rows[0].password_hash);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });
  req.session.userId = rows[0].id;
  req.session.username = rows[0].username;
  res.json({ ok: true, username: rows[0].username });
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get('/api/auth/me', (req, res) => {
  if (!req.session.userId) return res.json({ user: null });
  res.json({ user: { username: req.session.username } });
});

app.post('/api/auth/change-password', requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  if (!currentPassword || !newPassword || newPassword.length < 4)
    return res.status(400).json({ error: 'password too short' });
  const rows = await q<{ password_hash: string }>(
    'SELECT password_hash FROM admin_users WHERE id = $1', [req.session.userId],
  );
  if (!rows.length || !(await bcrypt.compare(currentPassword, rows[0].password_hash)))
    return res.status(401).json({ error: 'current password wrong' });
  const hash = await bcrypt.hash(newPassword, 10);
  await q('UPDATE admin_users SET password_hash = $1 WHERE id = $2', [hash, req.session.userId]);
  res.json({ ok: true });
});

// ---------- public content ----------
app.get('/api/content', async (_req, res) => {
  const settings = await q<{ key: string; value: any }>('SELECT key, value FROM settings');
  const cats = await q(
    'SELECT slug, name_en, name_bn, sort_order FROM categories ORDER BY sort_order, id',
  );
  const products = await q(
    `SELECT id, slug, name_en, name_bn, category_slug, price, old_price, image,
            description_en, description_bn, specs, in_stock, low_stock, sort_order
       FROM products ORDER BY sort_order, id`,
  );
  const map: Record<string, any> = {};
  for (const s of settings) map[s.key] = s.value;
  res.json({ i18n: map.i18n || {}, categories: cats, products });
});

// ---------- settings (i18n) ----------
app.put('/api/admin/i18n', requireAuth, async (req, res) => {
  const value = req.body;
  if (!value || typeof value !== 'object') return res.status(400).json({ error: 'invalid' });
  await q(
    `INSERT INTO settings (key, value, updated_at) VALUES ('i18n', $1, NOW())
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
    [JSON.stringify(value)],
  );
  res.json({ ok: true });
});

// ---------- categories ----------
app.post('/api/admin/categories', requireAuth, async (req, res) => {
  const { slug, name_en, name_bn } = req.body || {};
  if (!slug || !name_en || !name_bn) return res.status(400).json({ error: 'missing' });
  const last = await q<{ m: number | null }>('SELECT MAX(sort_order)::int as m FROM categories');
  const next = (last[0].m ?? -1) + 1;
  try {
    const r = await q(
      'INSERT INTO categories (slug, name_en, name_bn, sort_order) VALUES ($1,$2,$3,$4) RETURNING *',
      [slug, name_en, name_bn, next],
    );
    res.json(r[0]);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

app.put('/api/admin/categories/:id', requireAuth, async (req, res) => {
  const { name_en, name_bn, slug } = req.body || {};
  await q(
    'UPDATE categories SET name_en=$1, name_bn=$2, slug=$3 WHERE id=$4',
    [name_en, name_bn, slug, req.params.id],
  );
  res.json({ ok: true });
});

app.delete('/api/admin/categories/:id', requireAuth, async (req, res) => {
  const cat = await q<{ slug: string }>('SELECT slug FROM categories WHERE id=$1', [req.params.id]);
  if (!cat.length) return res.json({ ok: true });
  const used = await q<{ c: string }>(
    'SELECT COUNT(*)::text c FROM products WHERE category_slug = $1', [cat[0].slug],
  );
  if (Number(used[0].c) > 0)
    return res.status(400).json({ error: 'category in use by products' });
  await q('DELETE FROM categories WHERE id=$1', [req.params.id]);
  res.json({ ok: true });
});

// ---------- products ----------
app.post('/api/admin/products', requireAuth, async (req, res) => {
  const p = req.body || {};
  const last = await q<{ m: number | null }>('SELECT MAX(sort_order)::int as m FROM products');
  const next = (last[0].m ?? -1) + 1;
  try {
    const r = await q(
      `INSERT INTO products
        (slug, name_en, name_bn, category_slug, price, old_price, image,
         description_en, description_bn, specs, in_stock, low_stock, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [
        p.slug, p.name_en, p.name_bn, p.category_slug, Number(p.price) || 0,
        p.old_price ? Number(p.old_price) : null, p.image || '',
        p.description_en || '', p.description_bn || '',
        JSON.stringify(p.specs || []),
        p.in_stock !== false, !!p.low_stock, next,
      ],
    );
    res.json(r[0]);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

app.put('/api/admin/products/:id', requireAuth, async (req, res) => {
  const p = req.body || {};
  try {
    await q(
      `UPDATE products SET
         slug=$1, name_en=$2, name_bn=$3, category_slug=$4, price=$5, old_price=$6,
         image=$7, description_en=$8, description_bn=$9, specs=$10,
         in_stock=$11, low_stock=$12
       WHERE id=$13`,
      [
        p.slug, p.name_en, p.name_bn, p.category_slug, Number(p.price) || 0,
        p.old_price ? Number(p.old_price) : null, p.image || '',
        p.description_en || '', p.description_bn || '',
        JSON.stringify(p.specs || []),
        p.in_stock !== false, !!p.low_stock,
        req.params.id,
      ],
    );
    res.json({ ok: true });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

app.delete('/api/admin/products/:id', requireAuth, async (req, res) => {
  await q('DELETE FROM products WHERE id=$1', [req.params.id]);
  res.json({ ok: true });
});

// ---------- upload ----------
app.post('/api/admin/upload', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'no file' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

// ---------- bootstrap ----------
seed().then(() => {
  app.listen(PORT, '0.0.0.0', () => console.log(`[server] listening on :${PORT}`));
}).catch((e) => { console.error('[seed error]', e); process.exit(1); });
