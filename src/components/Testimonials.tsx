import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import type { Lang } from '../i18n';

type Review = {
  name: string;
  initials: string;
  city: { en: string; bn: string };
  rating: number;
  text: { en: string; bn: string };
  color: string;
};

const REVIEWS: Review[] = [
  {
    name: 'Mizanur Rahman', initials: 'MR', city: { en: 'Gazipur', bn: 'গাজীপুর' }, rating: 5,
    text: {
      en: 'Bought the 96-egg incubator for my small farm. Hatch rate above 90% from week one. Delivery to Gazipur was free and the packaging was excellent.',
      bn: 'আমার ছোট খামারের জন্য ৯৬-ডিমের মেশিনটা নিয়েছিলাম। প্রথম ব্যাচেই ৯০%-এর বেশি ডিম ফুটেছে। গাজীপুরে ফ্রি ডেলিভারি দিয়েছে, বক্সও খুব ভালোভাবে প্যাক করা ছিল।',
    },
    color: 'bg-orange-500',
  },
  {
    name: 'Sharmin Akter', initials: 'SA', city: { en: 'Bogura', bn: 'বগুড়া' }, rating: 5,
    text: {
      en: 'Ordered the rechargeable fan during heavy load-shedding. Battery lasts the whole evening. Their support team helped me set it up over WhatsApp.',
      bn: 'লোডশেডিং খুব হচ্ছিল, তাই রিচার্জেবল ফ্যানটা অর্ডার করলাম। সারা সন্ধ্যা ভালোমতো চলে। হোয়াটসঅ্যাপে ভাইয়ারা সেটআপ বুঝিয়ে দিয়েছেন, কোনো ঝামেলা হয়নি।',
    },
    color: 'bg-rose-500',
  },
  {
    name: 'Tanvir Hossain', initials: 'TH', city: { en: 'Sylhet', bn: 'সিলেট' }, rating: 4,
    text: {
      en: 'COD worked smoothly all the way to Sylhet. The 48-egg unit is well built and the temperature is rock-stable. Recommended.',
      bn: 'সিলেটে বসে অর্ডার দিলাম, ক্যাশ অন ডেলিভারিতে ঠিকভাবে পেয়েছি। ৪৮-ডিমের মেশিনটা মজবুত, তাপমাত্রাও একদম ঠিক থাকে। সবাইকে সাজেস্ট করব।',
    },
    color: 'bg-emerald-500',
  },
  {
    name: 'Rakibul Islam', initials: 'RI', city: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, rating: 5,
    text: {
      en: 'Replacement was honored within 4 days when one sensor was faulty. Honest sellers — rare these days. Will buy again.',
      bn: 'একটা সেন্সরে সমস্যা হয়েছিল, ভিডিও পাঠানোর ৪ দিনের মাথায় নতুনটা পাঠিয়ে দিয়েছে। এমন সৎ ব্যবসায়ী এখন কম পাওয়া যায়। আবারও কিনব ইনশাআল্লাহ।',
    },
    color: 'bg-indigo-500',
  },
  {
    name: 'Nusrat Jahan', initials: 'NJ', city: { en: 'Khulna', bn: 'খুলনা' }, rating: 5,
    text: {
      en: 'The hygro-thermometer is super accurate. Pairs nicely with my older incubator. Fast shipping to Khulna.',
      bn: 'থার্মোমিটারটা একদম পারফেক্ট মাপ দেয়। আগের পুরনো ইনকিউবেটরের সাথেও ভালো কাজ করছে। খুলনায় দ্রুতই পেয়ে গিয়েছি।',
    },
    color: 'bg-amber-500',
  },
  {
    name: 'Abdul Karim', initials: 'AK', city: { en: 'Rajshahi', bn: 'রাজশাহী' }, rating: 5,
    text: {
      en: 'Industrial exhaust fan keeps my poultry shed cool and dry. Build quality is heavy-duty. Great after-sales response.',
      bn: 'এক্সহস্ট ফ্যানটা আমার পোল্ট্রি শেড একদম ঠান্ডা আর শুকনো রাখে। বিল্ড কোয়ালিটি অনেক ভালো, আর কেনার পরেও ফোন দিলে রেসপন্স পাই।',
    },
    color: 'bg-sky-500',
  },
];

export default function Testimonials({ lang }: { lang: Lang }) {
  const bn = lang === 'bn';
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-50 text-[var(--color-brand)] text-[10px] font-bold uppercase tracking-widest">
            {bn ? 'কাস্টমার রিভিউ' : 'Customer Reviews'}
          </div>
          <h2 className={`mt-4 text-3xl sm:text-4xl font-black text-slate-900 ${bn ? 'font-bn' : ''}`}>
            {bn ? 'সারা দেশের কাস্টমাররা আমাদের পাশে আছেন' : 'Loved by customers across Bangladesh'}
          </h2>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r, idx) => (
            <motion.div
              key={r.name}
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
