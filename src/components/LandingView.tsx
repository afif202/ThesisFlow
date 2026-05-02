import React from 'react';
import { 
  Search, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  Folder,
  Star,
  GitCommit,
  Globe,
  Lock,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

interface LandingViewProps {
  isLoggedIn?: boolean;
  onExplore: () => void;
}

interface RepoCardProps {
  key?: React.Key;
  owner: string;
  repo: string;
  isPublic: boolean;
  title: string;
  description: string;
  language: string;
  langColor: string;
  stars: string;
  commits: number;
  updatedAt: string;
}

const RepoCard = ({ owner, repo, isPublic, title, description, language, langColor, stars, commits, updatedAt }: RepoCardProps) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="bg-surface-container-lowest border border-outline-variant rounded-lg p-5 shadow-sm hover:shadow-md transition-all flex flex-col gap-3"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-primary font-bold text-xs">
        <Folder className="w-4 h-4 text-outline" />
        <span className="hover:underline cursor-pointer">{owner}/{repo}</span>
      </div>
      <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight border ${
        isPublic ? 'bg-surface-container-low text-on-surface-variant border-outline-variant' : 'bg-surface-container-high text-on-surface border-outline'
      }`}>
        {isPublic ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
        {isPublic ? 'Public' : 'Private'}
      </div>
    </div>
    
    <h3 className="text-sm font-bold text-on-surface leading-tight line-clamp-2">
      {title}
    </h3>
    <p className="text-[11px] text-on-surface-variant line-clamp-3 leading-relaxed">
      {description}
    </p>

    <div className="mt-auto pt-4 flex items-center justify-between border-t border-outline-variant">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: langColor }} />
          <span className="text-[10px] font-bold text-on-surface-variant">{language}</span>
        </div>
        <div className="flex items-center gap-1 text-on-surface-variant">
          <Star className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold">{stars}</span>
        </div>
        <div className="flex items-center gap-1 text-on-surface-variant">
          <GitCommit className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold">{commits}</span>
        </div>
      </div>
      <span className="text-[10px] text-outline font-medium">Updated {updatedAt}</span>
    </div>
  </motion.div>
);

export function LandingView({ isLoggedIn, onExplore }: LandingViewProps) {
  const categories = [
    { name: 'Computer Science', count: '2.4k', checked: true },
    { name: 'Biology', count: '1.1k', checked: false },
    { name: 'Physics', count: '856', checked: false },
    { name: 'Sociology', count: '432', checked: false },
  ];

  const repos = [
    {
      owner: 'jdoe',
      repo: 'neural-topology-mapping',
      isPublic: true,
      title: 'Topological Data Analysis in Deep Neural Networks: A Framework for Generalization',
      description: 'This repository contains the source code, datasets, and LaTeX manuscripts for exploring how topological features of neural network activation spaces correlate with model generalization capabilities across...',
      language: 'Python',
      langColor: '#3572A5',
      stars: '1.2k',
      commits: 342,
      updatedAt: '2h ago'
    },
    {
      owner: 's_chen',
      repo: 'crispr-cas9-offtarget',
      isPublic: true,
      title: 'Predictive Modeling of CRISPR-Cas9 Off-Target Cleavage Using Ensemble Learning',
      description: 'Comprehensive toolkit for predicting and analyzing potential off-target effects in CRISPR-Cas9 gene editing, utilizing a novel ensemble machine learning approach validated against in vivo datasets.',
      language: 'R',
      langColor: '#198CE7',
      stars: '856',
      commits: 128,
      updatedAt: '1d ago'
    },
    {
      owner: 'm_gupta',
      repo: 'quantum-error-correction',
      isPublic: false,
      title: 'Fault-Tolerant Quantum Error Correction Protocols for Superconducting Qubits',
      description: 'Simulations and theoretical frameworks for implementing scalable surface codes on noisy intermediate-scale quantum (NISQ) devices. Includes Qiskit integration modules.',
      language: 'Julia',
      langColor: '#a270ba',
      stars: '42',
      commits: 12,
      updatedAt: '3d ago'
    },
    {
      owner: 'urban-lab',
      repo: 'smart-city-mobility',
      isPublic: true,
      title: 'Spatiotemporal Analysis of Urban Mobility Patterns Post-Pandemic',
      description: 'Anonymized GIS datasets and spatial analysis scripts evaluating the long-term shifts in public transit utilization and micromobility adoption in major metropolitan areas.',
      language: 'Jupyter',
      langColor: '#DA5B0B',
      stars: '215',
      commits: 84,
      updatedAt: '1w ago'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-surface-container-lowest">
      {/* Search & Header Nav Integration is handled by TopNav usually, but let's make the hero stand out */}
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-16 border-b border-outline-variant pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              <Sparkles className="w-3 h-3" />
              AI-Powered Classification V2.0 Live
            </div>
            <h1 className="text-5xl font-black text-on-surface leading-[1.1] tracking-tight mb-6">
              The Future of <br />
              <span className="text-primary">Academic Versioning.</span>
            </h1>
            <p className="text-lg text-on-surface-variant font-medium leading-relaxed mb-8 max-w-xl">
              AI-powered classification for scholarly excellence. Streamline your research workflow with intelligent version control built specifically for academia.
            </p>
            <div className="flex items-center gap-4">
              <button 
                onClick={onExplore}
                className="bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all flex items-center gap-2 group"
              >
                Explore Repositories
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              {!isLoggedIn && (
                <button className="bg-white border border-outline-variant text-on-surface px-6 py-3 rounded-lg font-bold text-sm hover:bg-surface-container-low transition-all">
                  View Documentation
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-outline">Discipline</h4>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label key={cat.name} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${cat.checked ? 'bg-primary border-primary' : 'border-outline-variant group-hover:border-outline'}`}>
                        {cat.checked && <div className="w-2 h-2 bg-white rounded-sm" />}
                      </div>
                      <span className={`text-[13px] font-bold ${cat.checked ? 'text-on-surface' : 'text-on-surface-variant'}`}>{cat.name}</span>
                    </div>
                    <span className="text-[11px] font-black font-mono text-outline/60">{cat.count}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-outline">Publication Year</h4>
              <div className="relative">
                <select className="w-full appearance-none bg-surface-container-low border border-outline-variant rounded-md px-4 py-2.5 text-sm font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline-variant rotate-90" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-outline">Sort By</h4>
              <div className="relative">
                <select className="w-full appearance-none bg-surface-container-low border border-outline-variant rounded-md px-4 py-2.5 text-sm font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Most Citations</option>
                  <option>Recently Updated</option>
                  <option>Stars</option>
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline-variant rotate-90" />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2.5 text-lg font-black text-on-surface">
                <div className="p-1.5 bg-surface-container-high rounded border border-outline-variant">
                  <Folder className="w-4 h-4 text-primary" />
                </div>
                Browse Repositories
              </h2>
              <p className="text-xs font-bold text-on-surface-variant tracking-tight">
                Showing <span className="text-on-surface">1–12</span> of <span className="text-on-surface">14,204</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
              {repos.map((repo, idx) => (
                <RepoCard 
                  key={idx} 
                  owner={repo.owner}
                  repo={repo.repo}
                  isPublic={repo.isPublic}
                  title={repo.title}
                  description={repo.description}
                  language={repo.language}
                  langColor={repo.langColor}
                  stars={repo.stars}
                  commits={repo.commits}
                  updatedAt={repo.updatedAt}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 py-8 border-t border-outline-variant">
              <button className="p-2 border border-outline-variant rounded-md hover:bg-surface-container-low transition-colors disabled:opacity-30">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {[1, 2, 3, '...', 118].map((page, i) => (
                <button 
                  key={i}
                  className={`min-w-[32px] h-8 flex items-center justify-center rounded-md text-xs font-black transition-all ${
                    page === 1 ? 'bg-primary text-white shadow-md' : 'hover:bg-surface-container-low text-on-surface-variant'
                  } ${page === '...' ? 'cursor-default hover:bg-transparent' : ''}`}
                >
                  {page}
                </button>
              ))}
              <button className="p-2 border border-outline-variant rounded-md hover:bg-surface-container-low transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Mini Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-outline font-medium">
          © 2024 ThesisFlow. Built for scholarly authority and research precision.
        </p>
        <div className="flex items-center gap-6">
          {['Documentation', 'Terms of Service', 'Privacy Policy', 'Contact Support'].map(link => (
            <a key={link} href="#" className="text-[11px] font-bold text-on-surface-variant hover:text-primary transition-colors">{link}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
