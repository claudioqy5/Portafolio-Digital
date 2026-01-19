<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursor = ref(null)
const follower = ref(null)

const onMouseMove = (e) => {
  const { clientX: x, clientY: y } = e
  
  if (cursor.value) {
    cursor.value.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }
  
  if (follower.value) {
    follower.value.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <div class="custom-cursor" ref="cursor"></div>
  <div class="cursor-follower" ref="follower"></div>
</template>

<style scoped>
.custom-cursor {
  position: fixed;
  width: 8px;
  height: 8px;
  background: var(--primary);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate3d(0, 0, 0);
  transition: transform 0.1s ease-out;
}

.cursor-follower {
  position: fixed;
  width: 40px;
  height: 40px;
  border: 2px solid var(--secondary);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate3d(0, 0, 0);
  transition: transform 0.2s ease-out;
  opacity: 0.5;
}

@media (max-width: 768px) {
  .custom-cursor, .cursor-follower {
    display: none;
  }
}
</style>
