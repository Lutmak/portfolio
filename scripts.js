// Main DOMContentLoaded Event
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing animations and interactions...');
    setupTypingAnimation();
    setupMobileMenu();
    setupSmoothScrolling();
    setupCTAButtons();
    setupPlanetAnimation();
});

// Typing Animation
function setupTypingAnimation() {
    const typingElement = document.querySelector('.typing');
    if (!typingElement) {
        console.log('Typing element not found');
        return;
    }

    let texts;
    try {
        texts = JSON.parse(typingElement.dataset.texts);
    } catch (error) {
        console.error('Error parsing texts:', error);
        return;
    }

    let textIndex = 0;

    function type() {
        const currentText = texts[textIndex];
        let charIndex = 0;

        function addChar() {
            if (charIndex <= currentText.length) {
                typingElement.textContent = currentText.substring(0, charIndex);
                charIndex++;
                setTimeout(addChar, 50); // Super fast typing (50ms per character)
            } else {
                // Pause for reading (200ms)
                setTimeout(() => {
                    // Instantly clear and move to next word
                    textIndex = (textIndex + 1) % texts.length;
                    typingElement.textContent = '';
                    setTimeout(type, 100); // Small pause before starting next word
                }, 200);
            }
        }

        addChar();
    }

    type();
}

// Mobile Menu Setup
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Change menu icon
            const menuIcon = mobileMenuBtn.querySelector('i');
            menuIcon.classList.toggle('bx-menu');
            menuIcon.classList.toggle('bx-x');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const menuIcon = mobileMenuBtn.querySelector('i');
                menuIcon.classList.add('bx-menu');
                menuIcon.classList.remove('bx-x');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                const menuIcon = mobileMenuBtn.querySelector('i');
                menuIcon.classList.add('bx-menu');
                menuIcon.classList.remove('bx-x');
            }
        });
    }
}

// Smooth Scrolling
function setupSmoothScrolling() {
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
}

// Email Configuration - Only for the complex email template
const EmailConfig = {
recipient: 'emir.cardenasbernal+portfolio@gmail.com',
subject: "Let's Work Together!",
body: `Hi, Emir!

I'd love to talk to you about an exciting opportunity!

Awesome Company name: that definitely won't ask me to invert a binary tree or implement quick sort from memory on LeetCode to hire me 🎉

Position details: Legendary Neural Network Quantum AI Master 🧙‍♂️

Compensation: a bazillion-gazillion dollars/millisecond 💰`
};

// Email Function - Only needed for the hire me button
function openEmail() {
    const params = new URLSearchParams({
        subject: EmailConfig.subject,
        body: EmailConfig.body
    });
    window.location.href = `mailto:${EmailConfig.recipient}?${params.toString()}`;
}

// Button Setup - Only for hire me button (appointment button uses inline onclick)
function setupCTAButtons() {
    const hireBtn = document.getElementById('hire-btn');
    
    if (hireBtn) {
        hireBtn.addEventListener('click', openEmail);
    }
}

// Planet Animation
function setupPlanetAnimation() {
    const planet = document.querySelector('.profile-planet');
    if (!planet) return;

    let time = 0;
    let hoverActive = false;

    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.borderRadius = '50%';
    canvas.width = 80;
    canvas.height = 80;
    planet.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    planet.addEventListener('mouseenter', () => hoverActive = true);
    planet.addEventListener('mouseleave', () => hoverActive = false);

    function easeInOut(t) {
        // Smoother easing function for continuous flow
        return 0.5 - Math.cos(t * Math.PI) / 2;
    }

    function drawGradient() {
        time += 0.0008; // Much slower animation

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Create overlapping waves for continuous effect
        for (let i = 0; i < 3; i++) {
            const progress = easeInOut((time + i * 0.33) % 1);

            const gradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, canvas.width / 2
            );

            // Create continuous color transition
            if (progress < 0.5) {
                const expandProgress = progress * 2; // 0 to 1
                gradient.addColorStop(0, `rgba(0, 255, 255, ${0.7 - expandProgress * 0.3})`);
                gradient.addColorStop(expandProgress * 0.8, `rgba(0, 255, 255, ${0.5 - expandProgress * 0.3})`);
                gradient.addColorStop(Math.min(1, expandProgress + 0.2), `rgba(255, 0, 255, ${0.3 + expandProgress * 0.3})`);
                gradient.addColorStop(1, `rgba(255, 0, 255, ${0.3})`);
            } else {
                const expandProgress = (progress - 0.5) * 2; // 0 to 1
                gradient.addColorStop(0, `rgba(255, 0, 255, ${0.7 - expandProgress * 0.3})`);
                gradient.addColorStop(expandProgress * 0.8, `rgba(255, 0, 255, ${0.5 - expandProgress * 0.3})`);
                gradient.addColorStop(Math.min(1, expandProgress + 0.2), `rgba(0, 255, 255, ${0.3 + expandProgress * 0.3})`);
                gradient.addColorStop(1, `rgba(0, 255, 255, ${0.3})`);
            }

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, canvas.width / 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Base gradient to ensure smooth transitions
        const baseGradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, canvas.width / 2
        );
        baseGradient.addColorStop(0, 'rgba(0, 255, 255, 0.1)');
        baseGradient.addColorStop(1, 'rgba(255, 0, 255, 0.1)');

        ctx.fillStyle = baseGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, canvas.width / 2, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow effect
        const glowSize = hoverActive ? 25 : 20;
        const glowOpacity = 0.2 + (Math.sin(time * 4) * 0.05);
        planet.style.boxShadow = `
            0 0 ${glowSize}px rgba(255, 0, 255, ${glowOpacity}),
            0 0 ${glowSize * 1.5}px rgba(0, 255, 255, ${glowOpacity * 0.75})
        `;

        // Very subtle scale animation
        const scale = hoverActive ? 1.05 : 1;
        const breathingScale = 1 + (Math.sin(time * 2) * 0.01);
        planet.style.transform = `translateX(-50%) scale(${scale * breathingScale})`;

        requestAnimationFrame(drawGradient);
    }

    drawGradient();
}