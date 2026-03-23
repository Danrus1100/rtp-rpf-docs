<template>
  <div class="full-width-features">
    <div 
      v-for="(feature, index) in features" 
      :key="index"
      class="feature-card"
      :class="{ 'reverse': index % 2 === 1 }"
    >
      <div class="feature-content">
        <div class="feature-icon">
          <img :src="getIconPath(index)" :alt="feature.title" />
        </div>
        <h2 class="feature-title">{{ feature.title }}</h2>
        <p class="feature-details">{{ feature.details }}</p>
        <a v-if="feature.link" :href="feature.link" class="feature-link">
          {{ feature.linkText || 'Learn more' }} →
        </a>
      </div>
      <div class="feature-media">
        <img v-if="feature.image" :src="withBase(feature.image)" :alt="feature.title" />
        <div v-else class="placeholder">GIF placeholder</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

interface Feature {
  icon: string
  title: string
  details: string
  link?: string
  linkText?: string
  image?: string
}

defineProps<{
  features: Feature[]
}>()

const getIconPath = (index: number) => {
  // index 0 -> icon.png, index 1 -> icon2.png
  return withBase(index === 0 ? '/icon.png' : '/icon2.png')
}
</script>

<style scoped>
.full-width-features {
  max-width: 1280px;
  margin: 4rem auto;
  padding: 0 24px;
}

.feature-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 4rem;
  padding: 3rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.feature-card:hover {
  border-color: var(--rpf-green-2);
  box-shadow: 0 8px 32px rgba(73, 201, 99, 0.15);
  transform: translateY(-2px);
}

.feature-card.reverse:hover {
  border-color: var(--rpf-blue-2);
  box-shadow: 0 8px 32px rgba(62, 168, 219, 0.15);
}

.feature-card.reverse {
  grid-template-columns: 1fr 1fr;
}

.feature-card.reverse .feature-content {
  order: 2;
}

.feature-card.reverse .feature-media {
  order: 1;
}

.feature-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-icon {
  width: 120px;
  height: 120px;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(73, 201, 99, 0.3));
  transition: all 0.3s ease;
}

.feature-card:hover .feature-icon img {
  filter: drop-shadow(0 6px 16px rgba(73, 201, 99, 0.5));
  transform: scale(1.05);
}

/* Вторая карточка (reverse) - синее свечение */
.feature-card.reverse .feature-icon img {
  filter: drop-shadow(0 4px 12px rgba(62, 168, 219, 0.3));
}

.feature-card.reverse:hover .feature-icon img {
  filter: drop-shadow(0 6px 16px rgba(62, 168, 219, 0.5));
  transform: scale(1.05);
}

.feature-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
  line-height: 1.2;
  background: linear-gradient(135deg, var(--rpf-green-2), var(--rpf-blue-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding-bottom: 0.2em;
}

.feature-details {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0;
}

.feature-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--rpf-green-2);
  text-decoration: none;
  margin-top: 0.5rem;
  transition: all 0.3s ease;
}

.feature-link:hover {
  color: var(--rpf-green-1);
  transform: translateX(4px);
}

.feature-media {
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-alt);
  border: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.feature-media .placeholder {
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
  text-align: center;
}

/* Light theme adjustments */
:root:not(.dark) .feature-card {
  background: #f6f6f7;
  border: 1px solid rgba(60, 60, 67, 0.12);
}

:root:not(.dark) .feature-card:hover {
  border-color: var(--rpf-green-3);
  box-shadow: 0 8px 32px rgba(73, 201, 99, 0.12);
}

:root:not(.dark) .feature-media {
  background: #ffffff;
  border: 1px solid rgba(60, 60, 67, 0.08);
}

/* Responsive design */
@media (max-width: 960px) {
  .feature-card,
  .feature-card.reverse {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem;
  }

  .feature-card.reverse .feature-content,
  .feature-card.reverse .feature-media {
    order: unset;
  }

  .feature-media {
    height: 300px;
  }

  .feature-icon {
    font-size: 3rem;
  }

  .feature-title {
    font-size: 1.75rem;
  }

  .feature-details {
    font-size: 1rem;
  }
}

@media (max-width: 640px) {
  .full-width-features {
    padding: 0 16px;
  }

  .feature-card {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .feature-media {
    height: 240px;
  }

  .feature-icon {
    font-size: 2.5rem;
  }

  .feature-title {
    font-size: 1.5rem;
  }
}
</style>
