const canvas = document.getElementById("trafficCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  // Ajustar tamaño del canvas a toda la ventana
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  drawIntersection();
}

function drawIntersection() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calles
    ctx.fillStyle = "#2A2E3A";
    ctx.fillRect(centerX - 40, 0, 80, canvas.height); // Calle vertical
    ctx.fillRect(0, centerY - 40, canvas.width, 80); // Calle horizontal

    // Divisores de carriles
    ctx.fillStyle = "#FFFF00";
    for (let i = 0; i < canvas.height; i += 50) {
        ctx.fillRect(centerX - 2, i, 4, 25); // Línea central vertical
    }
    for (let i = 0; i < canvas.width; i += 50) {
        ctx.fillRect(i, centerY - 2, 25, 4); // Línea central horizontal
    }

    const offset = 100; // Ajuste para acercar los semáforos a las calles
    drawTrafficLight(centerX - offset - 0.10, centerY - offset - 50, "horizontal"); // Noroeste
    drawTrafficLight(centerX + offset - 40, centerY - offset - 0.10, "vertical"); // Noreste
    drawTrafficLight(centerX - offset - 50, centerY + offset - 40, "vertical"); // Suroeste
    drawTrafficLight(centerX + offset - 40, centerY + offset - 50, "horizontal"); // Sureste
}

function drawTrafficLight(x, y, orientation) {
  ctx.fillStyle = "#1C1F27";

  if (orientation === "horizontal") {
    ctx.fillRect(x, y, 40, 100);

    // Luces
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc(x + 20, y + 20, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#FFFF00";
    ctx.beginPath();
    ctx.arc(x + 20, y + 50, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#00FF00";
    ctx.beginPath();
    ctx.arc(x + 20, y + 80, 10, 0, Math.PI * 2);
    ctx.fill();
  } else if (orientation === "vertical") {
    // Semáforo vertical
    ctx.fillRect(x, y, 100, 40);

    // Luces
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc(x + 20, y + 20, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#FFFF00";
    ctx.beginPath();
    ctx.arc(x + 50, y + 20, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#00FF00";
    ctx.beginPath();
    ctx.arc(x + 80, y + 20, 10, 0, Math.PI * 2);
    ctx.fill();
  }
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