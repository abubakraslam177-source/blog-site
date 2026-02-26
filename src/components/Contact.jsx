import React, { useState } from 'react';
import { HiCheck } from "react-icons/hi";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";



const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };


  const socialMedia = [
  { id: 'TW', icon: FaTwitter, url: "https://twitter.com" },
  { id: 'LI', icon: FaLinkedin, url: "https://linkedin.com" },
  { id: 'GH', icon: FaGithub, url: "https://github.com" },
  { id: 'IG', icon: FaInstagram, url: "https://instagram.com" },
];

  return (
    <div className="animate-fadeIn max-w-6xl mx-auto py-12">
      <div className="text-center space-y-6 mb-20">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
          Let's <span className="text-indigo-600">Collaborate.</span>
        </h1>
        <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">
          Have an inquiry, a feedback, or a brilliant idea? Our team is always ready to listen and help you grow your audience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 bg-white rounded-[3.5rem] shadow-sm border border-slate-100 p-10 md:p-16 relative overflow-hidden">
          {submitted ? (
            <div className="absolute inset-0 bg-white flex flex-col items-center justify-center text-center p-12 space-y-6 animate-fadeIn">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
          <HiCheck className="w-10 h-10 text-green-500" />

              </div>
              <h3 className="text-3xl font-black text-slate-900">Message Received!</h3>
              <p className="text-slate-500 font-medium">We've received your inquiry and will get back to you within 24 hours.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-indigo-600 font-bold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-black text-slate-900 uppercase tracking-widest">Full Name</label>
                  <input
                    required
                    type="text"
                    className="w-full px-8 py-5 bg-slate-50 border-none rounded-[1.5rem] focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-black text-slate-900 uppercase tracking-widest">Email Address</label>
                  <input
                    required
                    type="email"
                    className="w-full px-8 py-5 bg-slate-50 border-none rounded-[1.5rem] focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition-all"
                    placeholder="hello@example.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-black text-slate-900 uppercase tracking-widest">Subject</label>
                <input
                  required
                  type="text"
                  className="w-full px-8 py-5 bg-slate-50 border-none rounded-[1.5rem] focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition-all"
                  placeholder="What's this about?"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-black text-slate-900 uppercase tracking-widest">Your Message</label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-8 py-5 bg-slate-50 border-none rounded-[1.5rem] focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition-all resize-none"
                  placeholder="Tell us everything..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-6 rounded-[2rem] shadow-2xl shadow-slate-200 transition-all active:scale-[0.98] text-lg"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-indigo-600 text-white p-12 rounded-[3.5rem] shadow-2xl shadow-indigo-100 space-y-10">
            <h3 className="text-3xl font-black leading-tight">Quick <br />Reach.</h3>
            <div className="space-y-8">
              <div className="group cursor-pointer">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-300 mb-2">Support Email</p>
                <p className="text-xl font-bold group-hover:translate-x-1 transition-transform">support@thinknest.com</p>
              </div>
              <div className="group cursor-pointer">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-300 mb-2">Office Location</p>
                <p className="text-xl font-bold group-hover:translate-x-1 transition-transform">Bahria Town Lahore</p>
              </div>
              <div className="group cursor-pointer">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-300 mb-2">Working Hours</p>
                <p className="text-xl font-bold group-hover:translate-x-1 transition-transform">9am — 6pm PST</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 text-center">
            <p className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Social Pulse</p>
            <div className="flex justify-center space-x-6">
              <div className="flex space-x-3">
      {socialMedia.map((item) => {
        const IconComponent = item.icon; 
        return (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            className="w-10 h-10 bg-white rounded-xl shadow-sm border flex items-center justify-center hover:text-indigo-600 transition-colors"
          >
            <IconComponent className="w-5 h-5" />
          </a>
        );
      })}
    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;