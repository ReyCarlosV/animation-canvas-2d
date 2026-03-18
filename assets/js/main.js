const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// 🎛️ Controles y Textos
const sliderCantidad = document.getElementById("cantidad");
const sliderAncho = document.getElementById("ancho");
const sliderAlto = document.getElementById("alto");

const valorCantidad = document.getElementById("valorCantidad");
const valorAncho = document.getElementById("valorAncho");
const valorAlto = document.getElementById("valorAlto");

// 🎭 Selectores de Efectos
const selectorEfecto = document.getElementById("efecto");
const selectorEstela = document.getElementById("estela");

let circles = [];

// 🔧 Actualizar tamaño del canvas
function actualizarCanvas() {
  canvas.width = sliderAncho.value;
  canvas.height = sliderAlto.value;

  valorAncho.textContent = sliderAncho.value;
  valorAlto.textContent = sliderAlto.value;
}

// 🔵 CLASE CIRCLE (Con físicas y estela)
class Circle {
  constructor(x, y, radius, color, text, speed, dx, dy) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;

    this.dx = dx;
    this.dy = dy;
    
    // Físicas
    this.gravity = 0.15; 
    this.bounce = 0.85;  

    // ☄️ Historial para la estela
    this.history = [];
  }

  draw(context) {
    // ☄️ 1. DIBUJAR LA ESTELA (Si está activada)
    if (selectorEstela && selectorEstela.value === 'con-estela') {
      for (let i = 0; i < this.history.length; i++) {
        let point = this.history[i];
        context.beginPath();
        
        let scale = i / this.history.length; // Las bolas viejas son más pequeñas
        context.arc(point.x, point.y, this.radius * scale, 0, Math.PI * 2);
        
        context.fillStyle = this.color;
        context.globalAlpha = scale * 0.4; // Transparencia gradual
        context.fill();
        context.closePath();
      }
      context.globalAlpha = 1.0; // Restaurar opacidad normal para el círculo principal
    }

    // 2. DIBUJAR EL CÍRCULO PRINCIPAL (Tu glass effect original)
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

    // ☄️ Guardar posición para la estela
    this.history.push({ x: this.posX, y: this.posY });
    if (this.history.length > 15) {
      this.history.shift(); // Evitar que el historial crezca al infinito
    }

    // Gravedad
    this.dy += this.gravity;

    // Pared derecha
    if (this.posX + this.radius > canvas.width) {
      this.posX = canvas.width - this.radius;
      this.dx = -this.dx * 0.9; // Fricción contra la pared
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
      this.dy = -this.dy * this.bounce; // Rebote perdiendo energía
      this.dx = this.dx * 0.98; // Fricción en el suelo
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// 🎯 GENERAR CÍRCULOS SEGÚN EL EFECTO ELEGIDO
function generarCirculos(cantidad) {
  circles = [];
  // Asegurarnos de que el selector exista antes de leer su valor
  const efecto = selectorEfecto ? selectorEfecto.value : 'baja-gravedad';

  for (let i = 0; i < cantidad; i++) {
    let radius = Math.floor(Math.random() * 30 + 20);
    let speed = Math.random() * 3 + 1;
    let color = `hsl(${Math.random() * 360}, 70%, 50%)`;
    
    let x, y, dx, dy;

    switch (efecto) {
      case 'sup-izq':
        x = radius + 10;
        y = radius + 10;
        dx = speed * (Math.random() * 3 + 2); 
        dy = speed * (Math.random() * 2);     
        break;
        
      case 'sup-der':
        x = canvas.width - radius - 10;
        y = radius + 10;
        dx = -speed * (Math.random() * 3 + 2); 
        dy = speed * (Math.random() * 2);
        break;
        
      case 'inf-izq':
        x = radius + 10;
        y = canvas.height - radius - 10;
        dx = speed * (Math.random() * 2 + 1);  
        dy = -speed * (Math.random() * 5 + 4); // Disparo hacia arriba
        break;
        
      case 'inf-der':
        x = canvas.width - radius - 10;
        y = canvas.height - radius - 10;
        dx = -speed * (Math.random() * 2 + 1); 
        dy = -speed * (Math.random() * 5 + 4); 
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

// 🎚️ EVENTOS DE LA INTERFAZ
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

if (selectorEfecto) {
  selectorEfecto.addEventListener("change", () => {
    generarCirculos(sliderCantidad.value);
  });
}

// 🔄 ANIMACIÓN
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach(c => c.update(ctx));
}

// 🚀 INICIALIZACIÓN
valorCantidad.textContent = sliderCantidad.value;
actualizarCanvas();
generarCirculos(sliderCantidad.value);
animate();