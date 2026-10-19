import { useNavigation } from '../context/NavigationContext';
import { BLOG_POSTS } from '../data/blogsData';
import { ArrowRight, ChevronRight, Clock, User } from 'lucide-react';

export function BlogListPage() {
  const { navigate, openBlogModal } = useNavigation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
          <span>Agency Knowledge Base</span>
          <span aria-hidden="true">·</span>
          <span>Digital Growth Insights</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
          Articles, Playbooks & Strategic Guides
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Actionable frameworks on Core Web Vitals, organic search dominance, B2B lead generation pipelines, and brand stationery excellence.
        </p>
      </div>

      {/* Featured Article Banner */}
      {BLOG_POSTS[0] && (
        <div
          onClick={() => openBlogModal(BLOG_POSTS[0].slug)}
          className="cursor-pointer group rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl hover:border-slate-700 transition-all overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        >
          {BLOG_POSTS[0].image && (
            <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto bg-slate-800 overflow-hidden">
              <img
                src={BLOG_POSTS[0].image}
                alt={BLOG_POSTS[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold uppercase tracking-wider">
                <span>Featured Article</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{BLOG_POSTS[0].category}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-400 font-normal">{BLOG_POSTS[0].readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors leading-snug">
                {BLOG_POSTS[0].title}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                {BLOG_POSTS[0].excerpt}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div>By {BLOG_POSTS[0].author} · {BLOG_POSTS[0].date}</div>
              <div className="flex items-center gap-1.5 text-blue-400 font-semibold group-hover:gap-2 transition-all">
                <span>Read Full Breakdown</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Remaining Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_POSTS.slice(1).map((post) => (
          <div
            key={post.id}
            onClick={() => openBlogModal(post.slug)}
            className="cursor-pointer group rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
          >
            {post.image && (
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {post.category}
                </span>
              </div>
            )}

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-blue-700">{post.date}</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">{post.author}</span>
                <span className="font-semibold text-blue-700 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                  <span>Read Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
