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
  <Transition name="fade-screen">
    <div v-if="!isOut" class="loading-screen">
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
      
      <!-- Decorative scanning lines -->
      <div class="scan-line"></div>
    </div>
  </Transition>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  background: #070b14;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.loader-content {
  width: 300px;
  text-align: center;
}

.logo-animation {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.letter {
  color: var(--primary);
  text-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
  animation: bounce 1s infinite alternate;
}

.letter:nth-child(2) { animation-delay: 0.1s; }
.letter:nth-child(3) { animation-delay: 0.2s; }
.letter:nth-child(4) { animation-delay: 0.3s; }

@keyframes bounce {
  to { transform: translateY(-10px); color: var(--secondary); }
}

.progress-container {
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  transition: width 0.3s ease-out;
  box-shadow: 0 0 15px var(--primary);
}

.status-text {
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--text-muted);
  letter-spacing: 2px;
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
    rgba(99, 102, 241, 0.05) 50%,
    transparent 100%
  );
  background-size: 100% 4px;
  pointer-events: none;
  animation: scan 4s linear infinite;
}

@keyframes scan {
  from { transform: translateY(-100%); }
  to { transform: translateY(100%); }
}

.fade-screen-leave-active {
  transition: opacity 0.8s ease, filter 0.8s ease;
}

.fade-screen-leave-to {
  opacity: 0;
  filter: blur(20px);
}
</style>
