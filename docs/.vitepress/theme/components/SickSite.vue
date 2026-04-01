<template>
  <div class="sick-site-wrapper">
    <div 
      class="site-content" 
      :style="{ transform: contentShake }"
    >
      <slot></slot>
    </div>

    <button v-if="isFeatureActive" class="secret-trigger-btn" @click="handleManualTrigger" title="Secret Break Test">🤒</button>

    <Transition name="fade">
      <div v-if="isModalVisible" class="sick-modal">
        <button class="close-btn" @click="dismissForever" title="Закрыть навсегда">×</button>

        <div class="sick-container">
          <div class="sick-text">
            <h2>{{ locale === 'ru' ? 'О нет! 🤒' : 'Oh no! 🤒' }}</h2>
            <p>
              {{ locale === 'ru' 
                ? 'Сайт сильно заболел и все элементы осыпались...' 
                : 'The website got very sick and all elements fell down...' }}
            </p>
            <p class="subtext">
              {{ locale === 'ru' 
                ? 'Помоги ему выздороветь!' 
                : 'Help it recover!' }}
            </p>
          </div>

          <Tamagotchi 
            :health="health" 
            @feed="feed" 
            @play="play" 
            @sleep="sleep" 
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Tamagotchi from './Tamagotchi.vue'

const isSick = ref(false)
const hasFallen = ref(false)
const isModalVisible = ref(false)
const health = ref(10)
const shakeIntensity = ref(0)
const locale = ref('en')
let fallingElements: HTMLElement[] = []

const ADMIN_SETTINGS = {
  MODE: 'april_1st' as 'always_on' | 'always_off' | 'april_1st'
}

const isAprilFools = () => {
  const date = new Date()
  return date.getMonth() === 3 && date.getDate() === 1 // Месяцы в JS начинаются с 0 (3 = Апрель)
}

const isFeatureActive = computed(() => {
  if (typeof window === 'undefined') return false
  if (new URLSearchParams(window.location.search).has('sick')) return true // Секретная ссылка ?sick работает всегда
  if (ADMIN_SETTINGS.MODE === 'always_on') return true
  if (ADMIN_SETTINGS.MODE === 'april_1st') return isAprilFools()
  return false
})
// ==========================================

const contentShake = computed(() => {
  if (hasFallen.value) return '' // Отключаем общую тряску, элементы падают сами
  if (shakeIntensity.value === 0) return 'translate(0, 0)'
  const x = (Math.random() - 0.5) * shakeIntensity.value
  const y = (Math.random() - 0.5) * shakeIntensity.value
  return `translate(${x}px, ${y}px)`
})

onMounted(() => {
  const path = window.location.pathname
  locale.value = path.includes('/ru') ? 'ru' : 'en'

  const forceShow = new URLSearchParams(window.location.search).has('sick')
  const isDismissed = localStorage.getItem('tamagotchi_dismissed') === 'true'
  
  if ((isFeatureActive.value && !isDismissed) || forceShow) {
    setTimeout(() => {
      startCoughSequence()
    }, 1500)
  }

  // Слушаем событие от кнопки
  window.addEventListener('trigger-tamagotchi', handleManualTrigger)
})

onUnmounted(() => {
  window.removeEventListener('trigger-tamagotchi', handleManualTrigger)
})

function handleManualTrigger() {
  isModalVisible.value = false
  isSick.value = false
  hasFallen.value = false
  health.value = 10
  
  initAudio()
  
  startCoughSequence()
}

let audioCtx: AudioContext | null = null

function initAudio() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

function playCoughSound() {
  const ctx = initAudio()
  if (!ctx) return
  
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  
  osc.type = 'square'
  osc.frequency.setValueAtTime(150, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15)
  
  gain.gain.setValueAtTime(0.1, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
  
  osc.start()
  osc.stop(ctx.currentTime + 0.15)
}

function playFallSound() {
  const ctx = initAudio()
  if (!ctx) return
  
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(400, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 1.5)
  
  gain.gain.setValueAtTime(0.2, ctx.currentTime)
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5)
  
  osc.start()
  osc.stop(ctx.currentTime + 1.5)
}

function playRecoverSound() {
  const ctx = initAudio()
  if (!ctx) return
  
  const notes = [440, 554.37, 659.25, 880] // A4, C#5, E5, A5
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.type = 'sine'
    osc.frequency.value = freq
    
    const startTime = ctx.currentTime + (i * 0.1)
    gain.gain.setValueAtTime(0, startTime)
    gain.gain.linearRampToValueAtTime(0.15, startTime + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 1.0)
    
    osc.start(startTime)
    osc.stop(startTime + 1.0)
  })
}
// ======================================

function startCoughSequence() {
  if (isSick.value) return
  isSick.value = true
  initAudio()
  
  let coughCount = 0
  const coughInterval = setInterval(() => {
    shakeIntensity.value = 25
    playCoughSound()
    
    setTimeout(() => {
      shakeIntensity.value = 0
    }, 100)
    
    coughCount++
    if (coughCount >= 6) {
      clearInterval(coughInterval)
      shakeIntensity.value = 0
      
      triggerFall()
    }
  }, 250)
}

function triggerFall() {
  hasFallen.value = true
  playFallSound()
  
  const selectors = 'h1, h2, h3, h4, p, img, .VPButton, .VPFeature, li, a, span.name, span.text'
  const nodes = document.querySelectorAll('.site-content ' + selectors.split(', ').join(', .site-content '))
  
  fallingElements = Array.from(nodes) as HTMLElement[]

  fallingElements.forEach((el) => {
    const delay = Math.random() * 2
    const rot = (Math.random() - 0.5) * 360
    const x = (Math.random() - 0.5) * 300
    
    el.dataset.origTransition = el.style.transition || ''
    el.dataset.origTransform = el.style.transform || ''
    el.dataset.origOpacity = el.style.opacity || ''
    el.dataset.origPointerEvents = el.style.pointerEvents || ''
    
    el.style.transition = `transform 1.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) ${delay}s, opacity 1s ease-in ${delay + 0.5}s`
    el.style.transform = `translate(${x}px, 150vh) rotate(${rot}deg)`
    el.style.opacity = '0'
    el.style.pointerEvents = 'none'
  })
  
  setTimeout(() => {
    isModalVisible.value = true
  }, 3500)
}

function feed() { heal(15) }
function play() { heal(20) }
function sleep() { heal(25) }

function heal(amount: number) {
  health.value = Math.min(100, health.value + amount)
  if (health.value === 100) {
    recoverSite()
  }
}

function recoverSite() {
  isModalVisible.value = false
  playRecoverSound() 
  
  setTimeout(() => {
    hasFallen.value = false
    isSick.value = false
    
    fallingElements.forEach((el) => {
      el.style.transition = 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s ease-out'
      el.style.transform = el.dataset.origTransform || ''
      el.style.opacity = el.dataset.origOpacity || ''
      el.style.pointerEvents = el.dataset.origPointerEvents || ''
      
      setTimeout(() => {
        el.style.transition = el.dataset.origTransition || ''
      }, 1200)
    })
    
    localStorage.setItem('tamagotchi_dismissed', 'true')
  }, 300)
}

function dismissForever() {
  health.value = 100
  recoverSite()
}
</script>

<style scoped>
.sick-site-wrapper {
  position: relative;
  overflow-x: hidden;
}

.site-content {
  transition: transform 0.05s ease-out;
  transform-origin: center center;
  will-change: transform;
}

.secret-trigger-btn {
  position: fixed;
  bottom: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 18px;
  opacity: 0.33; 
  cursor: pointer;
  z-index: 998;
  transition: opacity 0.3s ease, transform 0.3s ease;
  padding: 5px;
}

.secret-trigger-btn:hover {
  opacity: 0.8;
  transform: scale(1.2);
}

.sick-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.close-btn {
  position: absolute;
  top: 15px;
  left: 15px;
  background: transparent;
  border: none;
  color: white;
  font-size: 32px;
  line-height: 1;
  opacity: 0.15;
  cursor: pointer;
  transition: opacity 0.2s;
  padding: 10px;
  z-index: 10000;
}

.close-btn:hover {
  opacity: 0.8;
}

.sick-container {
  background: linear-gradient(135deg, #49C963 0%, #319e46 100%);
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.sick-text h2 {
  font-size: 28px;
  margin: 0 0 10px 0;
}

.sick-text p {
  font-size: 16px;
  margin: 5px 0;
}

.subtext {
  font-weight: bold;
  font-size: 18px;
  margin-top: 15px !important;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
