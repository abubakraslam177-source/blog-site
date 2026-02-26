import React, { useState, useEffect } from 'react';
import { blogService } from './services/blogService';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import BlogDetail from './components/BlogDetail';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const AppContent = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [userBookmarks, setUserBookmarks] = useState([]);
  
  const { user, isAuthenticated } = useAuth();

  const categories = ['TECH', 'LIFESTYLE', 'TRAVEL', 'FOOD', 'OTHER'];
  const socials = [
    { id: "TW", icon: FaTwitter, url: "https://twitter.com" },
    { id: "LI", icon: FaLinkedin, url: "https://linkedin.com" },
    { id: "GH", icon: FaGithub, url: "https://github.com" },
  ];

  // Subscribe to real-time blog updates
  useEffect(() => {
    let isMounted = true;
    
    const unsubscribe = blogService.subscribeToBlogs((updatedBlogs) => {
      if (isMounted) {
        setBlogs(updatedBlogs);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // Load user bookmarks when user changes
  useEffect(() => {
    const loadBookmarks = async () => {
      if (user?.uid) {
        const bookmarks = await blogService.getUserBookmarks(user.uid);
        setUserBookmarks(bookmarks);
      } else {
        setUserBookmarks([]);
      }
    };
    loadBookmarks();
  }, [user?.uid]);

  const handleCreateNew = () => {
    if (!isAuthenticated) {
      setCurrentView('login');
      return;
    }
    setSelectedBlogId(null);
    setCurrentView('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEdit = (id) => {
    const blog = blogs.find(b => b.id === id);
    // Only allow editing own blogs
    if (blog && blog.authorId && blog.authorId !== user?.uid) {
      alert('You can only edit your own stories.');
      return;
    }
    setSelectedBlogId(id);
    setCurrentView('edit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetail = async (id) => {
    await blogService.incrementView(id);
    setSelectedBlogId(id);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const blog = blogs.find(b => b.id === id);
    // Only allow deleting own blogs
    if (blog && blog.authorId && blog.authorId !== user?.uid) {
      alert('You can only delete your own stories.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this post?')) {
      await blogService.deleteBlog(id);
      if (currentView === 'detail') setCurrentView('home');
    }
  };

  const handleSave = async (blog) => {
    await blogService.saveBlog(blog);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookmarkToggle = async (id) => {
    if (!isAuthenticated) {
      setCurrentView('login');
      return;
    }
    const isNowBookmarked = await blogService.toggleBookmark(id, user?.uid);
    // Update local bookmarks state
    if (isNowBookmarked) {
      setUserBookmarks([...userBookmarks, id]);
    } else {
      setUserBookmarks(userBookmarks.filter(bookmarkId => bookmarkId !== id));
    }
  };

  const handleAddComment = async (blogId, comment) => {
    const commentWithUser = {
      ...comment,
      author: isAuthenticated ? (user?.displayName || 'Anonymous') : comment.author
    };
    await blogService.addComment(blogId, commentWithUser);
  };

  const handleAuthSuccess = () => {
    setCurrentView('home');
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === 'All' || blog.category === activeCategory;

    if (currentView === 'bookmarks') {
      return matchesSearch && userBookmarks.includes(blog.id) && matchesCategory;
    }

    return matchesSearch && matchesCategory;
  });

  // Add bookmark status to blogs
  const blogsWithBookmarkStatus = filteredBlogs.map(blog => ({
    ...blog,
    isBookmarked: userBookmarks.includes(blog.id)
  }));

  // Render main content based on currentView
  const renderContent = () => {
    if (loading && currentView === 'home') {
      return (
        <div className="flex items-center justify-center py-40">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500 font-bold">Loading stories...</p>
          </div>
        </div>
      );
    }

    if (currentView === 'login') {
      return <Login onViewChange={setCurrentView} onSuccess={handleAuthSuccess} />;
    }

    if (currentView === 'signup') {
      return <Signup onViewChange={setCurrentView} onSuccess={handleAuthSuccess} />;
    }

    if (currentView === 'create' || currentView === 'edit') {
      if (!isAuthenticated) {
        return <Login onViewChange={setCurrentView} onSuccess={handleAuthSuccess} />;
      }
      const existingBlog = selectedBlogId ? blogs.find((b) => b.id === selectedBlogId) : undefined;
      return <BlogForm onSave={handleSave} onCancel={() => setCurrentView('home')} initialData={existingBlog} />;
    }

    if (currentView === 'detail') {
      const blog = blogs.find((b) => b.id === selectedBlogId);
      if (!blog) return <div className="p-8 text-center">Blog not found.</div>;
      
      const canEdit = !blog.authorId || blog.authorId === user?.uid;
      const blogWithBookmark = {
        ...blog,
        isBookmarked: userBookmarks.includes(blog.id)
      };
      
      return (
        <BlogDetail
          blog={blogWithBookmark}
          relatedPosts={blogs.filter((b) => b.id !== blog.id).slice(0, 3)}
          onBack={() => setCurrentView('home')}
          onEdit={canEdit ? () => handleEdit(blog.id) : null}
          onDelete={canEdit ? () => handleDelete(blog.id) : null}
          onViewPost={handleViewDetail}
          onCommentAdded={handleAddComment}
          onLike={async () => {
            await blogService.toggleLike(blog.id);
          }}
          onToggleBookmark={() => handleBookmarkToggle(blog.id)}
          isAuthenticated={isAuthenticated}
          currentUserId={user?.uid}
        />
      );
    }

    if (currentView === 'about') return <About />;
    if (currentView === 'contact') return <Contact />;

    // Default: feed / bookmarks
    return (
      <BlogList
        blogs={blogsWithBookmarkStatus}
        onView={handleViewDetail}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearch={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        isBookmarkView={currentView === 'bookmarks'}
        currentUserId={user?.uid}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar onViewChange={setCurrentView} currentView={currentView} onCreate={handleCreateNew} />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">{renderContent()}</main>

      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-slate-800 pb-12">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">TN</div>
                <span className="text-xl font-bold text-white">ThinkNest Blog</span>
              </div>
              <p className="text-slate-400 max-w-sm">
                A modern platform for deep thinkers, creators, and technologists to share their stories with the world. Powered by AI and community.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setCurrentView('home')} className="hover:text-indigo-400">Feed</button></li>
                <li><button onClick={() => setCurrentView('about')} className="hover:text-indigo-400">About Us</button></li>
                <li><button onClick={() => setCurrentView('contact')} className="hover:text-indigo-400">Contact</button></li>
                <li><button onClick={() => setCurrentView('bookmarks')} className="hover:text-indigo-400">My Bookmarks</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm">
                {categories.slice(0, 4).map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        setActiveCategory(cat);
                        setCurrentView('home');
                      }}
                      className="hover:text-indigo-400"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; 2026 ThinkNest Publishing Group. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {socials.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full border border-white/20 hover:text-indigo-500 hover:bg-white/10 transition-colors duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;