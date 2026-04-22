import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import type { Lang } from '../i18n';
import { useContent } from '../lib/content';

type Review = {
  name: string;
  initials: string;
  city: { en: string; bn: string };
  rating: number;
  text: { en: string; bn: string };
  color: string;
};

const FALLBACK_REVIEWS: Review[] = [
  { name: 'Mizanur Rahman', initials: 'MR', city: { en: 'Gazipur', bn: 'গাজীপুর' }, rating: 5,
    text: { en: 'Bought the 96-egg incubator for my small farm. Hatch rate above 90% from week one. Delivery to Gazipur was free and the packaging was excellent.',
            bn: 'আমার ছোট খামারের জন্য ৯৬-ডিমের মেশিনটা নিয়েছিলাম। প্রথম ব্যাচেই ৯০%-এর বেশি ডিম ফুটেছে। গাজীপুরে ফ্রি ডেলিভারি দিয়েছে, বক্সও খুব ভালোভাবে প্যাক করা ছিল।' },
    color: 'bg-orange-500' },
];

export default function Testimonials({ lang }: { lang: Lang }) {
  const bn = lang === 'bn';
  const { t } = useContent();
  const block = (t as any).testimonials || {};
  const items: Review[] = Array.isArray(block.items) && block.items.length
    ? block.items.map((r: any) => ({
        name: r.name, initials: r.initials || (r.name || '').split(' ').map((s: string) => s[0]).slice(0, 2).join(''),
        city: { en: r.city_en || '', bn: r.city_bn || '' }, rating: Number(r.rating) || 5,
        text: { en: r.text_en || '', bn: r.text_bn || '' }, color: r.color || 'bg-orange-500',
      }))
    : FALLBACK_REVIEWS;
  const microLabel = bn ? (block.microBn || 'কাস্টমার রিভিউ') : (block.microEn || 'Customer Reviews');
  const titleLabel = bn ? (block.titleBn || 'সারা দেশের কাস্টমাররা আমাদের পাশে আছেন') : (block.titleEn || 'Loved by customers across Bangladesh');

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-50 text-[var(--color-brand)] text-[10px] font-bold uppercase tracking-widest">
            {microLabel}
          </div>
          <h2 className={`mt-4 text-3xl sm:text-4xl font-black text-slate-900 ${bn ? 'font-bn' : ''}`}>
            {titleLabel}
          </h2>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((r, idx) => (
            <motion.div
              key={`${r.name}-${idx}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white rounded-[2rem] border border-slate-100 p-6 hover:shadow-xl transition shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full ${r.color} text-white grid place-items-center font-bold`}>
                  {r.initials}
                </div>
                <div>
                  <div className={`font-bold text-slate-900 text-sm ${bn ? 'font-bn' : ''}`}>{r.name}</div>
                  <div className={`text-xs text-slate-500 ${bn ? 'font-bn' : ''}`}>{r.city[lang]}</div>
                </div>
                <div className="ml-auto flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                  ))}
                </div>
              </div>
              <p className={`mt-4 text-sm text-slate-600 leading-relaxed ${bn ? 'font-bn' : ''}`} style={bn ? { lineHeight: 1.9 } : undefined}>“{r.text[lang]}”</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
