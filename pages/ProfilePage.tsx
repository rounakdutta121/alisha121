
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { supabase } from '../supabase';

interface ProfilePageProps {
  user: User;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout }) => {
  const [displayName, setDisplayName] = useState(user.name);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to get a signed URL for a given path
  const getSignedAvatarUrl = async (path: string) => {
    try {
      // If the path is already a full http URL (e.g. initial placeholder), return as is
      if (path.startsWith('http')) return path;
      
      const { data, error } = await supabase.storage
        .from('avatars')
        .createSignedUrl(path, 3600); // 1 hour expiry

      if (error) throw error;
      return data?.signedUrl || user.avatar;
    } catch (err) {
      console.error('Error generating signed URL:', err);
      return user.avatar;
    }
  };

  // Fetch latest profile data from Supabase on mount
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        if (data) {
          if (data.full_name) setDisplayName(data.full_name);
          if (data.avatar_url) {
            const signed = await getSignedAvatarUrl(data.avatar_url);
            setAvatarUrl(signed);
          }
        }
      } catch (err) {
        console.error('Error loading profile:', err);
      }
    };

    getProfile();
  }, [user.id, user.avatar]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setMessage(null);

      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      // 1. Upload image to Private Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // 2. Update profiles table with the PATH, not the public URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: filePath })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // 3. Generate a signed URL for immediate preview
      const signed = await getSignedAvatarUrl(filePath);
      setAvatarUrl(signed);
      
      setMessage({ type: 'success', text: 'Avatar uploaded and secured successfully!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Error uploading avatar' });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveChanges = async () => {
    const trimmedName = displayName.trim();
    if (trimmedName.length < 2) {
      setMessage({ type: 'error', text: 'Name must be at least 2 characters long' });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const { error } = await supabase
        .from('profiles')
        .update({ 
          full_name: trimmedName
        })
        .eq('id', user.id);

      if (error) throw error;
      setMessage({ type: 'success', text: 'Profile information updated successfully!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Error saving changes' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header>
        <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
        <p className="text-slate-400">Manage your clinical profile and secure identity.</p>
      </header>

      {message && (
        <div className={`p-4 rounded-2xl border animate-in fade-in slide-in-from-top-2 duration-300 ${
          message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          <div className="flex items-center gap-3">
            <i className={`fa-solid ${message.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
            <p className="text-sm font-bold uppercase tracking-wider">{message.text}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="glass-panel p-8 rounded-[40px] border border-slate-800 flex flex-col items-center text-center relative overflow-hidden">
            <div className="relative mb-6 group cursor-pointer" onClick={handleAvatarClick}>
              <img 
                src={avatarUrl} 
                className={`w-32 h-32 rounded-[40px] object-cover border-4 border-slate-800 shadow-2xl transition-all ${uploading ? 'opacity-50 blur-sm' : 'group-hover:scale-105'}`} 
                alt="Avatar" 
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-[40px]">
                 <i className="fa-solid fa-cloud-arrow-up text-white text-2xl"></i>
              </div>
              <button className="absolute bottom-2 right-2 w-10 h-10 rounded-2xl bg-cyan-500 text-slate-900 flex items-center justify-center border-4 border-[#05070a] shadow-lg">
                {uploading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-camera"></i>}
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/png, image/jpeg, image/webp" 
                onChange={handleFileUpload}
              />
            </div>
            <h3 className="text-2xl font-bold text-white">{displayName || user.name}</h3>
            <p className="text-slate-500 mb-6">{user.email}</p>
            <div className="px-4 py-1.5 bg-slate-800 rounded-full text-xs font-bold text-cyan-400 border border-cyan-500/20">
              {user.plan} Plan
            </div>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-600 font-black uppercase tracking-widest">
              <i className="fa-solid fa-shield-halved text-cyan-500/30"></i>
              Private Storage
            </div>
          </div>
          
          <button 
            onClick={onLogout}
            className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl font-bold border border-red-500/20 transition-all"
          >
            Sign Out
          </button>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div className="glass-panel p-8 rounded-[40px] border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white">Personal Information</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-500">Display Name</label>
                <input 
                  type="text" 
                  value={displayName} 
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-500">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    defaultValue={user.email} 
                    disabled
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-3 text-slate-500 cursor-not-allowed focus:outline-none" 
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <i className="fa-solid fa-lock text-slate-700"></i>
                  </div>
                </div>
                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest px-1">Email cannot be changed directly</p>
              </div>
            </div>
            <button 
              onClick={handleSaveChanges}
              disabled={loading || uploading}
              className="px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-2xl font-bold transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <i className="fa-solid fa-circle-notch fa-spin"></i> Saving...
                </span>
              ) : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
