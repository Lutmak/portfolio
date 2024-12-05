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

// Hire Me Button
const hireBtn = document.querySelector('.hire-me-btn');
if (hireBtn) {
    hireBtn.addEventListener('click', () => {
        window.location.href = 'mailto:emir.cardenasbernal@gmail.com?subject=Let%27s%20Work%20Together!&body=Hi%20Emir,%20I%20would%20like%20to%20talk%20to%20you%20about%20an%20opportunity%20and%20pay%20you%20a%20bazillion-gazillion%20dollars!';
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

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing animations and interactions...');
    setupTypingAnimation();
});