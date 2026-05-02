import React from 'react';
import { User, Calendar, Folder, Tag, ChevronRight } from 'lucide-react';

const recentCommits = [
  { title: 'Update introduction figures', time: '2 hours ago', active: true },
  { title: 'Fix citation formatting', time: 'Yesterday' },
  { title: 'Initial draft of Chapter 1', time: 'Oct 12, 2023' },
];

export function MetadataSidebar({ onViewHistory }: { onViewHistory?: () => void }) {
  return (
    <aside className="w-full lg:col-span-3 flex flex-col gap-6">
      <div className="border border-outline-variant bg-surface-container-lowest rounded-lg p-5">
        <h3 className="text-[11px] font-bold text-outline uppercase tracking-wider mb-5">Document Metadata</h3>
        
        <div className="space-y-4">
          <MetadataRow icon={User} label="Author" value="Jane Smith" />
          <MetadataRow icon={Calendar} label="Year" value="2024" />
          <MetadataRow icon={Folder} label="Category" value="Computer Science" />
          
          <div className="flex items-start gap-3">
            <Tag className="w-5 h-5 text-outline mt-0.5" />
            <div>
              <p className="text-[10px] font-bold text-outline uppercase">Tags</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-0.5 bg-surface text-on-surface-variant border border-outline-variant rounded text-[11px] font-medium">Neural Networks</span>
                <span className="px-2 py-0.5 bg-surface text-on-surface-variant border border-outline-variant rounded text-[11px] font-medium">NLP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-outline-variant bg-surface-container-lowest rounded-lg p-5">
        <h3 className="text-[11px] font-bold text-outline uppercase tracking-wider mb-5">Recent Commits</h3>
        
        <div className="relative pl-4 border-l-2 border-outline-variant space-y-6">
          {recentCommits.map((commit, idx) => (
            <div key={idx} className="relative">
              <div className={`absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 border-surface-container-lowest ${commit.active ? 'bg-primary' : 'bg-outline-variant'}`} />
              <p className="text-sm font-semibold text-on-surface leading-tight">{commit.title}</p>
              <p className="text-xs text-on-surface-variant mt-1">{commit.time}</p>
            </div>
          ))}
        </div>
        
        <button 
          onClick={onViewHistory}
          className="w-full mt-6 py-2 text-primary text-xs font-semibold hover:bg-surface-container transition-colors rounded"
        >
          View All History
        </button>
      </div>
    </aside>
  );
}

function MetadataRow({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-5 h-5 text-outline mt-0.5" />
      <div>
        <p className="text-[10px] font-bold text-outline uppercase">{label}</p>
        <p className="text-sm text-on-surface font-medium">{value}</p>
      </div>
    </div>
  );
}
