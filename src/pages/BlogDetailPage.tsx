import { useNavigation } from '../context/NavigationContext';
import { useBusiness } from '../context/BusinessContext';
import { BLOG_POSTS } from '../data/blogsData';
import { ArrowLeft, Clock, User, Share2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export function BlogDetailPage({ slug }: { slug: string }) {
  const { navigate, openQuoteModal } = useNavigation();
  const { settings } = useBusiness();
  const [copied, setCopied] = useState(false);

  const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('blog')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Articles</span>
        </button>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="text-blue-700 uppercase tracking-wider">{post.category}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
          <span aria-hidden="true">·</span>
          <span>Published {post.date}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold text-slate-900">{post.author}</span>
            <span>·</span>
            <span>{settings.businessName}</span>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
          </button>
        </div>
      </div>

      {/* Featured Image */}
      {post.image && (
        <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-slate max-w-none space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
        {post.content.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Tags */}
      <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 mr-2">Topics:</span>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-md font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* In-Article CTA */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-4">
        <h3 className="text-xl font-bold">Ready to implement this for your business?</h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
          At {settings.businessName}, we translate high-level digital strategy into production-ready websites and scalable lead pipelines.
        </p>
        <button
          onClick={() => openQuoteModal(`Inquiry from article: ${post.title}`)}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
        >
          <span>Speak With An Architect</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
}
