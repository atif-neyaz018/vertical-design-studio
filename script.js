// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top
    const btn = document.getElementById('backToTop');
    if (btn) {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// ===== HERO INTRO ANIMATION =====
const words = document.querySelectorAll('.word');
const timelessText = document.querySelector('.timeless-text');
const bgBarren = document.querySelector('.bg-barren');
const bgLuxury = document.querySelector('.bg-luxury');
const heroRest = document.querySelector('.hero-rest');

words.forEach((word, i) => {
    setTimeout(() => {
        word.classList.add('drop');
    }, 400 + (i * 350));
});

setTimeout(() => {
    words.forEach(word => word.classList.add('flip'));
}, 2400);

setTimeout(() => {
    timelessText.classList.add('show');
}, 3000);

setTimeout(() => {
    bgBarren.classList.add('hide');
    bgLuxury.classList.add('show');
}, 3400);

setTimeout(() => {
    heroRest.classList.add('show');
}, 4200);

// ===== SCROLL FADE IN =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const project = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        const waMessage = `Hi, I'm ${name}. Phone: ${phone}. Project: ${project}. ${message}`;
        window.open(`https://wa.me/917654641785?text=${encodeURIComponent(waMessage)}`, '_blank');
    });
}