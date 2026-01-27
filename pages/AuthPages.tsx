
import React, { useState } from 'react';
import { AppView } from '../types';
import { supabase } from '../supabase';

interface AuthPagesProps {
  type: AppView.LOGIN | AppView.SIGNUP;
  onNavigate: (view: AppView) => void;
  onAuthSuccess: () => void;
}

const AuthPages: React.FC<AuthPagesProps> = ({ type, onNavigate, onAuthSuccess }) => {
  const isLogin = type === AppView.LOGIN;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: { data: { full_name: fullName } }
        });
        if (error) throw error;
        
        // Note: profiles table is typically handled via a trigger in Supabase, 
        // but if not, one might insert manually here. Assuming trigger is in place.
      }
      onAuthSuccess();
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center p-6 relative overflow-hidden">
      <button onClick={() => onNavigate(AppView.LANDING)} className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full glass-panel border border-white/10 text-slate-400 hover:text-white transition-all">
        <i className="fa-solid fa-xmark text-xl"></i>
      </button>

      <div className="w-full max-w-md relative z-10">
        <div className="glass-panel p-10 rounded-[40px] border border-white/10 shadow-2xl">
          <h2 className="text-3xl font-bold mb-2 text-center">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-slate-400 text-center mb-8">{isLogin ? 'Enter your details to access Alisha.' : 'Start your journey with Alisha today.'}</p>

          {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">{error}</div>}

          <div className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                <input value={fullName} onChange={e => setFullName(e.target.value)} type="text" placeholder="John Doe" className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-3.5 focus:border-cyan-500/50 transition-all text-white" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@example.com" className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-3.5 focus:border-cyan-500/50 transition-all text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
              <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••" className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-3.5 focus:border-cyan-500/50 transition-all text-white" />
            </div>
            
            <button onClick={handleAuth} disabled={loading} className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-2xl font-bold text-lg transition-all shadow-lg disabled:opacity-50">
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </div>
          <div className="mt-8 text-center text-slate-500">
            {isLogin ? (
              <p>Don't have an account? <button onClick={() => onNavigate(AppView.SIGNUP)} className="text-cyan-400 font-bold hover:underline">Sign up</button></p>
            ) : (
              <p>Already have an account? <button onClick={() => onNavigate(AppView.LOGIN)} className="text-cyan-400 font-bold hover:underline">Sign in</button></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;
