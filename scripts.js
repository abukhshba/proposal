    // ===== DEVICE DETECTION FOR ULTRA OPTIMIZATION =====
    function isLowPowerDevice() {
        // Check for low-end devices
        const isMobile = window.innerWidth < 768;
        const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
        const hasSlowConnection = navigator.connection &&
            (navigator.connection.effectiveType === 'slow-2g' ||
             navigator.connection.effectiveType === '2g' ||
             navigator.connection.effectiveType === '3g');

        return isMobile || hasLowMemory || hasSlowConnection;
    }

    // ===== ANDROID DEVICE DETECTION =====
    function isAndroidDevice() {
        return /Android/i.test(navigator.userAgent);
    }

    // ===== APPLY ANDROID CLASS IMMEDIATELY (BEFORE PAGE LOAD) =====
    // This ensures CSS optimizations apply as early as possible
    if (isAndroidDevice()) {
        document.documentElement.classList.add('android-device');
        document.body.classList.add('android-device');
        console.log('🤖 Android detected - Applying CSS optimizations immediately');
    }

    // ===== ULTRA AGGRESSIVE ANDROID OPTIMIZATIONS =====
    function applyAndroidOptimizations() {
        if (!isAndroidDevice()) return;

        console.log('🤖 Android device detected - Applying ULTRA aggressive optimizations...');

        // Add Android-specific class for CSS optimizations
        document.body.classList.add('android-device');

        // REMOVE ALL HEAVY ELEMENTS on Android (except loader)
        const heavyElements = document.querySelectorAll('.blob-shape, .orb, .light-ray, .sparkle, .animated-ring, .floating-dot, .floating-shape, .particle, .floating-badges, .connection-lines, .pulsing-circles');
        heavyElements.forEach(el => {
            el.remove(); // Remove from DOM completely
        });

        // Simplify gradient - use SIMPLE STATIC gradient on Android
        const heroSection = document.getElementById('hero-section');
        if (heroSection) {
            heroSection.style.animation = 'none';
            heroSection.style.background = 'linear-gradient(135deg, #383cb8 0%, #f0e748 100%)';
        }

        // Remove ALL animations, transitions, filters, shadows from ALL elements (except loader)
        document.querySelectorAll('*').forEach(el => {
            // Skip loader elements - they need animations
            if (el.closest('.loader-wrapper') || el.classList.contains('loader-wrapper')) {
                return;
            }

            el.style.animation = 'none';
            el.style.transition = 'none';
            el.style.filter = 'none';
            el.style.backdropFilter = 'none';
            el.style.webkitBackdropFilter = 'none';
            el.style.boxShadow = 'none';
            el.style.textShadow = 'none';
            el.style.transform = 'none';
        });

        // Disable all pseudo-elements (::before, ::after)
        const style = document.createElement('style');
        style.innerHTML = `
            body.android-device *::before,
            body.android-device *::after {
                display: none !important;
            }
        `;
        document.head.appendChild(style);

        console.log('✅ ULTRA Android optimizations applied - Maximum performance mode!');
    }

    // ===== REAL-TIME PERFORMANCE MONITORING =====
    function monitorPerformance() {
        // Skip monitoring on Android - already optimized
        if (isAndroidDevice()) {
            console.log('⚡ Skipping FPS monitoring on Android - already optimized');
            return;
        }

        let lastTime = performance.now();
        let frames = 0;
        let fps = 60;
        let lowFPSCount = 0;

        function checkFPS() {
            const currentTime = performance.now();
            frames++;

            if (currentTime >= lastTime + 1000) {
                fps = Math.round((frames * 1000) / (currentTime - lastTime));
                frames = 0;
                lastTime = currentTime;

                // If FPS drops below 30 for 2 consecutive seconds, apply emergency mode
                if (fps < 30) {
                    lowFPSCount++;
                    if (lowFPSCount >= 2) {
                        console.warn(`⚠️ Critical FPS detected: ${fps} - Applying emergency mode`);
                        applyEmergencyMode();
                        return; // Stop monitoring after emergency mode
                    }
                } else {
                    lowFPSCount = 0;
                }
            }

            requestAnimationFrame(checkFPS);
        }

        requestAnimationFrame(checkFPS);
    }

    // ===== EMERGENCY MODE FOR EXTREMELY LOW-END DEVICES =====
    function applyEmergencyMode() {
        document.body.classList.add('emergency-mode');

        // Remove EVERYTHING decorative
        const decorative = document.querySelectorAll('.blob-shape, .particle, .sparkle, .floating-shape, .orb, .light-ray, .animated-ring, .floating-dot');
        decorative.forEach(el => {
            el.remove();
        });

        // Static gradient only
        const heroSection = document.getElementById('hero-section');
        if (heroSection) {
            heroSection.style.animation = 'none';
            heroSection.style.background = 'linear-gradient(135deg, #383cb8 0%, #f0e748 100%)';
        }

        // Disable all animations globally
        const style = document.createElement('style');
        style.innerHTML = `
            * {
                animation: none !important;
                transition: none !important;
                transform: none !important;
                filter: none !important;
                backdrop-filter: none !important;
                box-shadow: none !important;
                text-shadow: none !important;
            }
            .loader-wrapper, .loader-wrapper * {
                animation: revert !important;
                filter: revert !important;
            }
        `;
        document.head.appendChild(style);

        console.log('🚨 Emergency mode activated - All animations disabled for maximum performance');
    }

    // ===== PARTICLES ANIMATION (ULTRA OPTIMIZED) =====
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        // NO particles on Android for maximum performance
        const isAndroid = isAndroidDevice();
        if (isAndroid) {
            console.log('⚡ Skipping particles on Android for performance');
            return;
        }

        // Ultra minimal particles for maximum performance
        const isLowPower = isLowPowerDevice();
        const particleCount = isLowPower ? 2 : 5; // Reduced from 3:8 to 2:5

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random size
            const size = Math.random() * 2 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Random horizontal position
            particle.style.left = `${Math.random() * 100}%`;

            // Even slower animation for minimal CPU usage
            const duration = Math.random() * 20 + 40; // Increased from 15+30 to 20+40
            particle.style.animationDuration = `${duration}s`;

            // Random delay
            const delay = Math.random() * 10;
            particle.style.animationDelay = `${delay}s`;

            // Random drift
            const drift = (Math.random() - 0.5) * 80;
            particle.style.setProperty('--drift', `${drift}px`);

            particlesContainer.appendChild(particle);
        }
    }

    // ===== SPARKLES ANIMATION (ULTRA OPTIMIZED) =====
    function createSparkles() {
        const sparklesContainer = document.getElementById('sparkles');
        if (!sparklesContainer) return;

        // NO sparkles on Android or low-power devices
        const isAndroid = isAndroidDevice();
        const isLowPower = isLowPowerDevice();
        if (isAndroid || isLowPower) {
            console.log('⚡ Skipping sparkles for performance');
            return;
        }

        const sparkleCount = 3; // Reduced from 5 to 3

        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';

            // Random position
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.left = `${Math.random() * 100}%`;

            // Random animation delay
            const delay = Math.random() * 5;
            sparkle.style.animationDelay = `${delay}s`;

            // Slower animation duration
            const duration = Math.random() * 4 + 5; // Increased from 3+4 to 4+5
            sparkle.style.animationDuration = `${duration}s`;

            sparklesContainer.appendChild(sparkle);
        }
    }

    // ===== THROTTLE FUNCTION FOR PERFORMANCE =====
    function throttle(func, wait) {
        let timeout;
        let lastRan;
        return function executedFunction(...args) {
            if (!lastRan) {
                func.apply(this, args);
                lastRan = Date.now();
            } else {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    if ((Date.now() - lastRan) >= wait) {
                        func.apply(this, args);
                        lastRan = Date.now();
                    }
                }, wait - (Date.now() - lastRan));
            }
        };
    }

    // ===== NAVBAR SCROLL EFFECT (THROTTLED) =====
    function handleNavbarScroll() {
        const navbar = document.getElementById('main-navbar');
        if (!navbar) return;

        const handleScroll = throttle(() => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 100); // Throttle to once every 100ms

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // ===== MOBILE MENU TOGGLE =====
    function setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });

            // Close menu when clicking on a link
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                });
            });
        }
    }

    // ===== DOWNLOAD PROPOSAL FUNCTION =====
    function downloadProposal() {
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = 'proposal.pdf';
        link.download = 'proposal.pdf'; // Force download with custom filename

        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Optional: Show a brief confirmation message
        console.log('Downloading proposal...');
    }

    // ===== LOADER - MUST RUN FIRST =====
    (function() {
        const loader = document.getElementById('loader');
        if (loader) {
            // Faster loader on Android for better perceived performance
            const loaderTime = isAndroidDevice() ? 1500 : 3000; // 1.5s on Android, 3s on others

            setTimeout(function() {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                setTimeout(function() {
                    loader.style.display = 'none';
                }, 800);
            }, loaderTime);
        }
    })();

    // ===== SCROLL INDICATOR - SMOOTH SCROLL TO NEXT SECTION =====
    (function() {
        const scrollIndicator = document.getElementById('scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function() {
                const skillsSection = document.getElementById('skills');
                if (skillsSection) {
                    skillsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });

            // Add hover effect
            scrollIndicator.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(-50%) scale(1.1)';
            });

            scrollIndicator.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(-50%) scale(1)';
            });
        }
    })();

    // ===== FLOATING BUBBLES ANIMATION =====
    (function() {
        const bubblesContainer = document.querySelector('.bubbles-container');
        if (!bubblesContainer) return;

        const colors = ['bubble-yellow', 'bubble-blue', 'bubble-gradient'];
        const bubbleCount = 5; // Reduced from 30 to 5 for maximum performance

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

            // Apply Android optimizations FIRST (after loader is visible)
            applyAndroidOptimizations();

            // Start performance monitoring
            monitorPerformance();

            // Initialize performance optimizations
            setupIntersectionObserver();
            handleLowBattery();
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
            document.querySelector('.hero-gradient').style.filter = `hue-rotate(${Math.random() * 30}deg)`;
        });

        card.addEventListener('mouseleave', function() {
            document.querySelector('.hero-gradient').style.filter = 'hue-rotate(0deg)';
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
                if (entry.target.dataset.step === '1') {
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
            testimonialDots[i].classList.remove('bg-indigo-500');
            testimonialDots[i].classList.add('bg-gray-300');
        });

        testimonials[index].classList.add('active');
        testimonialDots[index].classList.remove('bg-gray-300');
        testimonialDots[index].classList.add('bg-indigo-500');
        currentTestimonial = index;
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
    nextBtn.addEventListener('click', () => {
        clearInterval(testimonialInterval);
        nextTestimonial();
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(testimonialInterval);
        prevTestimonial();
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });

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

    function createConfetti() {
        for (let i = 0; i < 50; i++) { // Reduced from 100 for better performance
            confettiParticles.push(new Confetti());
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiParticles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        if (confettiParticles.length > 0) {
            requestAnimationFrame(animateConfetti);
        }
    }

    function stopConfetti() {
        setTimeout(() => {
            confettiParticles = [];
        }, 3000);
    }

    // ===== Form Submission with Confetti =====
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Trigger confetti
        createConfetti();
        animateConfetti();
        stopConfetti();

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

    // ===== Window Resize Handler =====
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

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

        // Disable confetti
        confettiParticles = [];
    }

    // ===== Performance Optimization - Detect Low-End Devices =====
    function isLowEndDevice() {
        // Check for low-end device indicators
        const isMobile = window.innerWidth < 768;
        const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
        const hasSlowConnection = navigator.connection &&
            (navigator.connection.effectiveType === 'slow-2g' ||
             navigator.connection.effectiveType === '2g' ||
             navigator.connection.effectiveType === '3g');

        // Check battery level if available
        let lowBattery = false;
        if (navigator.getBattery) {
            navigator.getBattery().then(battery => {
                if (battery.level < 0.2 && !battery.charging) {
                    lowBattery = true;
                    console.log('Low battery detected - reducing animations');
                    // Disable heavy animations
                    const blobs = document.querySelectorAll('.blob-shape');
                    blobs.forEach(blob => blob.style.display = 'none');
                }
            });
        }

        return isMobile || hasLowMemory || hasSlowConnection || lowBattery;
    }

    // ===== Initialize New Features with Performance Checks =====
    const lowEndDevice = isLowEndDevice();

    // Reduce animations on low-end devices
    if (lowEndDevice) {
        console.log('Low-end device detected - reducing animations');
        document.documentElement.style.setProperty('--animation-speed', '2');

        // Hide some decorative elements
        const sparkles = document.getElementById('sparkles');
        const rings = document.querySelector('.rings-container');
        const orbs = document.querySelector('.orbs-container');
        const lightRays = document.querySelector('.light-rays');

        if (sparkles) sparkles.style.display = 'none';
        if (rings) rings.style.display = 'none';
        if (orbs) orbs.style.display = 'none';
        if (lightRays) lightRays.style.display = 'none';
    }

    // ===== Pause animations when page is not visible =====
    document.addEventListener('visibilitychange', () => {
        const heroSection = document.getElementById('hero-section');
        if (!heroSection) return;

        if (document.hidden) {
            // Page is hidden - pause animations
            heroSection.style.animationPlayState = 'paused';
            const allAnimated = heroSection.querySelectorAll('*');
            allAnimated.forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        } else {
            // Page is visible - resume animations
            heroSection.style.animationPlayState = 'running';
            const allAnimated = heroSection.querySelectorAll('*');
            allAnimated.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }
    });

    createParticles();
    if (!lowEndDevice) {
        createSparkles();
    }
    handleNavbarScroll();
    setupMobileMenu();

    // ===== Parallax Effect for Hero Elements (HIGHLY OPTIMIZED) =====
    function initParallax() {
        const heroSection = document.getElementById('hero-section');
        if (!heroSection) return;

        // Disable parallax on low-end devices
        if (lowEndDevice) return;

        let ticking = false;
        let lastScrollTime = 0;
        const throttleDelay = 100; // Only update every 100ms

        window.addEventListener('scroll', () => {
            const now = Date.now();

            if (now - lastScrollTime < throttleDelay) return;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const heroHeight = heroSection.offsetHeight;

                    if (scrolled < heroHeight) {
                        // Fade out hero content only
                        const heroContent = heroSection.querySelector('.container');
                        if (heroContent) {
                            const opacity = 1 - (scrolled / heroHeight) * 1.5;
                            heroContent.style.opacity = Math.max(0, opacity);
                        }
                    }

                    lastScrollTime = now;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    initParallax();

    // ===== Interactive Mouse Movement Effect (DISABLED FOR PERFORMANCE) =====
    // Disabled to improve performance
    function initMouseEffect() {
        // Disabled for better performance
        return;
    }

    initMouseEffect();

    // ===== 3D Tilt Effect on Hero Title (DISABLED FOR PERFORMANCE) =====
    function init3DTilt() {
        // Disabled for better performance
        return;
    }

    init3DTilt();

    // ===== Touch Ripple Effect for Mobile =====
    function initTouchRipple() {
        const heroSection = document.getElementById('hero-section');
        if (!heroSection) return;

        heroSection.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            const ripple = document.createElement('div');
            ripple.className = 'touch-ripple';
            ripple.style.left = touch.clientX + 'px';
            ripple.style.top = touch.clientY + 'px';
            heroSection.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    }

    // Add ripple styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .touch-ripple {
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(240, 231, 72, 0.6) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            animation: ripple-expand 1s ease-out forwards;
            transform: translate(-50%, -50%);
        }

        @keyframes ripple-expand {
            0% {
                width: 20px;
                height: 20px;
                opacity: 1;
            }
            100% {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    initTouchRipple();

    // ===== Loader - Start Hero Animations (OPTIMIZED) =====
    setTimeout(() => {
        startHeroAnimations();
    }, 1000); // Reduced from 3800ms to 1000ms for maximum speed

    // ===== Network Canvas Animation (DISABLED FOR PERFORMANCE) =====
    // Disabled to improve page performance and scrolling speed

    // ===== Spotlight Effect (DISABLED FOR PERFORMANCE) =====
    // Disabled to improve scrolling performance

    // ===== Parallax Effect for Orbs and Shapes (DISABLED FOR PERFORMANCE) =====
    // Disabled to improve scrolling performance

    // ===== Magnetic Button Effect (DISABLED FOR PERFORMANCE) =====
    // Disabled to improve scrolling performance

    // ===== Smooth Scroll with Easing =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // ===== Scroll-based Animations (OPTIMIZED WITH THROTTLE) =====
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
                lastScrollY = scrollY;

                // Parallax background on scroll (DISABLED FOR PERFORMANCE)
                // const heroGradient = document.querySelector('.hero-gradient');
                // if (heroGradient) {
                //     heroGradient.style.transform = `translateY(${scrollY * 0.5}px)`;
                // }

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // ===== Cursor Trail Effect (DISABLED FOR PERFORMANCE) =====
    // Disabled to improve scrolling performance

    // ===== Stat Cards Tilt Effect (DISABLED FOR PERFORMANCE) =====
    // Disabled to improve scrolling performance

    // ===== Hero Particles Animation - BRAND COLORS EDITION (OPTIMIZED) =====
    function createParticles() {
        const particlesContainer = document.getElementById('particles-container');
        const particleCount = 15; // Reduced from 120 to 15 for maximum performance

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random colors using YOUR BRAND COLORS
            const colors = [
                '#f0e748',  // Primary Yellow
                '#ece89e',  // Light Yellow
                '#d8d9f4',  // Very Light Blue
                '#c4c6f8',  // Light Blue
                '#a1a4ec',  // Mid Blue
                '#7e82e0',  // Blue
                '#5b5fd4',  // Deep Blue
                '#383cb8',  // Secondary Deep Blue
                '#f0e748',  // Primary Yellow (repeat for more yellow)
                '#f0e748',  // Primary Yellow (repeat for more yellow)
                '#383cb8',  // Secondary Deep Blue (repeat for more blue)
                '#383cb8'   // Secondary Deep Blue (repeat for more blue)
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = color;
            particle.style.boxShadow = `0 0 15px ${color}, 0 0 30px ${color}`;

            // Random size between 3-12px
            const size = Math.random() * 9 + 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Random horizontal position
            particle.style.left = `${Math.random() * 100}%`;

            // Random animation delay
            particle.style.animationDelay = `${Math.random() * 15}s`;

            // Random animation duration
            particle.style.animationDuration = `${Math.random() * 8 + 10}s`;

            particlesContainer.appendChild(particle);
        }
    }

    // ===== Counter Animation =====
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');

        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target % 1 === 0 ? target : target.toFixed(1);
                }
            };

            updateCounter();
        });
    }

    // ===== Start Hero Animations =====
    function startHeroAnimations() {
        // Create particles
        createParticles();

        // Animate counters when hero card is visible
        const heroCard = document.querySelector('.hero-card');
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        if (heroCard) {
            cardObserver.observe(heroCard);
        }
    }

    // ===== Navbar Scroll Effect =====
    const navbar = document.querySelector('.navbar-brand');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ===== Mobile Menu Toggle (Enhanced) =====
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');

            // Animate hamburger to X
            const icon = mobileMenuBtn.querySelector('svg');
            if (icon) {
                if (mobileMenu.classList.contains('active')) {
                    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
                } else {
                    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                }
            }
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('svg');
                if (icon) {
                    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                }
            });
        });
    }

    // ===== INTERSECTION OBSERVER FOR OFF-SCREEN ANIMATIONS =====
    // Pause animations when elements are not visible in viewport
    function setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) return;

        const observerOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element is visible - resume animations
                    entry.target.style.animationPlayState = 'running';
                } else {
                    // Element is off-screen - pause animations
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        }, observerOptions);

        // Observe animated elements
        const animatedElements = document.querySelectorAll(
            '.blob-shape, .particle, .sparkle, .floating-shape, .orb, .animated-ring, .floating-dot, .light-ray'
        );

        animatedElements.forEach(el => observer.observe(el));
    }

    // ===== REDUCE ANIMATIONS ON LOW BATTERY =====
    function handleLowBattery() {
        if (!('getBattery' in navigator)) return;

        navigator.getBattery().then(battery => {
            function updateAnimations() {
                if (battery.level < 0.2 && !battery.charging) {
                    // Low battery - disable heavy animations
                    document.body.classList.add('low-battery-mode');

                    // Hide decorative elements
                    const decorative = document.querySelectorAll('.sparkle, .orb, .light-ray');
                    decorative.forEach(el => el.style.display = 'none');
                } else {
                    document.body.classList.remove('low-battery-mode');

                    // Restore decorative elements
                    const decorative = document.querySelectorAll('.sparkle, .orb, .light-ray');
                    decorative.forEach(el => el.style.display = '');
                }
            }

            // Check on load
            updateAnimations();

            // Listen for battery changes
            battery.addEventListener('levelchange', updateAnimations);
            battery.addEventListener('chargingchange', updateAnimations);
        });
    }

