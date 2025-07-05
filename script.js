// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initHeaderScroll();
    initScrollAnimations();
    initTypingEffect();
    initProgressBars();
    initParallaxEffect();
    initContactForm();
    initMobileMenu();
    initLazyLoading();
    initScrollToTop();
    initFloatingElements();
    initProjectCardAnimations();
    initSkillCardAnimations();
    initTimelineAnimations();
    initContactInteractions();
    
    // Initialize performance optimizations
    optimizePerformance();
});

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.classList.remove('active');
                    }
                }
            }
        });
    });
}

// Header Background Change on Scroll
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(102, 126, 234, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.1)';
            header.style.boxShadow = 'none';
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                
                // Add stagger effect for grid items
                if (entry.target.classList.contains('skill-category') || 
                    entry.target.classList.contains('project-card') || 
                    entry.target.classList.contains('achievement-card')) {
                    const siblings = entry.target.parentElement.children;
                    const index = Array.from(siblings).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-category, .achievement-card, .experience-item, .education-item, .about-content, .section-title'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const subtitleElement = document.querySelector('.hero .subtitle');
    if (!subtitleElement) return;

    const roles = [
        'AI Engineer',
        'VR Developer', 
        'Innovation Enthusiast',
        'Problem Solver',
        'Tech Leader'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function typeRole() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            subtitleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            subtitleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next role
        }

        setTimeout(typeRole, typingSpeed);
    }

    // Start typing effect after page load
    setTimeout(typeRole, 2000);
}

// Progress Bars Animation
function initProgressBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                entry.target.style.transition = 'width 2s ease-in-out';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateForm(data)) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    function validateForm(data) {
        const email = data.email;
        const message = data.message;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return email && emailRegex.test(email) && message && message.trim().length > 0;
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuToggle || !navLinks) return;

    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Scroll to Top Button
function initScrollToTop() {
    // Create scroll to top button if it doesn't exist
    let scrollTopBtn = document.querySelector('.scroll-top');
    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-top';
        scrollTopBtn.innerHTML = '↑';
        scrollTopBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 20px;
            cursor: pointer;
            display: none;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        `;
        document.body.appendChild(scrollTopBtn);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effects
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'scale(1.1)';
    });

    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'scale(1)';
    });
}

// Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 6 + Math.random() * 4;
        element.style.animationDelay = `${randomDelay}s`;
        element.style.animationDuration = `${randomDuration}s`;
    });
}

// Project Card Animations
function initProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Skill Card Animations
function initSkillCardAnimations() {
    const skillCards = document.querySelectorAll('.skill-category');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) rotateX(5deg)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Timeline Animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.education-item, .experience-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInLeft 0.8s ease forwards';
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Contact Interactions
function initContactInteractions() {
    // Add click handlers for email and phone
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    const phoneElements = document.querySelectorAll('.contact-item:has(span:contains("📱"))');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const email = link.getAttribute('href').replace('mailto:', '');
            copyToClipboard(email);
        });
    });
    
    // Handle phone number clicks
    phoneElements.forEach(element => {
        element.addEventListener('click', () => {
            const phoneText = element.textContent;
            const phoneNumber = phoneText.match(/\+91-\d{10}/)?.[0];
            if (phoneNumber) {
                copyToClipboard(phoneNumber);
            }
        });
        
        // Add cursor pointer style
        element.style.cursor = 'pointer';
    });
}

// Copy to Clipboard Function
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard!', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification('Copied to clipboard!', 'success');
        } else {
            showNotification('Failed to copy to clipboard', 'error');
        }
    } catch (err) {
        showNotification('Failed to copy to clipboard', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-weight: 500;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Performance Optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    let lastScrollY = window.scrollY;
    
    const debouncedScroll = () => {
        const currentScrollY = window.scrollY;
        const scrollDifference = Math.abs(currentScrollY - lastScrollY);
        
        // Only trigger if scroll difference is significant
        if (scrollDifference > 5) {
            lastScrollY = currentScrollY;
            // Additional scroll handling can be added here
        }
    };

    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(debouncedScroll, 10);
    });
    
    // Preload critical resources
    const criticalImages = document.querySelectorAll('img[data-priority="high"]');
    criticalImages.forEach(img => {
        if (img.dataset.src) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.href = img.dataset.src;
            preloadLink.as = 'image';
            document.head.appendChild(preloadLink);
        }
    });

    // Intersection Observer for performance
    const performanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger animations only when in view
                entry.target.classList.add('in-view');
            }
        });
    }, { rootMargin: '50px' });

    document.querySelectorAll('.project-card, .skill-category, .achievement-card').forEach(el => {
        performanceObserver.observe(el);
    });
}

// Keyboard Navigation Support
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close mobile menu
            const navLinks = document.querySelector('.nav-links');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
            }
        }
    });
}

// Initialize keyboard navigation
document.addEventListener('DOMContentLoaded', initKeyboardNavigation);

// Add CSS for animations that are triggered by JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes slideInLeft {
        from {
            transform: translateX(-50px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .skill-category, .project-card, .achievement-card {
        transition: all 0.3s ease;
    }

    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }

    .lazy.loaded {
        opacity: 1;
    }

    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }

    .scroll-top:hover {
        background: linear-gradient(45deg, #764ba2, #667eea) !important;
    }

    .contact-item {
        transition: all 0.3s ease;
    }

    .contact-item:hover {
        transform: translateY(-2px);
        color: #667eea;
    }

    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

document.head.appendChild(style);

// Add loading animation for the page
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    
    // Trigger initial animations
    const heroElements = document.querySelectorAll('.hero h1, .hero .subtitle, .cta-button');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation = `fadeInUp 1s ease ${index * 0.3}s both`;
        }, 100);
    });
});

// Achievement cards shine effect
function initAchievementAnimations() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.animation = 'shine 0.5s ease-in-out';
        });
        
        card.addEventListener('animationend', () => {
            card.style.animation = '';
        });
    });
}

// Initialize achievement animations
document.addEventListener('DOMContentLoaded', initAchievementAnimations);

// Add dynamic background particles (optional enhancement)
function createBackgroundParticles() {
    const particleCount = 50;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'bg-particle';
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
        `;
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation
        particle.style.animation = `float ${5 + Math.random() * 5}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        document.body.appendChild(particle);
        particles.push(particle);
    }
}

// Initialize background particles (commented out by default for performance)
// document.addEventListener('DOMContentLoaded', createBackgroundParticles);

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initSmoothScrolling,
        initHeaderScroll,
        initScrollAnimations,
        initTypingEffect,
        showNotification,
        copyToClipboard
    };
}