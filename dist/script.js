(() => {
  const display = document.getElementById('countdown');
  const storageKey = 'saodat-countdown-deadline';
  const duration = 2 * 60 * 1000;
  let deadline = Date.now() + duration;

  // Preserve the countdown on reload within the same browser tab.
  try {
    const saved = Number(sessionStorage.getItem(storageKey));
    if (Number.isFinite(saved) && saved > 0) {
      deadline = saved;
    } else {
      sessionStorage.setItem(storageKey, String(deadline));
    }
  } catch {
    // The timer still works when browser storage is unavailable.
  }

  let intervalId;
  function updateCountdown() {
    const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    const minutes = Math.floor(remaining / 60);
    const seconds = String(remaining % 60).padStart(2, '0');
    display.textContent = `${minutes}:${seconds}`;
    if (remaining === 0 && intervalId !== undefined) {
      clearInterval(intervalId);
    }
    return remaining;
  }

  if (updateCountdown() > 0) {
    intervalId = setInterval(updateCountdown, 250);
  }
})();
