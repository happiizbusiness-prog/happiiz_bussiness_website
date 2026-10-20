import { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { PortfolioProject } from '../types';
import { ArrowRight, X, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function PortfolioPage() {
  const { openQuoteModal } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  const categories = ['All', 'Web Development', 'Digital Marketing', 'Branding & Design'];

  const filtered = PORTFOLIO_PROJECTS.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
          <span>Our Track Record</span>
          <span aria-hidden="true">·</span>
          <span>Sample Client Showcases</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
          Selected Agency Portfolio & Case Studies
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Explore our recent demonstration works spanning custom responsive web applications, lead generation funnels, and executive stationery branding.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl w-fit border border-slate-200">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            onClick={() => setActiveProject(proj)}
            className="cursor-pointer group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-medium">
                  Sample Showcase
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-semibold text-slate-800 shadow-sm">
                  {proj.category}
                </div>
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium text-slate-700">{proj.client}</span>
                  <span className="font-mono">{proj.year}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {proj.summary}
                </p>

                <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100 text-[11px] font-semibold text-emerald-800">
                  {proj.impact}
                </div>
              </div>
            </div>

            <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-slate-100 mt-2">
              <span className="text-xs font-semibold text-blue-700 group-hover:underline">
                View Case Study
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-700" />
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveProject(null);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50/70 via-white to-orange-50/50 sticky top-0 z-10">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-[#0056b3] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{activeProject.category}</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500 font-medium">Sample Showcase</span>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <div className="text-xs text-slate-500 mb-1">{activeProject.client} · {activeProject.year}</div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {activeProject.title}
                </h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {activeProject.summary}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Demonstrated Commercial Impact
                </div>
                <p className="text-sm font-semibold text-emerald-950">
                  {activeProject.impact}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Project Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProject.deliverables.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Technologies & Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-md bg-slate-100 text-slate-700 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-6 border-t border-slate-100 bg-slate-50">
              <button
                onClick={() => setActiveProject(null)}
                className="text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Close Case Study
              </button>
              <button
                onClick={() => {
                  const projName = activeProject.title;
                  setActiveProject(null);
                  openQuoteModal(`Project inspired by: ${projName}`);
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm"
              >
                Discuss a Similar Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold tracking-tight">Have a Vision for Your Brand or Web Platform?</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            We provide upfront wireframe previews and clear deliverable roadmaps for every project before commencement.
          </p>
        </div>
        <button
          onClick={() => openQuoteModal('New Project Inquiry')}
          className="px-6 py-3 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-md transition-colors whitespace-nowrap flex items-center gap-2"
        >
          <span>Request Free Estimate</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
