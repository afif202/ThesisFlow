import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  CheckCircle2, 
  Lock, 
  X,
  Award,
  Info,
  Book,
  Search,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ThesisSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (repoId: string) => void;
}

export function ThesisSubmissionModal({ isOpen, onClose, onConfirm }: ThesisSubmissionModalProps) {
  const [step, setStep] = useState<'select' | 'confirm'>('select');
  const [selectedRepo, setSelectedRepo] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const repositories = [
    { id: '1', name: 'deep-learning-thesis', version: 'v2.4.0', status: 'ready' },
    { id: '2', name: 'nlp-research-framework', version: 'v1.0.2', status: 'incomplete' },
    { id: '3', name: 'data-mining-study', version: 'v0.8.5', status: 'ready' },
  ];

  const filteredRepos = repositories.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const checklistItems = [
    { label: 'All chapters uploaded', completed: true },
    { label: 'Logbook & ACC Evidence attached', completed: true },
    { label: 'Metadata fully extracted', completed: true },
  ];

  const handleBack = () => {
    setStep('select');
    setSelectedRepo(null);
  };

  const handleRepoSelect = (repo: any) => {
    if (repo.status === 'ready') {
      setSelectedRepo(repo);
      setStep('confirm');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden font-sans"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-outline-variant">
            <div className="flex items-center gap-3">
              {step === 'confirm' && (
                <button 
                  onClick={handleBack}
                  className="p-2 -ml-2 hover:bg-surface-container-low rounded-full transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-on-surface-variant" />
                </button>
              )}
              <div>
                <h2 className="text-xl font-black text-on-surface tracking-tight">
                  {step === 'select' ? 'Select Thesis Repository' : 'Final Thesis Submission'}
                </h2>
                <p className="text-xs text-on-surface-variant font-medium mt-1">
                  {step === 'select' ? 'Choose the research project you want to submit for clearance.' : 'Submit your repository to Admin Prodi for final verification.'}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-on-surface-variant" />
            </button>
          </div>

          <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
            {step === 'select' ? (
              <div className="space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Search your repositories..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 bg-surface-container-low border border-outline-variant rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>

                {/* List */}
                <div className="space-y-2">
                  {filteredRepos.map((repo) => (
                    <button
                      key={repo.id}
                      onClick={() => handleRepoSelect(repo)}
                      disabled={repo.status === 'incomplete'}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                        repo.status === 'incomplete' 
                        ? 'opacity-50 cursor-not-allowed border-outline-variant' 
                        : 'border-outline-variant hover:border-primary hover:bg-primary/5 cursor-pointer group'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center border border-outline-variant">
                          <Book className="w-5 h-5 text-on-surface-variant" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface">{repo.name}</p>
                          <p className="text-[10px] font-medium text-outline uppercase tracking-wider">{repo.version} • {repo.status === 'ready' ? 'Ready to submit' : 'Incomplete'}</p>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-outline-variant transition-transform ${repo.status === 'ready' ? 'group-hover:translate-x-1 group-hover:text-primary' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Checklist */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-outline">Checklist Validation</h3>
                  <div className="space-y-2">
                    {checklistItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 border border-outline-variant rounded-xl bg-surface-container-lowest">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <span className="text-sm font-bold text-on-surface tracking-tight">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Scan Section */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-outline">Pre-submission AI Scan</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Similarity Card */}
                    <div className="p-6 border border-outline-variant rounded-xl bg-surface-container-lowest flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-on-surface">Similarity Shield</p>
                          <p className="text-[10px] font-medium text-outline">Plagiarism & Overlap Scan</p>
                        </div>
                        <div className="px-2 py-1 bg-primary/10 rounded text-[10px] font-black text-primary">4%</div>
                      </div>
                      <div className="h-1.5 w-full bg-surface-container-low rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '4%' }}
                          className="h-full bg-primary"
                        />
                      </div>
                      <p className="text-[10px] font-bold text-outline uppercase tracking-tight">Below 15% threshold. Cleared.</p>
                    </div>

                    {/* Quality Card */}
                    <div className="p-6 border border-outline-variant rounded-xl bg-surface-container-lowest flex flex-col gap-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-outline" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-outline">Quality Assessment</span>
                      </div>
                      <p className="text-lg font-black text-on-surface">Gold Tier</p>
                      <p className="text-[10px] font-medium text-on-surface-variant leading-relaxed">
                        Exceptional structural integrity and citation mapping.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Warning Box */}
                <div className="flex gap-4 p-5 bg-surface-container-low border border-outline-variant rounded-xl">
                  <div className="shrink-0 p-1 bg-white rounded shadow-sm h-fit">
                    <Info className="w-4 h-4 text-on-surface-variant" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-on-surface leading-normal">
                      <span className="font-black">Final Step:</span> By submitting, your repository will be <span className="font-bold underline">locked</span> and sent to Admin Prodi for final clearance. No further structural edits or commits will be permitted during the review phase.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-outline-variant bg-surface-container-lowest flex items-center justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-black text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Cancel
            </button>
            {step === 'confirm' && (
              <button 
                onClick={() => onConfirm(selectedRepo.id)}
                className="px-8 py-2.5 bg-[#0051AE] text-white rounded-lg text-xs font-black shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:brightness-110 flex items-center gap-2 transition-all"
              >
                Submit for Clearance
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
