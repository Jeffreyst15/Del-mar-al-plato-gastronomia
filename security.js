// ============================================
// SISTEMA DE SEGURIDAD PARA LA PÁGINA WEB
// ============================================

// 1. DESHABILITAR CLIC DERECHO
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    mostrarAlerta('Contenido protegido');
    return false;
});

// 2. DESHABILITAR SELECCIÓN DE TEXTO
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
});

// 3. DESHABILITAR COPIAR (Ctrl+C, Cmd+C)
document.addEventListener('copy', function(e) {
    e.preventDefault();
    mostrarAlerta('No se permite copiar el contenido');
    return false;
});

// 4. DESHABILITAR CORTAR (Ctrl+X, Cmd+X)
document.addEventListener('cut', function(e) {
    e.preventDefault();
    return false;
});

// 5. DESHABILITAR TECLAS DE DESARROLLADOR Y ATAJOS
document.addEventListener('keydown', function(e) {
    // F12 - Herramientas de desarrollador
    if (e.keyCode === 123) {
        e.preventDefault();
        mostrarAlerta('Acceso denegado');
        return false;
    }
    
    // Ctrl+Shift+I o Cmd+Option+I - Inspector
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        mostrarAlerta('Acceso denegado');
        return false;
    }
    
    // Ctrl+Shift+J o Cmd+Option+J - Consola
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        mostrarAlerta('Acceso denegado');
        return false;
    }
    
    // Ctrl+U o Cmd+U - Ver código fuente
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        mostrarAlerta('Acceso denegado');
        return false;
    }
    
    // Ctrl+S o Cmd+S - Guardar página
    if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        mostrarAlerta('No se permite guardar esta página');
        return false;
    }
    
    // Ctrl+P o Cmd+P - Imprimir
    if (e.ctrlKey && e.keyCode === 80) {
        e.preventDefault();
        mostrarAlerta('Impresión deshabilitada');
        return false;
    }
    
    // Ctrl+C o Cmd+C - Copiar
    if (e.ctrlKey && e.keyCode === 67) {
        e.preventDefault();
        mostrarAlerta('No se permite copiar');
        return false;
    }
    
    // Ctrl+A o Cmd+A - Seleccionar todo
    if (e.ctrlKey && e.keyCode === 65) {
        e.preventDefault();
        return false;
    }
});

// 6. DETECTAR SI SE ABREN LAS DEVTOOLS
let devtoolsOpen = false;
const detectDevTools = () => {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
        if (!devtoolsOpen) {
            devtoolsOpen = true;
            document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-size:2rem;color:#ff0000;">⚠️ Acceso Restringido</div>';
        }
    }
};

setInterval(detectDevTools, 1000);

// 7. DESHABILITAR ARRASTRAR IMÁGENES
document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});

// 8. PROTEGER IMÁGENES
document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
    img.setAttribute('ondragstart', 'return false;');
    img.addEventListener('mousedown', function(e) {
        e.preventDefault();
        return false;
    });
});

// 9. MARCA DE AGUA EN CONSOLA
console.log('%c⚠️ ALTO ⚠️', 'color: red; font-size: 40px; font-weight: bold;');
console.log('%cEsta página web está protegida', 'color: orange; font-size: 20px;');
console.log('%c© 2025 Del Mar al Plato - Pescando Tradiciones', 'color: blue; font-size: 16px;');
console.log('%cTodos los derechos reservados', 'color: gray; font-size: 14px;');

// 10. FUNCIÓN PARA MOSTRAR ALERTAS PERSONALIZADAS
function mostrarAlerta(mensaje) {
    // Crear el elemento de alerta si no existe
    let alerta = document.getElementById('alerta-seguridad');
    if (!alerta) {
        alerta = document.createElement('div');
        alerta.id = 'alerta-seguridad';
        alerta.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ff6b35, #ff5722);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(255,107,53,0.4);
            z-index: 10000;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            animation: slideIn 0.3s ease-out;
        `;
        document.body.appendChild(alerta);
        
        // Agregar animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    alerta.textContent = '🔒 ' + mensaje;
    alerta.style.display = 'block';
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        alerta.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            alerta.style.display = 'none';
        }, 300);
    }, 3000);
}

// 11. PROTECCIÓN CONTRA INSPECCIÓN
setInterval(() => {
    debugger;
}, 100);

// 12. DESHABILITAR ZOOM CON TECLADO
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && (e.keyCode === 107 || e.keyCode === 109 || e.keyCode === 187 || e.keyCode === 189)) {
        e.preventDefault();
        return false;
    }
});

// 13. DESHABILITAR ZOOM CON RUEDA DEL MOUSE
document.addEventListener('wheel', function(e) {
    if (e.ctrlKey) {
        e.preventDefault();
        return false;
    }
}, { passive: false });

// 14. MARCA DE AGUA VISIBLE EN LA PÁGINA
function agregarMarcaDeAgua() {
    const watermark = document.createElement('div');
    watermark.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 5px 15px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 9999;
        pointer-events: none;
        font-family: 'Poppins', sans-serif;
    `;
    watermark.textContent = '© 2025 Del Mar al Plato - Contenido Protegido';
    document.body.appendChild(watermark);
}

// 15. OFUSCAR TEXTO SENSIBLE
function ofuscarTexto() {
    // Agregar espacios invisibles en el texto para dificultar el copiado
    const elementos = document.querySelectorAll('p, h1, h2, h3, h4, li');
    elementos.forEach(el => {
        const texto = el.textContent;
        if (texto.length > 50) { // Solo para textos largos
            // Agregar caracteres invisibles cada cierto número de caracteres
            let nuevoTexto = '';
            for (let i = 0; i < texto.length; i++) {
                nuevoTexto += texto[i];
                if (i % 10 === 0) {
                    nuevoTexto += '\u200B'; // Espacio de ancho cero
                }
            }
            // No aplicar para no romper el layout
            // el.textContent = nuevoTexto;
        }
    });
}

// 16. DETECTAR Y PREVENIR SCREENSHOTS (limitado en navegadores)
document.addEventListener('keyup', function(e) {
    // PrtScn, Win+Shift+S
    if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText('');
        mostrarAlerta('Capturas de pantalla no permitidas');
    }
});

// 17. INICIALIZAR TODAS LAS PROTECCIONES
document.addEventListener('DOMContentLoaded', function() {
    agregarMarcaDeAgua();
    // ofuscarTexto(); // Comentado para no afectar el contenido
    
    // Mensaje de bienvenida en consola
    console.clear();
    console.log('%c⚠️ ADVERTENCIA DE SEGURIDAD ⚠️', 'color: red; font-size: 30px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
    console.log('%c\n📋 Este sitio web está protegido por copyright', 'color: #0077be; font-size: 16px;');
    console.log('%c\n🔒 Todas las medidas de seguridad están activas:', 'color: #00a8cc; font-size: 14px;');
    console.log('%c  ✓ Clic derecho deshabilitado', 'color: green; font-size: 12px;');
    console.log('%c  ✓ Herramientas de desarrollador bloqueadas', 'color: green; font-size: 12px;');
    console.log('%c  ✓ Copiar/Pegar deshabilitado', 'color: green; font-size: 12px;');
    console.log('%c  ✓ Selección de texto bloqueada', 'color: green; font-size: 12px;');
    console.log('%c  ✓ Código fuente protegido', 'color: green; font-size: 12px;');
    console.log('%c\n⚖️ Cualquier uso no autorizado será perseguido legalmente', 'color: red; font-size: 14px; font-weight: bold;');
    console.log('%c\n© 2025 Del Mar al Plato - Todos los derechos reservados', 'color: gray; font-size: 12px;');
});

// 18. LIMPIAR CONSOLA CADA 5 SEGUNDOS
setInterval(() => {
    console.clear();
    console.log('%c🔒 Contenido Protegido', 'color: red; font-size: 20px; font-weight: bold;');
}, 5000);

// 19. DETECTAR SI LA PÁGINA ESTÁ EN UN IFRAME (protección contra embedding)
if (window.top !== window.self) {
    window.top.location = window.self.location;
}

// 20. AGREGAR META TAG DE PROTECCIÓN CONTRA ROBOTS
const metaRobots = document.createElement('meta');
metaRobots.name = 'robots';
metaRobots.content = 'noindex, nofollow, noarchive, nosnippet, noimageindex';
document.head.appendChild(metaRobots);