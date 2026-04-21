import { ShoppingBag, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import type { Lang } from '../i18n';
import { t } from '../i18n';

type Props = {
  lang: Lang;
  setLang: (l: Lang) => void;
  cartCount: number;
  openCart: () => void;
};

export default function Navbar({ lang, setLang, cartCount, openCart }: Props) {
  const tr = t[lang];
  return (
    <header className="glass fixed top-0 inset-x-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-[var(--color-brand)] text-white grid place-items-center font-black">DI</div>
          <div className={`leading-tight ${lang === 'bn' ? 'font-bn' : ''}`}>
            <div className="text-sm font-bold text-slate-900">Dhaka Incubator</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500">& Electronic</div>
          </div>
        </a>

        <nav className={`hidden md:flex items-center gap-8 text-sm font-medium text-slate-700 ${lang === 'bn' ? 'font-bn' : ''}`}>
          <a href="#top" className="hover:text-[var(--color-brand)]">{tr.nav.home}</a>
          <a href="#products" className="hover:text-[var(--color-brand)]">{tr.nav.products}</a>
          <a href="#trust" className="hover:text-[var(--color-brand)]">{tr.nav.trust}</a>
          <a href="#contact" className="hover:text-[var(--color-brand)]">{tr.nav.contact}</a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === 'en' ? 'EN' : 'বাং'}
          </button>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={openCart}
            className="relative w-10 h-10 rounded-full bg-[var(--color-brand)] text-white grid place-items-center animate-pulse-ring"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-slate-900 text-white text-[10px] font-bold grid place-items-center">
                {cartCount}
              </span>
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
}
