/*
# DeskZen Supabase Schema

This file contains the SQL statements to set up the required tables for the DeskZen application.

## Tables:
1. activities - Stores the micro-break activities
2. badges - Stores achievement badges that users can earn
3. users - Stores user preferences and progress
4. story_progress - Stores user progress in Story Mode
*/

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('physical', 'creative', 'mental', 'productivity'))
);

-- Create badges table
CREATE TABLE IF NOT EXISTS badges (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  theme_id INTEGER DEFAULT 1,
  mood TEXT,
  badge_id INTEGER REFERENCES badges(id),
  story_level INTEGER DEFAULT 1,
  mana INTEGER DEFAULT 2
);

-- Create story_progress table
CREATE TABLE IF NOT EXISTS story_progress (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  level INTEGER DEFAULT 1,
  mana INTEGER DEFAULT 2
);

-- Insert sample activities
INSERT INTO activities (title, description, category) VALUES
('Quick Shoulder Stretch', 'Roll your shoulders backward and forward 10 times. Then, gently tilt your head toward each shoulder for a neck stretch.', 'physical'),
('Gratitude Moment', 'Take a deep breath and write down 3 things you''re grateful for right now.', 'mental'),
('Creative Break', 'Grab a piece of paper and doodle something that represents how you''re feeling right now.', 'creative'),
('Productivity Reset', 'Clear your workspace and write down your top 3 priorities for the rest of the day.', 'productivity'),
('Breathing Exercise', 'Breathe in for 4 counts, hold for 4, and exhale for 6 counts. Repeat 5 times to reset your nervous system.', 'mental');

-- Insert badges
INSERT INTO badges (name, description) VALUES
('Zen Novice', 'Completed your first DeskZen activity'),
('Level 1 Explorer', 'Completed the first level of Story Mode');

-- Create RLS policies
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_progress ENABLE ROW LEVEL SECURITY;

-- Allow public read access to activities and badges
CREATE POLICY "Public can read activities" ON activities FOR SELECT USING (true);
CREATE POLICY "Public can read badges" ON badges FOR SELECT USING (true);

-- User data policies
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- Story progress policies
CREATE POLICY "Users can read own story progress" ON story_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own story progress" ON story_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own story progress" ON story_progress FOR INSERT WITH CHECK (auth.uid() = user_id);