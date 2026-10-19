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
    intervalId = setInterval(updateCountdown, 1000);
  }

  // Track Meta Pixel Lead / Contact on CTA button clicks
  document.querySelectorAll('a.cta').forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (typeof window.fbq === 'function') {
        try {
          window.fbq('track', 'Lead', {
            content_name: 'Taqdimotga qatnashish',
            button_position: index === 0 ? 'hero' : 'footer'
          });
          window.fbq('track', 'Contact', {
            content_name: 'Telegram Group Join'
          });
        } catch (e) {
          console.warn('Pixel tracking error:', e);
        }
      }
    });
  });
})();

