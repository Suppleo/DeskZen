import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// These values should come from environment variables in a production app
// For this PoC, we're using placeholders that would be replaced with actual values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const fetchRandomActivity = async (category?: string) => {
  try {
    let query = supabase
      .from('activities')
      .select('*');
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query
      .order('id') // Using a consistent order for the LIMIT/OFFSET pattern
      .limit(1)
      .offset(Math.floor(Math.random() * 5)); // Simple random selection from our 5 hardcoded activities
    
    if (error) throw error;
    return data?.[0] || null;
  } catch (error) {
    console.error('Error fetching random activity:', error);
    return null;
  }
};

export const getBadgeById = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('badges')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching badge:', error);
    return null;
  }
};

export const updateUserProgress = async (userId: string, level: number, mana: number) => {
  try {
    const { error } = await supabase
      .from('story_progress')
      .upsert(
        { user_id: userId, level, mana },
        { onConflict: 'user_id' }
      );
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating user progress:', error);
    return false;
  }
};

export const getUserProgress = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('story_progress')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"
    
    // Return default values if no data found
    return data || { user_id: userId, level: 1, mana: 2 };
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return { user_id: userId, level: 1, mana: 2 };
  }
};