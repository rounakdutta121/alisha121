
import React from 'react';
import { AppView } from '../types';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="py-16 px-6 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center glow-cyan">
              <i className="fa-solid fa-stethoscope text-white text-sm"></i>
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">ALISHA AI</span>
          </div>
          <p className="text-slate-500 text-sm max-w-xs text-center md:text-left">
            Building the future of patient-centric artificial intelligence for the global healthcare community.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-12 text-sm text-slate-400 font-bold uppercase tracking-widest">
          <button onClick={() => onNavigate(AppView.FEATURES)} className="hover:text-cyan-400 transition-colors">Features</button>
          <button onClick={() => onNavigate(AppView.PRICING)} className="hover:text-cyan-400 transition-colors">Pricing</button>
          <button onClick={() => onNavigate(AppView.PRIVACY)} className="hover:text-cyan-400 transition-colors">Privacy Policy</button>
        </div>
        <p className="text-xs text-slate-600 font-bold">© 2024 ALISHA SYSTEMS INC. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
};

export default Footer;
