document.addEventListener('DOMContentLoaded', function() {
  const startTimerButton = document.getElementById('startTimer');
  const stopTimerButton = document.getElementById('stopTimer');
  const timerStatus = document.getElementById('timerStatus');
  const countdownDisplay = document.getElementById('countdown');
  const intervalInput = document.getElementById('interval');
  const openAppButton = document.getElementById('openApp');
  
  let countdown = null;
  let remainingSeconds = 0;
  
  // Check if timer is running
  chrome.storage.local.get(['timerRunning', 'endTime'], function(result) {
    if (result.timerRunning) {
      startTimerButton.classList.add('hidden');
      stopTimerButton.classList.remove('hidden');
      timerStatus.classList.remove('hidden');
      
      // Calculate remaining time
      const endTime = result.endTime;
      const now = Date.now();
      remainingSeconds = Math.max(0, Math.floor((endTime - now) / 1000));
      
      updateCountdown();
      startCountdown();
    }
  });
  
  // Start timer
  startTimerButton.addEventListener('click', function() {
    const minutes = parseInt(intervalInput.value) || 5;
    const seconds = minutes * 60;
    
    remainingSeconds = seconds;
    const endTime = Date.now() + (seconds * 1000);
    
    chrome.storage.local.set({
      timerRunning: true,
      endTime: endTime,
      intervalMinutes: minutes
    });
    
    chrome.runtime.sendMessage({
      action: 'startTimer',
      minutes: minutes
    });
    
    startTimerButton.classList.add('hidden');
    stopTimerButton.classList.remove('hidden');
    timerStatus.classList.remove('hidden');
    
    updateCountdown();
    startCountdown();
  });
  
  // Stop timer
  stopTimerButton.addEventListener('click', function() {
    chrome.storage.local.set({
      timerRunning: false
    });
    
    chrome.runtime.sendMessage({
      action: 'stopTimer'
    });
    
    startTimerButton.classList.remove('hidden');
    stopTimerButton.classList.add('hidden');
    timerStatus.classList.add('hidden');
    
    if (countdown) {
      clearInterval(countdown);
      countdown = null;
    }
  });
  
  // Open the main app
  openAppButton.addEventListener('click', function() {
    // Use a relative URL for the PoC that would work on any deployment
    chrome.tabs.create({ url: 'https://deskzen-poc.netlify.app' });
  });
  
  function startCountdown() {
    if (countdown) clearInterval(countdown);
    
    countdown = setInterval(function() {
      remainingSeconds--;
      
      if (remainingSeconds <= 0) {
        clearInterval(countdown);
        countdown = null;
        
        // Timer will be restarted by the background script
        // We just update the UI here
        chrome.storage.local.get(['intervalMinutes'], function(result) {
          const minutes = result.intervalMinutes || 5;
          remainingSeconds = minutes * 60;
          updateCountdown();
          startCountdown();
        });
      } else {
        updateCountdown();
      }
    }, 1000);
  }
  
  function updateCountdown() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    countdownDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
});