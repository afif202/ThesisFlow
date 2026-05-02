import React, { useState } from 'react';
import { 
  Globe, 
  Lock, 
  Info,
  ChevronDown,
  BookOpen,
  FileText,
  Shield
} from 'lucide-react';
import { motion } from 'motion/react';

interface CreateRepositoryViewProps {
  onSuccess: () => void;
}

export function CreateRepositoryView({ onSuccess }: CreateRepositoryViewProps) {
  const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('private');
  const [owner] = useState('janesmith');

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 font-sans">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm font-medium text-on-surface-variant mb-4">
        <span className="hover:text-primary cursor-pointer transition-colors">{owner}</span>
        <span className="text-outline">/</span>
        <span className="text-on-surface font-bold">new</span>
      </nav>

      <h1 className="text-2xl font-black text-on-surface mb-2 tracking-tight">Create a new repository</h1>
      <p className="text-sm text-on-surface-variant font-medium leading-relaxed mb-8">
        A repository contains all project files, including the revision history. Already have a project repository elsewhere? 
        <span className="text-primary hover:underline cursor-pointer ml-1">Import a repository.</span>
      </p>

      <div className="h-px bg-outline-variant w-full mb-8" />

      <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onSuccess(); }}>
        {/* Owner & Name */}
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="w-full md:w-64">
            <label className="block text-sm font-black text-on-surface mb-2">Owner *</label>
            <button type="button" className="w-full flex items-center justify-between px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-sm font-bold text-on-surface shadow-sm">
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary">JS</div>
                {owner}
              </span>
              <ChevronDown className="w-4 h-4 text-outline" />
            </button>
          </div>
          <div className="hidden md:flex h-10 items-end pb-2">
            <span className="text-2xl text-outline font-light">/</span>
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-black text-on-surface mb-2">Repository name *</label>
            <input 
              type="text" 
              placeholder="name-your-thesis"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-outline-variant rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              required
            />
            <p className="text-[11px] text-on-surface-variant font-medium mt-2">
              Great repository names are short and memorable. Need inspiration? How about <span className="text-primary font-bold cursor-pointer">robust-quantum-analysis</span>?
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-black text-on-surface mb-2">Description <span className="text-outline font-normal text-xs">(optional)</span></label>
          <input 
            type="text" 
            placeholder="A brief overview of your research objectives..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-outline-variant rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>

        <div className="h-px bg-outline-variant w-full" />

        {/* Visibility */}
        <div className="space-y-3">
          <label className="block text-sm font-black text-on-surface mb-1">Visibility</label>
          
          <div 
            onClick={() => setVisibility('public')}
            className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${visibility === 'public' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-outline-variant bg-white hover:bg-surface-container-low'}`}
          >
            <div className={`mt-1.5 w-4 h-4 rounded-full border flex items-center justify-center ${visibility === 'public' ? 'border-primary' : 'border-outline'}`}>
              {visibility === 'public' && <div className="w-2 h-2 rounded-full bg-primary" />}
            </div>
            <div className="flex gap-4">
              <Globe className="w-5 h-5 text-on-surface-variant mt-0.5" />
              <div>
                <p className="text-sm font-bold text-on-surface">Public</p>
                <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                  Anyone on the internet can see this repository. You choose who can commit.
                </p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => setVisibility('private')}
            className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${visibility === 'private' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-outline-variant bg-white hover:bg-surface-container-low'}`}
          >
            <div className={`mt-1.5 w-4 h-4 rounded-full border flex items-center justify-center ${visibility === 'private' ? 'border-primary' : 'border-outline'}`}>
              {visibility === 'private' && <div className="w-2 h-2 rounded-full bg-primary" />}
            </div>
            <div className="flex gap-4">
              <Lock className="w-5 h-5 text-on-surface-variant mt-0.5" />
              <div>
                <p className="text-sm font-bold text-on-surface">Private</p>
                <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                  You choose who can see and commit to this repository.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-outline-variant w-full" />

        {/* Initialization */}
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-black text-on-surface mb-1">Initialize this repository with:</h3>
            <p className="text-xs text-on-surface-variant font-medium">Skip this step if you're importing an existing repository.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
              <div>
                <p className="text-sm font-bold text-on-surface">Add a README file</p>
                <p className="text-xs text-on-surface-variant font-medium">This is where you can write a long description for your project.</p>
              </div>
            </div>

            <div className="flex items-center gap-10 pl-7">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                <span className="text-xs font-bold text-on-surface">Add .gitignore</span>
                <button type="button" className="px-3 py-1 bg-surface-container-low border border-outline-variant rounded flex items-center gap-2 text-[11px] font-bold text-on-surface">
                  .gitignore template: None
                  <ChevronDown className="w-3 h-3" />
                </button>
                <Info className="w-3.5 h-3.5 text-outline" />
              </div>
            </div>

            <div className="flex items-center gap-10 pl-7">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                <span className="text-xs font-bold text-on-surface">Choose a license</span>
                <button type="button" className="px-3 py-1 bg-surface-container-low border border-outline-variant rounded flex items-center gap-2 text-[11px] font-bold text-on-surface">
                  License: None
                  <ChevronDown className="w-3 h-3" />
                </button>
                <Info className="w-3.5 h-3.5 text-outline" />
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-outline-variant w-full pt-8" />

        <button 
          type="submit"
          className="bg-[#0051AE] text-white px-8 py-3 rounded-xl font-black text-sm shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all uppercase tracking-wide"
        >
          Create repository
        </button>
      </form>
    </div>
  );
}
