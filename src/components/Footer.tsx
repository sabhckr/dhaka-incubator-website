import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageSquare, MapPin, Linkedin, X, ShieldCheck } from 'lucide-react';
import type { Lang } from '../i18n';
import { useContent } from '../lib/content';

const PHONE = '+8801712345678';
const SMS = '+8801712345678';
const MAP_QUERY = 'Dhaka+Bangladesh';
const LINKEDIN = 'https://www.linkedin.com/in/ishak-hasan-sabbir/';

export default function Footer({ lang }: { lang: Lang }) {
  const [openWarranty, setOpenWarranty] = useState(false);
  const { t } = useContent();
  const tr = t[lang].footer;
  const bn = lang === 'bn';

  function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function scrollProducts() { document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }

  return (
    <footer id="contact" className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[var(--color-brand)] text-white grid place-items-center font-black">DI</div>
            <div className="leading-tight">
              <div className="text-white text-sm font-bold">Dhaka Incubator</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500">& Electric</div>
            </div>
          </div>
          <p className={`mt-4 text-sm text-slate-400 max-w-xs ${bn ? 'font-bn' : ''}`}>{tr.tagline}</p>
        </div>

        <div>
          <div className={`text-xs uppercase tracking-widest text-slate-500 font-bold ${bn ? 'font-bn' : ''}`}>{tr.quick}</div>
          <ul className={`mt-4 space-y-2 text-sm ${bn ? 'font-bn' : ''}`}>
            <li><button onClick={scrollTop} className="hover:text-white">{tr.home}</button></li>
            <li><button onClick={scrollProducts} className="hover:text-white">{tr.products}</button></li>
            <li><button onClick={() => setOpenWarranty(true)} className="hover:text-white">{tr.warranty}</button></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Connect</div>
          <div className="mt-4 flex items-center gap-3">
            <a href={`tel:${PHONE}`} aria-label="Call" className="w-11 h-11 rounded-full bg-white/5 hover:bg-[var(--color-brand)] grid place-items-center text-white transition">
              <Phone className="w-4.5 h-4.5" />
            </a>
            <a href={`sms:${SMS}`} aria-label="SMS" className="w-11 h-11 rounded-full bg-white/5 hover:bg-[var(--color-brand)] grid place-items-center text-white transition">
              <MessageSquare className="w-4.5 h-4.5" />
            </a>
            <a href={`https://www.google.com/maps/search/${MAP_QUERY}`} target="_blank" rel="noreferrer" aria-label="Map" className="w-11 h-11 rounded-full bg-white/5 hover:bg-[var(--color-brand)] grid place-items-center text-white transition">
              <MapPin className="w-4.5 h-4.5" />
            </a>
          </div>
          <div className="mt-4 text-xs text-slate-400">{PHONE}</div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} Dhaka Incubator & Electric. {tr.rights}</div>
          <div className="inline-flex items-center gap-1.5">
            {tr.developed}{' '}
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[var(--color-brand)] hover:underline">
              Ishak Hasan Sabbir <Linkedin className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {openWarranty && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpenWarranty(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white text-slate-800 rounded-2xl shadow-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setOpenWarranty(false)} aria-label="Close" className="absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-[var(--color-brand)] grid place-items-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className={`mt-4 text-xl font-black ${bn ? 'font-bn' : ''}`}>{tr.warrantyTitle}</h3>
              <p className={`mt-2 text-slate-600 ${bn ? 'font-bn leading-relaxed' : ''}`}>{tr.warrantyBody}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
