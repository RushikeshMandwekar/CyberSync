// ==================== PREMIUM INTERACTIVE FEATURES ==================== //

let hamburger, navMenu, navLinks, contactForm, buttons;

function initDOMElements() {
    hamburger = document.getElementById('hamburger');
    navMenu = document.querySelector('.nav-menu');
    navLinks = document.querySelectorAll('.nav-menu a');
    contactForm = document.getElementById('contactForm');
    buttons = document.querySelectorAll('.btn');
}

// ==================== CANVAS ANIMATION ENGINE ==================== //

/**
 * Initialize advanced canvas animations
 */
function initCanvasAnimations() {
    const canvas = document.querySelector('.hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.life = 1;
            this.decay = Math.random() * 0.005 + 0.003;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
        }

        draw(ctx) {
            ctx.fillStyle = `rgba(0, 255, 65, ${this.life * 0.5})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    let particles = [];

    // Draw network lines
    function drawNetwork() {
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.15)';
        ctx.lineWidth = 1;

        // Horizontal lines
        for (let i = 0; i < canvas.height; i += 80) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }

        // Vertical lines
        for (let i = 0; i < canvas.width; i += 80) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw network
        drawNetwork();

        // Update and draw particles
        particles = particles.filter(p => p.life > 0);
        particles.forEach(p => {
            p.update();
            p.draw(ctx);
        });

        animationId = requestAnimationFrame(animate);
    }

    // Add particles on mouse move
    document.addEventListener('mousemove', (e) => {
        if (window.scrollY < window.innerHeight * 1.2) {
            for (let i = 0; i < 3; i++) {
                particles.push(new Particle(e.clientX, e.clientY));
            }
        }
    });

    animate();
}

// ==================== PERFORMANCE CHART ==================== //

/**
 * Initialize performance chart
 */
function initPerformanceChart() {
    const canvas = document.getElementById('dataChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let dataPoints = [];

    // Generate initial data
    for (let i = 0; i < 30; i++) {
        dataPoints.push(Math.random() * 10);
    }

    function drawChart() {
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        // Draw grid
        ctx.strokeStyle = 'rgba(0, 255, 65, 0.1)';
        ctx.lineWidth = 1;

        for (let i = 0; i <= 5; i++) {
            const y = (height / 5) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Draw data line
        const pointSpacing = width / (dataPoints.length - 1);
        const maxValue = 10;

        ctx.strokeStyle = 'url(#gradient)' || '#00ff41';
        ctx.lineWidth = 2;
        ctx.beginPath();

        dataPoints.forEach((value, index) => {
            const x = index * pointSpacing;
            const y = height - (value / maxValue) * height;

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.strokeStyle = '#00ff41';
        ctx.stroke();

        // Draw gradient fill
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        ctx.fillStyle = 'rgba(0, 255, 65, 0.1)';
        ctx.fill();

        // Draw points
        dataPoints.forEach((value, index) => {
            const x = index * pointSpacing;
            const y = height - (value / maxValue) * height;

            ctx.fillStyle = '#00ff41';
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // Update data periodically
    setInterval(() => {
        dataPoints.shift();
        dataPoints.push(Math.random() * 10);
        drawChart();
    }, 500);

    drawChart();
}

// ==================== NAVIGATION INTERACTIONS ==================== //

/**
 * Toggle mobile menu
 */
function toggleMenu() {
    if (!hamburger) return;
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

/**
 * Close menu when a link is clicked
 */
function closeMenuOnClick() {
    if (!hamburger) return;
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

/**
 * Close menu when clicking outside
 */
function handleClickOutside(e) {
    if (!e.target.closest('.nav-container')) {
        closeMenuOnClick();
    }
}

// ==================== SCROLL EFFECTS ==================== //

/**
 * Enhanced navbar on scroll
 */
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 255, 65, 0.1)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== //

/**
 * Stagger animations on scroll into view
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s both`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.feature-card, .tech-item, .pricing-card, .showcase-item').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ==================== ADVANCED FORM HANDLING ==================== //

/**
 * Premium form submission with validation
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!contactForm) return;

    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (!isValidEmail(formData.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    if (formData.message.length < 10) {
        showNotification('Message must be at least 10 characters', 'error');
        return;
    }

    submitForm(formData);
}

async function submitForm(formData) {
    try {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span>🚀 SENDING...</span>';
        submitButton.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        showNotification('✅ Message transmitted successfully! Thank you for reaching out.', 'success');
        contactForm.reset();

        submitButton.innerHTML = originalText;
        submitButton.disabled = false;

    } catch (error) {
        showNotification('❌ Transmission failed. Please try again.', 'error');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) submitButton.disabled = false;
    }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Premium notification system
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        font-weight: 700;
        z-index: 10000;
        animation: slideInDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(10px);
        font-family: 'Orbitron', sans-serif;
        text-transform: uppercase;
        letter-spacing: 1px;
        max-width: 90vw;
    `;

    const colors = {
        success: { bg: 'rgba(0, 255, 65, 0.15)', border: '#00ff41', text: '#00ff41' },
        error: { bg: 'rgba(255, 0, 110, 0.15)', border: '#ff006e', text: '#ff006e' },
        info: { bg: 'rgba(0, 212, 255, 0.15)', border: '#00d4ff', text: '#00d4ff' }
    };

    const color = colors[type] || colors.info;
    notification.style.backgroundColor = color.bg;
    notification.style.borderLeft = `4px solid ${color.border}`;
    notification.style.color = color.text;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4500);
}

// ==================== ENHANCED BUTTON INTERACTIONS ==================== //

/**
 * Premium button ripple effect
 */
function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
    `;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 800);
}

/**
 * Attach ripple effect to all buttons
 */
function attachRippleEffects() {
    if (!buttons) return;
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
}

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ==================== SMOOTH SCROLL WITH OFFSET ==================== //

/**
 * Advanced smooth scroll for navigation links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== PARALLAX & DEPTH EFFECTS ==================== //

/**
 * Parallax scroll effect for hero section
 */
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;

    if (scrolled < hero.offsetHeight) {
        hero.style.backgroundPosition = `0% ${scrolled * 0.5}px`;
    }

    // Update hero canvas particles
    const heroCanvas = document.querySelector('.hero-canvas');
    if (heroCanvas && scrolled < window.innerHeight * 1.2) {
        heroCanvas.style.opacity = Math.max(0, 1 - scrolled / (window.innerHeight * 1.2));
    }
});

// ==================== KEYBOARD SHORTCUTS ==================== //

/**
 * Enhanced keyboard navigation
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenuOnClick();
    }

    const shortcuts = {
        '1': '#features',
        '2': '#technology',
        '3': '#pricing',
        '4': '#contact'
    };

    if (shortcuts[e.key]) {
        const target = document.querySelector(shortcuts[e.key]);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// ==================== LAZY LOADING ==================== //

/**
 * Lazy load images
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== PERFORMANCE MONITORING ==================== //

/**
 * Monitor page performance
 */
window.addEventListener('load', () => {
    if (performance.timing) {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;
        
        console.log('⚡ Performance Metrics:');
        console.log(`  Page Load: ${pageLoadTime}ms`);
        console.log(`  Connect: ${connectTime}ms`);
        console.log(`  Render: ${renderTime}ms`);
    }

    // Check performance entries
    if (performance.getEntriesByType) {
        const resourceTiming = performance.getEntriesByType('resource');
        console.log(`📦 Resources loaded: ${resourceTiming.length}`);
    }
});

// ==================== FEATURE DETECTION ==================== //

/**
 * Detect browser capabilities
 */
function featureDetection() {
    const features = {
        webgl: (() => {
            try {
                const canvas = document.createElement('canvas');
                return !!(window.WebGLRenderingContext && 
                    (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
            } catch (e) {
                return false;
            }
        })(),
        cssGrid: (() => {
            const element = document.createElement('div');
            element.style.display = 'grid';
            return element.style.display === 'grid';
        })(),
        backdropFilter: (() => {
            const element = document.createElement('div');
            element.style.backdropFilter = 'blur(10px)';
            return element.style.backdropFilter !== '';
        })(),
        webAnimation: 'animate' in document.documentElement
    };

    console.log('🔧 Browser Features:', features);
    return features;
}

// ==================== ACCESSIBILITY ==================== //

/**
 * Enhanced keyboard navigation focus
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ==================== INITIALIZATION ==================== //

/**
 * Initialize all features on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 CyberSync Landing Page - Initializing...');
    
    // Initialize DOM elements
    initDOMElements();
    
    document.body.classList.add('loaded');

    // Initialize all systems
    initCanvasAnimations();
    initPerformanceChart();
    featureDetection();
    attachRippleEffects();
    
    // Setup event listeners
    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenuOnClick);
        });
    }
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Check if all resources are loaded
    if (document.readyState === 'complete') {
        console.log('✅ All resources loaded successfully');
    }
});

// ==================== SERVICE WORKER REGISTRATION ==================== //

/**
 * Register service worker for offline support (optional)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA support
        // navigator.serviceWorker.register('/sw.js').catch(err => {
        //     console.log('Service Worker registration failed:', err);
        // });
    });
}

// ==================== ERROR HANDLING ==================== //

/**
 * Global error handler
 */
window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
});
