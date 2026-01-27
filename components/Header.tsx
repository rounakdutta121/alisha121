
import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: AppView.FEATURES, label: 'Features' },
    { id: AppView.PRICING, label: 'Pricing' },
    { id: AppView.PRIVACY, label: 'Privacy' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate(AppView.LANDING)}>
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center glow-cyan">
            <i className="fa-solid fa-stethoscope text-white text-sm"></i>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">ALISHA <span className="text-cyan-400">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative py-1 transition-all duration-300 ${
                currentView === item.id 
                  ? 'text-cyan-400 font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
              {currentView === item.id && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate(AppView.LOGIN)} className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Log in</button>
          <button 
            onClick={() => onNavigate(AppView.SIGNUP)} 
            className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-full text-sm font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-cyan-500/40"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
