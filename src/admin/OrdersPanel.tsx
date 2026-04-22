import { useEffect, useState } from 'react';
import { Trash2, RefreshCw } from 'lucide-react';
import { adminApi } from './api';

type Order = {
  id: number;
  customer_name: string; customer_phone: string; customer_address: string;
  items: { name_en: string; qty: number; price: number; line_total: number }[];
  total: string | number; note: string; status: string; created_at: string;
};

const STATUSES = ['new', 'confirmed', 'shipped', 'delivered', 'cancelled'];
const STATUS_COLORS: Record<string, string> = {
  new: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-slate-200 text-slate-600',
};

export default function OrdersPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try { setOrders(await adminApi.listOrders()); } finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  async function setStatus(id: number, status: string) {
    await adminApi.setOrderStatus(id, status);
    setOrders((cur) => cur.map((o) => (o.id === id ? { ...o, status } : o)));
  }
  async function del(id: number) {
    if (!confirm('Delete this order?')) return;
    await adminApi.deleteOrder(id);
    setOrders((cur) => cur.filter((o) => o.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">Orders</h1>
          <p className="text-sm text-slate-500">{orders.length} order{orders.length !== 1 ? 's' : ''} (latest first).</p>
        </div>
        <button onClick={load} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm font-semibold">
          <RefreshCw className="w-3.5 h-3.5" />Refresh
        </button>
      </div>

      {loading && <div className="text-slate-500">Loading…</div>}
      {!loading && orders.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center text-slate-500">
          No orders yet. Orders placed via the cart will appear here.
        </div>
      )}

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div className="text-xs text-slate-400">#{o.id} · {new Date(o.created_at).toLocaleString()}</div>
                <div className="font-bold mt-0.5">{o.customer_name}</div>
                <div className="text-sm text-slate-600">📞 <a className="text-orange-600" href={`tel:${o.customer_phone}`}>{o.customer_phone}</a></div>
                <div className="text-sm text-slate-600 mt-0.5 max-w-md">📍 {o.customer_address}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${STATUS_COLORS[o.status] || 'bg-slate-100 text-slate-600'}`}>{o.status}</span>
                <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value)} className="px-2 py-1 rounded-lg border border-slate-200 text-xs">
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={() => del(o.id)} className="px-2 py-1 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="mt-3 border-t border-slate-100 pt-3">
              <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Items</div>
              <ul className="text-sm text-slate-700 space-y-1">
                {o.items.map((it, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{it.name_en} <span className="text-slate-400">×{it.qty}</span></span>
                    <span className="font-semibold">৳ {Number(it.line_total).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex justify-between border-t border-slate-100 pt-2 font-bold">
                <span>Total</span><span className="text-orange-600">৳ {Number(o.total).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
