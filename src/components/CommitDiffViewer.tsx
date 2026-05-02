import React from 'react';
import { diffLines, Change } from 'diff';

interface DiffViewerProps {
  oldCode: string;
  newCode: string;
  oldName?: string;
  newName?: string;
}

export function CommitDiffViewer({ oldCode, newCode, oldName = 'v2.3.0', newName = 'v2.4.0' }: DiffViewerProps) {
  const changes = diffLines(oldCode, newCode);

  interface DiffLine {
    content: string;
    ln?: number;
    type: 'added' | 'removed' | 'unchanged' | 'empty';
  }

  const leftLines: DiffLine[] = [];
  const rightLines: DiffLine[] = [];

  let leftBuffer: DiffLine[] = [];
  let rightBuffer: DiffLine[] = [];
  let oldLn = 1;
  let newLn = 1;

  const flushBuffers = () => {
    const maxLen = Math.max(leftBuffer.length, rightBuffer.length);
    for (let i = 0; i < maxLen; i++) {
      leftLines.push(leftBuffer[i] || { content: '', type: 'empty' });
      rightLines.push(rightBuffer[i] || { content: '', type: 'empty' });
    }
    leftBuffer = [];
    rightBuffer = [];
  };

  changes.forEach((chunk) => {
    const lines = chunk.value.split('\n');
    if (lines[lines.length - 1] === '') lines.pop();

    if (chunk.added) {
      lines.forEach(line => rightBuffer.push({ content: line, ln: newLn++, type: 'added' }));
    } else if (chunk.removed) {
      lines.forEach(line => leftBuffer.push({ content: line, ln: oldLn++, type: 'removed' }));
    } else {
      flushBuffers();
      lines.forEach(line => {
        leftLines.push({ content: line, ln: oldLn++, type: 'unchanged' });
        rightLines.push({ content: line, ln: newLn++, type: 'unchanged' });
      });
    }
  });
  flushBuffers();

  return (
    <div className="border border-outline-variant rounded-lg bg-surface-container-lowest overflow-hidden shadow-sm">
      <div className="bg-surface-container-low border-b border-outline-variant px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-secondary">description</span>
          <span className="text-sm font-semibold">docs/abstract.md</span>
        </div>
        <button className="bg-surface-container-lowest border border-outline-variant px-2 py-1 rounded hover:bg-surface-container-low transition-colors text-xs font-medium flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">visibility</span> View File
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px] flex font-mono border-b border-outline-variant">
          <div className="w-1/2 bg-surface-container-highest border-r border-outline-variant text-secondary text-[10px] uppercase font-bold py-1.5 px-4 tracking-wider">
            {oldName}
          </div>
          <div className="w-1/2 bg-surface-container-highest text-secondary text-[10px] uppercase font-bold py-1.5 px-4 tracking-wider">
            {newName}
          </div>
        </div>

        <div className="min-w-[800px] flex font-mono">
          {/* Left Side (Old) */}
          <div className="w-1/2 border-r border-outline-variant bg-surface-container-lowest flex flex-col">
            {leftLines.map((line, i) => (
              <div 
                key={`left-${i}`} 
                className={`flex h-6 items-center text-[13px] leading-none ${
                  line.type === 'removed' ? 'bg-red-100/30' : line.type === 'empty' ? 'bg-surface-container-low/30' : 'hover:bg-surface-container-low/50'
                }`}
              >
                <div className={`w-12 h-full text-right pr-2 select-none border-r border-outline-variant text-[10px] flex items-center justify-end ${
                  line.type === 'removed' ? 'bg-red-200/40 text-red-700 font-bold' : 'text-outline/60'
                }`}>
                  {line.ln}
                </div>
                <div className={`px-4 flex-1 truncate ${line.type === 'removed' ? 'text-red-800' : 'text-on-surface/80'}`}>
                  {line.type === 'removed' && <span className="mr-2 opacity-50 font-bold">-</span>}
                  {line.content}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side (New) */}
          <div className="w-1/2 bg-surface-container-lowest flex flex-col">
            {rightLines.map((line, i) => (
              <div 
                key={`right-${i}`} 
                className={`flex h-6 items-center text-[13px] leading-none ${
                  line.type === 'added' ? 'bg-green-100/30' : line.type === 'empty' ? 'bg-surface-container-low/30' : 'hover:bg-surface-container-low/50'
                }`}
              >
                <div className={`w-12 h-full text-right pr-2 select-none border-r border-outline-variant text-[10px] flex items-center justify-end ${
                  line.type === 'added' ? 'bg-green-200/40 text-green-700 font-bold' : 'text-outline/60'
                }`}>
                  {line.ln}
                </div>
                <div className={`px-4 flex-1 truncate ${line.type === 'added' ? 'text-green-800' : 'text-on-surface/80'}`}>
                  {line.type === 'added' && <span className="mr-2 opacity-50 font-bold">+</span>}
                  {line.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
