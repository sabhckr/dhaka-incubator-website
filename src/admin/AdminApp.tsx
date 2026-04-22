import { useEffect, useState } from 'react';
import { Routes, Route, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { LogOut, Package, Tags, Languages, Image as ImageIcon, KeyRound, ExternalLink } from 'lucide-react';
import { adminApi } from './api';
import Login from './Login';
import ProductsPanel from './ProductsPanel';
import CategoriesPanel from './CategoriesPanel';
import ContentPanel from './ContentPanel';
import HeroPanel from './HeroPanel';
import PasswordPanel from './PasswordPanel';
import { useContent } from '../lib/content';

export default function AdminApp() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  const { reload } = useContent();

  useEffect(() => {
    adminApi.me().then((r) => { setUser(r.user); setLoading(false); });
  }, []);

  async function logout() {
    await adminApi.logout();
    setUser(null);
    nav('/admin');
  }

  if (loading) {
    return <div className="min-h-screen grid place-items-center text-slate-500">Loading…</div>;
  }

  if (!user) return <Login onLogin={(u) => setUser(u)} />;

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
      isActive ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-100'
    }`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 px-5 flex items-center gap-2 border-b border-slate-100">
          <div className="w-9 h-9 rounded-lg bg-orange-500 text-white grid place-items-center font-black text-sm">DI</div>
          <div>
            <div className="text-sm font-bold">Admin Panel</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-400">Dhaka Incubator</div>
          </div>
        </div>
        <nav className="p-3 space-y-1 flex-1">
          <NavLink to="/admin/products" className={linkCls}><Package className="w-4 h-4" />Products</NavLink>
          <NavLink to="/admin/categories" className={linkCls}><Tags className="w-4 h-4" />Categories</NavLink>
          <NavLink to="/admin/hero" className={linkCls}><ImageIcon className="w-4 h-4" />Hero & Video</NavLink>
          <NavLink to="/admin/content" className={linkCls}><Languages className="w-4 h-4" />Site Text (EN / বাং)</NavLink>
          <NavLink to="/admin/password" className={linkCls}><KeyRound className="w-4 h-4" />Password</NavLink>
        </nav>
        <div className="p-3 border-t border-slate-100 space-y-2">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-500 hover:bg-slate-100">
            <ExternalLink className="w-3.5 h-3.5" /> View site
          </a>
          <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-600 hover:bg-rose-50">
            <LogOut className="w-3.5 h-3.5" /> Logout ({user.username})
          </button>
        </div>
      </aside>
      <main className="ml-64 p-8 max-w-6xl">
        <Routes>
          <Route path="/" element={<Navigate to="/admin/products" replace />} />
          <Route path="/products" element={<ProductsPanel onSaved={reload} />} />
          <Route path="/categories" element={<CategoriesPanel onSaved={reload} />} />
          <Route path="/hero" element={<HeroPanel onSaved={reload} />} />
          <Route path="/content" element={<ContentPanel onSaved={reload} />} />
          <Route path="/password" element={<PasswordPanel />} />
        </Routes>
      </main>
    </div>
  );
}
