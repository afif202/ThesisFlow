import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  User, 
  Book, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { thesisService } from '../services/thesisService';

export function AdminClearanceView() {
  const [pendingRepos, setPendingRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPending = async () => {
    try {
      const data = await thesisService.getPendingRepositories();
      setPendingRepos(data);
    } catch (err) {
      console.error('Failed to fetch pending repos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (repoId: string) => {
    setVerifyingId(repoId);
    try {
      await thesisService.approveThesis(repoId);
      await fetchPending();
      alert('Thesis repository cleared successfully.');
    } catch (err) {
      console.error('Approval failed:', err);
      alert('Failed to approve thesis.');
    } finally {
      setVerifyingId(null);
    }
  };

  const filteredRepos = pendingRepos.filter(repo => 
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    repo.profiles?.display_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <header className="flex flex-col gap-2 md:flex-row md:items-end justify-between border-b border-outline-variant pb-8">
        <div>
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest mb-3">
            <ShieldCheck className="w-4 h-4" />
            Admin Clearance Portal
          </div>
          <h1 className="text-3xl font-black text-on-surface tracking-tight">Similarity Shield Verification</h1>
          <p className="text-sm text-on-surface-variant mt-2 font-medium">Verify thesis repositories and grant final graduation clearance.</p>
        </div>
        
        <div className="flex items-center gap-4 mt-6 md:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search student or repo..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 pl-10 pr-4 bg-white border border-outline-variant rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all w-64 shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white border border-outline-variant rounded-xl text-on-surface-variant hover:text-on-surface transition-all shadow-sm">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Pending Review', value: pendingRepos.length, color: 'text-primary' },
          { label: 'Avg Similarity', value: '8.4%', color: 'text-on-surface' },
          { label: 'Avg Quality', value: 'Gold', color: 'text-on-surface' },
          { label: 'Today Cleared', value: '12', color: 'text-on-surface' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-outline-variant rounded-2xl p-6 shadow-sm">
            <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">{stat.label}</p>
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              <th className="px-6 py-4 text-[10px] font-black text-outline uppercase tracking-widest">Student & Repository</th>
              <th className="px-6 py-4 text-[10px] font-black text-outline uppercase tracking-widest">Similarity Score</th>
              <th className="px-6 py-4 text-[10px] font-black text-outline uppercase tracking-widest">Quality Tier</th>
              <th className="px-6 py-4 text-[10px] font-black text-outline uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filteredRepos.length > 0 ? (
              filteredRepos.map((repo) => {
                const latestCommit = repo.commits?.[0];
                const aiInsight = latestCommit?.ai_insights?.[0] || latestCommit?.ai_insights; // Handle different fetch structures
                const similarity = aiInsight?.similarity_score ?? 'N/A';
                const quality = aiInsight?.quality_tier ?? 'N/A';

                return (
                  <tr key={repo.id} className="hover:bg-surface-container-lowest transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-surface-container-low border border-outline-variant flex items-center justify-center">
                          <Book className="w-5 h-5 text-on-surface-variant" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-on-surface">{repo.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5 text-on-surface-variant">
                            <User className="w-3 h-3" />
                            <span className="text-[11px] font-bold">{repo.profiles?.display_name || 'Unknown Student'}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between w-32">
                          <span className={`text-xs font-black ${Number(similarity) > 15 ? 'text-red-600' : 'text-primary'}`}>{similarity}%</span>
                          {Number(similarity) > 15 && <AlertCircle className="w-3 h-3 text-red-500" />}
                        </div>
                        <div className="w-32 h-1.5 bg-surface-container-low rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${Number(similarity) > 15 ? 'bg-red-500' : 'bg-primary'}`} 
                            style={{ width: `${Math.min(similarity as number, 100)}%` }} 
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        quality === 'Platinum' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                        quality === 'Gold' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                        'bg-surface-container text-on-surface-variant border border-outline-variant'
                      }`}>
                        {quality}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleApprove(repo.id)}
                          disabled={verifyingId === repo.id}
                          className="px-6 py-2 bg-[#0051AE] text-white rounded-lg text-xs font-black shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:brightness-110 flex items-center gap-2 transition-all disabled:opacity-50"
                        >
                          {verifyingId === repo.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                          Verify Clearance
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-on-surface-variant font-medium">
                  No repositories pending clearance.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
