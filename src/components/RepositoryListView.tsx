import React from 'react';
import { 
  Search, 
  Plus, 
  Folder, 
  Globe, 
  Lock, 
  GitCommit, 
  History,
  ChevronDown,
  Flag,
  Info,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { Repository } from '../services/thesisService';

interface RepositoryListViewProps {
  repositories: Repository[];
  onSelectRepo: (repoId: string) => void;
  onNavigate: (view: any) => void;
}

export function RepositoryListView({ repositories, onSelectRepo, onNavigate }: RepositoryListViewProps) {
  // Helper for heatmap
  const heatmapData = Array.from({ length: 30 }, (_, i) => ({
    active: Math.random() > 0.4,
    intensity: Math.floor(Math.random() * 4)
  }));

  const intensityColors = ['bg-blue-50', 'bg-blue-200', 'bg-blue-400', 'bg-blue-600', 'bg-blue-800'];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'draft':
        return { label: 'Draft', color: 'bg-surface-container-low text-on-surface-variant border-outline-variant' };
      case 'pending_admin_review':
        return { label: 'Pending Review', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'approved':
        return { label: 'Approved', color: 'bg-green-50 text-green-700 border-green-200' };
      case 'rejected':
        return { label: 'Rejected', color: 'bg-red-50 text-red-700 border-red-200' };
      default:
        return { label: status, color: 'bg-surface-container-low text-on-surface-variant' };
    }
  };

  return (
    <div className="flex flex-col gap-8 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface tracking-tight">My Repositories</h1>
          <p className="text-sm text-on-surface-variant font-medium">Manage and track your active research projects and thesis drafts.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg text-sm font-bold text-on-surface hover:bg-surface-container-low transition-all">
              <Search className="w-4 h-4" />
              Find
            </button>
          </div>
          <button 
            onClick={() => onNavigate('create-repo')}
            className="bg-primary text-white border border-primary px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Repository
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Repository List */}
        <div className="flex-1 w-full space-y-4">
          {/* Filters Bar */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input 
                type="text" 
                placeholder="Search repositories..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-outline-variant rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-xs font-bold text-on-surface hover:bg-surface-container transition-all">
                Type
                <ChevronDown className="w-3 h-3" />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-xs font-bold text-on-surface hover:bg-surface-container transition-all">
                Sort
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {repositories.length === 0 ? (
              <div className="bg-white border border-outline-variant border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-4">
                  <Folder className="w-8 h-8 text-outline" />
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-1">No repositories found</h3>
                <p className="text-sm text-on-surface-variant max-w-xs mx-auto">
                  You haven't created any thesis repositories yet. Click "New Repository" to get started.
                </p>
              </div>
            ) : (
              repositories.map((repo) => {
                const statusConfig = getStatusConfig(repo.status);
                return (
                  <motion.div 
                    key={repo.id}
                    whileHover={{ y: -2 }}
                    onClick={() => onSelectRepo(repo.id)}
                    className="group bg-white border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Folder className="w-5 h-5 text-primary" />
                        <h3 className="text-base font-bold text-primary group-hover:underline transition-all">
                          {repo.name}
                        </h3>
                      </div>
                      <div className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight border ${statusConfig.color}`}>
                        {statusConfig.label}
                      </div>
                    </div>
                    
                    <p className="text-[13px] text-on-surface-variant font-medium leading-relaxed mb-6 line-clamp-2">
                      {repo.description || 'No description provided.'}
                    </p>

                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#3572A5]" />
                        <span className="text-xs font-bold text-on-surface-variant">Python</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-on-surface-variant">
                        <GitCommit className="w-4 h-4" />
                        <span className="text-xs font-bold">142 commits</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-on-surface-variant">
                        <History className="w-4 h-4" />
                        <span className="text-xs font-medium">Created {new Date(repo.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Profile & Revisions */}
        <aside className="w-full lg:w-80 space-y-6 shrink-0">
          {/* Researcher Profile Card */}
          <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-on-surface mb-4">Researcher Profile</h2>
            <div className="w-full h-px bg-outline-variant mb-6" />
            
            <p className="text-sm text-on-surface-variant font-medium leading-relaxed mb-8">
              Focusing on safe AI deployment in safety-critical systems. Currently drafting chapters 3 and 4 of primary dissertation.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="bg-surface-container-low rounded-lg p-4 flex flex-col border border-outline-variant">
                <span className="text-[10px] font-black uppercase tracking-widest text-outline mb-1">Total Revisions</span>
                <span className="text-2xl font-black text-primary leading-tight">287</span>
              </div>
              <div className="bg-surface-container-low rounded-lg p-4 flex flex-col border border-outline-variant">
                <span className="text-[10px] font-black uppercase tracking-widest text-outline mb-1">Citations Tracked</span>
                <span className="text-2xl font-black text-on-surface leading-tight">1,042</span>
              </div>
            </div>

            <div className="bg-surface-container-highest/30 rounded-lg p-4 border border-outline-variant/50">
              <span className="text-[10px] font-black uppercase tracking-widest text-outline mb-2 block">Current Milestone</span>
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-on-surface">Chapter 3 Draft Submission</span>
              </div>
            </div>
          </div>

          {/* Thesis Revisions Heatmap Card */}
          <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-on-surface">Thesis Revisions</h2>
              <span className="text-[10px] font-bold text-outline uppercase tracking-wider">Last 30 Days</span>
            </div>
            
            <div className="grid grid-cols-10 gap-1.5 mb-4">
              {heatmapData.map((day, i) => (
                <div 
                  key={i} 
                  className={`w-full aspect-square rounded-sm ${day.active ? intensityColors[day.intensity + 1] : 'bg-[#f0f2f5]'}`}
                  title={`${day.intensity} revisions`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-outline">Less</span>
              <div className="flex items-center gap-1">
                {intensityColors.map(color => (
                  <div key={color} className={`w-2.5 h-2.5 rounded-sm ${color}`} />
                ))}
              </div>
              <span className="text-[10px] font-bold text-outline">More</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
