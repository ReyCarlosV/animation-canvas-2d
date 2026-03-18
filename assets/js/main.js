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
// Referencia al nuevo control
const selectorEfecto = document.getElementById("efecto");

// 🔵 TU CLASE ACTUALIZADA
class Circle {
  // Ahora el constructor recibe dx y dy para controlar la dirección del "disparo"
  constructor(x, y, radius, color, text, speed, dx, dy) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;

    this.dx = dx;
    this.dy = dy;
    
    this.gravity = 0.15; 
    this.bounce = 0.85;  
  }

  draw(context) {
    context.beginPath();
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);

    const gradient = context.createRadialGradient(
      this.posX, this.posY, this.radius * 0.3,
      this.posX, this.posY, this.radius
    );
    gradient.addColorStop(0, "rgba(255,255,255,0.6)");
    gradient.addColorStop(1, this.color);

    context.fillStyle = gradient;
    context.fill();

    context.lineWidth = 2;
    context.strokeStyle = "rgba(255,255,255,0.4)";
    context.stroke();

    context.fillStyle = "#000";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "14px Arial";
    context.fillText(this.text, this.posX, this.posY);
    context.closePath();
  }

  update(context) {
    this.draw(context);

    // Gravedad
    this.dy += this.gravity;

    // Pared derecha
    if (this.posX + this.radius > canvas.width) {
      this.posX = canvas.width - this.radius;
      this.dx = -this.dx * 0.9; // Pierde un poco de velocidad al chocar paredes
    }
    // Pared izquierda
    if (this.posX - this.radius < 0) {
      this.posX = this.radius;
      this.dx = -this.dx * 0.9; 
    }
    // Techo
    if (this.posY - this.radius < 0) {
      this.posY = this.radius;
      this.dy = -this.dy; 
    }
    // Suelo
    if (this.posY + this.radius > canvas.height) {
      this.posY = canvas.height - this.radius;
      this.dy = -this.dy * this.bounce; 
      this.dx = this.dx * 0.98; // Fricción en el suelo para que dejen de rodar eventualmente
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// 🎯 GENERAR CÍRCULOS (Lógica de físicas según selector)
function generarCirculos(cantidad) {
  circles = [];
  const efecto = selectorEfecto.value;

  for (let i = 0; i < cantidad; i++) {
    let radius = Math.floor(Math.random() * 30 + 20);
    let speed = Math.random() * 3 + 1;
    let color = `hsl(${Math.random() * 360}, 70%, 50%)`;
    
    let x, y, dx, dy;

    // Calculamos desde dónde salen y con qué fuerza según el selector
    switch (efecto) {
      case 'sup-izq':
        x = radius + 10;
        y = radius + 10;
        dx = speed * (Math.random() * 3 + 2); // Fuerte hacia la derecha
        dy = speed * (Math.random() * 2);     // Suave hacia abajo
        break;
        
      case 'sup-der':
        x = canvas.width - radius - 10;
        y = radius + 10;
        dx = -speed * (Math.random() * 3 + 2); // Fuerte hacia la izquierda
        dy = speed * (Math.random() * 2);
        break;
        
      case 'inf-izq':
        x = radius + 10;
        y = canvas.height - radius - 10;
        dx = speed * (Math.random() * 2 + 1);  // Hacia la derecha
        dy = -speed * (Math.random() * 5 + 4); // Fuerte hacia arriba (como un cañón)
        break;
        
      case 'inf-der':
        x = canvas.width - radius - 10;
        y = canvas.height - radius - 10;
        dx = -speed * (Math.random() * 2 + 1); // Hacia la izquierda
        dy = -speed * (Math.random() * 5 + 4); // Fuerte hacia arriba
        break;

      case 'baja-gravedad':
      default:
        x = Math.random() * (canvas.width - 2 * radius) + radius;
        y = Math.random() * (canvas.height - 2 * radius) + radius;
        dx = (Math.random() < 0.5 ? 1 : -1) * (speed * 1.5);
        dy = speed;
        break;
    }

    circles.push(
      new Circle(x, y, radius, color, "Tec" + (i + 1), speed, dx, dy)
    );
  }
}

// 🎚️ Evento para el nuevo selector
selectorEfecto.addEventListener("change", () => {
  generarCirculos(sliderCantidad.value);
});

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