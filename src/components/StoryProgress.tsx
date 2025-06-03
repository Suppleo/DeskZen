import React, { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

type StoryProgressProps = {
  level: number;
  mana: number;
  maxMana: number;
  className?: string;
};

const StoryProgress: React.FC<StoryProgressProps> = ({
  level,
  mana,
  maxMana,
  className
}) => {
  const [animatedMana, setAnimatedMana] = useState(0);
  
  // Animate mana value
  useEffect(() => {
    const duration = 1000; // 1 second
    const interval = 20; // 20ms between frames
    const steps = duration / interval;
    const increment = mana / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= mana) {
        clearInterval(timer);
        setAnimatedMana(mana);
      } else {
        setAnimatedMana(current);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [mana]);

  return (
    <div className={cn("bg-white dark:bg-slate-800 rounded-xl shadow-md p-6", className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          Level {level}
        </h3>
        
        <div className="flex items-center">
          <div className="text-blue-500 mr-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6V18M7 11L17 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-lg font-medium text-blue-500">{Math.floor(animatedMana)}/{maxMana} Mana</span>
        </div>
      </div>
      
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(animatedMana / maxMana) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StoryProgress;