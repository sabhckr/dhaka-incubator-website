import { motion } from 'motion/react';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';
import type { Lang } from '../i18n';
import { useContent } from '../lib/content';

export default function Hero({ lang }: { lang: Lang }) {
  const { t } = useContent();
  const tr = t[lang].hero as any;
  const PHONE = ((t as any).contact?.phone) || '+8801712345678';
  const videoUrl = tr.videoUrl || 'https://cdn.coverr.co/videos/coverr-an-industrial-machine-1572/1080p.mp4';
  const bn = lang === 'bn';
  return (
    <section id="top" className="relative h-screen min-h-[640px] w-full overflow-hidden">
      <div className="absolute inset-0 hero-fallback" />
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
        autoPlay muted loop playsInline
        poster="https://images.unsplash.com/photo-1581092580494-9e3b7e0e0c9b?auto=format&fit=crop&w=1600&q=60"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto">
        {tr.badge && (
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-brand)]" />
            <span className={bn ? 'font-bn' : ''}>{tr.badge}</span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className={`mt-6 text-white font-black tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] ${bn ? 'font-bn' : ''}`}
        >
          {tr.title1}<br />
          <span className="text-[var(--color-brand)]">{tr.title2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className={`mt-6 max-w-2xl text-white/80 text-base sm:text-lg ${bn ? 'font-bn leading-relaxed' : ''}`}
        >
          {tr.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-3"
        >
          <a
            href="#products"
            className={`group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-brand)] text-white font-semibold hover:bg-[var(--color-brand-dark)] transition ${bn ? 'font-bn' : ''}`}
          >
            {tr.shop} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </a>
          <a
            href={`tel:${PHONE}`}
            className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 border border-white/30 backdrop-blur-md text-white font-semibold hover:bg-white/20 transition ${bn ? 'font-bn' : ''}`}
          >
            <Phone className="w-4 h-4" /> {tr.contact}
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-6 inset-x-0 z-10 flex justify-center">
        <div className="w-px h-10 bg-gradient-to-b from-white/0 via-white/60 to-white/0 animate-pulse" />
      </div>
    </section>
  );
}
