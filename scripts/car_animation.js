const imagenesAutosHorizontales = [];
const imagenesAutosVerticales = [];
for (let i = 1; i <= 12; i++) {
    const imgH = new Image();
    imgH.src = `images/Horizontal/car${i}.png`;
    imagenesAutosHorizontales.push(imgH);

    const imgV = new Image();
    imgV.src = `images/Vertical/car${i}.png`;
    imagenesAutosVerticales.push(imgV);
}

function crearAutos(cantidad, esHorizontal) {
    const autos = [];
    for (let i = 0; i < cantidad; i++) {
        if (esHorizontal) {
            const direccion = i < cantidad / 2 ? 1 : -1;
            const x = direccion > 0 ? -50 - i * 100 : canvas.width + 50 + i * 100;
            const y = direccion > 0 ? canvas.height / 2 - 40 : canvas.height / 2 + 10;
            const img = imagenesAutosHorizontales[i];
            autos.push({ x, y, velocidad: 2 * direccion, horizontal: true, img });
        } else {
            const direccion = i < cantidad / 2 ? 1 : -1;
            const y = direccion > 0 ? -50 - i * 100 : canvas.height + 50 + i * 100;
            const x = direccion > 0 ? canvas.width / 2 - 40 : canvas.width / 2 + 10;
            const img = imagenesAutosVerticales[i];
            autos.push({ x, y, velocidad: 2 * direccion, horizontal: false, img });
        }
    }
    return autos;
}

const autosHorizontales = crearAutos(12, true);
const autosVerticales = crearAutos(12, false);

function animarAutos() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawIntersection();

    [...autosHorizontales, ...autosVerticales].forEach(auto => {
        if (auto.horizontal) {
            // Movimiento horizontal
            auto.x += auto.velocidad;
            if (auto.velocidad > 0 && auto.x > canvas.width) {
                auto.x = -50;
            } else if (auto.velocidad < 0 && auto.x < -50) {
                auto.x = canvas.width + 50;
            }
            ctx.drawImage(auto.img, auto.x, auto.y, 50, 30);
        } else {
            // Movimiento vertical
            auto.y += auto.velocidad;
            if (auto.velocidad > 0 && auto.y > canvas.height) {
                auto.y = -50;
            } else if (auto.velocidad < 0 && auto.y < -50) {
                auto.y = canvas.height + 50;
            }
            ctx.drawImage(auto.img, auto.x, auto.y, 30, 50);
        }
    });

    requestAnimationFrame(animarAutos);
}

animarAutos();