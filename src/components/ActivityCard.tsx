import React, { useEffect, useRef } from 'react';
import { ArrowRight, Share2 } from 'lucide-react';
import { cn, fadeInElement, shareContent } from '../lib/utils';

type Activity = {
  id: number;
  title: string;
  description: string;
  category: string;
};

type ActivityCardProps = {
  activity: Activity | null;
  isLoading?: boolean;
  onComplete?: () => void;
  className?: string;
};

const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  isLoading = false,
  onComplete,
  className
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isLoading && activity && cardRef.current) {
      fadeInElement(cardRef.current);
    }
  }, [isLoading, activity]);

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'physical':
        return 'from-blue-400 to-teal-400 dark:from-blue-500 dark:to-teal-500';
      case 'mental':
        return 'from-indigo-400 to-purple-400 dark:from-indigo-500 dark:to-purple-500';
      case 'creative':
        return 'from-orange-400 to-amber-400 dark:from-orange-500 dark:to-amber-500';
      case 'productivity':
        return 'from-emerald-400 to-green-400 dark:from-emerald-500 dark:to-green-500';
      default:
        return 'from-blue-400 to-indigo-400 dark:from-blue-500 dark:to-indigo-500';
    }
  };

  const handleShare = async () => {
    if (!activity) return;
    
    await shareContent(
      'DeskZen Activity',
      `I just completed "${activity.title}" on DeskZen! Take a break and try it yourself.`
    );
  };

  if (isLoading) {
    return (
      <div className={cn("bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 max-w-md mx-auto animate-pulse", className)}>
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2 w-full"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2 w-full"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg mt-6 w-full"></div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className={cn("bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 text-center max-w-md mx-auto", className)}>
        <p className="text-gray-600 dark:text-gray-400">No activity available. Try generating a new one!</p>
      </div>
    );
  }

  return (
    <div 
      ref={cardRef} 
      className={cn(
        "bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden max-w-md mx-auto opacity-0",
        className
      )}
    >
      <div className={`h-2 bg-gradient-to-r ${getCategoryColor(activity.category)}`}></div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {activity.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {activity.description}
        </p>
        
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-lg flex items-center space-x-1 transform hover:scale-105 transition duration-200"
            onClick={onComplete}
          >
            <span>Complete</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
          
          <button
            className="px-4 py-2 bg-white dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg border border-gray-200 dark:border-slate-600 flex items-center transition duration-200"
            onClick={handleShare}
            aria-label="Share this activity"
          >
            <Share2 className="h-4 w-4 mr-1" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;