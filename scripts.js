// Typing Animation
function setupTypingAnimation() {
    const typingElement = document.querySelector('.typing');
    if (!typingElement) return;

    const texts = JSON.parse(typingElement.dataset.texts);
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isWaiting = true;
            setTimeout(() => {
                isDeleting = true;
                isWaiting = false;
            }, 1000); // Reduced wait time
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        const typingSpeed = isDeleting ? 50 : 100; // Faster typing speed
        if (!isWaiting) {
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(type, 1000); // Reduced wait time between words
        }
    }

    type();
}

// Fun Hire Me Button
const hireBtn = document.querySelector('.hire-me-btn');
if (hireBtn) {
    let clickCount = 0;
    const messages = [
        "I'm awesome, hire me! 🚀",
        "You know you want to! 😉",
        "Let's work together! 🤝"
    ];

    hireBtn.addEventListener('click', () => {
        clickCount++;

        // Change button text
        hireBtn.textContent = messages[clickCount % messages.length];

        // Add bouncing animation class
        hireBtn.classList.add('bounce');

        // Remove animation class after it completes
        setTimeout(() => {
            hireBtn.classList.remove('bounce');
        }, 500);

        // Open email client after third click
        if (clickCount >= 3) {
            window.location.href = 'mailto:emir.cardenasbernal@gmail.com?subject=Let%27s%20Work%20Together!';
        }
    });
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function toggleDarkMode(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    themeToggle.innerHTML = isDark ? '<i class="bx bx-sun"></i>' : '<i class="bx bx-moon"></i>';
}

themeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    toggleDarkMode(isDarkMode);
});

// Check for saved user preference
const savedTheme = localStorage.getItem('darkMode');
if (savedTheme !== null) {
    toggleDarkMode(savedTheme === 'true');
} else {
    toggleDarkMode(prefersDarkScheme.matches);
}

// Listen for changes in color scheme
prefersDarkScheme.addListener((e) => {
    toggleDarkMode(e.matches);
});

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setupTypingAnimation();
});

