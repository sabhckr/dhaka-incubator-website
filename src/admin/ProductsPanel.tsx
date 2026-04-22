import { useEffect, useState, type ReactNode } from 'react';
import { Plus, Trash2, Save, X, Pencil } from 'lucide-react';
import { adminApi } from './api';
import ImageInput from './ImageInput';

type Spec = { label: { en: string; bn: string }; value: string };
type P = {
  id?: number; slug: string;
  name_en: string; name_bn: string;
  category_slug: string;
  price: number; old_price: number | null;
  image: string;
  description_en: string; description_bn: string;
  specs: Spec[];
  in_stock: boolean; low_stock: boolean;
};

const empty: P = {
  slug: '', name_en: '', name_bn: '', category_slug: '',
  price: 0, old_price: null, image: '',
  description_en: '', description_bn: '',
  specs: [{ label: { en: '', bn: '' }, value: '' }],
  in_stock: true, low_stock: false,
};

export default function ProductsPanel({ onSaved }: { onSaved: () => void }) {
  const [items, setItems] = useState<P[]>([]);
  const [cats, setCats] = useState<{ slug: string; name_en: string }[]>([]);
  const [editing, setEditing] = useState<P | null>(null);
  const [err, setErr] = useState('');

  async function load() {
    const c = await adminApi.content();
    setItems(c.products);
    setCats(c.categories);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    setErr('');
    try {
      if (editing.id) await adminApi.updateProduct(editing.id, editing);
      else await adminApi.createProduct(editing);
      setEditing(null);
      await load();
      onSaved();
    } catch (e: any) { setErr(e.message); }
  }

  async function del(p: P) {
    if (!p.id) return;
    if (!confirm(`Delete "${p.name_en}"?`)) return;
    await adminApi.deleteProduct(p.id);
    await load();
    onSaved();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">Products</h1>
          <p className="text-sm text-slate-500">{items.length} product{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setEditing({ ...empty, category_slug: cats[0]?.slug || '' })}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600"
        ><Plus className="w-4 h-4" />Add Product</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="aspect-video bg-slate-100">
              {p.image && <img src={p.image} className="w-full h-full object-cover" />}
            </div>
            <div className="p-4">
              <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{p.category_slug}</div>
              <div className="font-bold text-sm mt-1 line-clamp-1">{p.name_en}</div>
              <div className="font-bn text-xs text-slate-500 mt-0.5 line-clamp-1">{p.name_bn}</div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-orange-600 font-black">৳ {p.price.toLocaleString()}</span>
                {p.old_price && <span className="text-xs text-slate-400 line-through">৳ {p.old_price.toLocaleString()}</span>}
              </div>
              <div className="mt-2 flex gap-1.5 text-[10px] uppercase font-bold tracking-wider">
                {!p.in_stock && <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">Hidden</span>}
                {p.low_stock && <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">Low stock</span>}
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => setEditing(p)} className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold">
                  <Pencil className="w-3 h-3" />Edit
                </button>
                <button onClick={() => del(p)} className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm grid place-items-center p-4 overflow-auto" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl">
              <h2 className="font-bold">{editing.id ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => setEditing(null)}><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <Field label="Slug (unique)"><input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className={inp} placeholder="e.g. inc-48" /></Field>
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Name (English)"><input value={editing.name_en} onChange={(e) => setEditing({ ...editing, name_en: e.target.value })} className={inp} /></Field>
                <Field label="Name (Bengali)"><input value={editing.name_bn} onChange={(e) => setEditing({ ...editing, name_bn: e.target.value })} className={inp + ' font-bn'} /></Field>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <Field label="Category">
                  <select value={editing.category_slug} onChange={(e) => setEditing({ ...editing, category_slug: e.target.value })} className={inp}>
                    {cats.map((c) => <option key={c.slug} value={c.slug}>{c.name_en}</option>)}
                  </select>
                </Field>
                <Field label="Price (৳)"><input type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} className={inp} /></Field>
                <Field label="Old price (optional)"><input type="number" value={editing.old_price ?? ''} onChange={(e) => setEditing({ ...editing, old_price: e.target.value ? Number(e.target.value) : null })} className={inp} /></Field>
              </div>
              <ImageInput value={editing.image} onChange={(url) => setEditing({ ...editing, image: url })} label="Product Image" />
              <Field label="Description (English)"><textarea rows={3} value={editing.description_en} onChange={(e) => setEditing({ ...editing, description_en: e.target.value })} className={inp} /></Field>
              <Field label="Description (Bengali)"><textarea rows={3} value={editing.description_bn} onChange={(e) => setEditing({ ...editing, description_bn: e.target.value })} className={inp + ' font-bn leading-relaxed'} /></Field>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-600">Specifications</label>
                  <button type="button" onClick={() => setEditing({ ...editing, specs: [...editing.specs, { label: { en: '', bn: '' }, value: '' }] })} className="text-xs text-orange-600 font-semibold">+ Add spec</button>
                </div>
                <div className="space-y-2">
                  {editing.specs.map((s, i) => (
                    <div key={i} className="grid grid-cols-12 gap-2 items-center">
                      <input value={s.label.en} onChange={(e) => { const sp = [...editing.specs]; sp[i] = { ...sp[i], label: { ...sp[i].label, en: e.target.value } }; setEditing({ ...editing, specs: sp }); }} placeholder="Label (EN)" className={inp + ' col-span-3 text-xs'} />
                      <input value={s.label.bn} onChange={(e) => { const sp = [...editing.specs]; sp[i] = { ...sp[i], label: { ...sp[i].label, bn: e.target.value } }; setEditing({ ...editing, specs: sp }); }} placeholder="Label (BN)" className={inp + ' col-span-3 text-xs font-bn'} />
                      <input value={s.value} onChange={(e) => { const sp = [...editing.specs]; sp[i] = { ...sp[i], value: e.target.value }; setEditing({ ...editing, specs: sp }); }} placeholder="Value" className={inp + ' col-span-5 text-xs'} />
                      <button type="button" onClick={() => setEditing({ ...editing, specs: editing.specs.filter((_, j) => j !== i) })} className="col-span-1 text-rose-500"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={editing.in_stock} onChange={(e) => setEditing({ ...editing, in_stock: e.target.checked })} /> Visible on site
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={editing.low_stock} onChange={(e) => setEditing({ ...editing, low_stock: e.target.checked })} /> Show "low stock" badge
                </label>
              </div>

              {err && <div className="text-rose-600 text-sm">{err}</div>}
            </div>
            <div className="p-5 border-t border-slate-100 flex justify-end gap-2 sticky bottom-0 bg-white rounded-b-2xl">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-slate-600 text-sm">Cancel</button>
              <button onClick={save} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm">
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inp = 'w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-orange-500 focus:outline-none text-sm';
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
      {children}
    </div>
  );
}
