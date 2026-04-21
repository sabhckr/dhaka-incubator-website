import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Flame } from 'lucide-react';
import { PRODUCTS, type Product, type Category } from '../data';
import type { Lang } from '../i18n';
import { t } from '../i18n';

type Props = {
  lang: Lang;
  onAdd: (p: Product) => void;
  onView: (p: Product) => void;
};

const FILTERS: ('All' | Category)[] = ['All', 'Incubator', 'Fan', 'Gadgets'];

export default function ProductGrid({ lang, onAdd, onView }: Props) {
  const [active, setActive] = useState<'All' | Category>('All');
  const tr = t[lang].products;
  const bn = lang === 'bn';

  const items = useMemo(
    () => (active === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="products" className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight text-slate-900 ${bn ? 'font-bn' : ''}`}>{tr.title}</h2>
          <p className={`mt-3 text-slate-600 ${bn ? 'font-bn' : ''}`}>{tr.subtitle}</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => {
            const label = f === 'All' ? tr.all : f === 'Incubator' ? tr.incubator : f === 'Fan' ? tr.fan : tr.gadgets;
            const isActive = active === f;
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                  isActive
                    ? 'bg-[var(--color-brand)] text-white border-[var(--color-brand)]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                } ${bn ? 'font-bn' : ''}`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {items.map((p) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -4 }}
                className="group relative bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition cursor-pointer"
                onClick={() => onView(p)}
              >
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={p.image}
                    alt={p.name[lang]}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-rose-500/95 text-white text-[10px] font-bold uppercase tracking-wider">
                    <Flame className="w-3 h-3" /> {tr.stock}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); onAdd(p); }}
                    aria-label="Add to cart"
                    className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-[var(--color-brand)] text-white grid place-items-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{p.category}</div>
                  <h3 className={`mt-1 font-bold text-slate-900 text-sm sm:text-base line-clamp-2 ${bn ? 'font-bn' : ''}`}>
                    {p.name[lang]}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-[var(--color-brand)] font-black text-base sm:text-lg">৳ {p.price.toLocaleString()}</span>
                    {p.oldPrice && (
                      <span className="text-xs text-slate-400 line-through">৳ {p.oldPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
