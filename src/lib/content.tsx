import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { t as DEFAULT_T } from '../i18n';
import { PRODUCTS as DEFAULT_PRODUCTS, type Product, type Category } from '../data';

export type ApiCategory = { slug: string; name_en: string; name_bn: string; sort_order: number };
export type ApiProduct = {
  id: number; slug: string;
  name_en: string; name_bn: string;
  category_slug: string; price: number; old_price: number | null;
  image: string; description_en: string; description_bn: string;
  specs: { label: { en: string; bn: string }; value: string }[];
  in_stock: boolean; low_stock: boolean; sort_order: number;
};

type Content = {
  t: typeof DEFAULT_T;
  products: Product[];
  categories: ApiCategory[];
  loaded: boolean;
  reload: () => Promise<void>;
};

const Ctx = createContext<Content>({
  t: DEFAULT_T as any,
  products: DEFAULT_PRODUCTS,
  categories: [],
  loaded: false,
  reload: async () => {},
});

function toProduct(p: ApiProduct): Product {
  return {
    id: p.slug,
    name: { en: p.name_en, bn: p.name_bn },
    category: p.category_slug as Category,
    price: p.price,
    oldPrice: p.old_price ?? undefined,
    image: p.image,
    description: { en: p.description_en, bn: p.description_bn },
    specs: p.specs || [],
  };
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [t, setT] = useState<any>(DEFAULT_T);
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loaded, setLoaded] = useState(false);

  function applyData(data: any) {
    if (data?.i18n && data.i18n.en && data.i18n.bn) setT(data.i18n);
    if (Array.isArray(data?.categories)) setCategories(data.categories);
    if (Array.isArray(data?.products))
      setProducts(data.products.filter((p: ApiProduct) => p.in_stock).map(toProduct));
  }

  async function reload() {
    try {
      const r = await fetch('/api/content');
      if (!r.ok) throw new Error('content fetch failed');
      const data = await r.json();
      applyData(data);
      try { localStorage.setItem('di_content_v1', JSON.stringify(data)); } catch {}
      setLoaded(true);
    } catch {
      setLoaded(true);
    }
  }

  useEffect(() => {
    try {
      const cached = localStorage.getItem('di_content_v1');
      if (cached) applyData(JSON.parse(cached));
    } catch {}
    reload();
  }, []);

  return <Ctx.Provider value={{ t, products, categories, loaded, reload }}>{children}</Ctx.Provider>;
}

export const useContent = () => useContext(Ctx);
