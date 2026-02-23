<template>
  <div class="rotating-icons-container">
    <div class="icons-wrapper">
      <div 
        v-for="(icon, index) in icons" 
        :key="index"
        class="icon-item"
        :class="`icon-${index + 1}`"
        :style="getIconStyle(index)"
      >
        <img :src="icon.src" :alt="icon.alt" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { withBase } from 'vitepress'

interface Icon {
  src: string
  alt: string
}

const icons = ref<Icon[]>([
  { src: withBase('/icon.png'), alt: 'RPF Icon' },
  { src: withBase('/icon2.png'), alt: 'RPT Icon' }
])

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
}

.icon-item img {
  width: 160px;
  height: 160px;
  object-fit: contain;
  filter: drop-shadow(0 0 25px rgba(73, 201, 99, 0.5));
  transition: filter 0.3s ease;
  animation: counter-rotate 20s linear infinite;
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

.icon-item {
  position: absolute;
  width: 180px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: rotate-icon 10s ease-in-out infinite;
  animation-delay: var(--rotation-delay, 0s);
  will-change: transform;
}

.icon-item img {
  width: 160px;
  height: 160px;
  object-fit: contain;
  filter: drop-shadow(0 0 25px rgba(73, 201, 99, 0.5));
  transition: filter 0.3s ease;
}

.icon-item:hover img {
  filter: drop-shadow(0 0 40px rgba(73, 201, 99, 0.9));
}

@keyframes rotate-icon {
  0%, 100% {
    transform: rotate(0deg) translateY(0px) scale(1);
  }
  15% {
    transform: rotate(3deg) translateY(-5px) scale(1.03);
  }
  30% {
    transform: rotate(0deg) translateY(-8px) scale(1.05);
  }
  45% {
    transform: rotate(-3deg) translateY(-5px) scale(1.03);
  }
  60% {
    transform: rotate(0deg) translateY(0px) scale(1);
  }
  75% {
    transform: rotate(2deg) translateY(3px) scale(0.98);
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
  animation-delay: 0.8s;
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
