import { getSupabase } from '../lib/supabase';

export interface Profile {
  id: string;
  display_name: string | null;
  role: 'student' | 'supervisor';
  avatar_url: string | null;
  updated_at: string;
}

export interface Repository {
  id: string;
  name: string;
  description: string | null;
  is_private: boolean;
  owner_id: string;
  status: 'draft' | 'pending_admin_review' | 'approved' | 'rejected';
  submitted_at: string | null;
  created_at: string;
}

export interface Commit {
  id: string;
  repo_id: string;
  author_id: string;
  message: string;
  abstract: string | null;
  file_url: string | null;
  hash: string | null;
  created_at: string;
}

export interface AIInsight {
  id: string;
  commit_id: string;
  confidence_scores: Record<string, number>;
  similarity_score: number;
  quality_tier: string | null;
  keywords: string[];
  field_distribution_json: any[];
  analyzed_at: string;
}

export const thesisService = {
  async getRepositories(userId: string): Promise<Repository[]> {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase client not initialized');

    const { data, error } = await supabase
      .from('repositories')
      .select('*')
      .eq('owner_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Repository[];
  },

  async getLatestCommit(repoId: string): Promise<Commit | null> {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase client not initialized');

    const { data, error } = await supabase
      .from('commits')
      .select('*')
      .eq('repo_id', repoId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) return null;
    return data as Commit;
  },

  async getAIInsights(commitId: string): Promise<AIInsight | null> {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase client not initialized');

    const { data, error } = await (supabase.from('ai_insights') as any)
      .select('*')
      .eq('commit_id', commitId)
      .single();

    if (error || !data) return null;
    return data as AIInsight;
  },

  async submitThesis(repoId: string): Promise<void> {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase client not initialized');

    const status: 'pending_admin_review' = 'pending_admin_review';
    const submitted_at = new Date().toISOString();

    const { error } = await (supabase.from('repositories') as any)
      .update({ 
        status, 
        submitted_at 
      })
      .eq('id', repoId);

    if (error) throw error;
  },

  async getPendingRepositories(): Promise<any[]> {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase client not initialized');

    const { data, error } = await (supabase.from('repositories') as any)
      .select(`
        *,
        profiles (display_name),
        commits (
          id,
          ai_insights (similarity_score, quality_tier)
        )
      `)
      .eq('status', 'pending_admin_review');

    if (error) throw error;
    return data;
  },

  async approveThesis(repoId: string): Promise<void> {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase client not initialized');

    const { error } = await (supabase.from('repositories') as any)
      .update({ status: 'approved' })
      .eq('id', repoId);

    if (error) throw error;
  },

  async getUserProfile(userId: string): Promise<Profile | null> {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase client not initialized');

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) return null;
    return data as Profile;
  }
};
