// RUTA DEL ARCHIVO: js/components.js

/**
 * Determina el prefijo de ruta relativo según la ubicación del archivo HTML actual.
 * - Si estamos dentro de la carpeta "/paginas/", devuelve "../" (sube un nivel).
 * - Si estamos en la raíz ("index.html"), devuelve "./" (se mantiene en el mismo nivel).
 */
export function obtenerPrefijoRuta() {
    const rutaActual = window.location.pathname.toLowerCase();
    return rutaActual.includes('/paginas/') ? '../' : './';
}

/**
 * Carga un archivo HTML externo mediante fetch() y lo inyecta en un contenedor del DOM.
 * Ajusta automáticamente las rutas relativas de enlaces (data-route) e imágenes (data-src).
 *
 * @param {string} selectorContenedor - El ID del div donde se insertará el HTML (ej. '#header-placeholder').
 * @param {string} rutaRelativaComponente - Ruta del componente desde la raíz (ej. 'components/header.html').
 * @param {string} prefijo - El prefijo calculado ('./' o '../').
 */
async function cargarComponente(selectorContenedor, rutaRelativaComponente, prefijo) {
    const contenedor = document.querySelector(selectorContenedor);
    
    // Si la página actual no tiene ese contenedor, salimos sin generar error
    if (!contenedor) return false;

    const urlCompleta = `${prefijo}${rutaRelativaComponente}`;

    try {
        const respuesta = await fetch(urlCompleta);
        
        // Si el archivo no existe (404) o falla el servidor, lanzamos un error controlado
        if (!respuesta.ok) {
            throw new Error(`No se pudo cargar ${urlCompleta} (Estado HTTP: ${respuesta.status})`);
        }

        // Convertimos la respuesta en texto HTML y la insertamos en el div
        const html = await respuesta.text();
        contenedor.innerHTML = html;

        // 1. Normalizar enlaces internos (menú y footer) según la carpeta donde estemos
        const enlaces = contenedor.querySelectorAll('[data-route]');
        enlaces.forEach((enlace) => {
            const rutaDestino = enlace.getAttribute('data-route');
            enlace.setAttribute('href', `${prefijo}${rutaDestino}`);
        });

        // 2. Normalizar rutas de imágenes del componente (logo e iconos de redes sociales)
        const imagenes = contenedor.querySelectorAll('[data-src]');
        imagenes.forEach((img) => {
            const rutaImagen = img.getAttribute('data-src');
            img.setAttribute('src', `${prefijo}${rutaImagen}`);
        });

        return true;
    } catch (error) {
        console.error('Error al cargar componente:', error);
        
        // Mensaje accesible en pantalla si alguien abre el HTML con doble clic sin Live Server
        contenedor.innerHTML = `
            <div class="server-warning" role="alert">
                <strong>Aviso de desarrollo:</strong> No se pudo cargar <code>${rutaRelativaComponente}</code>. 
                Asegúrate de abrir el proyecto usando <strong>Live Server</strong> en Visual Studio Code y no haciendo doble clic en el archivo.
            </div>
        `;
        return false;
    }
}

/**
 * Función principal exportada que carga el Header y el Footer simultáneamente.
 */
export async function inicializarComponentesGlobales() {
    const prefijo = obtenerPrefijoRuta();

    // Promise.all ejecuta ambas descargas en paralelo para que la página cargue más rápido
    await Promise.all([
        cargarComponente('#header-placeholder', 'components/header.html', prefijo),
        cargarComponente('#footer-placeholder', 'components/footer.html', prefijo)
    ]);
}