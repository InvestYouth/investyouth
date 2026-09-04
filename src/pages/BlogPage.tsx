import React, { useState } from 'react';
import { BLOGS_DATA } from '../data/blogsData';
import { BlogPost } from '../types';
import { FYERS_AFFILIATE_URL } from '../utils/calculations';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Calendar, 
  Tag, 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  X,
  TrendingUp,
  Bookmark
} from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = ['All', 'Fundamentals', 'Stock Market', 'Mutual Funds', 'Student Finance', 'Mindset & Risk'];

  const filteredBlogs = BLOGS_DATA.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-4">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>DALAL STREET KNOWLEDGE VAULT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Zero-Jargon Investment Guides
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            5 research-backed, practical financial guides written specifically for Indian college students, young graduates, and first-time earners.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics: Nifty, F&O, SIP, ₹1,000..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, idx) => (
            <article
              key={blog.id}
              id={`blog-card-${blog.id}`}
              className={`bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col ${
                idx === 0 && selectedCategory === 'All' && !searchQuery ? 'lg:col-span-2 lg:flex-row' : ''
              }`}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden shrink-0 ${
                  idx === 0 && selectedCategory === 'All' && !searchQuery
                    ? 'lg:w-1/2 h-64 lg:h-auto min-h-[260px]'
                    : 'h-52 w-full'
                }`}
              >
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-emerald-800 shadow-sm border border-white/60">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {blog.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {blog.publishDate}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight hover:text-emerald-700 transition-colors font-heading leading-snug">
                    {blog.title}
                  </h2>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>

                  {/* Key Takeaway Box */}
                  <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl text-xs text-emerald-900 leading-relaxed">
                    <span className="font-bold text-emerald-800">Key Youth Insight: </span>
                    {blog.keyTakeaway}
                  </div>
                </div>

                {/* Author & Read Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-800">{blog.author.name}</p>
                      <p className="text-[10px] text-slate-500">{blog.author.role}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveArticle(blog)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state if search finds nothing */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No matching articles found</h3>
            <p className="text-sm text-slate-500 mt-1">
              Try searching for &quot;compounding&quot;, &quot;nifty&quot;, &quot;stocks&quot;, or clear filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Banner CTA */}
        <div className="mt-16 bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              Put Theory into Practice
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
              Don&apos;t just read about wealth—start building it today.
            </h3>
            <p className="text-emerald-100 text-sm max-w-xl">
              Open your free Fyers investment account in 5 minutes with zero paperwork and kickstart your first automated SIP in Dalal Street.
            </p>
          </div>
          <a
            id="blog-page-cta-start-investment"
            href={FYERS_AFFILIATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-slate-900 bg-white hover:bg-emerald-50 shadow-lg hover:shadow-xl transition-all"
          >
            <span>Start Investment Now</span>
            <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
          </a>
        </div>
      </div>

      {/* =========================================================
          FULL ARTICLE READER MODAL
      ========================================================= */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activeArticle.readTime}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                  title="Copy Article Link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-800">
              {copiedLink && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Link copied to clipboard!</span>
                </div>
              )}

              {/* Title & Author */}
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
                  {activeArticle.title}
                </h2>

                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={activeArticle.author.avatar}
                    alt={activeArticle.author.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{activeArticle.author.name}</p>
                    <p className="text-xs text-slate-500">{activeArticle.author.role}</p>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="rounded-2xl overflow-hidden h-64 w-full">
                <img
                  src={activeArticle.featuredImage}
                  alt={activeArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Lead Paragraph */}
              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed italic border-l-4 border-emerald-500 pl-4 bg-emerald-50/40 py-2 rounded-r-xl">
                &ldquo;{activeArticle.content.lead}&rdquo;
              </p>

              {/* Body Sections */}
              <div className="space-y-8 pt-4">
                {activeArticle.content.sections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 font-heading">
                      {section.heading}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                      {section.body}
                    </p>

                    {/* Stats Highlights if available */}
                    {section.stats && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                        {section.stats.map((st, i) => (
                          <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                            <span className="text-[11px] text-slate-500 block">{st.label}</span>
                            <span className="text-base font-extrabold text-emerald-700 font-mono mt-0.5 block">
                              {st.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Highlight Box if available */}
                    {section.highlightBox && (
                      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed">
                        <p className="whitespace-pre-line font-medium">
                          {section.highlightBox}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Actionable Steps Checklist for Indian Youth */}
              <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/90 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-700" />
                  <h4 className="text-base font-bold text-emerald-950 font-heading">
                    Action Plan for Young Investors:
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {activeArticle.content.actionSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-emerald-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {activeArticle.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg text-xs bg-slate-100 text-slate-600 font-medium"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Modal Bottom CTA */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500 text-center sm:text-left">
                  Partner with SEBI-registered broker FYERS for zero equity brokerage on investments.
                </span>
                <a
                  id="article-reader-btn-start-investment"
                  href={FYERS_AFFILIATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 shadow-md shadow-sky-500/20 active:scale-95 transition-all"
                >
                  <span>Start Investment Now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
