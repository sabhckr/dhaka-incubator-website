import { MessageCircle } from 'lucide-react';
import type { Lang } from '../i18n';
import { useContent } from '../lib/content';

export default function FloatingWhatsApp({ lang }: { lang: Lang }) {
  const { t } = useContent();
  const c = (t as any).contact || {};
  const number = c.whatsapp || '8801712345678';
  const label = lang === 'bn' ? (c.floatingLabelBn || 'হোয়াটসঅ্যাপে চ্যাট করুন') : (c.floatingLabelEn || 'Chat on WhatsApp');
  const msg = lang === 'bn'
    ? (c.floatingMsgBn || 'আসসালামু আলাইকুম, আমি একটি পণ্য সম্পর্কে জানতে চাই।')
    : (c.floatingMsgEn || 'Hello! I have a question about your products.');
  const href = `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="group fixed bottom-5 left-5 z-30 inline-flex items-center gap-2 h-14 pl-4 pr-5 rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition"
    >
      <MessageCircle className="w-6 h-6" />
      <span className={`max-w-0 overflow-hidden whitespace-nowrap font-semibold opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-1 transition-all duration-300 ${lang === 'bn' ? 'font-bn' : ''}`}>
        {label}
      </span>
    </a>
  );
}
