<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursor = ref(null)
const follower = ref(null)

const isHovering = ref(false)
let ticking = false

const onMouseMove = (e) => {
  const { clientX: x, clientY: y } = e
  
  // Throttle with requestAnimationFrame for better performance
  if (!ticking) {
    requestAnimationFrame(() => {
      if (cursor.value) {
        cursor.value.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
      
      if (follower.value) {
        follower.value.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
      
      ticking = false
    })
    ticking = true
  }

  // Check if hovering over interactive element (outside RAF for responsiveness)
  const target = e.target
  isHovering.value = target.closest('a, button, .interactive, .hologram-container, .module-box, .project-card')
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  document.body.classList.add('custom-cursor-active')
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  document.body.classList.remove('custom-cursor-active')
})
</script>

<template>
  <div class="custom-cursor" :class="{ 'hover': isHovering }" ref="cursor"></div>
  <div class="cursor-follower" :class="{ 'hover': isHovering }" ref="follower"></div>
</template>

<style scoped>
.custom-cursor {
  position: fixed;
  width: 6px;
  height: 6px;
  background: var(--primary);
  border-radius: 50%;
  pointer-events: none;
  z-index: 100000; /* Absolute top */
  transform: translate3d(0, 0, 0);
  transition: width 0.3s, height 0.3s, background-color 0.3s;
  box-shadow: 0 0 10px var(--primary);
  will-change: transform;
  contain: layout style paint;
}

.custom-cursor.hover {
  width: 12px;
  height: 12px;
  background: #fff;
  box-shadow: 0 0 20px #fff;
}

.cursor-follower {
  position: fixed;
  width: 30px;
  height: 30px;
  border: 1px solid var(--primary);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate3d(0, 0, 0);
  transition: transform 0.15s ease-out, width 0.3s, height 0.3s, border-color 0.3s;
  opacity: 0.5;
  will-change: transform;
  contain: layout style paint;
}

.cursor-follower.hover {
  width: 60px;
  height: 60px;
  border-color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .custom-cursor, .cursor-follower {
    display: none;
  }
}
</style>
