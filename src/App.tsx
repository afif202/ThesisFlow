import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { DocumentViewer } from './components/DocumentViewer';
import { MetadataSidebar } from './components/MetadataSidebar';
import { CommitDiffViewer } from './components/CommitDiffViewer';
import { AIInsightsView } from './components/AIInsightsView';
import { CommitHistoryView } from './components/CommitHistoryView';
import { SettingsView } from './components/SettingsView';
import { LandingView } from './components/LandingView';
import { LoginView } from './components/LoginView';
import { CreateCommitModal } from './components/CreateCommitModal';
import { ThesisSubmissionModal } from './components/ThesisSubmissionModal';
import { RepositoryListView } from './components/RepositoryListView';
import { DocumentDetailView } from './components/DocumentDetailView';
import { AdminClearanceView } from './components/AdminClearanceView';
import { ChevronRight, Loader2, UserCircle2, GraduationCap } from 'lucide-react';
import { thesisService, AIInsight, Repository } from './services/thesisService';
import { motion } from 'motion/react';
import { getSupabase } from './lib/supabase';
import { CreateRepositoryView } from './components/CreateRepositoryView';
import { RepositorySettingsView } from './components/RepositorySettingsView';

const OLD_ABSTRACT = `## Abstract
This thesis explores the application of stochastic gradient descent in large-scale neural network training. 
We focus on convergence rates and hyperparameter optimization.
Traditional methods often fail to scale effectively with increasing data dimensionality.
Our approach leverages adaptive learning rates to achieve superior performance.`;

const NEW_ABSTRACT = `## Abstract
This thesis explores the application of stochastic gradient descent in modern large-scale neural network architectures. 
We specifically focus on convergence rates, hyperparameter optimization, and loss surface topology.
Traditional methods often fail to scale effectively with increasing high-dimensional datasets.
Our approach leverages dynamic adaptive learning rates to achieve superior performance across various benchmarks.`;

type View = 'login' | 'landing' | 'overview' | 'repo-list' | 'repo-detail' | 'repo-settings' | 'create-repo' | 'code' | 'diff' | 'ai' | 'repo-classification' | 'repo-insights' | 'history' | 'settings' | 'admin-clearance';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [userRole, setUserRole] = useState<'student' | 'supervisor' | null>(null);
  const [activeView, setActiveView] = useState<View>('landing');
  const [selectedRepoId, setSelectedRepoId] = useState<string | null>(null);
  const [isCommitModalOpen, setIsCommitModalOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [aiData, setAiData] = useState<AIInsight | null>(null);
  const [repo, setRepo] = useState<Repository | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = getSupabase();

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchUserProfile(session.user.id);
      else setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUserProfile(session.user.id);
      } else {
        setUserRole(null);
        setActiveView('landing');
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const profile = await thesisService.getUserProfile(userId);
      if (profile) {
        setUserRole(profile.role);
        // Default views based on role
        if (activeView === 'landing' || activeView === 'login') {
          setActiveView(profile.role === 'supervisor' ? 'admin-clearance' : 'overview');
        }
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRepoData = async () => {
    if (!session) return;
    try {
      const repos = await thesisService.getRepositories(session.user.id);
      setRepositories(repos);
      
      if (repos.length > 0) {
        const currentRepo = selectedRepoId 
          ? repos.find(r => r.id === selectedRepoId) || repos[0]
          : repos[0];
        
        setRepo(currentRepo);
        const commit = await thesisService.getLatestCommit(currentRepo.id);
        if (commit) {
          const insights = await thesisService.getAIInsights(commit.id);
          setAiData(insights);
        }
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  useEffect(() => {
    if (session && (userRole === 'student' || !userRole)) {
      fetchRepoData();
    }
  }, [selectedRepoId, session, userRole]);

  const handleSubmitThesis = async (repoId: string) => {
    try {
      await thesisService.submitThesis(repoId);
      setIsSubmissionModalOpen(false);
      await fetchRepoData();
      alert('Thesis submitted for clearance! Repository is now locked.');
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Failed to submit thesis. Please try again.');
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUserRole(null);
      setSession(null);
      setActiveView('landing');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const isLocked = repo?.status && repo.status !== 'draft';

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-container flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="w-8 h-8 text-primary" />
        </motion.div>
      </div>
    );
  }

  // Gate app with session
  if (!session && activeView !== 'landing') {
    return <LoginView onLoginSuccess={() => {}} />;
  }

  return (
    <Layout 
      activeView={activeView} 
      onNavigate={setActiveView} 
      onCreateCommit={() => !isLocked && setIsCommitModalOpen(true)}
      onSubmitThesis={() => !isLocked && setIsSubmissionModalOpen(true)}
      isLoggedIn={!!session}
      isLocked={isLocked}
      userRole={userRole || 'student'}
      onSignOut={handleSignOut}
    >
      {activeView === 'login' && !session && (
        <LoginView onLoginSuccess={() => {}} />
      )}

      {activeView === 'landing' && (
        <LandingView 
          isLoggedIn={!!session} 
          onExplore={() => {
            if (session) {
              setActiveView(userRole === 'supervisor' ? 'admin-clearance' : 'repo-list');
            } else {
              setActiveView('login');
            }
          }}
        />
      )}

      {activeView === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white border border-outline-variant rounded-xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-on-surface mb-2">
              Welcome back, {userRole === 'supervisor' ? 'Admin Prodi' : (session?.user?.email?.split('@')[0] || 'Scholar')}
            </h1>
            <p className="text-on-surface-variant font-medium">
              {userRole === 'supervisor' 
                ? 'There are pending clearance requests awaiting your verification.' 
                : 'You have active research projects and pending revisions.'}
            </p>
            {isLocked && userRole === 'student' && (
              <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-xs font-bold text-primary tracking-tight">
                  Your thesis "{repo?.name}" is currently <span className="underline uppercase">{repo?.status?.replace(/_/g, ' ')}</span>. Repository is locked.
                </p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm">
              <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">Total Revisions</p>
              <p className="text-2xl font-black text-on-surface">287</p>
            </div>
            <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm">
              <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">Citations</p>
              <p className="text-2xl font-black text-on-surface">1,042</p>
            </div>
            <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm">
              <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">AI Score</p>
              <p className="text-2xl font-black text-primary">98.4</p>
            </div>
          </div>
        </div>
      )}

      {activeView === 'admin-clearance' && userRole === 'supervisor' && <AdminClearanceView />}

      {activeView === 'repo-list' && (
        <RepositoryListView 
          repositories={repositories}
          onSelectRepo={(id) => {
            setSelectedRepoId(id);
            setActiveView('repo-detail');
          }} 
          onNavigate={setActiveView}
        />
      )}

      {activeView === 'repo-detail' && (
        <DocumentDetailView 
          repoName={repo?.name || "Loading..."} 
          repoOwner={session?.user?.email?.split('@')[0] || "owner"} 
          onCreateCommit={() => !isLocked && setIsCommitModalOpen(true)} 
          isLocked={isLocked}
        />
      )}
      
      {activeView === 'repo-settings' && (
        <RepositorySettingsView repoName={repo?.name || "Thesis"} />
      )}

      {activeView === 'create-repo' && (
        <CreateRepositoryView onSuccess={() => setActiveView('repo-list')} />
      )}

      {activeView === 'code' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <DocumentViewer />
          <MetadataSidebar onViewHistory={() => setActiveView('history')} />
        </div>
      )}

      {activeView === 'diff' && (
        <div className="space-y-6">
          <div className="bg-surface-container border border-outline-variant rounded-lg p-6 mb-8 flex items-center justify-between shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Commit: Update abstract and intro</h2>
              <p className="text-sm text-on-surface-variant mt-1">Comparing <code className="bg-surface-variant px-1 rounded">v2.3.0</code> ... <code className="bg-surface-variant px-1 rounded">v2.4.0</code></p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded border border-green-100">+12 lines</span>
              <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100">-4 lines</span>
            </div>
          </div>
          <CommitDiffViewer oldCode={OLD_ABSTRACT} newCode={NEW_ABSTRACT} />
        </div>
      )}

      {activeView === 'history' && <CommitHistoryView onSelectCommit={() => setActiveView('diff')} />}

      {(activeView === 'ai' || activeView === 'repo-classification' || activeView === 'repo-insights') && <AIInsightsView data={aiData} />}

      {activeView === 'settings' && <SettingsView onSignOut={handleSignOut} />}

      <CreateCommitModal 
        isOpen={isCommitModalOpen} 
        onClose={() => setIsCommitModalOpen(false)}
        onConfirm={(data) => {
          console.log('New commit:', data);
          setIsCommitModalOpen(false);
        }}
      />

      <ThesisSubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
        onConfirm={handleSubmitThesis}
      />
    </Layout>
  );
}
