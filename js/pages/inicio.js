// RUTA DEL ARCHIVO: js/pages/inicio.js

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const btnCerrar = document.querySelector('.lightbox-cerrar');
    const btnPrev = document.querySelector('.lightbox-prev');
    const btnNext = document.querySelector('.lightbox-next');

    // Convertimos NodeList a un Array real para poder usar su longitud e índices matemáticos
    const imagenesDestacadas = Array.from(document.querySelectorAll('.columna-destacados .img-producto img'));
    
    // Variable global (estado) que recuerda en qué foto estamos
    let indiceActual = 0;

    if (!lightbox || imagenesDestacadas.length === 0) return;

    // Función que carga la imagen en base al índice numérico
    const actualizarImagen = (indice) => {
        const img = imagenesDestacadas[indice];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = img.alt;
    };

    // 1. Abrir el lightbox
    imagenesDestacadas.forEach((img, indice) => {
        img.addEventListener('click', () => {
            indiceActual = indice; // Guardamos el número de la foto clickeada
            actualizarImagen(indiceActual);
            lightbox.classList.add('mostrar');
        });
    });

    // 2. Navegar hacia adelante (Bucle: si llega al final, vuelve a 0)
    const mostrarSiguiente = () => {
        indiceActual = (indiceActual + 1) % imagenesDestacadas.length;
        actualizarImagen(indiceActual);
    };

    // 3. Navegar hacia atrás (Bucle: si está en 0, va a la última foto)
    const mostrarAnterior = () => {
        indiceActual = (indiceActual - 1 + imagenesDestacadas.length) % imagenesDestacadas.length;
        actualizarImagen(indiceActual);
    };

    // 4. Función para cerrar
    const cerrarLightbox = () => {
        lightbox.classList.remove('mostrar');
    };

    // Asignamos los clics a los botones correspondientes
    btnCerrar.addEventListener('click', cerrarLightbox);
    btnNext.addEventListener('click', mostrarSiguiente);
    btnPrev.addEventListener('click', mostrarAnterior);

    // Cerrar al hacer clic en el fondo oscuro (exceptuando flechas y botones)
    lightbox.addEventListener('click', (evento) => {
        if (evento.target === lightbox) {
            cerrarLightbox();
        }
    });

    // Accesibilidad con el teclado
    document.addEventListener('keydown', (evento) => {
        // Si el lightbox no está abierto, no hacemos nada
        if (!lightbox.classList.contains('mostrar')) return;

        if (evento.key === 'Escape') cerrarLightbox();
        if (evento.key === 'ArrowRight') mostrarSiguiente();
        if (evento.key === 'ArrowLeft') mostrarAnterior();
    });
});