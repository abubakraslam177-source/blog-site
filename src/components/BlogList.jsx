import React from 'react';
import { FaBookOpen } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import BlogCard from './BlogCard';

const BlogList = ({
  blogs = [],
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onSearch = () => {},
  activeCategory = 'All',
  onCategoryChange = () => {},
  isBookmarkView = false,
  currentUserId = null
}) => {
  const categories = ['All', 'TECH', 'LIFESTYLE', 'TRAVEL', 'FOOD', 'OTHER'];
  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const otherBlogs = blogs.slice(featuredBlog && !isBookmarkView ? 1 : 0);

  // Check if user can modify a blog
  const canModifyBlog = (blog) => {
    if (!blog.authorId) return true; // Legacy blogs without authorId
    return blog.authorId === currentUserId;
  };

  return (
    <div className="space-y-16 animate-fadeIn pb-24">
      {/* Editorial Hero */}
      {featuredBlog && !isBookmarkView && (
        <section
          className="relative h-[600px] w-full rounded-[4rem] overflow-hidden group cursor-pointer shadow-3xl"
          onClick={() => onView(featuredBlog.id)}
        >
          <img
            src={featuredBlog.imageUrl}
            alt={featuredBlog.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-10 md:p-20 max-w-4xl space-y-6">
            <div className="flex items-center space-x-4">
              <span className="bg-indigo-600 text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest">
                Top Story
              </span>
              <span className="text-white/60 font-bold text-sm uppercase tracking-widest">
                {featuredBlog.category}
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
              {featuredBlog.title}
            </h2>
            <div className="flex items-center space-x-8 text-slate-300 font-bold">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-2xl bg-white/20 mr-4 flex items-center justify-center text-white border border-white/20">
                  {featuredBlog.author ? featuredBlog.author[0] : 'A'}
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-lg">{featuredBlog.author}</span>
                  <span className="text-xs opacity-60 uppercase">Lead Author</span>
                </div>
              </div>
              <div className="hidden sm:flex flex-col border-l border-white/20 pl-8">
                <span className="text-white">{featuredBlog.readTime}</span>
                <span className="text-xs opacity-60 uppercase">Reading Time</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter & Search Bar */}
      <div className="sticky top-[96px] z-40 py-6 bg-slate-50/80 backdrop-blur-md -mx-4 px-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-4 rounded-[3rem] shadow-sm border border-slate-100">
          <div className="flex overflow-x-auto gap-3 no-scrollbar px-2 py-1 flex-grow">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`whitespace-nowrap cursor-pointer px-8 py-3.5 rounded-2xl text-sm font-black transition-all transform active:scale-95 ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96 px-2">
            <FaSearch className="absolute left-7 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />

            <input
              type="text"
              placeholder="Search in the library..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-14 pr-8 py-4 bg-slate-50 border-none rounded-[1.5rem] focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-bold placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <section className="space-y-10">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">
            {isBookmarkView
              ? 'Saved Stories'
              : activeCategory === 'All'
              ? 'Latest from ThinkNest'
              : `Exploration: ${activeCategory}`}
          </h3>
          <div className="flex items-center text-sm font-bold text-slate-400 space-x-2">
            <span>Showing {otherBlogs.length} Stories</span>
          </div>
        </div>

        {otherBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 ">
            {otherBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onView={() => onView(blog.id)}
                onEdit={() => onEdit(blog.id)}
                onDelete={() => onDelete(blog.id)}
                canModify={canModifyBlog(blog)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-white rounded-[4rem] border-2 border-dashed border-slate-200">
            <div className="text-slate-300 mb-8">
              <FaBookOpen className="h-24 w-24 mx-auto text-slate-200" />
            </div>
            <h3 className="text-3xl font-black text-slate-900">The library is empty.</h3>
            <p className="text-slate-500 mt-3 text-lg">Change your filters or search keywords.</p>
          </div>
        )}
      </section>

      {/* Newsletter Block */}
      <section className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center text-white space-y-10 shadow-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[120px] opacity-20 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600 rounded-full blur-[120px] opacity-10 -ml-32 -mb-32"></div>

        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-6xl font-black leading-none tracking-tighter">
            The best of ThinkNest, delivered weekly.
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-medium">
            Join 25,000+ readers who get our top-rated stories and AI-writing tips directly in their inbox.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Subscribed!');
          }}
          className="flex flex-col sm:flex-row gap-5 max-w-2xl mx-auto pt-6"
        >
          <input
            type="email"
            required
            placeholder="Enter your email address..."
            className="flex-grow px-10 py-6 rounded-[2rem] bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-lg"
          />
          <button
            type="submit"
            className="bg-white text-slate-900 font-black px-12 py-6 rounded-[2rem] hover:bg-indigo-50 transition-all active:scale-95 shadow-2xl shadow-white/10 text-lg"
          >
            Subscribe
          </button>
        </form>

        <p className="text-white/40 text-sm font-bold uppercase tracking-widest">No algorithms. No noise. Just great writing.</p>
      </section>
    </div>
  );
};

export default BlogList;