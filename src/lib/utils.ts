import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Map mood to category
export function mapMoodToCategory(mood: string): string {
  const moodMap: Record<string, string> = {
    'stressed': 'mental',
    'anxious': 'mental',
    'overwhelmed': 'mental',
    'tired': 'physical',
    'exhausted': 'physical',
    'bored': 'creative',
    'uninspired': 'creative',
    'unfocused': 'productivity',
    'distracted': 'productivity',
    'happy': 'creative',
    'energetic': 'physical'
  };
  
  return moodMap[mood.toLowerCase()] || 'mental'; // Default to mental activities
}

// User ID helper (for demo purposes)
export function getUserId(): string {
  let userId = localStorage.getItem('deskzen_user_id');
  if (!userId) {
    userId = `user_${Math.random().toString(36).substring(2, 11)}`;
    localStorage.setItem('deskzen_user_id', userId);
  }
  return userId;
}

// Theme helper
export function getThemePreference(): 'light' | 'dark' {
  const savedTheme = localStorage.getItem('deskzen_theme') as 'light' | 'dark' | null;
  return savedTheme || 'light';
}

// Save theme preference
export function saveThemePreference(theme: 'light' | 'dark'): void {
  localStorage.setItem('deskzen_theme', theme);
}

// Share content (badge, challenge, etc.)
export async function shareContent(title: string, text: string, url?: string): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url: url || window.location.href
      });
      return true;
    } catch (error) {
      console.error('Error sharing:', error);
      return false;
    }
  }
  // Fallback - copy to clipboard
  try {
    await navigator.clipboard.writeText(`${title}\n${text}\n${url || window.location.href}`);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
}

// Animation helper for GSAP
export function fadeInElement(element: HTMLElement, delay: number = 0.2): void {
  import('gsap').then(({ gsap }) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, delay }
    );
  }).catch(err => console.error('Could not load GSAP:', err));
}