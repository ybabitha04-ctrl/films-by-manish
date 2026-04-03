document.addEventListener('DOMContentLoaded', () => {

    // ===== Navbar scroll behavior =====
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 80);
    });

    // ===== Mobile nav toggle =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ===== Parallax scrolling =====
    const parallaxElements = document.querySelectorAll('.hero-parallax, .parallax-bg');

    function updateParallax() {
        parallaxElements.forEach(el => {
            const section = el.parentElement;
            const rect = section.getBoundingClientRect();
            const speed = 0.3;
            const yPos = rect.top * speed;
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateParallax);
    });

    // ===== Scroll reveal animation =====
    const revealElements = document.querySelectorAll(
        '.about-image, .about-text, .gallery-item, .testimonial-card, .contact-info, .contact-image, .parallax-content'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== Gallery Lightbox =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageSources = [];
    let currentIndex = 0;

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        imageSources.push(img.src);

        item.addEventListener('click', () => {
            currentIndex = index;
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

    function showPrev() {
        currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
        lightboxImg.src = imageSources[currentIndex];
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % imageSources.length;
        lightboxImg.src = imageSources[currentIndex];
    }

    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-prev').addEventListener('click', showPrev);
    document.querySelector('.lightbox-next').addEventListener('click', showNext);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });

    // ===== Active nav link highlighting =====
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                link.classList.toggle('active', scrollY >= top && scrollY < top + height);
            }
        });
    });
});
