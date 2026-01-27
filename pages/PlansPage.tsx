import React, { useState } from 'react';
import { User } from '../types';

interface PlansPageProps {
  user: User;
}

const PlansPage: React.FC<PlansPageProps> = ({ user }) => {
  const [upgrading, setUpgrading] = useState(false);
  const isPremium = user.plan.toLowerCase() === 'premium';

  const startCheckout = async () => {
    if (upgrading || isPremium) return;

    setUpgrading(true);
    try {
      console.log('Initiating secure checkout for:', user.email);

      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: user.email }),
      });

      // Handle non-200 responses
      if (!response.ok) {
        let errorDetail = `Status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorDetail = errorData.error || errorDetail;
        } catch (e) {
          // Response body is not JSON
        }
        throw new Error(`Checkout failed: ${errorDetail}`);
      }

      const data = await response.json();

      if (data?.url) {
        console.log('Checkout session created. Redirecting...');
        window.location.href = data.url;
      } else {
        throw new Error('The payment server did not return a valid checkout URL.');
      }
    } catch (err: any) {
      console.error('ALISHA Checkout Exception:', err);

      let friendlyMessage = "Unable to initialize secure payment. Please try again later.";

      // Specifically handle "Failed to fetch" (CORS or Network issues)
      if (err.name === 'TypeError' || err.message.includes('fetch')) {
        friendlyMessage = "Network Error: The payment server is unreachable or the request was blocked. Please check your connection and try again.";
      } else if (err.message) {
        friendlyMessage = err.message;
      }

      alert(friendlyMessage);
      setUpgrading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-white">Plans & Subscription</h1>
        <p className="text-slate-400">Manage your subscription and billing information.</p>
      </header>

      {/* Current Plan Card */}
      <div className={`glass-panel p-10 rounded-[40px] border relative overflow-hidden shadow-2xl transition-all duration-500 ${isPremium ? 'border-cyan-500/30 shadow-cyan-500/10' : 'border-slate-800'}`}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className={`inline-block px-3 py-1 border text-xs font-black rounded-full uppercase tracking-widest mb-4 ${isPremium ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
              Current Plan
            </div>
            <h2 className="text-4xl font-black mb-2 text-white">{user.plan} Plan</h2>
            <p className="text-slate-400">
              {isPremium ? 'Your plan is active and managed via Stripe' : 'Free access to essential healthcare tools'}
            </p>
            <ul className="mt-8 space-y-3">
              <li className="flex items-center gap-2 text-slate-300">
                <i className="fa-solid fa-check text-cyan-400"></i>
                Access to basic AI health tips
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <i className="fa-solid fa-check text-cyan-400"></i>
                30-day chat history
              </li>
              {isPremium && (
                <>
                  <li className="flex items-center gap-2 text-slate-300">
                    <i className="fa-solid fa-check text-cyan-400"></i>
                    Hospital Directory & Slots
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <i className="fa-solid fa-check text-cyan-400"></i>
                    Priority Medical Engine
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            {!isPremium && (
              <button
                onClick={startCheckout}
                disabled={upgrading}
                className="px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-2xl font-black shadow-xl shadow-cyan-500/30 transition-all transform hover:scale-105 active:scale-95 text-lg disabled:opacity-50 flex items-center justify-center gap-3 min-w-[240px]"
              >
                {upgrading ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                    Securing Session...
                  </>
                ) : (
                  'Upgrade to Premium'
                )}
              </button>
            )}
          </div>
        </div>
        <i className={`fa-solid absolute bottom-[-40px] right-[-40px] text-[200px] rotate-12 transition-colors duration-700 ${isPremium ? 'fa-gem text-cyan-500/5' : 'fa-seedling text-slate-500/5'}`}></i>
      </div>

      <div className="p-8 rounded-[32px] border border-slate-800 bg-slate-900/20 flex items-center justify-between">
        <div className="flex items-center gap-4 text-slate-400">
          <i className="fa-solid fa-shield-check text-2xl text-cyan-500/50"></i>
          <div>
            <p className="text-sm font-bold text-slate-300 uppercase tracking-widest">Billing Security</p>
            <p className="text-xs">Your data is processed using enterprise-grade encryption standards handled by Stripe.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 opacity-40">
          <i className="fa-brands fa-stripe text-4xl text-white"></i>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;