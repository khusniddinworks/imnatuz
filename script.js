/* 
  IMNAT UZ — INTELLIGENT SALES ENGINE 3.0
  Breakout Logic + Uzum Marketplace Integration
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. BOUTIQUE PRELOADER ---
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.remove('page-loading');
            startReveal(); // Scroll reveal init
        }, 800);
    }, 2000);

    window.toggleMobileMenu = () => {
        document.getElementById('mobile-menu').classList.toggle('active');
        document.body.style.overflow = document.body.style.overflow === 'hidden' ? '' : 'hidden';
    };

    // --- 2. HEADER & STICKY CTA SCROLL ---
    const header = document.querySelector('header');
    const stickyCta = document.getElementById('sticky-cta');
    
    window.addEventListener('scroll', () => {
        // Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Mobile Sticky CTA (Show after scroll 500px on mobile only)
        if (window.innerWidth <= 1024 && window.scrollY > 500) {
            stickyCta.classList.add('visible');
        } else {
            stickyCta.classList.remove('visible');
        }
    });

    // --- 3. SCROLL REVEAL SYSTEM ---
    const startReveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        reveals.forEach(el => observer.observe(el));
    };

    // Persistent offer timer has been removed per user feedback.

    // --- 5. LIVE SALES NOTIFICATIONS (FOMO) ---
    const salesData = [
        { name: "Sardor", city: "Toshkent", time: "3 daqiqa oldin" },
        { name: "Malika", city: "Samarqand", time: "12 daqiqa oldin" },
        { name: "Javohir", city: "Farg'ona", time: "7 daqiqa oldin" },
        { name: "Zuhra", city: "Namangan", time: "25 daqiqa oldin" },
        { name: "Dilshod", city: "Buxoro", time: "1 soat oldin" },
        { name: "Sohiba", city: "Xorazm", time: "45 daqiqa oldin" },
        { name: "Bekzod", city: "Andijon", time: "2 daqiqa oldin" },
        { name: "Norgul", city: "Jizzax", time: "18 daqiqa oldin" },
        { name: "Otabek", city: "Navoiy", time: "9 daqiqa oldin" },
        { name: "Shahnoza", city: "Qashqadaryo", time: "35 daqiqa oldin" }
    ];

    const lsNotif = document.getElementById('live-sales');
    let salesIdx = 0;

    const showNextSale = () => {
        if (!lsNotif) return;
        const sale = salesData[salesIdx];
        lsNotif.querySelector('.ls-name').textContent = sale.name;
        lsNotif.querySelector('.ls-time').textContent = `${sale.time}, ${sale.city}`;
        
        lsNotif.classList.add('active');
        setTimeout(() => {
            lsNotif.classList.remove('active');
            // Random index for next time to feel more natural
            salesIdx = Math.floor(Math.random() * salesData.length);
        }, 6000);
    };

    // Human-like intervals (randomized)
    const nextInterval = () => Math.floor(Math.random() * (25000 - 15000 + 1)) + 15000;
    
    setTimeout(function repeat() {
        showNextSale();
        setTimeout(repeat, nextInterval());
    }, 8000);

    // --- 6. SMART BREAKOUT & REDIRECT ---
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isInstagram = /Instagram|FBAN|FBAV/i.test(navigator.userAgent);
    const breakoutOverlay = document.getElementById('breakout-overlay');

    if (isInstagram && isMobile && !sessionStorage.getItem('breakout_dismissed')) {
        setTimeout(() => {
            breakoutOverlay.classList.add('visible');
        }, 1500);
    }

    window.closeBreakout = () => {
        breakoutOverlay.classList.remove('visible');
        sessionStorage.setItem('breakout_dismissed', 'true');
    };

    function openExternal(url) {
        if (/Android/i.test(navigator.userAgent) && isInstagram) {
            // Android Breakout Trick
            const intentUrl = 'intent://' + url.replace(/^https?:\/\//, '') + '#Intent;scheme=https;package=com.android.chrome;end';
            window.location.assign(intentUrl);
        } else {
            // iOS or other
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    }

    // Attach to Uzum Links
    document.querySelectorAll('a[href*="uzum.uz"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const link = btn.getAttribute('href');
            openExternal(link);
        });
    });

    // --- 6. SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- 7. CERTIFICATE LIGHTBOX ---
    const certModal = document.getElementById('certModal');
    const modalImg = document.getElementById('imgModal');

    document.querySelectorAll('.cert-item img').forEach(img => {
        img.addEventListener('click', () => {
            certModal.style.display = 'flex';
            modalImg.src = img.src;
        });
    });

    document.querySelector('.close-modal')?.addEventListener('click', () => {
        certModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === certModal) certModal.style.display = 'none';
    });
});
