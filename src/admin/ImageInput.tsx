import { useRef, useState, type ChangeEvent } from 'react';
import { Upload, Link as LinkIcon, Loader2 } from 'lucide-react';
import { adminApi } from './api';

export default function ImageInput({
  value, onChange, accept = 'image/*', label = 'Image',
}: {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  label?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true); setErr('');
    try {
      const { url } = await adminApi.upload(f);
      onChange(url);
    } catch (e: any) { setErr(e.message || 'upload failed'); }
    finally { setBusy(false); if (fileRef.current) fileRef.current.value = ''; }
  }

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white">
          <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
          <input
            value={value} onChange={(e) => onChange(e.target.value)}
            placeholder="Paste URL or upload"
            className="flex-1 text-sm outline-none bg-transparent min-w-0"
          />
        </div>
        <button
          type="button" onClick={() => fileRef.current?.click()} disabled={busy}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 disabled:opacity-50"
        >
          {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
          Upload
        </button>
        <input ref={fileRef} type="file" accept={accept} className="hidden" onChange={onFile} />
      </div>
      {err && <div className="text-rose-600 text-xs mt-1">{err}</div>}
      {value && (
        accept.startsWith('image') ? (
          <img src={value} alt="" className="mt-2 w-full max-w-xs h-32 object-cover rounded-lg border border-slate-100" />
        ) : (
          <video src={value} className="mt-2 w-full max-w-xs h-32 object-cover rounded-lg border border-slate-100" muted />
        )
      )}
    </div>
  );
}
