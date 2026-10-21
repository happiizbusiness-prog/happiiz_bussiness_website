import { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { useNavigation } from '../context/NavigationContext';
import { SERVICES_DATA } from '../data/servicesData';
import {
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Code2,
  ArrowRight,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export function ServiceDetailPage({ slug }: { slug: string }) {
  const { services } = useBusiness();
  const { navigate, openQuoteModal } = useNavigation();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const allServices = services && services.length > 0 ? services : SERVICES_DATA;
  const service =
    allServices.find((s) => s.slug === slug || s.id === slug) ||
    SERVICES_DATA.find((s) => s.slug === slug) ||
    SERVICES_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      {/* Top Breadcrumb Back Link */}
      <div>
        <button
          onClick={() => navigate('services')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Services</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span>{service.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>Commercial Deliverables</span>
          </div>

          {service.imageUrl && (
            <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 mb-2">
              <img
                src={service.imageUrl}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            {service.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            {service.overview}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => openQuoteModal(service.title)}
              className="px-6 py-3 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Request Quote for this Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('portfolio')}
              className="px-6 py-3 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl shadow-sm transition-colors"
            >
              View Related Work
            </button>
          </div>
        </div>

        {/* Quick Highlights Card */}
        <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Service Snapshot
          </h2>
          <div className="space-y-3 text-xs text-slate-600">
            <div>
              <span className="font-semibold text-slate-800 block">Category:</span>
              <span>{service.categoryLabel}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-800 block">Turnaround Timeline:</span>
              <span>2 to 4 weeks (based on milestone complexity)</span>
            </div>
            <div>
              <span className="font-semibold text-slate-800 block">Copyright & Ownership:</span>
              <span>100% Client Ownership upon delivery</span>
            </div>
            <div>
              <span className="font-semibold text-slate-800 block">Revision Policy:</span>
              <span>Unlimited revisions on selected design direction</span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-200/80">
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Full SLA & Non-Disclosure Agreement (NDA)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
            Commercial Value
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Key Business Benefits
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(service.benefits || []).map((benefit, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Deliverables & Technology Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Deliverables List */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            What You Receive (Tangible Deliverables)
          </h2>
          <ul className="space-y-3">
            {service.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack / Tooling */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Code2 className="w-5 h-5 text-blue-700" />
            <span>Technologies & Standards</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            We employ modern, enterprise-proven tools and workflows to deliver durable, scalable assets.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {(service.featuredTech || []).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-800 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery Process */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
            Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Step-by-Step Delivery Process
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {service.processSteps.map((step) => (
            <div key={step.step} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                STEP {step.step}
              </span>
              <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="space-y-6 max-w-3xl">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            Common Inquiries About This Service
          </h2>
        </div>

        <div className="space-y-3">
          {service.faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-900 hover:text-blue-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-700' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold tracking-tight">Ready to Begin with {service.title}?</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Schedule a free discovery consultation with our technical and creative directors today.
          </p>
        </div>
        <button
          onClick={() => openQuoteModal(service.title)}
          className="px-6 py-3 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-md transition-colors whitespace-nowrap"
        >
          Request Itemized Proposal
        </button>
      </div>
    </div>
  );
}
