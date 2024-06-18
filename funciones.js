document.addEventListener('DOMContentLoaded', () => {
    // Validación del formulario de registro
    const formularioRegistro = document.querySelector('#registroForm');
    if (formularioRegistro) {
        formularioRegistro.addEventListener('submit', (evento) => {
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
    const validarFormularioRegistro = () => {
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
            alert('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        // Si la validación es exitosa, redirigir a la página de registro exitoso
        window.location.href = 'registro_exitoso.html';
    };
});
document.addEventListener('DOMContentLoaded', () => {
    const formularioCategorias = document.querySelector('#categoriasForm');
    if (formularioCategorias) {
        formularioCategorias.addEventListener('submit', (evento) => {
            evento.preventDefault();
            validarFormularioCategorias();
        });
    }

    /**
     * Valida el formulario de categorías.
     * @method validarFormularioCategorias
     * @return {void} No retorna ningún valor
     */
    const validarFormularioCategorias = () => {
        const busqueda = document.getElementById('busqueda').value;

        if (!busqueda.trim()) {
            alert('Por favor, ingresa qué buscas de este viaje.');
            return;
        }

        window.location.href = 'resultados.html';
    };

    const botonBuscarViaje = document.getElementById('buscarViaje');
    if (botonBuscarViaje) {
        botonBuscarViaje.addEventListener('click', () => {
            validarFormularioCategorias();
        });
    }
});
/**
 * Captura los datos del formulario de categorías y los almacena en el localStorage.
 * Luego redirige a la página de resultados.
 * @method capturarDatosYRedirigir
 */
document.addEventListener('DOMContentLoaded', function() {
    const botonBuscarViaje = document.getElementById('buscarViaje');

    if (botonBuscarViaje) {
        botonBuscarViaje.addEventListener('click', function() {
            const clima = document.getElementById('clima').value;
            const tipoViaje = document.querySelector('input[name="tipo_viaje"]:checked').value;
            const presupuesto = document.getElementById('presupuesto').value;
            const viajeros = document.getElementById('viajeros').value;
            const busqueda = document.getElementById('busqueda').value;

            localStorage.setItem('datosViaje', JSON.stringify({
                clima,
                tipoViaje,
                presupuesto,
                viajeros,
                busqueda
            }));


            window.location.href = 'resultados.html';
        });
    }
});
/**
 * Actualiza el contenido de la página de resultados con los datos del viaje almacenados en el localStorage.
 * @method actualizarResultados
 */
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('resultados.html')) {
        const datosViaje = JSON.parse(localStorage.getItem('datosViaje'));

        if (datosViaje) {
            const titulo = document.getElementById('resultado-titulo');
            const descripcion = document.getElementById('resultado-descripcion');
            const imagen = document.getElementById('resultado-imagen');

            titulo.textContent = `Destino ${datosViaje.tipoViaje} con clima ${datosViaje.clima}`;
            descripcion.textContent = `Has seleccionado un viaje ${datosViaje.tipoViaje} con un presupuesto de $${datosViaje.presupuesto}. 
            Viajarás con ${datosViaje.viajeros} persona(s), buscando ${datosViaje.busqueda}.`;


            const tipoViaje = datosViaje.tipoViaje === 'nacional' ? 'nacional' : 'internacional';
            switch (datosViaje.clima) {
                case 'tropical':
                    imagen.src = `imagenes/${tipoViaje}_tropical.png`;
                    imagen.alt = `Imagen de un destino ${tipoViaje} tropical`;
                    break;
                case 'templado':
                    imagen.src = `imagenes/${tipoViaje}_templado.png`;
                    imagen.alt = `Imagen de un destino ${tipoViaje} templado`;
                    break;
                case 'frío':
                    imagen.src = `imagenes/${tipoViaje}_frio.png`;
                    imagen.alt = `Imagen de un destino ${tipoViaje} frío`;
                    break;
                default:
                    imagen.src = 'imagenes/default.png';
                    imagen.alt = 'Imagen de un destino';
                    break;
            }
        }
    }
});
