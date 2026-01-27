
export enum AppView {
  LANDING = 'landing',
  PRICING = 'pricing',
  LOGIN = 'login',
  SIGNUP = 'signup',
  DASHBOARD = 'dashboard',
  CHAT = 'chat',
  HISTORY = 'history',
  PLANS = 'plans',
  PROFILE = 'profile',
  PRIVACY = 'privacy',
  FEATURES = 'features'
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'Free' | 'Premium';
  avatar: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface ChatThread {
  id: string;
  title: string;
  created_at: string;
}
