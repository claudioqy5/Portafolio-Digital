<template>
  <!-- ============================================
       CONTENEDOR PRINCIPAL - Fondo Vader
       ============================================ -->
  <div class="vader-bg">
    <!-- Capa de imagen de fondo principal -->
    <div class="vader-layer"></div>
    
    <!-- Contenedor de partículas de nieve (150 partículas) -->
    <div class="snow-container">
      <div v-for="n in 150" :key="n" class="snow" :style="generateSnowStyle(n)"></div>
    </div>
    
    <!-- Efecto de respiración/vapor saliendo del casco -->
    <div class="breath-container">
      <div class="steam steam-1"></div>
      <div class="steam steam-2"></div>
      <div class="steam steam-3"></div>
    </div>

    <!-- Degradado overlay para mezclar con el resto del sitio -->
    <div class="overlay-vignette"></div>
  </div>
</template>

<script setup>
// ============================================
// FUNCIÓN - Generador de estilos para nieve
// ============================================
// Genera estilos aleatorios para cada partícula de nieve
// Parámetros: n (índice de la partícula)
// Retorna: objeto con estilos CSS dinámicos
const generateSnowStyle = (n) => {
  const size = Math.random() * 4 + 1                    // Tamaño: 1-5px
  const duration = Math.random() * 3 + 2                // Duración caída: 2-5s
  const delay = Math.random() * -10                     // Delay negativo para inicio escalonado
  const left = Math.random() * 110 - 5                  // Posición horizontal: -5% a 105%
  const blur = Math.random() * 2                        // Desenfoque: 0-2px
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    opacity: Math.random() * 0.8 + 0.2,                 // Opacidad: 0.2-1.0
    filter: `blur(${blur}px)`
  }
}
</script>

<style scoped>
/* ============================================
   CONTENEDOR PRINCIPAL
   ============================================ */
.vader-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: #000;
  overflow: hidden;
  pointer-events: none; /* No bloquea interacciones del mouse */
}

/* ============================================
   CAPA DE IMAGEN - Fondo Vader
   ============================================ */
.vader-layer {
  position: absolute;
  inset: 0;
  background-image: url('../assets/vader-bg.png');
  background-size: cover;
  background-position: center 20%;
  filter: brightness(0.7) contrast(1.1);
  animation: breathing 6s ease-in-out infinite; /* Efecto de respiración sutil */
}

/* Animación de respiración - escala y brillo */
@keyframes breathing {
  0%, 100% { 
    transform: scale(1); 
    filter: brightness(0.6) contrast(1.1); 
  }
  50% { 
    transform: scale(1.06); 
    filter: brightness(1) contrast(1.2); 
  }
}

/* ============================================
   PARTÍCULAS DE NIEVE
   ============================================ */
.snow-container {
  position: absolute;
  inset: 0;
}

.snow {
  position: absolute;
  top: -10px;
  background: #fff;
  border-radius: 50%;
  filter: blur(1px);
  animation: fall linear infinite; /* Caída continua de nieve */
}

/* Animación de caída con movimiento lateral y rotación */
@keyframes fall {
  0% { transform: translateY(-10vh) translateX(0) rotate(0deg); }
  25% { transform: translateY(25vh) translateX(-20px) rotate(90deg); }
  50% { transform: translateY(50vh) translateX(20px) rotate(180deg); }
  75% { transform: translateY(75vh) translateX(-20px) rotate(270deg); }
  100% { transform: translateY(110vh) translateX(40px) rotate(360deg); }
}

/* ============================================
   EFECTO DE RESPIRACIÓN/VAPOR
   ============================================ */
/* Contenedor posicionado cerca del respirador del casco */
.breath-container {
  position: absolute;
  top: 32%; 
  right: 28%;
  width: 150px;
  height: 150px;
}

/* Partículas de vapor individuales */
.steam {
  position: absolute;
  width: 30px;
  height: 30px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(15px);
  opacity: 0;
  transform: scale(0.5) translate(0, 0);
}

/* Delays variables para efecto de respiración escalonado */
.steam-1 { animation: exhale 6s infinite; animation-delay: 2s; }
.steam-2 { animation: exhale 6s infinite; animation-delay: 2.3s; }
.steam-3 { animation: exhale 6s infinite; animation-delay: 2.6s; }

/* Animación de exhalación - crece, se mueve y desaparece */
@keyframes exhale {
  0% { 
    transform: scale(0.4) translate(0, 0); 
    opacity: 0; 
  }
  15%, 50% { 
    opacity: 0.7; 
  }
  100% { 
    transform: scale(12) translate(-140px, 70px); 
    opacity: 0; 
    filter: blur(40px); 
  }
}

/* ============================================
   OVERLAY - Degradado de viñeta
   ============================================ */
/* Oscurece gradualmente hacia abajo para mezclar con el sitio */
.overlay-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.9) 100%);
}

/* ============================================
   RESPONSIVE - Móviles
   ============================================ */
@media (max-width: 968px) {
  /* Ajusta posición del vapor para pantallas pequeñas */
  .breath-container {
    right: 20%;
    top: 25%;
  }
}
</style>
