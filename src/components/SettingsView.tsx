import React, { useState } from 'react';
import { User, Bell, Shield, Wallet, ChevronRight, Camera, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

interface SettingsViewProps {
  onSignOut?: () => void;
}

export function SettingsView({ onSignOut }: SettingsViewProps) {
  const [activeSubTab, setActiveSubTab] = useState('Profile');

  const subTabs = ['Profile', 'Account', 'Notifications', 'Security'];

  return (
    <div className="flex flex-col gap-6 font-sans">
      <header className="flex flex-col gap-1">
        <nav className="flex items-center gap-2 text-on-surface-variant text-[11px] font-bold uppercase tracking-wider mb-1">
          <a href="#" className="hover:text-primary transition-colors">Dashboard</a>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-black text-on-surface">Settings</span>
        </nav>
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">Settings</h1>
        <p className="text-sm text-on-surface-variant font-medium">Manage your account settings and preferences.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sub-navigation */}
        <aside className="w-full lg:w-48 shrink-0">
          <div className="flex flex-col gap-0.5">
            {subTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeSubTab === tab 
                    ? 'bg-primary/5 text-primary' 
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 w-full space-y-8 pb-20">
          {/* Profile Information Section */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-8 shadow-sm">
            <h2 className="text-lg font-bold text-on-surface mb-6">Profile Information</h2>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
              <div className="relative group">
                <div className="w-20 h-20 rounded-xl bg-surface-container-highest overflow-hidden border border-outline-variant shadow-lg ring-4 ring-primary/5">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                    alt="Current Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-lg shadow-lg border border-white hover:scale-110 active:scale-95 transition-transform">
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <button className="px-4 py-1.5 border border-outline-variant rounded-md text-[11px] font-bold text-on-surface hover:bg-surface-container-low transition-colors">
                    Change avatar
                  </button>
                  <button className="text-[11px] font-bold text-red-600 hover:underline">
                    Remove
                  </button>
                </div>
                <p className="text-[10px] text-on-surface-variant font-medium">JPG, GIF or PNG. Max size of 800K</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-black text-on-surface-variant tracking-wider">First Name</label>
                <input 
                  type="text" 
                  defaultValue="Jane" 
                  className="px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-md text-sm font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-black text-on-surface-variant tracking-wider">Last Name</label>
                <input 
                  type="text" 
                  defaultValue="Doe" 
                  className="px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-md text-sm font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <label className="text-[10px] uppercase font-black text-on-surface-variant tracking-wider">Academic Affiliation</label>
              <input 
                type="text" 
                defaultValue="Department of Computer Science, University of Technology" 
                className="px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-md text-sm font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-black text-on-surface-variant tracking-wider">Bio</label>
              <div className="relative">
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md text-sm font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm resize-none"
                  defaultValue="Ph.D. candidate researching distributed consensus algorithms and their applications in academic version control systems."
                />
                <div className="absolute bottom-3 right-4 text-[10px] text-on-surface-variant font-bold">
                  124 / 500
                </div>
              </div>
            </div>
          </section>

          {/* Notification Preferences Section */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-8 shadow-sm">
            <h2 className="text-lg font-bold text-on-surface mb-2">Notification Preferences</h2>
            <p className="text-xs text-on-surface-variant font-medium mb-8">Control when and how you are notified about repository activity.</p>
            
            <div className="space-y-6">
              {[
                { title: 'Revision accepted', desc: 'Notify me when a pull request is merged into the main thesis branch.', enabled: true },
                { title: 'Supervisor comment', desc: 'Receive an alert when an advisor leaves an inline comment on a draft.', enabled: true },
                { title: 'New citation', desc: 'Get notified when your published datasets or drafts are cited within the network.', enabled: false },
              ].map((item, idx) => (
                <div key={item.title} className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold text-on-surface tracking-tight">{item.title}</p>
                    <p className="text-xs text-on-surface-variant font-medium leading-relaxed">{item.desc}</p>
                  </div>
                  <button 
                    className={`w-10 h-5 rounded-full relative transition-colors ${item.enabled ? 'bg-primary' : 'bg-outline-variant'}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${item.enabled ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Actions Bar */}
          <div className="flex items-center justify-between pt-6 border-t border-outline-variant">
            <button 
              onClick={onSignOut}
              className="flex items-center gap-2 px-4 py-2 text-red-600 font-bold text-xs hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out from Device
            </button>
            <div className="flex items-center gap-3">
              <button className="px-6 py-2 border border-outline-variant rounded-lg text-xs font-bold text-on-surface hover:bg-surface-container-low transition-all">
                Cancel
              </button>
              <button className="px-6 py-2 bg-primary text-white rounded-lg text-xs font-bold shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
