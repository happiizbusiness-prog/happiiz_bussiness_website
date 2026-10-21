import { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { useNavigation } from '../context/NavigationContext';
import { SERVICES_DATA } from '../data/servicesData';
import { HappiizLogo } from './HappiizLogo';
import {
  Menu,
  X,
  Settings2,
  ArrowUpRight,
  Phone,
  ChevronDown,
  Globe,
  TrendingUp,
  Search,
  Users,
  Palette,
  CreditCard,
  FileText,
  Rocket,
  Sparkles,
  Layers,
  Shield
} from 'lucide-react';

export function Navbar() {
  const { settings, adminUser } = useBusiness();
  const {
    currentPath,
    navigate,
    openAboutModal,
    openQuoteModal,
    openServicesModal,
    openServiceDetailModal,
    openPortfolioModal,
    openContactModal,
    openRoadmapModal
  } = useNavigation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

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
        return <Layers className="w-4 h-4 text-slate-700" />;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 gap-4">
            {/* Zone 1: Brand Wordmark / Official Logo */}
            <div className="flex items-center shrink-0">
              <a
                href="#/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('home');
                }}
                className="group flex items-center transition-transform hover:opacity-95"
              >
                {settings.logoUrl ? (
                  <img
                    src={settings.logoUrl}
                    alt={settings.businessName}
                    className="h-11 w-auto object-contain rounded"
                  />
                ) : (
                  <HappiizLogo variant="navbar" />
                )}
              </a>
            </div>

            {/* Zone 2: Navigation Links (All Open in Popup Modals just like About Us) */}
            <nav className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-700">
              {/* Services Dropdown & Modal Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button
                  onClick={() => openServicesModal()}
                  className="py-2 px-3 rounded-xl transition-all flex items-center gap-1.5 font-semibold text-slate-800 hover:text-[#0056b3] hover:bg-blue-50/60 cursor-pointer"
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      servicesDropdownOpen ? 'rotate-180 text-[#0056b3]' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu listing all services */}
                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/90 p-2.5 space-y-1 animate-in fade-in zoom-in-95 duration-150 z-50 text-slate-900">
                    <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 font-mono">
                        All 10 Core Services
                      </span>
                      <button
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          openServicesModal();
                        }}
                        className="text-[11px] font-bold text-[#0056b3] hover:text-[#ff5722] hover:underline cursor-pointer"
                      >
                        View All
                      </button>
                    </div>

                    <div className="max-h-80 overflow-y-auto space-y-0.5 no-scrollbar py-1">
                      {SERVICES_DATA.map((srv) => (
                        <button
                          key={srv.id}
                          onClick={() => {
                            setServicesDropdownOpen(false);
                            openServiceDetailModal(srv.slug);
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-blue-50/60 transition-colors flex items-center gap-2.5 group cursor-pointer"
                        >
                          <div className="p-1.5 rounded-lg bg-blue-50 group-hover:bg-blue-100/80 border border-blue-100 shrink-0">
                            {getServiceIcon(srv.slug)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-slate-900 group-hover:text-[#0056b3] truncate">
                              {srv.title}
                            </div>
                            <div className="text-[10px] text-slate-500 truncate">
                              {srv.categoryLabel}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          openServicesModal();
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#0056b3] hover:text-[#ff5722] text-center transition-colors cursor-pointer border border-slate-200"
                      >
                        Open Full Services Directory →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Roadmap Link -> Opens 7-Step Roadmap Modal */}
              <button
                onClick={() => openRoadmapModal()}
                className="py-2 px-3 rounded-xl transition-all font-semibold text-slate-800 hover:text-[#ff5722] hover:bg-orange-50/60 cursor-pointer flex items-center gap-1.5"
                title="View Our 7-Step Proven Delivery Roadmap"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ff5722]" />
                <span>Roadmap</span>
              </button>

              {/* Portfolio Link -> Opens Portfolio Modal */}
              <button
                onClick={() => openPortfolioModal()}
                className="py-2 px-3 rounded-xl transition-all font-semibold text-slate-800 hover:text-[#0056b3] hover:bg-blue-50/60 cursor-pointer"
              >
                Portfolio
              </button>

              {/* About Us Link -> Opens About Modal */}
              <button
                onClick={() => openAboutModal()}
                className="py-2 px-3 rounded-xl transition-all font-semibold text-slate-800 hover:text-[#0056b3] hover:bg-blue-50/60 cursor-pointer"
              >
                About Us
              </button>

              {/* Contact Link -> Opens Contact Modal */}
              <button
                onClick={() => openContactModal()}
                className="py-2 px-3 rounded-xl transition-all font-semibold text-slate-800 hover:text-[#0056b3] hover:bg-blue-50/60 cursor-pointer"
              >
                Contact
              </button>
            </nav>

            {/* Zone 3: Primary Action + Admin Settings */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => navigate('admin-settings')}
                title="Admin Login & Management Portal"
                className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border text-xs font-bold ${
                  adminUser.isLoggedIn
                    ? 'bg-blue-50 text-[#0056b3] border-blue-200 shadow-2xs hover:bg-blue-100'
                    : 'text-slate-700 hover:text-[#0056b3] hover:bg-blue-50/80 border-slate-200/80'
                }`}
                aria-label="Admin Login"
              >
                <Shield className={`w-3.5 h-3.5 ${adminUser.isLoggedIn ? 'text-emerald-600' : 'text-[#0056b3]'}`} />
                <span className="inline font-bold">
                  {adminUser.isLoggedIn ? 'Admin Dashboard' : 'Admin Login'}
                </span>
                {adminUser.isLoggedIn && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
                )}
              </button>

              <button
                onClick={() => openQuoteModal()}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #0056b3 0%, #004ea8 100%)',
                  boxShadow: '0 4px 14px -2px rgba(0, 86, 179, 0.4)'
                }}
              >
                <span>Get a Free Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-orange-300" />
              </button>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-700" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (All Links Open Respective Popup Modals) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-18 z-30 lg:hidden bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border-b border-slate-200 px-6 py-6 shadow-2xl space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto text-slate-900">
            {/* Quick Modals Triggers in Mobile */}
            <div className="space-y-1">
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 pb-1 font-mono">
                Main Menu
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openServicesModal();
                }}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold text-slate-900 hover:bg-blue-50 hover:text-[#0056b3] transition-colors flex items-center justify-between"
              >
                <span>Services (All 10 Services)</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openRoadmapModal();
                }}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold text-slate-900 hover:bg-blue-50 hover:text-[#ff5722] transition-colors flex items-center justify-between"
              >
                <span>Our 7-Step Delivery Roadmap</span>
                <Sparkles className="w-4 h-4 text-[#ff5722]" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openPortfolioModal();
                }}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold text-slate-900 hover:bg-blue-50 hover:text-[#0056b3] transition-colors"
              >
                Portfolio & Case Studies
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAboutModal();
                }}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold text-slate-900 hover:bg-blue-50 hover:text-[#0056b3] transition-colors"
              >
                About Us
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openContactModal();
                }}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold text-slate-900 hover:bg-blue-50 hover:text-[#0056b3] transition-colors"
              >
                Contact Us
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('admin-settings');
                }}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold text-slate-900 hover:text-[#0056b3] hover:bg-blue-50 transition-colors flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#0056b3]" />
                  <span>Admin Login & Dashboard</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Secure Access</span>
              </button>
            </div>

            {/* Individual Services Quick List for Mobile */}
            <div className="pt-3 border-t border-slate-100 space-y-1">
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 pb-1 font-mono">
                Explore Individual Services:
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {SERVICES_DATA.slice(0, 6).map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openServiceDetailModal(srv.slug);
                    }}
                    className="p-2 rounded-lg bg-slate-50 text-left text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#0056b3] transition-colors truncate border border-slate-200"
                  >
                    {srv.title.split('&')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openQuoteModal();
                }}
                className="w-full py-3 text-center text-xs font-bold text-white rounded-xl shadow-md cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #0056b3 0%, #ff5722 100%)'
                }}
              >
                Request Free Quote & Consultation
              </button>

              <a
                href={`tel:${settings.contactNumber}`}
                className="flex items-center justify-center gap-2 text-xs font-bold text-slate-700 hover:text-[#0056b3]"
              >
                <Phone className="w-3.5 h-3.5 text-[#ff5722]" />
                <span>Call Us: {settings.contactNumber}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
