import { createClient, SupabaseClient } from '@supabase/supabase-js';

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          role: 'student' | 'supervisor';
          avatar_url: string | null;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          role?: 'student' | 'supervisor';
          avatar_url?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          role?: 'student' | 'supervisor';
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      repositories: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          is_private: boolean;
          owner_id: string;
          status: 'draft' | 'pending_admin_review' | 'approved' | 'rejected';
          submitted_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          is_private?: boolean;
          owner_id: string;
          status?: 'draft' | 'pending_admin_review' | 'approved' | 'rejected';
          submitted_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          is_private?: boolean;
          owner_id?: string;
          status?: 'draft' | 'pending_admin_review' | 'approved' | 'rejected';
          submitted_at?: string | null;
          created_at?: string;
        };
      };
      commits: {
        Row: {
          id: string;
          repo_id: string;
          author_id: string;
          message: string;
          abstract: string | null;
          file_url: string | null;
          hash: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          repo_id: string;
          author_id: string;
          message: string;
          abstract?: string | null;
          file_url?: string | null;
          hash?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          repo_id?: string;
          author_id?: string;
          message?: string;
          abstract?: string | null;
          file_url?: string | null;
          hash?: string | null;
          created_at?: string;
        };
      };
      ai_insights: {
        Row: {
          id: string;
          commit_id: string;
          confidence_scores: any;
          similarity_score: number;
          quality_tier: string | null;
          keywords: string[];
          field_distribution_json: any;
          analyzed_at: string;
        };
        Insert: {
          id?: string;
          commit_id: string;
          confidence_scores: any;
          similarity_score?: number;
          quality_tier?: string | null;
          keywords?: string[];
          field_distribution_json?: any;
          analyzed_at?: string;
        };
        Update: {
          id?: string;
          commit_id?: string;
          confidence_scores?: any;
          similarity_score?: number;
          quality_tier?: string | null;
          keywords?: string[];
          field_distribution_json?: any;
          analyzed_at?: string;
        };
      };
    };
  };
};

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

// Lazy initialization to prevent crash on missing keys
let supabaseInstance: SupabaseClient<Database> | null = null;

export function getSupabase() {
  if (!supabaseInstance) {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase credentials missing. App is running in mock mode.');
      return null;
    }
    supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
}
