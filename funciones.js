document.addEventListener('DOMContentLoaded', function() {
    // Validación del formulario de registro
    const formularioRegistro = document.querySelector('#registroForm');
    if (formularioRegistro) {
        formularioRegistro.addEventListener('submit', function(evento) {
            evento.preventDefault();
            validarFormularioRegistro();
        });
    }

    // Función para validar el formulario de registro
    /**
     * Valida el formulario de registro, asegurándose de que todos los campos estén completos y correctos.
     * @method validarFormularioRegistro
     * @return {void} No retorna ningún valor
     */
    function validarFormularioRegistro() {
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('email').value;
        const contrasena = document.getElementById('password').value;
        const patronCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!nombre || !correo || !contrasena) {
            alert('Por favor, completa todos los campos.');
            return;
        }


        if (!patronCorreo.test(correo)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        if (contrasena.length < 6) {
            alert('La contrasena debe tener al menos 6 caracteres.');
            return;
        }

        // Si la validación es exitosa, redirigir a la página de registro exitoso
        window.location.href = 'registro_exitoso.html';
    }
});
