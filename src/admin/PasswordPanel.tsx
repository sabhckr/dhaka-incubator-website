import { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { adminApi } from './api';

export default function PasswordPanel() {
  const [cur, setCur] = useState('');
  const [next, setNext] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  async function save() {
    setMsg(''); setErr('');
    try {
      await adminApi.changePassword(cur, next);
      setMsg('Password changed!');
      setCur(''); setNext('');
    } catch (e: any) { setErr(e.message); }
  }

  return (
    <div>
      <h1 className="text-2xl font-black mb-1">Change Password</h1>
      <p className="text-sm text-slate-500 mb-6">Choose a strong password for the admin account.</p>
      <div className="bg-white rounded-2xl border border-slate-100 p-6 max-w-md space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Current password</label>
          <input type="password" value={cur} onChange={(e) => setCur(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">New password</label>
          <input type="password" value={next} onChange={(e) => setNext(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
        </div>
        {msg && <div className="text-emerald-600 text-sm">{msg}</div>}
        {err && <div className="text-rose-600 text-sm">{err}</div>}
        <button onClick={save} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold">
          <KeyRound className="w-4 h-4" /> Change
        </button>
      </div>
    </div>
  );
}
