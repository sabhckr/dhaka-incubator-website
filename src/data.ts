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
      bn: 'ধারাবাহিকভাবে উচ্চ হ্যাচ রেটের জন্য নিখুঁত তাপমাত্রা ও আর্দ্রতা নিয়ন্ত্রণ। প্রতি দুই ঘণ্টায় অটো ডিম ঘোরানোর সুবিধা ম্যানুয়াল কাজ থেকে আপনাকে মুক্তি দেয়। এলইডি ক্যান্ডলিং উইন্ডো দিয়ে ঢাকনা না খুলেই ভ্রূণের বিকাশ পর্যবেক্ষণ করা যায়।',
    },
    specs: [
      { label: { en: 'Capacity', bn: 'ধারণক্ষমতা' }, value: '48 chicken eggs' },
      { label: { en: 'Power', bn: 'পাওয়ার' }, value: '60W / 220V' },
      { label: { en: 'Temperature Range', bn: 'তাপমাত্রা পরিসর' }, value: '30°C – 40°C' },
      { label: { en: 'Warranty', bn: 'ওয়ারেন্টি' }, value: '1 year' },
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
      bn: 'ছোট বাণিজ্যিক খামার ও হ্যাচারির জন্য টেকসই উচ্চ-ধারণক্ষমতার ইনকিউবেটর। ডুয়াল ফ্যান সঞ্চালন তাপমাত্রার অসমতা দূর করে, অটোমেটিক আর্দ্রতা প্রতিটি ডিমকে সঠিক পরিসরে রাখে, এবং ওভার-টেম্পারেচার অ্যালার্ম আপনার বিনিয়োগ সুরক্ষিত রাখে।',
    },
    specs: [
      { label: { en: 'Capacity', bn: 'ধারণক্ষমতা' }, value: '96 chicken eggs' },
      { label: { en: 'Power', bn: 'পাওয়ার' }, value: '120W / 220V' },
      { label: { en: 'Hatch Rate', bn: 'হ্যাচ রেট' }, value: 'up to 95%' },
      { label: { en: 'Warranty', bn: 'ওয়ারেন্টি' }, value: '1 year' },
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
      bn: 'হবিস্ট, বিদ্যালয় ও বাড়ির পরীক্ষার জন্য সাশ্রয়ী একটি কম্প্যাক্ট স্টার্টার ইউনিট। ম্যানুয়াল টার্নিং নকশাকে সহজ রাখে, এবং ডিজিটাল ডিসপ্লে এক নজরেই সঠিক রিডিং প্রদান করে।',
    },
    specs: [
      { label: { en: 'Capacity', bn: 'ধারণক্ষমতা' }, value: '24 chicken eggs' },
      { label: { en: 'Power', bn: 'পাওয়ার' }, value: '40W / 220V' },
      { label: { en: 'Turning', bn: 'টার্নিং' }, value: 'Manual' },
      { label: { en: 'Warranty', bn: 'ওয়ারেন্টি' }, value: '6 months' },
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
      bn: 'পোল্ট্রি শেড ও গুদামের জন্য প্রকৌশলী ২০-ইঞ্চি অ্যালুমিনিয়াম ব্লেড এক্সহস্ট ফ্যান। উচ্চ এয়ারফ্লো খামারের পশুপাখিকে ঠান্ডা ও চাপমুক্ত রাখে, এবং কম-শব্দের মোটর দীর্ঘ সময় নিঃশব্দে চলে।',
    },
    specs: [
      { label: { en: 'Blade', bn: 'ব্লেড' }, value: '20" Aluminium' },
      { label: { en: 'Airflow', bn: 'এয়ারফ্লো' }, value: '6500 m³/h' },
      { label: { en: 'Power', bn: 'পাওয়ার' }, value: '180W' },
      { label: { en: 'Warranty', bn: 'ওয়ারেন্টি' }, value: '6 months' },
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
      bn: '১২-ইঞ্চি রিচার্জেবল স্ট্যান্ড ফ্যান, বিল্ট-ইন এলইডি লাইটসহ। ৮ ঘণ্টার ব্যাটারি ব্যাকআপ দীর্ঘ লোডশেডিংয়েও ঘরে বাতাস ও আলো নিশ্চিত করে।',
    },
    specs: [
      { label: { en: 'Backup', bn: 'ব্যাকআপ' }, value: '6–8 hours' },
      { label: { en: 'Battery', bn: 'ব্যাটারি' }, value: '12V / 7Ah' },
      { label: { en: 'Light', bn: 'লাইট' }, value: '24 LED' },
      { label: { en: 'Warranty', bn: 'ওয়ারেন্টি' }, value: '6 months' },
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
      bn: 'ইনকিউবেটর, গ্রিনহাউস ও স্টোরেজ কক্ষের জন্য নিখুঁত ডুয়াল-সেন্সর মিটার। নির্ভরযোগ্য তাপমাত্রা ও আর্দ্রতা রিডিং সমস্যা হওয়ার আগেই পদক্ষেপ নিতে সাহায্য করে।',
    },
    specs: [
      { label: { en: 'Range', bn: 'পরিসর' }, value: '-10°C to 70°C' },
      { label: { en: 'Accuracy', bn: 'নির্ভুলতা' }, value: '±1°C / ±5%' },
      { label: { en: 'Power', bn: 'পাওয়ার' }, value: '1× AAA' },
      { label: { en: 'Warranty', bn: 'ওয়ারেন্টি' }, value: '3 months' },
    ],
  },
];
