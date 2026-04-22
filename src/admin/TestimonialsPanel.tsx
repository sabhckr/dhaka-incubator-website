import { useEffect, useState, type ReactNode } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { adminApi } from './api';

const COLORS = ['bg-orange-500', 'bg-rose-500', 'bg-emerald-500', 'bg-indigo-500', 'bg-amber-500', 'bg-sky-500', 'bg-violet-500', 'bg-teal-500'];

type Item = {
  name: string; initials: string; rating: number; color: string;
  city_en: string; city_bn: string; text_en: string; text_bn: string;
};

export default function TestimonialsPanel({ onSaved }: { onSaved: () => void }) {
  const [i18n, setI18n] = useState<any>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { adminApi.content().then((c) => setI18n(c.i18n)); }, []);
  if (!i18n) return <div>Loading…</div>;

  const block = i18n.testimonials || { items: [] };
  const items: Item[] = block.items || [];

  function setBlock(next: any) {
    setI18n({ ...i18n, testimonials: { ...block, ...next } });
  }
  function setItems(next: Item[]) { setBlock({ items: next }); }
  function update(idx: number, patch: Partial<Item>) {
    const next = items.slice(); next[idx] = { ...next[idx], ...patch };
    setItems(next);
  }

  async function save() {
    setBusy(true); setMsg('');
    try { await adminApi.saveI18n(i18n); setMsg('Saved!'); onSaved(); setTimeout(() => setMsg(''), 1500); }
    catch (e: any) { setMsg(e.message); }
    finally { setBusy(false); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">Testimonials</h1>
          <p className="text-sm text-slate-500">Customer reviews shown on the homepage.</p>
        </div>
        <button onClick={save} disabled={busy} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold disabled:opacity-50">
          <Save className="w-4 h-4" />{busy ? 'Saving…' : 'Save'}
        </button>
      </div>
      {msg && <div className="mb-4 text-sm text-emerald-600">{msg}</div>}

      <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-6 space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Section title (EN)"><input value={block.titleEn || ''} onChange={(e) => setBlock({ titleEn: e.target.value })} className={inp} /></Field>
          <Field label="Section title (BN)"><input value={block.titleBn || ''} onChange={(e) => setBlock({ titleBn: e.target.value })} className={inp + ' font-bn'} /></Field>
          <Field label="Micro label (EN)"><input value={block.microEn || ''} onChange={(e) => setBlock({ microEn: e.target.value })} className={inp} /></Field>
          <Field label="Micro label (BN)"><input value={block.microBn || ''} onChange={(e) => setBlock({ microBn: e.target.value })} className={inp + ' font-bn'} /></Field>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((it, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-start gap-4">
              <div className={`w-11 h-11 rounded-full ${it.color} text-white grid place-items-center font-bold text-sm shrink-0`}>{it.initials}</div>
              <div className="flex-1 grid sm:grid-cols-2 gap-3">
                <Field label="Name"><input value={it.name} onChange={(e) => update(idx, { name: e.target.value })} className={inp} /></Field>
                <Field label="Initials (2 letters)"><input value={it.initials} maxLength={3} onChange={(e) => update(idx, { initials: e.target.value })} className={inp} /></Field>
                <Field label="City (EN)"><input value={it.city_en} onChange={(e) => update(idx, { city_en: e.target.value })} className={inp} /></Field>
                <Field label="City (BN)"><input value={it.city_bn} onChange={(e) => update(idx, { city_bn: e.target.value })} className={inp + ' font-bn'} /></Field>
                <Field label="Rating (1–5)"><input type="number" min={1} max={5} value={it.rating} onChange={(e) => update(idx, { rating: Number(e.target.value) })} className={inp} /></Field>
                <Field label="Avatar color">
                  <select value={it.color} onChange={(e) => update(idx, { color: e.target.value })} className={inp}>
                    {COLORS.map((c) => <option key={c} value={c}>{c.replace('bg-', '').replace('-500', '')}</option>)}
                  </select>
                </Field>
                <div className="sm:col-span-2"><Field label="Review (EN)"><textarea rows={2} value={it.text_en} onChange={(e) => update(idx, { text_en: e.target.value })} className={inp} /></Field></div>
                <div className="sm:col-span-2"><Field label="Review (BN)"><textarea rows={2} value={it.text_bn} onChange={(e) => update(idx, { text_bn: e.target.value })} className={inp + ' font-bn leading-relaxed'} /></Field></div>
              </div>
              <button onClick={() => setItems(items.filter((_, j) => j !== idx))} className="text-rose-500 hover:text-rose-700 shrink-0"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        <button onClick={() => setItems([...items, { name: 'New Customer', initials: 'NC', rating: 5, color: COLORS[items.length % COLORS.length], city_en: '', city_bn: '', text_en: '', text_bn: '' }])} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold">
          <Plus className="w-4 h-4" />Add Testimonial
        </button>
      </div>
    </div>
  );
}

const inp = 'w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-orange-500 focus:outline-none text-sm';
function Field({ label, children }: { label: string; children: ReactNode }) {
  return <div><label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>{children}</div>;
}
