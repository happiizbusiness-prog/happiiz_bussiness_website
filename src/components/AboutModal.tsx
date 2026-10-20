import { useEffect } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { useNavigation } from '../context/NavigationContext';
import { HappiizLogo } from './HappiizLogo';
import { X, CheckCircle2, Target, Eye, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

export function AboutModal() {
  const { settings } = useBusiness();
  const { isAboutModalOpen, closeAboutModal, openQuoteModal, navigate } = useNavigation();

  // Handle ESC key and scroll locking
  useEffect(() => {
    if (!isAboutModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAboutModal();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAboutModalOpen, closeAboutModal]);

  if (!isAboutModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAboutModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50/70 via-white to-orange-50/50 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#0056b3]">
              <Sparkles className="w-3.5 h-3.5 text-[#ff5722]" />
              <span>About Our Agency</span>
            </div>
            <span className="text-slate-300">·</span>
            <button
              onClick={() => {
                closeAboutModal();
                navigate('about');
              }}
              className="text-xs text-slate-500 hover:text-[#0056b3] flex items-center gap-1 transition-colors cursor-pointer"
              title="Open full page"
            >
              Full Page <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={closeAboutModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Official Logo Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs inline-flex">
              <HappiizLogo variant="compact" showTagline={true} />
            </div>
            <div className="text-[11px] font-bold text-[#0056b3] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-lg border border-blue-200 font-mono">
              ISO & Standards Compliant
            </div>
          </div>

          {/* Hero Header */}
          <div className="space-y-2">
            <h2 id="about-modal-title" className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Architecting Digital Excellence & Scalable Brands
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              At <strong className="text-slate-900 font-bold">{settings.businessName}</strong>, we build high-performance web systems, high-ROI marketing funnels, and corporate brand identities that turn modern businesses into category leaders.
            </p>
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2">
              <div className="flex items-center gap-2.5 text-[#0056b3]">
                <Target className="w-5 h-5" />
                <h3 className="font-bold text-slate-900 text-base">Our Mission</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {settings.aboutMission || 'To empower ambitious enterprises with uncompromising digital craft, data-driven customer acquisition, and timeless branding that delivers measurable revenue growth.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2">
              <div className="flex items-center gap-2.5 text-[#ff5722]">
                <Eye className="w-5 h-5" />
                <h3 className="font-bold text-slate-900 text-base">Our Vision</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {settings.aboutVision || 'To be the most trusted strategic growth partner for modern enterprises, renowned for creative precision, technical integrity, and real business outcomes.'}
              </p>
            </div>
          </div>

          {/* Our Approach */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0056b3]">
              <Sparkles className="w-4 h-4 text-[#ff5722]" />
              <span>Working Methodology</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Disciplined Engineering & Creative Standards
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-xs">
                <div className="text-[10px] font-bold text-[#0056b3] uppercase font-mono">01. Strategy First</div>
                <h4 className="text-xs font-bold text-slate-900">Market Intelligence</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Deep market research, competitor benchmarking, and architectural planning before writing code.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-xs">
                <div className="text-[10px] font-bold text-[#ff5722] uppercase font-mono">02. Modern Engineering</div>
                <h4 className="text-xs font-bold text-slate-900">Zero-Bloat Tech</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Mobile-first, clean-code standards ensuring lightning-fast load times and seamless user journeys.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-xs">
                <div className="text-[10px] font-bold text-emerald-600 uppercase font-mono">03. Measurable Impact</div>
                <h4 className="text-xs font-bold text-slate-900">Compounding ROI</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Continuous conversion tracking, weekly transparency, and dedicated ongoing technical support.</p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Why Partner With Us?</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                'Tailored Custom Solutions: No generic templates or one-size-fits-all packages.',
                'Cross-Device Performance: Fluid experiences optimized for smartphones, tablets, and desktops.',
                'Transparent Communication: Direct access to senior architects and strategists without bureaucracy.',
                'Quality-Focused Delivery: Thorough QA testing, security compliance, and Core Web Vitals optimization.',
                'End-to-End Synergy: Seamless alignment between web design, Google SEO, and corporate brand stationery.',
                'Strict Asset Ownership: 100% full transfer of code, designs, and credentials with zero vendor lock-in.'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50">
          <div className="text-xs text-slate-600 text-center sm:text-left">
            Have questions? Speak directly with our strategy team.
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={closeAboutModal}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                closeAboutModal();
                openQuoteModal('General Inquiry');
              }}
              className="flex-1 sm:flex-none px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] hover:opacity-95 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
