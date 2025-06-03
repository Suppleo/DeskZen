import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';
import { useState } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/challenge', label: 'Challenge' },
    { href: '/story', label: 'Story Mode' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
              DeskZen
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors",
                  location.pathname === link.href && "font-medium text-blue-500 dark:text-blue-400"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-slate-700" />
              )}
            </button>
            
            {/* Mobile menu button */}
            <button
              className="ml-4 p-2 rounded-full md:hidden hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-800 shadow-md pb-4">
            <nav className="flex flex-col space-y-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "py-2 text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors",
                    location.pathname === link.href && "font-medium text-blue-500 dark:text-blue-400"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-white dark:bg-slate-800 shadow-inner py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© 2025 DeskZen - A Proof of Concept for workplace wellness</p>
          <p className="mt-2">Take a moment. Breathe. Reset.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;