import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ChallengePage from './pages/ChallengePage';
import StoryPage from './pages/StoryPage';
import NotFoundPage from './pages/NotFoundPage';

// Mock data initialization for Supabase
import { initializeMockData } from './lib/mockData';

function App() {
  const { theme } = useTheme();

  // Initialize mock data on first load
  useEffect(() => {
    initializeMockData();
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-b from-blue-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 ${theme}`}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/challenge" element={<ChallengePage />} />
          <Route path="/challenge/:id" element={<ChallengePage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;