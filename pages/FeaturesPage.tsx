
import React from 'react';
import { AppView } from '../types';

interface FeaturesPageProps {
  onNavigate: (view: AppView) => void;
}

const FeaturesPage: React.FC<FeaturesPageProps> = ({ onNavigate }) => {
  return (
    <div className="relative z-10 overflow-hidden">
      {/* FEATURES PAGE BACKGROUND ANIMATION LAYER */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Dynamic Mesh Glows */}
        <div className="absolute top-[5%] left-[-10%] w-[800px] h-[800px] bg-cyan-500/5 blur-[140px] rounded-full animate-pulse"></div>
        <div className="absolute top-[40%] right-[-10%] w-[700px] h-[700px] bg-indigo-600/5 blur-[130px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-cyan-600/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '4s' }}></div>

        {/* Floating Feature Context Icons */}
        <div className="absolute top-[15%] right-[10%] opacity-10 animate-bounce" style={{ animationDuration: '12s' }}>
          <i className="fa-solid fa-microchip text-[120px] text-indigo-400 rotate-12"></i>
        </div>
        <div className="absolute top-[45%] left-[5%] opacity-15 animate-pulse" style={{ animationDuration: '7s' }}>
          <i className="fa-solid fa-stethoscope text-8xl text-cyan-400 -rotate-12"></i>
        </div>
        <div className="absolute bottom-[20%] right-[15%] opacity-10 animate-[spin_50s_linear_infinite]">
          <i className="fa-solid fa-gear text-[150px] text-slate-700"></i>
        </div>

        {/* Scanning Line Elements */}
        <div className="absolute top-[30%] left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-pulse"></div>
        <div className="absolute top-[70%] left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Page Hero */}
      <header className="pt-44 pb-24 px-6 text-center relative">
        <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
          Platform Capabilities
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white">Advanced <span className="text-cyan-400">Features</span></h1>
        <p className="text-slate-400 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
          Everything <span className="text-cyan-400 font-bold">ALISHA</span> can help you with to simplify your healthcare journey.
        </p>
      </header>

      <div className="max-w-7xl mx-auto px-6 space-y-32 pb-32 relative z-10">
        
        {/* Feature 1: AI Health Tips */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="group">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-cyan-500/10">
              <i className="fa-solid fa-lightbulb text-3xl text-cyan-400"></i>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-white group-hover:text-cyan-400 transition-colors">AI Health Tips</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Get personalized wellness advice and symptom insights instantly. Our AI models analyze current medical guidelines to provide safe, actionable tips for everyday health concerns.
            </p>
            <ul className="space-y-4">
              {['Daily hydration reminders', 'Symptom-based guidance', 'Nutrition & Lifestyle advice'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-200">
                  <i className="fa-solid fa-circle-check text-cyan-500"></i> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel p-6 rounded-[2.5rem] border-white/5 bg-slate-900/40 relative group overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="bg-slate-950/80 rounded-2xl p-6 border border-white/5 relative z-10">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                    <i className="fa-solid fa-robot text-white text-xs"></i>
                  </div>
                  <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest">Alisha Insight</span>
               </div>
               <p className="text-slate-200 italic mb-4">"Based on your report of fatigue, consider increasing your Magnesium intake. Foods like spinach, pumpkin seeds, and dark chocolate are excellent sources."</p>
               <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 w-3/4 animate-pulse"></div>
               </div>
            </div>
          </div>
        </section>

        {/* Feature 2: Hospital Information */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
          <div className="lg:order-last group">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-indigo-500/10">
              <i className="fa-solid fa-building-ngo text-3xl text-indigo-400"></i>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-white group-hover:text-indigo-400 transition-colors">Hospital Information</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Navigate the healthcare network with ease. Premium users can search for hospitals by specialty, proximity, and current facility status.
            </p>
            <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 inline-block">
               <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Premium Only</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { name: 'City General', status: 'Open', icon: 'fa-hospital', color: 'text-indigo-400' },
              { name: 'St. Mary’s Care', status: 'Busy', icon: 'fa-house-medical', color: 'text-cyan-400' },
            ].map((h, i) => (
              <div key={i} className="glass-panel p-8 rounded-3xl border-white/5 hover:border-indigo-500/30 transition-all hover:-translate-y-2 shadow-xl">
                <i className={`fa-solid ${h.icon} text-4xl ${h.color} mb-4`}></i>
                <h4 className="text-xl font-bold text-white">{h.name}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`w-2 h-2 rounded-full ${h.status === 'Open' ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`}></span>
                  <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">{h.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature 3: Departments & Doctors */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="group">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-cyan-500/10">
              <i className="fa-solid fa-user-doctor text-3xl text-cyan-400"></i>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-white group-hover:text-cyan-400 transition-colors">Departments & Doctors</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Find the right specialist for your specific needs. From Cardiology to Pediatrics, Alisha suggests the best-matched doctors based on your symptoms and location.
            </p>
            <div className="flex gap-4 items-center">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 shadow-xl" src={`https://i.pravatar.cc/100?u=${i+10}`} alt="Doctor" />
                ))}
              </div>
              <div className="text-sm font-bold text-slate-400 tracking-wide">300+ Verified Specialists</div>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Dr. Sarah Wilson', dept: 'Cardiology', rating: '4.9', icon: 'fa-heart-pulse' },
              { name: 'Dr. James Chen', dept: 'Orthopedics', rating: '4.8', icon: 'fa-bone' }
            ].map((doc, i) => (
              <div key={i} className="glass-panel p-6 rounded-3xl border-white/5 flex items-center justify-between group cursor-pointer hover:bg-slate-800/40 transition-all shadow-lg hover:border-cyan-500/30">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <i className={`fa-solid ${doc.icon} text-cyan-500`}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors text-lg">{doc.name}</h4>
                    <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">{doc.dept}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-amber-400 bg-amber-400/5 px-3 py-1 rounded-full">
                  <i className="fa-solid fa-star text-xs"></i>
                  <span className="text-sm font-black">{doc.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature 4: Appointment Booking */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
          <div className="lg:order-last group">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-indigo-500/10">
              <i className="fa-solid fa-calendar-check text-3xl text-indigo-400"></i>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-white group-hover:text-indigo-400 transition-colors">Appointment Booking</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              No more waiting on hold. Book appointments directly from the chat interface. View available slots, select your preferred time, and get instant confirmation.
            </p>
            <button 
              onClick={() => onNavigate(AppView.PRICING)}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-all shadow-xl shadow-indigo-600/20"
            >
              Unlock Booking
            </button>
          </div>
          <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 bg-slate-900/50 shadow-2xl">
             <div className="flex items-center justify-between mb-8">
                <h4 className="font-bold text-white text-xl tracking-tight">Select Date</h4>
                <div className="flex gap-2">
                   <button className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white hover:bg-indigo-500 transition-colors"><i className="fa-solid fa-chevron-left text-xs"></i></button>
                   <button className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white hover:bg-indigo-500 transition-colors"><i className="fa-solid fa-chevron-right text-xs"></i></button>
                </div>
             </div>
             <div className="grid grid-cols-7 gap-2 text-center mb-6">
                {['M','T','W','T','F','S','S'].map((d, i) => (
                  <span key={i} className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{d}</span>
                ))}
                {[...Array(28)].map((_, i) => (
                  <div key={i} className={`h-10 flex items-center justify-center rounded-xl text-xs font-black transition-all cursor-pointer ${i === 14 ? 'bg-indigo-500 text-white shadow-xl shadow-indigo-500/40' : 'text-slate-500 hover:bg-slate-800 hover:text-white'}`}>
                    {i + 1}
                  </div>
                ))}
             </div>
             <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                {['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'].map((time, i) => (
                  <button key={i} className="px-5 py-3 bg-slate-800 rounded-2xl text-xs font-bold text-slate-300 shrink-0 hover:bg-indigo-500/20 hover:text-indigo-400 transition-all border border-transparent hover:border-indigo-500/30">
                    {time}
                  </button>
                ))}
             </div>
          </div>
        </section>

        {/* Feature 5: Chat History */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="group">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-cyan-500/10">
              <i className="fa-solid fa-clock-rotate-left text-3xl text-cyan-400"></i>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-white group-hover:text-cyan-400 transition-colors">Chat History</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Keep a complete log of your health journey. Review past symptoms, guidance received, and booked appointments any time from your history dashboard.
            </p>
          </div>
          <div className="space-y-4">
             {[
               { title: 'Lower back pain query', date: 'Yesterday', icon: 'fa-person-falling' },
               { title: 'Allergy medication info', date: '3 days ago', icon: 'fa-vial' }
             ].map((chat, i) => (
               <div key={i} className="glass-panel p-6 rounded-3xl border-white/5 flex gap-4 opacity-80 hover:opacity-100 transition-all hover:bg-slate-800/20 shadow-lg">
                 <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-cyan-500 shadow-inner group-hover:scale-105 transition-transform">
                    <i className={`fa-solid ${chat.icon} text-xl`}></i>
                 </div>
                 <div>
                    <h4 className="font-bold text-white text-lg">{chat.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-black">{chat.date}</p>
                 </div>
               </div>
             ))}
          </div>
        </section>

        {/* Feature 6: Security & Privacy */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse pb-20">
          <div className="lg:order-last group">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-indigo-500/10">
              <i className="fa-solid fa-shield-halved text-3xl text-indigo-400"></i>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-white group-hover:text-indigo-400 transition-colors">Security & Privacy</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Privacy-first AI. Your health data is encrypted and never sold. We use anonymized clinical training to ensure that your identity is protected while our models improve.
            </p>
            <button 
              onClick={() => onNavigate(AppView.PRIVACY)}
              className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors flex items-center gap-2 group"
            >
              Read our Privacy Ethics <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
          <div className="relative">
             <div className="w-full h-96 bg-gradient-to-tr from-slate-900 to-indigo-900/30 rounded-[3rem] border border-white/5 flex items-center justify-center shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="relative">
                  <i className="fa-solid fa-lock text-[12rem] text-indigo-500/10 group-hover:scale-110 transition-transform duration-1000"></i>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
                  <i className="fa-solid fa-user-shield text-7xl text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></i>
                </div>
             </div>
          </div>
        </section>

      </div>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
        <div className="glass-panel p-12 md:p-20 rounded-[4rem] border-cyan-500/20 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-cyan-500/10 to-transparent opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter text-white">Ready to unlock <br /><span className="text-cyan-400">Full Access?</span></h2>
            <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">Upgrade to Premium today to access hospital directories, specialist matching, and direct appointment booking.</p>
            <button 
              onClick={() => onNavigate(AppView.PRICING)}
              className="px-16 py-6 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-3xl font-black text-2xl transition-all shadow-2xl shadow-cyan-500/40 transform hover:scale-105 active:scale-95"
            >
              Go Premium Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
