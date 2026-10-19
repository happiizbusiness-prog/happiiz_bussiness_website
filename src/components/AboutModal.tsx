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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAboutModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">About Our Agency</span>
            <span className="text-slate-300">/</span>
            <button
              onClick={() => {
                closeAboutModal();
                navigate('about');
              }}
              className="text-xs text-slate-500 hover:text-blue-700 flex items-center gap-1 transition-colors"
              title="Open full page"
            >
              Standalone Page <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={closeAboutModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Official Logo Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 via-white to-orange-50/60 border border-slate-200/80">
            <HappiizLogo variant="compact" showTagline={true} />
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-white px-2.5 py-1 rounded-lg border border-slate-200">
              ISO & Standards Compliant
            </div>
          </div>

          {/* Hero Header */}
          <div>
            <h2 id="about-modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Architecting Digital Excellence & Scalable Brands
            </h2>
            <p className="mt-2 text-base text-slate-600 leading-relaxed">
              At <strong className="text-slate-900">{settings.businessName}</strong>, we build high-performance web systems, high-ROI marketing funnels, and corporate brand identities that turn modern businesses into category leaders.
            </p>
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-2.5 mb-2 text-blue-700">
                <Target className="w-5 h-5" />
                <h3 className="font-semibold text-slate-900">Our Mission</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                To empower ambitious enterprises with uncompromising digital craft, data-driven customer acquisition, and timeless branding that delivers measurable revenue growth.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-2.5 mb-2 text-orange-600">
                <Eye className="w-5 h-5" />
                <h3 className="font-semibold text-slate-900">Our Vision</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                To be the most trusted strategic growth partner for modern enterprises, renowned for creative precision, technical integrity, and real business outcomes.
              </p>
            </div>
          </div>

          {/* Our Approach */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-700" />
              Our Working Methodology
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                <div className="text-xs font-bold text-blue-700 uppercase mb-1">01. Strategy First</div>
                <p className="text-xs text-slate-600">Deep market research, competitor benchmarking, and architectural planning before writing a single line of code.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                <div className="text-xs font-bold text-blue-700 uppercase mb-1">02. Modern Engineering</div>
                <p className="text-xs text-slate-600">Mobile-first, clean-code standards ensuring lightning-fast load times and seamless user journeys.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                <div className="text-xs font-bold text-blue-700 uppercase mb-1">03. Measurable Impact</div>
                <p className="text-xs text-slate-600">Continuous conversion tracking, weekly transparency, and dedicated ongoing technical support.</p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Why Partner With Us?</h3>
            <ul className="space-y-2.5">
              {[
                'Tailored Custom Solutions: No generic templates or one-size-fits-all packages.',
                'Cross-Device Performance: Fluid experiences optimized for smartphones, tablets, and desktops.',
                'Transparent Communication: Direct access to senior architects and strategists without bureaucracy.',
                'Quality-Focused Delivery: Thorough QA testing, security compliance, and Core Web Vitals optimization.',
                'End-to-End Synergy: Seamless alignment between web design, Google SEO, and corporate brand stationery.'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Have questions? Speak directly with our strategy team.
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={closeAboutModal}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                closeAboutModal();
                openQuoteModal('General Inquiry');
              }}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              Get in Touch <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
