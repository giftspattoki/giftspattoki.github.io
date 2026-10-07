

// ===== AOS INITIALIZATION =====
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100,
});

// ===== PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 6 + 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = Math.random() * 10 + 8 + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        const colors = ['rgba(255, 215, 0, 0.6)', 'rgba(230, 57, 70, 0.4)', 'rgba(255, 255, 255, 0.3)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(particle);
    }
}
createParticles();

// ===== TYPING EFFECT =====
const typingTexts = [
    'Beautiful Gifts for Every Occasion 🎁',
    'Teddy Bears, Bouquets & More 🧸',
    'Making Moments Memorable ❤️',
    'Best Gift Shop in Pattoki 🏆',
    'Custom Gift Arrangements 🎀',
    'Free Home Delivery in Pattoki 🚚'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeText() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 30 : 60;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeText, typeSpeed);
}
typeText();

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const allNavLinks = document.querySelectorAll('.nav-link');

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Active nav link based on scroll
    updateActiveNav();
});

// Mobile toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Update active nav on scroll
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            allNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter when hero is in view
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    heroObserver.observe(heroStats);
}

// ===== PRODUCTS FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        productCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
                card.style.display = '';
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });
    });
});

// ===== GALLERY LIGHTBOX =====
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let currentImageIndex = 0;

const galleryImages = [];
galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    galleryImages.push(img.src);
    
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox(img.src);
    });
});

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content')) {
        closeLightbox();
    }
});

lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex];
});

lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex];
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
});

// Product view buttons
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const imgSrc = btn.getAttribute('data-img');
        const index = galleryImages.indexOf(imgSrc);
        if (index === -1) {
            galleryImages.push(imgSrc);
            currentImageIndex = galleryImages.length - 1;
        } else {
            currentImageIndex = index;
        }
        openLightbox(imgSrc);
    });
});

// ===== TESTIMONIALS SLIDER =====
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.getElementById('testimonialDots');
let currentTestimonial = 0;
let testimonialInterval;

// Create dots
testimonialCards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(index));
    dotsContainer.appendChild(dot);
});

function goToTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
    
    testimonialCards[index].classList.add('active');
    document.querySelectorAll('.dot')[index].classList.add('active');
    currentTestimonial = index;
}

function nextTestimonial() {
    const next = (currentTestimonial + 1) % testimonialCards.length;
    goToTestimonial(next);
}

// Auto-slide
function startTestimonialSlider() {
    testimonialInterval = setInterval(nextTestimonial, 4000);
}

startTestimonialSlider();

// Pause on hover
const sliderContainer = document.querySelector('.testimonials-slider');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
    sliderContainer.addEventListener('mouseleave', startTestimonialSlider);
}

// ===== CONTACT FORM - WHATSAPP =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    const whatsappMessage = `Hello Gifts Pattoki! 🎁%0A%0A` +
        `*Name:* ${name}%0A` +
        `*Phone:* ${phone}%0A` +
        `*Gift Type:* ${service}%0A` +
        `*Message:* ${message}%0A%0A` +
        `Sent from Gifts Pattoki Website`;
    
    window.open(`https://wa.me/923286900140?text=${whatsappMessage}`, '_blank');
});

// ===== BACK TO TOP =====
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== WHATSAPP FLOAT SHOW/HIDE =====
const whatsappFloat = document.getElementById('whatsappFloat');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    
    if (scrollTop > lastScrollTop && scrollTop > 500) {
        whatsappFloat.style.transform = 'scale(0.8)';
    } else {
        whatsappFloat.style.transform = 'scale(1)';
    }
    
    lastScrollTop = scrollTop;
});

// ===== TOUCH SWIPE FOR TESTIMONIALS =====
let touchStartX = 0;
let touchEndX = 0;

if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        clearInterval(testimonialInterval);
        
        if (diff > 0) {
            // Swipe left - next
            nextTestimonial();
        } else {
            // Swipe right - previous
            const prev = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
            goToTestimonial(prev);
        }
        
        startTestimonialSlider();
    }
}

// ===== PAGE VISIBILITY - Pause animations when tab is hidden =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(testimonialInterval);
    } else {
        startTestimonialSlider();
    }
});

console.log('%c Gifts Pattoki 🎁 ', 'background: #E63946; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Website by Afzaal Shah ', 'background: #1565C0; color: white; font-size: 14px; padding: 5px; border-radius: 3px;');
