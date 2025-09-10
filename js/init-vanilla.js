/*-----------------------------------------------------------------------------------
/*
/* Vanilla JS Init - No jQuery Required
/*
-----------------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', function() {

    /*----------------------------------------------------*/
    /* Responsive Text Sizing (FitText replacement)
    ------------------------------------------------------ */
    
    function fitText() {
        const headlines = document.querySelectorAll('h1.responsive-headline');
        headlines.forEach(headline => {
            const windowWidth = window.innerWidth;
            // Calculate font size based on viewport width (similar to fitText)
            const fontSize = Math.max(40, Math.min(90, windowWidth / 12));
            headline.style.fontSize = fontSize + 'px';
        });
    }
    
    // Initial call and resize listener
    setTimeout(fitText, 100);
    window.addEventListener('resize', fitText);

    /*----------------------------------------------------*/
    /* Smooth Scrolling
    ------------------------------------------------------ */

    document.querySelectorAll('.smoothscroll').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL hash after scroll completes
                setTimeout(() => {
                    window.location.hash = targetId;
                }, 800);
            }
        });
    });

    /*----------------------------------------------------*/
    /* Navigation Highlighting (Waypoints replacement)
    ------------------------------------------------------ */

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    const observerOptions = {
        rootMargin: '-35% 0px -65% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`nav a[href="#${id}"]`);
                
                // Remove active classes from all nav items
                navLinks.forEach(link => {
                    link.classList.remove('bg-primary-100', 'text-primary-700');
                    link.classList.add('text-gray-700', 'hover:text-gray-900', 'hover:bg-gray-100');
                });
                
                // Add active classes to current nav item
                if (activeLink) {
                    activeLink.classList.remove('text-gray-700', 'hover:text-gray-900', 'hover:bg-gray-100');
                    activeLink.classList.add('bg-primary-100', 'text-primary-700');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });

    /*----------------------------------------------------*/
    /* Header Height Management
    ------------------------------------------------------ */

    function setHeaderHeight() {
        const header = document.querySelector('header');
        if (header) {
            header.style.height = window.innerHeight + 'px';
        }
        
        const body = document.body;
        if (body) {
            body.style.width = window.innerWidth + 'px';
        }
    }
    
    // Initial call and resize listener
    setHeaderHeight();
    window.addEventListener('resize', setHeaderHeight);

    /*----------------------------------------------------*/
    /* Navigation Scroll Effect & Back to Top Button
    ------------------------------------------------------ */

    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        const homeSection = document.querySelector('#home');
        const scrollY = window.scrollY;
        
        if (!nav) return;
        
        // Add shadow when scrolled
        if (scrollY > 10) {
            nav.classList.add('shadow-md');
            nav.classList.remove('shadow-sm');
        } else {
            nav.classList.remove('shadow-md');
            nav.classList.add('shadow-sm');
        }
        
        // Back to Top Button visibility
        if (homeSection) {
            const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
            const showButton = scrollY > homeBottom - 100; // Show when 100px past home section
            
            // Update Alpine.js data
            const backToTopDiv = document.querySelector('[x-data]');
            if (backToTopDiv && backToTopDiv._x_dataStack) {
                backToTopDiv._x_dataStack[0].showButton = showButton;
            }
        }
    });

    /*----------------------------------------------------*/
    /* Go to Top Button
    ------------------------------------------------------ */

    const goTopBtn = document.querySelector('#go-top a');
    if (goTopBtn) {
        goTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});

/*----------------------------------------------------*/
/* Mobile Navigation Toggle (if needed)
------------------------------------------------------ */

document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-btn');
    const nav = document.querySelector('#nav-wrap, .modern-nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            nav.classList.toggle('mobile-active');
        });
    }
});