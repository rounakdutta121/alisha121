
import React, { useState, useEffect } from 'react';
import { AppView, User } from './types';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import PrivacyPage from './pages/PrivacyPage';
import FeaturesPage from './pages/FeaturesPage';
import AuthPages from './pages/AuthPages';
import Dashboard from './pages/Dashboard';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';
import PlansPage from './pages/PlansPage';
import ProfilePage from './pages/ProfilePage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import { supabase } from './supabase';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    // Check for payment success in URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      setPaymentSuccess(true);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) fetchProfile(session.user.id, session.user.email!);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchProfile(session.user.id, session.user.email!);
      } else {
        setUser(null);
        setCurrentView(AppView.LANDING);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (id: string, email: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (data) {
      setUser({
        id: data.id,
        name: data.full_name || 'User',
        email: email,
        plan: data.plan || 'Free',
        avatar: `https://picsum.photos/seed/${id}/200/200`
      });
    } else if (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const navigate = (view: AppView) => {
    const isProtected = [AppView.DASHBOARD, AppView.CHAT, AppView.HISTORY, AppView.PLANS, AppView.PROFILE].includes(view);
    if (isProtected && !user) {
      setCurrentView(AppView.LOGIN);
    } else {
      setCurrentView(view);
    }
    window.scrollTo(0, 0);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) return <div className="min-h-screen bg-[#020408] flex items-center justify-center text-cyan-400">Loading ALISHA...</div>;

  const isAuthView = currentView === AppView.LOGIN || currentView === AppView.SIGNUP;
  const isDashboardView = [AppView.DASHBOARD, AppView.CHAT, AppView.HISTORY, AppView.PLANS, AppView.PROFILE].includes(currentView);

  const renderContent = () => {
    switch (currentView) {
      case AppView.LANDING: return <LandingPage onNavigate={navigate} />;
      case AppView.PRICING: return <PricingPage onNavigate={navigate} />;
      case AppView.PRIVACY: return <PrivacyPage onNavigate={navigate} />;
      case AppView.FEATURES: return <FeaturesPage onNavigate={navigate} />;
      case AppView.LOGIN:
      case AppView.SIGNUP:
        return <AuthPages type={currentView} onNavigate={navigate} onAuthSuccess={() => navigate(AppView.DASHBOARD)} />;
      default: return null;
    }
  };

  if (isAuthView) return <div className="antialiased text-slate-200">{renderContent()}</div>;

  if (isDashboardView && user) {
    return (
      <div className="antialiased text-slate-200 flex min-h-screen bg-[#05070a]">
        <Sidebar currentView={currentView} onNavigate={navigate} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto p-4 pb-24 md:p-8">
          {paymentSuccess && (
            <div className="mb-6 p-4 glass-panel border-green-500/50 bg-green-500/10 text-green-400 rounded-2xl flex items-center justify-between animate-in fade-in slide-in-from-top-4">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-circle-check text-xl"></i>
                <div>
                  <p className="font-bold">Payment Successful!</p>
                  <p className="text-xs opacity-80">Welcome to Alisha Premium. All advanced features are now unlocked.</p>
                </div>
              </div>
              <button onClick={() => setPaymentSuccess(false)} className="text-white/40 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
            </div>
          )}
          {currentView === AppView.DASHBOARD && <Dashboard user={user} onNavigate={navigate} />}
          {currentView === AppView.CHAT && <ChatPage user={user} />}
          {currentView === AppView.HISTORY && <HistoryPage onNavigate={navigate} />}
          {currentView === AppView.PLANS && <PlansPage user={user} />}
          {currentView === AppView.PROFILE && <ProfilePage user={user} onLogout={handleLogout} />}
        </main>
      </div>
    );
  }

  return (
    <div className="antialiased text-slate-200 min-h-screen flex flex-col">
      <Header currentView={currentView} onNavigate={navigate} />
      <main className="flex-grow">{renderContent()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;
