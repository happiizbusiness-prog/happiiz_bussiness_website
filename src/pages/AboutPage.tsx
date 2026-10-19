import { useBusiness } from '../context/BusinessContext';
import { useNavigation } from '../context/NavigationContext';
import { HappiizLogo } from '../components/HappiizLogo';
import { Target, Eye, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export function AboutPage() {
  const { settings } = useBusiness();
  const { openQuoteModal } = useNavigation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-block p-3 rounded-2xl bg-white border border-slate-200 shadow-xs mb-2">
          <HappiizLogo variant="compact" showTagline={true} />
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0056b3]">
          <span>About {settings.businessName}</span>
          <span aria-hidden="true">·</span>
          <span>Our Story & Principles</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          Where Engineering Precision Meets Strategic Brand Craft
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Founded with a clear conviction: modern enterprises don’t need generic marketing jargon or template clones. They need custom, high-velocity digital craft that drives measurable revenue growth and builds unshakeable commercial authority.
        </p>
      </div>

      {/* Hero Studio Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 aspect-[16/8] sm:aspect-[16/7] bg-slate-900">
        <img
          src="/src/assets/images/hero_digital_agency_1792393542382.jpg"
          alt="Our Creative Digital Agency Studio"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white max-w-xl">
          <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-1">
            Studio & Operations
          </div>
          <p className="text-sm sm:text-base font-medium">
            Dedicated strategists, web engineers, and brand artisans committed to zero-compromise delivery.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Our Core Mission</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            To equip ambitious small-to-medium businesses and growing enterprises with world-class digital websites, automated customer acquisition systems, and executive corporate stationery that level the playing field against industry giants.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Our Strategic Vision</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            To stand as the most reliable, transparent, and results-obsessed digital partner in India and globally—celebrated for engineering excellence, zero-fluff communication, and compounding client returns.
          </p>
        </div>
      </div>

      {/* Methodology Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Our Principles</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            How We Deliver Consistent Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="text-xs font-mono font-bold text-blue-700">PRINCIPLE 01</div>
            <h3 className="text-base font-bold text-slate-900">Data-Backed Architecture</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never guess what works. Every layout, copy hook, and technical structure is informed by search intent analysis and conversion data.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="text-xs font-mono font-bold text-orange-600">PRINCIPLE 02</div>
            <h3 className="text-base font-bold text-slate-900">Zero-Slop Clean Code</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We build lightweight, accessible, mobile-first frontend code that loads instantaneously, never relying on fragile, bloated site-builders.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="text-xs font-mono font-bold text-emerald-600">PRINCIPLE 03</div>
            <h3 className="text-base font-bold text-slate-900">Long-Term Stewardship</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              A project launch is the beginning, not the end. We support, iterate, and protect your digital assets with continuous care.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
            The Advantage
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Why Businesses Choose {settings.businessName}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Direct Senior Access',
              desc: 'No middle managers or account-rep telephone games. You speak directly with the architects crafting your solution.'
            },
            {
              title: 'Mobile-First by Default',
              desc: 'With over 70% of web traffic on mobile devices, every element is designed touch-first with zero horizontal overflow.'
            },
            {
              title: 'Rigorous Milestones',
              desc: 'Fixed timelines, clear deliverables, and iterative review checkpoints guarantee zero surprises.'
            },
            {
              title: 'Complete IP Ownership',
              desc: 'Full transfer of copyrights, vector source files, code repositories, and ad accounts upon completion.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold tracking-tight">Let's Discuss Your Growth Goals</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Book a complimentary 30-minute discovery consultation with our leadership team today.
          </p>
        </div>
        <button
          onClick={() => openQuoteModal('About Us Consultation')}
          className="px-6 py-3 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-md transition-colors whitespace-nowrap flex items-center gap-2"
        >
          <span>Schedule Strategy Session</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
