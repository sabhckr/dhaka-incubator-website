import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { adminApi } from './api';

const SECTIONS: { key: string; title: string; fields: { k: string; label: string; multi?: boolean }[] }[] = [
  {
    key: 'nav', title: 'Navbar',
    fields: [
      { k: 'home', label: 'Home' }, { k: 'products', label: 'Products' },
      { k: 'trust', label: 'Why Us' }, { k: 'contact', label: 'Contact' },
    ],
  },
  {
    key: 'products', title: 'Products section',
    fields: [
      { k: 'micro', label: 'Micro label (small)' },
      { k: 'title', label: 'Title' },
      { k: 'subtitle', label: 'Subtitle', multi: true },
      { k: 'all', label: 'Filter "All"' },
      { k: 'stock', label: 'Stock badge' },
      { k: 'view', label: 'View Details' },
      { k: 'specs', label: 'Specs heading' },
      { k: 'addToCart', label: 'Add to Cart button' },
    ],
  },
  {
    key: 'trust', title: 'Trust badges',
    fields: [
      { k: 'micro', label: 'Micro label' },
      { k: 'title', label: 'Section title' },
      { k: 'cod', label: 'Cash on Delivery title' },
      { k: 'codDesc', label: 'COD description', multi: true },
      { k: 'replace', label: 'Replacement title' },
      { k: 'replaceDesc', label: 'Replacement description', multi: true },
      { k: 'support', label: 'Support title' },
      { k: 'supportDesc', label: 'Support description', multi: true },
      { k: 'delivery', label: 'Delivery title' },
      { k: 'deliveryDesc', label: 'Delivery description', multi: true },
    ],
  },
  {
    key: 'cart', title: 'Cart drawer',
    fields: [
      { k: 'title', label: 'Title' }, { k: 'empty', label: 'Empty message' },
      { k: 'total', label: 'Total label' }, { k: 'checkout', label: 'Checkout' },
      { k: 'name', label: 'Name field label' }, { k: 'phone', label: 'Phone field label' },
      { k: 'address', label: 'Address field label' },
      { k: 'confirm', label: 'Confirm button' },
      { k: 'hint', label: 'Hint under button' },
      { k: 'placeholder_name', label: 'Name placeholder' },
      { k: 'placeholder_phone', label: 'Phone placeholder' },
      { k: 'placeholder_address', label: 'Address placeholder' },
    ],
  },
  {
    key: 'footer', title: 'Footer',
    fields: [
      { k: 'tagline', label: 'Tagline', multi: true },
      { k: 'quick', label: 'Quick Links heading' },
      { k: 'home', label: 'Home link' }, { k: 'products', label: 'Products link' },
      { k: 'warranty', label: 'Warranty link' },
      { k: 'warrantyTitle', label: 'Warranty modal title' },
      { k: 'warrantyBody', label: 'Warranty modal text', multi: true },
      { k: 'rights', label: 'Rights line' },
      { k: 'developed', label: '"Developed by" prefix' },
    ],
  },
];

export default function ContentPanel({ onSaved }: { onSaved: () => void }) {
  const [i18n, setI18n] = useState<any>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { adminApi.content().then((c) => setI18n(c.i18n)); }, []);
  if (!i18n) return <div>Loading…</div>;

  function set(lang: string, section: string, key: string, value: string) {
    setI18n({
      ...i18n,
      [lang]: {
        ...i18n[lang],
        [section]: { ...i18n[lang][section], [key]: value },
      },
    });
  }

  async function save() {
    setBusy(true); setMsg('');
    try { await adminApi.saveI18n(i18n); setMsg('Saved!'); onSaved(); setTimeout(() => setMsg(''), 2000); }
    catch (e: any) { setMsg(e.message); }
    finally { setBusy(false); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">Site Text</h1>
          <p className="text-sm text-slate-500">Edit every label in English & Bengali.</p>
        </div>
        <button onClick={save} disabled={busy} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold disabled:opacity-50">
          <Save className="w-4 h-4" />{busy ? 'Saving…' : 'Save all'}
        </button>
      </div>
      {msg && <div className="mb-4 text-sm text-emerald-600">{msg}</div>}

      <div className="space-y-6">
        {SECTIONS.map((sec) => (
          <details key={sec.key} className="bg-white rounded-2xl border border-slate-100 overflow-hidden" open={sec.key === 'products'}>
            <summary className="px-5 py-4 cursor-pointer font-bold text-sm">{sec.title}</summary>
            <div className="p-5 border-t border-slate-100 space-y-4">
              {sec.fields.map((f) => (
                <div key={f.k} className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">EN — {f.label}</label>
                    {f.multi
                      ? <textarea rows={2} value={i18n.en[sec.key]?.[f.k] || ''} onChange={(e) => set('en', sec.key, f.k, e.target.value)} className={inp} />
                      : <input value={i18n.en[sec.key]?.[f.k] || ''} onChange={(e) => set('en', sec.key, f.k, e.target.value)} className={inp} />}
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">BN — {f.label}</label>
                    {f.multi
                      ? <textarea rows={2} value={i18n.bn[sec.key]?.[f.k] || ''} onChange={(e) => set('bn', sec.key, f.k, e.target.value)} className={inp + ' font-bn leading-relaxed'} />
                      : <input value={i18n.bn[sec.key]?.[f.k] || ''} onChange={(e) => set('bn', sec.key, f.k, e.target.value)} className={inp + ' font-bn'} />}
                  </div>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

const inp = 'w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-orange-500 focus:outline-none text-sm';
