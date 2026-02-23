<template>
  <div class="rotating-icons-container">
    <div class="icons-wrapper">
      <a 
        v-for="(icon, index) in icons" 
        :key="index"
        :href="getIconLink(index)"
        class="icon-item"
        :class="`icon-${index + 1}`"
        :style="getIconStyle(index)"
        :title="icon.title"
      >
        <img :src="icon.src" :alt="icon.alt" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { withBase, useData } from 'vitepress'

interface Icon {
  src: string
  alt: string
  title: string
  link: {
    en: string
    ru: string
  }
}

const { lang } = useData()

const icons = ref<Icon[]>([
  { 
    src: withBase('/icon.png'), 
    alt: 'RPF Icon',
    title: 'Go to RPF Getting Started',
    link: {
      en: '/rpf/getting-started',
      ru: '/ru/rpf/getting-started'
    }
  },
  { 
    src: withBase('/icon2.png'), 
    alt: 'RPT Icon',
    title: 'Go to RPT Getting Started',
    link: {
      en: '/rpt/getting-started',
      ru: '/ru/rpt/getting-started'
    }
  }
])

const getIconLink = (index: number) => {
  const icon = icons.value[index]
  const currentLang = lang.value === 'ru' ? 'ru' : 'en'
  return withBase(icon.link[currentLang])
}

const getIconStyle = (index: number) => {
  return {
    '--rotation-delay': `${index * 2.5}s`,
    '--icon-index': index
  }
}
</script>

<style scoped>
.rotating-icons-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  min-height: auto;
  position: relative;
  z-index: 0;
}

.icons-wrapper {
  position: relative;
  width: 320px;
  height: 320px;
  animation: rotate-wrapper 20s linear infinite;
}

.icon-item {
  position: absolute;
  width: 180px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: float-icon 6s ease-in-out infinite;
  animation-delay: var(--rotation-delay, 0s);
  will-change: transform;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.icon-item:hover {
  transform: scale(1.1);
}

.icon-item img {
  width: 160px;
  height: 160px;
  object-fit: contain;
  filter: drop-shadow(0 0 25px rgba(73, 201, 99, 0.5));
  transition: filter 0.3s ease;
  animation: counter-rotate 20s linear infinite;
  pointer-events: none;
}

.icon-item:hover img {
  filter: drop-shadow(0 0 40px rgba(73, 201, 99, 0.9));
}

/* Анимация вращения всего контейнера с иконками */
@keyframes rotate-wrapper {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Анимация качания отдельных иконок */
@keyframes float-icon {
  0%, 100% {
    transform: translateY(0px) scale(1);
  }
  25% {
    transform: translateY(-8px) scale(1.05);
  }
  50% {
    transform: translateY(-12px) scale(1.08);
  }
  75% {
    transform: translateY(-8px) scale(1.05);
  }
}

/* Контр-вращение картинок, чтобы они оставались в правильной ориентации */
@keyframes counter-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

/* Первая иконка - справа внизу (RPF - зеленое свечение) */
.icon-item.icon-1 {
  bottom: 0;
  right: 0;
  z-index: 2;
  transform-origin: center center;
}

/* Вторая иконка - слева вверху (RPT - синее свечение) */
.icon-item.icon-2 {
  top: 0;
  left: 0;
  z-index: 1;
  animation-delay: 3s;
}

.icon-item.icon-2 img {
  filter: drop-shadow(0 0 25px rgba(62, 168, 219, 0.5));
}

.icon-item.icon-2:hover img {
  filter: drop-shadow(0 0 40px rgba(62, 168, 219, 0.9));
}

@media (max-width: 768px) {
  .icons-wrapper {
    width: 220px;
    height: 220px;
  }
  
  .icon-item {
    width: 110px;
    height: 110px;
  }
  
  .icon-item img {
    width: 100px;
    height: 100px;
  }
  
  .rotating-icons-container {
    padding: 0;
    min-height: auto;
  }
}

@media (max-width: 480px) {
  .icons-wrapper {
    width: 180px;
    height: 180px;
  }
  
  .icon-item {
    width: 90px;
    height: 90px;
  }
  
  .icon-item img {
    width: 80px;
    height: 80px;
  }
}
</style>
