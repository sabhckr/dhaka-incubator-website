import { HelpCircle } from 'lucide-react';
import type { Lang } from '../i18n';

type Item = { q: { en: string; bn: string }; a: { en: string; bn: string } };

const ITEMS: Item[] = [
  {
    q: { en: 'Will the incubator work during load-shedding?', bn: 'লোডশেডিং চলাকালীন কি ইনকিউবেটর কাজ করবে?' },
    a: {
      en: 'Yes — every incubator runs on 220V mains and is fully compatible with IPS, solar inverters, and standard generators. Insulation keeps the inner temperature stable for 30–45 minutes during short outages.',
      bn: 'হ্যাঁ — প্রতিটি ইনকিউবেটর ২২০ ভোল্টে চলে এবং আইপিএস, সোলার ইনভার্টার ও জেনারেটরের সাথে সম্পূর্ণ সামঞ্জস্যপূর্ণ। ৩০–৪৫ মিনিট পর্যন্ত আভ্যন্তরীণ তাপমাত্রা স্থিতিশীল থাকে।',
    },
  },
  {
    q: { en: 'Manual vs Automatic — which one should I choose?', bn: 'ম্যানুয়াল না অটোমেটিক — কোনটি নেব?' },
    a: {
      en: 'For 24+ eggs or daily commercial use, choose Automatic — it turns eggs every 2 hours on its own. For under 24 eggs, hobby projects, or schools, Manual is cheaper and just as effective if you can rotate eggs 3 times a day.',
      bn: '২৪+ ডিম বা প্রতিদিনের বাণিজ্যিক ব্যবহারের জন্য অটোমেটিক বেছে নিন — এটি প্রতি ২ ঘণ্টায় ডিম ঘোরায়। ২৪-এর কম ডিম বা শখের জন্য ম্যানুয়াল সাশ্রয়ী।',
    },
  },
  {
    q: { en: 'How long does delivery take?', bn: 'ডেলিভারিতে কত সময় লাগে?' },
    a: {
      en: 'Inside Dhaka: 24–48 hours. Outside Dhaka: 2–4 working days via Sundarban / SA Paribahan / RedX. You pay the courier directly when the parcel arrives — that is Cash on Delivery.',
      bn: 'ঢাকার ভিতরে: ২৪–৪৮ ঘণ্টা। ঢাকার বাইরে: ২–৪ কর্মদিবস (সুন্দরবন / এসএ পরিবহন / RedX)। পার্সেল হাতে পেলে কুরিয়ারকে সরাসরি পরিশোধ করবেন।',
    },
  },
  {
    q: { en: 'What is the warranty and how do I claim it?', bn: 'ওয়ারেন্টি কী এবং কীভাবে ক্লেইম করব?' },
    a: {
      en: 'Incubators carry 1-year service warranty on electronic parts; fans and gadgets carry 6 months. Just send a video of the issue on WhatsApp — we replace, repair, or refund within 7 days.',
      bn: 'ইনকিউবেটরে ইলেকট্রনিক পার্টসে ১ বছর ওয়ারেন্টি; ফ্যান ও গ্যাজেটে ৬ মাস। হোয়াটসঅ্যাপে সমস্যার ভিডিও পাঠান — ৭ দিনের মধ্যে সমাধান।',
    },
  },
  {
    q: { en: 'Do you offer training or setup support?', bn: 'প্রশিক্ষণ বা সেটআপ সাপোর্ট পাওয়া যাবে?' },
    a: {
      en: 'Yes. Every order includes a free Bangla setup video and unlimited WhatsApp support for the first month. For commercial buyers we also offer one-on-one calls.',
      bn: 'হ্যাঁ। প্রতিটি অর্ডারে ফ্রি বাংলা সেটআপ ভিডিও এবং প্রথম মাসে আনলিমিটেড হোয়াটসঅ্যাপ সাপোর্ট রয়েছে। বাণিজ্যিক ক্রেতাদের জন্য ১-অন-১ কলও উপলব্ধ।',
    },
  },
  {
    q: { en: 'Can I see the product before paying?', bn: 'পেমেন্টের আগে কি পণ্য দেখা যাবে?' },
    a: {
      en: 'Yes. With Cash on Delivery you may inspect the carton, check the model name, and confirm visible damage before paying the courier. Internal testing happens at home after setup.',
      bn: 'হ্যাঁ। ক্যাশ অন ডেলিভারিতে কুরিয়ারকে পেমেন্টের আগে কার্টন দেখে মডেল ও বাহ্যিক ক্ষতি যাচাই করতে পারবেন।',
    },
  },
];

export default function FAQ({ lang }: { lang: Lang }) {
  const bn = lang === 'bn';
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-widest">
            <HelpCircle className="w-3 h-3" /> FAQ
          </div>
          <h2 className={`mt-4 text-3xl sm:text-4xl font-black text-slate-900 ${bn ? 'font-bn' : ''}`}>
            {bn ? 'যা প্রায়ই জিজ্ঞেস করা হয়' : 'Questions, answered'}
          </h2>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {ITEMS.map((it) => (
            <div key={it.q.en} className="bg-white rounded-[1.5rem] border border-slate-100 p-6">
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
