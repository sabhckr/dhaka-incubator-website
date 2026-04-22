import bcrypt from 'bcryptjs';
import { pool, q } from './db';

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin';

const HERO_VIDEO =
  'https://cdn.coverr.co/videos/coverr-aerial-view-of-a-modern-poultry-farm-2640/1080p.mp4';

export const I18N_EXTRAS_DEFAULT = {
  contact: {
    phone: '+8801712345678',
    whatsapp: '8801712345678',
    sms: '+8801712345678',
    address: 'Dhaka, Bangladesh',
    mapQuery: 'Dhaka+Bangladesh',
    linkedin: 'https://www.linkedin.com/in/ishak-hasan-sabbir/',
    developerName: 'Ishak Hasan Sabbir',
    floatingMsgEn: 'Hello! I have a question about your products.',
    floatingMsgBn: 'আসসালামু আলাইকুম, আমি একটি পণ্য সম্পর্কে জানতে চাই।',
    floatingLabelEn: 'Chat on WhatsApp',
    floatingLabelBn: 'হোয়াটসঅ্যাপে চ্যাট করুন',
  },
  testimonials: {
    titleEn: 'Loved by customers across Bangladesh',
    titleBn: 'সারা দেশের কাস্টমাররা আমাদের পাশে আছেন',
    microEn: 'Customer Reviews',
    microBn: 'কাস্টমার রিভিউ',
    items: [
      { name: 'Mizanur Rahman', initials: 'MR', city_en: 'Gazipur', city_bn: 'গাজীপুর', rating: 5, color: 'bg-orange-500',
        text_en: 'Bought the 96-egg incubator for my small farm. Hatch rate above 90% from week one. Delivery to Gazipur was free and the packaging was excellent.',
        text_bn: 'আমার ছোট খামারের জন্য ৯৬-ডিমের মেশিনটা নিয়েছিলাম। প্রথম ব্যাচেই ৯০%-এর বেশি ডিম ফুটেছে। গাজীপুরে ফ্রি ডেলিভারি দিয়েছে, বক্সও খুব ভালোভাবে প্যাক করা ছিল।' },
      { name: 'Sharmin Akter', initials: 'SA', city_en: 'Bogura', city_bn: 'বগুড়া', rating: 5, color: 'bg-rose-500',
        text_en: 'Ordered the rechargeable fan during heavy load-shedding. Battery lasts the whole evening. Their support team helped me set it up over WhatsApp.',
        text_bn: 'লোডশেডিং খুব হচ্ছিল, তাই রিচার্জেবল ফ্যানটা অর্ডার করলাম। সারা সন্ধ্যা ভালোমতো চলে। হোয়াটসঅ্যাপে ভাইয়ারা সেটআপ বুঝিয়ে দিয়েছেন, কোনো ঝামেলা হয়নি।' },
      { name: 'Tanvir Hossain', initials: 'TH', city_en: 'Sylhet', city_bn: 'সিলেট', rating: 4, color: 'bg-emerald-500',
        text_en: 'COD worked smoothly all the way to Sylhet. The 48-egg unit is well built and the temperature is rock-stable. Recommended.',
        text_bn: 'সিলেটে বসে অর্ডার দিলাম, ক্যাশ অন ডেলিভারিতে ঠিকভাবে পেয়েছি। ৪৮-ডিমের মেশিনটা মজবুত, তাপমাত্রাও একদম ঠিক থাকে। সবাইকে সাজেস্ট করব।' },
      { name: 'Rakibul Islam', initials: 'RI', city_en: 'Chattogram', city_bn: 'চট্টগ্রাম', rating: 5, color: 'bg-indigo-500',
        text_en: 'Replacement was honored within 4 days when one sensor was faulty. Honest sellers — rare these days. Will buy again.',
        text_bn: 'একটা সেন্সরে সমস্যা হয়েছিল, ভিডিও পাঠানোর ৪ দিনের মাথায় নতুনটা পাঠিয়ে দিয়েছে। এমন সৎ ব্যবসায়ী এখন কম পাওয়া যায়। আবারও কিনব ইনশাআল্লাহ।' },
      { name: 'Nusrat Jahan', initials: 'NJ', city_en: 'Khulna', city_bn: 'খুলনা', rating: 5, color: 'bg-amber-500',
        text_en: 'The hygro-thermometer is super accurate. Pairs nicely with my older incubator. Fast shipping to Khulna.',
        text_bn: 'থার্মোমিটারটা একদম পারফেক্ট মাপ দেয়। আগের পুরনো ইনকিউবেটরের সাথেও ভালো কাজ করছে। খুলনায় দ্রুতই পেয়ে গিয়েছি।' },
      { name: 'Abdul Karim', initials: 'AK', city_en: 'Rajshahi', city_bn: 'রাজশাহী', rating: 5, color: 'bg-sky-500',
        text_en: 'Industrial exhaust fan keeps my poultry shed cool and dry. Build quality is heavy-duty. Great after-sales response.',
        text_bn: 'এক্সহস্ট ফ্যানটা আমার পোল্ট্রি শেড একদম ঠান্ডা আর শুকনো রাখে। বিল্ড কোয়ালিটি অনেক ভালো, আর কেনার পরেও ফোন দিলে রেসপন্স পাই।' },
    ],
  },
  faq: {
    titleEn: 'Questions, answered', titleBn: 'যা প্রশ্ন আসে, উত্তরও দিচ্ছি',
    items: [
      { q_en: 'Will the incubator work during load-shedding?', q_bn: 'লোডশেডিং হলে ইনকিউবেটর চলবে কি?',
        a_en: 'Yes — every incubator runs on 220V mains and is fully compatible with IPS, solar inverters, and standard generators. Insulation keeps the inner temperature stable for 30–45 minutes during short outages.',
        a_bn: 'জি, কোনো সমস্যা নেই। সব ইনকিউবেটর ২২০ ভোল্টে চলে, IPS, সোলার বা জেনারেটর — যেকোনোটার সাথে চালাতে পারবেন। ছোটখাটো লোডশেডিং হলেও ভেতরের তাপমাত্রা ৩০–৪৫ মিনিট ঠিক থাকে।' },
      { q_en: 'Manual vs Automatic — which one should I choose?', q_bn: 'ম্যানুয়াল নাকি অটোমেটিক — কোনটা নেব?',
        a_en: 'For 24+ eggs or daily commercial use, choose Automatic — it turns eggs every 2 hours on its own. For under 24 eggs, hobby projects, or schools, Manual is cheaper and just as effective if you can rotate eggs 3 times a day.',
        a_bn: '২৪টার বেশি ডিম হলে বা ব্যবসার জন্য নিলে অটোমেটিক নেন — প্রতি ২ ঘণ্টায় ডিম নিজে নিজে ঘোরে। আর শখ করে বা স্কুলের জন্য নিলে ম্যানুয়াল-ই যথেষ্ট, দামও কম। দিনে ৩ বার হাতে ঘোরালেই হবে।' },
      { q_en: 'How long does delivery take?', q_bn: 'ডেলিভারিতে কতদিন লাগে?',
        a_en: 'Inside Dhaka: 24–48 hours. Outside Dhaka: 2–4 working days via Sundarban / SA Paribahan / RedX. You pay the courier directly when the parcel arrives — that is Cash on Delivery.',
        a_bn: 'ঢাকার ভেতরে ১–২ দিনে পেয়ে যাবেন। ঢাকার বাইরে ২–৪ দিন লাগে (সুন্দরবন, এসএ পরিবহন বা RedX)। পার্সেল হাতে পেয়ে কুরিয়ারকেই টাকা দিবেন — এটাই ক্যাশ অন ডেলিভারি।' },
      { q_en: 'What is the warranty and how do I claim it?', q_bn: 'ওয়ারেন্টি কতদিনের, কীভাবে পাব?',
        a_en: 'Incubators carry 1-year service warranty on electronic parts; fans and gadgets carry 6 months. Just send a video of the issue on WhatsApp — we replace, repair, or refund within 7 days.',
        a_bn: 'ইনকিউবেটরে ইলেকট্রনিক পার্টসের জন্য ১ বছরের ওয়ারেন্টি দিচ্ছি, ফ্যান আর গ্যাজেটে ৬ মাস। কোনো সমস্যা হলে হোয়াটসঅ্যাপে একটা ভিডিও পাঠান — ৭ দিনের ভেতরেই বদলে দেব বা ঠিক করে দেব।' },
      { q_en: 'Do you offer training or setup support?', q_bn: 'সেটআপ বা ট্রেনিং সাপোর্ট পাব?',
        a_en: 'Yes. Every order includes a free Bangla setup video and unlimited WhatsApp support for the first month. For commercial buyers we also offer one-on-one calls.',
        a_bn: 'অবশ্যই। প্রতিটা অর্ডারের সাথে বাংলায় সেটআপ ভিডিও ফ্রি দিচ্ছি, আর প্রথম এক মাস হোয়াটসঅ্যাপে যেকোনো সময় হেল্প পাবেন। ব্যবসার জন্য কিনলে ফোনেও আলাদা করে বুঝিয়ে দেই।' },
      { q_en: 'Can I see the product before paying?', q_bn: 'টাকা দেওয়ার আগে প্রোডাক্ট দেখতে পারব?',
        a_en: 'Yes. With Cash on Delivery you may inspect the carton, check the model name, and confirm visible damage before paying the courier. Internal testing happens at home after setup.',
        a_bn: 'জি অবশ্যই। ক্যাশ অন ডেলিভারিতে টাকা দেওয়ার আগে কার্টন খুলে মডেল আর বাইরের অবস্থা দেখে নিতে পারবেন। ভেতরে চালু করে টেস্ট তো বাসায় গিয়েই করবেন।' },
    ],
  },
};

const I18N_DEFAULTS: any = {
  en: {
    nav: { home: 'Home', products: 'Products', trust: 'Why Us', contact: 'Contact' },
    hero: {
      badge: '', title1: 'Precision Hatching', title2: 'Technology for Bangladesh.',
      subtitle: 'Advanced automatic incubators, industrial cooling and smart farm gadgets — engineered for higher hatch rates, delivered nationwide with cash on delivery.',
      shop: 'Shop Products', contact: 'Call Now', videoUrl: HERO_VIDEO,
    },
    products: {
      micro: 'OUR CATALOG', title: 'Engineered for Successful Farms',
      subtitle: 'Industrial-grade equipment, transparent pricing, every district covered.',
      all: 'All', incubator: 'Incubator', fan: 'Fan', gadgets: 'Gadgets',
      stock: 'Limited Stock', add: 'Add', view: 'View Details',
      specs: 'Technical Specifications', addToCart: 'Add to Cart',
    },
    trust: {
      micro: 'WHY DHAKA INCUBATOR', title: 'Trusted by Successful Farmers',
      cod: 'Cash on Delivery', codDesc: 'Inspect the carton, verify the model, then pay the courier in cash. No advance payment required.',
      replace: '7-Day Replacement', replaceDesc: 'Damaged on arrival? Send a short video on WhatsApp and we replace within 7 working days.',
      support: '24/7 Expert Support', supportDesc: 'Setup help, hatching guidance and troubleshooting over phone, WhatsApp and SMS — even on holidays.',
      delivery: 'Nationwide Delivery', deliveryDesc: 'We deliver to all 64 districts through Sundarban, SA Paribahan and RedX. Inside Dhaka in 24–48 hours.',
    },
    cart: {
      title: 'Your Cart', empty: 'Your cart is empty.', total: 'Grand Total',
      checkout: 'Checkout', name: 'Full Name', phone: 'Phone Number', address: 'Delivery Address',
      confirm: 'Confirm Order on WhatsApp',
      hint: 'This will redirect you to WhatsApp with your order pre-filled.',
      placeholder_name: 'e.g. Rahim Uddin', placeholder_phone: '01XXXXXXXXX',
      placeholder_address: 'House, Road, Area, District',
    },
    footer: {
      quick: 'Quick Links', home: 'Home', products: 'Products', warranty: 'Warranty',
      warrantyTitle: 'Warranty Policy',
      warrantyBody: 'Every incubator carries a 1-year service warranty on electronic components. Fans and gadgets carry a 6-month warranty. Damage caused by misuse, water exposure or unauthorized repair is not covered.',
      tagline: 'Premium incubators and farm electronics — partner in your farm’s success.',
      rights: 'All rights reserved.', developed: 'Developed by',
    },
  },
  bn: {
    nav: { home: 'হোম', products: 'প্রোডাক্ট', trust: 'কেন আমরা', contact: 'যোগাযোগ' },
    hero: {
      badge: '', title1: 'ডিম ফোটানোর', title2: 'সবচেয়ে সহজ উপায়।',
      subtitle: 'অটোমেটিক ইনকিউবেটর, ইন্ডাস্ট্রিয়াল ফ্যান আর দরকারি গ্যাজেট — ভালো হ্যাচ পেতে যা যা লাগে, সবই এক জায়গায়। সারাদেশে ক্যাশ অন ডেলিভারিতে পৌঁছে দিচ্ছি।',
      shop: 'প্রোডাক্ট দেখুন', contact: 'এখনই কল করুন', videoUrl: HERO_VIDEO,
    },
    products: {
      micro: 'OUR CATALOG', title: 'খামারিদের জন্য সেরা প্রোডাক্ট',
      subtitle: 'ভালো মানের যন্ত্রপাতি, ফিক্সড দাম, আর সারা বাংলাদেশে ডেলিভারি।',
      all: 'সব', incubator: 'ইনকিউবেটর', fan: 'ফ্যান', gadgets: 'গ্যাজেট',
      stock: 'অল্প স্টক', add: 'যোগ', view: 'বিস্তারিত দেখুন',
      specs: 'বিস্তারিত তথ্য', addToCart: 'কার্টে যোগ করুন',
    },
    trust: {
      micro: 'WHY DHAKA INCUBATOR', title: 'কেন আমাদের কাছে কিনবেন',
      cod: 'ক্যাশ অন ডেলিভারি', codDesc: 'প্রোডাক্ট হাতে পেয়ে, কার্টন দেখে, তারপর কুরিয়ারকে টাকা দিন। আগে কোনো পেমেন্ট লাগবে না।',
      replace: '৭ দিনে রিপ্লেসমেন্ট', replaceDesc: 'প্রোডাক্টে কোনো সমস্যা পেলে হোয়াটসঅ্যাপে ছোট একটা ভিডিও পাঠিয়ে দিন। ৭ দিনের ভেতরে বদলে দিচ্ছি।',
      support: '২৪/৭ সাপোর্ট', supportDesc: 'সেটআপ, ডিম বসানোর পরামর্শ বা যেকোনো সমস্যায় ফোন, হোয়াটসঅ্যাপ বা এসএমএসে আমরা সবসময় আছি — ছুটির দিনেও।',
      delivery: 'সারাদেশে ডেলিভারি', deliveryDesc: 'সুন্দরবন, এসএ পরিবহন আর RedX দিয়ে ৬৪ জেলায় পাঠাই। ঢাকার ভেতরে ১–২ দিনে পেয়ে যাবেন।',
    },
    cart: {
      title: 'আপনার কার্ট', empty: 'কার্টে এখনো কিছু নেই।', total: 'সর্বমোট',
      checkout: 'চেকআউট', name: 'আপনার নাম', phone: 'মোবাইল নম্বর', address: 'ডেলিভারির ঠিকানা',
      confirm: 'হোয়াটসঅ্যাপে অর্ডার কনফার্ম করুন',
      hint: 'অর্ডারের সব তথ্যসহ আপনাকে হোয়াটসঅ্যাপে নিয়ে যাব।',
      placeholder_name: 'যেমন: রহিম উদ্দিন', placeholder_phone: '01XXXXXXXXX',
      placeholder_address: 'বাড়ি, রোড, এলাকা, জেলা',
    },
    footer: {
      quick: 'কুইক লিংক', home: 'হোম', products: 'প্রোডাক্ট', warranty: 'ওয়ারেন্টি',
      warrantyTitle: 'ওয়ারেন্টি',
      warrantyBody: 'সব ইনকিউবেটরে ইলেকট্রনিক পার্টসের জন্য ১ বছরের সার্ভিস ওয়ারেন্টি দিচ্ছি। ফ্যান আর গ্যাজেটে ৬ মাসের ওয়ারেন্টি। ভুল ব্যবহার, পানি ঢুকে যাওয়া বা নিজে খুলে নষ্ট হলে কিন্তু ওয়ারেন্টি থাকবে না।',
      tagline: 'প্রিমিয়াম ইনকিউবেটর আর খামারের ইলেকট্রনিক্স — আপনার পাশে আছি।',
      rights: 'সর্বস্বত্ব সংরক্ষিত।', developed: 'ডেভেলপ করেছেন',
    },
  },
  ...I18N_EXTRAS_DEFAULT,
};

const CATEGORIES = [
  { slug: 'Incubator', name_en: 'Incubator', name_bn: 'ইনকিউবেটর' },
  { slug: 'Fan', name_en: 'Fan', name_bn: 'ফ্যান' },
  { slug: 'Gadgets', name_en: 'Gadgets', name_bn: 'গ্যাজেট' },
];

const PRODUCTS = [
  {
    slug: 'inc-48', name_en: '48-Egg Automatic Incubator', name_bn: '৪৮-ডিম অটোমেটিক ইনকিউবেটর',
    category_slug: 'Incubator', price: 8500, old_price: 10000,
    image: 'https://images.unsplash.com/photo-1569127959161-2b1297b2d9a4?auto=format&fit=crop&w=900&q=80',
    description_en: 'Precision temperature and humidity control for consistently high hatch rates. Auto egg-turning every two hours frees you from manual work, and the LED candling window lets you monitor embryo development without opening the lid.',
    description_bn: 'ভালো হ্যাচ রেট পেতে তাপমাত্রা আর আর্দ্রতা একদম ঠিক রাখে। প্রতি ২ ঘণ্টায় ডিম নিজে নিজে ঘোরে, তাই হাত দিয়ে ঘোরানোর ঝামেলা নেই। ভেতরে এলইডি লাইট আছে, ঢাকনা না খুলেই দেখতে পারবেন বাচ্চা কেমন হলো।',
    specs: [
      { label: { en: 'Capacity', bn: 'ধারণক্ষমতা' }, value: '48টি মুরগির ডিম' },
      { label: { en: 'Power', bn: 'পাওয়ার' }, value: '60W / 220V' },
      { label: { en: 'Temperature Range', bn: 'তাপমাত্রা' }, value: '30°C – 40°C' },
      { label: { en: 'Warranty', bn: 'ওয়ারেন্টি' }, value: '১ বছর' },
    ],
    in_stock: true, low_stock: false,
  },
  {
    slug: 'inc-96', name_en: '96-Egg Industrial Incubator', name_bn: '৯৬-ডিম ইন্ডাস্ট্রিয়াল ইনকিউবেটর',
    category_slug: 'Incubator', price: 14500, old_price: 17000,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=900&q=80',
    description_en: 'A high-capacity workhorse built for hatchery starters and small commercial farms. Dual-fan circulation eliminates hot spots, automatic humidity keeps every egg in the optimal range, and an over-temperature alarm protects your investment.',
    description_bn: 'ছোট বাণিজ্যিক খামার বা হ্যাচারি শুরু করতে চাইলে এটাই বেস্ট। ভেতরে দুইটা ফ্যান, তাই গরম-ঠান্ডা সব জায়গায় সমান। আর্দ্রতা নিজে থেকেই ঠিক থাকে, আর তাপমাত্রা বেশি বাড়লে অ্যালার্ম বেজে ওঠে — কোনো ক্ষতি হবে না।',
    specs: [
      { label: { en: 'Capacity', bn: 'ধারণক্ষমতা' }, value: '96টি মুরগির ডিম' },
      { label: { en: 'Power', bn: 'পাওয়ার' }, value: '120W / 220V' },
      { label: { en: 'Hatch Rate', bn: 'হ্যাচ রেট' }, value: '৯৫% পর্যন্ত' },
      { label: { en: 'Warranty', bn: 'ওয়ারেন্টি' }, value: '১ বছর' },
    ],
    in_stock: true, low_stock: true,
  },
  {
    slug: 'inc-24', name_en: '24-Egg Mini Incubator', name_bn: '২৪-ডিম মিনি ইনকিউবেটর',
    category_slug: 'Incubator', price: 4200, old_price: null,
    image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=900&q=80',
    description_en: 'A compact, cost-effective starter unit for hobbyists, schools and home experiments. Manual turning keeps the design simple, while the digital display gives you accurate readings at a glance.',
    description_bn: 'বাসায় বা স্কুলে শখ করে ডিম ফোটাতে চাইলে এটা একদম পারফেক্ট। দাম কম, সাইজ ছোট। ডিম হাতে ঘোরাতে হবে, তবে ডিজিটাল ডিসপ্লেতে তাপমাত্রা স্পষ্ট দেখা যায়।',
    specs: [
      { label: { en: 'Capacity', bn: 'ধারণক্ষমতা' }, value: '24টি মুরগির ডিম' },
      { label: { en: 'Power', bn: 'পাওয়ার' }, value: '40W / 220V' },
      { label: { en: 'Turning', bn: 'টার্নিং' }, value: 'হাতে' },
      { label: { en: 'Warranty', bn: 'ওয়ারেন্টি' }, value: '৬ মাস' },
    ],
    in_stock: true, low_stock: false,
  },
  {
    slug: 'fan-ind-20', name_en: '20" Industrial Exhaust Fan', name_bn: '২০" ইন্ডাস্ট্রিয়াল এক্সহস্ট ফ্যান',
    category_slug: 'Fan', price: 6800, old_price: null,
    image: 'https://images.unsplash.com/photo-1565694073258-c3631f8c6e6e?auto=format&fit=crop&w=900&q=80',
    description_en: 'Heavy-duty 20-inch aluminium-blade exhaust fan engineered for poultry sheds and warehouses. High airflow keeps your flock cool and stress-free, while the low-noise motor stays whisper-quiet over long shifts.',
    description_bn: 'পোল্ট্রি শেড বা গুদামের জন্য মজবুত ২০ ইঞ্চি অ্যালুমিনিয়াম ব্লেডের ফ্যান। বাতাস টানে অনেক জোরে, মুরগি বা মালামাল গরমে কষ্ট পাবে না। মোটরের আওয়াজও কম, সারাদিন চললেও ঝামেলা নেই।',
    specs: [
      { label: { en: 'Blade', bn: 'ব্লেড' }, value: '২০ ইঞ্চি অ্যালুমিনিয়াম' },
      { label: { en: 'Airflow', bn: 'এয়ারফ্লো' }, value: '6500 m³/h' },
      { label: { en: 'Power', bn: 'পাওয়ার' }, value: '180W' },
      { label: { en: 'Warranty', bn: 'ওয়ারেন্টি' }, value: '৬ মাস' },
    ],
    in_stock: true, low_stock: false,
  },
  {
    slug: 'fan-rech', name_en: 'Rechargeable Stand Fan', name_bn: 'রিচার্জেবল স্ট্যান্ড ফ্যান',
    category_slug: 'Fan', price: 3500, old_price: 4200,
    image: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&w=900&q=80',
    description_en: '12-inch rechargeable stand fan with built-in LED light. Eight-hour battery backup keeps the air moving and the room lit through long load-shedding hours.',
    description_bn: '১২ ইঞ্চি রিচার্জেবল স্ট্যান্ড ফ্যান, সাথে এলইডি লাইট ফ্রি। লোডশেডিং হলেও চিন্তা নেই — একবার চার্জ দিলে ৮ ঘণ্টা পর্যন্ত চলে, সাথে ঘরে আলোও থাকে।',
    specs: [
      { label: { en: 'Backup', bn: 'ব্যাকআপ' }, value: '৬–৮ ঘণ্টা' },
      { label: { en: 'Battery', bn: 'ব্যাটারি' }, value: '12V / 7Ah' },
      { label: { en: 'Light', bn: 'লাইট' }, value: '২৪টি LED' },
      { label: { en: 'Warranty', bn: 'ওয়ারেন্টি' }, value: '৬ মাস' },
    ],
    in_stock: true, low_stock: false,
  },
  {
    slug: 'gad-thermo', name_en: 'Digital Hygro-Thermometer', name_bn: 'ডিজিটাল হাইগ্রো-থার্মোমিটার',
    category_slug: 'Gadgets', price: 650, old_price: null,
    image: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?auto=format&fit=crop&w=900&q=80',
    description_en: 'A precision dual-sensor meter for incubators, greenhouses and storage rooms. Reliable temperature and humidity readings help you act before problems start.',
    description_bn: 'ইনকিউবেটর, গ্রিনহাউস বা স্টোরেজ রুমে তাপমাত্রা আর আর্দ্রতা মাপার জন্য একদম নিখুঁত মিটার। ছোট হলেও কাজে দারুণ — সমস্যা হওয়ার আগেই বুঝতে পারবেন।',
    specs: [
      { label: { en: 'Range', bn: 'রেঞ্জ' }, value: '-10°C থেকে 70°C' },
      { label: { en: 'Accuracy', bn: 'নির্ভুলতা' }, value: '±1°C / ±5%' },
      { label: { en: 'Power', bn: 'পাওয়ার' }, value: '১টি AAA ব্যাটারি' },
      { label: { en: 'Warranty', bn: 'ওয়ারেন্টি' }, value: '৩ মাস' },
    ],
    in_stock: true, low_stock: false,
  },
];

export async function ensureSchema() {
  await q(`CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    items JSONB NOT NULL,
    total NUMERIC(12,2) NOT NULL,
    note TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`);
}

export async function seed() {
  await ensureSchema();

  const existing = await q<{ count: string }>('SELECT COUNT(*)::text as count FROM admin_users');
  if (Number(existing[0].count) === 0) {
    const hash = await bcrypt.hash(ADMIN_PASS, 10);
    await q('INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)', [ADMIN_USER, hash]);
    console.log(`[seed] Admin user "${ADMIN_USER}" created.`);
  }

  // Settings: insert defaults if missing, otherwise merge in any newly-added top-level keys
  const settingsRows = await q<{ value: any }>("SELECT value FROM settings WHERE key = 'i18n'");
  if (settingsRows.length === 0) {
    await q('INSERT INTO settings (key, value) VALUES ($1, $2)', ['i18n', JSON.stringify(I18N_DEFAULTS)]);
    console.log('[seed] Default i18n inserted.');
  } else {
    const cur = settingsRows[0].value || {};
    let changed = false;
    for (const k of Object.keys(I18N_EXTRAS_DEFAULT)) {
      if (cur[k] === undefined) { cur[k] = (I18N_EXTRAS_DEFAULT as any)[k]; changed = true; }
    }
    if (changed) {
      await q("UPDATE settings SET value = $1, updated_at = NOW() WHERE key = 'i18n'", [JSON.stringify(cur)]);
      console.log('[seed] i18n upgraded with new keys: testimonials/faq/contact.');
    }
  }

  const catRows = await q<{ count: string }>('SELECT COUNT(*)::text as count FROM categories');
  if (Number(catRows[0].count) === 0) {
    let i = 0;
    for (const c of CATEGORIES) {
      await q(
        'INSERT INTO categories (slug, name_en, name_bn, sort_order) VALUES ($1, $2, $3, $4)',
        [c.slug, c.name_en, c.name_bn, i++],
      );
    }
    console.log('[seed] Categories inserted.');
  }

  const prodRows = await q<{ count: string }>('SELECT COUNT(*)::text as count FROM products');
  if (Number(prodRows[0].count) === 0) {
    let i = 0;
    for (const p of PRODUCTS) {
      await q(
        `INSERT INTO products
          (slug, name_en, name_bn, category_slug, price, old_price, image,
           description_en, description_bn, specs, in_stock, low_stock, sort_order)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
        [
          p.slug, p.name_en, p.name_bn, p.category_slug, p.price, p.old_price, p.image,
          p.description_en, p.description_bn, JSON.stringify(p.specs),
          p.in_stock, p.low_stock, i++,
        ],
      );
    }
    console.log('[seed] Products inserted.');
  }
}

if (process.argv[1] && process.argv[1].endsWith('seed.ts')) {
  seed().then(() => pool.end()).catch((e) => { console.error(e); process.exit(1); });
}
