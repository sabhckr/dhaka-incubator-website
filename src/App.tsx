import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import TrustBadges from './components/TrustBadges';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import CartDrawer, { type CartItem } from './components/CartDrawer';
import Footer from './components/Footer';
import type { Product } from './data';
import type { Lang } from './i18n';

export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  useEffect(() => {
    document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';
  }, [lang]);

  function addToCart(p: Product) {
    setCart((prev) => {
      const found = prev.find((i) => i.product.id === p.id);
      if (found) return prev.map((i) => (i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { product: p, qty: 1 }];
    });
    setCartOpen(true);
  }

  function setQty(id: string, qty: number) {
    setCart((prev) => (qty <= 0 ? prev.filter((i) => i.product.id !== id) : prev.map((i) => (i.product.id === id ? { ...i, qty } : i))));
  }
  function remove(id: string) { setCart((prev) => prev.filter((i) => i.product.id !== id)); }

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  return (
    <div className={lang === 'bn' ? 'font-bn' : ''}>
      <Navbar lang={lang} setLang={setLang} cartCount={cartCount} openCart={() => setCartOpen(true)} />
      <main>
        <Hero lang={lang} />
        <ProductGrid lang={lang} onAdd={addToCart} onView={setActiveProduct} />
        <TrustBadges lang={lang} />
        <Testimonials lang={lang} />
        <FAQ lang={lang} />
      </main>
      <Footer lang={lang} />
      <ProductModal product={activeProduct} lang={lang} onClose={() => setActiveProduct(null)} onAdd={addToCart} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cart} setQty={setQty} remove={remove} lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
