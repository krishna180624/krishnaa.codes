// ========================================
// MOBILE MENU TOGGLE
// ========================================
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenu.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = mobileMenu.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// ========================================
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

// Observe all project cards
document.querySelectorAll('.project-card, .website-card, .stat-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ========================================
// CONTACT FORM HANDLING
// ========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Show success message (in production, you'd send to a server)
    const btn = contactForm.querySelector('button');
    const originalText = btn.textContent;
    
    btn.textContent = 'Message Sent! ✓';
    btn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00ccff 100%)';
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        btn.textContent = originalText;
    }, 3000);
});

// ========================================
// PARALLAX EFFECT ON HERO
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// ========================================
// CURSOR FOLLOWER EFFECT (OPTIONAL)
// ========================================
const cursorFollower = document.createElement('div');
cursorFollower.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #00ff88;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease, opacity 0.3s ease;
    opacity: 0;
`;
document.body.appendChild(cursorFollower);

document.addEventListener('mousemove', (e) => {
    cursorFollower.style.opacity = '1';
    cursorFollower.style.left = e.clientX - 10 + 'px';
    cursorFollower.style.top = e.clientY - 10 + 'px';
});

// Hide cursor follower on touch devices
if ('ontouchstart' in window) {
    cursorFollower.style.display = 'none';
}

// ========================================
// TYPEWRITER EFFECT FOR HERO
// ========================================
const typewriterText = document.querySelector('.hero-title');
if (typewriterText) {
    // Add a subtle glow animation
    typewriterText.style.animation = 'glow 3s ease-in-out infinite alternate';
}

const style = document.createElement('style');
style.textContent = `
    @keyframes glow {
        from {
            text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
        }
        to {
            text-shadow: 0 0 20px rgba(0, 255, 136, 0.6), 0 0 30px rgba(0, 204, 255, 0.3);
        }
    }
`;
document.head.appendChild(style);

// ========================================
// PROJECT CARD HOVER SOUND (OPTIONAL)
// ========================================
// Uncomment if you want click sounds on project cards
/*
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Add click feedback
        e.target.style.transform = 'translateX(10px)';
        setTimeout(() => {
            e.target.style.transform = 'translateX(0)';
        }, 200);
    });
});
*/

// ========================================
// LAZY LOADING FOR IMAGES
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// KEYBOARD NAVIGATION ACCESSIBILITY
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const spans = mobileMenu.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ========================================
// PERFORMANCE: REDUCE MOTION FOR PREFERENCES
// ========================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none !important';
        el.style.transition = 'none !important';
    });
}

// ========================================
// EXPORT FOR DEBUGGING (OPTIONAL)
// ========================================
window.portfolioDebug = {
    version: '1.0.0',
    getElements: () => ({
        navbar: document.querySelector('.navbar'),
        hero: document.querySelector('.hero'),
        works: document.querySelector('#works'),
        contact: document.getElementById('contactForm')
    })
};

console.log('%c🚀 Portfolio Website Loaded', 'color: #00ff88; font-size: 16px; font-weight: bold;');
console.log('%cVersion: 1.0.0', 'color: #00ccff;');