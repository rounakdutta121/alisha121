
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, onLogout }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: 'fa-chart-pie' },
    { id: AppView.CHAT, label: 'Chat', icon: 'fa-comment-medical' },
    { id: AppView.HISTORY, label: 'History', icon: 'fa-clock-rotate-left' },
    { id: AppView.PLANS, label: 'Plans', icon: 'fa-credit-card' },
    { id: AppView.PROFILE, label: 'Profile', icon: 'fa-user' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-slate-800 flex-col glass-panel sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <i className="fa-solid fa-stethoscope text-white text-xl"></i>
          </div>
          <span className="text-xl font-bold tracking-tight">ALISHA <span className="text-cyan-400">AI</span></span>
        </div>

        <nav className="flex-1 px-3 mt-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${currentView === item.id
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
            >
              <i className={`fa-solid ${item.icon} w-6 text-center text-lg`}></i>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors duration-200"
          >
            <i className="fa-solid fa-right-from-bracket w-6 text-center text-lg"></i>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#020408]/95 backdrop-blur-xl border-t border-white/5 z-50 px-6 py-3 pb-safe">
        <div className="flex justify-between items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 transition-all duration-200 ${currentView === item.id
                  ? 'text-cyan-400 transform -translate-y-1'
                  : 'text-slate-500 hover:text-slate-300'
                }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentView === item.id ? 'bg-cyan-500/10' : ''}`}>
                <i className={`fa-solid ${item.icon} text-lg`}></i>
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
