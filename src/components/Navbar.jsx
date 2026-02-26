import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ onViewChange = () => {}, currentView = 'home', onCreate = () => {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'bookmarks', label: 'Reading List' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (view) => {
    onViewChange(view);
    setIsMenuOpen(false);
    setShowUserMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    onViewChange('home');
  };

  const handleWriteClick = () => {
    if (isAuthenticated) {
      onCreate();
    } else {
      onViewChange('login');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-4 py-4">
      <div className="container mx-auto flex justify-between items-center max-w-6xl">
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-indigo-100">
            TN
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">ThinkNest</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center bg-slate-100 p-1.5 rounded-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-5 py-2 cursor-pointer rounded-xl text-sm font-bold transition-all ${
                currentView === item.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {/* Write Story Button */}
          <button
            onClick={handleWriteClick}
            className="bg-slate-900 hover:bg-slate-800 cursor-pointer text-white font-bold px-6 py-3 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center space-x-2"
          >
            <span className="hidden sm:inline">Write Story</span>
            <span className="sm:hidden">Write</span>
          </button>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 bg-indigo-50 hover:bg-indigo-100 px-4 py-3 rounded-2xl transition-all cursor-pointer"
              >
                <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                  {user?.displayName?.[0] || user?.email?.[0] || 'U'}
                </div>
                <span className="hidden sm:block text-sm font-bold text-slate-700 max-w-24 truncate">
                  {user?.displayName || 'User'}
                </span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-fadeIn">
                  <div className="p-4 border-b border-slate-100">
                    <p className="font-bold text-slate-900 truncate">{user?.displayName || 'User'}</p>
                    <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 font-bold flex items-center space-x-2 transition-colors"
                  >
                    <FaSignOutAlt />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('login')}
              className="hidden sm:flex items-center space-x-2 bg-indigo-50 hover:bg-indigo-100 px-5 py-3 rounded-2xl transition-all cursor-pointer"
            >
              <FaUser className="text-indigo-600" />
              <span className="text-sm font-bold text-indigo-600">Sign In</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-600 text-2xl leading-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 p-4 space-y-2 shadow-xl animate-slideDown">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold ${
                currentView === item.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}
          {!isAuthenticated && (
            <button
              onClick={() => handleNavClick('login')}
              className="w-full text-left px-4 py-3 rounded-xl font-bold text-indigo-600 bg-indigo-50"
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;