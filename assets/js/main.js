const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Controles
const sliderCantidad = document.getElementById("cantidad");
const sliderAncho = document.getElementById("ancho");
const sliderAlto = document.getElementById("alto");

const valorCantidad = document.getElementById("valorCantidad");
const valorAncho = document.getElementById("valorAncho");
const valorAlto = document.getElementById("valorAlto");

let circles = [];

// 🔧 Actualizar tamaño del canvas
function actualizarCanvas() {
  canvas.width = sliderAncho.value;
  canvas.height = sliderAlto.value;

  valorAncho.textContent = sliderAncho.value;
  valorAlto.textContent = sliderAlto.value;
}

// 🔵 TU CLASE (RESPETADA)
// 🔵 TU CLASE (RESPETADA Y CORREGIDA)
// 🔵 TU CLASE (CON GRAVEDAD BAJA)
class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;

    // Aumenté un poco la velocidad horizontal inicial para que se muevan más
    this.dx = (Math.random() < 0.5 ? 1 : -1) * (this.speed * 1.5); 
    this.dy = 1 * this.speed;
    
    // 🌍 Nuevas propiedades físicas
    this.gravity = 0.15; // Gravedad baja (puedes subirlo para que caigan más rápido)
    this.bounce = 0.85;  // Retiene el 85% de su energía al rebotar contra el suelo
  }

  draw(context) {
    context.beginPath();

    // 1. Forma geométrica
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);

    // 2. Glass effect
    const gradient = context.createRadialGradient(
      this.posX,
      this.posY,
      this.radius * 0.3,
      this.posX,
      this.posY,
      this.radius
    );

    gradient.addColorStop(0, "rgba(255,255,255,0.6)");
    gradient.addColorStop(1, this.color);

    context.fillStyle = gradient;
    context.fill();

    // 3. Borde
    context.lineWidth = 2;
    context.strokeStyle = "rgba(255,255,255,0.4)";
    context.stroke();

    // 4. Texto
    context.fillStyle = "#000";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "14px Arial";
    context.fillText(this.text, this.posX, this.posY);

    context.closePath();
  }

  update(context) {
    this.draw(context);

    // ☄️ Aplicamos la gravedad tirando del círculo hacia abajo
    this.dy += this.gravity;

    // 🔥 LÓGICA DE REBOTES ACTUALIZADA

    // Pared derecha
    if (this.posX + this.radius > canvas.width) {
      this.posX = canvas.width - this.radius;
      this.dx = -this.dx;
    }

    // Pared izquierda
    if (this.posX - this.radius < 0) {
      this.posX = this.radius;
      this.dx = -this.dx;
    }

    // Techo
    if (this.posY - this.radius < 0) {
      this.posY = this.radius;
      this.dy = -this.dy; 
    }

    // Suelo
    if (this.posY + this.radius > canvas.height) {
      this.posY = canvas.height - this.radius;
      // Al tocar el suelo, invierte la dirección pero pierde energía (multiplicando por this.bounce)
      this.dy = -this.dy * this.bounce; 
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// 🎯 Generar círculos (igual lógica pero múltiple)
function generarCirculos(cantidad) {
  circles = [];

  for (let i = 0; i < cantidad; i++) {
    let radius = Math.floor(Math.random() * 30 + 20);

    let x = Math.random() * (canvas.width - 2 * radius) + radius;
    let y = Math.random() * (canvas.height - 2 * radius) + radius;

    let speed = Math.random() * 3 + 1;

    let color = `hsl(${Math.random() * 360}, 70%, 50%)`;

    circles.push(
      new Circle(x, y, radius, color, i + 1, speed)
    );
  }
}

// 🎚️ Eventos
sliderCantidad.addEventListener("input", () => {
  valorCantidad.textContent = sliderCantidad.value;
  generarCirculos(sliderCantidad.value);
});

sliderAncho.addEventListener("input", () => {
  actualizarCanvas();
  generarCirculos(sliderCantidad.value);
});

sliderAlto.addEventListener("input", () => {
  actualizarCanvas();
  generarCirculos(sliderCantidad.value);
});

// 🔄 Animación (igual)
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach(c => c.update(ctx));
}

// 🚀 Inicialización
valorCantidad.textContent = sliderCantidad.value;
actualizarCanvas();
generarCirculos(sliderCantidad.value);
animate();