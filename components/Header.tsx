
import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: AppView.FEATURES, label: 'Features' },
    { id: AppView.PRICING, label: 'Pricing' },
    { id: AppView.PRIVACY, label: 'Privacy' },
  ];

  const handleMobileNavigate = (view: AppView) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate(AppView.LANDING)}>
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center glow-cyan">
            <i className="fa-solid fa-stethoscope text-white text-sm"></i>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">ALISHA <span className="text-cyan-400">AI</span></span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative py-1 transition-all duration-300 ${currentView === item.id
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

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => onNavigate(AppView.LOGIN)} className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Log in</button>
          <button
            onClick={() => onNavigate(AppView.SIGNUP)}
            className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-full text-sm font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-cyan-500/40"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#020408] border-b border-white/5 shadow-2xl animate-in slide-in-from-top-5">
          <div className="flex flex-col p-6 gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMobileNavigate(item.id)}
                className={`text-left py-3 px-4 rounded-xl font-medium ${currentView === item.id
                    ? 'bg-cyan-500/10 text-cyan-400'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
              >
                {item.label}
              </button>
            ))}
            <div className="h-px bg-white/5 my-2"></div>
            <button
              onClick={() => handleMobileNavigate(AppView.LOGIN)}
              className="text-left py-3 px-4 rounded-xl font-medium text-slate-400 hover:bg-white/5 hover:text-white"
            >
              Log in
            </button>
            <button
              onClick={() => handleMobileNavigate(AppView.SIGNUP)}
              className="py-3 px-4 bg-cyan-500 text-slate-900 rounded-xl font-bold text-center shadow-lg shadow-cyan-500/20"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
