# Chrome Extension Setup Guide

This guide will walk you through loading and testing the DeskZen Chrome extension in developer mode.

## Prerequisites

- Google Chrome browser
- The DeskZen project files

## Loading the Extension

1. Open Chrome and navigate to `chrome://extensions/` by typing it in the address bar.

2. Enable **Developer mode** by toggling the switch in the top-right corner of the page.

3. Click the **Load unpacked** button that appears after enabling developer mode.

4. Navigate to the DeskZen project directory, then select the `public/chrome-extension` folder.

5. The DeskZen extension should now appear in your extensions list.

## Using the Extension

1. Click the DeskZen icon in your browser's extension toolbar (you may need to pin it by clicking the puzzle piece icon and then the pin icon next to DeskZen).

2. In the popup:
   - Set your preferred break interval (default is 5 minutes)
   - Click "Start Timer" to begin receiving break notifications
   - Click "Stop Timer" to pause notifications
   - Click "Open DeskZen" to launch the main web application

3. When a notification appears:
   - Click on the notification to open the DeskZen web app
   - Click the "X" to dismiss it

## Extension Features

- **Customizable Timer:** Set break intervals from 1 to 60 minutes
- **Desktop Notifications:** Receive reminders to take breaks
- **Quick Access:** Open the DeskZen web app with one click

## Troubleshooting

- **Extension not appearing:** Make sure you selected the correct directory when loading the unpacked extension.
- **Notifications not showing:** Ensure you've granted notification permissions to Chrome.
- **Timer not working correctly:** Try reloading the extension by clicking the refresh icon on the extension card in `chrome://extensions/`.

## Development Notes

For this PoC, the extension uses:
- Chrome's `storage.local` API to store timer settings
- The `notifications` API for desktop notifications
- The `alarms` API for timing functionality

In a production version, additional features would include:
- Syncing with the user's account
- More customizable notification settings
- Activity suggestions directly in the extension popup
- Tracking completed activities from notifications

## Technical Implementation

The extension consists of:
- `manifest.json` - Configuration and permissions
- `popup.html` - User interface
- `popup.js` - UI interaction logic
- `background.js` - Background processes for notifications and timers
- Icon files in various sizes