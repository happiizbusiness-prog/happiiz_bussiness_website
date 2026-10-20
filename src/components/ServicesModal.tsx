import { useEffect, useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { useNavigation } from '../context/NavigationContext';
import {
  X,
  Globe,
  TrendingUp,
  Search,
  Users,
  Palette,
  CreditCard,
  FileText,
  Rocket,
  Sparkles,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers
} from 'lucide-react';

export function ServicesModal() {
  const { services } = useBusiness();
  const {
    isServicesModalOpen,
    closeServicesModal,
    openServiceDetailModal,
    openQuoteModal,
    navigate
  } = useNavigation();

  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Handle ESC key and scroll locking
  useEffect(() => {
    if (!isServicesModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeServicesModal();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isServicesModalOpen, closeServicesModal]);

  if (!isServicesModalOpen) return null;

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'web-development':
        return <Globe className="w-5 h-5 text-[#0056b3]" />;
      case 'digital-marketing':
        return <TrendingUp className="w-5 h-5 text-[#ff5722]" />;
      case 'seo':
        return <Search className="w-5 h-5 text-indigo-600" />;
      case 'social-media':
        return <Users className="w-5 h-5 text-pink-600" />;
      case 'lead-generation':
        return <Rocket className="w-5 h-5 text-emerald-600" />;
      case 'branding-design':
        return <Palette className="w-5 h-5 text-purple-600" />;
      case 'logo-design':
        return <Sparkles className="w-5 h-5 text-amber-600" />;
      case 'business-cards':
        return <CreditCard className="w-5 h-5 text-blue-600" />;
      case 'letterhead-design':
        return <FileText className="w-5 h-5 text-teal-600" />;
      default:
        return <Layers className="w-5 h-5 text-slate-500" />;
    }
  };

  const categories = [
    { id: 'all', label: 'All Services (10)' },
    { id: 'web', label: 'Web & Tech' },
    { id: 'marketing', label: 'Digital Marketing & SEO' },
    { id: 'branding', label: 'Branding & Stationery' },
  ];

  const filteredServices = services.filter((s) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'web') return s.category === 'web-development';
    if (activeCategory === 'marketing')
      return ['digital-marketing', 'seo', 'social-media', 'lead-generation'].includes(s.category);
    if (activeCategory === 'branding')
      return ['branding-design', 'logo-design', 'business-cards', 'letterhead-design', 'envelope-design'].includes(s.category);
    return true;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeServicesModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="services-modal-title"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50/70 via-white to-orange-50/50 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#0056b3]">
              <Sparkles className="w-3.5 h-3.5 text-[#ff5722]" />
              <span>Full Services Directory</span>
            </div>
            <span className="text-slate-300">·</span>
            <button
              onClick={() => {
                closeServicesModal();
                navigate('services');
              }}
              className="text-xs text-slate-500 hover:text-[#0056b3] flex items-center gap-1 transition-colors cursor-pointer"
              title="Open standalone page"
            >
              Full Page <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={closeServicesModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 id="services-modal-title" className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Our 10 Core Agency Services
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                Click any service below to explore detailed deliverables, process timeline, pricing tiers, and specialized execution standards.
              </p>
            </div>

            <button
              onClick={() => {
                closeServicesModal();
                openQuoteModal();
              }}
              className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] hover:opacity-95 rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
            >
              Request Custom Quote
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-gradient-to-r from-[#0056b3] to-[#ff5722] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServices.map((srv) => (
              <div
                key={srv.id}
                onClick={() => openServiceDetailModal(srv.slug)}
                className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#0056b3] hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-3 cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-100 shadow-2xs group-hover:scale-110 transition-transform">
                      {getServiceIcon(srv.slug)}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0056b3] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md font-mono">
                      {srv.categoryLabel}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0056b3] transition-colors flex items-center justify-between">
                      <span>{srv.title}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#ff5722] group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {srv.shortDesc}
                    </p>
                  </div>

                  {/* Deliverables snippet */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {srv.deliverables.slice(0, 2).map((d, i) => (
                      <span key={i} className="text-[10px] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-700 font-medium">
                        ✓ {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0056b3] flex items-center gap-1 group-hover:text-[#ff5722] transition-colors">
                    <span>View Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeServicesModal();
                      openQuoteModal(srv.title);
                    }}
                    className="px-3 py-1 text-[11px] font-semibold text-slate-700 bg-slate-50 hover:bg-gradient-to-r hover:from-[#0056b3] hover:to-[#ff5722] hover:text-white border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Quick Quote
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>All services include transparent scope, milestone deliverable checklists, and priority WhatsApp support.</span>
            </div>
            <button
              onClick={() => {
                closeServicesModal();
                openQuoteModal('Custom Enterprise Package');
              }}
              className="text-xs font-bold text-[#0056b3] hover:text-[#ff5722] hover:underline shrink-0 cursor-pointer"
            >
              Get Custom Package Quote →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
