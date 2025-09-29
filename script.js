// JavaScript for portfolio website

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Language switching functionality
let currentLanguage = 'en';

// Load translations from translations.js file
document.addEventListener('DOMContentLoaded', () => {
    // Set default language or get from localStorage if available
    const savedLanguage = localStorage.getItem('portfolioLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        setLanguage(savedLanguage);
    } else {
        setLanguage('en');
    }
    
    // Language selector buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
        
        // Set active state for current language
        if (btn.getAttribute('data-lang') === currentLanguage) {
            btn.classList.add('active');
        }
    });
});

// Function to set language
function setLanguage(lang) {
    if (!translations[lang]) return;
    
    currentLanguage = lang;
    localStorage.setItem('portfolioLanguage', lang);
    
    // Update active state on language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Set RTL for Arabic
    if (lang === 'ar') {
        document.body.classList.add('rtl');
        document.dir = 'rtl';
    } else {
        document.body.classList.remove('rtl');
        document.dir = 'ltr';
    }
    
    // Update all text elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update all placeholder attributes with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a nav link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').substring(1) === current) {
            li.classList.add('active');
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Scroll reveal animation
window.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });
    
    // Observe all skill cards for staggered animation
    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        card.classList.add('reveal');
        observer.observe(card);
    });
});

// Add CSS class for reveal animations
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});
