# 🎨 Canvas Glass App - Animación 2D con Físicas

Una aplicación web interactiva desarrollada con **HTML5 Canvas** y **JavaScript Vanilla**. Este proyecto simula físicas en 2D (gravedad, rebotes, pérdida de energía y fricción) aplicadas a múltiples elementos generados dinámicamente, todo envuelto en una interfaz moderna con diseño *Glassmorphism*.

## ✨ Características Principales

* **Simulación de Físicas:** Físicas de gravedad baja, colisiones contra los bordes del canvas, rebotes con pérdida de energía (amortiguación) y fricción en el suelo.
* **Interactividad Dinámica:** Controles en tiempo real para ajustar la cantidad de círculos y las dimensiones del canvas (`width` / `height`).
* **Generación Direccional:** Selector para "aventar" o disparar los círculos desde diferentes esquinas de la pantalla con fuerzas variables.
* **Efectos Visuales (VFX):** * Opción para activar/desactivar un **rastro de movimiento (estela)** que sigue a cada círculo.
    * Efecto de cristal (*Glass effect*) aplicado internamente a los círculos usando gradientes radiales del Canvas API.
* **Diseño UI:** Interfaz construida con **Bootstrap 5** combinada con CSS personalizado para lograr un efecto visual *Glassmorphism* (translúcido y desenfocado) sobre un fondo de pantalla.

## 🛠️ Tecnologías Utilizadas

* **HTML5** (Canvas API)
* **CSS3** (Efectos de backdrop-filter, flexbox)
* **JavaScript (ES6+)** (Programación Orientada a Objetos, `requestAnimationFrame`)
* **Bootstrap 5.3** (Sistema de grillas y componentes de UI)

## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura limpia y organizada en carpetas:

```text
📁 animation-canvas-2d
├── 📁 assets
│   ├── 📁 css
│   │   └── 📄 styles.css      # Estilos Glassmorphism y UI
│   ├── 📁 image
│   │   ├── 🖼️ buble.png       # Imagen de recurso / Favicon
│   │   └── 🖼️ fondo.jpg       # Imagen de fondo principal
│   └── 📁 js
│       └── 📄 main.js         # Lógica del Canvas, Físicas y OOP
└── 📄 index.html              # Estructura principal de la app