import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck,
  Globe,
  GraduationCap,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getSupabase } from '../lib/supabase';

interface LoginViewProps {
  onLoginSuccess: () => void;
}

export function LoginView({ onLoginSuccess }: LoginViewProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = getSupabase();
    if (!supabase) {
      setError('Supabase is not configured.');
      setLoading(false);
      return;
    }

    try {
      if (activeTab === 'login') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
        alert('Check your email for the confirmation link!');
      }
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const socialLogins = [
    { name: 'ORCID iD', icon: <div className="w-5 h-5 rounded-full bg-[#A6CE39] flex items-center justify-center text-white font-bold text-[10px]">iD</div> },
    { name: 'Google Scholar', icon: <GraduationCap className="w-5 h-5 text-on-surface-variant" /> }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex flex-col items-center justify-center p-6 font-sans">
      {/* Logo & Title */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 ring-4 ring-white">
          <div className="relative">
            <div className="w-8 h-10 border-2 border-white rounded-sm flex flex-col gap-1.5 p-1.5">
              <div className="h-0.5 w-full bg-white rounded-full opacity-40" />
              <div className="h-0.5 w-full bg-white rounded-full" />
              <div className="h-0.5 w-full bg-white rounded-full" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-black text-on-surface tracking-tight">ThesisFlow</h1>
          <p className="text-sm text-on-surface-variant font-medium mt-1">Academic Version Control</p>
        </div>
      </div>

      {/* Auth Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-outline-variant overflow-hidden"
      >
        {/* Tabs */}
        <div className="flex border-b border-outline-variant">
          <button 
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-4 text-sm font-bold transition-all relative ${activeTab === 'login' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Log In
            {activeTab === 'login' && (
              <motion.div layoutId="authTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-4 text-sm font-bold transition-all relative ${activeTab === 'signup' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Sign Up
            {activeTab === 'signup' && (
              <motion.div layoutId="authTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
            )}
          </button>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-xs font-bold leading-tight">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Institutional Email</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="scholar@university.edu"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-outline-variant rounded-xl text-sm font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Password</label>
                <button type="button" className="text-[10px] font-bold text-primary hover:underline">Forgot?</button>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-outline-variant rounded-xl text-sm font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all group disabled:opacity-70 disabled:translate-y-0"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {activeTab === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest bg-white px-4 text-outline">
              Or continue with
            </div>
          </div>

          {/* Social Logins */}
          <div className="space-y-3">
            {socialLogins.map((provider) => (
              <button 
                key={provider.name}
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 border border-outline-variant rounded-xl text-sm font-bold text-on-surface hover:bg-surface-container-low transition-all"
              >
                {provider.icon}
                {provider.name}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Footer Links */}
      <div className="mt-8 flex items-center gap-4 text-[11px] font-medium text-on-surface-variant">
        <span>By signing in, you agree to our</span>
        <div className="flex items-center gap-4">
          <a href="#" className="text-primary hover:underline font-bold">Terms of Service</a>
          <div className="w-1 h-1 rounded-full bg-outline-variant" />
          <a href="#" className="text-primary hover:underline font-bold">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}
