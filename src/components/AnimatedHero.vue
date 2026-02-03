<template>
  <div class="vader-bg">
    <!-- Main Background Image -->
    <div class="vader-layer"></div>
    
    <!-- Snow Particles -->
    <div class="snow-container">
      <div v-for="n in 150" :key="n" class="snow" :style="generateSnowStyle(n)"></div>
    </div>
    
    <!-- Breath/Steam Effect -->
    <div class="breath-container">
      <div class="steam steam-1"></div>
      <div class="steam steam-2"></div>
      <div class="steam steam-3"></div>
    </div>

    <!-- Overlay Gradient to blend with site -->
    <div class="overlay-vignette"></div>
  </div>
</template>

<script setup>
const generateSnowStyle = (n) => {
  const size = Math.random() * 4 + 1
  const duration = Math.random() * 3 + 2 // Faster fall for storm effect
  const delay = Math.random() * -10
  const left = Math.random() * 110 - 5 // Slight overflow coverage
  const blur = Math.random() * 2
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    opacity: Math.random() * 0.8 + 0.2,
    filter: `blur(${blur}px)`
  }
}
</script>

<style scoped>
.vader-bg {
  position: absolute;
  inset: 0;
  z-index: 1; /* Above AnimatedBackground */
  background: #000;
  overflow: hidden;
  pointer-events: none;
}

.vader-layer {
  position: absolute;
  inset: 0;
  background-image: url('../assets/vader-bg.png');
  background-size: cover;
  background-position: center 20%;
  filter: brightness(0.7) contrast(1.1);
  animation: breathing 6s ease-in-out infinite;
}

@keyframes breathing {
  0%, 100% { transform: scale(1); filter: brightness(0.6) contrast(1.1); }
  50% { transform: scale(1.06); filter: brightness(1) contrast(1.2); }
}

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
  animation: fall linear infinite;
}

@keyframes fall {
  0% { transform: translateY(-10vh) translateX(0) rotate(0deg); }
  25% { transform: translateY(25vh) translateX(-20px) rotate(90deg); }
  50% { transform: translateY(50vh) translateX(20px) rotate(180deg); }
  75% { transform: translateY(75vh) translateX(-20px) rotate(270deg); }
  100% { transform: translateY(110vh) translateX(40px) rotate(360deg); }
}

.breath-container {
  position: absolute;
  top: 32%; 
  right: 28%;
  width: 150px;
  height: 150px;
}

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

.steam-1 { animation: exhale 6s infinite; animation-delay: 2s; }
.steam-2 { animation: exhale 6s infinite; animation-delay: 2.3s; }
.steam-3 { animation: exhale 6s infinite; animation-delay: 2.6s; }

@keyframes exhale {
  0% { transform: scale(0.4) translate(0, 0); opacity: 0; }
  15%, 50% { opacity: 0.7; }
  100% { transform: scale(12) translate(-140px, 70px); opacity: 0; filter: blur(40px); }
}

.overlay-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.9) 100%);
}

@media (max-width: 968px) {
  .breath-container {
    right: 20%;
    top: 25%;
  }
}
</style>
