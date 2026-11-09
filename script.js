// JUTT profile settings — edit your Discord invite URL here.
const DISCORD_INVITE = 'https://discord.com';

const discordLink = document.getElementById('discordLink');
if (discordLink) discordLink.href = DISCORD_INVITE;

// Always use Pakistan Standard Time, regardless of the visitor's device timezone.
function updateClock() {
  const now = new Date();
  const timeParts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', hour12: true
  }).formatToParts(now);
  const hour = timeParts.find(part => part.type === 'hour')?.value ?? '--';
  const minute = timeParts.find(part => part.type === 'minute')?.value ?? '--';
  const period = timeParts.find(part => part.type === 'dayPeriod')?.value ?? '';
  const timeElement = document.getElementById('time');
  const ampmElement = document.getElementById('ampm');
  if (timeElement) {
    timeElement.firstChild.nodeValue = `${hour}:${minute}`;
    if (ampmElement) ampmElement.textContent = period;
  }
  const dateElement = document.getElementById('date');
  if (dateElement) {
    dateElement.textContent = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Karachi', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    }).format(now).toUpperCase();
  }
}
updateClock();
window.setInterval(updateClock, 1000);

// Lightweight decorative particles. Reduce the count on small screens and when motion is reduced.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const smallScreen = window.matchMedia('(max-width: 600px)').matches;
function addFloaters(containerId, className, count, durationMin, durationRange) {
  const container = document.getElementById(containerId);
  if (!container || reducedMotion) return;
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < count; index += 1) {
    const item = document.createElement('i');
    item.className = className;
    item.style.left = `${Math.random() * 100}%`;
    item.style.top = className === 'spark' ? `${45 + Math.random() * 60}%` : '-12%';
    item.style.setProperty('--duration', `${durationMin + Math.random() * durationRange}s`);
    item.style.setProperty('--delay', `${-Math.random() * (durationMin + durationRange)}s`);
    item.style.setProperty('--drift', `${(Math.random() - 0.5) * 180}px`);
    fragment.appendChild(item);
  }
  container.appendChild(fragment);
}
addFloaters('particles', 'spark', smallScreen ? 18 : 34, 8, 12);
addFloaters('petals', 'petal', smallScreen ? 7 : 13, 13, 12);
