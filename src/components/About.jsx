import React from "react";

const About = () => {
  // Hero section variables
  const heroImage = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200";
  const heroTitle = "Connecting Thinkers & Creators";
  const heroHighlight = "Thinkers";
  const heroDescription = "ThinkNest is a sanctuary for long-form thoughts, high-quality insights, and AI-accelerated storytelling.";

  // Values
  const values = [
    { title: "Truth First", desc: "We prioritize verified information and honest experiences." },
    { title: "AI Harmony", desc: "Technology should enhance, not replace, human creativity." },
    { title: "Design Excellence", desc: "A beautiful reading experience is a fundamental right." }
  ];

  // Stats
  const stats = [
    { number: "15k", label: "Active Writers", bg: "bg-indigo-600 text-white shadow-xl shadow-indigo-200", rotate: "-rotate-2" },
    { number: "2.4M", label: "Monthly Reads", bg: "bg-slate-900 text-white shadow-xl shadow-slate-300", rotate: "rotate-2" },
    { number: "50+", label: "Topics", bg: "bg-white text-slate-900 border border-slate-100 shadow-sm", rotate: "rotate-2" },
    { number: "99.9%", label: "Uptime", bg: "bg-indigo-50 text-indigo-600 shadow-sm", rotate: "-rotate-2" }
  ];

  // Team
  const team =   [
  { 
    name: "Saim", 
    role: "Product Design", 
    img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150&h=150" 
  },
  { 
    name: "Awais", 
    role: "Engineering Lead", 
    img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150" 
  },
  { 
    name: "Alyx", 
    role: "Editorial Director", 
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" 
  },
  { 
    name: "Sharif", 
    role: "AI Research", 
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150" 
  }
];
  return (
    <div className="animate-fadeIn max-w-5xl mx-auto py-12 space-y-24">
      {/* Hero Section */}
      <section className="relative h-[450px] rounded-[3.5rem] overflow-hidden shadow-2xl">
        <img src={heroImage} alt="Our Team" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-transparent flex items-center px-12 md:px-20">
          <div className="max-w-xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              {heroTitle.split(" ")[0]} <br />
              <span className="text-indigo-300">{heroHighlight}</span> & <br />
              Creators.
            </h1>
            <p className="text-xl text-indigo-100/80 font-medium">{heroDescription}</p>
          </div>
        </div>
      </section>

      {/* Mission & Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Why ThinkNest exists</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              In a world of 280-character snippets and mindless scrolling, we wanted to build a space where depth is celebrated. Our platform is designed to help authors write more efficiently using AI, while preserving the uniquely human perspective that readers crave.
            </p>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Values</h3>
            <ul className="space-y-4">
              {values.map((value, i) => (
                <li key={i} className="flex items-start">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  </div>
                  <span className="text-slate-600 font-medium">
                    <strong className="text-slate-900">{value.title}:</strong> {value.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className={`${stat.bg} p-10 rounded-[3rem] space-y-2 transform hover:${stat.rotate} transition-transform`}>
              <div className="text-5xl font-black">{stat.number}</div>
              <div className="text-sm font-bold uppercase tracking-widest opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">The Team behind the Magic</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            A global group of designers, engineers, and wordsmiths working to redefine digital publishing.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {team.map((member, i) => (
            <div key={i} className="group text-center space-y-4">
              <div className="relative w-40 h-40 mx-auto rounded-[2.5rem] overflow-hidden shadow-lg group-hover:scale-105 transition-all duration-500">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-black text-xl text-slate-900">{member.name}</h4>
                <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
