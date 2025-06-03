import React, { useState, useEffect, useRef } from 'react';
import { RefreshCcw, BookOpen } from 'lucide-react';
import ActivityCard from '../components/ActivityCard';
import StoryProgress from '../components/StoryProgress';
import BadgeCard from '../components/BadgeCard';
import { getUserId } from '../lib/utils';
import { 
  mockFetchRandomActivity, 
  mockGetUserProgress, 
  mockUpdateUserProgress,
  mockGetBadgeById 
} from '../lib/mockData';

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

const STORY_LEVELS = [
  {
    level: 1,
    title: "The Forest of Calm",
    description: "You find yourself at the edge of a serene forest. The gentle rustle of leaves and distant sound of a stream beckon you forward. As you step into the forest, you feel the weight of the outside world begin to lift from your shoulders."
  },
  {
    level: 2,
    title: "The Crystal Cave",
    description: "Beyond the forest lies a hidden cave filled with luminescent crystals. Their soft glow creates patterns of light that dance across the walls, inviting you to pause and observe their rhythmic movements."
  }
];

const MAX_MANA = 2;

const StoryPage = () => {
  const [userProgress, setUserProgress] = useState({ level: 1, mana: MAX_MANA });
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBadge, setShowBadge] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState<Badge | null>(null);
  const userId = getUserId();
  const storyRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadUserProgress = async () => {
      const progress = await mockGetUserProgress(userId);
      setUserProgress({
        level: progress.level || 1,
        mana: progress.mana || MAX_MANA
      });
      setIsLoading(false);
    };
    
    loadUserProgress();
    fetchRandomActivity();
    
    // Animate the story text
    if (storyRef.current) {
      import('gsap').then(({ gsap }) => {
        gsap.fromTo(
          storyRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, delay: 0.5 }
        );
      }).catch(err => console.error('Could not load GSAP:', err));
    }
  }, [userId]);

  const fetchRandomActivity = async () => {
    setIsLoading(true);
    try {
      const data = await mockFetchRandomActivity();
      setCurrentActivity(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteActivity = async () => {
    if (userProgress.mana <= 0) {
      alert("You don't have enough mana to complete this activity. Please reset your mana.");
      return;
    }
    
    // Update mana
    const newMana = userProgress.mana - 1;
    
    // Check if level should increase
    let newLevel = userProgress.level;
    let shouldAwardBadge = false;
    
    if (newMana === 0 && userProgress.level === 1) {
      // Level up
      newLevel = 2;
      shouldAwardBadge = true;
    }
    
    // Update user progress
    await mockUpdateUserProgress(userId, newLevel, newMana);
    
    setUserProgress({
      level: newLevel,
      mana: newMana
    });
    
    // Award badge for completing level 1
    if (shouldAwardBadge) {
      const badge = await mockGetBadgeById(2); // Level 1 Explorer badge
      if (badge) {
        setEarnedBadge(badge);
        setShowBadge(true);
      }
    }
    
    // Clear current activity
    setCurrentActivity(null);
  };

  const handleResetMana = async () => {
    await mockUpdateUserProgress(userId, userProgress.level, MAX_MANA);
    setUserProgress({
      ...userProgress,
      mana: MAX_MANA
    });
    fetchRandomActivity();
  };

  const getCurrentLevelData = () => {
    return STORY_LEVELS[userProgress.level - 1] || STORY_LEVELS[0];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
        <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Journey to Serenity
        </span>
      </h1>
      
      <div className="grid gap-8">
        <StoryProgress 
          level={userProgress.level} 
          mana={userProgress.mana}
          maxMana={MAX_MANA}
        />
        
        <div 
          ref={storyRef}
          className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-slate-800/50 dark:to-slate-700/50 border border-amber-100 dark:border-slate-600 rounded-xl p-6 shadow-md opacity-0"
        >
          <div className="flex items-start mb-4">
            <BookOpen className="h-6 w-6 text-amber-600 dark:text-amber-400 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold text-amber-800 dark:text-amber-300 mb-2">
                {getCurrentLevelData().title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {getCurrentLevelData().description}
              </p>
            </div>
          </div>
        </div>
        
        {userProgress.mana > 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Complete an activity to progress
            </h2>
            
            {currentActivity ? (
              <ActivityCard 
                activity={currentActivity}
                isLoading={isLoading}
                onComplete={handleCompleteActivity}
              />
            ) : (
              <div className="flex justify-center mt-4">
                <button
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-full flex items-center transform hover:scale-105 transition duration-200 shadow-md"
                  onClick={fetchRandomActivity}
                  disabled={isLoading}
                >
                  <RefreshCcw className={`h-5 w-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Get an Activity</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Out of Mana
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You've used all your mana for now. Reset to continue your journey.
            </p>
            <button
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg"
              onClick={handleResetMana}
            >
              Reset Mana
            </button>
          </div>
        )}
        
        {showBadge && earnedBadge && (
          <div className="mt-4 animate-fadeIn">
            <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
              🎉 You've earned a badge!
            </h2>
            <BadgeCard badge={earnedBadge} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryPage;