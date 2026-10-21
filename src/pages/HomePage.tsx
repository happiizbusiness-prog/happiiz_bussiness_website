import { useBusiness } from '../context/BusinessContext';
import { useNavigation } from '../context/NavigationContext';
import { SERVICES_DATA } from '../data/servicesData';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { HappiizLogo } from '../components/HappiizLogo';
import {
  ArrowRight,
  Sparkles,
  Globe,
  TrendingUp,
  Search,
  Users,
  Palette,
  CreditCard,
  FileText,
  Mail,
  CheckCircle2,
  Rocket,
  ShieldCheck,
  ChevronRight,
  Zap,
  Award,
  Layers,
  PhoneCall
} from 'lucide-react';

export function HomePage() {
  const { settings, services, portfolio, testimonials } = useBusiness();
  const {
    navigate,
    openAboutModal,
    openQuoteModal,
    openServicesModal,
    openServiceDetailModal,
    openPortfolioModal,
    openContactModal,
    openRoadmapModal
  } = useNavigation();

  // Map icons for services
  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'web-development':
        return <Globe className="w-4 h-4 text-blue-600" />;
      case 'digital-marketing':
        return <TrendingUp className="w-4 h-4 text-orange-500" />;
      case 'seo':
        return <Search className="w-4 h-4 text-indigo-600" />;
      case 'social-media':
        return <Users className="w-4 h-4 text-pink-500" />;
      case 'lead-generation':
        return <Rocket className="w-4 h-4 text-emerald-600" />;
      case 'branding-design':
        return <Palette className="w-4 h-4 text-purple-600" />;
      case 'logo-design':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'business-cards':
        return <CreditCard className="w-4 h-4 text-blue-500" />;
      case 'letterhead-design':
        return <FileText className="w-4 h-4 text-teal-600" />;
      default:
        return <Mail className="w-4 h-4 text-slate-700" />;
    }
  };

  // Multipliers for seamless infinite marquee scrolling
  const marqueeServices = [...services, ...services];
  const marqueePortfolio = [...portfolio, ...portfolio, ...portfolio];
  const marqueeTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="space-y-12 sm:space-y-16 md:space-y-24 pb-20">
      {/* SECTION A: HERO SECTION */}
      <section className="relative pt-6 md:pt-14 pb-8 overflow-hidden bg-gradient-to-b from-blue-50/70 via-orange-50/30 to-white">
        {/* Subtle Decorative Background Blurs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              {/* Official Agency Priority Kicker */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs text-[11px] font-semibold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-pulse" />
                <span className="text-[#0056b3] font-bold">Your Business Our Priority</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600 font-medium">Digital Agency & Growth Partner</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
                We Engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0056b3] via-[#0284c7] to-[#004ea8]">High-Growth Websites</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5722] to-[#ea580c]">Brand Systems</span>.
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                At <strong className="text-slate-900 font-bold">{settings.businessName}</strong>, we blend modern web engineering, data-driven lead funnels, and executive corporate stationery to turn ambitious enterprises into undisputed market leaders.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => openQuoteModal('Website Design & Development')}
                  className="px-6 py-3 text-xs sm:text-sm font-bold text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #0056b3 0%, #004ea8 100%)',
                    boxShadow: '0 8px 20px -4px rgba(0, 86, 179, 0.35)'
                  }}
                >
                  <span>Request Free Project Quote</span>
                  <ArrowRight className="w-4 h-4 text-orange-300" />
                </button>

                <button
                  onClick={() => openRoadmapModal()}
                  className="px-5 py-3 text-xs sm:text-sm font-bold text-slate-800 bg-white border border-slate-300 hover:border-orange-400 rounded-xl hover:bg-orange-50/40 transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#ff5722]" />
                  <span>7-Step Delivery Roadmap</span>
                </button>
              </div>

              {/* Quick Trust Badges Strip */}
              <div className="pt-4 border-t border-slate-200/90 grid grid-cols-3 gap-3 text-slate-600">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 font-display font-black text-xl sm:text-2xl text-[#0056b3] tabular-nums">
                    <span>99%</span>
                    <Zap className="w-3.5 h-3.5 text-[#ff5722]" />
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-medium text-slate-500">Core Web Vitals</div>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 font-display font-black text-xl sm:text-2xl text-[#ff5722] tabular-nums">
                    <span>+140%</span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-medium text-slate-500">Inbound Pipeline</div>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 font-display font-black text-xl sm:text-2xl text-emerald-600 tabular-nums">
                    <span>100%</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-medium text-slate-500">Asset Ownership</div>
                </div>
              </div>
            </div>

            {/* Right Hero Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl bg-slate-950 aspect-[16/10] sm:aspect-[4/3] group">
                <img
                  src={settings.heroImageUrl || "/src/assets/images/hero_digital_agency_1792393542382.jpg"}
                  alt="Happiiz Creative Digital Agency Studio"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                {/* Floating Brand Badge in Corner */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2">
                  <HappiizLogo variant="emblem-only" />
                  <div className="pr-1">
                    <div className="text-[10px] font-extrabold text-[#0056b3] leading-none">Happiiz</div>
                    <div className="text-[7px] font-bold text-[#ff5722] tracking-wider uppercase">Business Solutions</div>
                  </div>
                </div>

                {/* Floating Metrics Pill */}
                <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md text-white px-2.5 py-1 rounded-xl shadow-lg border border-slate-800 text-[10px] sm:text-xs font-semibold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verified Agency Partner</span>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-0.5">
                    Next-Gen Agency Architecture
                  </div>
                  <div className="text-xs sm:text-sm font-medium leading-snug text-slate-100 line-clamp-1">
                    Precision engineering meets high-converting brand strategy.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Capabilities Filter Bar (Opens Service Popups directly) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 pt-6 border-t border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Explore Our Core Solutions
            </span>
            <button
              onClick={() => openServicesModal()}
              className="text-xs font-semibold text-[#0056b3] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All 10 Services</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {[
              { label: 'Websites', slug: 'web-development', color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
              { label: 'Digital Ads', slug: 'digital-marketing', color: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100' },
              { label: 'SEO Rank', slug: 'seo', color: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' },
              { label: 'Social Media', slug: 'social-media', color: 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100' },
              { label: 'Lead Gen', slug: 'lead-generation', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
              { label: 'Brand & Logo', slug: 'logo-design', color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
              { label: 'Stationery', slug: 'business-cards', color: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100' },
              { label: 'All Services', slug: 'all', color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' }
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => (item.slug === 'all' ? openServicesModal() : openServiceDetailModal(item.slug))}
                className={`p-2.5 rounded-xl border text-center transition-all duration-200 shadow-2xs hover:scale-105 cursor-pointer ${item.color}`}
              >
                <div className="text-[11px] font-bold truncate">{item.label}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION B: ABOUT PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                About Our Agency
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                Crafting Digital Solutions Engineered for Real Commercial Growth
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong className="text-slate-900">{settings.businessName}</strong> operates at the intersection of technical discipline, aesthetic precision, and conversion psychology. We engineer complete digital growth engines that turn clicks into clients.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={openAboutModal}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-2xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>About Happiiz Solutions</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => openRoadmapModal()}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  View Delivery Roadmap
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="text-[10px] font-bold text-blue-700 uppercase">01. Discovery & Strategy</div>
                <h3 className="text-xs font-semibold text-slate-900">Commercial Alignment</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Understanding buyer economics, lifetime value, and commercial objections.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="text-[10px] font-bold text-orange-600 uppercase">02. Modern Craft</div>
                <h3 className="text-xs font-semibold text-slate-900">Zero-Bloat Code</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Clean React & TypeScript engineering with lightning-fast speeds.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="text-[10px] font-bold text-emerald-600 uppercase">03. Omnichannel</div>
                <h3 className="text-xs font-semibold text-slate-900">Unified Branding</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Stationery, visiting cards, and web platforms speaking with one voice.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="text-[10px] font-bold text-purple-700 uppercase">04. Dedicated Care</div>
                <h3 className="text-xs font-semibold text-slate-900">Partnership Mindset</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Direct WhatsApp access to our senior specialists for continuous evolution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. SCROLLING SECTION: COMPREHENSIVE DIGITAL & BRANDING SERVICES (COMPACT SIZE FOR MOBILE) */}
      <section className="space-y-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#0056b3]">
              <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-ping" />
              <span>Live Feed</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-medium">Continuous Scroll (Hover to Pause)</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Comprehensive Digital & Branding Services
            </h2>
          </div>
          <button
            onClick={() => openServicesModal()}
            className="text-xs font-bold text-[#0056b3] hover:text-[#ff5722] flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Compact Scrolling Track (Jo Chalta Rahe, Small Size on Mobile) */}
        <div className="relative w-full overflow-hidden py-2 select-none">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee pause-on-hover flex gap-4 px-4">
            {marqueeServices.map((srv, idx) => (
              <div
                key={`${srv.id}-${idx}`}
                onClick={() => openServiceDetailModal(srv.slug)}
                className="w-[220px] sm:w-[260px] md:w-[280px] shrink-0 group p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-blue-50 to-orange-50 border border-slate-100 shadow-2xs group-hover:scale-105 transition-transform">
                      {getServiceIcon(srv.slug)}
                    </div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {(idx % (services.length || 1)) + 1 < 10 ? `0${(idx % (services.length || 1)) + 1}` : (idx % (services.length || 1)) + 1}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] font-extrabold tracking-wider text-[#ff5722] uppercase">
                      {srv.categoryLabel}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0056b3] transition-colors mt-0.5 line-clamp-1">
                      {srv.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed line-clamp-2">
                      {srv.shortDesc}
                    </p>
                  </div>

                  {/* Compact Deliverables */}
                  <div className="pt-1.5 border-t border-slate-100 space-y-1">
                    <div className="flex flex-wrap gap-1">
                      {srv.deliverables.slice(0, 2).map((d, i) => (
                        <span key={i} className="text-[9px] bg-slate-50 border border-slate-200/80 px-1.5 py-0.5 rounded text-slate-700 truncate max-w-[210px]">
                          ✓ {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#0056b3] group-hover:text-[#ff5722] flex items-center gap-0.5 transition-colors">
                    <span>Details</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openQuoteModal(srv.title);
                    }}
                    className="px-2.5 py-1 text-[10px] font-semibold text-white bg-slate-900 hover:bg-[#0056b3] rounded-lg transition-colors shadow-2xs cursor-pointer"
                  >
                    Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. OUR 7-STEP PROVEN DELIVERY ROADMAP (SLEEK COMPACT TEASER THAT OPENS POPUP) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          onClick={openRoadmapModal}
          className="group p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 border border-slate-800 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:border-orange-500/60 transition-all hover:scale-[1.01]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">Our Delivery Blueprint</span>
                <span className="text-[9px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-mono">7-Phases</span>
                <span className="text-[9px] text-slate-400 hidden sm:inline">· Image Previews & Markings</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
                Our 7-Step Proven Delivery Roadmap
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-1">
                Every project follows our disciplined 7–phase execution protocol with verified markings, real deliverables, and specialized engineering skills.
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openRoadmapModal();
            }}
            className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] rounded-xl shadow-md transition-all shrink-0 flex items-center gap-1.5 group-hover:opacity-95 cursor-pointer"
          >
            <span>View 7-Step Delivery Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </section>

      {/* 3. SCROLLING SECTION: FEATURED PORTFOLIO (COMPACT SIZE FOR MOBILE) */}
      <section className="space-y-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#0056b3]">
              <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-ping" />
              <span>Showcase Reel</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-medium">Continuous Scroll (Hover to Pause)</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Engineered for Real Impact
            </h2>
          </div>
          <button
            onClick={() => openPortfolioModal()}
            className="text-xs font-bold text-[#0056b3] hover:text-[#ff5722] flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Compact Scrolling Portfolio Track */}
        <div className="relative w-full overflow-hidden py-2 select-none">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee-slow pause-on-hover flex gap-4 px-4">
            {marqueePortfolio.map((proj, idx) => (
              <div
                key={`${proj.id}-${idx}`}
                onClick={() => openPortfolioModal(proj.id)}
                className="w-[230px] sm:w-[260px] md:w-[290px] shrink-0 cursor-pointer group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-slate-900/85 backdrop-blur-md text-white px-2 py-0.5 rounded text-[8px] font-semibold">
                      Sample
                    </div>
                    <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-bold text-slate-800 shadow-2xs">
                      {proj.category}
                    </div>
                  </div>

                  <div className="p-3 sm:p-3.5 space-y-1">
                    <div className="text-[10px] text-slate-500 font-medium">{proj.client} · {proj.year}</div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0056b3] transition-colors line-clamp-1">
                      {proj.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {proj.summary}
                    </p>
                    <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-800 line-clamp-1">
                      ⚡ {proj.impact}
                    </div>
                  </div>
                </div>

                <div className="px-3 pb-2.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#0056b3] group-hover:text-[#ff5722]">
                  <span>Explore Case Study</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION F: WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0056b3]">
              The Agency Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Forward-Thinking Businesses Choose {settings.businessName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We eliminate typical agency bloat. You collaborate directly with experienced creators and senior engineers dedicated to high-velocity execution and tangible revenue metrics.
            </p>
            <div className="pt-1">
              <button
                onClick={() => openQuoteModal('Why Choose Us Consultation')}
                className="px-5 py-2.5 text-xs font-bold text-white rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                style={{ backgroundColor: settings.primaryColor }}
              >
                Schedule Free Strategy Session
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                title: 'Bespoke Solutions',
                desc: 'Tailored architecture constructed specifically for your commercial niche, never generic templates.'
              },
              {
                title: 'Mobile-First Perfection',
                desc: 'Every button, form, and layout element responds fluidly across all mobile phone dimensions.'
              },
              {
                title: 'Radical Transparency',
                desc: 'Clear scope, weekly milestones, and plain English progress reports with zero hidden fees.'
              },
              {
                title: 'Rigorous QA Delivery',
                desc: 'Comprehensive cross-browser testing, accessibility compliance, and performance audits.'
              },
              {
                title: 'Built-in Technical SEO',
                desc: 'Semantic schema markup, metadata tags, and lightning-fast Core Web Vitals scores built in.'
              },
              {
                title: 'Long-Term Support',
                desc: 'Reliable post-launch maintenance, cloud hosting assistance, and priority customer care.'
              }
            ].map((adv, i) => (
              <div key={i} className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs sm:text-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{adv.title}</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed pl-5">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SCROLLING SECTION: FEEDBACK FROM GROWING ENTERPRISES (COMPACT SIZE FOR MOBILE) */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200 py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 space-y-1 text-center">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
            <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-ping" />
            <span>Continuous Stream</span>
            <span aria-hidden="true">·</span>
            <span>Client Feedback (Hover to Pause)</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Feedback from Growing Enterprises
          </h2>
          <p className="text-[10px] text-slate-500">
            *Verified project prototypes and demonstration testimonials.
          </p>
        </div>

        {/* Compact Scrolling Testimonials Track */}
        <div className="relative w-full overflow-hidden py-1 select-none">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee-reverse pause-on-hover flex gap-4 px-4">
            {marqueeTestimonials.map((t, idx) => (
              <div
                key={idx}
                className="w-[220px] sm:w-[260px] md:w-[280px] shrink-0 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-2.5"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                    {'★'.repeat(t.rating)}
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed italic line-clamp-3">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-orange-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                    {t.author.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">{t.author}</div>
                    <div className="text-[10px] text-slate-500 truncate max-w-[160px]">{t.role} · {t.org}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. REQUEST A FREE PROJECT CONSULTATION & ITEMIZED QUOTE (DIRECTLY OPENS IN POPUP) */}
      <section id="consultation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-[#002b66] to-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-14 border border-blue-900/60 shadow-xl relative overflow-hidden">
          {/* Subtle Accent Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff5722]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0056b3]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-orange-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Let's Build Something Exceptional Together</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Request a Free Project Consultation & Itemized Quote
              </h2>
              <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
                No waiting or endless forms. Click below to configure your exact project deliverables and receive an itemized proposal within hours.
              </p>
            </div>

            {/* 3 Pillar Value Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-3xl mx-auto">
              <div
                onClick={() => openQuoteModal('30-Min Discovery Session')}
                className="p-3.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 space-y-1 hover:bg-white/10 hover:border-orange-500/50 transition-all cursor-pointer group"
              >
                <div className="text-xs font-bold text-orange-400 flex items-center gap-1.5 group-hover:text-orange-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>30-Min Discovery Call</span>
                </div>
                <p className="text-[10px] text-slate-300">Free technical architecture & growth review.</p>
              </div>

              <div
                onClick={() => openQuoteModal('Itemized Proposal Request')}
                className="p-3.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 space-y-1 hover:bg-white/10 hover:border-orange-500/50 transition-all cursor-pointer group"
              >
                <div className="text-xs font-bold text-orange-400 flex items-center gap-1.5 group-hover:text-orange-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Itemized Proposal</span>
                </div>
                <p className="text-[10px] text-slate-300">Transparent milestone budget in 4 hrs.</p>
              </div>

              <div
                onClick={() => openQuoteModal('Confidential NDA Scope')}
                className="p-3.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 space-y-1 hover:bg-white/10 hover:border-orange-500/50 transition-all cursor-pointer group"
              >
                <div className="text-xs font-bold text-orange-400 flex items-center gap-1.5 group-hover:text-orange-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Strict NDA Protection</span>
                </div>
                <p className="text-[10px] text-slate-300">100% confidential proposal & non-disclosure.</p>
              </div>
            </div>

            {/* ACTION BUTTONS (Directly Opens Modal!) */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => openQuoteModal('Homepage Bottom Banner')}
                className="px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-black text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #ff5722 0%, #ea580c 100%)',
                  boxShadow: '0 10px 25px -4px rgba(255, 87, 34, 0.45)'
                }}
              >
                <span>Request Free Consultation & Quote</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                  settings.businessName
                )}%2C%20I%20would%20like%20to%20request%20a%20free%20project%20consultation%20and%20itemized%20quote.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 text-xs sm:text-sm font-bold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all flex items-center gap-2 hover:text-white"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Chat</span>
              </a>
            </div>

            <p className="text-[11px] text-slate-400">
              Instant response guarantee · Direct line: <strong className="text-white">{settings.contactNumber}</strong> · Email: <strong className="text-white">{settings.businessEmail}</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
