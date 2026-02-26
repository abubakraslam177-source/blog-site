import React, { useState } from 'react';
import CloudinaryUpload from './CloudinaryUpload';
import { useAuth } from '../hooks/useAuth';

const BlogForm = ({ onSave, onCancel, initialData }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [category, setCategory] = useState(initialData?.category || 'TECH');
  const [author, setAuthor] = useState(initialData?.author || user?.displayName || 'Anonymous User');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const blog = {
      id: initialData?.id || `temp_${Date.now()}`,
      title,
      content,
      excerpt: content.substring(0, 150) + '...',
      category,
      author,
      authorId: user?.uid || null,
      imageUrl: imageUrl || 'https://picsum.photos/seed/new/800/450',
      createdAt: initialData?.createdAt || new Date().toISOString(),
      readTime: `${Math.ceil(content.split(' ').length / 200)} min read`,
      comments: initialData?.comments || [],
      likes: initialData?.likes || 0,
      isBookmarked: initialData?.isBookmarked || false,
      views: initialData?.views || 0
    };
    onSave(blog);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 animate-fadeIn">
      <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">{initialData ? 'Edit Story' : 'New Story'}</h2>
          <p className="text-slate-400 mt-1">Share your thoughts with the world</p>
        </div>
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Headline</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              placeholder="Give your story a title..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            >
              {['TECH', 'LIFESTYLE', 'TRAVEL', 'FOOD', 'OTHER'].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Author Name</label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
          <div>
            <CloudinaryUpload 
              onUpload={setImageUrl} 
              currentImage={imageUrl}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-bold text-slate-700">Body Content</label>
          </div>
          <textarea
            required
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            className="flex-grow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95"
          >
            {initialData ? 'Update Story' : 'Publish Story'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-grow bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-xl transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;