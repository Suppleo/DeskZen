import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share2, Trophy } from 'lucide-react';
import ActivityCard from '../components/ActivityCard';
import { cn, shareContent } from '../lib/utils';
import { mockFetchRandomActivity } from '../lib/mockData';

type Activity = {
  id: number;
  title: string;
  description: string;
  category: string;
};

type LeaderboardEntry = {
  name: string;
  score: number;
};

// Mock leaderboard data
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { name: 'User1', score: 3 },
  { name: 'User2', score: 2 },
  { name: 'User3', score: 1 },
];

const ChallengePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [customActivityTitle, setCustomActivityTitle] = useState('');
  const [customActivityDescription, setCustomActivityDescription] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    // Load activities
    const loadActivities = async () => {
      const activitiesList = [];
      for (let i = 0; i < 5; i++) {
        const activity = await mockFetchRandomActivity();
        if (activity) activitiesList.push(activity);
      }
      setActivities(activitiesList);
    };

    loadActivities();

    // If we have a challenge ID, show the leaderboard
    if (id) {
      setShowLeaderboard(true);
      
      // In a real app, we would fetch the specific challenge
      // For this PoC, we'll just use mock data
      const mockActivity = {
        id: 999,
        title: "Team Challenge",
        description: "Complete 3 deep breathing exercises during your work day and track your progress.",
        category: "mental"
      };
      
      setSelectedActivity(mockActivity);
    }
  }, [id]);

  const handleActivitySelect = (activity: Activity) => {
    setSelectedActivity(activity);
    setCustomActivityTitle('');
    setCustomActivityDescription('');
  };

  const handleCreateChallenge = () => {
    let activity;
    
    if (selectedActivity) {
      activity = selectedActivity;
    } else if (customActivityTitle && customActivityDescription) {
      activity = {
        id: Date.now(),
        title: customActivityTitle,
        description: customActivityDescription,
        category: 'custom'
      };
    } else {
      return; // No activity selected or created
    }
    
    // Generate a unique ID for the challenge
    const challengeId = `challenge-${Date.now()}`;
    
    // In a real app, we would save this to Supabase
    // For this PoC, we'll just generate a URL
    const challengeUrl = `${window.location.origin}/challenge/${challengeId}`;
    setGeneratedLink(challengeUrl);
  };

  const handleShare = async () => {
    if (!generatedLink) return;
    
    const success = await shareContent(
      'DeskZen Challenge',
      'Join my DeskZen challenge and improve your workplace wellness!',
      generatedLink
    );
    
    if (success) {
      alert('Challenge shared successfully!');
    } else {
      alert('Link copied to clipboard');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
        <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
          Social Challenge
        </span>
      </h1>

      {showLeaderboard ? (
        <div className="grid gap-8">
          <ActivityCard activity={selectedActivity} />
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <Trophy className="h-6 w-6 text-amber-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Challenge Leaderboard</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-200 dark:border-slate-700">
                    <th className="pb-3 text-gray-600 dark:text-gray-400">Name</th>
                    <th className="pb-3 text-gray-600 dark:text-gray-400 text-right">Completions</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_LEADERBOARD.map((entry, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-slate-700">
                      <td className="py-3 font-medium text-gray-800 dark:text-white">{entry.name}</td>
                      <td className="py-3 text-right text-gray-800 dark:text-white">{entry.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <button
              className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-lg flex items-center justify-center"
              onClick={() => navigate('/challenge')}
            >
              Create Your Own Challenge
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Create a Challenge</h2>
            
            {!generatedLink ? (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Select an activity:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activities.map((activity) => (
                      <button
                        key={activity.id}
                        className={cn(
                          "text-left p-3 rounded-lg border",
                          selectedActivity?.id === activity.id
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                        )}
                        onClick={() => handleActivitySelect(activity)}
                      >
                        <h4 className="font-medium text-gray-800 dark:text-white">{activity.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{activity.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Or create your own:</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Activity title"
                      value={customActivityTitle}
                      onChange={(e) => {
                        setCustomActivityTitle(e.target.value);
                        setSelectedActivity(null);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="Activity description..."
                      value={customActivityDescription}
                      onChange={(e) => {
                        setCustomActivityDescription(e.target.value);
                        setSelectedActivity(null);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    />
                  </div>
                </div>
                
                <button
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-lg font-medium"
                  onClick={handleCreateChallenge}
                  disabled={!selectedActivity && (!customActivityTitle || !customActivityDescription)}
                >
                  Generate Challenge Link
                </button>
              </>
            ) : (
              <div className="text-center py-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Your challenge is ready to share!</h3>
                
                <div className="bg-gray-100 dark:bg-slate-700 rounded-lg p-3 mb-6">
                  <p className="text-gray-800 dark:text-white break-all">{generatedLink}</p>
                </div>
                
                <button
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-lg flex items-center justify-center mx-auto"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  <span>Share Challenge</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengePage;