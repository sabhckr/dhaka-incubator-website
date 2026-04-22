import { HelpCircle } from 'lucide-react';
import type { Lang } from '../i18n';
import { useContent } from '../lib/content';

type Item = { q: { en: string; bn: string }; a: { en: string; bn: string } };

const FALLBACK: Item[] = [
  { q: { en: 'Will the incubator work during load-shedding?', bn: 'লোডশেডিং হলে ইনকিউবেটর চলবে কি?' },
    a: { en: 'Yes — every incubator runs on 220V mains and is fully compatible with IPS, solar inverters, and standard generators. Insulation keeps the inner temperature stable for 30–45 minutes during short outages.',
         bn: 'জি, কোনো সমস্যা নেই। সব ইনকিউবেটর ২২০ ভোল্টে চলে, IPS, সোলার বা জেনারেটর — যেকোনোটার সাথে চালাতে পারবেন। ছোটখাটো লোডশেডিং হলেও ভেতরের তাপমাত্রা ৩০–৪৫ মিনিট ঠিক থাকে।' } },
  { q: { en: 'Manual vs Automatic — which one should I choose?', bn: 'ম্যানুয়াল নাকি অটোমেটিক — কোনটা নেব?' },
    a: { en: 'For 24+ eggs or daily commercial use, choose Automatic — it turns eggs every 2 hours on its own. For under 24 eggs, hobby projects, or schools, Manual is cheaper and just as effective if you can rotate eggs 3 times a day.',
         bn: '২৪টার বেশি ডিম হলে বা ব্যবসার জন্য নিলে অটোমেটিক নেন — প্রতি ২ ঘণ্টায় ডিম নিজে নিজে ঘোরে। আর শখ করে বা স্কুলের জন্য নিলে ম্যানুয়াল-ই যথেষ্ট, দামও কম। দিনে ৩ বার হাতে ঘোরালেই হবে।' } },
  { q: { en: 'How long does delivery take?', bn: 'ডেলিভারিতে কতদিন লাগে?' },
    a: { en: 'Inside Dhaka: 24–48 hours. Outside Dhaka: 2–4 working days via Sundarban / SA Paribahan / RedX. You pay the courier directly when the parcel arrives — that is Cash on Delivery.',
         bn: 'ঢাকার ভেতরে ১–২ দিনে পেয়ে যাবেন। ঢাকার বাইরে ২–৪ দিন লাগে (সুন্দরবন, এসএ পরিবহন বা RedX)। পার্সেল হাতে পেয়ে কুরিয়ারকেই টাকা দিবেন — এটাই ক্যাশ অন ডেলিভারি।' } },
  { q: { en: 'What is the warranty and how do I claim it?', bn: 'ওয়ারেন্টি কতদিনের, কীভাবে পাব?' },
    a: { en: 'Incubators carry 1-year service warranty on electronic parts; fans and gadgets carry 6 months. Just send a video of the issue on WhatsApp — we replace, repair, or refund within 7 days.',
         bn: 'ইনকিউবেটরে ইলেকট্রনিক পার্টসের জন্য ১ বছরের ওয়ারেন্টি দিচ্ছি, ফ্যান আর গ্যাজেটে ৬ মাস। কোনো সমস্যা হলে হোয়াটসঅ্যাপে একটা ভিডিও পাঠান — ৭ দিনের ভেতরেই বদলে দেব বা ঠিক করে দেব।' } },
  { q: { en: 'Do you offer training or setup support?', bn: 'সেটআপ বা ট্রেনিং সাপোর্ট পাব?' },
    a: { en: 'Yes. Every order includes a free Bangla setup video and unlimited WhatsApp support for the first month. For commercial buyers we also offer one-on-one calls.',
         bn: 'অবশ্যই। প্রতিটা অর্ডারের সাথে বাংলায় সেটআপ ভিডিও ফ্রি দিচ্ছি, আর প্রথম এক মাস হোয়াটসঅ্যাপে যেকোনো সময় হেল্প পাবেন। ব্যবসার জন্য কিনলে ফোনেও আলাদা করে বুঝিয়ে দেই।' } },
  { q: { en: 'Can I see the product before paying?', bn: 'টাকা দেওয়ার আগে প্রোডাক্ট দেখতে পারব?' },
    a: { en: 'Yes. With Cash on Delivery you may inspect the carton, check the model name, and confirm visible damage before paying the courier. Internal testing happens at home after setup.',
         bn: 'জি অবশ্যই। ক্যাশ অন ডেলিভারিতে টাকা দেওয়ার আগে কার্টন খুলে মডেল আর বাইরের অবস্থা দেখে নিতে পারবেন। ভেতরে চালু করে টেস্ট তো বাসায় গিয়েই করবেন।' } },
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
