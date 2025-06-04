document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad "Leer Más"
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const card = this.closest('.card');
            if (!card) return;
            const shortDesc = card.querySelector('.card-short-desc');
            const fullDesc = card.querySelector('.card-full-desc');

            if (fullDesc && shortDesc) {
                if (fullDesc.style.display === 'none' || fullDesc.style.display === '') {
                    shortDesc.style.display = 'none';
                    fullDesc.style.display = 'block';
                    this.textContent = 'Leer Menos';
                } else {
                    shortDesc.style.display = 'block';
                    fullDesc.style.display = 'none';
                    this.textContent = 'Leer Más';
                }
            }
        });
    });

    // Actualizar el año en el footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Funcionalidad del Menú Hamburguesa
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('header nav ul.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            menuToggle.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Smooth scroll para los enlaces del menú
    const navLinks = document.querySelectorAll('header nav ul.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight || 70; // Usa var(--header-height) si es accesible desde JS
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});