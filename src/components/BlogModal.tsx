import { useEffect, useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { BLOG_POSTS } from '../data/blogsData';
import { BlogPost } from '../types';
import {
  X,
  Clock,
  User,
  ArrowRight,
  ArrowLeft,
  Share2,
  Bookmark,
  ExternalLink,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export function BlogModal() {
  const {
    isBlogModalOpen,
    closeBlogModal,
    selectedBlogSlug,
    openQuoteModal,
    navigate
  } = useNavigation();

  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  // Update active post based on slug or default to null (list view)
  useEffect(() => {
    if (selectedBlogSlug) {
      const found = BLOG_POSTS.find((p) => p.slug === selectedBlogSlug);
      if (found) setActivePost(found);
    } else {
      setActivePost(null);
    }
  }, [selectedBlogSlug, isBlogModalOpen]);

  // Handle ESC key and scroll locking
  useEffect(() => {
    if (!isBlogModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBlogModal();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBlogModalOpen, closeBlogModal]);

  if (!isBlogModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeBlogModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-modal-title"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50/70 via-white to-orange-50/50 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            {activePost ? (
              <button
                onClick={() => setActivePost(null)}
                className="text-xs font-bold text-[#0056b3] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Articles</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0056b3]">
                <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-pulse" />
                <span>Agency Insights & Strategy</span>
              </div>
            )}
            <span className="text-slate-300">/</span>
            <button
              onClick={() => {
                closeBlogModal();
                navigate('blog');
              }}
              className="text-xs text-slate-500 hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
              title="Open standalone page"
            >
              Full Page <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={closeBlogModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {activePost ? (
            /* Detailed Post Reader View */
            <article className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-bold text-[#0056b3] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    {activePost.category}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {activePost.readTime}
                  </span>
                  <span>·</span>
                  <span>{activePost.date}</span>
                </div>

                <h2 id="blog-modal-title" className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {activePost.title}
                </h2>

                <p className="text-sm sm:text-base text-slate-600 italic border-l-2 border-[#ff5722] pl-3 py-0.5">
                  "{activePost.excerpt}"
                </p>
              </div>

              {/* Featured Image */}
              {activePost.image && (
                <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-900">
                  <img
                    src={activePost.image}
                    alt={activePost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Author & Meta */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center">
                    {activePost.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{activePost.author}</div>
                    <div className="text-slate-500">Happiiz Strategic Publication</div>
                  </div>
                </div>

                <button
                  onClick={() => setActivePost(null)}
                  className="text-xs font-semibold text-[#0056b3] hover:underline cursor-pointer"
                >
                  Back to Articles
                </button>
              </div>

              {/* Post Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                {activePost.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-2 items-center">
                <span className="text-xs font-bold text-slate-500">Topics:</span>
                {activePost.tags.map((t, i) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                    #{t}
                  </span>
                ))}
              </div>

              {/* CTA Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-sm">Need help executing this strategy for your brand?</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Consult directly with our growth engineering specialists.</p>
                </div>
                <button
                  onClick={() => {
                    closeBlogModal();
                    openQuoteModal(`Strategy for: ${activePost.title}`);
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-white hover:bg-orange-400 rounded-xl transition-all shrink-0 cursor-pointer"
                >
                  Book Discovery Session
                </button>
              </div>
            </article>
          ) : (
            /* Articles List Grid View */
            <div className="space-y-6">
              <div>
                <h2 id="blog-modal-title" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Latest Articles & Strategic Guides
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Practical methodologies on web performance, conversion funnels, and executive stationery systems.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {BLOG_POSTS.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setActivePost(post)}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-3 cursor-pointer group"
                  >
                    <div className="space-y-3">
                      {post.image && (
                        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-100">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                            {post.category}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-bold text-[#0056b3]">
                          {post.date}
                        </span>
                        <span className="font-mono text-xs">{post.readTime}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0056b3] transition-colors leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0056b3] group-hover:text-[#ff5722]">
                      <span>Read Complete Guide</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
