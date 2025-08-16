document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const mainHeader = document.getElementById('mainHeader');

    // Toggle navigation menu visibility for mobile
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close navigation menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Add scroll effect to header for styling
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }

        if (window.innerWidth <= 768) { // Only on mobile
            if (lastScrollY < window.scrollY && window.scrollY > 100) {
                mainHeader.classList.add("header-hidden");
            } else {
                mainHeader.classList.remove("header-hidden");
            }
            lastScrollY = window.scrollY;
        }
    });
});