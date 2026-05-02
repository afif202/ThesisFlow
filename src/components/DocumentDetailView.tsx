import React from 'react';
import { 
  FileText, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  User, 
  Calendar, 
  Tag, 
  History,
  Link,
  ChevronRight,
  MoreVertical,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';

interface DocumentDetailViewProps {
  repoName: string;
  repoOwner: string;
  onCreateCommit?: () => void;
}

export function DocumentDetailView({ repoName, repoOwner, onCreateCommit }: DocumentDetailViewProps) {
  const recentCommits = [
    { id: 1, message: 'Update introduction figures', time: '2 hours ago', active: true },
    { id: 2, message: 'Fix citation formatting', time: 'Yesterday', active: false },
    { id: 3, message: 'Initial draft of Chapter 1', time: 'Oct 12, 2023', active: false },
  ];

  return (
    <div className="flex flex-col gap-6 font-sans">
      {/* Breadcrumbs handled by App usually, but let's provide internal layout */}
      <div className="flex items-center justify-between mb-2">
        <nav className="flex items-center gap-2 text-on-surface-variant text-[13px] font-medium">
          <button className="hover:text-primary transition-colors">{repoOwner}</button>
          <ChevronRight className="w-3.5 h-3.5 text-outline-variant" />
          <span className="font-bold text-on-surface">{repoName}</span>
        </nav>
        <div className="flex items-center gap-3">
           <button 
            onClick={onCreateCommit}
            className="bg-primary text-white px-6 h-9 rounded-lg text-xs font-black shadow-md hover:shadow-lg transition-all"
           >
            Commit
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: PDF Viewer Simulation */}
        <div className="flex-1 w-full bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          <div className="bg-surface-container-low border-b border-outline-variant px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-on-surface">chapter_01_introduction.pdf</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 border-r border-outline-variant pr-6">
                <Search className="w-4 h-4 text-outline cursor-pointer hover:text-on-surface" />
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-surface-container rounded transition-colors"><ZoomOut className="w-4 h-4 text-on-surface" /></button>
                  <span className="text-xs font-bold text-on-surface min-w-[32px] text-center">100%</span>
                  <button className="p-1 hover:bg-surface-container rounded transition-colors"><ZoomIn className="w-4 h-4 text-on-surface" /></button>
                </div>
              </div>
              <Download className="w-4 h-4 text-outline cursor-pointer hover:text-on-surface" />
            </div>
          </div>

          <div className="p-8 bg-[#f5f6f7] min-h-[800px] flex justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-2xl bg-white shadow-xl min-h-[1000px] p-16 flex flex-col gap-8"
            >
              {/* Paper Content Simulation */}
              <div className="w-2/3 h-10 bg-surface-container-low rounded-sm" />
              <div className="w-full h-4 bg-surface-container-low rounded-sm opacity-50" />
              
              <div className="space-y-4 pt-12">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="w-full h-3 bg-surface-container-low rounded-sm opacity-30" />
                    <div className="w-[92%] h-3 bg-surface-container-low rounded-sm opacity-30" />
                  </div>
                ))}
              </div>

              {/* Box (Image placeholder) */}
              <div className="w-full aspect-video bg-surface-container-low rounded-lg border border-dashed border-outline flex items-center justify-center">
                <FileText className="w-12 h-12 text-outline-variant" />
              </div>

              <div className="space-y-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-[96%] h-3 bg-surface-container-low rounded-sm opacity-30" />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right: Metadata & History */}
        <aside className="w-full lg:w-80 space-y-6 shrink-0">
          {/* Metadata Card */}
          <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-outline mb-6">Document Metadata</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-surface-container-low p-2 rounded-lg h-fit">
                  <User className="w-4 h-4 text-on-surface-variant" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-outline tracking-wider mb-0.5">Author</p>
                  <p className="text-sm font-bold text-on-surface">{repoOwner} Smith</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-surface-container-low p-2 rounded-lg h-fit">
                  <Calendar className="w-4 h-4 text-on-surface-variant" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-outline tracking-wider mb-0.5">Year</p>
                  <p className="text-sm font-bold text-on-surface">2024</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-surface-container-low p-2 rounded-lg h-fit">
                  <FileText className="w-4 h-4 text-on-surface-variant" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-outline tracking-wider mb-0.5">Category</p>
                  <p className="text-sm font-bold text-on-surface">Computer Science</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-surface-container-low p-2 rounded-lg h-fit">
                  <Tag className="w-4 h-4 text-on-surface-variant" />
                </div>
                <div className="w-full">
                  <p className="text-[10px] font-black uppercase text-outline tracking-wider mb-1.5">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {['Neural Networks', 'NLP'].map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-surface-container-low border border-outline-variant rounded text-[11px] font-bold text-on-surface-variant">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Commits Card */}
          <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-outline mb-6">Recent Commits</h2>
            
            <div className="relative space-y-8 before:absolute before:left-[7px] before:top-2 before:bottom-0 before:w-0.5 before:bg-outline-variant">
              {recentCommits.map((commit) => (
                <div key={commit.id} className="relative flex items-start gap-4">
                  <div className={`w-3.5 h-3.5 rounded-full z-10 mt-1 border-2 border-white ring-2 ring-primary/5 shadow-sm ${commit.active ? 'bg-primary' : 'bg-outline-variant'}`} />
                  <div>
                    <p className={`text-sm font-bold tracking-tight mb-0.5 ${commit.active ? 'text-on-surface font-black' : 'text-on-surface-variant'}`}>{commit.message}</p>
                    <p className="text-[11px] font-medium text-outline">{commit.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-2 text-xs font-black text-primary hover:underline transition-all">
              View All History
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
