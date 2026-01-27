
import React, { useEffect, useState } from 'react';
import { AppView, ChatThread } from '../types';
import { supabase } from '../supabase';

interface HistoryPageProps {
  onNavigate: (view: AppView) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ onNavigate }) => {
  const [history, setHistory] = useState<ChatThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Fetch chats belonging to this user
        const { data, error } = await supabase
          .from('chats')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setHistory(data);
      }
    } catch (err) {
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteChat = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const { error } = await supabase.from('chats').delete().eq('id', id);
      if (!error) {
        setHistory(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error('Error deleting chat:', err);
    }
  };

  const filteredHistory = history.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto min-h-[60vh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Chat History</h1>
          <p className="text-slate-400">Review your past conversations with Alisha.</p>
        </div>
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input 
            type="text" 
            placeholder="Search chats..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-2 focus:outline-none focus:border-cyan-500/50 w-full md:w-64"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredHistory.length > 0 ? (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onNavigate(AppView.CHAT)}
              className="glass-panel p-6 rounded-[28px] border border-slate-800 hover:border-cyan-500/30 transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center group-hover:bg-cyan-500 transition-all">
                    <i className="fa-solid fa-message text-cyan-400 group-hover:text-slate-900 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                    <p className="text-slate-500 text-sm mb-2">
                      {new Date(item.created_at).toLocaleDateString(undefined, { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={(e) => deleteChat(item.id, e)}
                  className="p-2 text-slate-700 hover:text-red-400 transition-colors"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel p-20 rounded-[40px] border border-slate-800 text-center">
          <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-slate-800">
            <i className="fa-solid fa-ghost text-4xl text-slate-700"></i>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No chat history</h2>
          <p className="text-slate-500 mb-8 max-w-sm mx-auto">
            You haven't started any conversations with Alisha yet. Start a new chat to see it here.
          </p>
          <button 
            onClick={() => onNavigate(AppView.CHAT)}
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-xl font-bold transition-all"
          >
            Start First Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
