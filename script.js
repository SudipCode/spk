// ===== INITIALIZATION =====
        document.addEventListener('DOMContentLoaded', function() {
            initializeSlider();
            initializeNavigation();
            initializeTheme();
            initializeSettings();
            initializeSliderDots();
        });

        // ===== SLIDER FUNCTIONALITY =====
        let currentSlide = 0;
        let sliderInterval;

        function initializeSlider() {
            const slider = document.getElementById('slider');
            const slides = slider.querySelectorAll('.slide');
            const slideCount = slides.length;

            // Create slider dots
            const controls = document.getElementById('slider-controls');
            for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('div');
                dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
                dot.addEventListener('click', () => goToSlide(i));
                controls.appendChild(dot);
            }

            // Auto-slide
            startSlider();
        }

        function startSlider() {
            sliderInterval = setInterval(() => {
                nextSlide();
            }, 5000); // Change slide every 5 seconds
        }

        function nextSlide() {
            const slides = document.querySelectorAll('.slide');
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }

        function goToSlide(index) {
            currentSlide = index;
            clearInterval(sliderInterval);
            updateSlider();
            startSlider();
        }

        function updateSlider() {
            const slider = document.getElementById('slider');
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Update dots
            document.querySelectorAll('.slider-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function initializeSliderDots() {
            // Already initialized in initializeSlider
        }

        // ===== NAVIGATION =====
        function initializeNavigation() {
            const hamburger = document.getElementById('hamburger');
            const mobileMenu = document.getElementById('mobile-menu');
            const navLinks = document.querySelectorAll('.nav-link');

            // Hamburger toggle
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });

            // Navigation link click handlers
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    navigateToSection(targetId);
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                });
            });

            // Smooth scroll with offset for header
            function navigateToSection(sectionId) {
                const sections = document.querySelectorAll('section');
                sections.forEach(section => {
                    section.classList.remove('active');
                });

                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            }
        }

        // ===== THEME SYSTEM =====
        function initializeTheme() {
            const themeBtn = document.getElementById('theme-btn');
            const modeToggle = document.getElementById('mode-toggle');

            // Check for saved preference or default to light mode
            const isDarkMode = localStorage.getItem('darkMode') === 'true';
            if (isDarkMode) {
                document.body.classList.add('dark-mode');
                themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
                modeToggle.classList.add('active');
            }

            // Theme button click
            themeBtn.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                const isDark = document.body.classList.contains('dark-mode');
                localStorage.setItem('darkMode', isDark);
                themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
                modeToggle.classList.toggle('active');
            });

            // Mode toggle in settings
            modeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                const isDark = document.body.classList.contains('dark-mode');
                localStorage.setItem('darkMode', isDark);
                modeToggle.classList.toggle('active');
                themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            });
        }

        // ===== SETTINGS PANEL =====
        function initializeSettings() {
            const settingsBtn = document.getElementById('settings-btn');
            const settingsPanel = document.getElementById('settings-panel');
            const colorCircles = document.querySelectorAll('.color-circle');

            // Settings button toggle
            settingsBtn.addEventListener('click', () => {
                settingsPanel.classList.toggle('active');
            });

            // Close settings when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.settings-btn') && !e.target.closest('.settings-panel')) {
                    settingsPanel.classList.remove('active');
                }
            });

            // Color theme selection
            colorCircles.forEach(circle => {
                circle.addEventListener('click', () => {
                    const color = circle.getAttribute('data-color');
                    applyColorTheme(color);

                    // Update active state
                    colorCircles.forEach(c => c.classList.remove('active'));
                    circle.classList.add('active');
                });
            });

            // Load saved color theme
            const savedColor = localStorage.getItem('colorTheme') || 'blue';
            applyColorTheme(savedColor);
            document.querySelector(`[data-color="${savedColor}"]`)?.classList.add('active');
        }

        function applyColorTheme(color) {
            const colors = {
                blue: { primary: '#007bff', dark: '#0056b3', light: '#80bdff' },
                red: { primary: '#dc3545', dark: '#c82333', light: '#f5c6cb' },
                green: { primary: '#28a745', dark: '#1e7e34', light: '#d4edda' },
                purple: { primary: '#9c27b0', dark: '#6a1b9a', light: '#e1bee7' },
                orange: { primary: '#fd7e14', dark: '#e0670e', light: '#ffe5cc' },
                teal: { primary: '#20c997', dark: '#1aa179', light: '#c3fae8' },
                pink: { primary: '#e91e63', dark: '#ad1457', light: '#f8bbd0' },
                indigo: { primary: '#6610f2', dark: '#520dc2', light: '#e7d4f5' }
            };

            const theme = colors[color] || colors.blue;

            document.documentElement.style.setProperty('--primary-color', theme.primary);
            document.documentElement.style.setProperty('--primary-dark', theme.dark);
            document.documentElement.style.setProperty('--primary-light', theme.light);

            localStorage.setItem('colorTheme', color);
        }

        // ===== UTILITY FUNCTIONS =====
        // Download CV Function
        function downloadCV() {
            // Download the CV Resume PDF file
            const element = document.createElement('a');
            element.setAttribute('href', 'images/CV Resume.pdf');
            element.setAttribute('download', 'CV Resume.pdf');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }

        // Prevent context menu on right-click (optional)
        // document.addEventListener('contextmenu', (e) => e.preventDefault());