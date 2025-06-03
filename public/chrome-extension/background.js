// Initialize on install
chrome.runtime.onInstalled.addListener(function() {
  console.log('DeskZen Extension installed');
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'startTimer') {
    startTimer(request.minutes);
    sendResponse({success: true});
  } 
  else if (request.action === 'stopTimer') {
    stopTimer();
    sendResponse({success: true});
  }
  return true; // Keep the message channel open for async responses
});

// Start the timer
function startTimer(minutes) {
  // Clear any existing alarms
  chrome.alarms.clear('breakTimer');
  
  // Create a new alarm
  chrome.alarms.create('breakTimer', {
    delayInMinutes: minutes,
    periodInMinutes: minutes // Repeat every 'minutes'
  });
  
  console.log(`Timer started for ${minutes} minutes`);
}

// Stop the timer
function stopTimer() {
  chrome.alarms.clear('breakTimer');
  console.log('Timer stopped');
}

// Listen for alarm
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === 'breakTimer') {
    // Check if timer is still running
    chrome.storage.local.get(['timerRunning'], function(result) {
      if (result.timerRunning) {
        showNotification();
      }
    });
  }
});

// Show a notification
function showNotification() {
  chrome.notifications.create('breakNotification', {
    type: 'basic',
    iconUrl: 'icon128.png',
    title: 'Time for a Zen break!',
    message: 'Take a moment to reset and recharge with DeskZen.',
    buttons: [
      { title: 'Open DeskZen' }
    ],
    priority: 2
  });
}

// Handle notification click
chrome.notifications.onClicked.addListener(function(notificationId) {
  if (notificationId === 'breakNotification') {
    // Open the main app
    chrome.tabs.create({ url: 'https://deskzen-poc.netlify.app' });
  }
});

// Handle notification button click
chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
  if (notificationId === 'breakNotification' && buttonIndex === 0) {
    // Open the main app
    chrome.tabs.create({ url: 'https://deskzen-poc.netlify.app' });
  }
});