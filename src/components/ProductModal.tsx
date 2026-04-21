import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Check } from 'lucide-react';
import type { Product } from '../data';
import type { Lang } from '../i18n';
import { t } from '../i18n';

type Props = {
  product: Product | null;
  lang: Lang;
  onClose: () => void;
  onAdd: (p: Product) => void;
};

export default function ProductModal({ product, lang, onClose, onAdd }: Props) {
  const tr = t[lang].products;
  const bn = lang === 'bn';

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl grid md:grid-cols-2 max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 w-9 h-9 grid place-items-center rounded-full bg-white/90 hover:bg-white shadow"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="bg-slate-100 aspect-square md:aspect-auto">
              <img src={product.image} alt={product.name[lang]} className="w-full h-full object-cover" />
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto">
              <div className="text-[10px] uppercase tracking-widest text-[var(--color-brand)] font-bold">{product.category}</div>
              <h3 className={`mt-1 text-2xl sm:text-3xl font-black text-slate-900 ${bn ? 'font-bn' : ''}`}>{product.name[lang]}</h3>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-3xl font-black text-[var(--color-brand)]">৳ {product.price.toLocaleString()}</span>
                {product.oldPrice && (
                  <span className="text-base text-slate-400 line-through">৳ {product.oldPrice.toLocaleString()}</span>
                )}
              </div>

              <p className={`mt-4 text-slate-600 leading-relaxed ${bn ? 'font-bn' : ''}`} style={bn ? { lineHeight: 1.85 } : undefined}>{product.description[lang]}</p>

              <div className="mt-6">
                <h4 className={`text-sm font-bold uppercase tracking-wider text-slate-500 ${bn ? 'font-bn' : ''}`}>{tr.specs}</h4>
                <ul className="mt-3 divide-y divide-slate-100 border border-slate-100 rounded-lg">
                  {product.specs.map((s) => (
                    <li key={s.label.en} className="flex items-center justify-between px-3 py-2 text-sm">
                      <span className={`text-slate-500 inline-flex items-center gap-2 ${bn ? 'font-bn' : ''}`}>
                        <Check className="w-3.5 h-3.5 text-[var(--color-brand)]" /> {s.label[lang]}
                      </span>
                      <span className="font-semibold text-slate-800">{s.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => { onAdd(product); onClose(); }}
                className={`mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-semibold ${bn ? 'font-bn' : ''}`}
              >
                <ShoppingBag className="w-4 h-4" /> {tr.addToCart}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
