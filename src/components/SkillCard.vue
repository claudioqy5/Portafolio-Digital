<script setup>
defineProps({
  title: String,
  skills: Array
})

const getIconColor = (index) => {
  const colors = ['#6366f1', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b']
  return colors[index % colors.length]
}
</script>

<template>
  <div class="skills-category">
    <div class="category-header">
      <div class="header-icon"></div>
      <h3>{{ title }}</h3>
    </div>
    <div class="skills-grid">
      <div v-for="(skill, index) in skills" :key="skill.name" class="skill-item">
        <div class="icon-wrapper" :style="{ '--glow': getIconColor(index) }">
          <span class="skill-icon">{{ skill.icon }}</span>
        </div>
        <span class="skill-name">{{ skill.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skills-category {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  padding: 2.5rem;
  border-radius: 32px;
  border: 1px solid var(--glass-border);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.skills-category:hover {
  transform: translateY(-12px);
  border-color: var(--primary);
  background: rgba(30, 41, 59, 0.6);
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.header-icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 10px var(--primary);
}

h3 {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 2rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--glass);
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.skill-item:hover .icon-wrapper {
  transform: translateY(-5px) rotate(5deg);
  border-color: var(--glow);
  box-shadow: 0 10px 20px -5px var(--glow);
  background: rgba(255, 255, 255, 0.05);
}

.skill-icon {
  font-size: 1.8rem;
  filter: drop-shadow(0 0 5px rgba(0,0,0,0.5));
}

.skill-name {
  font-size: 0.9rem;
  color: var(--text-muted);
  font-weight: 500;
}

.skill-item:hover .skill-name {
  color: #fff;
}
</style>

