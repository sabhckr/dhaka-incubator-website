import { Egg, Phone, Truck, ShieldCheck } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-slate-800">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Egg className="w-7 h-7 text-amber-600" />
            <span className="font-bold text-lg">Dhaka Incubator & Electronic</span>
          </div>
          <a href="tel:+8801000000000" className="inline-flex items-center gap-2 text-amber-700 font-semibold">
            <Phone className="w-4 h-4" /> Call Now
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Premium Egg Incubators in Bangladesh
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Automatic & Manual incubators with Cash on Delivery across Bangladesh.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <a href="#products" className="px-5 py-3 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700">
              Shop Incubators
            </a>
            <a href="#contact" className="px-5 py-3 rounded-lg border border-amber-600 text-amber-700 font-semibold hover:bg-amber-50">
              Contact Us
            </a>
          </div>
        </section>

        <section id="products" className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            { name: '48-Egg Automatic', price: '৳ 8,500', desc: 'Auto turning, digital temperature & humidity.' },
            { name: '96-Egg Automatic', price: '৳ 14,500', desc: 'Larger capacity for hatchery starters.' },
            { name: '24-Egg Manual', price: '৳ 4,200', desc: 'Affordable manual model for hobbyists.' },
          ].map((p) => (
            <div key={p.name} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <div className="aspect-video bg-amber-100 rounded-lg mb-4 flex items-center justify-center">
                <Egg className="w-16 h-16 text-amber-500" />
              </div>
              <h3 className="font-bold text-xl">{p.name}</h3>
              <p className="text-slate-600 mt-1">{p.desc}</p>
              <div className="mt-3 text-amber-700 font-bold text-lg">{p.price}</div>
            </div>
          ))}
        </section>

        <section className="grid md:grid-cols-3 gap-6 mt-20">
          <Feature icon={<Truck className="w-6 h-6" />} title="Cash on Delivery" body="Pay when you receive your order anywhere in Bangladesh." />
          <Feature icon={<ShieldCheck className="w-6 h-6" />} title="1 Year Warranty" body="All incubators come with a 1-year service warranty." />
          <Feature icon={<Phone className="w-6 h-6" />} title="Expert Support" body="Get setup help and hatching tips from our team." />
        </section>

        <section id="contact" className="mt-20 bg-white rounded-xl border border-slate-100 p-8 text-center">
          <h2 className="text-2xl font-bold">Order Today</h2>
          <p className="mt-2 text-slate-600">Call or message us to place your order.</p>
          <a href="tel:+8801000000000" className="inline-flex items-center gap-2 mt-4 px-5 py-3 rounded-lg bg-amber-600 text-white font-semibold">
            <Phone className="w-4 h-4" /> +880 1000-000000
          </a>
        </section>
      </main>

      <footer className="py-8 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Dhaka Incubator & Electronic
      </footer>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="p-6 bg-white rounded-xl border border-slate-100">
      <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">{icon}</div>
      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="text-slate-600 mt-1">{body}</p>
    </div>
  );
}
