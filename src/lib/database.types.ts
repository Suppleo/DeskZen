export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      activities: {
        Row: {
          id: number
          title: string
          description: string
          category: 'physical' | 'creative' | 'mental' | 'productivity'
        }
        Insert: {
          id?: number
          title: string
          description: string
          category: 'physical' | 'creative' | 'mental' | 'productivity'
        }
        Update: {
          id?: number
          title?: string
          description?: string
          category?: 'physical' | 'creative' | 'mental' | 'productivity'
        }
      }
      users: {
        Row: {
          id: string
          theme_id: number
          mood: string | null
          badge_id: number | null
          story_level: number
          mana: number
        }
        Insert: {
          id: string
          theme_id?: number
          mood?: string | null
          badge_id?: number | null
          story_level?: number
          mana?: number
        }
        Update: {
          id?: string
          theme_id?: number
          mood?: string | null
          badge_id?: number | null
          story_level?: number
          mana?: number
        }
      }
      badges: {
        Row: {
          id: number
          name: string
          description: string
        }
        Insert: {
          id?: number
          name: string
          description: string
        }
        Update: {
          id?: number
          name?: string
          description?: string
        }
      }
      story_progress: {
        Row: {
          user_id: string
          level: number
          mana: number
        }
        Insert: {
          user_id: string
          level?: number
          mana?: number
        }
        Update: {
          user_id?: string
          level?: number
          mana?: number
        }
      }
    }
  }
}