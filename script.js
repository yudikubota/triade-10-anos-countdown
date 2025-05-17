// Set the target date and time (May 17, 2025, 21:00 São Paulo time)
const targetDate = new Date('2025-05-17T21:00:00-03:00');

// Function to update the countdown
function updateCountdown() {
    const now = new Date();
    const difference = targetDate - now;

    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Update the DOM elements
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // Update the sarcastic message
    const countdownText = document.getElementById('countdown-text');
    if (days > 0) {
        countdownText.textContent = `${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos`;
    } else if (hours > 0) {
        countdownText.textContent = `${hours} horas, ${minutes} minutos e ${seconds} segundos`;
    } else if (minutes > 0) {
        countdownText.textContent = `${minutes} minutos e ${seconds} segundos`;
    } else {
        countdownText.textContent = `${seconds} segundos`;
    }

    // Add animation class to the countdown items
    const countdownItems = document.querySelectorAll('.countdown-item');
    countdownItems.forEach(item => {
        item.classList.add('pulse');
        setTimeout(() => item.classList.remove('pulse'), 1000);
    });
}

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