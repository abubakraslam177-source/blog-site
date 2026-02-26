import React from "react";
import { HiArrowRight } from 'react-icons/hi';
import { HiPencilAlt } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";

const BlogCard = ({ blog, onView, onEdit, onDelete, canModify = true }) => {
  // Format date before return
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Blog card variables
  const imageUrl = blog.imageUrl;
  const title = blog.title;
  const excerpt = blog.excerpt;
  const author = blog.author;
  const createdAt = formatDate(blog.createdAt);
  const category = blog.category;

  return (
    <article className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col h-full">
      {/* Image Section */}
      <div
        className="relative h-56 overflow-hidden cursor-pointer"
        onClick={onView}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-slate-400 mb-3 space-x-2">
          <span>{author}</span>
          <span>•</span>
          <span>{createdAt}</span>
        </div>

        <h3
          className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 cursor-pointer hover:text-indigo-600 transition-colors"
          onClick={onView}
        >
          {title}
        </h3>

        <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>

        {/* Actions */}
        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
          <button
            onClick={onView}
            className="text-indigo-600 font-bold text-sm hover:translate-x-1 transition-transform inline-flex items-center"
          >
            Read Story
            <HiArrowRight className="ml-1 w-4 h-4" />
          </button>

          {canModify && (
            <div className="flex space-x-2">
              <button
                onClick={onEdit}
                title="Edit Post"
                className="p-3 bg-white text-slate-500 border border-slate-100 rounded-2xl shadow-sm hover:text-indigo-600 transition-all"
              >
                <HiPencilAlt className="w-5 h-5" />
              </button>

              <button
                onClick={onDelete}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Delete Post"
              >
                <RiDeleteBin6Line className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default BlogCard;