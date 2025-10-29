// Navegación móvil
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Cambiar estilo de navbar al hacer scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 61, 92, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.background = 'rgba(0, 61, 92, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Animación de elementos al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Contador animado (para estadísticas si las agregas)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Inicializar tooltips o funcionalidades adicionales
document.addEventListener('DOMContentLoaded', () => {
    console.log('Del Mar al Plato - Página cargada correctamente');
    
    // Añadir efecto hover a las imágenes
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });

    // Lazy loading para imágenes
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Función para resaltar sección activa en navegación
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

highlightActiveSection();

// Efecto de escritura para el título (opcional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Prevenir que las imágenes se carguen antes de tiempo
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Manejo de errores de imágenes
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'https://via.placeholder.com/600x400?text=Imagen+no+disponible';
    });
});

// ============================================
// SISTEMA DE TRADUCCIÓN - DROPDOWN
// ============================================

// Toggle del dropdown al hacer clic en el botón
document.addEventListener('DOMContentLoaded', function() {
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    if (dropdownBtn && dropdownMenu) {
        dropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });
    }
});

// Cerrar dropdown al hacer clic fuera
window.addEventListener('click', function(e) {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu && !e.target.matches('.dropdown-btn')) {
        if (dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
        }
    }
});

// Función para cambiar idioma
function changeLang(lang, text) {
    // Actualizar el botón con el idioma seleccionado
    document.getElementById('currentLang').innerHTML = text + ' ▼';
    
    // Ocultar todos los elementos
    document.querySelectorAll('[data-lang]').forEach(element => {
        element.style.display = 'none';
    });
    
    // Mostrar solo elementos del idioma seleccionado
    document.querySelectorAll('[data-lang="' + lang + '"]').forEach(element => {
        element.style.display = 'block';
    });
    
    // Guardar preferencia en localStorage
    localStorage.setItem('preferred-language', lang);
    localStorage.setItem('preferred-language-text', text);
    
    // Cerrar el dropdown
    document.getElementById('dropdownMenu').classList.remove('show');
    
    // Mostrar notificación
    showLanguageNotification(text);
}

// Función para mostrar notificación de cambio de idioma
function showLanguageNotification(langText) {
    // Crear o usar notificación existente
    let notification = document.getElementById('lang-notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'lang-notification';
        notification.className = 'lang-notification';
        document.body.appendChild(notification);
    }
    
    notification.textContent = '🌐 Idioma cambiado a: ' + langText;
    notification.style.display = 'block';
    notification.style.animation = 'slideInRight 0.4s ease-out';
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease-out';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 400);
    }, 3000);
}

// Cargar idioma guardado al iniciar la página
window.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('preferred-language');
    const savedLanguageText = localStorage.getItem('preferred-language-text');
    
    if (savedLanguage) {
        // Actualizar el botón
        if (savedLanguageText) {
            document.getElementById('currentLang').innerHTML = savedLanguageText + ' ▼';
        }
        
        // Aplicar el idioma guardado
        document.querySelectorAll('[data-lang]').forEach(element => {
            element.style.display = 'none';
        });
        
        document.querySelectorAll('[data-lang="' + savedLanguage + '"]').forEach(element => {
            element.style.display = 'block';
        });
    } else {
        // Si no hay idioma guardado, mostrar español por defecto
        changeLang('es', '🇪🇸 Español');
    }
});

// Cerrar dropdown con la tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const dropdownMenu = document.getElementById('dropdownMenu');
        if (dropdownMenu && dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
        }
    }
});

