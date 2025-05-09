/**
 * Portfolio Website JavaScript
 * Handles dark/light mode, mobile navigation, smooth scrolling, animations, and form submission
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const modeToggle = document.getElementById('mode-toggle');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const body = document.body;
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const contactForm = document.getElementById('contactForm');
    const sections = document.querySelectorAll('section');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    // Theme Toggle Functionality
    modeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Update icon based on mode
        const icon = modeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark');
        } else {
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'light') {
            body.classList.remove('dark-mode');
            modeToggle.querySelector('i').className = 'fas fa-sun';
        } else {
            body.classList.add('dark-mode');
            modeToggle.querySelector('i').className = 'fas fa-moon';
        }
    } else {
        // Default is dark mode, so set the moon icon
        modeToggle.querySelector('i').className = 'fas fa-moon';
    }
    
    // Mobile Navigation Toggle
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Change icon based on state
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    // Close mobile menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.querySelector('i').className = 'fas fa-bars';
        });
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate Skill Bars on Scroll
    function animateSkillBars() {
        const skillsSection = document.getElementById('skills');
        const sectionPosition = skillsSection.getBoundingClientRect();
        
        // If skills section is visible
        if (sectionPosition.top < window.innerHeight && sectionPosition.bottom >= 0) {
            skillProgressBars.forEach(bar => {
                const width = bar.style.width;
                // Only animate if not already animated
                if (width === '0px' || width === '' || width === '0%') {
                    const progressValue = bar.getAttribute('style').split(':')[1].trim();
                    bar.style.width = progressValue;
                }
            });
        }
    }
    
    // Handle Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            alert(`Thanks for your message, ${name}! I'll get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Active Navigation Link on Scroll
    function setActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Typing Effect for Typewriter
    function setupTypewriter() {
        const typewriterElement = document.querySelector('.typewriter');
        if (!typewriterElement) return;
        
        const text = typewriterElement.textContent;
        typewriterElement.textContent = '';
        typewriterElement.style.width = '0';
        
        let charIndex = 0;
        const typingSpeed = 100; // ms per character
        
        function typeChar() {
            if (charIndex < text.length) {
                typewriterElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, typingSpeed);
            }
        }
        
        // Start typing effect with a slight delay
        setTimeout(typeChar, 500);
    }
    
    // Intersection Observer for Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                // Add more section-specific animations here
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Event Listeners for Scroll Events
    window.addEventListener('scroll', () => {
        setActiveNavLink();
    });
    
    // Initialize typing effect
    setupTypewriter();
    
    // Initial call to set the active navigation link
    setActiveNavLink();
});