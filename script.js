// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initTestimonialSlider();
    initContactForm();
    initAnimations();
    initBackToTop();
});

// Navigation functionality
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Scroll effects
function initScrollEffects() {
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(n) {
        // normalize target index
        let target = n;
        if (target >= testimonials.length) target = 0;
        if (target < 0) target = testimonials.length - 1;

        const oldSlide = currentSlide;
        
        // if same slide, do nothing
        if (target === oldSlide) return;

        // first animate the current card away (lifting it up and to the side)
        if (testimonials[oldSlide]) {
            testimonials[oldSlide].classList.remove('active');
            testimonials[oldSlide].classList.add('leaving');
            
            // after animation, move it to back of stack
            setTimeout(() => {
                testimonials[oldSlide].classList.remove('leaving');
                testimonials[oldSlide].classList.add('next');
            }, 600);
        }

        // clear dots
        dots.forEach(dot => dot.classList.remove('active'));

        // arrange the deck: target becomes active, others stack behind
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.remove('active', 'prev', 'next');
            
            if (index === target) {
                // new active card (revealed from underneath)
                testimonial.classList.add('active');
            } else if (index === (target + 1) % testimonials.length) {
                // next card in line
                testimonial.classList.add('prev');
            } else {
                // rest of the deck
                testimonial.classList.add('next');
            }
        });

        // update dot indicator
        dots[target].classList.add('active');

        // update current index
        currentSlide = target;
    }

    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }

    function currentSlideFunc(n) {
        currentSlide = n - 1;
        showSlide(currentSlide);
        resetSlideTimer();
    }

    function resetSlideTimer() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 8000);
    }

    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => currentSlideFunc(index + 1));
    });

    // Auto-slide functionality (slower timing for readability)
    slideInterval = setInterval(nextSlide, 8000);

    // Pause auto-slide on hover
    const testimonialSection = document.querySelector('.testimonials-slider');
    if (testimonialSection) {
        testimonialSection.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        testimonialSection.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 8000);
        });
    }

    // Make currentSlide function global for dot navigation
    window.currentSlide = currentSlideFunc;
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Basic form validation
            if (validateForm(formObject)) {
                // Show success message
                showMessage('Mensagem enviada com sucesso! Entraremos em contacto brevemente.', 'success');
                
                // Reset form
                contactForm.reset();
            }
        });
    }
}

function validateForm(data) {
    const errors = [];
    
    // Required field validation
    if (!data.name || data.name.trim() === '') {
        errors.push('O nome é obrigatório.');
    }
    
    if (!data.email || data.email.trim() === '') {
        errors.push('O email é obrigatório.');
    } else if (!isValidEmail(data.email)) {
        errors.push('Por favor, insira um email válido.');
    }
    
    if (!data.subject || data.subject === '') {
        errors.push('Por favor, selecione um assunto.');
    }
    
    if (!data.message || data.message.trim() === '') {
        errors.push('A mensagem é obrigatória.');
    }
    
    if (!data.privacy) {
        errors.push('Deve aceitar a Política de Privacidade.');
    }
    
    // Show errors if any
    if (errors.length > 0) {
        showMessage(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message-${type}`;
    messageElement.innerHTML = message;
    
    // Add styles
    messageElement.style.cssText = `
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 8px;
        font-weight: 500;
        animation: slideDown 0.3s ease-out;
        ${type === 'success' ? 
            'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
            'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;
    
    // Insert message after form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageElement, form.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.style.animation = 'slideUp 0.3s ease-out forwards';
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 300);
    }, 5000);
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-card, .team-member, .feature-item, .about-image, .contact-info, .contact-form'
    );
    
    animateElements.forEach(element => {
        element.classList.add('animate-element');
        observer.observe(element);
    });
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        // Smooth scroll to top
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimize scroll events with throttling
const optimizedScrollHandler = throttle(function() {
    // Handle scroll-based animations here if needed
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// Handle logo placeholder
document.addEventListener('DOMContentLoaded', function() {
    const logoImg = document.getElementById('logo');
    const footerLogoImg = document.querySelector('.footer-logo-img');
    
    // Hide logo images if they fail to load (placeholder functionality)
    if (logoImg) {
        logoImg.addEventListener('error', function() {
            this.style.display = 'none';
        });
    }
    
    if (footerLogoImg) {
        footerLogoImg.addEventListener('error', function() {
            this.style.display = 'none';
        });
    }
});

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Add CSS for animations
const animationCSS = `
    .animate-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .animate-element.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    /* Smooth focus transitions */
    *:focus {
        transition: outline 0.2s ease-out;
    }
    
    /* Loading states */
    .loading {
        position: relative;
        pointer-events: none;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #4a90e2;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Inject animation CSS
const style = document.createElement('style');
style.textContent = animationCSS;
document.head.appendChild(style);

// Analytics and performance monitoring (placeholder for future implementation)
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log(`Event: ${category} - ${action} - ${label}`);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Here you could send error reports to a logging service
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    // Handle keyboard navigation for dropdowns and modals
    if (e.key === 'Escape') {
        // Close any open modals or dropdowns
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Initialize performance monitoring
performance.mark('app-init-start');

window.addEventListener('load', function() {
    performance.mark('app-init-end');
    performance.measure('app-init', 'app-init-start', 'app-init-end');
    
    const measure = performance.getEntriesByName('app-init')[0];
    console.log(`App initialization took ${measure.duration}ms`);
});

// Scroll Indicator
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('sobre');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Hide scroll indicator when user scrolls down
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '0.8';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        isValidEmail,
        debounce,
        throttle
    };
}