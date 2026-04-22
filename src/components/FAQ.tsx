import { HelpCircle } from 'lucide-react';
import type { Lang } from '../i18n';
import { useContent } from '../lib/content';

type Item = { q: { en: string; bn: string }; a: { en: string; bn: string } };

const FALLBACK: Item[] = [
  { q: { en: 'Will the incubator work during load-shedding?', bn: 'লোডশেডিং হলে ইনকিউবেটর চলবে কি?' },
    a: { en: 'Yes — every incubator runs on 220V mains and is fully compatible with IPS, solar inverters, and standard generators.',
         bn: 'জি, কোনো সমস্যা নেই। সব ইনকিউবেটর ২২০ ভোল্টে চলে।' } },
];

export default function FAQ({ lang }: { lang: Lang }) {
  const bn = lang === 'bn';
  const { t } = useContent();
  const block = (t as any).faq || {};
  const items: Item[] = Array.isArray(block.items) && block.items.length
    ? block.items.map((r: any) => ({
        q: { en: r.q_en || '', bn: r.q_bn || '' },
        a: { en: r.a_en || '', bn: r.a_bn || '' },
      }))
    : FALLBACK;
  const titleLabel = bn ? (block.titleBn || 'যা প্রশ্ন আসে, উত্তরও দিচ্ছি') : (block.titleEn || 'Questions, answered');

  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-widest">
            <HelpCircle className="w-3 h-3" /> FAQ
          </div>
          <h2 className={`mt-4 text-3xl sm:text-4xl font-black text-slate-900 ${bn ? 'font-bn' : ''}`}>
            {titleLabel}
          </h2>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {items.map((it, idx) => (
            <div key={`${it.q.en}-${idx}`} className="bg-white rounded-[1.5rem] border border-slate-100 p-6">
              <div className={`flex items-start gap-2 font-bold text-slate-900 ${bn ? 'font-bn' : ''}`}>
                <span className="mt-0.5 w-5 h-5 rounded-full bg-[var(--color-brand)] text-white text-[11px] grid place-items-center font-black">Q</span>
                <span>{it.q[lang]}</span>
              </div>
              <p className={`mt-3 pl-7 text-sm text-slate-600 leading-relaxed ${bn ? 'font-bn' : ''}`} style={bn ? { lineHeight: 1.95 } : undefined}>{it.a[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
