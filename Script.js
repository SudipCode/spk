   // ==================== DOM Elements ====================
        const loader = document.getElementById('loader');
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const closeMenu = document.getElementById('closeMenu');
        const navLinks = document.querySelectorAll('nav ul li a, .mobile-menu ul li a');
        const pageSections = document.querySelectorAll('.page-section');
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dot');
        const settingsBtn = document.getElementById('settingsBtn');
        const settingsPanel = document.getElementById('settingsPanel');
        const modeToggle = document.getElementById('modeToggle');
        const themeCircles = document.querySelectorAll('.theme-circle');
        const contactForm = document.getElementById('contactForm');

        // ==================== Loader ====================
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }, 3200);
        });

        // ==================== Mobile Menu ====================
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target) && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        });

        // ==================== Navigation ====================
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add to clicked link
                link.classList.add('active');
                
                // Hide all sections
                pageSections.forEach(section => section.classList.remove('active'));
                
                // Show target section
                const targetPage = link.getAttribute('data-page');
                document.getElementById(targetPage).classList.add('active');
                
                // Close mobile menu
                mobileMenu.classList.remove('active');
            });
        });

        // ==================== Slider ====================
        let currentSlide = 0;
        const totalSlides = slides.length;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                dots[i].classList.remove('active');
            });
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        // Auto slide every 5 seconds
        let slideInterval = setInterval(nextSlide, 5000);

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            });
        });

        // Pause on hover
        document.querySelector('.hero').addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        document.querySelector('.hero').addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });

        // ==================== Skills Animation ====================
        function animateSkills() {
            const skillProgress = document.querySelectorAll('.skill-progress');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progress = entry.target;
                        const width = progress.style.width;
                        progress.style.width = '0%';
                        setTimeout(() => {
                            progress.style.width = width;
                        }, 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            skillProgress.forEach(bar => observer.observe(bar));
        }

        // Trigger when About section is visible
        const aboutSection = document.getElementById('about');
        const aboutObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateSkills();
                aboutObserver.unobserve(aboutSection);
            }
        }, { threshold: 0.3 });

        aboutObserver.observe(aboutSection);

        // ==================== Settings Panel ====================
        settingsBtn.addEventListener('click', () => {
            settingsPanel.classList.toggle('active');
        });

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target) && settingsPanel.classList.contains('active')) {
                settingsPanel.classList.remove('active');
            }
        });

        // Night Mode Toggle
        modeToggle.addEventListener('click', () => {
            modeToggle.classList.toggle('active');
            document.body.classList.toggle('night-mode');
            
            // Save preference
            const isNight = document.body.classList.contains('night-mode');
            localStorage.setItem('nightMode', isNight);
        });

        // Theme Selection
        themeCircles.forEach(circle => {
            circle.addEventListener('click', () => {
                // Remove active from all
                themeCircles.forEach(c => c.classList.remove('active'));
                // Add to clicked
                circle.classList.add('active');
                
                // Apply theme
                const theme = circle.getAttribute('data-theme');
                document.documentElement.className = '';
                document.documentElement.classList.add(`theme-${theme}`);
                
                // Save preference
                localStorage.setItem('theme', theme);
            });
        });

        // Load saved preferences
        window.addEventListener('load', () => {
            const savedTheme = localStorage.getItem('theme') || 'blue';
            const savedNightMode = localStorage.getItem('nightMode') === 'true';
            
            // Apply theme
            document.documentElement.className = '';
            document.documentElement.classList.add(`theme-${savedTheme}`);
            themeCircles.forEach(c => {
                c.classList.toggle('active', c.getAttribute('data-theme') === savedTheme);
            });
            
            // Apply night mode
            if (savedNightMode) {
                document.body.classList.add('night-mode');
                modeToggle.classList.add('active');
            }
        });

        // ==================== Contact Form ====================
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });

        // ==================== Smooth Scroll for Anchor Links ====================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // ==================== Initialize ====================
        document.addEventListener('DOMContentLoaded', () => {
            // Ensure first slide is active
            showSlide(0);
            
            // Start slider
            slideInterval = setInterval(nextSlide, 5000);
        });