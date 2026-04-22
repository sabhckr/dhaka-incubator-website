import { useEffect, useState, type ReactNode } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { adminApi } from './api';

type Item = { q_en: string; q_bn: string; a_en: string; a_bn: string };

export default function FaqPanel({ onSaved }: { onSaved: () => void }) {
  const [i18n, setI18n] = useState<any>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { adminApi.content().then((c) => setI18n(c.i18n)); }, []);
  if (!i18n) return <div>Loading…</div>;

  const block = i18n.faq || { items: [] };
  const items: Item[] = block.items || [];

  function setBlock(next: any) { setI18n({ ...i18n, faq: { ...block, ...next } }); }
  function setItems(next: Item[]) { setBlock({ items: next }); }
  function update(idx: number, patch: Partial<Item>) {
    const next = items.slice(); next[idx] = { ...next[idx], ...patch }; setItems(next);
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
          <h1 className="text-2xl font-black">FAQ</h1>
          <p className="text-sm text-slate-500">Frequently asked questions.</p>
        </div>
        <button onClick={save} disabled={busy} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold disabled:opacity-50">
          <Save className="w-4 h-4" />{busy ? 'Saving…' : 'Save'}
        </button>
      </div>
      {msg && <div className="mb-4 text-sm text-emerald-600">{msg}</div>}

      <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-6 grid sm:grid-cols-2 gap-3">
        <Field label="Section title (EN)"><input value={block.titleEn || ''} onChange={(e) => setBlock({ titleEn: e.target.value })} className={inp} /></Field>
        <Field label="Section title (BN)"><input value={block.titleBn || ''} onChange={(e) => setBlock({ titleBn: e.target.value })} className={inp + ' font-bn'} /></Field>
      </div>

      <div className="space-y-4">
        {items.map((it, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Question (EN)"><input value={it.q_en} onChange={(e) => update(idx, { q_en: e.target.value })} className={inp} /></Field>
              <Field label="Question (BN)"><input value={it.q_bn} onChange={(e) => update(idx, { q_bn: e.target.value })} className={inp + ' font-bn'} /></Field>
              <Field label="Answer (EN)"><textarea rows={3} value={it.a_en} onChange={(e) => update(idx, { a_en: e.target.value })} className={inp} /></Field>
              <Field label="Answer (BN)"><textarea rows={3} value={it.a_bn} onChange={(e) => update(idx, { a_bn: e.target.value })} className={inp + ' font-bn leading-relaxed'} /></Field>
            </div>
            <div className="mt-3 flex justify-end">
              <button onClick={() => setItems(items.filter((_, j) => j !== idx))} className="inline-flex items-center gap-1.5 text-rose-500 text-xs font-semibold"><Trash2 className="w-3.5 h-3.5" />Remove</button>
            </div>
          </div>
        ))}
        <button onClick={() => setItems([...items, { q_en: '', q_bn: '', a_en: '', a_bn: '' }])} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold">
          <Plus className="w-4 h-4" />Add Question
        </button>
      </div>
    </div>
  );
}

const inp = 'w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-orange-500 focus:outline-none text-sm';
function Field({ label, children }: { label: string; children: ReactNode }) {
  return <div><label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>{children}</div>;
}
