import { useState, type FormEvent } from 'react';
import { adminApi } from './api';

export default function Login({ onLogin }: { onLogin: (u: { username: string }) => void }) {
  const [username, setU] = useState('');
  const [password, setP] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setErr(''); setBusy(true);
    try {
      const r = await adminApi.login(username, password);
      onLogin({ username: r.username });
    } catch (e: any) {
      setErr(e.message || 'Login failed');
    } finally { setBusy(false); }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-slate-50 to-orange-50 px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-lg bg-orange-500 text-white grid place-items-center font-black">DI</div>
          <div>
            <div className="text-base font-bold">Admin Login</div>
            <div className="text-xs text-slate-500">Dhaka Incubator & Electronic</div>
          </div>
        </div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Username</label>
        <input
          autoFocus value={username} onChange={(e) => setU(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:border-orange-500 focus:outline-none text-sm mb-4"
        />
        <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
        <input
          type="password" value={password} onChange={(e) => setP(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:border-orange-500 focus:outline-none text-sm mb-4"
        />
        {err && <div className="text-rose-600 text-xs mb-3">{err}</div>}
        <button
          disabled={busy}
          className="w-full py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm disabled:opacity-50"
        >{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </div>
  );
}
