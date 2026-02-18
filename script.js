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
        title: 'Celeration Cakes',
        desc: 'Celebrate milestones with cakes as timeless as your journey together. Custom designs for every year.'
    },
    {
        icon: 'fa-gift',
        title: 'Birthday Cakes',
        desc: 'From whimsical to sophisticated, we create birthday cakes that make wishes come true.'
    },
    {
        icon: 'fa-wand-magic-sparkles',
        title: 'Custom Creations',
        desc: 'Your imagination, our artistry. Bespoke cakes designed from scratch for any occasion.'
    },
    {
        icon: 'fa-cake-candles',
        title: 'Event Dessert Tables',
        desc: 'Complete dessert spreads featuring cupcakes, pastries, and showstopping centerpiece cakes.'
    },
    {
        icon: 'fa-building',
        title: 'Corporate & Branding Cakes',
        desc: 'Custom cakes designed with company logos, launches, and events in mind.'
    }
];

const GALLERY_IMAGES = [
    {
        url: 'assets/img/wedding 3.jpg',
        alt: 'Elegant white wedding cake with floral accents',
        category: 'Wedding',
        title: 'Blue Serenity',
        span: 'span-tall'
    },
    {
        url: 'assets/img/Graduation.png',
        alt: 'Elegant graduation cake with academic theme and celebratory elements',
        category: 'Graduation',
        title: 'Academic Achievement',
        span: 'span-large'
    },
    {
        url: 'assets/img/Minecraft.png',
        alt: 'Fun Minecraft-themed birthday cake with pixelated decorations',
        category: 'Birthday',
        title: 'Pixel Party',
        span: 'span-square'
    },
    
    
    {
        url: 'assets/img/WEdding .jpg',
        alt: 'Romantic pink wedding cake with cascading roses',
        category: 'Wedding',
        title: 'Ivory Lace',
        span: 'span-tall'
    },
    {
        url: 'assets/img/Birthday.png',
        alt: 'Vibrant birthday cake with colorful sprinkles and candles',
        category: 'Birthday',
        title: 'Celebration Delight',
        span: 'span-tall'
    },
    {
        url: 'assets/img/Birthday Pink.png',
        alt: 'Fun pink birthday cake with colorful decorations',
        category: 'Birthday',
        title: 'Pink Paradise',
        span: 'span-square'
    },
    
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

// ========================
// Whatsapp Click Handler
// ========================

const whatsappNumber = "67077279361";

document.querySelectorAll(".contact-whatsapp").forEach(link => {
    link.setAttribute("href", `https://wa.me/${whatsappNumber}`);
});
