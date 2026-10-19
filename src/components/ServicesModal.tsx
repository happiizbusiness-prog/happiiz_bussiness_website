import { useEffect, useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { SERVICES_DATA } from '../data/servicesData';
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
        return <Globe className="w-5 h-5 text-sky-400" />;
      case 'digital-marketing':
        return <TrendingUp className="w-5 h-5 text-orange-400" />;
      case 'seo':
        return <Search className="w-5 h-5 text-indigo-400" />;
      case 'social-media':
        return <Users className="w-5 h-5 text-pink-400" />;
      case 'lead-generation':
        return <Rocket className="w-5 h-5 text-emerald-400" />;
      case 'branding-design':
        return <Palette className="w-5 h-5 text-purple-400" />;
      case 'logo-design':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'business-cards':
        return <CreditCard className="w-5 h-5 text-blue-400" />;
      case 'letterhead-design':
        return <FileText className="w-5 h-5 text-teal-400" />;
      default:
        return <Layers className="w-5 h-5 text-slate-400" />;
    }
  };

  const categories = [
    { id: 'all', label: 'All Services (10)' },
    { id: 'web', label: 'Web & Tech' },
    { id: 'marketing', label: 'Digital Marketing & SEO' },
    { id: 'branding', label: 'Branding & Stationery' },
  ];

  const filteredServices = SERVICES_DATA.filter((s) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeServicesModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="services-modal-title"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl shadow-2xl border border-slate-800 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-orange-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Full Services Directory</span>
            </div>
            <span className="text-slate-600">·</span>
            <button
              onClick={() => {
                closeServicesModal();
                navigate('services');
              }}
              className="text-xs text-slate-400 hover:text-orange-400 flex items-center gap-1 transition-colors cursor-pointer"
              title="Open standalone page"
            >
              Full Page <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={closeServicesModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 id="services-modal-title" className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                Our 10 Core Agency Services
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
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
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-gradient-to-r from-[#ff5722] to-amber-500 text-white shadow-md'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
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
                className="group p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-orange-500/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-3 cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 shadow-2xs group-hover:scale-110 transition-transform">
                      {getServiceIcon(srv.slug)}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-950/50 border border-orange-900/60 px-2.5 py-0.5 rounded-md font-mono">
                      {srv.categoryLabel}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors flex items-center justify-between">
                      <span>{srv.title}</span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {srv.shortDesc}
                    </p>
                  </div>

                  {/* Deliverables snippet */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {srv.deliverables.slice(0, 2).map((d, i) => (
                      <span key={i} className="text-[10px] bg-slate-800/80 border border-slate-700/80 px-2 py-0.5 rounded text-slate-300 font-medium">
                        ✓ {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-orange-400 flex items-center gap-1 group-hover:text-amber-300 transition-colors">
                    <span>View Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeServicesModal();
                      openQuoteModal(srv.title);
                    }}
                    className="px-3 py-1 text-[11px] font-semibold text-slate-300 bg-slate-800 hover:bg-gradient-to-r hover:from-[#0056b3] hover:to-[#ff5722] hover:text-white border border-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Quick Quote
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>All services include transparent scope, milestone deliverable checklists, and priority WhatsApp support.</span>
            </div>
            <button
              onClick={() => {
                closeServicesModal();
                openQuoteModal('Custom Enterprise Package');
              }}
              className="text-xs font-bold text-orange-400 hover:underline shrink-0 cursor-pointer"
            >
              Get Custom Package Quote →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
