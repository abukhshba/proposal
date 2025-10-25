// ===== LOADER - MUST RUN FIRST =====
(function() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(function() {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 800);
        }, 3000);
    }
})();

// ===== FLOATING BUBBLES ANIMATION =====
(function() {
    const bubblesContainer = document.querySelector('.bubbles-container');
    if (!bubblesContainer) return;

    const colors = ['bubble-yellow', 'bubble-blue', 'bubble-gradient'];
    const bubbleCount = 30;

    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble ' + colors[Math.floor(Math.random() * colors.length)];

        // Random size between 20px and 120px
        const size = Math.random() * 100 + 20;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';

        // Random starting position
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.bottom = '-150px';

        // Random drift amount
        const drift = (Math.random() - 0.5) * 200;
        bubble.style.setProperty('--drift', drift + 'px');

        // Random animation duration between 8s and 20s
        const duration = Math.random() * 12 + 8;
        bubble.style.animationDuration = duration + 's';

        // Random delay
        const delay = Math.random() * 5;
        bubble.style.animationDelay = delay + 's';

        bubblesContainer.appendChild(bubble);

        // Remove bubble after animation completes
        setTimeout(() => {
            bubble.remove();
            createBubble(); // Create a new one
        }, (duration + delay) * 1000);
    }

    // Create initial bubbles
    for (let i = 0; i < bubbleCount; i++) {
        setTimeout(() => createBubble(), i * 200);
    }
})();

// ===== SCROLL TO TOP ON PAGE LOAD =====
(function() {
    window.addEventListener('load', function() {
        window.scrollTo(0, 0);
    });
})();

// ===== Color Sync Effect for Skill Cards =====
const skillCards = document.querySelectorAll('.skill-card');
const root = document.documentElement;

skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const themeColor = this.getAttribute('data-theme-color');
        root.style.setProperty('--accent-color', themeColor);

        // Apply subtle color shift to hero gradient
        const heroGradient = document.querySelector('.hero-gradient');
        if (heroGradient) {
            heroGradient.style.filter = `hue-rotate(${Math.random() * 30}deg)`;
        }
    });

    card.addEventListener('mouseleave', function() {
        const heroGradient = document.querySelector('.hero-gradient');
        if (heroGradient) {
            heroGradient.style.filter = 'hue-rotate(0deg)';
        }
    });
});

// ===== Scroll-Triggered Timeline Animation =====
const timelineSteps = document.querySelectorAll('.timeline-step');
const timelinePath = document.querySelector('.timeline-path');

const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slide-in-right 0.6s ease-out forwards';

            // Animate timeline path on first step
            if (entry.target.dataset.step === '1' && timelinePath) {
                timelinePath.classList.add('animate');
            }
        }
    });
}, observerOptions);

timelineSteps.forEach(step => {
    timelineObserver.observe(step);
});

// ===== Testimonial Carousel =====
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        if (testimonialDots[i]) {
            testimonialDots[i].classList.remove('bg-indigo-500');
            testimonialDots[i].classList.add('bg-gray-300');
        }
    });

    if (testimonials[index]) {
        testimonials[index].classList.add('active');
        if (testimonialDots[index]) {
            testimonialDots[index].classList.remove('bg-gray-300');
            testimonialDots[index].classList.add('bg-indigo-500');
        }
        currentTestimonial = index;
    }
}

function nextTestimonial() {
    const next = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(next);
}

function prevTestimonial() {
    const prev = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(prev);
}

// Auto-rotate testimonials
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Manual navigation
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        clearInterval(testimonialInterval);
        nextTestimonial();
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        clearInterval(testimonialInterval);
        prevTestimonial();
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });
}

// Dot navigation
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(testimonialInterval);
        showTestimonial(index);
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });
});

// ===== Avatar Tilt Effect =====
const avatars = document.querySelectorAll('.avatar-tilt');

document.addEventListener('mousemove', (e) => {
    avatars.forEach(avatar => {
        const rect = avatar.getBoundingClientRect();
        const avatarCenterX = rect.left + rect.width / 2;
        const avatarCenterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - avatarCenterX;
        const deltaY = e.clientY - avatarCenterY;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < 300) {
            const angle = Math.atan2(deltaY, deltaX);
            const tiltX = Math.sin(angle) * 10;
            const tiltY = -Math.cos(angle) * 10;

            avatar.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
        } else {
            avatar.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
    });
});

// ===== Confetti Effect =====
const canvas = document.getElementById('confetti-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confettiParticles = [];

    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 8 + 4;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = ['#6366f1', '#ec4899', '#8b5cf6', '#f59e0b', '#10b981'][Math.floor(Math.random() * 5)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;

            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    window.createConfetti = function() {
        for (let i = 0; i < 100; i++) {
            confettiParticles.push(new Confetti());
        }
    };

    window.animateConfetti = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiParticles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        if (confettiParticles.length > 0) {
            requestAnimationFrame(window.animateConfetti);
        }
    };

    window.stopConfetti = function() {
        setTimeout(() => {
            confettiParticles = [];
        }, 3000);
    };

    // Window resize handler for canvas
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== Form Submission with Confetti =====
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Trigger confetti
        if (window.createConfetti) {
            window.createConfetti();
            window.animateConfetti();
            window.stopConfetti();
        }

        // Button animation
        submitBtn.innerHTML = `
            <span class="relative z-10 flex items-center justify-center gap-3">
                <svg class="animate-spin h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending...</span>
            </span>
        `;

        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = `
                <span class="relative z-10 flex items-center justify-center gap-3">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-green-600">Sent Successfully!</span>
                </span>
            `;

            // Reset form
            contactForm.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = `
                    <span class="relative z-10 flex items-center justify-center gap-3">
                        <span>Send Proposal Request</span>
                        <svg class="w-6 h-6 text-indigo-600 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                    </span>
                `;
            }, 3000);
        }, 2000);
    });
}

// ===== Smooth Scroll for Navigation =====
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

// ===== Performance Optimization: will-change =====
const animatedElements = document.querySelectorAll('.skill-card, .proposal-card, .avatar-tilt');

animatedElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
        this.style.willChange = 'transform';
    });

    el.addEventListener('mouseleave', function() {
        this.style.willChange = 'auto';
    });
});

// ===== Prefers Reduced Motion Check =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable auto-rotating testimonials
    clearInterval(testimonialInterval);
}

// ===== Loader - Start Hero Animations =====
setTimeout(() => {
    if (window.startHeroAnimations) {
        window.startHeroAnimations();
    }
}, 3800);

// ===== Network Canvas Animation =====
const networkCanvas = document.getElementById('network-canvas');
if (networkCanvas) {
    const ctx = networkCanvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
        networkCanvas.width = networkCanvas.offsetWidth;
        networkCanvas.height = networkCanvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class NetworkParticle {
        constructor() {
            this.x = Math.random() * networkCanvas.width;
            this.y = Math.random() * networkCanvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > networkCanvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > networkCanvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fill();
        }
    }

    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new NetworkParticle());
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    function animateNetwork() {
        ctx.clearRect(0, 0, networkCanvas.width, networkCanvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        drawConnections();

        animationId = requestAnimationFrame(animateNetwork);
    }

    animateNetwork();
}

