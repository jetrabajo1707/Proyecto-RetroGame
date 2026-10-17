// RUTA DEL ARCHIVO: js/main.js

import { inicializarComponentesGlobales } from './components.js';

function marcarEnlaceActivo() {
    const rutaActual = window.location.pathname.toLowerCase();
    const archivoActual = rutaActual.split('/').pop() || 'index.html';

    const enlacesMenu = document.querySelectorAll('.nav-menu a[data-page]');
    enlacesMenu.forEach((enlace) => {
        const paginaEnlace = enlace.getAttribute('data-page').toLowerCase();
        if (paginaEnlace === archivoActual) {
            enlace.classList.add('active');
            enlace.setAttribute('aria-current', 'page');
        } else {
            enlace.classList.remove('active');
            enlace.removeAttribute('aria-current');
        }
    });
}

function configurarMenuMovil() {
    const botonMenu = document.getElementById('menu-toggle');
    const menuNavegacion = document.getElementById('nav-menu');

    if (!botonMenu || !menuNavegacion) return;

    botonMenu.addEventListener('click', () => {
        const estaAbierto = menuNavegacion.classList.toggle('is-open');
        botonMenu.setAttribute('aria-expanded', String(estaAbierto));
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await inicializarComponentesGlobales();
    marcarEnlaceActivo();
    configurarMenuMovil();
});