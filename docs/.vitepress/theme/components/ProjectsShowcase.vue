<template>
  <div class="projects-showcase">
    <div class="section-header">
      <h2>{{ title }}</h2>
      <p class="section-description">{{ description }}</p>
    </div>

    <div class="projects-grid">
      <Transition name="fade" mode="out-in">
        <div :key="currentPage" class="grid-wrapper">
          <div 
            v-for="(project, index) in paginatedProjects" 
            :key="project.title" 
            class="project-card"
            :class="{ 'is-sponsored': project.sponsored }"
          >
            <div class="project-banner" v-if="project.banner">
              <div class="banner-media">
                <img :src="project.banner.startsWith('http') ? project.banner : withBase(project.banner)" :alt="project.title" class="banner-img" />
              </div>
            </div>
            <div class="project-image" v-else-if="project.image">
              <img :src="project.image.startsWith('http') ? project.image : withBase(project.image)" :alt="project.title" />
            </div>
            <div
              v-if="project.icon"
              class="project-icon-wrapper"
              :class="{
                'on-image': !project.banner && project.image,
                'no-media': !project.banner && !project.image
              }"
            >
              <img :src="project.icon.startsWith('http') ? project.icon : withBase(project.icon)" :alt="project.title" class="project-icon" />
            </div>
            <div class="project-content">
              <div class="project-header">
                <h3 class="project-title">{{ project.title }}</h3>
                <span v-if="project.tag" class="project-tag">{{ project.tag }}</span>
              </div>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-links">
                <a v-if="project.modrinth" :href="project.modrinth" target="_blank" rel="noopener" class="platform-link modrinth" title="Modrinth">
                  <img src="https://api.iconify.design/simple-icons:modrinth.svg?color=white" alt="Modrinth" class="platform-svg" />
                </a>
                <a v-if="project.curseforge" :href="project.curseforge" target="_blank" rel="noopener" class="platform-link curseforge" title="CurseForge">
                  <img src="https://api.iconify.design/simple-icons:curseforge.svg?color=white" alt="CurseForge" class="platform-svg" />
                </a>
                <a v-if="project.planetminecraft" :href="project.planetminecraft" target="_blank" rel="noopener" class="platform-link planetminecraft" title="Planet Minecraft">
                  <img src="https://api.iconify.design/mdi:earth.svg?color=white" alt="Planet Minecraft" class="platform-svg" />
                </a>
                <a v-if="project.mcinside" :href="project.mcinside" target="_blank" rel="noopener" class="platform-link mcinside" title="Minecraft Inside">
                  <img src="https://api.iconify.design/arcticons:minecraft.svg?color=white" alt="Minecraft Inside" class="platform-svg" />
                </a>
                <a v-if="project.link" :href="project.link" target="_blank" rel="noopener" class="project-link">
                  {{ project.linkText || (isRussian ? 'Подробнее' : 'Details') }}
                </a>
              </div>
            </div>
            <div v-if="project.sponsored" class="sponsor-label">
              {{ isRussian ? 'Спонсор' : 'Sponsor' }}
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <div v-if="totalPages > 1" class="pagination">
      <button 
        class="page-btn" 
        @click="handleUserInteraction(prevPage)"
      >
        ←
      </button>
      <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
      <button 
        class="page-btn" 
        @click="handleUserInteraction(nextPage)"
      >
        →
      </button>
    </div>

    <div class="showcase-footer">
      <p v-if="isRussian">
        Хотите добавить свой проект? 
        <a href="https://github.com/Danrus1100/rtp-rpf-docs/pulls" target="_blank" rel="noopener">Создайте Pull Request!</a>
      </p>
      <p v-else>
        Want to add your project? 
        <a href="https://github.com/Danrus1100/rtp-rpf-docs/pulls" target="_blank" rel="noopener">Submit a Pull Request!</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  title: {
    type: String,
    default: 'Showcase'
  },
  description: {
    type: String,
    default: 'Projects using RPF and RPT'
  },
  projects: {
    type: Array,
    required: true
  },
  isRussian: {
    type: Boolean,
    default: false
  },
  itemsPerPage: {
    type: Number,
    default: 3
  },
  autoplayInterval: {
    type: Number,
    default: 5000
  }
})

const currentPage = ref(1)
const isUserInteracted = ref(false)
let autoplayTimer = null

const totalPages = computed(() => {
  return Math.ceil(props.projects.length / props.itemsPerPage)
})

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage
  const end = start + props.itemsPerPage
  return props.projects.slice(start, end)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  } else {
    currentPage.value = 1
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  } else {
    currentPage.value = totalPages.value
  }
}

const handleUserInteraction = (action) => {
  isUserInteracted.value = true
  stopAutoplay()
  action()
}

const startAutoplay = () => {
  if (props.autoplayInterval > 0 && totalPages.value > 1 && !isUserInteracted.value) {
    autoplayTimer = setInterval(() => {
      nextPage()
    }, props.autoplayInterval)
  }
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
.projects-showcase {
  margin: 4rem 0;
  padding: 0 1.5rem;
}

.section-header {
  margin-bottom: 3rem;
  text-align: center;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  padding-bottom: 0.2em;
  background: linear-gradient(120deg, var(--vp-c-brand-1) 0%, var(--vp-c-brand-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.section-description {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
}

.projects-grid {
  max-width: 1200px;
  margin: 0 auto;
  min-height: 450px;
  padding-bottom: 30px; /* Резервируем место под надписи спонсоров снизу */
}

.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3.5rem 2rem; /* Увеличиваем вертикальный разрыв между строками, чтобы влезли надписи */
  width: 100%;
}

/* Анимация как в примерах */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.project-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
}

.project-card.is-sponsored {
  border: 1px solid #ffd700;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
}

.project-card.is-sponsored:hover {
  border-color: #ffd700;
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.4);
}

.sponsor-label {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #ffd700 0%, #ffac00 100%);
  color: #000;
  text-align: center;
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 4px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
  overflow: hidden;
}

/* Эффект блеска */
.sponsor-label::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -150%;
  width: 100%;
  height: 200%;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(255, 255, 255, 0) 30%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0.3) 70%,
    transparent 100%
  );
  transform: rotate(30deg);
  animation: shine 3s infinite;
  pointer-events: none;
}

@keyframes shine {
  0% { left: -150%; }
  20% { left: 150%; }
  100% { left: 150%; }
}

.project-banner {
  height: 120px;
  position: relative;
  background: var(--vp-c-bg-mute);
  border-radius: 12px 12px 0 0;
  overflow: visible;
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
  flex-shrink: 0;
}

.project-card:hover .project-banner {
  height: 180px;
}

.banner-media {
  height: 100%;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover .banner-img {
  transform: scale(1.05);
}

.project-icon-wrapper {
  position: absolute;
  bottom: -24px;
  left: 1.5rem;
  width: 64px;
  height: 64px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 4px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 10; /* Гарантируем, что иконка поверх всего */
}

.project-icon-wrapper {
  top: 88px;
  bottom: auto;
}

.project-icon-wrapper.on-image {
  top: 148px;
}

.project-icon-wrapper.no-media {
  top: 16px;
}

.project-card:has(.project-banner):hover .project-icon-wrapper {
  opacity: 0;
  transform: translateY(10px) scale(0.8);
  pointer-events: none;
}

.project-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.project-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 400px;
  min-height: 400px;
}

.project-card:hover {
  transform: translateY(-5px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.project-image {
  height: 180px;
  overflow: hidden;
  border-bottom: 1px solid var(--vp-c-divider);
  flex-shrink: 0;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-content {
  padding: 1.5rem;
  padding-top: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.project-card:has(.project-icon-wrapper) .project-content {
  padding-top: 2.5rem;
}

.project-card:has(.project-icon-wrapper.no-media) .project-content {
  padding-top: 5.25rem;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.project-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.project-tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 6px;
  font-weight: 600;
  white-space: nowrap;
}

.project-description {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all 0.4s ease;
}

.project-card:hover .project-description {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* "Схлопываем" только ПРИ НАВЕДЕНИИ */
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-links {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
  margin-top: auto; /* Всегда прижимаем к низу */
}

.platform-link {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.platform-link:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin: 3rem 0;
}

.page-btn {
  background: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

.platform-link.modrinth:hover { background-color: #1BD96A; border-color: #1BD96A; }
.platform-link.curseforge:hover { background-color: #F16436; border-color: #F16436; }
.platform-link.planetminecraft:hover { background-color: #38C2EE; border-color: #38C2EE; }
.platform-link.mcinside:hover { background-color: #79B8FF; border-color: #79B8FF; }

.platform-svg {
  width: 18px;
  height: 18px;
}

.project-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-mute);
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s;
  border: 1px solid var(--vp-c-divider);
  margin-left: auto;
}

.project-link:hover {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.repo-link {
  display: none;
}

.showcase-footer {
  margin-top: 3rem;
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  opacity: 0.8;
}

.showcase-footer a {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 4px;
  transition: color 0.2s;
}

.showcase-footer a:hover {
  color: var(--vp-c-brand-2);
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
