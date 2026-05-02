import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart2, 
  Key as KeyIcon, 
  BrainCircuit, 
  Network,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface AIInsightData {
  confidence_scores: Record<string, number>;
  keywords: string[];
  rationale: string;
  field_distribution: any[];
}

export function AIInsightsView({ data }: { data: AIInsightData | null }) {
  if (!data) return (
    <div className="h-96 flex items-center justify-center border border-outline-variant rounded-lg bg-surface-container-low text-on-surface-variant font-medium">
      No analysis data available for this version.
    </div>
  );

  const categories = Object.entries(data.confidence_scores).map(([label, value]) => ({
    label,
    value,
    active: value > 50
  })).sort((a, b) => b.value - a.value);

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <header className="flex flex-col gap-2 md:flex-row md:items-end justify-between border-b border-outline-variant pb-6 font-sans">
        <div>
          <nav className="flex items-center gap-2 text-on-surface-variant text-[11px] font-bold uppercase tracking-wider mb-2">
            <a href="#" className="hover:text-primary transition-colors">Project Space</a>
            <ChevronRight className="w-3.5 h-3.5" />
            <a href="#" className="hover:text-primary transition-colors">Repositories</a>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-black text-on-surface">AI Classification Breakdown</span>
          </nav>
          <h1 className="text-2xl font-bold text-on-surface tracking-tight">AI Classification Breakdown</h1>
          <p className="text-sm text-on-surface-variant mt-1 font-medium">Automated analysis of "Optimization Strategies in Deep Neural Networks"</p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <span className="px-3 py-1 bg-primary-container text-on-primary rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Analyzed 2 hrs ago
          </span>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Category Confidence */}
        <section className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 hover:bg-surface-bright transition-colors shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2.5">
              <BarChart2 className="w-5 h-5 text-primary" />
              Category Confidence
            </h2>
            <span className="font-mono text-[11px] text-on-surface-variant font-medium">Model: TF-Classify v2.1</span>
          </div>
          
          <div className="space-y-6">
            {categories.map((cat) => (
              <div key={cat.label} className="relative">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-on-surface">{cat.label}</span>
                  <span className={`text-[13px] font-bold ${cat.active ? 'text-primary' : 'text-on-surface-variant'}`}>{cat.value}%</span>
                </div>
                <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.value}%` }}
                    className={`h-full ${cat.active ? 'bg-primary' : 'bg-outline opacity-40'}`} 
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Extraction */}
        <section className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 hover:bg-surface-bright transition-colors shadow-sm">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2.5 mb-6">
            <KeyIcon className="w-5 h-5 text-primary" />
            Key Extraction
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {data.keywords.map((word, idx) => (
              <span 
                key={word} 
                className={`px-3 py-1 border border-outline-variant font-mono text-[12px] rounded-full transition-all cursor-default ${
                  idx < 5 
                    ? 'bg-surface-container-high text-on-surface font-semibold hover:bg-surface-container-highest' 
                    : 'bg-surface-container-low text-on-surface-variant opacity-70'
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        </section>

        {/* Rationale */}
        <section className="md:col-span-6 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 hover:bg-surface-bright transition-colors shadow-sm">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2.5 mb-5">
            <BrainCircuit className="w-5 h-5 text-primary" />
            Rationale
          </h2>
          <div className="space-y-5">
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {data.rationale}
            </p>
            <div className="bg-surface-container-low border-l-4 border-primary p-4 rounded-r-md">
              <p className="font-mono text-xs text-on-surface leading-normal text-wrap">
                <span className="text-primary font-bold uppercase text-[10px]">Evidence Engine:</span> Identified semantic convergence with standard optimization paradigms in modern deep learning research.
              </p>
            </div>
          </div>
        </section>

        {/* Field Distribution */}
        <section className="md:col-span-6 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 hover:bg-surface-bright transition-colors shadow-sm flex flex-col min-h-[380px]">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2.5 mb-6">
            <Network className="w-5 h-5 text-primary" />
            Field Distribution
          </h2>
          <div className="flex-grow bg-[#f1f4f9] border border-outline-variant rounded-md relative overflow-hidden group/map cursor-crosshair">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#8e9196 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            {/* Background Points */}
            <div className="absolute w-2 h-2 rounded-full bg-outline top-[30%] left-[25%] opacity-60" />
            <div className="absolute w-2 h-2 rounded-full bg-outline top-[60%] left-[65%] opacity-40" />
            <div className="absolute w-2 h-2 rounded-full bg-outline bottom-[20%] right-[30%] opacity-50" />
            <div className="absolute w-2 h-2 rounded-full bg-outline top-[45%] left-[80%] opacity-30" />
            <div className="absolute w-2 h-2 rounded-full bg-outline bottom-[15%] left-[45%] opacity-25" />
            
            {/* Target Highlight (Current Thesis) */}
            <div className="absolute top-[40%] left-[35%] flex flex-col items-center gap-2">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                className="w-4 h-4 rounded-full bg-primary border-4 border-white shadow-lg ring ring-primary/20 z-10" 
              />
              <div className="bg-white border border-outline-variant px-2 py-0.5 rounded shadow-md z-20 whitespace-nowrap">
                <p className="text-[10px] font-bold text-primary uppercase tracking-tight">Current Thesis</p>
              </div>
            </div>
            
            <p className="absolute bottom-4 right-4 font-mono text-[10px] text-on-surface-variant font-medium tracking-tight">
              Clustering against <span className="font-bold">1,204</span> CS theses
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
