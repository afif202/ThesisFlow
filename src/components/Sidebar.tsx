import React from 'react';
import { 
  Book, 
  LayoutDashboard,
  BrainCircuit,
  History, 
  Settings, 
  Plus,
  GitCommit,
  Info,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { motion } from 'motion/react';

type View = 'login' | 'landing' | 'overview' | 'repo-list' | 'repo-detail' | 'repo-settings' | 'create-repo' | 'code' | 'diff' | 'ai' | 'repo-classification' | 'repo-insights' | 'history' | 'settings' | 'admin-clearance';

interface SidebarProps {
  activeView: View;
  onNavigate: (view: View) => void;
  onCreateCommit?: () => void;
  onSubmitThesis?: () => void;
  isLoggedIn?: boolean;
  isLocked?: boolean;
  userRole?: 'student' | 'supervisor';
  onSignOut?: () => void;
}

export function Sidebar({ activeView, onNavigate, onCreateCommit, onSubmitThesis, isLoggedIn, isLocked, userRole, onSignOut }: SidebarProps) {
  const isRepoView = ['repo-detail', 'repo-settings', 'code', 'diff', 'ai', 'repo-classification', 'repo-insights', 'history'].includes(activeView);

  const mainNavItems: { icon: any, label: string, view: View }[] = [
    { icon: LayoutDashboard, label: 'Overview', view: 'overview' as View },
    ...(userRole === 'supervisor' ? [
      { icon: ShieldCheck, label: 'Clearance', view: 'admin-clearance' as View }
    ] : [
      { icon: Book, label: 'Repositories', view: 'repo-list' as View },
    ]),
    { icon: BrainCircuit, label: 'AI Insights', view: 'ai' as View },
    { icon: History, label: 'Timeline', view: 'history' as View },
    { icon: Settings, label: 'Settings', view: 'settings' as View },
  ];

  const repoNavItems: { icon: any, label: string, view: View }[] = [
    { icon: Book, label: 'Code', view: 'repo-detail' },
    { icon: GitCommit, label: 'Commits', view: 'history' },
    { icon: BrainCircuit, label: 'Classification', view: 'repo-classification' },
    { icon: Info, label: 'Insights', view: 'repo-insights' },
    { icon: Settings, label: 'Settings', view: 'repo-settings' },
  ];

  return (
    <aside className="w-64 border-r border-outline-variant bg-[#f8f9fc] fixed left-0 top-14 bottom-0 z-40 hidden md:flex flex-col p-0 font-sans">
      {!isRepoView ? (
        <>
          {/* User Profile Section */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-surface-container-highest overflow-hidden border border-outline-variant shadow-sm ring-4 ring-primary/5">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-bold text-on-surface leading-tight">Jane Smith</h3>
              <p className="text-[10px] text-on-surface-variant font-bold">{userRole === 'supervisor' ? 'Admin Prodi' : 'Ph.D. Candidate'}</p>
            </div>
          </div>

          <nav className="mt-4 px-3 flex-1 space-y-0.5">
            {mainNavItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.view)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all group ${
                  activeView === item.view 
                    ? 'bg-primary/5 text-primary' 
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-4.5 h-4.5 transition-colors ${activeView === item.view ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'}`} />
                  <span className={`text-[13px] font-semibold tracking-tight transition-colors ${activeView === item.view ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'}`}>{item.label}</span>
                </div>
                {activeView === item.view && (
                  <motion.div 
                    layoutId="activeBar"
                    className="w-1 h-4 bg-primary rounded-full" 
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="p-6">
            {userRole !== 'supervisor' && (
              <button 
                onClick={onSubmitThesis}
                disabled={isLocked}
                className={`w-full bg-primary text-white py-2.5 rounded-lg text-xs font-bold shadow-[0_4px_12px_rgba(0,81,174,0.25)] transition-all outline-none flex items-center justify-center gap-2 tracking-wide text-center ${
                  isLocked 
                    ? 'opacity-50 cursor-not-allowed grayscale' 
                    : 'hover:shadow-[0_6px_16px_rgba(0,81,174,0.35)] hover:-translate-y-0.5 active:translate-y-0'
                }`}
              >
                {isLocked ? 'THESIS SUBMITTED' : 'SUBMIT THESIS'}
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Repo Header Section */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white border border-outline-variant shadow-sm flex items-center justify-center">
              <Book className="w-5 h-5 text-on-surface-variant" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-bold text-on-surface">Thesis Repository</h3>
              <p className="text-[10px] text-on-surface-variant font-medium">v2.4.0-alpha</p>
            </div>
          </div>

          <nav className="mt-2 px-3 flex-1 space-y-0.5">
            {repoNavItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.view)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all group ${
                  activeView === item.view 
                    ? 'bg-primary/5 text-primary border border-primary/10 shadow-sm' 
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-4 h-4 transition-colors ${activeView === item.view ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'}`} />
                  <span className={`text-[13px] font-bold tracking-tight transition-colors ${activeView === item.view ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'}`}>{item.label}</span>
                </div>
                {activeView === item.view && (
                  <motion.div 
                    layoutId="activeBarRepo"
                    className="w-1 h-3 bg-primary rounded-full" 
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="p-6 space-y-3">
            <div className="space-y-1.5 pt-4 border-t border-outline-variant">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface transition-colors">
                <Book className="w-4 h-4" />
                <span className="text-xs font-bold">Documentation</span>
              </button>
              <button 
                onClick={onSignOut}
                className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-xs font-bold">Log Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
