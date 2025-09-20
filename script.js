// ----- CONFIG -----
const TARGET_DATE = new Date("October 29, 2025 00:00:00");

// ----- ELEMENTS -----
const loadingPage = document.getElementById('loading-page');
const lockedPage  = document.getElementById('locked-page');
const mainPage    = document.getElementById('main-page');
const timerEl     = document.getElementById('timer');
const lockedCountdownEl = document.getElementById('locked-countdown');

// ----- UTILS -----
function showMain() {
  loadingPage.style.display = 'none';
  lockedPage.style.display = 'none';
  mainPage.style.display = 'block';
}

function showLocked() {
  loadingPage.style.display = 'none';
  mainPage.style.display = 'none';
  lockedPage.style.display = 'flex';
}

// ----- CONFETTI -----
function startConfetti5s(){
  const duration = 2500;
  const end = Date.now() + duration;
  (function frame(){
    confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

let foreverInterval = null;
function startConfettiForever(){
  if (foreverInterval) return;
  foreverInterval = setInterval(() => {
    confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });
  }, 900);
}

// ----- LOCKED PAGE COUNTDOWN -----
function startLockedCountdownDisplay(){
  function update(){
    const now = Date.now();
    const diff = TARGET_DATE.getTime() - now;
    if (diff <= 0){
      lockedCountdownEl.textContent = "It's time! Reload the page.";
      return;
    }
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((diff % (1000*60)) / 1000);
    lockedCountdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  update();
  setInterval(update, 1000);
}

// ----- MAIN LOGIC -----
(function init(){
  loadingPage.style.display = 'flex';
  let timeLeft = 5;
  timerEl.textContent = timeLeft;

  const countdown = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);

      const now = new Date();
      if (now >= TARGET_DATE){
        showMain();
        startConfetti5s();
      } else {
        showLocked();
        startConfettiForever();
        startLockedCountdownDisplay();
      }
    }
  }, 1000);
})();
