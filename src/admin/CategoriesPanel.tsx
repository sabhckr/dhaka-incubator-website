import { useEffect, useState } from 'react';
import { Plus, Save, Trash2, X } from 'lucide-react';
import { adminApi } from './api';

type C = { id?: number; slug: string; name_en: string; name_bn: string };

export default function CategoriesPanel({ onSaved }: { onSaved: () => void }) {
  const [items, setItems] = useState<C[]>([]);
  const [editing, setEditing] = useState<C | null>(null);
  const [err, setErr] = useState('');

  async function load() {
    const c = await adminApi.content();
    setItems(c.categories);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    setErr('');
    try {
      if (editing.id) await adminApi.updateCategory(editing.id, editing);
      else await adminApi.createCategory(editing);
      setEditing(null); await load(); onSaved();
    } catch (e: any) { setErr(e.message); }
  }

  async function del(c: C) {
    if (!c.id) return;
    if (!confirm(`Delete category "${c.name_en}"?`)) return;
    try { await adminApi.deleteCategory(c.id); await load(); onSaved(); }
    catch (e: any) { alert(e.message); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">Categories</h1>
          <p className="text-sm text-slate-500">Used for product filters on the site.</p>
        </div>
        <button onClick={() => setEditing({ slug: '', name_en: '', name_bn: '' })} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600">
          <Plus className="w-4 h-4" />Add Category
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100">
        {items.map((c) => (
          <div key={c.id} className="px-5 py-3 flex items-center justify-between">
            <div>
              <div className="font-bold text-sm">{c.name_en}</div>
              <div className="font-bn text-xs text-slate-500">{c.name_bn}</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-400 mt-0.5">slug: {c.slug}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(c)} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200">Edit</button>
              <button onClick={() => del(c)} className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="p-8 text-center text-slate-500 text-sm">No categories yet.</div>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="font-bold">{editing.id ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => setEditing(null)}><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Slug (used internally)</label>
                <input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="e.g. Solar" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Name (English)</label>
                <input value={editing.name_en} onChange={(e) => setEditing({ ...editing, name_en: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Name (Bengali)</label>
                <input value={editing.name_bn} onChange={(e) => setEditing({ ...editing, name_bn: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-bn" />
              </div>
              {err && <div className="text-rose-600 text-sm">{err}</div>}
            </div>
            <div className="p-5 border-t border-slate-100 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-slate-600 text-sm">Cancel</button>
              <button onClick={save} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold text-sm">
                <Save className="w-4 h-4" />Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
