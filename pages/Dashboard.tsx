
import React from 'react';
import { User, AppView } from '../types';

interface DashboardProps {
  user: User;
  onNavigate: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.name.split(' ')[0]} 👋</h1>
          <p className="text-slate-400">Here's your health overview for today.</p>
        </div>
        <button 
          onClick={() => onNavigate(AppView.CHAT)}
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> New Chat
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Chat Access', value: 'Unlimited', icon: 'fa-comments', color: 'text-cyan-400' },
          { label: 'Account Tier', value: user.plan, icon: 'fa-star', color: 'text-amber-400' },
          { label: 'Privacy Status', value: 'Encrypted', icon: 'fa-shield-halved', color: 'text-indigo-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 font-medium text-sm">{stat.label}</span>
              <i className={`fa-solid ${stat.icon} ${stat.color} text-xl opacity-80`}></i>
            </div>
            <div className="text-3xl font-black">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-[32px] border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Recent Updates</h3>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                <i className="fa-solid fa-sparkles text-cyan-400"></i>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Alisha v2.4 Live</h4>
                <p className="text-xs text-slate-500">Improved symptom analysis engine is now active.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                <i className="fa-solid fa-hospital text-indigo-400"></i>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Hospital Network Growing</h4>
                <p className="text-xs text-slate-500">50 new medical centers added to premium search.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-[32px] border border-slate-800 bg-gradient-to-br from-indigo-600/10 to-transparent relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4">Daily Health Tip</h3>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
              <p className="text-slate-200 italic text-sm">"Staying hydrated can significantly reduce the frequency of cluster headaches. Aim for 8-10 glasses of water daily."</p>
            </div>
            <button onClick={() => onNavigate(AppView.CHAT)} className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl text-sm font-bold transition-all">Ask more tips</button>
          </div>
          <i className="fa-solid fa-notes-medical absolute bottom-[-20px] right-[-20px] text-8xl text-indigo-500/10"></i>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
