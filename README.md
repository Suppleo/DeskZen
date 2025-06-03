# DeskZen - PoC

DeskZen is a browser-based web application designed to reduce workplace stress through quick, desk-friendly micro-break activities. This repository contains the Proof of Concept (PoC) implementation.

## Demo Link

Demo deployed on Netlify: [https://boisterous-arithmetic-e60dcb.netlify.app/](https://boisterous-arithmetic-e60dcb.netlify.app/)

## Project Overview

DeskZen delivers 1-3 minute micro-break activities like shoulder stretches, breathing exercises, and creative prompts to enhance mental well-being during the workday. The PoC includes:

1. Micro-Break Generator
2. AI-Driven Theme-Based Activity Curator
3. Social Media Reward Sharing
4. Social Challenge
5. Story Mode
6. Chrome Extension Notifications

## Tech Stack

- Frontend: React with TypeScript
- Styling: Tailwind CSS
- Animation: GSAP (minimal usage)
- Database: Supabase (with local storage fallback for the PoC)
- Deployment: Netlify
- Browser Extension: Chrome Extension API

## Setup Instructions

### 1. Web Application Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. The app will be available at http://localhost:5173

### 2. Supabase Setup

For a full implementation, you would need to:

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Set up the required tables using the SQL in `docs/supabase-schema.sql`
4. Create a `.env` file with your Supabase credentials:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Note:** For this PoC, we're using local storage to mock Supabase functionality.

### 3. Chrome Extension Setup

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in the top right)
3. Click "Load unpacked" and select the `public/chrome-extension` directory from this project
4. The DeskZen extension will be installed in developer mode

### 4. Netlify Deployment

1. Create a Netlify account at [netlify.com](https://netlify.com)
2. Connect your repository or upload the built files
3. Deploy the site with the following settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Set environment variables for Supabase in the Netlify dashboard

## Features

### 1. Micro-Break Generator
A button that generates random activities to help users take short mental, physical, or creative breaks throughout their workday.

### 2. Mood-Based Activity Curator
Allows users to select their current mood from a dropdown or describe it in text, then recommends an appropriate activity.

### 3. Social Media Reward Sharing
Awards badges for completed activities that users can share via the Web Share API.

### 4. Social Challenge
Enables users to create custom challenges, generate shareable links, and view a leaderboard.

### 5. Story Mode
A gamified experience with levels, a mana system, and rewards for completing activities.

### 6. Chrome Extension
Provides desktop notifications to remind users to take breaks at customizable intervals.

## Project Structure

- `/src/components/` - Reusable UI components
- `/src/pages/` - Page components for different routes
- `/src/lib/` - Utility functions and Supabase client
- `/src/context/` - React context providers
- `/public/chrome-extension/` - Chrome extension files

## PoC Limitations

This PoC uses local storage to simulate Supabase functionality. In a production implementation, you would:

1. Use actual Supabase tables and real-time functionality
2. Implement proper authentication
3. Expand the activity database
4. Implement more sophisticated AI mood analysis
5. Create more levels for Story Mode
6. Enhance the Chrome extension with more features

## License

This project is intended as a Proof of Concept only.
