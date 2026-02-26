import React, { useState } from "react";
import { HiArrowLeft } from 'react-icons/hi';
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi"; 
import { RiDeleteBin6Line } from "react-icons/ri"; 
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

const BlogDetail = ({
  blog,
  relatedPosts,
  onBack,
  onEdit,
  onDelete,
  onViewPost,
  onCommentAdded,
  onLike,
  onToggleBookmark,
  isAuthenticated = false,
  currentUserId = null,
}) => {
  const [newComment, setNewComment] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");

  // Check if current user can edit/delete this blog
  const canModify = !blog.authorId || blog.authorId === currentUserId;

  // Format date helper
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Variables for blog
  const title = blog.title;
  const excerpt = blog.excerpt;
  const imageUrl = blog.imageUrl;
  const category = blog.category;
  const author = blog.author;
  const authorRole = blog.authorRole || "Contributor";
  const likes = blog.likes;
  const views = blog.views;
  const readTime = blog.readTime;
  const isBookmarked = blog.isBookmarked;
  const comments = blog.comments || [];

  const formattedDate = formatDate(blog.createdAt);
  const contentParagraphs = blog.content.split("\n").filter((p) => p.trim());

  // Handlers
  const handleAddComment = (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;
    if (!isAuthenticated && !commentAuthor.trim()) return;

    const comment = {
      id: Date.now().toString(),
      author: commentAuthor || "Anonymous",
      content: newComment,
      createdAt: new Date().toISOString(),
    };

    onCommentAdded(blog.id, comment);

    setNewComment("");
    setCommentAuthor("");
  };

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn pb-24">
      {/* Top Buttons */}
      <div className="flex justify-between items-center mb-10">
        <button
          onClick={onBack}
          className="flex items-center text-slate-500 cursor-pointer hover:text-indigo-600 font-black transition-colors group px-4 py-2 bg-white rounded-2xl shadow-sm border border-slate-100"
        >
          <HiArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          Back to feed
        </button>

        <div className="flex space-x-3">
          <button
            onClick={onToggleBookmark}
            className={`p-3 rounded-2xl shadow-sm border transition-all cursor-pointer ${
              isBookmarked
                ? "bg-indigo-600 border-indigo-600 text-white"
                : "bg-white border-slate-100 text-slate-400 hover:text-indigo-600"
            }`}
          >
            {isBookmarked ? (
              <FaBookmark className="w-5 h-5" />
            ) : (
              <FaRegBookmark className="w-5 h-5" />
            )}
          </button>

          {/* Edit Button - Only show if user can modify */}
          {canModify && onEdit && (
            <button
              onClick={onEdit}
              className="cursor-pointer p-3 bg-white text-slate-500 border border-slate-100 rounded-2xl shadow-sm hover:text-indigo-600 transition-all"
            >
              <HiPencilAlt className="w-5 h-5" />
            </button>
          )}

          {/* Delete Button - Only show if user can modify */}
          {canModify && onDelete && (
            <button
              onClick={onDelete}
              className="p-3 bg-white text-slate-500 border border-slate-100 rounded-2xl shadow-sm hover:text-red-600 transition-all cursor-pointer"
            >
              <RiDeleteBin6Line className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Blog Article */}
        <article className="lg:col-span-8 space-y-12">
          {/* Header */}
          <div className="space-y-6">
            <span className="bg-indigo-50 text-indigo-600 text-sm font-black px-5 py-2 rounded-full uppercase tracking-widest inline-block">
              {category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
              {title}
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-medium italic">
              {excerpt}
            </p>
          </div>

          {/* Image */}
          <div className="relative h-[500px] rounded-[3.5rem] overflow-hidden shadow-2xl">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          </div>

          {/* Author & Meta */}
          <div className="flex items-center justify-between py-8 border-y border-slate-100">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl">
                {author[0]}
              </div>
              <div>
                <p className="font-black text-slate-900 text-lg">{author}</p>
                <p className="text-sm font-bold text-slate-400">{authorRole}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-slate-400 font-bold text-sm">
              <span className="flex items-center">
                ⏱ {readTime}
              </span>
              <span className="flex items-center">
                📅 {formattedDate}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none prose-xl prose-p:leading-relaxed prose-headings:font-black">
            {contentParagraphs.map((para, idx) => (
              <p key={idx} className="mb-8 text-slate-700 font-medium leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Like & Share */}
          <div className="bg-slate-50 rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-100">
            <div className="flex items-center space-x-4">
              <button
                onClick={onLike}
                className="group flex items-center space-x-3 bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                ❤️ <span className="font-black text-slate-900 ">{likes} Likes</span>
              </button>
              <div className="text-slate-400 font-bold">{views} Views</div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                Share
              </span>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-xl shadow-sm border flex items-center justify-center hover:text-indigo-600"
              >
                <FaTwitter />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-xl shadow-sm border flex items-center justify-center hover:text-indigo-600"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-xl shadow-sm border flex items-center justify-center hover:text-indigo-600"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Comments */}
          <section className="space-y-10 pt-10">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight flex items-center">
              Reader Feedback
              <span className="ml-4 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm font-black">
                {comments.length}
              </span>
            </h3>

            <div className="space-y-8">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-6 animate-slideUp">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xl">
                    {comment.author[0]}
                  </div>
                  <div className="flex-grow bg-white p-8 rounded-3xl rounded-tl-none border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-black text-slate-900">{comment.author}</span>
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed font-medium">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl space-y-6">
              <h4 className="text-xl font-black text-white">Add to the discussion</h4>
              <div className="space-y-4">
                {!isAuthenticated && (
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    className="w-full px-6 py-4 bg-white/10 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-white/40 outline-none font-bold"
                  />
                )}
                <textarea
                  placeholder="Share your thoughts..."
                  required
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-white/40 outline-none font-bold resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="cursor-pointer bg-white text-slate-900 font-black px-10 py-4 rounded-2xl transition-all active:scale-95 hover:bg-indigo-50"
              >
                Post Response
              </button>
            </form>
          </section>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-12">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6 sticky top-32">
            <h4 className="text-xl font-black text-slate-900">Recommended for you</h4>
            <div className="space-y-8">
              {relatedPosts.map((post) => {
                const postImage = post.imageUrl;
                const postTitle = post.title;
                const postCategory = post.category;

                return (
                  <div
                    key={post.id}
                    className="group cursor-pointer space-y-3"
                    onClick={() => onViewPost(post.id)}
                  >
                    <div className="h-40 rounded-[2rem] overflow-hidden">
                      <img
                        src={postImage}
                        alt={postTitle}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-1 inline-block">
                        {postCategory}
                      </span>
                      <h5 className="font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
                        {postTitle}
                      </h5>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-6 border-t border-slate-50 text-center">
              <button className="cursor-pointer text-indigo-600 font-black text-sm uppercase tracking-widest hover:translate-x-1 transition-transform inline-flex items-center">
                Explore all stories
                <HiArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetail;