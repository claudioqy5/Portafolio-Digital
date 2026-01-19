<template>
  <div class="animated-bg">
    <div v-for="n in 50" :key="n" class="particle" :style="generateStyle(n)"></div>
    <div class="grid-overlay"></div>
  </div>
</template>

<script setup>
const generateStyle = (n) => {
  const size = Math.random() * 3 + 1
  const duration = Math.random() * 20 + 10
  const delay = Math.random() * -20
  const left = Math.random() * 100
  const top = Math.random() * 100
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    top: `${top}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    opacity: Math.random() * 0.5 + 0.1
  }
}
</script>

<style scoped>
.animated-bg {
  position: fixed;
  inset: 0;
  z-index: -2;
  background: radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.05) 0%, transparent 40%),
              radial-gradient(circle at 90% 80%, rgba(236, 72, 153, 0.05) 0%, transparent 40%);
  overflow: hidden;
}

.particle {
  position: absolute;
  background: white;
  border-radius: 50%;
  pointer-events: none;
  animation: float linear infinite;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(circle at 50% 50%, black, transparent 90%);
}

@keyframes float {
  from { transform: translateY(110vh) rotate(0deg); }
  to { transform: translateY(-10vh) rotate(360deg); }
}
</style>
