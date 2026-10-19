import { useBusiness } from '../context/BusinessContext';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const { settings } = useBusiness();

  const rawPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const greeting = encodeURIComponent(
    `Hello ${settings.businessName}! I am interested in discussing a project (Website / Marketing / Branding). Could you please share more information?`
  );
  const waUrl = `https://wa.me/${rawPhone}?text=${greeting}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center gap-2.5 px-3.5 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline text-xs font-semibold tracking-wide whitespace-nowrap">
          Chat with Us
        </span>
      </a>
      {/* Subtle indicator tooltip on mobile */}
      <div className="absolute bottom-full right-0 mb-2 hidden sm:group-hover:block transition-all">
        <div className="bg-slate-900 text-white text-[11px] font-medium py-1 px-2.5 rounded shadow-md whitespace-nowrap">
          Direct WhatsApp Support
        </div>
      </div>
    </div>
  );
}
