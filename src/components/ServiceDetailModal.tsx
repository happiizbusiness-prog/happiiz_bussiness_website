import { useEffect, useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { useNavigation } from '../context/NavigationContext';
import { SERVICES_DATA } from '../data/servicesData';
import {
  X,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronDown,
  Layers,
  Sparkles,
  ExternalLink,
  MessageCircle,
  HelpCircle,
  ArrowLeft
} from 'lucide-react';

export function ServiceDetailModal() {
  const { settings, services } = useBusiness();
  const {
    selectedServiceSlug,
    closeServiceDetailModal,
    openServicesModal,
    openQuoteModal,
    navigate
  } = useNavigation();

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Handle ESC key and scroll locking
  useEffect(() => {
    if (!selectedServiceSlug) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeServiceDetailModal();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedServiceSlug, closeServiceDetailModal]);

  if (!selectedServiceSlug) return null;

  const service =
    services.find((s) => s.slug === selectedServiceSlug || s.id === selectedServiceSlug) ||
    SERVICES_DATA.find((s) => s.slug === selectedServiceSlug || s.id === selectedServiceSlug);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeServiceDetailModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-detail-title"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50/70 via-white to-orange-50/50 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                closeServiceDetailModal();
                openServicesModal();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#0056b3] hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#0056b3]" />
              <span>All Services</span>
            </button>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-bold text-slate-700 truncate max-w-[180px] sm:max-w-none">
              {service.title}
            </span>
            <span className="text-slate-300">·</span>
            <button
              onClick={() => {
                closeServiceDetailModal();
                navigate(`services/${service.slug}`);
              }}
              className="text-xs text-slate-500 hover:text-[#0056b3] flex items-center gap-1 transition-colors cursor-pointer"
              title="Open standalone URL"
            >
              Full Page <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={closeServiceDetailModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8">
          {/* Service Hero Banner */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#0056b3]">
              <Sparkles className="w-3.5 h-3.5 text-[#ff5722]" />
              <span>{service.categoryLabel}</span>
            </div>

            {service.imageUrl && (
              <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              </div>
            )}

            <h2 id="service-detail-title" className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {service.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-3xl">
              {service.overview}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  closeServiceDetailModal();
                  openQuoteModal(service.title);
                }}
                className="px-6 py-3 text-xs font-bold text-white rounded-xl shadow-lg transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #0056b3 0%, #ff5722 100%)',
                  boxShadow: '0 8px 20px -4px rgba(255, 87, 34, 0.4)'
                }}
              >
                <span>Request Free Quote for {service.title}</span>
                <ArrowRight className="w-4 h-4 text-orange-200" />
              </button>

              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%2C%20I%20am%20interested%20in%20your%20${encodeURIComponent(
                  service.title
                )}%20service.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:border-emerald-500 rounded-xl transition-all flex items-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>
          </div>

          {/* Key Deliverables Section */}
          <div className="space-y-4 p-6 rounded-2xl bg-slate-50/80 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0056b3]">
              <Layers className="w-4 h-4 text-[#ff5722]" />
              <span>Verified Scope & Included Deliverables</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              What You Receive in this Package
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {service.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800 leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4-Step Process Section */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0056b3]">
              Execution Methodology
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Our 4-Stage Delivery Workflow
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {service.processSteps.map((step) => (
                <div
                  key={step.step}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 relative hover:border-[#0056b3] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-[#0056b3] font-mono font-bold text-xs flex items-center justify-center">
                    {step.step}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Scope, Timeline & Commercial Estimate */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50/80 via-white to-orange-50/60 border border-slate-200 text-slate-900 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0056b3]">
              <Clock className="w-4 h-4 text-[#ff5722]" />
              <span>Timeline & Commercial Scope</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-[11px] text-slate-500 font-medium">Average Turnaround</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">3–14 Business Days</div>
                <div className="text-[10px] text-slate-500 mt-1">Based on project scope & revisions</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-[11px] text-slate-500 font-medium">Code & Asset Ownership</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">100% Full Transfer</div>
                <div className="text-[10px] text-slate-500 mt-1">Zero vendor lock-in or licensing fees</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-[11px] text-slate-500 font-medium">Support & Revisions</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">Priority WhatsApp Care</div>
                <div className="text-[10px] text-slate-500 mt-1">Dedicated specialist assigned</div>
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0056b3]">
              <HelpCircle className="w-4 h-4 text-[#ff5722]" />
              <span>Client Inquiries & Answers</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Frequently Asked Questions About {service.title}
            </h3>

            <div className="space-y-2">
              {service.faqs.map((faq, i) => {
                const isOpen = openFaqIndex === i;
                return (
                  <div
                    key={i}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-white"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                      className="w-full text-left px-4 py-3.5 flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180 text-[#0056b3]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/60">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modal Bottom Sticky CTA */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Ready to initiate your {service.title}?</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Get an itemized milestone scope, timeline, and quote in under 4 hours.
              </p>
            </div>
            <button
              onClick={() => {
                closeServiceDetailModal();
                openQuoteModal(service.title);
              }}
              className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] hover:opacity-95 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
            >
              Get Itemized Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
