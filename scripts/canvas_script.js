const canvas = document.getElementById("trafficCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawIntersection();
}

function drawIntersection() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calles
    ctx.fillStyle = "#888888";
    ctx.fillRect(centerX - 40, 0, 90, canvas.height); // Calle vertical
    ctx.fillRect(0, centerY - 40, canvas.width, 90); // Calle horizontal

    // Divisores de carriles
    ctx.fillStyle = "#FFFF00";
    for (let i = 0; i < canvas.height; i += 50) {
        ctx.fillRect(centerX - 1.8, i, 10, 25); // Línea central vertical
    }
    for (let i = 0; i < canvas.width; i += 50) {
        ctx.fillRect(i, centerY - 1.8, 25, 10); // Línea central horizontal
    }

    // Semáforos
    const offset = 80; // Distancia desde el centro
    drawTrafficLight(centerX - offset - 40, centerY - offset - 60); // Noroeste
    drawTrafficLight(centerX + offset, centerY - offset - 60); // Noreste
    drawTrafficLight(centerX - offset - 40, centerY + offset, true); // Suroeste (rotado)
    drawTrafficLight(centerX + offset, centerY + offset, true); // Sureste (rotado)
}

function drawTrafficLight(x, y, rotated = false) {
    ctx.save();
    if (rotated) {
        ctx.translate(x + 20, y + 50);
        ctx.rotate(Math.PI / 2);
        ctx.translate(-(x + 20), -(y + 50));
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(x, y, 40, 60);

    // Luces
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc(x + 20, y + 15, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#FFFF00";
    ctx.beginPath();
    ctx.arc(x + 20, y + 30, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#00FF00";
    ctx.beginPath();
    ctx.arc(x + 20, y + 45, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function changeTraffic(mode) {
    if (mode === "rush") {
        alert("Simulando tráfico en horas pico.");
    } else {
        alert("Simulando tráfico en horas no pico.");
    }
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();