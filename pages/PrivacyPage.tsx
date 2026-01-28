
import React from 'react';
import { AppView } from '../types';

interface PrivacyPageProps {
  onNavigate: (view: AppView) => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  const sections = [
    {
      title: "1. Information We Collect",
      items: [
        "Account Information: Name, email address, and authentication credentials.",
        "Chat Interactions: Text transcripts of your conversations with Alisha to provide continuity and improve guidance.",
        "Usage Data: Log files, device information, and IP addresses for security and performance monitoring."
      ]
    },
    {
      title: "2. How We Use Your Information",
      items: [
        "To provide and improve AI-assisted healthcare guidance tailored to your specific queries.",
        "To personalize your experience and maintain your clinical chat history.",
        "To monitor for system performance and ensure the technical integrity of our platform."
      ]
    },
    {
      title: "3. Data Security",
      items: [
        "Industry-standard AES-256 encryption for data at rest.",
        "TLS 1.3 encryption for all data in transit.",
        "Zero-knowledge storage protocols for sensitive health logs where applicable."
      ]
    },
    {
      title: "4. AI & Healthcare Disclaimer",
      items: [
        "ALISHA is an AI assistant, not a licensed medical professional.",
        "The information provided is for guidance and educational purposes only.",
        "Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition."
      ]
    },
    {
      title: "5. Third-Party Services",
      items: [
        "Stripe: For secure payment processing and subscription management.",
        "Cloud Infrastructure: We utilize enterprise-grade, encrypted cloud environments to host our AI models and databases.",
        "Google Analytics: For anonymized tracking of website traffic and user behavior."
      ]
    },
    {
      title: "6. User Rights",
      items: [
        "Access: You may request a copy of the data we hold about you at any time.",
        "Deletion: You have the 'right to be forgotten' and can request full account and data erasure.",
        "Transparency: We are committed to informing you about any changes to how your data is processed."
      ]
    }
  ];

  return (
    <div className="relative z-10 min-h-screen overflow-hidden">
      {/* PRIVACY BACKGROUND ANIMATION LAYER */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Soft Violet and Teal Glows */}
        <div className="absolute top-[5%] left-[10%] w-[600px] h-[600px] bg-indigo-500/10 blur-[130px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>

        {/* Floating Privacy & Trust Icons */}
        <div className="absolute top-[25%] right-[15%] opacity-10 animate-bounce" style={{ animationDuration: '10s' }}>
          <i className="fa-solid fa-shield-halved text-8xl text-indigo-400 rotate-12"></i>
        </div>
        <div className="absolute bottom-[30%] left-[8%] opacity-15 animate-pulse" style={{ animationDuration: '6s' }}>
          <i className="fa-solid fa-user-shield text-7xl text-cyan-400 -rotate-12"></i>
        </div>
        <div className="absolute top-[50%] right-[5%] opacity-5 animate-[spin_40s_linear_infinite]">
          <i className="fa-solid fa-fingerprint text-[180px] text-slate-600"></i>
        </div>

        {/* Floating Data Nodes */}
        <div className="absolute top-[15%] left-[40%] w-2 h-2 bg-indigo-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-[40%] left-[60%] w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Header */}
      <header className="pt-44 pb-20 px-6 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-sm">
          Trust & Ethics
        </div>
        <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-white">Privacy <span className="text-cyan-400">Policy</span></h1>
        <p className="text-slate-400 text-xl md:text-2xl max-w-2xl mx-auto font-medium">
          Your privacy matters to us. We build our systems with a security-first mindset to protect your most sensitive data.
        </p>
      </header>

      {/* Policy Content */}
      <section className="max-w-4xl mx-auto px-6 pb-32 relative z-10">
        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i} className="glass-panel p-10 rounded-[2.5rem] border-white/5 hover:border-indigo-500/30 transition-all group">
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-4 group-hover:text-cyan-400 transition-colors">
                <span className="text-cyan-500/20 text-4xl font-black">0{i + 1}</span>
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-4 text-slate-400 leading-relaxed text-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/40 mt-3 shrink-0 group-hover:bg-cyan-500 transition-colors"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Footer CTA */}
        <div className="mt-20 glass-panel p-12 rounded-[3.5rem] border-cyan-500/20 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <i className="fa-solid fa-envelope-shield text-5xl text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-500"></i>
          <h3 className="text-2xl font-bold mb-4 text-white">Contact Us for Privacy Questions</h3>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">Our dedicated data protection officer is available to answer any concerns regarding your health data privacy.</p>
          <a
            href="mailto:damnart.wp@gmail.com"
            className="inline-block px-10 py-4 bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-cyan-500/10"
          >
            damnart.wp@gmail.com
          </a>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
