import React from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { motion, AnimatePresence } from 'motion/react';

type View = 'login' | 'landing' | 'overview' | 'repo-list' | 'repo-detail' | 'code' | 'diff' | 'ai' | 'history' | 'settings';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  onNavigate: (view: View) => void;
  onCreateCommit?: () => void;
  onSubmitThesis?: () => void;
  isLoggedIn?: boolean;
  isLocked?: boolean;
  userRole?: 'student' | 'supervisor';
  onSignOut?: () => void;
}

export function Layout({ children, activeView, onNavigate, onCreateCommit, onSubmitThesis, isLoggedIn, isLocked, userRole, onSignOut }: LayoutProps) {
  const isLanding = activeView === 'landing';
  const isLogin = activeView === 'login';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!isLogin && <TopNav activeView={activeView} onNavigate={onNavigate} onCreateCommit={onCreateCommit} isLoggedIn={isLoggedIn} />}
      <div className={`flex flex-1 ${!isLogin ? 'pt-14' : ''}`}>
        {!isLanding && !isLogin && <Sidebar activeView={activeView} onNavigate={onNavigate} onCreateCommit={onCreateCommit} onSubmitThesis={onSubmitThesis} isLoggedIn={isLoggedIn} isLocked={isLocked} userRole={userRole} onSignOut={onSignOut} />}
        <main className={`flex-1 ${!isLanding && !isLogin ? 'md:ml-64 p-8' : ''} transition-all duration-300`}>
          <div className={`${!isLanding && !isLogin ? 'max-w-[1280px] mx-auto w-full' : ''}`}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
