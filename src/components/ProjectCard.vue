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
  
  const rotateX = (y - centerY) / 20
  const rotateY = (centerX - x) / 20
  
  card.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  card.value.style.setProperty('--mx', `${(x / rect.width) * 100}%`)
  card.value.style.setProperty('--my', `${(y / rect.height) * 100}%`)
}

const handleMouseLeave = () => {
  if (!card.value) return
  card.value.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
}
</script>

<template>
  <div 
    class="project-card-new" 
    ref="card"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Border Glow Decor -->
    <div class="card-glow"></div>
    
    <div class="project-visual">
      <div class="image-wrapper">
        <img :src="project.image" :alt="project.title" class="main-img">
        <div class="image-noise"></div>
        <div class="image-vignette"></div>
      </div>
      
      <!-- Floating Badges -->
      <div class="floating-badges">
        <span 
          v-for="(tech, index) in project.techStack.slice(0, 3)" 
          :key="tech.name"
          class="tech-badge"
          :style="{ '--d': index * 0.1 + 's' }"
        >
          {{ tech.name }}
        </span>
      </div>

      <div class="project-action">
        <a :href="project.link" target="_blank" class="cyber-btn">
          <span class="btn-glitch"></span>
          EXPLORAR_DATA
        </a>
      </div>
    </div>

    <div class="project-details">
      <div class="details-header">
        <span class="project-index">PROJECT_0{{ project.title.length % 9 }}</span>
        <h4>{{ project.title }}</h4>
      </div>
      <p>{{ project.description }}</p>
      
      <div class="details-footer">
        <div class="footer-line"></div>
        <div class="footer-meta">
          <span class="meta-item"><span class="dot"></span> ACTIVE</span>
          <span class="meta-item"><span class="dot gold"></span> PREMIUM_BUILD</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-card-new {
  background: rgba(15, 20, 25, 0.7);
  backdrop-filter: blur(12px);
  border-radius: 30px;
  border: 1px solid var(--glass-border);
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(212, 175, 55, 0.1) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.project-card-new:hover .card-glow {
  opacity: 1;
}

.project-card-new:hover {
  border-color: var(--primary);
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6);
}

.project-visual {
  height: 280px;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--glass-border);
}

.image-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-card-new:hover .main-img {
  transform: scale(1.1) rotate(1deg);
}

.image-noise {
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.05;
  pointer-events: none;
}

.image-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10, 12, 16, 0.8), transparent 50%);
}

.floating-badges {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.tech-badge {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--d);
}

.project-card-new:hover .tech-badge {
  transform: translateY(0);
  opacity: 1;
}

.project-action {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 12, 16, 0.6);
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 0.3s;
}

.project-card-new:hover .project-action {
  opacity: 1;
}

.cyber-btn {
  padding: 1rem 2rem;
  background: var(--primary);
  color: #000;
  text-decoration: none;
  font-weight: 800;
  font-size: 0.8rem;
  letter-spacing: 2px;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

.cyber-btn:hover {
  background: #fff;
  transform: scale(1.05);
  box-shadow: 0 0 20px var(--primary);
}

.project-details {
  padding: 2.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: justify;
}

.details-header {
  margin-bottom: 1.5rem;
}

.project-index {
  font-family: monospace;
  color: var(--primary);
  font-size: 0.7rem;
  letter-spacing: 3px;
  display: block;
  margin-bottom: 0.5rem;
  opacity: 0.7;
}

h4 {
  font-size: 1.8rem;
  color: #fff;
  font-weight: 700;
  margin: 0;
}

p {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  flex: 1;
}

.details-footer {
  margin-top: auto;
}

.footer-line {
  height: 1px;
  background: linear-gradient(90deg, var(--glass-border), transparent);
  margin-bottom: 1.5rem;
}

.footer-meta {
  display: flex;
  gap: 2rem;
}

.meta-item {
  font-family: monospace;
  font-size: 0.6rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: 2px;
}

.dot {
  width: 4px;
  height: 4px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 5px #10b981;
}

.dot.gold {
  background: var(--primary);
  box-shadow: 0 0 5px var(--primary);
}

@media (max-width: 480px) {
  .project-visual { height: 200px; }
  .project-details { padding: 1.5rem; }
  h4 { font-size: 1.4rem; }
  p { font-size: 0.9rem; }
}
</style>
