import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { adminApi } from './api';

const FIELDS: { k: string; label: string; help?: string }[] = [
  { k: 'phone', label: 'Phone number (with +)', help: 'Used for the Hero "Call Now" button and footer.' },
  { k: 'sms', label: 'SMS number (with +)', help: 'Footer SMS icon.' },
  { k: 'whatsapp', label: 'WhatsApp number (no + sign)', help: 'Used for cart checkout and the floating WhatsApp button. Example: 8801712345678' },
  { k: 'address', label: 'Business address' },
  { k: 'mapQuery', label: 'Google Maps search query', help: 'Plus-separated, e.g. Dhaka+Bangladesh' },
  { k: 'linkedin', label: 'Footer link URL' },
  { k: 'developerName', label: 'Footer "developed by" name' },
  { k: 'floatingLabelEn', label: 'Floating WhatsApp label (EN)' },
  { k: 'floatingLabelBn', label: 'Floating WhatsApp label (BN)' },
  { k: 'floatingMsgEn', label: 'Floating WhatsApp prefilled message (EN)' },
  { k: 'floatingMsgBn', label: 'Floating WhatsApp prefilled message (BN)' },
];

export default function ContactPanel({ onSaved }: { onSaved: () => void }) {
  const [i18n, setI18n] = useState<any>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { adminApi.content().then((c) => setI18n(c.i18n)); }, []);
  if (!i18n) return <div>Loading…</div>;

  const c = i18n.contact || {};
  function set(k: string, v: string) { setI18n({ ...i18n, contact: { ...c, [k]: v } }); }

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
          <h1 className="text-2xl font-black">Contact & Phone Numbers</h1>
          <p className="text-sm text-slate-500">Phone, WhatsApp, address, and the WhatsApp floating button.</p>
        </div>
        <button onClick={save} disabled={busy} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold disabled:opacity-50">
          <Save className="w-4 h-4" />{busy ? 'Saving…' : 'Save'}
        </button>
      </div>
      {msg && <div className="mb-4 text-sm text-emerald-600">{msg}</div>}

      <div className="bg-white rounded-2xl border border-slate-100 p-5 grid sm:grid-cols-2 gap-4 max-w-3xl">
        {FIELDS.map((f) => (
          <div key={f.k}>
            <label className="block text-xs font-semibold text-slate-600 mb-1">{f.label}</label>
            <input value={c[f.k] || ''} onChange={(e) => set(f.k, e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-orange-500 focus:outline-none text-sm" />
            {f.help && <div className="text-[10px] text-slate-400 mt-1">{f.help}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
