import React from 'react';
import { History, ChevronRight, User, Calendar, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface Commit {
  id: string;
  message: string;
  hash: string;
  createdAt: string;
  author: string;
  filesChanged: number;
}

const mockAllCommits: Commit[] = [
  { id: 'c1', message: 'Update introduction figures', hash: 'ab3f9d2', createdAt: '2024-04-30T17:26:04Z', author: 'Jane Smith', filesChanged: 2 },
  { id: 'c2', message: 'Fix citation formatting', hash: '8f2e1a4', createdAt: '2024-04-29T10:15:00Z', author: 'Jane Smith', filesChanged: 1 },
  { id: 'c3', message: 'Initial draft of Chapter 1', hash: 'd4b8c2e', createdAt: '2023-10-12T14:20:00Z', author: 'Jane Smith', filesChanged: 5 },
  { id: 'c4', message: 'Added references for deep learning', hash: '7e12f3a', createdAt: '2023-09-05T09:00:00Z', author: 'Jane Smith', filesChanged: 1 },
  { id: 'c5', message: 'Set up repository structure', hash: '1a2b3c4', createdAt: '2023-08-01T12:00:00Z', author: 'Jane Smith', filesChanged: 10 },
];

export function CommitHistoryView({ onSelectCommit }: { onSelectCommit: (hash: string) => void }) {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-on-surface tracking-tight flex items-center gap-3">
          <History className="w-6 h-6 text-primary" />
          Revision History
        </h1>
        <p className="text-sm text-on-surface-variant font-medium">Tracking all 5 versions of "Optimization Strategies in Deep Neural Networks"</p>
      </header>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-low text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Version</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {mockAllCommits.map((commit, idx) => (
              <motion.tr 
                key={commit.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-surface-container-low transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary bg-primary-container/10 px-2 py-0.5 rounded border border-primary-container/20">
                      {commit.hash}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-on-surface">{commit.message}</p>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">{commit.filesChanged} file changed</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-on-surface">
                    <User className="w-3.5 h-3.5 text-outline" />
                    {commit.author}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(commit.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onSelectCommit(commit.hash)}
                    className="p-1 px-3 bg-surface-container-high border border-outline-variant rounded text-[11px] font-bold text-on-surface hover:bg-surface-container-highest transition-colors flex items-center gap-1.5 ml-auto opacity-0 group-hover:opacity-100"
                  >
                    Compare <ChevronRight className="w-3 h-3" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
