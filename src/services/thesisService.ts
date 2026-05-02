import { getSupabase } from '../lib/supabase';

export interface Repository {
  id: string;
  name: string;
  description: string;
  is_private: boolean;
  primary_language: string;
  owner_id: string;
}

export interface Commit {
  id: string;
  message: string;
  abstract: string;
  hash: string;
  created_at: string;
}

export interface AIInsight {
  confidence_scores: Record<string, number>;
  keywords: string[];
  rationale: string;
  field_distribution: any[];
}

export const thesisService = {
  async getRepositories(): Promise<Repository[]> {
    const supabase = getSupabase();
    if (!supabase) return mockRepositories;

    const { data, error } = await supabase
      .from('repositories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getLatestCommit(repoId: string): Promise<Commit | null> {
    const supabase = getSupabase();
    if (!supabase) return mockCommits[0];

    const { data, error } = await supabase
      .from('commits')
      .select('*')
      .eq('repo_id', repoId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) return null;
    return data;
  },

  async getAIInsights(commitId: string): Promise<AIInsight | null> {
    const supabase = getSupabase();
    if (!supabase) return mockInsights;

    const { data, error } = await supabase
      .from('ai_insights')
      .select('*')
      .eq('commit_id', commitId)
      .single();

    if (error || !data) return null;
    const insightData = data as any;
    return {
      confidence_scores: insightData.confidence_scores,
      keywords: insightData.keywords,
      rationale: insightData.rationale,
      field_distribution: insightData.field_distribution_json
    };
  }
};

const mockRepositories = [
  { id: '1', name: 'deep-learning-thesis', description: 'Optimization Strategies in DNNs', is_private: false, primary_language: 'Python', owner_id: 'u1' }
];

const mockCommits = [
  { id: 'c1', message: 'Update abstract and intro', abstract: '...', hash: 'ab3f9d2', created_at: new Date().toISOString() }
];

const mockInsights = {
  confidence_scores: { 'Neural Networks': 92, 'Optimization Theory': 78, 'Computational Mathematics': 45, 'Data Structures': 12 },
  keywords: ['Backpropagation', 'Gradient Descent', 'Stochastic', 'Loss Function', 'Hyperparameters'],
  rationale: 'The primary classification is driven by high-frequency appearances of specific mathematical formulations...',
  field_distribution: []
};
