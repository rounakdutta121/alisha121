
import React, { useState, useEffect, useRef } from 'react';
import { User, ChatMessage, ChatThread } from '../types';
import { supabase } from '../supabase';

interface ChatPageProps {
  user: User;
}

interface UiItem {
  label: string;
  action: string;
}

interface ApiResponse {
  message: string;
  ui?: {
    type: 'text' | 'cards' | 'buttons' | 'alert' | 'premium';
    items: UiItem[];
  };
}

const ChatPage: React.FC<ChatPageProps> = ({ user }) => {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loadingThreads, setLoadingThreads] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState('');
  const [creating, setCreating] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Session ID for n8n continuity
  const getSessionId = () => {
    const storageKey = `alisha_session_${user.id}`;
    let sid = localStorage.getItem(storageKey);
    if (!sid) {
      sid = crypto.randomUUID();
      localStorage.setItem(storageKey, sid);
    }
    return sid;
  };

  // Fetch true profile state to check for null avatar_url
  useEffect(() => {
    const fetchLatestAvatar = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user.id)
        .single();

      if (!error && data?.avatar_url) {
        // If it's a path in storage, get a signed URL
        if (!data.avatar_url.startsWith('http')) {
          const { data: signedData } = await supabase.storage
            .from('avatars')
            .createSignedUrl(data.avatar_url, 3600);
          setUserAvatar(signedData?.signedUrl || null);
        } else {
          setUserAvatar(data.avatar_url);
        }
      } else {
        setUserAvatar(null);
      }
    };
    fetchLatestAvatar();
  }, [user.id]);

  useEffect(() => {
    fetchThreads();
  }, [user.id]);

  // Load chat history when a chat is opened or switched
  useEffect(() => {
    if (activeThreadId) {
      fetchMessages(activeThreadId);
    } else {
      setMessages([]);
    }
  }, [activeThreadId]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending]);

  const fetchThreads = async () => {
    setLoadingThreads(true);
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setThreads(data || []);
    } catch (err) {
      console.error("Supabase error (fetchThreads):", err);
    } finally {
      setLoadingThreads(false);
    }
  };

  const fetchMessages = async (chatId: string) => {
    setLoadingMessages(true);
    try {
      const { data, error } = await supabase
        .from('chat-messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error("Supabase error (fetchMessages):", err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleCreateChat = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const title = newChatTitle.trim() || "New Consultation";
    setCreating(true);
    try {
      const { data, error } = await supabase
        .from('chats')
        .insert([{ user_id: user.id, title: title, created_at: new Date().toISOString() }])
        .select()
        .single();
      if (error) throw error;
      if (data) {
        setThreads(prev => [data, ...prev]);
        setActiveThreadId(data.id);
        setShowModal(false);
        setNewChatTitle('');
      }
    } catch (err) {
      console.error("Supabase error (handleCreateChat):", err);
    } finally {
      setCreating(false);
    }
  };

  const sendMessage = async (text: string, clickedAction: string | null = null) => {
    const rawContent = text.trim() || clickedAction;
    if (!rawContent || !activeThreadId || sending) return;

    // 1. SAVE USER MESSAGE BEFORE WEBHOOK
    const { data: userMsg, error: userMsgErr } = await supabase
      .from('chat-messages')
      .insert({
        chat_id: activeThreadId,
        user_id: user.id,
        role: 'user',
        content: text.trim() || clickedAction || ""
      })
      .select()
      .single();

    if (userMsgErr) {
      console.error("Supabase error (Save User Msg):", userMsgErr);
      return;
    }

    // 2. SHOW MESSAGE ON SCREEN IMMEDIATELY
    if (userMsg) {
      setMessages(prev => [...prev, userMsg]);
    }

    setInput('');
    setSending(true);

    try {
      const webhookBase = user.plan.toLowerCase() === 'premium'
        ? "https://damnart-ai-guladab.n8n-wsk.com/webhook/alisha-premium"
        : "https://damnart-ai-guladab.n8n-wsk.com/webhook/alisha-free";

      const url = new URL(webhookBase);
      url.searchParams.append('message', text.trim() || "");
      url.searchParams.append('clickedAction', clickedAction || "null");
      url.searchParams.append('sessionId', getSessionId());

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        mode: 'cors'
      });

      if (!response.ok) throw new Error(`API Status: ${response.status}`);

      const responseData: ApiResponse = await response.json();
      const assistantContent = JSON.stringify(responseData);

      // 4. SAVE ASSISTANT RESPONSE AFTER WEBHOOK
      const { data: aiMsg, error: aiMsgErr } = await supabase
        .from('chat-messages')
        .insert({
          chat_id: activeThreadId,
          user_id: user.id,
          role: 'assistant',
          content: assistantContent
        })
        .select()
        .single();

      if (aiMsgErr) {
        console.error("Supabase error (Save AI Msg):", aiMsgErr);
      } else if (aiMsg) {
        setMessages(prev => [...prev, aiMsg]);
      }

    } catch (err) {
      console.error("Chat flow error:", err);
      setMessages(prev => [...prev, {
        id: 'err-' + Date.now(),
        role: 'assistant',
        content: JSON.stringify({ message: "Alisha is having trouble connecting to the medical server. Please try again." }),
        created_at: new Date().toISOString()
      }]);
    } finally {
      setSending(false);
    }
  };

  const renderMessageContent = (msg: ChatMessage) => {
    if (msg.role === 'user') return <p className="text-sm md:text-base">{msg.content}</p>;

    try {
      const parsed: ApiResponse = JSON.parse(msg.content);
      return (
        <div className="space-y-4">
          <p className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">{parsed.message}</p>
          {parsed.ui?.items && (
            <div className={`flex flex-wrap gap-2 mt-4 ${parsed.ui.type === 'cards' ? 'flex-col' : 'flex-row'}`}>
              {parsed.ui.items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage("", item.action)}
                  className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border ${parsed.ui?.type === 'cards'
                      ? 'bg-slate-800/40 border-white/10 hover:border-cyan-500/50 text-left w-full flex justify-between items-center group/btn'
                      : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900'
                    }`}
                >
                  <span>{item.label}</span>
                  {parsed.ui?.type === 'cards' && <i className="fa-solid fa-chevron-right opacity-30 group-hover/btn:translate-x-1 transition-transform"></i>}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    } catch {
      return <p className="text-sm md:text-base">{msg.content}</p>;
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex gap-6 max-w-7xl mx-auto relative z-10">
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60 animate-in fade-in duration-200">
          <div className="w-full max-w-md glass-panel p-10 rounded-[2.5rem] border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-indigo-500"></div>
            <h3 className="text-2xl font-black text-white mb-2">New Medical Log</h3>
            <p className="text-slate-400 text-sm mb-8 font-medium">Start a fresh conversation.</p>
            <form onSubmit={handleCreateChat} className="space-y-6">
              <input
                autoFocus
                value={newChatTitle}
                onChange={e => setNewChatTitle(e.target.value)}
                placeholder="e.g., General Consultation"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 focus:border-cyan-500/50 transition-all text-white outline-none font-medium"
              />
              <div className="flex gap-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold transition-all">Cancel</button>
                <button type="submit" disabled={creating || !newChatTitle.trim()} className="flex-[2] py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-2xl font-black transition-all disabled:opacity-50">
                  {creating ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Initialize'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sidebar - Chat History List */}
      <div className={`w-full md:w-72 flex flex-col gap-6 shrink-0 h-full ${activeThreadId ? 'hidden md:flex' : 'flex'}`}>
        <button onClick={() => setShowModal(true)} className="w-full py-4 px-6 glass-panel border-cyan-500/40 rounded-2xl font-black text-cyan-400 hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-3 shadow-xl group">
          <i className="fa-solid fa-plus group-hover:rotate-90 transition-transform"></i>
          <span>New Chat</span>
        </button>
        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar flex flex-col">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 px-2">Clinical Logs</div>
          {loadingThreads ? (
            <div className="flex-1 flex items-center justify-center"><i className="fa-solid fa-circle-notch fa-spin text-cyan-500"></i></div>
          ) : threads.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveThreadId(t.id)}
              className={`w-full p-4 rounded-2xl transition-all border flex items-center justify-between text-left group ${activeThreadId === t.id ? 'bg-cyan-500/10 border-cyan-500/40 text-white shadow-lg' : 'text-slate-400 border-transparent hover:bg-white/5'
                }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <i className={`fa-solid fa-notes-medical text-xs ${activeThreadId === t.id ? 'text-cyan-400' : 'text-slate-600'}`}></i>
                <span className="truncate text-sm font-medium">{t.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className={`flex-1 flex flex-col glass-panel rounded-[2.5rem] border-white/5 overflow-hidden shadow-2xl bg-slate-950/40 h-full relative ${!activeThreadId ? 'hidden md:flex' : 'flex'}`}>
        {/* Mobile Back Button Header */}
        <div className="md:hidden p-4 border-b border-white/5 flex items-center gap-3 bg-slate-900/50">
          <button onClick={() => setActiveThreadId(null)} className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <span className="font-bold text-white truncate">
            {threads.find(t => t.id === activeThreadId)?.title || 'Chat'}
          </span>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-8 p-4 md:p-8 custom-scrollbar relative">
          {!activeThreadId ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 rounded-[2rem] bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
                <i className="fa-solid fa-comment-medical text-3xl text-cyan-500"></i>
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Initialize Consultation</h3>
              <p className="text-slate-500 max-w-xs text-sm mb-8">Select or create a chat to begin your AI-guided healthcare journey.</p>
              <button onClick={() => setShowModal(true)} className="px-10 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-2xl font-black transition-all">Start New Session</button>
            </div>
          ) : (
            <>
              {messages.length === 0 && !loadingMessages && (
                <div className="text-center py-20 animate-in fade-in duration-700">
                  <p className="text-slate-600 text-sm italic">Session active. Say hello to Alisha to begin.</p>
                </div>
              )}
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-3`}>
                  <div className={`flex gap-3 md:gap-4 max-w-[95%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-2xl shrink-0 flex items-center justify-center shadow-lg border border-white/10 overflow-hidden ${msg.role === 'assistant' ? 'bg-gradient-to-tr from-cyan-500 to-indigo-600' : 'bg-slate-800'
                      }`}>
                      {msg.role === 'assistant' ? (
                        <i className="fa-solid fa-robot text-white text-xs md:text-sm"></i>
                      ) : (
                        userAvatar ? (
                          <img src={userAvatar} alt="User" className="w-full h-full object-cover" />
                        ) : (
                          <i className="fa-solid fa-user text-white text-xs md:text-sm"></i>
                        )
                      )}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className={`p-4 md:p-5 rounded-[1.5rem] shadow-xl border ${msg.role === 'user' ? 'bg-cyan-500 border-cyan-400 text-slate-950 font-semibold' : 'glass-panel border-white/5 text-slate-200'
                        }`}>
                        {renderMessageContent(msg)}
                      </div>
                      <div className={`text-[9px] font-bold text-slate-600 uppercase tracking-widest px-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* ALISHA IS TYPING INDICATOR */}
              {sending && (
                <div className="flex justify-start animate-in fade-in duration-300">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center border border-white/10 shadow-lg">
                      <i className="fa-solid fa-robot text-white text-sm"></i>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="glass-panel px-6 py-4 rounded-[1.5rem] border border-white/10 flex items-center gap-1.5 shadow-xl">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] px-2 animate-pulse">Alisha is typing...</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {loadingMessages && (
            <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-sm flex items-center justify-center z-50">
              <i className="fa-solid fa-circle-notch fa-spin text-3xl text-cyan-500"></i>
            </div>
          )}
        </div>

        {/* Chat Input Dock */}
        <div className="p-4 md:p-6 bg-slate-900/40 border-t border-white/5">
          <div className="relative flex items-center gap-2 md:gap-4 bg-slate-950/80 rounded-[28px] px-4 md:px-6 py-2.5 border border-slate-800 focus-within:border-cyan-500/50 transition-all shadow-inner">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !sending) sendMessage(input); }}
              type="text"
              placeholder={activeThreadId ? "Type message..." : "Select chat..."}
              disabled={!activeThreadId || sending}
              className="flex-1 bg-transparent py-3 md:py-4 focus:outline-none text-white text-sm md:text-base placeholder:text-slate-700 disabled:cursor-not-allowed min-w-0"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!activeThreadId || sending || !input.trim()}
              className="w-10 h-10 md:w-12 md:h-12 rounded-[1.2rem] bg-cyan-500 text-slate-950 flex items-center justify-center shadow-xl shadow-cyan-500/20 disabled:opacity-20 transition-all active:scale-90 hover:bg-cyan-400 shrink-0"
            >
              <i className="fa-solid fa-paper-plane text-lg md:text-xl"></i>
            </button>
          </div>
          <div className="mt-4 flex justify-center gap-6">
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-1.5"><i className="fa-solid fa-lock text-cyan-500/40"></i> E2E Encrypted</span>
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-1.5"><i className="fa-solid fa-shield-halved text-cyan-500/40"></i> HIPAA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
