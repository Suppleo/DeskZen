# DeskZen PoC Summary

## Overview

DeskZen is a browser-based web application designed to reduce workplace stress through quick, desk-friendly micro-break activities. This PoC demonstrates the core functionality and innovative features in their simplest forms, targeting office workers, freelancers, students, and part-time workers.

## Features

### 1. Micro-Break Generator
- **Functionality:** Generates random 1-3 minute activities from a database
- **Implementation:** Fetches activities from a Supabase table (mocked with localStorage for the PoC)
- **UI:** Activities are displayed in Tailwind CSS cards with animations and pleasing visual design
- **User Experience:** Users can complete activities with a single click and view new activities on demand

### 2. AI-Driven Theme-Based Activity Curator
- **Functionality:** Recommends activities based on the user's current mood
- **Implementation:** Includes both a mood dropdown and a text input option
- **Data Flow:** Maps moods to activity categories (e.g., Stressed → mental activities)
- **Simplification:** Uses hardcoded mappings for the PoC rather than a true AI implementation

### 3. Social Media Reward Sharing
- **Functionality:** Awards badges for completed activities that users can share
- **Implementation:** Uses the Web Share API with fallback to clipboard copying
- **Badges:** Implemented "Zen Novice" for completing the first activity
- **Storage:** Badge achievements are stored in localStorage for the PoC

### 4. Social Challenge
- **Functionality:** Allows users to create custom challenges and generate shareable links
- **Implementation:** Includes activity selection or custom activity creation
- **Social Component:** Features a static leaderboard with mock data
- **Sharing:** Generates unique URLs for each challenge

### 5. Story Mode
- **Functionality:** Gamified experience with levels, narrative, and a mana system
- **Implementation:** Includes 2 levels with custom lore for each
- **Progression:** Mana system limits activities to create engagement cycles
- **Rewards:** Awards "Level 1 Explorer" badge upon level completion

### 6. Chrome Extension
- **Functionality:** Provides desktop notifications to remind users to take breaks
- **Implementation:** Features a configurable timer (defaulted to 5 minutes)
- **UI:** Simple, clean interface with Tailwind CSS styling
- **Integration:** Notifications link directly to the web application

## Tech Stack

- **Frontend:** React with TypeScript
- **Styling:** Tailwind CSS
- **Animation:** GSAP for subtle micro-interactions
- **Storage:** Supabase (mocked with localStorage for the PoC)
- **Extension:** Chrome Extension API
- **Deployment:** Netlify

## Demo Steps

1. **Home Page:**
   - Select a mood from the dropdown or describe how you're feeling
   - Click "Generate Activity" for a random activity
   - Complete the activity to potentially earn a badge

2. **Challenge:**
   - Create a new challenge by selecting a pre-defined activity or creating a custom one
   - Share the generated link
   - View the leaderboard of an existing challenge

3. **Story Mode:**
   - Start the journey at Level 1
   - Complete activities to use mana and progress to Level 2
   - Earn the "Level 1 Explorer" badge
   - Reset mana when depleted

4. **Chrome Extension:**
   - Set a break interval (default 5 minutes)
   - Start the timer to receive notifications
   - Click on notifications to open the DeskZen app

## Future Enhancements

For the full product development beyond this PoC:

1. **Authentication:** Add user accounts and proper authentication
2. **AI Integration:** Implement actual sentiment analysis for mood detection
3. **Activity Database:** Expand with more activities across all categories
4. **Social Features:** Add real-time leaderboards and friend challenges
5. **Story Mode:** Develop a more extensive narrative with additional levels
6. **Chrome Extension:** Add analytics and customizable notification settings
7. **Mobile App:** Create companion mobile apps for iOS and Android

This PoC successfully demonstrates the core concept and functionality of DeskZen, providing a solid foundation for future development.