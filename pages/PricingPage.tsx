
import React, { useState } from 'react';
import { AppView } from '../types';

interface PricingPageProps {
  onNavigate: (view: AppView) => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    { 
      q: 'Is this medical advice?', 
      a: 'ALISHA provides AI-assisted healthcare information and guidance based on medical databases. It is not a replacement for professional clinical diagnosis. Always consult with a qualified physician for medical emergencies.' 
    },
    { 
      q: 'Can I cancel my subscription anytime?', 
      a: 'Yes. You can manage your subscription directly from your account settings. Cancellations take effect at the end of your current billing cycle.' 
    },
    { 
      q: 'Is my health data safe and private?', 
      a: 'Security is our core priority. We use end-to-end encryption and zero-knowledge storage for all chat histories. Your data is never sold to third-party advertisers.' 
    },
    { 
      q: 'Which hospitals are included in the Premium plan?', 
      a: 'Our network covers over 5,000 verified medical facilities globally. Premium users get real-time access to departments, doctor availability, and instant booking slots.' 
    }
  ];

  const features = [
    { name: 'Daily Health Tips', free: true, premium: true },
    { name: 'Symptom Analysis', free: true, premium: true },
    { name: 'Chat History', free: '3 Days', premium: 'Unlimited' },
    { name: 'Hospital Directory', free: false, premium: true },
    { name: 'Doctor Specialization Search', free: false, premium: true },
    { name: 'Direct Appointment Booking', free: false, premium: true },
    { name: 'Priority Logic Engine', free: false, premium: true },
    { name: '24/7 Premium Concierge', free: false, premium: true },
  ];

  return (
    <div className="relative z-10 overflow-hidden">
      {/* PRICING BACKGROUND ANIMATION LAYER */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Dynamic Glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-cyan-500/10 blur-[130px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        {/* Floating Pricing/Health Icons */}
        <div className="absolute top-[20%] left-[10%] opacity-20 animate-bounce" style={{ animationDuration: '8s' }}>
          <i className="fa-solid fa-file-invoice-dollar text-7xl text-cyan-400 rotate-12"></i>
        </div>
        <div className="absolute bottom-[40%] right-[5%] opacity-15 animate-pulse" style={{ animationDuration: '5s' }}>
          <i className="fa-solid fa-shield-heart text-8xl text-indigo-400 -rotate-12"></i>
        </div>
        <div className="absolute top-[60%] left-[15%] opacity-10 animate-[spin_30s_linear_infinite]">
          <i className="fa-solid fa-circle-nodes text-[150px] text-slate-700"></i>
        </div>
        
        {/* Tech Particles */}
        <div className="absolute top-[30%] left-[45%] w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-[25%] left-[20%] w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Pricing Hero */}
      <header className="pt-44 pb-20 px-6 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
          Investment in your health
        </div>
        <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-white">Simple, Transparent <span className="text-cyan-400">Pricing</span></h1>
        <p className="text-slate-400 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
          Choose the plan that fits your healthcare needs. No hidden fees, just pure clinical intelligence.
        </p>
      </header>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-32 relative z-10">
        {/* Free Plan */}
        <div className="glass-panel p-10 md:p-14 rounded-[3.5rem] border-white/5 flex flex-col justify-between group hover:bg-slate-900/40 transition-all hover:border-white/10">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-seedling text-slate-400 text-xl"></i>
            </div>
            <h3 className="text-3xl font-bold mb-4 text-white">Free Plan</h3>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-6xl font-black text-white">$0</span>
              <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Forever</span>
            </div>
            <ul className="space-y-4 mb-12">
              <li className="flex items-center gap-3 text-slate-300">
                <i className="fa-solid fa-circle-check text-cyan-500/50"></i> AI Health Tips
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <i className="fa-solid fa-circle-check text-cyan-500/50"></i> Limited AI Chats
              </li>
              <li className="flex items-center gap-3 text-slate-500 line-through">
                <i className="fa-solid fa-circle-xmark opacity-20"></i> Hospital Information
              </li>
            </ul>
          </div>
          <button onClick={() => onNavigate(AppView.SIGNUP)} className="w-full py-5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black text-lg transition-all border border-slate-700 shadow-xl">
            Start Free
          </button>
        </div>

        {/* Premium Plan */}
        <div className="glass-panel p-10 md:p-14 rounded-[3.5rem] border-cyan-500/50 shadow-2xl shadow-cyan-500/10 flex flex-col justify-between relative overflow-hidden group scale-[1.02]">
          <div className="absolute top-8 right-8 px-5 py-2 bg-cyan-500 text-slate-900 text-xs font-black uppercase tracking-widest rounded-full shadow-lg z-20">Most Popular</div>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-50"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-8 border border-cyan-500/30 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-gem text-cyan-400 text-xl"></i>
            </div>
            <h3 className="text-3xl font-bold mb-4 text-white">Premium Plan</h3>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-6xl font-black text-cyan-400">$19</span>
              <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">/ Month</span>
            </div>
            <ul className="space-y-4 mb-12">
              <li className="flex items-center gap-3 text-slate-100 font-medium">
                <i className="fa-solid fa-circle-check text-cyan-500"></i> Hospital Details & Directory
              </li>
              <li className="flex items-center gap-3 text-slate-100 font-medium">
                <i className="fa-solid fa-circle-check text-cyan-500"></i> Doctors & Departments
              </li>
              <li className="flex items-center gap-3 text-slate-100 font-medium">
                <i className="fa-solid fa-circle-check text-cyan-500"></i> Direct Appointment Booking
              </li>
              <li className="flex items-center gap-3 text-slate-100 font-medium">
                <i className="fa-solid fa-circle-check text-cyan-500"></i> Unlimited Chat History
              </li>
            </ul>
          </div>
          <button onClick={() => onNavigate(AppView.SIGNUP)} className="w-full py-5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-2xl font-black text-lg transition-all shadow-xl shadow-cyan-500/20 transform hover:scale-[1.02] relative z-10">
            Upgrade to Premium
          </button>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-5xl mx-auto px-6 mb-32 relative z-10">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">Feature-by-Feature <span className="text-cyan-400">Comparison</span></h2>
        <div className="glass-panel rounded-[2.5rem] overflow-hidden border-white/5 shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5">
                <th className="p-8 text-sm font-bold uppercase tracking-widest text-slate-400">Feature</th>
                <th className="p-8 text-sm font-bold uppercase tracking-widest text-slate-400 text-center">Free</th>
                <th className="p-8 text-sm font-bold uppercase tracking-widest text-cyan-400 text-center">Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {features.map((f, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-8 font-medium text-slate-200">{f.name}</td>
                  <td className="p-8 text-center">
                    {typeof f.free === 'boolean' ? (
                      f.free ? <i className="fa-solid fa-check text-slate-500"></i> : <i className="fa-solid fa-minus text-slate-800"></i>
                    ) : <span className="text-xs font-bold text-slate-500">{f.free}</span>}
                  </td>
                  <td className="p-8 text-center">
                    {typeof f.premium === 'boolean' ? (
                      f.premium ? <i className="fa-solid fa-check text-cyan-400"></i> : <i className="fa-solid fa-minus text-slate-800"></i>
                    ) : <span className="text-xs font-bold text-cyan-400">{f.premium}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="max-w-4xl mx-auto px-6 pb-40 relative z-10">
        <h2 className="text-4xl font-black mb-16 text-center tracking-tighter text-white">Frequently Asked <span className="text-cyan-400">Questions</span></h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-panel rounded-3xl border-white/5 overflow-hidden">
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full p-8 text-left flex items-center justify-between hover:bg-white/[0.02] transition-all"
              >
                <span className="text-xl font-bold text-slate-100">{faq.q}</span>
                <i className={`fa-solid fa-chevron-down text-slate-500 transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-cyan-400' : ''}`}></i>
              </button>
              <div className={`px-8 transition-all duration-300 overflow-hidden ${activeFaq === i ? 'max-h-96 pb-8' : 'max-h-0'}`}>
                <p className="text-slate-400 text-lg leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
         <div className="glass-panel p-16 rounded-[4rem] border-slate-800 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white relative z-10">Take control of your health today.</h2>
            <p className="text-slate-400 text-xl mb-10 max-w-xl mx-auto relative z-10">No credit card required to start your free session.</p>
            <button 
              onClick={() => onNavigate(AppView.SIGNUP)}
              className="px-12 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-2xl font-black text-xl shadow-2xl shadow-cyan-500/20 relative z-10"
            >
              Start for Free
            </button>
         </div>
      </section>
    </div>
  );
};

export default PricingPage;
