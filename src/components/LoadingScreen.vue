<script setup>
import { ref, onMounted } from 'vue'

const isOut = ref(false)
const progress = ref(0)
const emit = defineEmits(['loaded'])

onMounted(() => {
  const interval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += Math.random() * 15
      if (progress.value > 100) progress.value = 100
    } else {
      clearInterval(interval)
      setTimeout(() => {
        isOut.value = true
        setTimeout(() => {
          emit('loaded')
        }, 800)
      }, 500)
    }
  }, 100)
})
</script>

<template>
  <div class="loading-screen" :class="{ 'is-out': isOut }">
    <div class="panel panel-top"></div>
    <div class="panel panel-bottom"></div>
    
    <div class="loader-content">
      <div class="logo-animation">
        <span class="letter">C</span>
        <span class="letter">F</span>
        <span class="letter">Q</span>
        <span class="letter">Y</span>
      </div>
      <div class="progress-container">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="status-text">INITIALIZING SYSTEMS... {{ Math.round(progress) }}%</div>
    </div>
    
    <div class="scan-line"></div>
  </div>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
}

.loading-screen.is-out {
  pointer-events: none;
  visibility: hidden;
  transition: visibility 0s linear 1.2s;
}

.panel {
  position: absolute;
  left: 0;
  width: 100%;
  height: 50%;
  background: #070b14;
  z-index: -1;
  transition: transform 1.2s cubic-bezier(0.77, 0, 0.175, 1);
}

.panel-top {
  top: 0;
  border-bottom: 1px solid var(--glass-border);
}

.panel-bottom {
  bottom: 0;
  border-top: 1px solid var(--glass-border);
}

.is-out .panel-top {
  transform: translateY(-100%);
}

.is-out .panel-bottom {
  transform: translateY(100%);
}

.loader-content {
  width: 300px;
  text-align: center;
  transition: opacity 0.5s ease, transform 0.8s ease;
}

.is-out .loader-content {
  opacity: 0;
  transform: scale(1.5) rotate(5deg);
  filter: blur(20px);
  pointer-events: none;
}

.logo-animation {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.letter {
  color: var(--primary);
  text-shadow: 0 0 30px rgba(212, 175, 55, 0.5);
  animation: bounce 0.6s infinite alternate;
}

.letter:nth-child(2) { animation-delay: 0.1s; }
.letter:nth-child(3) { animation-delay: 0.2s; }
.letter:nth-child(4) { animation-delay: 0.3s; }

@keyframes bounce {
  to { 
    transform: translateY(-15px); 
    color: var(--secondary);
    text-shadow: 0 0 40px var(--primary);
  }
}

.progress-container {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  transition: width 0.3s ease-out;
  box-shadow: 0 0 20px var(--primary);
}

.status-text {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: var(--primary);
  letter-spacing: 3px;
  text-transform: uppercase;
  opacity: 0.8;
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(212, 175, 55, 0.05) 50%,
    transparent 100%
  );
  background-size: 100% 8px;
  pointer-events: none;
  animation: scan 4s linear infinite;
  z-index: 10;
}

.is-out .scan-line {
  display: none;
}

@keyframes scan {
  from { transform: translateY(-100%); }
  to { transform: translateY(100%); }
}
</style>

