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
    const navLinks = document.querySelectorAll('#nav-wrap a');
    
    const observerOptions = {
        rootMargin: '-35% 0px -65% 0px', // Similar to waypoints offset
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`#nav-wrap a[href="#${id}"]`);
                
                // Remove current class from all nav items
                navLinks.forEach(link => {
                    link.parentElement.classList.remove('current');
                });
                
                // Add current class to active nav item
                if (activeLink) {
                    activeLink.parentElement.classList.add('current');
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
    /* Navigation Fade In/Out
    ------------------------------------------------------ */

    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const nav = document.querySelector('#nav-wrap');
        
        if (!header || !nav) return;
        
        const headerHeight = header.offsetHeight;
        const scrollY = window.scrollY;
        const windowWidth = window.innerWidth;
        
        if ((scrollY > headerHeight * 0.20) && (scrollY < headerHeight) && (windowWidth > 768)) {
            nav.style.opacity = '0';
            nav.style.visibility = 'hidden';
            nav.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
        } else {
            if (scrollY < headerHeight * 0.20) {
                nav.classList.remove('opaque');
                nav.style.opacity = '1';
                nav.style.visibility = 'visible';
            } else {
                nav.classList.add('opaque');
                nav.style.opacity = '1';
                nav.style.visibility = 'visible';
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
    const nav = document.querySelector('#nav-wrap');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            nav.classList.toggle('mobile-active');
        });
    }
});