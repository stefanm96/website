document.addEventListener('DOMContentLoaded', function() {

    var copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    function fitText() {
        var headlines = document.querySelectorAll('h1.responsive-headline');
        headlines.forEach(function(headline) {
            var windowWidth = window.innerWidth;
            var fontSize = Math.max(40, Math.min(90, windowWidth / 12));
            headline.style.fontSize = fontSize + 'px';
        });
    }

    setTimeout(fitText, 100);
    window.addEventListener('resize', fitText);

    document.querySelectorAll('.smoothscroll').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            var targetId = this.getAttribute('href');
            var targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                setTimeout(function() {
                    window.location.hash = targetId;
                }, 800);
            }
        });
    });

    var sections = document.querySelectorAll('section');
    var navLinks = document.querySelectorAll('nav a[href^="#"]');

    var observerOptions = {
        rootMargin: '-35% 0px -65% 0px',
        threshold: 0
    };

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var id = entry.target.getAttribute('id');
                var activeLink = document.querySelector('nav a[href="#' + id + '"]');

                navLinks.forEach(function(link) {
                    link.classList.remove('bg-primary-100', 'text-primary-700');
                    link.classList.add('text-gray-700', 'hover:text-gray-900', 'hover:bg-gray-100');
                });

                if (activeLink) {
                    activeLink.classList.remove('text-gray-700', 'hover:text-gray-900', 'hover:bg-gray-100');
                    activeLink.classList.add('bg-primary-100', 'text-primary-700');
                }
            }
        });
    }, observerOptions);

    sections.forEach(function(section) {
        observer.observe(section);
    });

    function setHeaderHeight() {
        var header = document.querySelector('header');
        if (header) {
            header.style.height = window.innerHeight + 'px';
        }

        var body = document.body;
        if (body) {
            body.style.width = window.innerWidth + 'px';
        }
    }

    setHeaderHeight();
    window.addEventListener('resize', setHeaderHeight);

    window.addEventListener('scroll', function() {
        var nav = document.querySelector('nav');
        var scrollY = window.scrollY;

        if (!nav) return;

        if (scrollY > 10) {
            nav.classList.add('shadow-md');
            nav.classList.remove('shadow-sm');
        } else {
            nav.classList.remove('shadow-md');
            nav.classList.add('shadow-sm');
        }
    });

    var goTopBtn = document.querySelector('#go-top a');
    if (goTopBtn) {
        goTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    var mobileMenuBtn = document.getElementById('mobile-menu-btn');
    var mobileMenu = document.getElementById('mobile-menu');
    var burgerIcon = document.getElementById('burger-icon');
    var closeIcon = document.getElementById('close-icon');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            var isOpen = !mobileMenu.classList.contains('hidden');
            if (isOpen) {
                mobileMenu.classList.add('hidden');
                burgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            } else {
                mobileMenu.classList.remove('hidden');
                burgerIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            }
        });

        document.querySelectorAll('.mobile-menu-link').forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                burgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            });
        });
    }

});
