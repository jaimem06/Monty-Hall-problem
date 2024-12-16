const puertas = ['puerta1', 'puerta2', 'puerta3'];
const premios = ['premio1', 'premio2', 'premio3'];
const puertaPremio = Math.floor(Math.random() * 3); // Seleccionar aleatoriamente la puerta del premio
let seleccionInicial = null;
let seleccionFinal = null;
let montyAbre = null;

// Asignar premios a las puertas
puertas.forEach((_, index) => {
    const premio = document.getElementById(premios[index]);
    premio.src = index === puertaPremio ? 'images/car.png' : 'images/goat.png';
});

// Añadir evento de clic a cada puerta
puertas.forEach((_, index) => {
    const puerta = document.getElementById(puertas[index]);
    puerta.addEventListener('click', function() {
        if (seleccionInicial === null) {
            seleccionInicial = index;

            // Monty Hall abre una puerta con una cabra
            for (let i = 0; i < puertas.length; i++) {
                if (i !== seleccionInicial && i !== puertaPremio) {
                    montyAbre = i;
                    break;
                }
            }
            document.getElementById(puertas[montyAbre]).src = 'images/ABIERTA.png';
            document.getElementById(premios[montyAbre]).style.opacity = '1';

            // Mostrar el modal para preguntar si desea cambiar de puerta
            const modal = document.getElementById('modal');
            modal.style.display = 'block';

            document.getElementById('cambiar').addEventListener('click', function() {
                // Lógica para cambiar de puerta
                modal.style.display = 'none';
                seleccionFinal = null; // Resetear seleccionFinal para permitir nueva selección
                puertas.forEach((_, i) => {
                    if (i !== seleccionInicial && i !== montyAbre) {
                        const puerta = document.getElementById(puertas[i]);
                        puerta.addEventListener('click', cambiarPuerta);
                    }
                });
            });

            document.getElementById('conservar').addEventListener('click', function() {
                // Lógica para conservar la puerta
                modal.style.display = 'none';
                seleccionFinal = seleccionInicial;
                mostrarResultado(seleccionFinal);
            });
        }
    });
});

function cambiarPuerta(event) {
    const puertaId = event.target.id;
    seleccionFinal = puertas.indexOf(puertaId);
    mostrarResultado(seleccionFinal);
    // Remover el evento de clic para evitar múltiples selecciones
    puertas.forEach((_, i) => {
        const puerta = document.getElementById(puertas[i]);
        puerta.removeEventListener('click', cambiarPuerta);
    });
}

function mostrarResultado(seleccion) {
    document.getElementById(puertas[seleccion]).src = 'images/ABIERTA.png';
    document.getElementById(premios[seleccion]).style.opacity = '1';
    const resultado = seleccion === puertaPremio ? '¡Ganaste un coche!' : 'Lo siento, es una cabra.';
    Swal.fire({
        title: resultado,
        icon: seleccion === puertaPremio ? 'success' : 'error',
        confirmButtonText: 'OK'
    });
}