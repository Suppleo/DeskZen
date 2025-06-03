import React, { useState, useEffect, useRef } from 'react';
import { RefreshCcw } from 'lucide-react';
import ActivityCard from '../components/ActivityCard';
import MoodSelector from '../components/MoodSelector';
import BadgeCard from '../components/BadgeCard';
import { mapMoodToCategory, getUserId } from '../lib/utils';
import { mockFetchRandomActivity, mockGetBadgeById } from '../lib/mockData';

type Activity = {
  id: number;
  title: string;
  description: string;
  category: string;
};

type Badge = {
  id: number;
  name: string;
  description: string;
};

const HomePage = () => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [completedActivity, setCompletedActivity] = useState(false);
  const [badge, setBadge] = useState<Badge | null>(null);
  const firstLoadRef = useRef(true);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Check if this is the first time user is completing an activity
    const hasCompletedActivity = localStorage.getItem('deskzen_completed_activity');
    
    // Apply animation to heading
    if (headingRef.current) {
      import('gsap').then(({ gsap }) => {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }).catch(err => console.error('Could not load GSAP:', err));
    }
    
    if (firstLoadRef.current) {
      firstLoadRef.current = false;
      fetchRandomActivity();
    }
  }, []);

  const fetchRandomActivity = async (category?: string) => {
    setIsLoading(true);
    setCompletedActivity(false);
    
    try {
      const data = await mockFetchRandomActivity(category);
      setActivity(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoodSelected = async (mood: string) => {
    const category = mapMoodToCategory(mood);
    fetchRandomActivity(category);
  };

  const handleCompleteActivity = async () => {
    setCompletedActivity(true);
    
    // Check if this is the first completed activity
    const hasCompletedActivity = localStorage.getItem('deskzen_completed_activity');
    
    if (!hasCompletedActivity) {
      // Award first-time badge
      const zenNoviceBadge = await mockGetBadgeById(1);
      if (zenNoviceBadge) {
        setBadge(zenNoviceBadge);
        setShowBadge(true);
        
        // Save to localStorage for this PoC
        // In a real app, this would be saved in Supabase
        localStorage.setItem('deskzen_completed_activity', 'true');
        localStorage.setItem('deskzen_user_badge', JSON.stringify(zenNoviceBadge));
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 
        ref={headingRef}
        className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-8 opacity-0"
      >
        Take a moment to <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">breathe & reset</span>
      </h1>
      
      <div className="grid gap-8">
        <MoodSelector onMoodSelected={handleMoodSelected} />
        
        <div className="text-center mb-2">
          <p className="text-gray-600 dark:text-gray-400">
            Or just take a random micro-break:
          </p>
        </div>
        
        <div className="flex justify-center">
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-full flex items-center space-x-2 transform hover:scale-105 transition duration-200 shadow-md"
            onClick={() => fetchRandomActivity()}
            disabled={isLoading}
          >
            <RefreshCcw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Generate Activity</span>
          </button>
        </div>
        
        <div className="mt-6">
          {completedActivity ? (
            <div className="text-center py-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Great job completing your activity!
              </h2>
              <button
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-full flex items-center space-x-2 transform hover:scale-105 transition duration-200 shadow-md mx-auto"
                onClick={() => fetchRandomActivity()}
              >
                <RefreshCcw className="h-5 w-5" />
                <span>Try Another Activity</span>
              </button>
            </div>
          ) : (
            <ActivityCard 
              activity={activity} 
              isLoading={isLoading}
              onComplete={handleCompleteActivity}
            />
          )}
        </div>
        
        {showBadge && badge && (
          <div className="mt-8 animate-fadeIn">
            <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
              🎉 You've earned a badge!
            </h2>
            <BadgeCard badge={badge} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;