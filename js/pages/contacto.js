// RUTA DEL ARCHIVO: js/pages/contacto.js

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('miFormulario');

    if (!formulario) return;

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        // Validación nativa del navegador antes de procesar
        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        // Aviso al usuario (Nota técnica: No simula envío real a base de datos sin backend)
        alert('¡Formulario validado correctamente! Nota: Para recibir estos mensajes en producción, se requiere integrar un servicio de backend o API externa.');
        
        formulario.reset();
    });
});