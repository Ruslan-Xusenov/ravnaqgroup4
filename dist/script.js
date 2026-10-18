(() => {
  // Taqdimot vaqti: 23-oktabr 2026, soat 20:00 (Toshkent, UTC+5).
  const eventTime = new Date('2026-10-23T20:00:00+05:00').getTime();
  const display = document.getElementById('countdown');
  const label = document.querySelector('.timer-label');
  function updateCountdown() {
    const remaining = Math.max(0, eventTime - Date.now());
    if (!remaining) {
      display.textContent = '23-oktabr · 20:00';
      label.textContent = 'Taqdimot haqida Telegram kanalimizda';
      return;
    }
    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor(remaining / 3600000) % 24;
    const minutes = Math.floor(remaining / 60000) % 60;
    const seconds = Math.floor(remaining / 1000) % 60;
    const pad = value => String(value).padStart(2, '0');
    display.textContent = `${days ? days + ' kun ' : ''}${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
