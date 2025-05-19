// Set the target date and time (May 17, 2025, 21:00 São Paulo time)
const targetDate = new Date('2025-05-17T21:00:00-03:00');

function formatElapsed(hours, minutes, seconds) {
    let parts = [];
    if (hours > 0) parts.push(`${hours} horas`);
    if (minutes > 0) parts.push(`${minutes} minutos`);
    if (seconds > 0 || parts.length === 0) parts.push(`${seconds} segundos`);
    return parts.join(', ');
}

// Function to update the countdown
function updateCountdown() {
    const now = new Date();
    let difference = targetDate - now;
    let isPast = false;
    if (difference < 0) {
        isPast = true;
        difference = Math.abs(difference);
    }

    // Calculate time units (no days)
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Update the DOM elements
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // Update the sarcastic message or elapsed message
    const sarcasticEls = document.querySelectorAll('.sarcastic-message');
    if (isPast) {
        const elapsed = formatElapsed(hours, minutes, seconds);
        if (sarcasticEls.length > 0) {
            sarcasticEls[0].textContent = `Já faz`;
        }
    } else {
        if (sarcasticEls.length > 0) {
            sarcasticEls[0].textContent = 'Mas sem pressão 😉';
        }
    }

    // Pulse and anxiety-inducing effects
    const countdownItems = document.querySelectorAll('.countdown-item span:first-child');
    countdownItems.forEach(item => {
        item.classList.remove('pulse', 'pulse-fast');
        if (!isPast) {
            if (difference < 60000) { // less than 1 minute
                item.classList.add('pulse-fast');
            } else if (difference < 5 * 60000) { // less than 5 minutes
                item.classList.add('pulse');
            }
        }
    });
}

// Rewarding popup messages
const rewardingMessages = [
    'Parabéns, vocês fizeram história! 🎉',
    'O parkinho nunca mais foi o mesmo! 🔥',
    'Vocês são lendas! 🏆',
    'Que noite inesquecível! ✨',
    'A energia de vocês foi surreal! ⚡',
    'Vocês elevaram o nível da festa! 🚀',
    'Memórias para a vida toda! 💜'
];
function showRewardingPopup() {
    if (document.querySelector('.anxiety-popup')) return; // Only one at a time
    const popup = document.createElement('div');
    popup.className = 'anxiety-popup';
    popup.innerHTML = `
        <span>${rewardingMessages[Math.floor(Math.random() * rewardingMessages.length)]}</span>
        <button onclick="this.parentElement.remove()">OK</button>
    `;
    document.body.appendChild(popup);
    setTimeout(() => {
        if (popup.parentElement) popup.remove();
    }, 5000);
}
// Randomly show popup every 20-40 seconds
setInterval(() => {
    if (Math.random() < 0.3) showRewardingPopup();
}, 20000);

// Update the countdown immediately and then every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Add some fun animations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.content');
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
    setTimeout(() => {
        content.style.transition = 'opacity 1s ease, transform 1s ease';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    }, 100);
}); 