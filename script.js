// ========================
// DATA
// ========================

const SERVICES = [
    {
        icon: 'fa-heart',
        title: 'Wedding Cakes',
        desc: 'Multi-tiered masterpieces crafted to match your love story. Every layer tells a tale of elegance and devotion.'
    },
    {
        icon: 'fa-champagne-glasses',
        title: 'Anniversary Cakes',
        desc: 'Celebrate milestones with cakes as timeless as your journey together. Custom designs for every year.'
    },
    {
        icon: 'fa-gift',
        title: 'Birthday Cakes',
        desc: 'From whimsical to sophisticated, we create birthday cakes that make wishes come true.'
    },
    {
        icon: 'fa-sparkles',
        title: 'Custom Creations',
        desc: 'Your imagination, our artistry. Bespoke cakes designed from scratch for any occasion.'
    },
    {
        icon: 'fa-cake-candles',
        title: 'Event Dessert Tables',
        desc: 'Complete dessert spreads featuring cupcakes, pastries, and showstopping centerpiece cakes.'
    },
    {
        icon: 'fa-chef',
        title: 'Tasting Sessions',
        desc: 'Schedule a private tasting to discover your perfect flavor combination and design.'
    }
];

const GALLERY_IMAGES = [
    {
        url: 'https://images.pexels.com/photos/3923555/pexels-photo-3923555.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        alt: 'Black and gold luxury wedding cake',
        category: 'Wedding',
        title: 'Midnight Elegance',
        span: 'span-tall'
    },
    {
        url: 'https://images.unsplash.com/photo-1761110657716-1eb3cb62de97?crop=entropy&cs=srgb&fm=jpg&q=85',
        alt: 'Three tiered white cakes with pink roses',
        category: 'Wedding',
        title: 'Rose Garden Tiers',
        span: ''
    },
    {
        url: 'https://images.unsplash.com/photo-1761637604976-40612bc4544c?crop=entropy&cs=srgb&fm=jpg&q=85',
        alt: 'Chocolate cake with almonds',
        category: 'Celebration',
        title: 'Chocolate Dream',
        span: ''
    },
    {
        url: 'https://images.unsplash.com/photo-1769812343875-c40f9ec7f846?crop=entropy&cs=srgb&fm=jpg&q=85',
        alt: 'Miniature cakes and desserts',
        category: 'Events',
        title: 'Petite Delights',
        span: 'span-wide'
    },
    {
        url: 'https://images.unsplash.com/photo-1634839582502-c5d12a99db7d?crop=entropy&cs=srgb&fm=jpg&q=85',
        alt: 'Birthday cake with candles',
        category: 'Birthday',
        title: 'Birthday Bliss',
        span: ''
    },
    {
        url: 'https://images.pexels.com/photos/7248037/pexels-photo-7248037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        alt: 'Elegant three-tier wedding cake with flowers',
        category: 'Wedding',
        title: 'Floral Fantasy',
        span: ''
    }
];

// ========================
// DOM ELEMENTS
// ========================

const nav = document.getElementById('navigation');
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const mobileOverlay = document.getElementById('mobileOverlay');
const servicesGrid = document.getElementById('servicesGrid');
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');

// ========================
// NAVIGATION INTERACTIONS
// ========================

// Scroll effect on nav
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    mobileOverlay.classList.toggle('active');
});

// Close mobile menu on link click
const navLinkElements = document.querySelectorAll('.nav-link');
navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('open');
        mobileOverlay.classList.remove('active');
    });
});

// Close mobile menu on overlay click
mobileOverlay.addEventListener('click', () => {
    mobileToggle.classList.remove('active');
    navLinks.classList.remove('open');
    mobileOverlay.classList.remove('active');
});

// ========================
// RENDER SERVICES
// ========================

function renderServices() {
    servicesGrid.innerHTML = SERVICES.map((service, i) => `
        <div class="service-card reveal" style="transition-delay: ${i * 0.1}s">
            <div class="service-icon">
                <i class="fas ${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.desc}</p>
        </div>
    `).join('');
    
    // Re-observe new elements
    observeRevealElements();
}

// ========================
// RENDER GALLERY
// ========================

function renderGallery() {
    galleryGrid.innerHTML = GALLERY_IMAGES.map((img, i) => `
        <div class="gallery-item ${img.span} reveal" style="transition-delay: ${i * 0.1}s">
            <img src="${img.url}" alt="${img.alt}">
            <div class="gallery-item-overlay">
                <div>
                    <span class="gallery-item-label">${img.category}</span>
                    <div class="gallery-item-title">${img.title}</div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click handlers to gallery items
    document.querySelectorAll('.gallery-item').forEach((item, i) => {
        item.addEventListener('click', () => {
            openLightbox(GALLERY_IMAGES[i]);
        });
    });
    
    // Re-observe new elements
    observeRevealElements();
}

// ========================
// LIGHTBOX
// ========================

function openLightbox(image) {
    lightboxImage.src = image.url;
    lightboxImage.alt = image.alt;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

lightboxImage.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        closeLightbox();
    }
});

// ========================
// SCROLL REVEAL ANIMATION
// ========================

function observeRevealElements() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    reveals.forEach((el) => observer.observe(el));
}

// ========================
// CONTACT FORM
// ========================

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const event = document.getElementById('event').value;
    const message = document.getElementById('message').value;
    
    // You can add your own form handling logic here
    // For now, we'll just log the data and show a success message
    console.log('Form submitted:', {
        name,
        email,
        phone,
        event,
        message
    });
    
    // Show success message
    const button = contactForm.querySelector('.btn-submit');
    const originalText = button.textContent;
    button.textContent = 'Message Sent!';
    button.style.background = 'var(--gold-dark)';
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 3000);
});

// ========================
// INITIALIZE
// ========================

document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();
    
    // Render services and gallery
    renderServices();
    renderGallery();
    
    // Initialize reveal animations
    observeRevealElements();
});

// ========================
// SMOOTH SCROLL BEHAVIOR (for older browsers)
// ========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
