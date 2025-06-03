import React, { useEffect, useRef } from 'react';
import { Award, Share2 } from 'lucide-react';
import { cn, fadeInElement, shareContent } from '../lib/utils';

type Badge = {
  id: number;
  name: string;
  description: string;
};

type BadgeCardProps = {
  badge: Badge;
  className?: string;
  showShare?: boolean;
};

const BadgeCard: React.FC<BadgeCardProps> = ({
  badge,
  className,
  showShare = true
}) => {
  const badgeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (badgeRef.current) {
      fadeInElement(badgeRef.current, 0.3);
    }
  }, []);

  const handleShare = async () => {
    await shareContent(
      `DeskZen Achievement: ${badge.name}`,
      `I just earned the "${badge.name}" badge on DeskZen! ${badge.description}`
    );
  };

  return (
    <div 
      ref={badgeRef}
      className={cn(
        "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-700 rounded-xl shadow-md p-6 max-w-sm mx-auto border border-amber-100 dark:border-slate-600 opacity-0",
        className
      )}
    >
      <div className="flex items-center justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 flex items-center justify-center text-white">
          <Award className="h-10 w-10" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-300 text-center mb-2">
        {badge.name}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
        {badge.description}
      </p>
      
      {showShare && (
        <button
          className="w-full py-2 bg-white dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg border border-gray-200 dark:border-slate-600 flex items-center justify-center transition duration-200"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 mr-2" />
          <span>Share Achievement</span>
        </button>
      )}
    </div>
  );
};

export default BadgeCard;