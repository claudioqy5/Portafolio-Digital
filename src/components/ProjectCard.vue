<script setup>
import { ref } from 'vue'

defineProps({
  project: Object
})

const card = ref(null)

const handleMouseMove = (e) => {
  if (!card.value) return
  
  const rect = card.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = (y - centerY) / 10
  const rotateY = (centerX - x) / 10
  
  card.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
}

const handleMouseLeave = () => {
  if (!card.value) return
  card.value.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
}
</script>

<template>
  <div 
    class="project-card" 
    ref="card"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="project-image">
      <img :src="project.image" :alt="project.title">
      <div class="glitch-overlay"></div>
      <div class="project-overlay">
        <a :href="project.link" target="_blank" class="btn btn-small">Explorar Proyecto</a>
      </div>
    </div>
    <div class="project-info">
      <h4>{{ project.title }}</h4>
      <p>{{ project.description }}</p>
      
      <div class="tech-bars">
        <div v-for="tech in project.techStack" :key="tech.name" class="tech-bar-item">
          <div class="tech-info">
            <span class="tech-name">{{ tech.name }}</span>
            <span class="tech-percent">{{ tech.level }}%</span>
          </div>
          <div class="bar-container">
            <div class="bar-fill" :style="{ width: tech.level + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid var(--glass-border);
  transition: transform 0.15s ease-out, box-shadow 0.3s ease;
  transform-style: preserve-3d;
}

.project-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border-color: var(--primary);
}

.project-image {
  height: 240px;
  background: #1e293b;
  position: relative;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.1);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(7, 11, 20, 0.9), transparent);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 2rem;
  opacity: 0;
  transition: all 0.3s ease;
  transform: translateY(20px);
}

.project-card:hover .project-overlay {
  opacity: 1;
  transform: translateY(0);
}

.glitch-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%,
    rgba(0, 0, 0, 0.1) 50%
  ),
  linear-gradient(
    90deg,
    rgba(255, 0, 0, 0.03),
    rgba(0, 255, 0, 0.01),
    rgba(0, 0, 255, 0.03)
  );
  background-size: 100% 2px, 3px 100%;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .glitch-overlay {
  opacity: 1;
  animation: scanlines 0.2s linear infinite;
}

@keyframes scanlines {
  0% { background-position: 0 0; }
  100% { background-position: 0 4px; }
}

.project-info {
  padding: 2rem;
  transform: translateZ(20px);
}

h4 {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  background: linear-gradient(to right, #fff, #94a3b8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  color: var(--text-muted);
  font-size: 1rem;
  margin-bottom: 1rem;
  line-height: 1.6;
  text-align: justify;
  hyphens: auto;
}

.tech-bars {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.tech-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.tech-name {
  color: #fff;
}

.bar-container {
  height: 4px;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  border-radius: 2px;
  box-shadow: 0 0 10px var(--primary);
  transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-small {
  padding: 0.6rem 1.5rem;
  font-size: 0.9rem;
  background: white;
  color: black;
  border-radius: 8px;
}
</style>
