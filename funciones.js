
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

const validarFormularioCategorias = (event) => {
    event.preventDefault();
    const busqueda = document.getElementById('busqueda').value;

    if (!busqueda.trim()) {
        alert('Por favor, ingresa qué buscas de este viaje.');
        return;
    }

    window.location.href = 'resultados.html';
};

const capturarDatosYRedirigir = (event) => {
    event.preventDefault();
    const busqueda = document.getElementById('busqueda').value;
    if (!busqueda.trim()) {
        alert('Por favor, ingresa qué buscas de este viaje.');
        return;
    }

    const datosViaje = {
        climaSeleccionado: document.getElementById('clima').value,
        tipoViajeSeleccionado: document.querySelector('input[name="tipo_viaje"]:checked').value,
        presupuestoSeleccionado: document.getElementById('presupuesto').value,
        cantidadViajeros: document.getElementById('viajeros').value,
        busquedaTexto: busqueda
    };

    localStorage.setItem('datosViaje', JSON.stringify(datosViaje));
    mostrarCargaConIcono(datosViaje.climaSeleccionado);
};

const mostrarCargaConIcono = (clima) => {
    const canvas = document.getElementById('loadingCanvas');
    const contexto = canvas.getContext('2d');
    const icono = new Image();
    let angulo = 0;

    switch (clima) {
        case 'tropical':
            icono.src = 'imagenes/sol.png';
            break;
        case 'templado':
            icono.src = 'imagenes/arbol.png';
            break;
        case 'frío':
            icono.src = 'imagenes/copos-nieve.png';
            break;
        default:
            icono.src = 'imagenes/default.png';
            break;
    }

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

        contexto.drawImage(icono, width / 2 - 15, height / 2 - 15, 30, 30);

        angulo += 0.1;
        requestAnimationFrame(dibujarCargando);
    };

    icono.onload = () => {
        const loadingContainer = document.getElementById('loadingContainer');
        loadingContainer.style.display = 'flex';
        dibujarCargando();
    };

    setTimeout(() => {
        const loadingContainer = document.getElementById('loadingContainer');
        loadingContainer.style.display = 'none';
        window.location.href = 'resultados.html';
    }, 2000);
};

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

if (window.location.pathname.endsWith('resultados.html')) {
    actualizarResultados();
}

