import { useEffect, useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { useNavigation } from '../context/NavigationContext';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { PortfolioProject } from '../types';
import {
  X,
  ExternalLink,
  Zap,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export function PortfolioModal() {
  const { portfolio } = useBusiness();
  const {
    isPortfolioModalOpen,
    closePortfolioModal,
    selectedProjectId,
    openQuoteModal,
    navigate
  } = useNavigation();

  const [activeFilter, setActiveFilter] = useState('All');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  const allProjects = portfolio && portfolio.length > 0 ? portfolio : PORTFOLIO_PROJECTS;

  // Initialize or update active project when modal opens
  useEffect(() => {
    if (selectedProjectId) {
      const found = allProjects.find((p) => p.id === selectedProjectId);
      if (found) {
        setActiveProject(found);
      }
    } else if (allProjects.length > 0 && !activeProject) {
      setActiveProject(allProjects[0]);
    }
  }, [selectedProjectId, isPortfolioModalOpen, allProjects]);

  // Handle ESC key and scroll locking
  useEffect(() => {
    if (!isPortfolioModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePortfolioModal();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPortfolioModalOpen, closePortfolioModal]);

  if (!isPortfolioModalOpen) return null;

  const categories = ['All', 'Web Development', 'Branding & Design', 'Digital Marketing'];

  const filteredProjects = allProjects.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.category === activeFilter;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closePortfolioModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-modal-title"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50/70 via-white to-orange-50/50 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#0056b3]">
              <Sparkles className="w-3.5 h-3.5 text-[#ff5722]" />
              <span>Portfolio Case Studies</span>
            </div>
            <span className="text-slate-300">·</span>
            <button
              onClick={() => {
                closePortfolioModal();
                navigate('portfolio');
              }}
              className="text-xs text-slate-500 hover:text-[#0056b3] flex items-center gap-1 transition-colors cursor-pointer"
              title="Open standalone page"
            >
              Full Page <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={closePortfolioModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 id="portfolio-modal-title" className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Engineered for Real Impact
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                Explore our commercial sample showcases, verifiable growth metrics, and high-performance digital architectures.
              </p>
            </div>

            <button
              onClick={() => {
                closePortfolioModal();
                openQuoteModal('Portfolio Custom Project');
              }}
              className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] hover:opacity-95 rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
            >
              Start Similar Project
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-gradient-to-r from-[#0056b3] to-[#ff5722] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Active Highlight Project Banner (if selected) */}
          {activeProject && (
            <div className="p-6 rounded-2xl bg-slate-50/90 text-slate-900 border border-slate-200 shadow-xs space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-5 relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-slate-950/90 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700">
                    {activeProject.category}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-[#ff5722] text-white text-[10px] font-black px-2 py-0.5 rounded shadow-md">
                    {activeProject.year}
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0056b3] uppercase tracking-wider">
                      Selected Case Study
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-600 font-medium">{activeProject.client}</span>
                  </div>

                  <h3 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
                    {activeProject.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {activeProject.summary}
                  </p>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{activeProject.impact}</span>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Deliverables:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.deliverables.map((d, i) => (
                        <span key={i} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-700 font-medium">
                          ✓ {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((proj) => {
              const isSelected = activeProject?.id === proj.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => setActiveProject(proj)}
                  className={`group rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/50 border-[#0056b3] ring-2 ring-blue-500/20 shadow-md'
                      : 'bg-white border-slate-200 hover:border-[#0056b3] hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden border-b border-slate-100">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 bg-slate-950/85 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[9px] font-semibold">
                        {proj.category}
                      </div>
                      <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-xs text-slate-900 font-bold px-1.5 py-0.5 rounded text-[9px] shadow-xs">
                        {proj.year}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="text-[11px] text-slate-500 font-medium">{proj.client}</div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0056b3] transition-colors line-clamp-1">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {proj.summary}
                      </p>
                      <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-800 line-clamp-1">
                        ⚡ {proj.impact}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0056b3] group-hover:text-[#ff5722]">
                    <span>{isSelected ? 'Currently Viewing' : 'View Details'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
