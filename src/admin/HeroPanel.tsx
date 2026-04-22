import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { adminApi } from './api';
import ImageInput from './ImageInput';

export default function HeroPanel({ onSaved }: { onSaved: () => void }) {
  const [i18n, setI18n] = useState<any>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { adminApi.content().then((c) => setI18n(c.i18n)); }, []);

  if (!i18n) return <div>Loading…</div>;

  function update(lang: 'en' | 'bn', key: string, value: string) {
    setI18n({ ...i18n, [lang]: { ...i18n[lang], hero: { ...i18n[lang].hero, [key]: value } } });
  }

  async function save() {
    setBusy(true); setMsg('');
    try {
      await adminApi.saveI18n(i18n);
      setMsg('Saved!');
      onSaved();
      setTimeout(() => setMsg(''), 2000);
    } catch (e: any) { setMsg(e.message); }
    finally { setBusy(false); }
  }

  const en = i18n.en.hero; const bn = i18n.bn.hero;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">Hero & Video</h1>
          <p className="text-sm text-slate-500">Top of homepage — headline, subtitle, video.</p>
        </div>
        <button onClick={save} disabled={busy} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold disabled:opacity-50">
          <Save className="w-4 h-4" /> {busy ? 'Saving…' : 'Save'}
        </button>
      </div>
      {msg && <div className="mb-4 text-sm text-emerald-600">{msg}</div>}

      <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6">
        <ImageInput
          value={en.videoUrl || ''}
          onChange={(url) => { update('en', 'videoUrl', url); update('bn', 'videoUrl', url); }}
          accept="video/*,image/*"
          label="Hero background video URL (MP4 recommended)"
        />

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Header>English</Header>
            <Row label="Badge (small uppercase pill)"><input value={en.badge} onChange={(e) => update('en', 'badge', e.target.value)} className={inp} /></Row>
            <Row label="Title line 1"><input value={en.title1} onChange={(e) => update('en', 'title1', e.target.value)} className={inp} /></Row>
            <Row label="Title line 2 (orange)"><input value={en.title2} onChange={(e) => update('en', 'title2', e.target.value)} className={inp} /></Row>
            <Row label="Subtitle"><textarea rows={3} value={en.subtitle} onChange={(e) => update('en', 'subtitle', e.target.value)} className={inp} /></Row>
            <Row label="Primary button (Shop)"><input value={en.shop} onChange={(e) => update('en', 'shop', e.target.value)} className={inp} /></Row>
            <Row label="Secondary button (Call)"><input value={en.contact} onChange={(e) => update('en', 'contact', e.target.value)} className={inp} /></Row>
          </div>
          <div className="space-y-3">
            <Header>বাংলা</Header>
            <Row label="ব্যাজ"><input value={bn.badge} onChange={(e) => update('bn', 'badge', e.target.value)} className={inp + ' font-bn'} /></Row>
            <Row label="শিরোনাম লাইন ১"><input value={bn.title1} onChange={(e) => update('bn', 'title1', e.target.value)} className={inp + ' font-bn'} /></Row>
            <Row label="শিরোনাম লাইন ২ (কমলা)"><input value={bn.title2} onChange={(e) => update('bn', 'title2', e.target.value)} className={inp + ' font-bn'} /></Row>
            <Row label="সাব-টাইটেল"><textarea rows={3} value={bn.subtitle} onChange={(e) => update('bn', 'subtitle', e.target.value)} className={inp + ' font-bn leading-relaxed'} /></Row>
            <Row label="মূল বাটন"><input value={bn.shop} onChange={(e) => update('bn', 'shop', e.target.value)} className={inp + ' font-bn'} /></Row>
            <Row label="দ্বিতীয় বাটন"><input value={bn.contact} onChange={(e) => update('bn', 'contact', e.target.value)} className={inp + ' font-bn'} /></Row>
          </div>
        </div>
      </div>
    </div>
  );
}

const inp = 'w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-orange-500 focus:outline-none text-sm';
function Header({ children }: any) { return <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">{children}</div>; }
function Row({ label, children }: any) {
  return <div><label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>{children}</div>;
}
