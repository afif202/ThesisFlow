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
import { ChevronRight, Loader2 } from 'lucide-react';
import { thesisService, AIInsight, Repository } from './services/thesisService';
import { motion } from 'motion/react';

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

import { CreateRepositoryView } from './components/CreateRepositoryView';
import { RepositorySettingsView } from './components/RepositorySettingsView';

type View = 'login' | 'landing' | 'overview' | 'repo-list' | 'repo-detail' | 'repo-settings' | 'create-repo' | 'code' | 'diff' | 'ai' | 'repo-classification' | 'repo-insights' | 'history' | 'settings';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState<View>('landing');
  const [selectedRepoId, setSelectedRepoId] = useState<string | null>(null);
  const [isCommitModalOpen, setIsCommitModalOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [aiData, setAiData] = useState<AIInsight | null>(null);
  const [repo, setRepo] = useState<Repository | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const repos = await thesisService.getRepositories();
        if (repos.length > 0) {
          setRepo(repos[0]);
          const commit = await thesisService.getLatestCommit(repos[0].id);
          if (commit) {
            const insights = await thesisService.getAIInsights(commit.id);
            setAiData(insights);
          }
        }
      } catch (err) {
        console.error('Failed to fetch initial data:', err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

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

  return (
    <Layout 
      activeView={activeView} 
      onNavigate={setActiveView} 
      onCreateCommit={() => setIsCommitModalOpen(true)}
      onSubmitThesis={() => setIsSubmissionModalOpen(true)}
      isLoggedIn={isLoggedIn}
    >
      {activeView === 'login' && (
        <LoginView onLogin={() => {
          setIsLoggedIn(true);
          setActiveView('overview');
        }} />
      )}

      {activeView === 'landing' && (
        <LandingView 
          isLoggedIn={isLoggedIn} 
          onExplore={() => {
            if (isLoggedIn) {
              setActiveView('repo-list');
            } else {
              alert('Please login to explore active repositories.');
              setActiveView('login');
            }
          }}
        />
      )}

      {activeView === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white border border-outline-variant rounded-xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-on-surface mb-2">Welcome back, Jane</h1>
            <p className="text-on-surface-variant font-medium">You have 3 active research projects and 28 pending revisions.</p>
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

      {activeView === 'repo-list' && (
        <RepositoryListView 
          onSelectRepo={(id) => {
            setSelectedRepoId(id);
            setActiveView('repo-detail');
          }} 
          onNavigate={setActiveView}
        />
      )}

      {activeView === 'repo-detail' && (
        <DocumentDetailView 
          repoName="deep-learning-thesis" 
          repoOwner="smith-j" 
          onCreateCommit={() => setIsCommitModalOpen(true)} 
        />
      )}
      
      {activeView === 'repo-settings' && (
        <RepositorySettingsView repoName="deep-learning-thesis" />
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

      {activeView === 'settings' && <SettingsView />}

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
        onConfirm={(repoId) => {
          console.log('Thesis submitted for clearance:', repoId);
          setIsSubmissionModalOpen(false);
          alert('Thesis submitted for clearance! Repository is now locked.');
        }}
      />
    </Layout>
  );
}

