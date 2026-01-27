
import React from 'react';
import { AppView } from '../types';

interface LandingPageProps {
  onNavigate: (view: AppView) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="relative z-10">
      {/* 1. Hero Section with Enhanced Animated Background */}
      <section className="min-h-screen relative flex items-center pt-24 pb-12 px-6 overflow-hidden">
        
        {/* HERO BACKGROUND ANIMATION LAYER */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          {/* Main Pulsing Orbs */}
          <div className="absolute top-[10%] left-[-5%] w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[5%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Floating Medical Icons with different animations */}
          <div className="absolute top-[15%] left-[8%] opacity-20 animate-bounce transition-all" style={{ animationDuration: '7s' }}>
            <i className="fa-solid fa-dna text-8xl text-cyan-400 rotate-12"></i>
          </div>
          <div className="absolute top-[60%] left-[5%] opacity-15 animate-pulse" style={{ animationDuration: '4s' }}>
            <i className="fa-solid fa-heart-pulse text-6xl text-cyan-300"></i>
          </div>
          <div className="absolute bottom-[15%] right-[12%] opacity-20 animate-bounce transition-all" style={{ animationDuration: '9s', animationDelay: '1.5s' }}>
            <i className="fa-solid fa-microscope text-7xl text-indigo-400 -rotate-12"></i>
          </div>
          <div className="absolute top-[20%] right-[15%] opacity-10 animate-[spin_20s_linear_infinite]">
            <i className="fa-solid fa-virus text-[120px] text-slate-500"></i>
          </div>
          <div className="absolute bottom-[30%] left-[25%] opacity-10 animate-pulse">
             <i className="fa-solid fa-capsules text-5xl text-indigo-300 rotate-45"></i>
          </div>

          {/* Particle-like scanning elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-[20%] left-[40%] w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="absolute top-[70%] left-[60%] w-1 h-1 bg-indigo-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-[40%] left-[80%] w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10 w-full">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Precision Medical Intelligence
            </div>
            <h1 className="text-5xl md:text-8xl font-black leading-[1.1] mb-6 tracking-tighter text-white">
              Your Personal <br />
              <span className="gradient-text">AI Healthcare</span> Assistant
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed font-medium">
              Instant health tips, hospital guidance, doctors, departments, and appointments — all through one seamless AI chat experience. Powered by medical intelligence.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <button 
                onClick={() => onNavigate(AppView.SIGNUP)}
                className="w-full sm:w-auto px-10 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-2xl text-lg font-black transition-all shadow-2xl shadow-cyan-500/40 flex items-center justify-center gap-3 transform hover:-translate-y-1"
              >
                Start for Free <i className="fa-solid fa-chevron-right text-sm"></i>
              </button>
              <button 
                onClick={() => onNavigate(AppView.PRICING)}
                className="w-full sm:w-auto px-10 py-4 bg-slate-900/50 hover:bg-slate-800 text-white rounded-2xl text-lg font-bold border border-slate-700 backdrop-blur-md transition-all transform hover:-translate-y-1"
              >
                View Premium Plans
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-6 justify-center md:justify-start text-slate-500">
               <div className="flex flex-col items-center md:items-start">
                  <span className="text-2xl font-bold text-slate-300">50k+</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Active Users</span>
               </div>
               <div className="w-px h-8 bg-slate-800"></div>
               <div className="flex flex-col items-center md:items-start">
                  <span className="text-2xl font-bold text-slate-300">98%</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Satisfaction</span>
               </div>
            </div>
          </div>
          
          <div className="flex-1 relative hidden md:block float">
            <div className="relative z-10 w-full max-w-lg mx-auto">
              <div className="relative rounded-[3.5rem] overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(6,182,212,0.2)] bg-slate-900/40 backdrop-blur-xl group">
                <img 
                  src="https://yourimageshare.com/ib/geQHE494xD.png" 
                  alt="Alisha AI Assistant" 
                  className="w-full h-auto object-cover opacity-90 mix-blend-lighten transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                
                {/* HUD Elements Overlay */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 border border-cyan-500/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5 border border-indigo-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                    <span className="text-4xl font-black text-cyan-400/10 uppercase tracking-[1em] select-none">ALISHA</span>
                </div>
                
                {/* Floating UI Elements */}
                <div className="absolute top-10 right-10 p-3 glass-panel rounded-2xl border-cyan-500/30 animate-pulse shadow-cyan-500/20 shadow-lg">
                  <i className="fa-solid fa-heart-pulse text-cyan-400 text-2xl"></i>
                </div>
                <div className="absolute bottom-20 right-[-20px] p-4 glass-panel rounded-2xl border-indigo-500/30 shadow-2xl shadow-indigo-500/20">
                  <i className="fa-solid fa-calendar-check text-indigo-400 text-2xl"></i>
                </div>
                <div className="absolute bottom-12 left-10 p-4 glass-panel rounded-2xl border border-cyan-500/30 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-cyan-500 animate-ping"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Live AI Diagnostics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
           <span className="text-[10px] uppercase tracking-widest font-black">Scroll to explore</span>
           <div className="w-5 h-8 border-2 border-slate-400 rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-slate-400 rounded-full animate-bounce"></div>
           </div>
        </div>
      </section>

      {/* 2. Trust Section */}
      <section className="py-20 border-y border-white/5 bg-black/20">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mb-12">Designed to simplify healthcare decisions for everyone</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
               <i className="fa-solid fa-hospital-user text-4xl"></i>
               <i className="fa-solid fa-house-medical text-4xl"></i>
               <i className="fa-solid fa-briefcase-medical text-4xl"></i>
               <i className="fa-solid fa-clinic-medical text-4xl"></i>
               <i className="fa-solid fa-heart-circle-check text-4xl"></i>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
               <div className="flex items-center gap-4 justify-center glass-panel p-4 rounded-2xl border-slate-800">
                  <i className="fa-solid fa-shield-halved text-cyan-500"></i>
                  <span className="text-xs font-black uppercase tracking-widest">Privacy-First</span>
               </div>
               <div className="flex items-center gap-4 justify-center glass-panel p-4 rounded-2xl border-slate-800">
                  <i className="fa-solid fa-lock text-cyan-500"></i>
                  <span className="text-xs font-black uppercase tracking-widest">Secure by Design</span>
               </div>
               <div className="flex items-center gap-4 justify-center glass-panel p-4 rounded-2xl border-slate-800">
                  <i className="fa-solid fa-brain text-cyan-500"></i>
                  <span className="text-xs font-black uppercase tracking-widest">AI-Assisted Guidance</span>
               </div>
            </div>
         </div>
      </section>

      {/* 3. Problem / Solution Section */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">Healthcare is <br /><span className="text-red-500/80">Complicated.</span></h2>
            <div className="space-y-4">
              {[
                { icon: 'fa-circle-xmark', text: 'Confusing hospital navigation and departments.' },
                { icon: 'fa-circle-xmark', text: 'Struggling to find the right specialist for your symptoms.' },
                { icon: 'fa-circle-xmark', text: 'Endless wait times and booking delays.' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-slate-400">
                  <i className={`fa-solid ${item.icon} text-red-500/40`}></i>
                  <p className="text-lg font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-8 bg-cyan-500/5 p-12 rounded-[3.5rem] border border-cyan-500/10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">ALISHA is <br /><span className="text-cyan-400">Simple.</span></h2>
            <div className="space-y-6">
              {[
                { icon: 'fa-robot', title: 'Intelligent Routing', desc: 'Instantly identifies the correct department for your concerns.' },
                { icon: 'fa-user-doctor', title: 'Expert Matchmaking', desc: 'Connects you with the highest-rated doctors in your area.' },
                { icon: 'fa-calendar-check', title: 'Instant Booking', desc: 'Secure an appointment in seconds, directly from the chat.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 text-white">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                    <i className={`fa-solid ${item.icon} text-cyan-400`}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">{item.title}</h4>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Capabilities Grid */}
      <section className="py-24 px-6 bg-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter text-white">Unified <span className="text-cyan-400">Capabilities</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium">Everything you need to navigate the modern healthcare landscape in one AI hub.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'AI Health Tips', desc: 'Get instant clinical insights and wellness advice based on vast medical training data.', icon: 'fa-lightbulb' },
              { title: 'Hospital Information', desc: 'Real-time directory of verified medical facilities, their specialties, and current status.', icon: 'fa-building-ngo' },
              { title: 'Doctors & Departments', desc: 'Browse specialists across all fields with comprehensive profile data and patient reviews.', icon: 'fa-user-md' },
              { title: 'Appointment Scheduling', desc: 'Book slots directly without phone calls or complex web portals.', icon: 'fa-clock' },
              { title: 'Secure Conversations', desc: 'End-to-end encryption for your private medical history and symptom logs.', icon: 'fa-shield-halved' },
              { title: 'Priority Clinical Engine', desc: 'Premium users get advanced logic for complex diagnostic paths.', icon: 'fa-microchip' },
            ].map((f, i) => (
              <div key={i} className="glass-panel p-10 rounded-[2.5rem] hover:border-cyan-500/50 transition-all group cursor-pointer border-white/5 relative overflow-hidden">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-8 group-hover:bg-cyan-500 transition-all duration-500">
                  <i className={`fa-solid ${f.icon} text-2xl text-cyan-400 group-hover:text-slate-900`}></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium text-sm">{f.desc}</p>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How ALISHA Works */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center mb-20">
           <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter text-white">How <span className="text-cyan-400">It Works</span></h2>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
           <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-800 to-transparent -translate-y-1/2"></div>
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
              {[
                { step: '01', title: 'Ask Alisha', desc: 'Simply describe your symptoms or what you are looking for in natural language.', icon: 'fa-comment-dots' },
                { step: '02', title: 'AI Guidance', desc: 'Alisha analyzes your request and provides tailored medical insights and options.', icon: 'fa-wand-magic-sparkles' },
                { step: '03', title: 'Take Action', desc: 'Book an appointment, find a clinic, or follow guided wellness steps immediately.', icon: 'fa-calendar-check' },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center text-2xl font-black text-cyan-500 mb-8 group-hover:border-cyan-500/50 transition-all relative">
                     <i className={`fa-solid ${s.icon} absolute -top-2 -right-2 text-sm text-indigo-400 opacity-50`}></i>
                     {s.step}
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white">{s.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">{s.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 6. Comparison Section */}
      <section className="py-24 px-6 bg-cyan-950/10">
         <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="glass-panel p-12 rounded-[3rem] border-slate-800 flex flex-col justify-between">
                <div>
                   <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Free Tier</span>
                   <h3 className="text-4xl font-bold mt-2 mb-6 text-white">Essentials</h3>
                   <ul className="space-y-4 mb-12">
                      <li className="flex items-center gap-3 text-slate-400"><i className="fa-solid fa-check text-cyan-500"></i> AI Health Tips</li>
                      <li className="flex items-center gap-3 text-slate-400"><i className="fa-solid fa-check text-cyan-500"></i> Basic Symptom Mapping</li>
                      <li className="flex items-center gap-3 text-slate-400"><i className="fa-solid fa-check text-cyan-500"></i> Wellness Logs</li>
                      <li className="flex items-center gap-3 text-slate-700 line-through"><i className="fa-solid fa-xmark"></i> Hospital Booking</li>
                   </ul>
                </div>
                <button onClick={() => onNavigate(AppView.SIGNUP)} className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all">Start Free</button>
             </div>
             
             <div className="glass-panel p-12 rounded-[3rem] border-cyan-500/50 shadow-2xl shadow-cyan-500/10 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-8 right-8 px-4 py-1 bg-cyan-500 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full">Most Popular</div>
                <div>
                   <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-500">Premium Tier</span>
                   <h3 className="text-4xl font-bold mt-2 mb-6 text-white">Full Access</h3>
                   <ul className="space-y-4 mb-12">
                      <li className="flex items-center gap-3 text-slate-200"><i className="fa-solid fa-check text-cyan-500"></i> All Free Features</li>
                      <li className="flex items-center gap-3 text-slate-200"><i className="fa-solid fa-check text-cyan-500"></i> Unlimited Hospital Access</li>
                      <li className="flex items-center gap-3 text-slate-200"><i className="fa-solid fa-check text-cyan-500"></i> Doctor Search & Slots</li>
                      <li className="flex items-center gap-3 text-slate-200"><i className="fa-solid fa-check text-cyan-500"></i> Direct Appointment Booking</li>
                      <li className="flex items-center gap-3 text-slate-200"><i className="fa-solid fa-check text-cyan-500"></i> Priority Logic Engine</li>
                   </ul>
                </div>
                <button onClick={() => onNavigate(AppView.PRICING)} className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-2xl transition-all shadow-xl shadow-cyan-500/20">Upgrade Now</button>
             </div>
         </div>
      </section>

      {/* 7. Use Case Scenarios */}
      <section className="py-24 px-6">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-black mb-16 text-center tracking-tighter text-white">Real Scenarios, <span className="text-cyan-400">Instant Answers</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { q: "I have a sharp pain in my lower back, what should I do?", a: "Alisha provides immediate posture tips and checks if you need an urgent orthopedic consult.", icon: 'fa-person-falling' },
                 { q: "Which hospital has the best Pediatric Cardiology department nearby?", a: "Alisha ranks local facilities based on success rates and specialty equipment availability.", icon: 'fa-children' },
                 { q: "Book a 4:00 PM appointment with Dr. Sarah Smith.", a: "Alisha checks real-time availability and confirms your slot without you ever making a call.", icon: 'fa-calendar-plus' }
               ].map((card, i) => (
                 <div key={i} className="glass-panel p-8 rounded-[2.5rem] border-slate-800 hover:scale-[1.02] transition-all cursor-default">
                    <div className="p-4 bg-slate-900/50 rounded-2xl mb-6 italic text-slate-400 border border-white/5">
                       "{card.q}"
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center shrink-0">
                          <i className={`fa-solid ${card.icon} text-slate-900 text-sm`}></i>
                       </div>
                       <p className="text-slate-200 text-sm leading-relaxed">{card.a}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 8. Final CTA Section */}
      <section className="py-32 px-6">
         <div className="max-w-5xl mx-auto text-center glass-panel p-20 rounded-[4rem] border-cyan-500/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 to-transparent"></div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter relative z-10 text-white">Healthcare guidance <br />should be <span className="text-cyan-400">simple.</span></h2>
            <p className="text-slate-400 text-xl mb-12 relative z-10">Join thousands of patients taking control of their medical journey with Alisha.</p>
            <button 
              onClick={() => onNavigate(AppView.SIGNUP)}
              className="px-12 py-5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-3xl font-black text-2xl transition-all shadow-2xl shadow-cyan-500/40 relative z-10"
            >
              Start Your Free AI Chat
            </button>
         </div>
      </section>
    </div>
  );
};

export default LandingPage;
