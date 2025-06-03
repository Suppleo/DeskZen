import React, { useState } from 'react';
import { cn } from '../lib/utils';

type MoodSelectorProps = {
  onMoodSelected: (mood: string) => void;
  className?: string;
};

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelected, className }) => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [customMood, setCustomMood] = useState<string>('');

  const moods = [
    { name: 'Stressed', icon: '😫', color: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' },
    { name: 'Tired', icon: '😴', color: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' },
    { name: 'Bored', icon: '😐', color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' },
    { name: 'Happy', icon: '😊', color: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' },
    { name: 'Anxious', icon: '😰', color: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' },
  ];

  const handleMoodClick = (mood: string) => {
    setSelectedMood(mood);
    onMoodSelected(mood);
  };

  const handleCustomMoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customMood.trim()) {
      onMoodSelected(customMood);
      setSelectedMood('custom');
    }
  };

  return (
    <div className={cn("bg-white dark:bg-slate-800 rounded-xl shadow-md p-6", className)}>
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">How are you feeling right now?</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {moods.map((mood) => (
          <button
            key={mood.name}
            className={cn(
              "px-4 py-3 rounded-lg flex flex-col items-center justify-center hover:scale-105 transition-transform",
              mood.color,
              selectedMood === mood.name && "ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-slate-800"
            )}
            onClick={() => handleMoodClick(mood.name)}
          >
            <span className="text-xl mb-1">{mood.icon}</span>
            <span className="text-sm font-medium">{mood.name}</span>
          </button>
        ))}
      </div>
      
      <div className="relative">
        <form onSubmit={handleCustomMoodSubmit} className="flex">
          <input
            type="text"
            placeholder="Or describe how you feel..."
            value={customMood}
            onChange={(e) => setCustomMood(e.target.value)}
            className={cn(
              "flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-l-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
              selectedMood === 'custom' && "ring-2 ring-blue-500"
            )}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-r-lg hover:from-blue-600 hover:to-teal-600"
          >
            Go
          </button>
        </form>
      </div>
    </div>
  );
};

export default MoodSelector;