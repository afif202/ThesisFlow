import React, { useState } from 'react';
import { 
  Settings, 
  Users, 
  Shield, 
  GitBranch, 
  Tag, 
  ListChecks, 
  PlayCircle, 
  Box, 
  Webhook, 
  Lock,
  Upload,
  Globe,
  Edit2,
  Trash2
} from 'lucide-react';
import { motion } from 'motion/react';

interface RepositorySettingsViewProps {
  repoName: string;
}

export function RepositorySettingsView({ repoName: initialRepoName }: RepositorySettingsViewProps) {
  const [repoName, setRepoName] = useState(initialRepoName);
  const [activeTab, setActiveTab] = useState('General');
  const [isPublic, setIsPublic] = useState(false);

  const menuItems = [
    { name: 'General', icon: Settings },
    { name: 'Collaborators', icon: Users },
    { name: 'Moderation', icon: Shield },
    { name: 'Branches', icon: GitBranch },
    { name: 'Tags', icon: Tag },
    { name: 'Rules', icon: ListChecks },
    { name: 'Actions', icon: PlayCircle },
    { name: 'Models', icon: Box },
    { name: 'Webhooks', icon: Webhook },
    { name: 'Security', icon: Lock },
  ];

  return (
    <div className="flex bg-white rounded-xl border border-outline-variant overflow-hidden min-h-[800px] font-sans">
      {/* Settings Side Nav */}
      <aside className="w-64 border-r border-outline-variant bg-[#f8f9fc] p-6 shrink-0">
        <h2 className="text-[10px] font-black uppercase tracking-widest text-on-surface mb-1">Repository Settings</h2>
        <p className="text-[11px] text-on-surface-variant font-medium mb-6">Manage preferences</p>
        
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === item.name 
                  ? 'bg-white border border-outline-variant text-primary shadow-sm' 
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-on-surface mb-1">{activeTab}</h1>
          <p className="text-sm text-on-surface-variant font-medium">
            Manage core settings for the <span className="font-bold text-on-surface">{repoName}</span> repository.
          </p>
          <div className="h-px bg-outline-variant mt-6" />
        </div>

        {activeTab === 'General' && (
          <div className="space-y-12">
            {/* Repository Name Section */}
            <section>
              <h3 className="text-sm font-bold text-on-surface mb-4">Repository name</h3>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  className="flex-1 max-w-md px-4 py-2 bg-white border border-outline-variant rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
                <button className="px-6 py-2 border border-outline-variant rounded-lg text-xs font-bold text-on-surface hover:bg-surface-container-low transition-all">
                  Rename
                </button>
              </div>
            </section>

            {/* Template Option */}
            <section className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
              <div>
                <h3 className="text-sm font-bold text-on-surface">Template repository</h3>
                <p className="text-xs text-on-surface-variant font-medium mt-1">
                  Template repositories let users generate new repositories with the same directory structure and files.
                </p>
              </div>
            </section>

            {/* Default Branch Section */}
            <section>
              <h3 className="text-sm font-bold text-on-surface mb-2">Default branch</h3>
              <p className="text-xs text-on-surface-variant font-medium mb-4">
                The default branch is considered the "base" branch in your repository, against which all pull requests and code commits are automatically made, unless you specify a different branch.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-container-low border border-outline-variant rounded text-xs font-bold text-on-surface">
                <GitBranch className="w-3.5 h-3.5" />
                main
                <Edit2 className="w-3.5 h-3.5 text-primary ml-2 cursor-pointer" />
              </div>
            </section>

            {/* Release Immutability */}
            <section className="flex items-start gap-3 pt-6 border-t border-outline-variant">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
              <div>
                <h3 className="text-sm font-bold text-on-surface">Enable release immutability</h3>
                <p className="text-xs text-on-surface-variant font-medium mt-1">
                  Prevent published releases and their associated assets from being modified or deleted by repository maintainers.
                </p>
              </div>
            </section>

            {/* Social Preview */}
            <section>
              <h3 className="text-sm font-bold text-on-surface mb-2">Social preview</h3>
              <p className="text-xs text-on-surface-variant font-medium mb-4">
                Upload an image to customize your repository's social media preview. Images should be at least 640×320px (1280×640px for best display).
              </p>
              <div className="border-2 border-dashed border-outline-variant rounded-xl p-12 flex flex-col items-center justify-center gap-4 bg-surface-container-lowest hover:bg-surface-container-low cursor-pointer transition-all">
                <Upload className="w-6 h-6 text-outline" />
                <div className="text-center">
                  <p className="text-sm font-bold text-on-surface">Click to upload, or drag and drop</p>
                  <p className="text-[11px] text-outline font-medium mt-1">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>
            </section>

            {/* Danger Zone */}
            <section className="pt-12 border-t border-red-100">
               <h3 className="text-sm font-black text-red-600 uppercase tracking-widest mb-6">Danger Zone</h3>
               <div className="border border-red-100 rounded-xl overflow-hidden divide-y divide-red-50">
                  <div className="flex items-center justify-between p-4 bg-red-50/10">
                    <div>
                      <p className="text-sm font-bold text-on-surface">Change visibility</p>
                      <p className="text-xs text-on-surface-variant font-medium">This repository is currently {isPublic ? 'public' : 'private'}.</p>
                    </div>
                    <button 
                      onClick={() => setIsPublic(!isPublic)}
                      className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-xs font-black hover:bg-red-50 transition-all"
                    >
                      Make {isPublic ? 'Private' : 'Public'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-red-50/10">
                    <div>
                      <p className="text-sm font-bold text-on-surface">Delete this repository</p>
                      <p className="text-xs text-on-surface-variant font-medium">Once you delete a repository, there is no going back. Please be certain.</p>
                    </div>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-black shadow-md shadow-red-200 hover:brightness-110 transition-all">
                      Delete Repository
                    </button>
                  </div>
               </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
