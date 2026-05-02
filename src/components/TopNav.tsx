import { Search, Plus, Settings } from 'lucide-react';

type View = 'login' | 'landing' | 'overview' | 'repo-list' | 'repo-detail' | 'repo-settings' | 'create-repo' | 'code' | 'diff' | 'ai' | 'repo-classification' | 'repo-insights' | 'history' | 'settings';

interface TopNavProps {
  activeView: View;
  onNavigate: (view: View) => void;
  onCreateCommit?: () => void;
  isLoggedIn?: boolean;
}

export function TopNav({ activeView, onNavigate, onCreateCommit, isLoggedIn }: TopNavProps) {
  const navItems: { label: string, view: View }[] = [
    { label: 'Browse', view: 'landing' },
    { label: 'Citations', view: 'repo-classification' },
    { label: 'Collections', view: 'repo-list' },
  ];

  const isRepoView = ['repo-detail', 'repo-settings', 'code', 'diff', 'ai', 'repo-classification', 'repo-insights', 'history'].includes(activeView);

  return (
    <header className="h-14 border-b border-outline-variant bg-white fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-8">
        <button 
          onClick={() => onNavigate('landing')}
          className="text-xl font-black text-primary tracking-tight hover:opacity-80 transition-opacity"
        >
          ThesisFlow
        </button>
        
        {!isRepoView && (
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.view)}
                className={`text-sm font-bold transition-all border-b-2 py-4 ${
                  activeView === item.view 
                    ? 'text-primary border-primary' 
                    : 'text-on-surface-variant hover:text-on-surface border-transparent font-medium'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>

      <div className="flex-1 max-w-lg mx-8 hidden lg:block relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full h-9 pl-10 pr-4 bg-surface-container-low border border-outline-variant rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <button 
              onClick={() => onNavigate('settings')}
              className={`p-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface-variant hover:text-on-surface transition-all ${activeView === 'settings' ? 'text-primary ring-2 ring-primary/20' : ''}`}
            >
              <Settings className="w-5 h-5" />
            </button>

            <div className="w-9 h-9 rounded-lg bg-surface-container-highest overflow-hidden border border-outline-variant shadow-sm cursor-pointer ring-2 ring-primary/5">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" 
                alt="Jane Smith" 
                className="w-full h-full object-cover"
              />
            </div>
          </>
        ) : (
          <button 
            onClick={() => onNavigate('login')}
            className="bg-primary text-white px-6 h-9 rounded-lg text-xs font-black shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all uppercase tracking-wide"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
