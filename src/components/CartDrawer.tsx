import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2, Send } from 'lucide-react';
import type { Lang } from '../i18n';
import { t } from '../i18n';
import type { Product } from '../data';

export type CartItem = { product: Product; qty: number };

type Props = {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  lang: Lang;
};

const WHATSAPP_NUMBER = '8801712345678';

export default function CartDrawer({ open, onClose, items, setQty, remove, lang }: Props) {
  const tr = t[lang].cart;
  const bn = lang === 'bn';
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  const [form, setForm] = useState({ name: '', phone: '', address: '' });

  function checkout() {
    if (!form.name || !form.phone || !form.address || items.length === 0) return;
    const lines = items.map(
      (i, n) => `${n + 1}. ${i.product.name.en}  ×${i.qty}  =  ৳${(i.product.price * i.qty).toLocaleString()}`
    );
    const msg =
`*🛒 New Order — Dhaka Incubator & Electronic*

*Customer:* ${form.name}
*Phone:* ${form.phone}
*Address:* ${form.address}

*Items:*
${lines.join('\n')}

*Grand Total: ৳ ${total.toLocaleString()}*
Payment: Cash on Delivery

🌐 ${typeof window !== 'undefined' ? window.location.origin : ''}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className={`text-lg font-black ${bn ? 'font-bn' : ''}`}>{tr.title}</h3>
              <button onClick={onClose} aria-label="Close" className="w-9 h-9 grid place-items-center rounded-full hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.length === 0 && (
                <div className={`text-center text-slate-500 mt-12 ${bn ? 'font-bn' : ''}`}>{tr.empty}</div>
              )}
              {items.map((it) => (
                <div key={it.product.id} className="flex gap-3 p-3 rounded-xl border border-slate-100">
                  <img src={it.product.image} alt="" className="w-16 h-16 rounded-lg object-cover bg-slate-100" />
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-bold text-slate-900 line-clamp-1 ${bn ? 'font-bn' : ''}`}>{it.product.name[lang]}</div>
                    <div className="text-[var(--color-brand)] font-bold text-sm">৳ {it.product.price.toLocaleString()}</div>
                    <div className="mt-1 inline-flex items-center gap-2">
                      <button onClick={() => setQty(it.product.id, Math.max(0, it.qty - 1))} className="w-7 h-7 grid place-items-center rounded-md border border-slate-200 hover:bg-slate-50">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{it.qty}</span>
                      <button onClick={() => setQty(it.product.id, it.qty + 1)} className="w-7 h-7 grid place-items-center rounded-md border border-slate-200 hover:bg-slate-50">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => remove(it.product.id)} aria-label="Remove" className="text-slate-400 hover:text-rose-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-slate-500 ${bn ? 'font-bn' : ''}`}>{tr.total}</span>
                <span className="text-xl font-black text-slate-900">৳ {total.toLocaleString()}</span>
              </div>
              <input
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={tr.placeholder_name}
                className={`w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--color-brand)] text-sm ${bn ? 'font-bn' : ''}`}
              />
              <input
                value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder={tr.placeholder_phone} type="tel"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--color-brand)] text-sm"
              />
              <textarea
                value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder={tr.placeholder_address} rows={2}
                className={`w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--color-brand)] text-sm resize-none ${bn ? 'font-bn' : ''}`}
              />
              <button
                onClick={checkout}
                disabled={items.length === 0 || !form.name || !form.phone || !form.address}
                className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold ${bn ? 'font-bn' : ''}`}
              >
                <Send className="w-4 h-4" /> {tr.confirm}
              </button>
              <p className={`text-[11px] text-slate-400 text-center ${bn ? 'font-bn leading-relaxed' : ''}`}>{tr.hint}</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
