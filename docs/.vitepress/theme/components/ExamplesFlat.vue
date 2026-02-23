<template>
  <div class="examples-tabs-flat">
    <div class="section-header">
      <h2>Quick Examples</h2>
      <p class="section-description">Explore practical examples of RPF and RPT features</p>
    </div>

    <div class="main-tabs">
      <button
        v-for="(example, index) in allExamples"
        :key="index"
        :class="['tab-button', { active: activeTab === index }, example.type]"
        @click="activeTab = index"
      >
        <span>{{ example.title }}</span>
        <img :src="withBase(example.icon)" :alt="example.title" class="tab-icon" />
      </button>
    </div>

    <div class="content-area">
      <Transition name="fade" mode="out-in">
        <div class="example-content" :key="activeTab">
          <p class="example-description" v-html="allExamples[activeTab].description"></p>

          <div class="code-blocks">
            <div
              v-for="(codeBlock, idx) in allExamples[activeTab].code"
              :key="idx"
              class="code-block-wrapper"
            >
              <div v-if="codeBlock.label" class="code-label" v-html="codeBlock.label"></div>
              <div class="code-block">
                <pre><code class="language-json" v-html="highlightJSON(codeBlock.content)"></code></pre>
              </div>
            </div>
          </div>

          <div v-if="allExamples[activeTab].media" class="media-container">
            <img :src="withBase(allExamples[activeTab].media)" :alt="allExamples[activeTab].title" />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  examples: {
    type: Array,
    required: true
  }
})

const allExamples = props.examples
const activeTab = ref(0)

function highlightJSON(code) {
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')
    .replace(/:\s*"([^"]*)"/g, ': <span class="json-string">"$1"</span>')
    .replace(/:\s*(true|false)/g, ': <span class="json-boolean">$1</span>')
    .replace(/:\s*(null)/g, ': <span class="json-null">$1</span>')
    .replace(/:\s*(-?\d+\.?\d*)/g, ': <span class="json-number">$1</span>')
}
</script>

<style scoped>
.examples-tabs-flat {
  margin: 4rem 0;
  padding: 0 1.5rem;
}

.section-header {
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
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

/* Main tabs */
.main-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  border-bottom: 2px solid var(--vp-c-divider);
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
  white-space: nowrap;
  position: relative;
  margin-bottom: -2px;
}

.tab-icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.tab-button:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.tab-button:hover .tab-icon {
  opacity: 1;
}

.tab-button.active {
  font-weight: 600;
}

.tab-button.active .tab-icon {
  opacity: 1;
}

.tab-button.rpf.active {
  border-bottom-color: #49C963;
  color: #49C963;
}

.tab-button.rpt.active {
  border-bottom-color: #3EA8DB;
  color: #3EA8DB;
}

.content-area {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  min-height: 400px;
}

.example-content {
  max-width: 900px;
  margin: 0 auto;
}

.example-description {
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.code-blocks {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.code-block-wrapper {
  width: 100%;
}

.code-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
  font-family: var(--vp-font-family-mono);
}

.code-block {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
}

.code-block pre {
  margin: 0;
  padding: 1.5rem;
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.5;
}

.code-block code {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
}

.code-block :deep(.json-key) {
  color: #79b8ff;
}

.code-block :deep(.json-string) {
  color: #9ecbff;
}

.code-block :deep(.json-number) {
  color: #79c0ff;
}

.code-block :deep(.json-boolean) {
  color: #ff7b72;
}

.code-block :deep(.json-null) {
  color: #ffa657;
}

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

.media-container {
  margin-top: 2rem;
  text-align: center;
}

.media-container img {
  max-width: 100%;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
}

@media (max-width: 768px) {
  .examples-tabs-flat {
    padding: 0 1rem;
    margin: 3rem 0;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .main-tabs {
    gap: 0.5rem;
  }

  .tab-button {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }

  .content-area {
    padding: 1.5rem;
  }

  .example-description {
    font-size: 1rem;
  }

  .code-block pre {
    padding: 1rem;
    font-size: 0.85rem;
  }
}
</style>
