import { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { SERVICES_DATA } from '../data/servicesData';
import {
  Globe,
  TrendingUp,
  Search,
  Users,
  Rocket,
  Palette,
  Sparkles,
  CreditCard,
  FileText,
  Mail,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export function ServicesPage() {
  const { navigate, openQuoteModal } = useNavigation();
  const [filter, setFilter] = useState<'all' | 'web' | 'marketing' | 'design'>('all');

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (filter === 'all') return true;
    if (filter === 'web') return s.category === 'web-development';
    if (filter === 'marketing') return s.category === 'digital-marketing';
    if (filter === 'design') return s.category === 'graphic-design';
    return true;
  });

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'web-development':
        return <Globe className="w-5 h-5 text-blue-700" />;
      case 'digital-marketing':
        return <TrendingUp className="w-5 h-5 text-orange-600" />;
      case 'seo':
        return <Search className="w-5 h-5 text-indigo-700" />;
      case 'social-media':
        return <Users className="w-5 h-5 text-pink-600" />;
      case 'lead-generation':
        return <Rocket className="w-5 h-5 text-emerald-600" />;
      case 'branding-design':
        return <Palette className="w-5 h-5 text-purple-700" />;
      case 'logo-design':
        return <Sparkles className="w-5 h-5 text-amber-600" />;
      case 'business-cards':
        return <CreditCard className="w-5 h-5 text-blue-600" />;
      case 'letterhead-design':
        return <FileText className="w-5 h-5 text-teal-600" />;
      default:
        return <Mail className="w-5 h-5 text-slate-700" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
          <span>Our Core Capabilities</span>
          <span aria-hidden="true">·</span>
          <span>Digital Solutions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
          Tailored Services for Growing Enterprises
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          From modern web engineering to omnichannel digital marketing, B2B lead generation systems, and executive brand stationery—explore our complete service offerings.
        </p>
      </div>

      {/* Filter Tabs (Interactive Segmented Control adhering to rule 1.A) */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl w-fit border border-slate-200">
        {[
          { id: 'all', label: 'All Services' },
          { id: 'web', label: 'Website Development' },
          { id: 'marketing', label: 'Digital Marketing & SEO' },
          { id: 'design', label: 'Branding & Stationery' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filter === tab.id
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((srv, idx) => (
          <div
            key={srv.id}
            className="group p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  {getServiceIcon(srv.slug)}
                </div>
                <span className="text-xs font-mono font-medium text-slate-400">
                  0{idx + 1}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                  {srv.categoryLabel}
                </span>
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors mt-1">
                  {srv.title}
                </h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {srv.shortDesc}
                </p>
              </div>

              {/* Deliverable Highlights */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-bold text-slate-700">Key Deliverables:</span>
                <ul className="text-xs text-slate-600 space-y-1">
                  {srv.deliverables.slice(0, 3).map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span className="line-clamp-1">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => navigate(`services/${srv.slug}`)}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 group-hover:gap-1.5 transition-all"
              >
                <span>View Full Scope</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => openQuoteModal(srv.title)}
                className="text-xs font-medium text-slate-500 hover:text-slate-900"
              >
                Get Quote
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold tracking-tight">Need a Custom Bundled Package?</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            We provide special startup and enterprise bundle packages combining website development, Google Ads lead funnels, and full brand stationery.
          </p>
        </div>
        <button
          onClick={() => openQuoteModal('Custom Bundled Package')}
          className="px-6 py-3 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-md transition-colors whitespace-nowrap flex items-center gap-2"
        >
          <span>Request Custom Package</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
