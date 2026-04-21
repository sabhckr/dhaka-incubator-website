import type React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Banknote, RefreshCcw, Headphones, MapPin, X } from 'lucide-react';
import type { Lang } from '../i18n';
import { t } from '../i18n';

type Key = 'cod' | 'replace' | 'support' | 'delivery';

export default function TrustBadges({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState<Key | null>(null);
  const tr = t[lang].trust;
  const bn = lang === 'bn';

  const items: { key: Key; icon: React.ReactNode; title: string; body: string }[] = [
    { key: 'cod', icon: <Banknote className="w-6 h-6" />, title: tr.cod, body: tr.codDesc },
    { key: 'replace', icon: <RefreshCcw className="w-6 h-6" />, title: tr.replace, body: tr.replaceDesc },
    { key: 'support', icon: <Headphones className="w-6 h-6" />, title: tr.support, body: tr.supportDesc },
    { key: 'delivery', icon: <MapPin className="w-6 h-6" />, title: tr.delivery, body: tr.deliveryDesc },
  ];

  const current = items.find((i) => i.key === open) || null;

  return (
    <section id="trust" className="bg-slate-50 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className={`text-center text-3xl sm:text-4xl font-black text-slate-900 ${bn ? 'font-bn' : ''}`}>{tr.title}</h2>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => setOpen(it.key)}
              className="group bg-white rounded-2xl border border-slate-100 p-5 text-left hover:border-[var(--color-brand)] hover:shadow-lg transition"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-[var(--color-brand)] grid place-items-center group-hover:bg-[var(--color-brand)] group-hover:text-white transition">
                {it.icon}
              </div>
              <div className={`mt-4 font-bold text-slate-900 ${bn ? 'font-bn' : ''}`}>{it.title}</div>
              <div className="mt-1 text-xs text-slate-500">Tap to learn more</div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setOpen(null)} aria-label="Close" className="absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full bg-white/90 hover:bg-slate-100 shadow">
                <X className="w-4 h-4" />
              </button>
              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-[var(--color-brand)] grid place-items-center">{current.icon}</div>
                <h3 className={`mt-4 text-xl font-black text-slate-900 ${bn ? 'font-bn' : ''}`}>{current.title}</h3>
                <p className={`mt-2 text-slate-600 ${bn ? 'font-bn' : ''}`}>{current.body}</p>
              </div>
              {current.key === 'delivery' && (
                <div className="aspect-video w-full">
                  <iframe
                    title="Bangladesh Delivery Map"
                    src="https://www.google.com/maps?q=Bangladesh&z=6&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
