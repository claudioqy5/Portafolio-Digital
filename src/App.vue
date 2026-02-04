<script setup>
import { onMounted, ref, computed } from 'vue'
import SkillCard from './components/SkillCard.vue'
import ProjectCard from './components/ProjectCard.vue'
import CustomCursor from './components/CustomCursor.vue'
import LoadingScreen from './components/LoadingScreen.vue'
import AnimatedHero from './components/AnimatedHero.vue'
import AnimatedBackground from './components/AnimatedBackground.vue'

import imgProjectEricka from './assets/proyectoERICKA.JPG'
import imgProjectColegioX from './assets/proyectoCOLEGIOX.JPG'
import imgPormedioFacil from './assets/proyectoPROMEDIOFACIL.JPG'
import imgHalcon from './assets/halconmilenario.png'
import imgHalconDown from './assets/halconmilenario1.png'
import imgDeathStar from './assets/estrellamuerte.png'

import imgProfile from './assets/mifotocara.JPG'
import imgfondo2 from './assets/fondo2.jpg'


const isLoading = ref(true)
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}
const skillCategories = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'Vue.js', icon: '🟢' },
      { name: 'JavaScript / TypeScript', icon: '💛' },
      { name: 'Angular', icon: '🛡️' },
      { name: 'HTML5/CSS3', icon: '🎨' },
      { name: 'Tailwind CSS', icon: '🌊' }
    ]
  },
  {
    title: 'Backend & APIs',
    skills: [
      { name: 'Node.js', icon: '🌳' },
      { name: 'Python', icon: '🐍' },
      { name: 'C# / .NET', icon: '🟣' },
      { name: 'REST APIs', icon: '🔌' },
      { name: 'FastAPI', icon: '⚡' },
      { name: 'AWS Lambda', icon: 'λ' }
    ]
  },
  {
    title: 'Databases',
    skills: [
      { name: 'SQL Server', icon: '💾' },
      { name: 'MySQL', icon: '🐬' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'DynamoDB', icon: '🍃' },
      { name: 'MariaDB', icon: '🐹' },
      { name: 'MongoDB', icon: '🌱' }
    ]
  },
  {
    title: 'Otras Habilidades',
    skills: [
      { name: 'Git/GitHub', icon: '🐙' },
      { name: 'Google Workspace', icon: '🌐' },
      { name: 'Cloud Computing', icon: '☁️' },
      { name: 'Metodologías Ágiles', icon: '⚡' }
    ]
  }
]

const isSubmitting = ref(false)
const formSubmitted = ref(false)
const formData = ref({
  name: '',
  email: '',
  message: ''
})

const handleFormSubmit = async () => {
  isSubmitting.value = true
  try {
    const response = await fetch('https://formsubmit.co/ajax/claudioquello5@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        Nombre: formData.value.name,
        Correo: formData.value.email,
        Mensaje: formData.value.message,
        _subject: "Nuevo mensaje desde tu Portafolio Tech"
      })
    })

    if (response.ok) {
      formSubmitted.value = true
      formData.value = { name: '', email: '', message: '' }
    } else {
      alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo o contáctame por WhatsApp.')
    }
  } catch (error) {
    console.error('Error enviando formulario:', error)
    alert('Error de conexión. Por favor revisa tu internet o usa WhatsApp.')
  } finally {
    isSubmitting.value = false
  }
}

const timelineEvents = [
  {
    period: '2022 – Actualidad',
    title: 'Ingeniería Informática',
    organization: 'Universidad Ricardo Palma',
    description: 'Estudiante del 8vo ciclo. Enfocado en análisis de sistemas, desarrollo de software eficiente y código limpio.',
    type: 'education'
  },
  {
    period: '2018 – 2023',
    title: 'Técnico Administrativo',
    organization: 'Ministerio de Salud – PS Santa Rosa de Belén',
    description: 'Gestión de bases de datos, automatización en VBA para procesos de admisión y mantenimiento de equipos.',
    type: 'work'
  },
  {
    period: '2017 – 2018',
    title: 'Personal Administrativo',
    organization: 'IEP María Auxiliadora',
    description: 'Optimización de procesos con macros/scripts VBA y mantenimiento preventivo de hardware/software.',
    type: 'work'
  },
  {
    period: '2016 – 2018',
    title: 'Formación Técnica Complementaria',
    organization: 'SISE / Británico / UNI',
    description: 'Microsoft Office Estándar (2016), Inglés Intermedio (2017) y Programación Java (2018).',
    type: 'cert'
  }
]

const timelineProgress = ref(0)
const isScrollingDown = ref(true)
let lastScrollY = 0

// Background Logic for About Me Section
const activeIdentity = ref(0)
const heroBackground = ref('')

const identityBackgrounds = {
  0: imgfondo2, // Default: Transparent to show blue/dark background 
}

const updateBackground = (id) => {
  activeIdentity.value = id
}

const currentAboutBg = computed(() => {
  return identityBackgrounds[activeIdentity.value] || identityBackgrounds[0]
})

const projects = [
  {
    title: 'Catering y Eventos Erick°a',
    description: 'Página web corporativa de catering y eventos que presenta de forma clara los servicios gastronómicos y de organización de eventos, con un diseño moderno orientado a promocionar la marca, generar confianza y facilitar el contacto con clientes.',
    image: imgProjectEricka,
    techStack: [
      { name: 'Vite', level: 100 },
      { name: 'Javascript', level: 80 },
      { name: 'HTML5/CSS3', level: 85 }
    ],
    link: 'https://erickacateringeventos.vercel.app/'
  },
  {
    title: 'Institución Educativa Privada María Auxiliadora',
    description: 'Intranet Educativa orientada a la gestión académica y administrativa de un colegio. El sistema incluye control de acceso por roles para alumnos, profesores, secretarios y administradores, permitiendo la gestión de usuarios, cursos, calificaciones y comunicaciones internas a través de una interfaz moderna y segura.',
    image: imgProjectColegioX,
    techStack: [
      { name: 'Vue.js', level: 100 },
      { name: '.NET', level: 90 },
      { name: 'SQL server', level: 100 }
    ],
    link: 'https://colegiox.vercel.app/'
  },
  {
    title: 'Promedio FACIL',
    description: 'Esta herramienta permite que los estudiantes puedan registrar sus notas, configurar los pesos de cada evaluación y calcular su promedio ponderado de manera precisa, además de proyectar cuánto necesitan obtener en futuras evaluaciones para alcanzar sus metas. Este informe detalla todo el proceso de desarrollo del proyecto, desde la definición del problema hasta la construcción, prueba y validación del sistema móvil.',
    image: imgPormedioFacil,
    techStack: [
      { name: 'Android Studio', level: 80 },
      { name: 'Kotlin', level: 70 }
    ],
    link: '#'
  }
]

const glowX = ref(0)
const glowY = ref(0)

const onMouseMove = (e) => {
  glowX.value = e.clientX
  glowY.value = e.clientY
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { 
    threshold: 0,
    rootMargin: '200px 0px 0px 0px' 
  })

  const sections = document.querySelectorAll('.section')
  sections.forEach(section => {
    observer.observe(section)
    // Precise rect check to reveal initially visible sections
    const rect = section.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      section.classList.add('visible')
    }
  })

  // Force reveal of active anchor section on load
  if (window.location.hash) {
    const activeSection = document.querySelector(window.location.hash)?.closest('.section')
    if (activeSection) activeSection.classList.add('visible')
  }

  // Header scroll detection
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY
    isScrollingDown.value = currentScroll > lastScrollY
    lastScrollY = currentScroll
    
    isScrolled.value = currentScroll > 50

    // Update timeline progress
    const timelineSection = document.querySelector('.section-timeline')
    if (timelineSection) {
      const rect = timelineSection.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const totalDist = timelineSection.offsetHeight + windowHeight
      const currentPos = windowHeight - rect.top
      const progress = Math.max(0, Math.min(1, currentPos / totalDist))
      timelineProgress.value = progress
    }
  })
})

const scrollToTop = (e) => {
  e.preventDefault()
  window.scrollTo({ top: 0, behavior: 'smooth' })
  closeMenu()
}

const snowflakes = Array.from({ length: 200 }).map(() => ({
  left: Math.random() * 100 + '%',
  top: Math.random() * 100 + '%', // Random start height
  animationDelay: Math.random() * 5 + 's',
  animationDuration: (Math.random() * 10 + 10) + 's', // Slower drift
  opacity: Math.random() * 0.8 + 0.2,
  size: Math.random() * 3 + 1 + 'px' // Smaller stars
}))
</script>

<template>
  <LoadingScreen @loaded="isLoading = false" />
  
  <div v-show="!isLoading" class="app-container" @mousemove="onMouseMove">
    <div class="scroll-progress"></div>
    <CustomCursor />
    <AnimatedBackground />
    
    <!-- Dynamic Glow Background -->
    <div 
      class="mouse-glow" 
      :style="{ transform: `translate3d(${glowX}px, ${glowY}px, 0)` }"
    ></div>

    <header class="navbar" :class="{ 'menu-open': isMenuOpen, 'scrolled': isScrolled }">
      <a href="#" class="logo" @click="scrollToTop">CFQY</a>
      
      <button class="menu-toggle" @click="toggleMenu" :aria-label="isMenuOpen ? 'Cerrar menú' : 'Abrir menú'">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>

      <nav :class="{ 'active': isMenuOpen }">
        <a href="#" @click="scrollToTop">Inicio</a>
        <a href="#about" @click="closeMenu">Sobre Mí</a>
        <a href="#timeline" @click="closeMenu">Trayectoria</a>
        <a href="#skills" @click="closeMenu">Habilidades</a>
        <a href="#projects" @click="closeMenu">Proyectos</a>
        <a href="#contact" @click="closeMenu">Contacto</a>
      </nav>
    </header>

    <main>
      <section id="hero" class="hero visible">
        <AnimatedHero />
        <div class="hero-content profile-layout">
          <div class="hero-text">
            <h1>
              Hola mundo, soy 
              <span class="bounce-name">
                <span 
                  v-for="(char, index) in ['C','l','a','u','d','i','o']" 
                  :key="index" 
                  class="highlight animate-gradient letter"
                  :style="{ '--d': (index * 0.1) + 's' }"
                >{{ char }}</span>
              </span>
            </h1>
            <p class="subtitle">
  Ingeniero Informático en formación, enfocado en crear soluciones tecnológicas innovadoras y aplicar inteligencia artificial para resolver problemas reales.
</p> 

            <div class="cta-group">
              <a href="https://github.com" target="_blank" class="btn btn-github">
                <span class="btn-icon">🐙</span> GitHub
              </a>
              <a href="https://wa.me/51962956919" target="_blank" class="btn btn-whatsapp">
                <span class="btn-icon">💬</span> WhatsApp
              </a>
              <a href="#contact" class="btn btn-primary">
                <span class="btn-icon">✉️</span> Correo
              </a>
            </div>
          </div>
          <div class="hero-image">
            <div class="hologram-container">
              <div class="ring ring-1"></div>
              <div class="ring ring-2"></div>
              <div class="ring ring-3"></div>
              <div class="image-frame">
                <img :src="imgProfile" alt="Claudio Fernando" class="hologram-img">
                <div class="hologram-overlay"></div>
                <div class="scanning-beam"></div>
                <!-- HUD corners -->
                <div class="hud-corner top-left"></div>
                <div class="hud-corner top-right"></div>
                <div class="hud-corner bottom-left"></div>
                <div class="hud-corner bottom-right"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="content-layer">
        <section class="section section-about">
          <div class="container">
            <div class="about-bento-grid">
              <!-- Bio Card -->
              <div class="bio-section-text">
                <div class="vertical-title-container marquee-vertical-wrapper">
                  <div class="marquee-vertical-content">
                     <div class="mv-row">SOBRE MI SOBRE MI SOBRE MI SOBRE MI</div>
                     <div class="mv-row highlight">SOBRE MI SOBRE MI SOBRE MI SOBRE MI</div>
                     <div class="mv-row">SOBRE MI SOBRE MI SOBRE MI SOBRE MI</div>
                  </div>
                  <div class="marquee-vertical-content" aria-hidden="true">
                     <div class="mv-row">SOBRE MI SOBRE MI SOBRE MI SOBRE MI</div>
                     <div class="mv-row highlight">SOBRE MI SOBRE MI SOBRE MI SOBRE MI</div>
                     <div class="mv-row">SOBRE MI SOBRE MI SOBRE MI SOBRE MI</div>
                  </div>                  
                </div>
                
                <div class="identity-grid minimal-grid" id="about">                  
                  
                  <div 
                    class="minimal-item"
                    @mouseenter="updateBackground(2)"
                    @mouseleave="updateBackground(0)"
                  >
                    <span class="min-number">02</span>
                    <h3 class="min-title">Ayer</h3>
                    <p class="min-text">He laborado y desarrollado soluciones digitales tanto para instituciones privadas como instituciones públicas, aplicando buenas prácticas de desarrollo de software y gestión administrativa.</p>
                  </div>

                  <div 
                    class="minimal-item"
                    @mouseenter="updateBackground(1)"
                    @mouseleave="updateBackground(0)"
                  >
                    <span class="min-number">01</span>
                    <h3 class="min-title">Hoy</h3>
                    <p class="min-text"><strong>Ingeniero Informático</strong> en formación, actualmente desarrollo aplicaciones web y sistemas a medida, combinando análisis, diseño y programación para crear soluciones claras, eficientes y escalables.</p>
                  </div>

                  <div 
                    class="minimal-item"
                    @mouseenter="updateBackground(3)"
                    @mouseleave="updateBackground(0)"
                  >
                    <span class="min-number">03</span>
                    <h3 class="min-title">Mañana</h3>
                    <p class="min-text">Mi objetivo es seguir creciendo como ingeniero informático, enfocándome en IA y automatización de procesos de negocio con n8n para crear soluciones con impacto real.</p>
                  </div>
                </div>
              </div>
              
              <!-- Background Animation -->
              <div 
                class="section-background-anim"
                :style="{ backgroundImage: `url(${currentAboutBg})` }"
              >
              </div>
            </div>
          </div>
        </section>

        <section class="section section-timeline">
          <div class="snow-container" aria-hidden="true">
            <div class="snow-sticky-view">
              <div 
                v-for="(flake, i) in snowflakes" 
                :key="i" 
                class="star"
                :style="{
                  left: flake.left,
                  top: flake.top,
                  animationDelay: flake.animationDelay,
                  animationDuration: flake.animationDuration,
                  opacity: flake.opacity,
                  width: flake.size,
                  height: flake.size
                }"
              ></div>
              <!-- Millennium Falcon 3D Container (Left) -->
              <div 
                class="halcon-trajectory-wrapper"
                :style="{
                  transform: isScrollingDown 
                    ? `translate3d(${5 + timelineProgress * 145}%, ${-10 + timelineProgress * 130}vh, 0) perspective(1000px) rotateX(20deg) rotateY(10deg) rotateZ(-45deg) scale(${1.0 - timelineProgress * 0.8})` 
                    : `translate3d(${5 + timelineProgress * 80}%, ${-10 + timelineProgress * 130}vh, 0) perspective(1000px) rotateX(10deg) rotateY(0deg) rotateZ(-30deg) scale(${0.3 + timelineProgress * 0.7})`,
                  opacity: 1
                }"
              >
                <!-- Scrolling DOWN: Top-Left -> Bottom-Right using halconmilenario1 (nose down) -->
                <img 
                  v-if="isScrollingDown"
                  :src="imgHalconDown" 
                  class="halcon-ship" 
                  alt="Millennium Falcon Diving"
                />
                 <!-- Scrolling UP: Bottom -> Top-Left using halconmilenario (nose up) -->
                <img 
                  v-else
                  :src="imgHalcon" 
                  class="halcon-ship" 
                  alt="Millennium Falcon Rising"
                />
              </div>

              <!-- Death Star Container (Right) -->
              <div 
                class="death-star-wrapper"
                :style="{
                  transform: `
                    translate3d(${10 - timelineProgress * 15}%, ${-10 + timelineProgress * 20}px, -100px)
                    perspective(1000px)
                    rotateY(${-10 + timelineProgress * 15}deg)
                    rotateX(${5 - timelineProgress * 5}deg)
                    scale(${0.8 + timelineProgress * 0.2})
                  `,
                  opacity: 0.8 + timelineProgress * 0.2
                }"
              >
                 <img 
                  :src="imgDeathStar" 
                  class="death-star" 
                  alt="Death Star"
                />
              </div>
            </div>
          </div>
          <div class="container">
            <h2 id="timeline" class="section-title">Mi Trayectoria</h2>
            <div class="timeline">
              <div 
                v-for="(event, index) in timelineEvents" 
                :key="index" 
                class="timeline-item"
              >
                <div class="timeline-dot"></div>
                <div class="timeline-date">{{ event.period }}</div>
                <div class="timeline-card">
                  <span class="event-type" :class="event.type">{{ event.type }}</span>
                  <h3>{{ event.title }}</h3>
                  <h4>{{ event.organization }}</h4>
                  <p>{{ event.description }}</p>
                </div>
              </div>
            </div>

            <div class="about-stats">
              <div class="stat-card">
                <span class="stat-number">7+</span>
                <span class="stat-label">Años de Experiencia</span>
              </div>
              <div class="stat-card">
                <span class="stat-number">Inmediata</span>
                <span class="stat-label">Disponibilidad</span>
              </div>
            </div>  
          </div>
        </section>
        
        <section class="section section-skills">
          <div class="container">
            <h2 id="skills" class="section-title center">Stack Tecnológico</h2>
            
            <div class="minimal-skills-container">
              <div 
                v-for="(cat, index) in skillCategories" 
                :key="cat.title"
                class="skill-category-block"
                :style="{ '--d': index * 0.1 + 's' }"
              >
                <div class="category-info">
                  <h3 class="category-name">{{ cat.title }}</h3>
                  <div class="category-underline"></div>
                </div>
                
                <div class="skills-chip-wrapper">
                  <div 
                    v-for="skill in cat.skills" 
                    :key="skill.name" 
                    class="skill-chip"
                  >
                    <span class="chip-icon">{{ skill.icon }}</span>
                    <span class="chip-name">{{ skill.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="section section-projects">
          <div class="container">
            <h2 id="projects" class="section-title">Proyectos mas recientes</h2>
            <div class="projects-grid">
              <ProjectCard 
                v-for="proj in projects" 
                :key="proj.title"
                :project="proj"
              />
            </div>
          </div>
        </section>

        <section class="section section-contact">
          <div class="container">
            <div id="contact" class="contact-card">
              <div class="contact-grid">
                <div class="contact-info">
                  <span class="contact-badge">¿Listo para innovar?</span>
                  <h2>Trabajemos juntos</h2>
                  <p>Estoy listo para aportar con análisis, desarrollo y automatización de soluciones, combinando experiencia administrativa y formación en Ingeniería Informática. Si tienes un proyecto, una idea o una oportunidad para colaborar, conversemos.</p>
                  <div class="contact-methods">
                    <div class="method-item">
                      <span class="method-icon">📍</span>
                      <span>Lima, Perú</span>
                    </div>
                    <div class="method-item">
                      <span class="method-icon">📧</span>
                      <span>claudioquello5@gmail.com</span>
                    </div>
                  </div>
                </div>

                <div class="contact-form-wrapper">
                  <div v-if="formSubmitted" class="success-message">
                    <div class="success-icon">✨</div>
                    <h3>¡Mensaje Enviado!</h3>
                    <p>Gracias por contactarme, claudio. Te responderé lo antes posible.</p>
                    <button @click="formSubmitted = false" class="btn btn-secondary">Enviar otro mensaje</button>
                  </div>
                  
                  <form v-else class="contact-form" @submit.prevent="handleFormSubmit">
                    <div class="form-group">
                      <input type="text" name="name" v-model="formData.name" placeholder="Tu Nombre" required>
                    </div>
                    <div class="form-group">
                      <input type="email" name="email" v-model="formData.email" placeholder="Tu Correo Electrónico" required>
                    </div>
                    <div class="form-group">
                      <textarea name="message" v-model="formData.message" placeholder="Tu Mensaje" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                      {{ isSubmitting ? 'Enviando...' : 'Enviar Mensaje' }}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <footer class="footer">
      <div class="container">
        <div class="footer-bottom">
          <p>&copy; 2026 Claudio Quello. Developer Portfolio.</p>
          <div class="social-links">
            <span class="typing-text">System Status: Optimal</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.app-container {
  animation: contentReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes contentReveal {
  from { opacity: 0; transform: scale(0.98); filter: blur(10px); }
  to { opacity: 1; transform: scale(1); filter: blur(0); }
}

.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  z-index: 2000;
  box-shadow: 0 0 15px var(--primary);
  animation: scrollWatch auto linear;
  animation-timeline: scroll();
}

@keyframes scrollWatch {
  to { width: 100%; }
}

.animate-gradient {
  background: linear-gradient(
    to right, 
    var(--primary), 
    var(--secondary), 
    var(--primary)
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent !important;
  animation: gradientFlow 3s linear infinite;
}

@keyframes gradientFlow {
  to { background-position: 200% center; }
}

.bounce-name {
  display: inline-flex;
  gap: 0;
}

.bounce-name .letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(-80px);
  animation: bounceDrop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  animation-delay: calc(0.3s + var(--d));
  position: relative;
}

/* Ensure the gradient text works on the letters */
.letter.animate-gradient {
  background: linear-gradient(
    to right, 
    var(--primary), 
    var(--secondary), 
    var(--primary)
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent !important;
  animation: gradientFlow 3s linear infinite, bounceDrop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  animation-delay: 0s, calc(0.3s + var(--d));
}

@keyframes bounceDrop {
  0% { 
    opacity: 0; 
    transform: translateY(-100px); 
  }
  60% { 
    opacity: 1; 
    transform: translateY(20px); 
  }
  80% { 
    transform: translateY(-10px); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.mouse-glow {
  position: fixed;
  top: -250px;
  left: -250px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 10;
  will-change: transform;
}

.profile-layout {
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  text-align: left !important;
  gap: 2rem;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 968px) {
  .hero {
    height: auto;
    padding: 120px 5% 60px;
  }
  
  .profile-layout {
    flex-direction: column-reverse;
    text-align: center !important;
    gap: 3rem;
  }
  
  .hero-text {
    flex: 1;
  }
  
  .hero-image {
    flex: 1;
    justify-content: center;
  }

  .cta-group {
    flex-direction: column;
    align-items: stretch;
  }
}

.hero-text {
  flex: 1.2;
}

.hero-image {
  flex: 0.8;
  display: flex;
  justify-content: flex-end;
}

.hologram-container {
  position: relative;
  width: 340px;
  height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed var(--primary);
  opacity: 0.3;
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.ring-1 {
  width: 100%;
  height: 100%;
  animation: rotateRing 20s linear infinite;
  border-style: solid;
  border-width: 2px;
  border-top-color: transparent;
  border-bottom-color: transparent;
}

.ring-2 {
  width: 85%;
  height: 85%;
  animation: rotateRing 15s linear infinite reverse;
  border-style: dashed;
  opacity: 0.2;
}

.ring-3 {
  width: 115%;
  height: 115%;
  border: 1px solid var(--secondary);
  opacity: 0.1;
  animation: rotateRing 30s linear infinite;
}

@keyframes rotateRing {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.image-frame {
  position: relative;
  width: 260px;
  height: 260px;
  background: rgba(7, 11, 20, 0.8);
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(212, 175, 55, 0.3);
  box-shadow: 0 0 50px rgba(212, 175, 55, 0.2);
  z-index: 5;
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.hologram-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.2) contrast(1.1) brightness(1.1);
  animation: hologramFlicker 4s infinite;
}

.hologram-overlay {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1) 0px,
    rgba(0, 0, 0, 0.1) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  z-index: 2;
}

@keyframes hologramFlicker {
  0%, 100% { opacity: 1; filter: saturate(1.2) brightness(1.1); }
  5% { opacity: 0.95; filter: saturate(2) brightness(1.5) hue-rotate(90deg); }
  10% { opacity: 1; filter: saturate(1.2) brightness(1.1); }
  15% { opacity: 0.9; transform: translateX(2px); }
  20% { opacity: 1; transform: translateX(0); }
}

.scanning-beam {
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(212, 175, 55, 0.4),
    transparent
  );
  z-index: 3;
  animation: scanHologram 4s ease-in-out infinite;
}

@keyframes scanHologram {
  0%, 100% { top: -100%; }
  50% { top: 100%; }
}

.hud-corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid var(--primary);
  z-index: 6;
  opacity: 0.8;
}

.hud-corner.top-left { top: 20px; left: 20px; border-right: 0; border-bottom: 0; }
.hud-corner.top-right { top: 20px; right: 20px; border-left: 0; border-bottom: 0; }
.hud-corner.bottom-left { bottom: 20px; left: 20px; border-right: 0; border-top: 0; }
.hud-corner.bottom-right { bottom: 20px; right: 20px; border-left: 0; border-top: 0; }

.hologram-container:hover .ring-1 { 
  width: 90%; 
  height: 90%; 
  opacity: 0.8; 
  border-color: #fff;
  animation-duration: 10s; 
}

.hologram-container:hover .ring-2 { 
  width: 80%; 
  height: 80%; 
  opacity: 0.6; 
  border-color: var(--secondary);
  animation-duration: 8s; 
}

.hologram-container:hover .ring-3 { 
  width: 100%; 
  height: 100%; 
  opacity: 0.4; 
  border-color: var(--primary);
  animation-duration: 15s; 
}

.hologram-container:hover .image-frame { 
  transform: scale(1.1); 
  border-color: #fff;
  box-shadow: 0 0 70px rgba(212, 175, 55, 0.4);
}

.hologram-container:hover .hologram-img {
  animation: hologramFlicker 0.5s infinite;
  filter: saturate(1.5) contrast(1.2) brightness(1.3);
}

.hologram-container:hover .scanning-beam {
  animation-duration: 1s;
  background: linear-gradient(
    to bottom,
    transparent,
    #fff,
    transparent
  );
  opacity: 0.8;
}

/* New Bento About Styles */
.about-bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.bento-card {
  position: relative;
  background: transparent;
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 2rem;
  overflow: hidden;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
}

.card-glass {
  display: none;
}

.bento-card:hover {
  border-color: #fff;
  background: rgba(255, 255, 255, 0.02);
  transform: translateY(-5px);
}

.visual-card {
  grid-column: span 1;
  grid-row: span 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, rgba(212, 175, 55, 0.1), transparent 70%);
}

.status-card {
  grid-column: span 1;
  background: rgba(37, 211, 102, 0.03);
}

.feature-card {
  grid-column: span 1;
  padding: 1.5rem;
  flex-direction: row;
  align-items: center;
  gap: 1.2rem;
}

.location-card {
  grid-column: span 1;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.bio-section-text {
  grid-column: span 3;
  grid-row: span 2;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 4rem;
  justify-content: space-between;
  padding: 0;
  background: none;
  border: none;
  box-shadow: none;
}

.vertical-title-container {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
}

.vertical-title {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 8rem;
  font-weight: 900;
  color: transparent;
  scroll-margin-top: 150px;
  -webkit-text-stroke: 2px rgba(255, 255, 255, 0.15);
  margin: 0;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.identity-grid {
  display: flex;
  
  gap: 1.5rem;
  width: 100%;
  margin-top: 0;
  padding-top: 50%;
  text-align: center;
}

.id-number {
  font-family: monospace;
  color: var(--primary);
  opacity: 0.6;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: block;
}

.id-title {
  font-size: 2.5rem;
  font-weight: 200;
  color: #fff;
  margin-bottom: 1.2rem;
  letter-spacing: -1px;
}

.identity-card p {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.6;
  text-align: left;
}

@media (max-width: 968px) {
  .bio-section-text {
    flex-direction: column;
    gap: 2rem;
  }
  
  .vertical-title-container {
    width: 100%;
    padding: 0;
  }
  
  .vertical-title {
    writing-mode: horizontal-tb;
    transform: none;
    font-size: 3.5rem;
    -webkit-text-stroke: 0;
    color: #fff;
    text-align: left;
    margin-bottom: 1rem;
  }

  .identity-grid {
    flex-direction: column;
    gap: 1.5rem;
  }
}

.bio-section-text .intro-text p {
  font-size: 1.2rem;
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  text-align: left;
  max-width: 90%;
}

.core-system-mini {
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.core-orbit {
  position: absolute;
  inset: 0;
  border: 2px dashed var(--primary);
  border-radius: 50%;
  opacity: 0.3;
  animation: rotateCore 20s linear infinite;
}

.core-center {
  position: relative;
  width: 70px;
  height: 70px;
  background: var(--bg-card);
  border: 3px solid var(--primary);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: morphCore 8s ease-in-out infinite;
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
}

.core-glow {
  position: absolute;
  inset: -10px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%);
  animation: pulseGlow 4s ease-in-out infinite;
}

.core-icon {
  font-size: 1.8rem;
  z-index: 2;
}

@keyframes rotateCore {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes morphCore {
  0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
  50% { border-radius: 50% 50% 20% 80% / 25% 80% 20% 75%; }
  100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
}

@keyframes pulseGlow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.2); }
}

.core-label-mini {
  position: absolute;
  bottom: -30px;
  font-family: monospace;
  font-size: 0.7rem;
  color: var(--primary);
  letter-spacing: 2px;
  opacity: 0.6;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
}

.pulse-dot {
  width: 10px;
  height: 10px;
  background: #25d366;
  border-radius: 50%;
  box-shadow: 0 0 10px #25d366;
  animation: pulse-green 2s infinite;
}

@keyframes pulse-green {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
}

.status-indicator span {
  font-size: 0.9rem;
  font-weight: 600;
  color: #25d366;
}

.status-detail {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.feature-icon {
  font-size: 2rem;
  filter: drop-shadow(0 0 10px var(--primary));
}

.feature-info h4 {
  font-size: 1rem;
  color: #fff;
  margin-bottom: 0.2rem;
}

.feature-info p {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.location-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
}

.loc-icon { font-size: 1.5rem; }
.loc-text { font-weight: 600; font-size: 1.1rem; }
.time-stamp { font-family: monospace; font-size: 0.8rem; opacity: 0.5; }

@media (max-width: 1024px) {
  .about-bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .bio-card { order: 1; }
  .visual-card { order: 2; }
}

@media (max-width: 768px) {
  .about-bento-grid {
    grid-template-columns: 1fr;
  }
  .bio-card, .visual-card, .status-card, .feature-card, .location-card {
    grid-column: span 1;
    grid-row: span 1;
  }
}

/* Timeline Styles */
.timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto 5rem;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, var(--primary), transparent);
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  padding-left: 3rem;
}

.timeline-dot {
  position: absolute;
  left: -9px;
  top: 5px;
  width: 20px;
  height: 20px;
  background: var(--bg-dark);
  border: 4px solid var(--primary);
  border-radius: 50%;
  box-shadow: 0 0 15px var(--primary);
  z-index: 2;
}

.timeline-item::after {
  content: '';
  position: absolute;
  left: -9px;
  top: 5px;
  width: 20px;
  height: 20px;
  background: var(--primary);
  border-radius: 50%;
  animation: pulse-dot 2s infinite;
  z-index: 1;
}

@keyframes pulse-dot {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(2.5); opacity: 0; }
}

.timeline-date {
  font-family: monospace;
  color: var(--primary);
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.timeline-card {
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 24px;
  border: 1px solid var(--glass-border);
  transition: all 0.4s ease;
}

.timeline-card:hover {
  transform: translateX(10px);
  border-color: var(--primary);
}

.timeline-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
  color: #fff;
}

.timeline-card h4 {
  font-size: 1rem;
  color: var(--secondary);
  margin-bottom: 1.2rem;
  font-weight: 500;
}

.timeline-card p {
  color: var(--text-muted);
  font-size: 1.1rem;
  line-height: 1.7;
  text-align: justify;
  hyphens: auto;
}

.event-type {
  display: inline-block;
  font-size: 0.65rem;
  text-transform: uppercase;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  margin-bottom: 1rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.event-type.education { background: rgba(212, 175, 55, 0.1); color: var(--primary); border: 1px solid var(--primary); }
.event-type.work { background: rgba(197, 160, 89, 0.1); color: var(--secondary); border: 1px solid var(--secondary); }
.event-type.cert { background: rgba(255, 255, 255, 0.05); color: #94a3b8; border: 1px solid rgba(255, 255, 255, 0.1); }

.about-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat-card {
  flex: 1;
  min-width: 200px;
  background: var(--bg-card);
  padding: 3rem 2rem;
  border-radius: 24px;
  text-align: center;
  border: 1px solid var(--glass-border);
  transition: all 0.3s ease;
}

.stat-card:hover {
  border-color: var(--primary);
  transform: scale(1.05);
}

.stat-number {
  display: block;
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .timeline { padding-left: 1rem; }
  .timeline-card { padding: 1.5rem; }
}

/* Minimal Skills Styles */
.minimal-skills-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 1000px;
  margin: 4rem auto 0;
}

.skill-category-block {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--d);
}

.section.visible .skill-category-block {
  opacity: 1;
  transform: translateY(0);
}

.category-info {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.category-name {
  font-family: monospace;
  font-size: 0.85rem;
  letter-spacing: 4px;
  color: var(--primary);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  opacity: 0.8;
}

.category-underline {
  width: 40px;
  height: 2px;
  background: var(--primary);
  border-radius: 2px;
  box-shadow: 0 0 10px var(--primary);
}

.skills-chip-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.skill-chip {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  padding: 0.6rem 1.4rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default;
}

.skill-chip:hover {
  background: rgba(212, 175, 55, 0.1);
  border-color: var(--primary);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.chip-icon {
  font-size: 1.2rem;
}

.chip-name {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-main);
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .minimal-skills-container {
    gap: 2.5rem;
  }
  
  .skills-chip-wrapper {
    justify-content: center;
  }
  
  .category-info {
    align-items: center;
  }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
}

.contact-card {
  background: var(--bg-card);
  padding: 5rem;
  border-radius: 48px;
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(10px);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: flex-start;
  text-align: left;
}

.contact-info h2 {
  font-size: 3.5rem;
  margin-bottom: 2rem;
  line-height: 1.1;
}

.contact-info p {
  font-size: 1.2rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 3rem;
  text-align: justify;
  hyphens: auto;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.method-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  color: var(--text-main);
}

.method-icon {
  width: 40px;
  height: 40px;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-form-wrapper {
  width: 100%;
}

.contact-badge {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: var(--glass);
  border-radius: 50px;
  margin-bottom: 2rem;
  font-weight: 600;
  color: var(--secondary);
}

.btn-github {
  background: var(--glass);
  color: #fff;
  border: 1px solid var(--glass-border);
}

.btn-whatsapp {
  background: rgba(37, 211, 102, 0.1);
  color: #25d366;
  border: 1px solid rgba(37, 211, 102, 0.2);
}

.btn-github:hover {
  background: #333;
  border-color: #666;
}

.btn-whatsapp:hover {
  background: rgba(37, 211, 102, 0.2);
  border-color: #25d366;
}

.btn-icon {
  margin-right: 8px;
}

/* Contact Form Styles */
/* Success Message Styles */
.success-message {
  padding: 3rem;
  background: rgba(212, 175, 55, 0.05);
  border: 1px solid var(--primary);
  border-radius: 24px;
  animation: fadeIn 0.5s ease;
}

.success-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.success-message h3 {
  color: var(--primary);
  margin-bottom: 1rem;
}

.success-message p {
  margin-bottom: 2rem !important;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.contact-form {
  max-width: 600px;
  margin: 3rem auto 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1.2rem;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  color: #fff;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
  background: rgba(212, 175, 55, 0.05);
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.1);
}

.contact-form {
  margin-top: 0;
  max-width: 100%;
}

@media (max-width: 968px) {
  .contact-card { padding: 3rem 2rem; }
  .contact-grid { grid-template-columns: 1fr; gap: 4rem; }
  .contact-info h2 { font-size: 2.8rem; }
}

.footer {
  padding: 6rem 5% 3rem;
  border-top: 1px solid var(--glass-border);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-muted);
}

.typing-text {
  font-family: monospace;
  border-right: 2px solid var(--primary);
  padding-right: 5px;
  animation: blink 0.8s infinite;
}

@keyframes blink {
  50% { border-color: transparent; }
}

@media (max-width: 968px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .contact-card h2 {
    font-size: 2.5rem;
  }
}





/* Vertical Marquee Styles */
.marquee-vertical-wrapper {
  position: relative;
  height: 120vh; /* Make it very tall to cover the section */
  max-height: 1000px; /* Safety cap */
  overflow: hidden;
  display: flex !important;
  flex-direction: column !important;
  /* mask-image removed to keep text always visible */
  width: auto; /* Let it grow */
  min-width: 300px;
  flex-shrink: 0;
}

.marquee-vertical-content {
  display: flex;
  flex-direction: row; 
  justify-content: flex-start; /* Align left */
  animation: scrollVertical 30s linear infinite; /* Slower for smoothness */
  gap: 1.5rem;
}

.mv-row {
  font-size: 6rem; /* Increased size as requested */
  font-weight: 400; /* Minimalist weight */
  line-height: 1;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.15); /* Slightly more visible */
  /* font-family: 'Impact', sans-serif; Removed to use default font */
  writing-mode: vertical-rl; 
  text-orientation: sideways; 
  transform: rotate(180deg); 
  margin-bottom: 0;
}

.mv-row.highlight {
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
}

@keyframes scrollVertical {
  from { transform: translateY(0); }
  to { transform: translateY(-100%); }
}

/* Adjust layout to accommodate the wider title block if necessary */
.bio-section-text {
  gap: 2rem;
}

/* Minimalist About Section */
.identity-grid {
  display: flex !important;
  flex-direction: column !important; /* Stack vertically for minimalist list feel, or row? User said "eliminar cards". List is cleaner. */
  gap: 4rem !important;
  width: 100% !important;
  margin-top: 0;
  padding-top: 1%;
  text-align: left !important;
  /* position: absolute;  Maybe place it over the background? No, keep flow */
  position: relative;
  z-index: 10;
  padding-left: 20%; /* Offset from the marquee wall */
  padding-top: 10%; 
}

.minimal-item {
  position: relative;
  padding-left: 2rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease;
  cursor: default;
}

.minimal-item:hover {
  transform: translateX(10px);
}



.min-number {
  font-family: monospace;
  font-size: 0.9rem;
  color: #666; /* Very subtle */
  display: block;
  margin-bottom: 0.5rem;
}

.min-title {
  font-size: 2.5rem;
  font-weight: 300; /* Thin font */
  color: #fff;
  margin-bottom: 1rem;
  letter-spacing: 15px;
}

.min-text {
  font-size: 1rem;
  color: #999;
  line-height: 1.6;
  max-width: 600px;
  font-weight: 300;
}

@media (max-width: 968px) {
  .identity-grid {
    padding-left: 0;
  }
}

/* Snow Animation */
.snow-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  /* overflow: hidden; Removed to allow sticky child to work within its rect */
}

.snow-sticky-view {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden; /* Crop flakes here */
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
  animation: starMove linear infinite;
}

@keyframes starMove {
  from { transform: translateX(0) translateY(0); }
  to { transform: translateX(-100px) translateY(50px); } /* Slow diagonal drift */
}

/* Ensure timeline content is above snow */
.section-timeline .container {
  position: relative;
  z-index: 2;
}

.halcon-trajectory-wrapper {
  position: absolute;
  top: 10%;
  left: 5%; /* Moved to Left */
  width: 350px; 
  height: auto;
  z-index: 10;
  pointer-events: none;
  transition: opacity 0.5s ease;
  will-change: transform;
  transform-style: preserve-3d; 
}

/* Death Star Styles */
.death-star-wrapper {
  position: absolute;
  top: 15%;
  right: -5%; 
  width: 500px; 
  height: auto;
  z-index: 5; 
  pointer-events: none;
  transition: opacity 0.5s ease;
  will-change: transform;
  transform-style: preserve-3d;
}

.death-star {
  width: 100%;
  height: auto;
  display: block;
  opacity: 0.95;
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.5)) brightness(1);
  animation: deathStarHover 8s ease-in-out infinite alternate;
}

@keyframes deathStarHover {
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(-30px) rotate(2deg); }
}

.halcon-ship {
  width: 100%;
  height: auto;
  display: block;
  /* Continuous hovering animation */
  animation: shipHover 4s ease-in-out infinite; 
  filter: drop-shadow(0 0 15px rgba(100, 200, 255, 0.4)); /* Engine glow hint */
}

@keyframes shipHover {
  0% { transform: translateY(0) rotateZ(0deg); }
  50% { transform: translateY(-20px) rotateZ(2deg); }
  100% { transform: translateY(0) rotateZ(0deg); }
}

@media (max-width: 768px) {
  .halcon-trajectory-wrapper {
    width: 200px;
    right: -20%;
  }
}
</style>
