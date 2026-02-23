<template>
  <div class="why-simple">
    <h2>Why RPF & RPT?</h2>
    <p class="intro">
      Minecraft's resource pack system loads only the top-priority pack's model for each item. 
      This makes it difficult to combine multiple resource packs that modify different items.
    </p>
    
    <div class="mods-info">
      <a href="https://modrinth.com/mod/rpf" target="_blank" rel="noopener noreferrer" class="mod-card rpf">
        <div class="mod-header">
          <img :src="withBase('/icon.png')" alt="RPF" />
          <h3>RPF: Resource Packs Fusion</h3>
        </div>
        <p>
          Solves this by introducing a delegation system - packs can selectively override models 
          and delegate the rest to lower-priority packs.
        </p>
        <div class="mod-link">Click to view on Modrinth →</div>
      </a>
      
      <a href="https://modrinth.com/project/rp-twks" target="_blank" rel="noopener noreferrer" class="mod-card rpt">
        <div class="mod-header">
          <img :src="withBase('/icon2.png')" alt="RPT" />
          <h3>RPT: Resource Packs Tools</h3>
        </div>
        <p>
          Adds powerful features like templates, variables, and conditional models, making it easier 
          to create dynamic resource packs without requiring custom model data or separate mods.
        </p>
        <div class="mod-link">Click to view on Modrinth →</div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<style scoped>
.why-simple {
  max-width: 1280px;
  margin: 4rem auto;
  padding: 0 24px;
}

.why-simple h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--rpf-green-2), var(--rpf-blue-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.intro {
  font-size: 1.25rem;
  line-height: 1.8;
  color: var(--vp-c-text-2);
  margin-bottom: 2.5rem;
  max-width: 900px;
}

.mods-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.mod-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
}

.mod-card.rpf {
  border-color: rgba(73, 201, 99, 0.3);
}

.mod-card.rpt {
  border-color: rgba(62, 168, 219, 0.3);
}

.mod-card:hover {
  transform: translateY(-4px);
}

.mod-card.rpf:hover {
  border-color: var(--rpf-green-2);
  box-shadow: 0 8px 24px rgba(73, 201, 99, 0.2);
}

.mod-card.rpt:hover {
  border-color: var(--rpf-blue-2);
  box-shadow: 0 8px 24px rgba(62, 168, 219, 0.2);
}

.mod-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.mod-header img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.mod-card.rpf .mod-header img {
  filter: drop-shadow(0 2px 8px rgba(73, 201, 99, 0.4));
}

.mod-card.rpt .mod-header img {
  filter: drop-shadow(0 2px 8px rgba(62, 168, 219, 0.4));
}

.mod-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: var(--vp-c-text-1);
}

.mod-card p {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0;
  flex: 1;
}

.mod-link {
  font-size: 0.95rem;
  font-weight: 500;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.mod-card.rpf .mod-link {
  color: var(--rpf-green-2);
}

.mod-card.rpt .mod-link {
  color: var(--rpf-blue-2);
}

.mod-card:hover .mod-link {
  opacity: 1;
}

:root:not(.dark) .mod-card {
  background: #ffffff;
  border: 2px solid rgba(60, 60, 67, 0.12);
}

:root:not(.dark) .mod-card.rpf {
  border-color: rgba(73, 201, 99, 0.3);
}

:root:not(.dark) .mod-card.rpt {
  border-color: rgba(62, 168, 219, 0.3);
}

@media (max-width: 960px) {
  .mods-info {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .why-simple h2 {
    font-size: 2rem;
  }
  
  .intro {
    font-size: 1.125rem;
  }
  
  .mod-card {
    padding: 1.5rem;
  }
}
</style>
