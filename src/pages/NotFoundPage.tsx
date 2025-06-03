import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-6xl font-bold text-gray-200 dark:text-gray-700">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-4 mb-6">
        Page not found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved. 
        Take a deep breath and let's head back home.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-lg flex items-center transition-all hover:shadow-lg"
      >
        <Home className="h-5 w-5 mr-2" />
        <span>Go Home</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;