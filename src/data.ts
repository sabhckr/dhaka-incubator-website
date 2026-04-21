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
      en: 'Fully automatic 48-egg incubator with digital temperature & humidity control, auto egg-turning, and LED candling window. Perfect for hobbyists and small farms.',
      bn: 'সম্পূর্ণ অটোমেটিক ৪৮-ডিম ইনকিউবেটর। ডিজিটাল তাপমাত্রা ও আর্দ্রতা নিয়ন্ত্রণ, অটো ডিম ঘোরানো এবং এলইডি ক্যান্ডলিং উইন্ডো সহ।',
    },
    specs: [
      { label: { en: 'Capacity', bn: 'ক্যাপাসিটি' }, value: '48 chicken eggs' },
      { label: { en: 'Power', bn: 'পাওয়ার' }, value: '60W / 220V' },
      { label: { en: 'Temp Range', bn: 'তাপমাত্রা' }, value: '30°C – 40°C' },
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
      en: 'High-capacity 96-egg incubator built for hatchery starters. Dual-fan circulation, auto humidity, and over-temp alarm.',
      bn: '৯৬-ডিম ক্ষমতার ইন্ডাস্ট্রিয়াল ইনকিউবেটর। ডুয়াল ফ্যান, অটো আর্দ্রতা ও ওভার-টেম্প অ্যালার্ম সহ।',
    },
    specs: [
      { label: { en: 'Capacity', bn: 'ক্যাপাসিটি' }, value: '96 chicken eggs' },
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
      en: 'Compact 24-egg incubator ideal for hobbyists, schools, and home experiments. Manual turning, digital display.',
      bn: 'হবিস্ট, স্কুল ও বাড়ির জন্য আদর্শ ২৪-ডিম কম্প্যাক্ট ইনকিউবেটর। ম্যানুয়াল টার্নিং ও ডিজিটাল ডিসপ্লে।',
    },
    specs: [
      { label: { en: 'Capacity', bn: 'ক্যাপাসিটি' }, value: '24 chicken eggs' },
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
      en: 'Heavy-duty 20-inch metal-blade exhaust fan for poultry farms and warehouses. High airflow, low noise.',
      bn: 'পোল্ট্রি ফার্ম ও গুদামের জন্য ২০-ইঞ্চি ভারী মেটাল ব্লেড এক্সহস্ট ফ্যান। উচ্চ এয়ারফ্লো, কম শব্দ।',
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
      en: '12-inch rechargeable stand fan with built-in LED light. 8-hour backup, ideal for load-shedding hours.',
      bn: '১২-ইঞ্চি রিচার্জেবল স্ট্যান্ড ফ্যান, বিল্ট-ইন এলইডি লাইট সহ। ৮ ঘণ্টা ব্যাকআপ — লোডশেডিং-এ আদর্শ।',
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
      en: 'Precision dual-sensor temperature & humidity meter for incubators, greenhouses, and storage rooms.',
      bn: 'ইনকিউবেটর, গ্রিনহাউস ও স্টোরেজের জন্য প্রিসিশন ডুয়াল-সেন্সর তাপমাত্রা ও আর্দ্রতা মিটার।',
    },
    specs: [
      { label: { en: 'Range', bn: 'রেঞ্জ' }, value: '-10°C to 70°C' },
      { label: { en: 'Accuracy', bn: 'অ্যাকুরেসি' }, value: '±1°C / ±5%' },
      { label: { en: 'Power', bn: 'পাওয়ার' }, value: '1× AAA' },
      { label: { en: 'Warranty', bn: 'ওয়ারেন্টি' }, value: '3 months' },
    ],
  },
];
