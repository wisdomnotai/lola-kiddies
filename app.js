// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ========================================
// HERO CAROUSEL WITH PROPER ANIMATIONS
// ========================================

const slides = document.querySelectorAll('.slide');
const progressBars = document.querySelectorAll('.bar-inner');
let current = 0;
let slideInterval;
const SLIDE_DURATION = 6000;

function runCarousel(index) {
    if (!slides[index]) return;
    
    const slide = slides[index];
    const img = slide.querySelector('.slide-img');
    const subtitle = slide.querySelector('.slide-subtitle');
    const title = slide.querySelector('.slide-title');
    const description = slide.querySelector('.slide-description');
    const btn = slide.querySelector('.slide-btn');

    // Kill previous animations
    slides.forEach((s, i) => {
        if (i !== index) {
            gsap.killTweensOf([
                s.querySelector('.slide-img'),
                s.querySelector('.slide-subtitle'),
                s.querySelector('.slide-title'),
                s.querySelector('.slide-description'),
                s.querySelector('.slide-btn')
            ]);
        }
    });

    // Reset all slides
    slides.forEach(s => s.classList.remove('active'));
    slide.classList.add('active');

    // Reset progress bars
    progressBars.forEach((bar, i) => {
        if (i !== index) {
            gsap.set(bar, { width: "0%" });
        }
    });

    // ANIMATION 1: Image Ken Burns zoom
    gsap.fromTo(img, 
        { scale: 1.15 }, 
        { 
            scale: 1, 
            duration: SLIDE_DURATION / 1000,
            ease: "power1.out" 
        }
    );

    // ANIMATION 2: Text reveals (staggered slide up)
    const textElements = [subtitle, title, description, btn].filter(el => el);
    
    gsap.fromTo(textElements, 
        { y: 60, opacity: 0 }, 
        { 
            y: 0, 
            opacity: 1, 
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.2
        }
    );

    // ANIMATION 3: Progress bar
    if (progressBars[index]) {
        gsap.fromTo(progressBars[index], 
            { width: "0%" }, 
            { 
                width: "100%", 
                duration: SLIDE_DURATION / 1000,
                ease: "none" 
            }
        );
    }
}

function nextSlide() {
    current = (current + 1) % slides.length;
    runCarousel(current);
}

// Start carousel
window.addEventListener('load', () => {
    runCarousel(0);
    slideInterval = setInterval(nextSlide, SLIDE_DURATION);
});

// ========================================
// SCROLL REVEAL ANIMATIONS (ON SCROLL!)
// ========================================

gsap.utils.toArray(".scroll-reveal").forEach((el) => {
    gsap.fromTo(el, 
        {
            y: 80,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "top 60%",
                toggleActions: "play none none reverse",
                // markers: true, // Uncomment to debug
            }
        }
    );
});

// ========================================
// HEADER COLOR SWITCHING (White/Black)
// ========================================

const header = document.getElementById('main-header');
const whiteSection = document.querySelector('.bg-white');

// Create scroll trigger for header color change
ScrollTrigger.create({
    trigger: whiteSection,
    start: "top 100px",
    end: "bottom 100px",
    onEnter: () => header.classList.add('header-dark'),
    onLeave: () => header.classList.remove('header-dark'),
    onEnterBack: () => header.classList.add('header-dark'),
    onLeaveBack: () => header.classList.remove('header-dark'),
    // markers: true, // Uncomment to debug
});

// Header background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('backdrop-blur-xl', 'bg-black/60', 'py-3');
        header.classList.remove('py-6');
    } else {
        header.classList.remove('backdrop-blur-xl', 'bg-black/60', 'py-3');
        header.classList.add('py-6');
    }
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// CLEANUP
// ========================================

window.addEventListener('beforeunload', () => {
    if (slideInterval) clearInterval(slideInterval);
    gsap.killTweensOf("*");
});
// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. HERO CAROUSEL LOGIC ---
    const slides = document.querySelectorAll('.slide');
    const bars = document.querySelectorAll('.bar-inner');
    let currentSlide = 0;
    const slideDuration = 5000; // 5 seconds

    function showSlide(index) {
        // Reset all slides and bars
        slides.forEach(slide => {
            slide.classList.remove('active');
            gsap.to(slide, { opacity: 0, duration: 1 });
        });
        bars.forEach(bar => gsap.set(bar, { width: "0%" }));

        // Activate current slide
        slides[index].classList.add('active');
        gsap.to(slides[index], { opacity: 1, duration: 1 });

        // Animate the progress bar
        gsap.to(bars[index], { 
            width: "100%", 
            duration: slideDuration / 1000, 
            ease: "none" 
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Start Carousel
    showSlide(0);
    setInterval(nextSlide, slideDuration);


    // --- 2. HEADER SCROLL EFFECT ---
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-black/80', 'backdrop-blur-xl', 'py-4');
            header.classList.remove('py-6');
        } else {
            header.classList.remove('bg-black/80', 'backdrop-blur-xl', 'py-4');
            header.classList.add('py-6');
        }
    });


    // --- 3. SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    revealElements.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%", // Starts when element is 85% from top of viewport
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        });
    });

    // Specific animation for product images (zoom effect on scroll)
    gsap.utils.toArray('.group img').forEach(img => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            scale: 1.1,
            ease: "none"
        });
    });
});
