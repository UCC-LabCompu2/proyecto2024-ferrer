document.addEventListener('DOMContentLoaded', () => {
    /**
     * Anima un círculo en el canvas para simular una pantalla de carga.
     * @method animarCarga
     * @return {void} No retorna ningún valor
     */
    const animarCarga = () => {
        const canvas = document.getElementById('loadingCanvas');
        const contexto = canvas.getContext('2d');
        let angulo = 0;

        const dibujarCargando = () => {
            const width = canvas.width;
            const height = canvas.height;

            contexto.clearRect(0, 0, width, height);
            contexto.fillStyle = '#0095DD';
            contexto.beginPath();
            contexto.arc(width / 2, height / 2, 20, 0, Math.PI * 2);
            contexto.stroke();

            contexto.beginPath();
            contexto.moveTo(width / 2, height / 2);
            contexto.arc(width / 2, height / 2, 20, angulo, angulo + Math.PI / 2);
            contexto.fill();

            angulo += 0.1;
            if (canvas.style.display === 'block') {
                requestAnimationFrame(dibujarCargando);
            }
        };

        dibujarCargando();
    };

    /**
     * Muestra la pantalla de carga y redirige a la nueva página.
     * @method mostrarCargaYRedirigir
     * @param {Event} event - El evento del clic
     * @param {string} url - La URL a la que se redirige
     * @return {void} No retorna ningún valor
     */
    window.mostrarCargaYRedirigir = (event, url) => {
        event.preventDefault();
        const canvas = document.getElementById('loadingCanvas');
        canvas.style.display = 'block';
        animarCarga();

        setTimeout(() => {
            window.location.href = url;
        }, 2000); // Esperar 2 segundos para simular la carga
    };

    /**
     * Valida el formulario de registro, asegurándose de que todos los campos estén completos y correctos.
     * @method validarFormularioRegistro
     * @param {Event} event - El evento de envío del formulario
     * @return {void} No retorna ningún valor
     */
    const validarFormularioRegistro = (event) => {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const patronEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!nombre || !email || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        if (!patronEmail.test(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        if (password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        window.location.href = 'registro_exitoso.html';
    };

    /**
     * Valida el formulario de categorías.
     * @method validarFormularioCategorias
     * @param {Event} event - El evento de envío del formulario
     * @return {void} No retorna ningún valor
     */
    const validarFormularioCategorias = (event) => {
        event.preventDefault();
        const busqueda = document.getElementById('busqueda').value;

        if (!busqueda.trim()) {
            alert('Por favor, ingresa qué buscas de este viaje.');
            return;
        }

        window.location.href = 'resultados.html';
    };

    /**
     * Captura los datos del formulario de categorías y los almacena en el localStorage.
     * Luego redirige a la página de resultados.
     * @method capturarDatosYRedirigir
     * @return {void} No retorna ningún valor
     */
    const capturarDatosYRedirigir = () => {
        const datosViaje = {
            climaSeleccionado: document.getElementById('clima').value,
            tipoViajeSeleccionado: document.querySelector('input[name="tipo_viaje"]:checked').value,
            presupuestoSeleccionado: document.getElementById('presupuesto').value,
            cantidadViajeros: document.getElementById('viajeros').value,
            busquedaTexto: document.getElementById('busqueda').value
        };

        localStorage.setItem('datosViaje', JSON.stringify(datosViaje));
        window.location.href = 'resultados.html';
    };

    /**
     * Actualiza el contenido de la página de resultados con los datos del viaje almacenados en el localStorage.
     * @method actualizarResultados
     * @return {void} No retorna ningún valor
     */
    const actualizarResultados = () => {
        const datosViaje = JSON.parse(localStorage.getItem('datosViaje'));

        if (datosViaje) {
            const tituloResultado = document.getElementById('resultado-titulo');
            const descripcionResultado = document.getElementById('resultado-descripcion');
            const imagenResultado = document.getElementById('resultado-imagen');

            tituloResultado.textContent = `Destino ${datosViaje.tipoViajeSeleccionado} con clima ${datosViaje.climaSeleccionado}`;
            descripcionResultado.textContent = `Has seleccionado un viaje ${datosViaje.tipoViajeSeleccionado} con un presupuesto de $${datosViaje.presupuestoSeleccionado}. 
            Viajarás con ${datosViaje.cantidadViajeros} persona(s), buscando ${datosViaje.busquedaTexto}.`;

            const tipoViaje = datosViaje.tipoViajeSeleccionado === 'nacional' ? 'nacional' : 'internacional';
            switch (datosViaje.climaSeleccionado) {
                case 'tropical':
                    imagenResultado.src = `imagenes/${tipoViaje}_tropical.png`;
                    imagenResultado.alt = `Imagen de un destino ${tipoViaje} tropical`;
                    break;
                case 'templado':
                    imagenResultado.src = `imagenes/${tipoViaje}_templado.png`;
                    imagenResultado.alt = `Imagen de un destino ${tipoViaje} templado`;
                    break;
                case 'frío':
                    imagenResultado.src = `imagenes/${tipoViaje}_frio.png`;
                    imagenResultado.alt = `Imagen de un destino ${tipoViaje} frío`;
                    break;
                default:
                    imagenResultado.src = 'imagenes/default.png';
                    imagenResultado.alt = 'Imagen de un destino';
                    break;
            }
        }
    };

    const formularioRegistro = document.getElementById('registroForm');
    if (formularioRegistro) {
        formularioRegistro.addEventListener('submit', validarFormularioRegistro);
    }

    const formularioCategorias = document.getElementById('categoriasForm');
    if (formularioCategorias) {
        formularioCategorias.addEventListener('submit', validarFormularioCategorias);
    }

    const botonBuscarViaje = document.getElementById('buscarViaje');
    if (botonBuscarViaje) {
        botonBuscarViaje.addEventListener('click', capturarDatosYRedirigir);
    }

    if (window.location.pathname.endsWith('resultados.html')) {
        actualizarResultados();
    }
});
