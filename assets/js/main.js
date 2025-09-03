// Main JavaScript for Lord of Mysteries tribute website

// Remove loading screen after page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hide');
        }
    }, 500);
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        const navLinks = mobileNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = window.innerWidth > 768 ? 90 : 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Character card interactions
const characterCards = document.querySelectorAll('.character-card');
characterCards.forEach(card => {
    card.addEventListener('touchstart', () => {
        card.style.transform = 'scale(0.98)';
    });
    
    card.addEventListener('touchend', () => {
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    });
});

// Add parallax effect to fog overlay on desktop
if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const fogOverlay = document.querySelector('.fog-overlay');
        if (fogOverlay) {
            fogOverlay.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('.content-section, .character-card').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Add mystical glow to pathway items and cards on hover
const interactiveElements = document.querySelectorAll('.pathway-item, .card, .character-card');
interactiveElements.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.boxShadow = '0 0 20px rgba(212, 160, 23, 0.3)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.boxShadow = '';
    });
});

// Active navigation highlight
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link, .nav-links a');

function highlightNavigation() {
    if (sections.length === 0) return;
    
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.style.color = 'var(--gold)';
                } else if (item.getAttribute('href')?.startsWith('#')) {
                    item.style.color = '';
                }
            });
        }
    });
}

// Apply navigation highlighting on scroll
window.addEventListener('scroll', highlightNavigation);

// Easter egg: Konami code for special message
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        showEasterEgg();
    }
});

function showEasterEgg() {
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                    background: rgba(10, 14, 15, 0.95); border: 2px solid #D4A017; 
                    padding: 2rem; border-radius: 8px; z-index: 2001; text-align: center;
                    color: #E8E8E8; font-family: 'EB Garamond', serif; max-width: 400px;">
            <h3 style="color: #D4A017; margin-bottom: 1rem;">🎭 Secret Achievement Unlocked!</h3>
            <p style="font-style: italic; margin-bottom: 1rem;">
                "The Fool's wisdom isn't in knowing everything, but in knowing when to look foolish."
            </p>
            <p style="font-size: 0.8rem; opacity: 0.8;">
                You've discovered Klein's secret path through the mysteries!
            </p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="margin-top: 1rem; padding: 0.5rem 1rem; background: #D4A017; 
                           border: none; color: #0A0E0F; border-radius: 4px; cursor: pointer;">
                "Good afternoon, Mr. Fool~"
            </button>
        </div>
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 10000);
}

// Initialize tooltips for tarot cards
function initializeTooltips() {
    const tarotElements = document.querySelectorAll('[data-tarot]');
    tarotElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tarot-tooltip';
            tooltip.innerHTML = e.target.getAttribute('data-tarot');
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(10, 14, 15, 0.95);
                border: 1px solid #D4A017;
                padding: 0.5rem;
                border-radius: 4px;
                font-size: 0.8rem;
                color: #E8E8E8;
                z-index: 1000;
                pointer-events: none;
                max-width: 200px;
            `;
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
        });
        
        element.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tarot-tooltip');
            if (tooltip) tooltip.remove();
        });
    });
}

// Initialize tooltips after DOM load
document.addEventListener('DOMContentLoaded', initializeTooltips);

// Theme switching (future feature)
function initializeThemeSwitcher() {
    // This could be expanded to include theme switching functionality
    // Currently just a placeholder for future development
}

// Console message for developers
console.log(`
🎭 Welcome to the Lord of Mysteries tribute website!
"The Fool that doesn't belong to this era,
The mysterious ruler above the gray fog,
The King of Yellow and Black who wields good luck..."

Developed with love for the LotM community.
`);