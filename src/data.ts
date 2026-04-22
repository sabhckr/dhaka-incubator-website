export type Category = 'Incubator' | 'Fan' | 'Gadgets';

export type Product = {
  id: string;
  name: { en: string; bn: string };
  category: Category;
  price: number;
  oldPrice?: number;
  image: string;
  description: { en: string; bn: string };
  specs: { label: { en: string; bn: string }; value: string }[];
};

export const PRODUCTS: Product[] = [
  {
    id: 'inc-48',
    name: { en: '48-Egg Automatic Incubator', bn: '৪৮-ডিম অটোমেটিক ইনকিউবেটর' },
    category: 'Incubator',
    price: 8500,
    oldPrice: 10000,
    image: 'https://images.unsplash.com/photo-1569127959161-2b1297b2d9a4?auto=format&fit=crop&w=900&q=80',
    description: {
      en: 'Precision temperature and humidity control for consistently high hatch rates. Auto egg-turning every two hours frees you from manual work, and the LED candling window lets you monitor embryo development without opening the lid.',
      bn: 'ভালো হ্যাচ রেট পেতে তাপমাত্রা আর আর্দ্রতা একদম ঠিক রাখে। প্রতি ২ ঘণ্টায় ডিম নিজে নিজে ঘোরে, তাই হাত দিয়ে ঘোরানোর ঝামেলা নেই। ভেতরে এলইডি লাইট আছে, ঢাকনা না খুলেই দেখতে পারবেন বাচ্চা কেমন হলো।',
    },
    specs: [
      { label: { en: 'Capacity', bn: 'ধারণক্ষমতা' }, value: '48টি মুরগির ডিম' },
      { label: { en: 'Power', bn: 'পাওয়ার' }, value: '60W / 220V' },
      { label: { en: 'Temperature Range', bn: 'তাপমাত্রা' }, value: '30°C – 40°C' },
      { label: { en: 'Warranty', bn: 'ওয়ারেন্টি' }, value: '১ বছর' },
    ],
  },
  {
    id: 'inc-96',
    name: { en: '96-Egg Industrial Incubator', bn: '৯৬-ডিম ইন্ডাস্ট্রিয়াল ইনকিউবেটর' },
    category: 'Incubator',
    price: 14500,
    oldPrice: 17000,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=900&q=80',
    description: {
      en: 'A high-capacity workhorse built for hatchery starters and small commercial farms. Dual-fan circulation eliminates hot spots, automatic humidity keeps every egg in the optimal range, and an over-temperature alarm protects your investment.',
      bn: 'ছোট বাণিজ্যিক খামার বা হ্যাচারি শুরু করতে চাইলে এটাই বেস্ট। ভেতরে দুইটা ফ্যান, তাই গরম-ঠান্ডা সব জায়গায় সমান। আর্দ্রতা নিজে থেকেই ঠিক থাকে, আর তাপমাত্রা বেশি বাড়লে অ্যালার্ম বেজে ওঠে — কোনো ক্ষতি হবে না।',
    },
    specs: [
      { label: { en: 'Capacity', bn: 'ধারণক্ষমতা' }, value: '96টি মুরগির ডিম' },
      { label: { en: 'Power', bn: 'পাওয়ার' }, value: '120W / 220V' },
      { label: { en: 'Hatch Rate', bn: 'হ্যাচ রেট' }, value: '৯৫% পর্যন্ত' },
      { label: { en: 'Warranty', bn: 'ওয়ারেন্টি' }, value: '১ বছর' },
    ],
  },
  {
    id: 'inc-24',
    name: { en: '24-Egg Mini Incubator', bn: '২৪-ডিম মিনি ইনকিউবেটর' },
    category: 'Incubator',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=900&q=80',
    description: {
      en: 'A compact, cost-effective starter unit for hobbyists, schools and home experiments. Manual turning keeps the design simple, while the digital display gives you accurate readings at a glance.',
      bn: 'বাসায় বা স্কুলে শখ করে ডিম ফোটাতে চাইলে এটা একদম পারফেক্ট। দাম কম, সাইজ ছোট। ডিম হাতে ঘোরাতে হবে, তবে ডিজিটাল ডিসপ্লেতে তাপমাত্রা স্পষ্ট দেখা যায়।',
    },
    specs: [
      { label: { en: 'Capacity', bn: 'ধারণক্ষমতা' }, value: '24টি মুরগির ডিম' },
      { label: { en: 'Power', bn: 'পাওয়ার' }, value: '40W / 220V' },
      { label: { en: 'Turning', bn: 'টার্নিং' }, value: 'হাতে' },
      { label: { en: 'Warranty', bn: 'ওয়ারেন্টি' }, value: '৬ মাস' },
    ],
  },
  {
    id: 'fan-ind-20',
    name: { en: '20" Industrial Exhaust Fan', bn: '২০" ইন্ডাস্ট্রিয়াল এক্সহস্ট ফ্যান' },
    category: 'Fan',
    price: 6800,
    image: 'https://images.unsplash.com/photo-1565694073258-c3631f8c6e6e?auto=format&fit=crop&w=900&q=80',
    description: {
      en: 'Heavy-duty 20-inch aluminium-blade exhaust fan engineered for poultry sheds and warehouses. High airflow keeps your flock cool and stress-free, while the low-noise motor stays whisper-quiet over long shifts.',
      bn: 'পোল্ট্রি শেড বা গুদামের জন্য মজবুত ২০ ইঞ্চি অ্যালুমিনিয়াম ব্লেডের ফ্যান। বাতাস টানে অনেক জোরে, মুরগি বা মালামাল গরমে কষ্ট পাবে না। মোটরের আওয়াজও কম, সারাদিন চললেও ঝামেলা নেই।',
    },
    specs: [
      { label: { en: 'Blade', bn: 'ব্লেড' }, value: '২০ ইঞ্চি অ্যালুমিনিয়াম' },
      { label: { en: 'Airflow', bn: 'এয়ারফ্লো' }, value: '6500 m³/h' },
      { label: { en: 'Power', bn: 'পাওয়ার' }, value: '180W' },
      { label: { en: 'Warranty', bn: 'ওয়ারেন্টি' }, value: '৬ মাস' },
    ],
  },
  {
    id: 'fan-rech',
    name: { en: 'Rechargeable Stand Fan', bn: 'রিচার্জেবল স্ট্যান্ড ফ্যান' },
    category: 'Fan',
    price: 3500,
    oldPrice: 4200,
    image: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&w=900&q=80',
    description: {
      en: '12-inch rechargeable stand fan with built-in LED light. Eight-hour battery backup keeps the air moving and the room lit through long load-shedding hours.',
      bn: '১২ ইঞ্চি রিচার্জেবল স্ট্যান্ড ফ্যান, সাথে এলইডি লাইট ফ্রি। লোডশেডিং হলেও চিন্তা নেই — একবার চার্জ দিলে ৮ ঘণ্টা পর্যন্ত চলে, সাথে ঘরে আলোও থাকে।',
    },
    specs: [
      { label: { en: 'Backup', bn: 'ব্যাকআপ' }, value: '৬–৮ ঘণ্টা' },
      { label: { en: 'Battery', bn: 'ব্যাটারি' }, value: '12V / 7Ah' },
      { label: { en: 'Light', bn: 'লাইট' }, value: '২৪টি LED' },
      { label: { en: 'Warranty', bn: 'ওয়ারেন্টি' }, value: '৬ মাস' },
    ],
  },
  {
    id: 'gad-thermo',
    name: { en: 'Digital Hygro-Thermometer', bn: 'ডিজিটাল হাইগ্রো-থার্মোমিটার' },
    category: 'Gadgets',
    price: 650,
    image: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?auto=format&fit=crop&w=900&q=80',
    description: {
      en: 'A precision dual-sensor meter for incubators, greenhouses and storage rooms. Reliable temperature and humidity readings help you act before problems start.',
      bn: 'ইনকিউবেটর, গ্রিনহাউস বা স্টোরেজ রুমে তাপমাত্রা আর আর্দ্রতা মাপার জন্য একদম নিখুঁত মিটার। ছোট হলেও কাজে দারুণ — সমস্যা হওয়ার আগেই বুঝতে পারবেন।',
    },
    specs: [
      { label: { en: 'Range', bn: 'রেঞ্জ' }, value: '-10°C থেকে 70°C' },
      { label: { en: 'Accuracy', bn: 'নির্ভুলতা' }, value: '±1°C / ±5%' },
      { label: { en: 'Power', bn: 'পাওয়ার' }, value: '১টি AAA ব্যাটারি' },
      { label: { en: 'Warranty', bn: 'ওয়ারেন্টি' }, value: '৩ মাস' },
    ],
  },
];
