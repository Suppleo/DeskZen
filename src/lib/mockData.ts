import { supabase } from './supabase';

// This function simulates setting up initial data in Supabase
// In a real app, this would be done with actual Supabase migrations
export const initializeMockData = async () => {
  // Check if we've already initialized to prevent duplicate data
  const initialized = localStorage.getItem('deskzen_data_initialized');
  if (initialized === 'true') return;

  try {
    // Activities data
    const activitiesData = [
      {
        id: 1,
        title: 'Quick Shoulder Stretch',
        description: 'Roll your shoulders backward and forward 10 times. Then, gently tilt your head toward each shoulder for a neck stretch.',
        category: 'physical'
      },
      {
        id: 2,
        title: 'Gratitude Moment',
        description: 'Take a deep breath and write down 3 things you\'re grateful for right now.',
        category: 'mental'
      },
      {
        id: 3,
        title: 'Creative Break',
        description: 'Grab a piece of paper and doodle something that represents how you\'re feeling right now.',
        category: 'creative'
      },
      {
        id: 4,
        title: 'Productivity Reset',
        description: 'Clear your workspace and write down your top 3 priorities for the rest of the day.',
        category: 'productivity'
      },
      {
        id: 5,
        title: 'Breathing Exercise',
        description: 'Breathe in for 4 counts, hold for 4, and exhale for 6 counts. Repeat 5 times to reset your nervous system.',
        category: 'mental'
      }
    ];

    // Badges data
    const badgesData = [
      {
        id: 1,
        name: 'Zen Novice',
        description: 'Completed your first DeskZen activity'
      },
      {
        id: 2,
        name: 'Level 1 Explorer',
        description: 'Completed the first level of Story Mode'
      }
    ];

    // Mock data for Client-side
    // In a real app, we would be creating actual Supabase tables
    window.localStorage.setItem('deskzen_activities', JSON.stringify(activitiesData));
    window.localStorage.setItem('deskzen_badges', JSON.stringify(badgesData));
    window.localStorage.setItem('deskzen_data_initialized', 'true');

    console.log('Mock data initialized for DeskZen PoC');
  } catch (error) {
    console.error('Error initializing mock data:', error);
  }
};

// Client-side mock implementation of Supabase functions
export const mockFetchRandomActivity = async (category?: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const activities = JSON.parse(localStorage.getItem('deskzen_activities') || '[]');
    
    let filteredActivities = activities;
    if (category) {
      filteredActivities = activities.filter((a: any) => a.category === category);
    }
    
    // Return random activity
    if (filteredActivities.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredActivities.length);
      return filteredActivities[randomIndex];
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching random activity:', error);
    return null;
  }
};

export const mockGetBadgeById = async (id: number) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    const badges = JSON.parse(localStorage.getItem('deskzen_badges') || '[]');
    return badges.find((b: any) => b.id === id) || null;
  } catch (error) {
    console.error('Error fetching badge:', error);
    return null;
  }
};

// Mock user progress
export const mockUpdateUserProgress = async (userId: string, level: number, mana: number) => {
  try {
    const key = `deskzen_user_progress_${userId}`;
    localStorage.setItem(key, JSON.stringify({ user_id: userId, level, mana }));
    return true;
  } catch (error) {
    console.error('Error updating user progress:', error);
    return false;
  }
};

export const mockGetUserProgress = async (userId: string) => {
  try {
    const key = `deskzen_user_progress_${userId}`;
    const data = JSON.parse(localStorage.getItem(key) || 'null');
    return data || { user_id: userId, level: 1, mana: 2 }; // Default values
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return { user_id: userId, level: 1, mana: 2 };
  }
};