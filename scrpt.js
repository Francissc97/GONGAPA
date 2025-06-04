document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad "Leer Más"
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const card = this.closest('.card');
            if (!card) {
                console.error('No se encontró el elemento .card padre para el botón:', this);
                return; 
            }
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
            } else {
                console.error('No se encontraron .card-short-desc o .card-full-desc dentro de:', card);
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
                const headerOffset = document.querySelector('header').offsetHeight || 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simulación básica del carrito de compras (si tienes la sección de tienda)
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItemCountElement = document.querySelector('.cart-item-count');
    let itemCount = 0;

    if (cartItemCountElement) {
        if (addToCartButtons.length > 0) {
            addToCartButtons.forEach(button => {
                button.addEventListener('click', () => {
                    itemCount++;
                    cartItemCountElement.textContent = itemCount;
                    // Feedback visual simple (opcional)
                    button.textContent = 'Añadido!';
                    setTimeout(() => {
                        button.textContent = 'Añadir al Carrito';
                    }, 1500);
                    console.log('Producto añadido al carrito (simulación). Total: ' + itemCount);
                });
            });
        }
    } else if (addToCartButtons.length > 0) { // Solo advertir si hay botones de carrito pero no contador
        console.warn('Elemento .cart-item-count no encontrado para actualizar el contador.');
    }
});
