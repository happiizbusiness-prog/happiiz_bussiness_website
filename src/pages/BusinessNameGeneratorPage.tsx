import { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { useNavigation } from '../context/NavigationContext';
import { generateBusinessNames } from '../utils/nameGenerator';
import { GeneratedBusinessName } from '../types';
import {
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Lightbulb,
  Palette
} from 'lucide-react';

export function BusinessNameGeneratorPage() {
  const { settings } = useBusiness();
  const { openQuoteModal } = useNavigation();

  // Inputs
  const [category, setCategory] = useState('Digital & Tech Solutions');
  const [industry, setIndustry] = useState('Technology');
  const [keywords, setKeywords] = useState('Cloud, Flow, Growth');
  const [language, setLanguage] = useState<'English' | 'Hindi / Indian' | 'Global / Latin'>('English');
  const [brandStyle, setBrandStyle] = useState<'Modern & Sleek' | 'Tech & Innovation' | 'Luxury & Premium' | 'Catchy & Memorable' | 'Minimalist'>('Modern & Sleek');
  const [targetAudience, setTargetAudience] = useState('B2B Enterprise and growing SMEs');

  const [names, setNames] = useState<GeneratedBusinessName[]>(() =>
    generateBusinessNames({
      category: 'Digital & Tech Solutions',
      industry: 'Technology',
      keywords: 'Cloud, Flow, Growth',
      language: 'English',
      brandStyle: 'Modern & Sleek',
      targetAudience: 'B2B Enterprise and growing SMEs'
    })
  );

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateBusinessNames({
        category,
        industry,
        keywords,
        language,
        brandStyle,
        targetAudience
      });
      setNames(generated);
      setIsGenerating(false);
    }, 350);
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const setPreset = (cat: string, ind: string, kw: string, lang: 'English' | 'Hindi / Indian' | 'Global / Latin', style: any) => {
    setCategory(cat);
    setIndustry(ind);
    setKeywords(kw);
    setLanguage(lang);
    setBrandStyle(style);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
          <span>Interactive Agency Tool</span>
          <span aria-hidden="true">·</span>
          <span>Free Business Resource</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
          AI & Rule-Based Business Name Generator
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Stuck on finding the perfect name for your startup, agency, or brand? Configure your brand style, target audience, and preferred roots to generate distinctive, trademark-friendly brand name candidates instantly.
        </p>
      </div>

      {/* Main Generator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Parameters */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Generator Parameters
            </h2>
            <button
              onClick={handleGenerate}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              Regenerate
            </button>
          </div>

          {/* Quick Presets */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Quick Industry Presets
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'Digital Agency', cat: 'Digital Marketing & Web Agency', ind: 'Marketing', kw: 'Digital, Spark, Media', lang: 'English', style: 'Modern & Sleek' },
                { label: 'Tech & SaaS', cat: 'SaaS Software', ind: 'Software', kw: 'Cloud, Logic, Scale', lang: 'English', style: 'Tech & Innovation' },
                { label: 'Indian Commerce', cat: 'Retail & Commerce', ind: 'E-Commerce', kw: 'Bazaar, Seva, Trade', lang: 'Hindi / Indian', style: 'Catchy & Memorable' },
                { label: 'Luxury & Advisory', cat: 'Corporate Advisory', ind: 'Consulting', kw: 'Venture, Capital, Prime', lang: 'Global / Latin', style: 'Luxury & Premium' }
              ].map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPreset(p.cat, p.ind, p.kw, p.lang as any, p.style)}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Business Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Business Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Digital Marketing Agency, Organic Foods, Tech SaaS"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Industry & Keywords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Industry
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Technology">Technology & Software</option>
                <option value="Marketing">Marketing & Advertising</option>
                <option value="Finance">Finance & Accounting</option>
                <option value="Healthcare">Health & Wellness</option>
                <option value="Retail">Retail & E-Commerce</option>
                <option value="Real Estate">Real Estate & Construction</option>
                <option value="Education">Education & Coaching</option>
                <option value="Hospitality">Food, Beverage & Hospitality</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Keywords
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. Growth, Neo, Apex"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Language & Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Language Preference
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="English">English / Global</option>
                <option value="Hindi / Indian">Hindi / Indian Roots</option>
                <option value="Global / Latin">Latin / Classic Roots</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Brand Tone & Style
              </label>
              <select
                value={brandStyle}
                onChange={(e) => setBrandStyle(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Modern & Sleek">Modern & Sleek</option>
                <option value="Tech & Innovation">Tech & Innovation</option>
                <option value="Luxury & Premium">Luxury & Premium</option>
                <option value="Catchy & Memorable">Catchy & Memorable</option>
                <option value="Minimalist">Minimalist</option>
              </select>
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Target Audience
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Corporate executives, Gen-Z consumers, Local homeowners"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Generating Unique Names...' : 'Generate Brand Names'}</span>
          </button>
        </div>

        {/* Right Output: Generated Names */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              Generated Name Suggestions ({names.length})
            </h2>
            <div className="text-xs text-slate-500">
              Click copy or design logo
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {names.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-extrabold text-slate-900 tracking-tight font-display">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => copyToClipboard(item.id, item.name)}
                      className={`p-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1 ${
                        copiedId === item.id
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                      }`}
                      title="Copy name to clipboard"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 leading-snug">
                    {item.concept}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                    <span className="font-semibold text-slate-700">Domain Idea:</span>
                    <span className="font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                      {item.suggestedDomain}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <a
                    href={`https://www.whois.com/whois/${item.suggestedDomain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-slate-900 flex items-center gap-1"
                    title="Verify real domain registry"
                  >
                    <span>Check Whois</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() =>
                      openQuoteModal(
                        `Branding & Logo Design for "${item.name}"`
                      )
                    }
                    className="text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
                  >
                    <Palette className="w-3.5 h-3.5" />
                    <span>Design Logo</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Legal / Verification Disclaimer Box */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-semibold">Independent Trademark & Domain Advice:</div>
              <p className="text-amber-800 leading-relaxed">
                Suggested names and domains are creative algorithmic proposals. Always conduct independent trademark searches with your national intellectual property office (e.g. IP India or USPTO) and verify live domain availability with accredited domain registrars before finalizing commercial legal registration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-Sell Agency Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Found a name you love? Let {settings.businessName} build the brand!
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            From custom vector logo design and embossed visiting cards to high-converting responsive websites, we bring new businesses to life with complete brand stationery.
          </p>
        </div>
        <button
          onClick={() => openQuoteModal('Branding & Visual Identity')}
          className="px-6 py-3 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-md transition-colors whitespace-nowrap flex items-center gap-2"
        >
          <span>Get Brand Identity Package</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
