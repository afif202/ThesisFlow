import React from 'react';
import { FileText, ZoomIn, ZoomOut, Download, ImageIcon, ChevronRight } from 'lucide-react';

export function DocumentViewer() {
  return (
    <div className="lg:col-span-9 flex flex-col border border-outline-variant rounded-lg bg-surface-container-lowest h-[800px] overflow-hidden shadow-sm">
      {/* Viewer Header */}
      <div className="h-12 border-b border-outline-variant bg-surface-container-low flex items-center px-4 justify-between">
        <div className="flex items-center gap-2 text-on-surface">
          <FileText className="w-5 h-5 text-primary" />
          <span className="text-sm font-semibold">chapter_01_introduction.pdf</span>
        </div>
        <div className="flex items-center gap-3 text-on-surface-variant">
          <button className="p-1.5 hover:bg-surface-container rounded transition-colors"><ZoomOut className="w-4 h-4" /></button>
          <span className="text-xs font-mono font-medium">100%</span>
          <button className="p-1.5 hover:bg-surface-container rounded transition-colors"><ZoomIn className="w-4 h-4" /></button>
          <div className="w-px h-4 bg-outline-variant mx-1"></div>
          <button className="p-1.5 hover:bg-surface-container rounded transition-colors"><Download className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Viewer Content Canvas */}
      <div className="flex-1 bg-surface-container p-8 overflow-y-auto flex justify-center">
        <div className="bg-surface-container-lowest border border-outline-variant w-full max-w-[800px] h-[1000px] shadow-sm p-12 flex flex-col gap-8">
          <div className="w-1/3 h-8 bg-surface-container rounded-sm" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`h-4 bg-surface-container rounded-sm ${i === 2 ? 'w-5/6' : i === 4 ? 'w-3/4' : 'w-full'}`} />
            ))}
          </div>
          
          <div className="w-full h-80 bg-surface-container-low flex flex-col items-center justify-center rounded border border-outline-variant gap-4 group cursor-pointer hover:bg-surface-container transition-colors">
            <ImageIcon className="w-12 h-12 text-outline group-hover:scale-105 transition-transform" />
            <span className="text-xs font-medium text-outline">Fig 1.1: Neural Topology Map</span>
          </div>

          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`h-4 bg-surface-container rounded-sm ${i === 2 ? 'w-4/5' : 'w-full'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
