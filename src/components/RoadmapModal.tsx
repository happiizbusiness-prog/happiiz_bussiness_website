import { useEffect, useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import {
  X,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Zap,
  Award
} from 'lucide-react';

export function RoadmapModal() {
  const { isRoadmapModalOpen, closeRoadmapModal, openQuoteModal } = useNavigation();
  const [activeStep, setActiveStep] = useState(0);

  // Handle ESC key and scroll locking
  useEffect(() => {
    if (!isRoadmapModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRoadmapModal();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRoadmapModalOpen, closeRoadmapModal]);

  if (!isRoadmapModalOpen) return null;

  const ROADMAP_STEPS = [
    {
      step: '01',
      phase: 'Phase 1 · Audit',
      title: 'Discovery & Strategic Audit',
      time: 'Day 1–3',
      image: '/src/assets/images/roadmap_discovery_audit_1792395845318.jpg',
      accentColor: 'border-blue-500 text-blue-400 bg-blue-500/10',
      badgeBg: 'bg-blue-600',
      summary: 'Deep-dive analysis of your current market positioning, competitor funnel metrics, and commercial target audiences.',
      skills: ['Competitor Intel', 'SEO Crawl Audit', 'User Personas', 'Funnel Mapping'],
      outcome: 'Verified Scope SOW & Growth Architecture Blueprint'
    },
    {
      step: '02',
      phase: 'Phase 2 · Blueprint',
      title: 'Information Architecture & Wireframes',
      time: 'Day 4–7',
      image: '/src/assets/images/portfolio_web_design_1792393542453.jpg',
      accentColor: 'border-sky-500 text-sky-400 bg-sky-500/10',
      badgeBg: 'bg-sky-600',
      summary: 'Structuring page hierarchy, conversion path friction removal, and interactive Figma layout wireframing.',
      skills: ['Figma Wireframing', 'UX Flow Logic', 'Content Hierarchy', 'Mobile Grid Design'],
      outcome: 'Approved Layout Blueprint & Navigation Schema'
    },
    {
      step: '03',
      phase: 'Phase 3 · Creative',
      title: 'Visual Identity & Stationery Craft',
      time: 'Day 8–12',
      image: '/src/assets/images/portfolio_branding_identity_1792393543752.jpg',
      accentColor: 'border-orange-500 text-orange-400 bg-orange-500/10',
      badgeBg: 'bg-[#ff5722]',
      summary: 'Designing high-impact brand collateral, master logos, CMYK visiting cards, corporate letterheads, and digital design systems.',
      skills: ['Design Systems', 'CMYK Print Setup', 'Embossed Cards', 'Letterhead Specs'],
      outcome: 'High-Fidelity UI Prototype & Print Production Suite'
    },
    {
      step: '04',
      phase: 'Phase 4 · Engineering',
      title: 'Clean Modern Engineering',
      time: 'Day 13–18',
      image: '/src/assets/images/roadmap_code_engineering_1792395847305.jpg',
      accentColor: 'border-amber-500 text-amber-400 bg-amber-500/10',
      badgeBg: 'bg-amber-600',
      summary: 'Production-grade frontend coding using React 19, TypeScript, Tailwind CSS, and lightweight backend APIs with zero bloat.',
      skills: ['React 19 & Next.js', 'Strict TypeScript', 'Tailwind CSS', 'Zero-Bloat APIs'],
      outcome: 'Feature-Complete Staging Web Environment'
    },
    {
      step: '05',
      phase: 'Phase 5 · Performance',
      title: 'Speed & Core Web Vitals Audit',
      time: 'Day 19–21',
      image: '/src/assets/images/roadmap_launch_performance_1792395846648.jpg',
      accentColor: 'border-emerald-500 text-emerald-400 bg-emerald-500/10',
      badgeBg: 'bg-emerald-600',
      summary: 'Rigorous automated diagnostics, Lighthouse 99+ optimization, mobile responsiveness verification, and security testing.',
      skills: ['99+ Lighthouse', 'LCP < 2.0s', 'Accessibility WCAG', 'Cross-Device QA'],
      outcome: '100% Defect-Free Certified Web Architecture'
    },
    {
      step: '06',
      phase: 'Phase 6 · Go-Live',
      title: 'Secure Cloud Launch & Analytics',
      time: 'Day 22–24',
      image: '/src/assets/images/hero_digital_agency_1792393542382.jpg',
      accentColor: 'border-purple-500 text-purple-400 bg-purple-500/10',
      badgeBg: 'bg-purple-600',
      summary: 'Custom domain DNS provisioning, SSL encryption, Google Analytics 4 tracking, and WhatsApp CRM pipeline integration.',
      skills: ['Cloud Run CDN', 'DNS & SSL Config', 'GA4 Analytics', 'WhatsApp Hotleads'],
      outcome: 'Live Commercial Web Release & Brand Launch'
    },
    {
      step: '07',
      phase: 'Phase 7 · Scaling',
      title: 'Continuous Lead Growth & Support',
      time: 'Continuous Growth',
      image: '/src/assets/images/portfolio_digital_campaign_1792393543250.jpg',
      accentColor: 'border-pink-500 text-pink-400 bg-pink-500/10',
      badgeBg: 'bg-pink-600',
      summary: 'Ongoing technical maintenance, organic search ranking scaling, ad conversion monitoring, and dedicated WhatsApp support.',
      skills: ['Inbound Pipelines', 'Search Rankings', 'Technical SLA', 'Dedicated Care'],
      outcome: 'Predictable Inbound Clients & Compounding ROI'
    }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeRoadmapModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="roadmap-modal-title"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl shadow-2xl border border-slate-800 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-orange-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Our Delivery Blueprint</span>
            </div>
            <span className="text-slate-600">·</span>
            <span className="text-xs font-bold text-slate-300 hidden sm:inline">
              Image Previews, Milestone Markings & Small Skills
            </span>
          </div>

          <button
            onClick={closeRoadmapModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Hero Header */}
          <div className="space-y-2">
            <h2 id="roadmap-modal-title" className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Our 7-Step Proven Delivery Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Every project follows our disciplined 7–phase execution protocol with verified markings, real deliverables, and specialized engineering skills.
            </p>
          </div>

          {/* Interactive Milestone Progress Strip */}
          <div className="relative pt-2 pb-1 hidden sm:block">
            <div className="relative flex items-center justify-between">
              {/* Connected Line Track */}
              <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-slate-800 rounded-full z-0" />
              <div
                className="absolute top-1/2 left-4 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-500 via-orange-500 to-emerald-400 rounded-full z-0 transition-all duration-500"
                style={{ width: `${(activeStep / (ROADMAP_STEPS.length - 1)) * 95}%` }}
              />

              {ROADMAP_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`relative z-10 flex flex-col items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                    activeStep === idx ? 'scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-black text-xs font-mono shadow-md transition-all ${
                      activeStep === idx
                        ? 'bg-gradient-to-br from-[#ff5722] to-amber-500 text-white ring-4 ring-orange-500/30'
                        : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    {step.step}
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 whitespace-nowrap">
                    {step.phase.split('·')[1]?.trim() || step.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Spotlight Card */}
          <div className="bg-slate-900/95 rounded-2xl border border-slate-700/80 p-5 sm:p-7 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Image Preview with Milestone Overlay */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-700 shadow-xl bg-slate-950 group">
                  <img
                    src={ROADMAP_STEPS[activeStep].image}
                    alt={ROADMAP_STEPS[activeStep].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                  {/* Marking Tag on Image */}
                  <div className="absolute top-2.5 left-2.5 bg-slate-950/90 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[10px] font-black font-mono border border-slate-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>MILESTONE {ROADMAP_STEPS[activeStep].step}</span>
                  </div>

                  <div className="absolute top-2.5 right-2.5 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-md">
                    ⏱ {ROADMAP_STEPS[activeStep].time}
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                    <div className="text-[9px] uppercase font-bold text-orange-400 tracking-wider">
                      {ROADMAP_STEPS[activeStep].phase}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white truncate">
                      {ROADMAP_STEPS[activeStep].title}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step Info, Markings and Small Skills */}
              <div className="lg:col-span-7 space-y-3.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-black font-mono border ${ROADMAP_STEPS[activeStep].accentColor}`}>
                    STEP {ROADMAP_STEPS[activeStep].step}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                    {ROADMAP_STEPS[activeStep].phase}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-800/60">
                    {ROADMAP_STEPS[activeStep].time}
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-black text-white">
                  {ROADMAP_STEPS[activeStep].title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {ROADMAP_STEPS[activeStep].summary}
                </p>

                {/* Small Skills Pills */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Specialized Technical Skills:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {ROADMAP_STEPS[activeStep].skills.map((skill, si) => (
                      <span
                        key={si}
                        className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 hover:border-orange-500/60 transition-all shadow-xs"
                      >
                        ⚡ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Milestone Outcome */}
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong className="text-white">Milestone Outcome:</strong> {ROADMAP_STEPS[activeStep].outcome}
                  </span>
                </div>

                {/* Previous/Next Controls */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : ROADMAP_STEPS.length - 1))}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={() => setActiveStep((prev) => (prev < ROADMAP_STEPS.length - 1 ? prev + 1 : 0))}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                    >
                      Next Step →
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      closeRoadmapModal();
                      openQuoteModal(`Roadmap: Step ${ROADMAP_STEPS[activeStep].step} (${ROADMAP_STEPS[activeStep].title})`);
                    }}
                    className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#0056b3] to-[#ff5722] text-xs font-bold text-white hover:opacity-95 transition-all shadow-md cursor-pointer"
                  >
                    Consult on this Step
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 7-Step Compact Grid Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {ROADMAP_STEPS.map((item, idx) => (
              <div
                key={item.step}
                onClick={() => setActiveStep(idx)}
                className={`group cursor-pointer rounded-xl p-2.5 transition-all duration-200 flex flex-col justify-between space-y-2 border ${
                  activeStep === idx
                    ? 'bg-slate-800/95 border-orange-500 shadow-lg ring-2 ring-orange-500/20'
                    : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/80 hover:border-slate-600'
                }`}
              >
                {/* Thumbnail Image */}
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-1 left-1 bg-slate-950/90 text-[8px] font-black font-mono text-white px-1 py-0.2 rounded">
                    {item.step}
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-[8px] font-mono text-slate-400 uppercase tracking-wider">
                    {item.phase}
                  </div>
                  <h4 className="text-[11px] font-bold text-white group-hover:text-blue-300 transition-colors leading-tight line-clamp-1">
                    {item.title}
                  </h4>
                </div>

                {/* Small Skill Tag */}
                <div className="pt-1 border-t border-slate-800">
                  <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-800 font-medium truncate block text-center">
                    {item.skills[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full milestone tracking provided to clients via live dashboard and WhatsApp updates.</span>
            </div>
            <button
              onClick={() => {
                closeRoadmapModal();
                openQuoteModal('Delivery Roadmap Session');
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] hover:opacity-95 rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
            >
              Discuss Your Project Roadmap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
