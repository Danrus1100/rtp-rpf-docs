<template>
  <div class="tamagotchi-game">
    <div v-if="phase === 'temperature'" class="temperature-phase">
      <div class="thermometer-container">
        <div class="thermometer">
          <div class="thermometer-bulb"></div>
          <div class="thermometer-fill" :style="{ height: tempPercent + '%' }"></div>
          <div class="thermometer-marks"></div>
        </div>
        <div class="temp-text">
          <span class="temp-value" :class="{ danger: currentTemp > 39 }">
            {{ currentTemp.toFixed(1) }}°C
          </span>
        </div>
      </div>
      <h3 class="temp-status" :class="{ 'critical': currentTemp > 39 }">
        {{ tempMessage }}
      </h3>
    </div>

    <div v-else class="game-phase fade-in">
      <div class="pet-container" :class="{ shake: isCoughing }">
        <img 
          src="/site_logo.png" 
          alt="Pet" 
          class="pet-image" 
          :class="{ 
            sleeping: currentAction === 'sleep', 
            playing: currentAction === 'play', 
            eating: currentAction === 'feed',
            bounce: currentAction === '' && !isCoughing 
          }"
          :style="health > 80 ? 'filter: drop-shadow(0 10px 10px rgba(0,0,0,0.3)) hue-rotate(90deg);' : ''"
        />
        
        <div v-if="health > 80" class="sunglasses">😎</div>

        <div v-if="currentAction === 'sleep'" class="action-bubble">💤</div>
        <div v-if="currentAction === 'play'" class="action-bubble play-bubble">🎉</div>
        <div v-if="currentAction === 'feed'" class="action-bubble food-bubble">🍎</div>
        
        <div v-if="isCoughing" class="action-bubble cough-bubble">💦</div>

        <Transition name="float-up">
          <div v-if="healingAmount > 0" class="heal-popup">+{{ healingAmount }}</div>
        </Transition>
      </div>

      <div class="stats">
        <div class="stat">
          <span class="stat-label">{{ locale === 'ru' ? 'Здоровье' : 'Health' }}</span>
          <div class="stat-bar">
            <div class="stat-fill" :style="{ width: health + '%' }"></div>
          </div>
          <span class="stat-value">{{ health }}%</span>
        </div>
      </div>

      <div class="actions">
        <button 
          @click="handleAction('feed')" 
          :disabled="isAnimating || lastAction === 'feed'"
          :class="{ locked: lastAction === 'feed' }"
        >
          <span class="action-icon">🍎</span>
          {{ locale === 'ru' ? 'Покормить' : 'Feed' }}
        </button>

        <button 
          @click="handleAction('play')" 
          :disabled="isAnimating || lastAction === 'play'"
          :class="{ locked: lastAction === 'play' }"
        >
          <span class="action-icon">🎮</span>
          {{ locale === 'ru' ? 'Играть' : 'Play' }}
        </button>

        <button 
          @click="handleAction('sleep')" 
          :disabled="isAnimating || lastAction === 'sleep'"
          :class="{ locked: lastAction === 'sleep' }"
        >
          <span class="action-icon">😴</span>
          {{ locale === 'ru' ? 'Спать' : 'Sleep' }}
        </button>
      </div>

      <div class="messages-area">
        <div v-if="message" class="message">{{ message }}</div>
        <div v-else-if="!isAnimating && lastAction" class="hint-message">
          {{ locale === 'ru' ? 'Ему скучно делать одно и то же!' : 'He is bored of doing the same thing!' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps<{ health: number }>()
const emit = defineEmits<{ feed: [], play: [], sleep: [] }>()

const locale = ref('en')
const path = typeof window !== 'undefined' ? window.location.pathname : ''
if (path.includes('/ru')) {
  locale.value = 'ru'
}

const phase = ref('temperature')
const currentTemp = ref(36.6)
const tempMessage = ref(locale.value === 'ru' ? 'Меряем температуру...' : 'Taking temperature...')
const tempPercent = computed(() => {
  return Math.min(100, Math.max(0, (currentTemp.value - 36) / (42 - 36) * 100))
})

const lastAction = ref('')
const currentAction = ref('')
const isAnimating = ref(false)
const message = ref('')
const healingAmount = ref(0)
const isCoughing = ref(false)

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

function playTickSound() {
  const ctx = initAudio()
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = 'square'
  osc.frequency.setValueAtTime(800, ctx.currentTime)
  gain.gain.setValueAtTime(0.02, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
  osc.start()
  osc.stop(ctx.currentTime + 0.05)
}

function playAlertSound() {
  const ctx = initAudio()
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = 'square'
  osc.frequency.setValueAtTime(1200, ctx.currentTime)
  osc.frequency.setValueAtTime(800, ctx.currentTime + 0.1)
  gain.gain.setValueAtTime(0.05, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)
  osc.start()
  osc.stop(ctx.currentTime + 0.2)
}

function playClickSound() {
  const ctx = initAudio()
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(600, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1)
  gain.gain.setValueAtTime(0.05, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
  osc.start()
  osc.stop(ctx.currentTime + 0.1)
}

function playHealSound() {
  const ctx = initAudio()
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(440, ctx.currentTime)
  osc.frequency.setValueAtTime(554, ctx.currentTime + 0.1)
  osc.frequency.setValueAtTime(659, ctx.currentTime + 0.2)
  gain.gain.setValueAtTime(0, ctx.currentTime)
  gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05)
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4)
  osc.start()
  osc.stop(ctx.currentTime + 0.4)
}

function playEatSound() {
  const ctx = initAudio()
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(300, ctx.currentTime)
  osc.frequency.setValueAtTime(400, ctx.currentTime + 0.1)
  osc.frequency.setValueAtTime(300, ctx.currentTime + 0.2)
  osc.frequency.setValueAtTime(400, ctx.currentTime + 0.3)
  gain.gain.setValueAtTime(0.05, ctx.currentTime)
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4)
  osc.start()
  osc.stop(ctx.currentTime + 0.4)
}

onMounted(() => {
  let targetTemp = 41.2 + Math.random()
  let step = (targetTemp - 36.6) / 40
  let count = 0

  const interval = setInterval(() => {
    currentTemp.value += step
    count++
    
    if (count % 3 === 0) playTickSound()
    
    if (count === 25) {
      tempMessage.value = locale.value === 'ru' ? 'Ого, как горячо! 🤒' : 'Wow, so hot! 🤒'
    }

    if (count >= 40) {
      clearInterval(interval)
      playAlertSound()
      tempMessage.value = locale.value === 'ru' ? 'Критический перегрев! 😱 Срочно лечить!' : 'Critical overheat! 😱 Heal now!'
      
      setTimeout(() => {
        phase.value = 'game'
        startRandomCough()
      }, 2500)
    }
  }, 50)
})

function startRandomCough() {
  setInterval(() => {
    if (props.health < 60 && phase.value === 'game' && !isAnimating.value) {
      if (Math.random() > 0.7) {
        isCoughing.value = true
        setTimeout(() => isCoughing.value = false, 600)
      }
    }
  }, 4000)
}

function handleAction(type: 'feed' | 'play' | 'sleep') {
  if (isAnimating.value || lastAction.value === type) return

  playClickSound()
  isAnimating.value = true
  currentAction.value = type
  lastAction.value = type

  let healVal = 0
  let delayDuration = 2000

  if (type === 'feed') {
    message.value = locale.value === 'ru' ? 'Ням-ням... Вкусно! 😋' : 'Yum yum... Tasty! 😋'
    healVal = 15
    delayDuration = 1800
    setTimeout(() => playEatSound(), 200)
  } else if (type === 'play') {
    message.value = locale.value === 'ru' ? 'Уиии! Это весело! 🎉' : 'Wheee! So fun! 🎉'
    healVal = 20
    delayDuration = 2200
  } else if (type === 'sleep') {
    message.value = locale.value === 'ru' ? 'Хрр-хрр... 😴' : 'Zzz... 😴'
    healVal = 25
    delayDuration = 3000
  }

  setTimeout(() => {
    playHealSound()
    healingAmount.value = healVal
    emit(type)
    
    setTimeout(() => {
      healingAmount.value = 0
      isAnimating.value = false
      currentAction.value = ''
      message.value = ''
    }, 1000)

  }, delayDuration)
}
</script>

<style scoped>
.tamagotchi-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 250px;
  width: 100%;
}

.temperature-phase {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  animation: fadeIn 0.5s;
}

.thermometer-container {
  display: flex;
  align-items: center;
  gap: 25px;
}

.thermometer {
  width: 24px;
  height: 150px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px 12px 0 0;
  border: 3px solid white;
  position: relative;
  display: flex;
  align-items: flex-end;
  margin-bottom: 20px;
}

.thermometer-fill {
  width: 100%;
  background: linear-gradient(to top, #fbbf24, #ef4444, #b91c1c);
  transition: height 0.1s linear;
  border-radius: 8px 8px 0 0;
}

.thermometer-bulb {
  width: 36px;
  height: 36px;
  background: #ef4444;
  border-radius: 50%;
  border: 3px solid white;
  position: absolute;
  bottom: -25px;
  left: -9px;
  z-index: 2;
}

.thermometer-marks {
  position: absolute;
  top: 10px;
  bottom: 10px;
  right: -10px;
  width: 6px;
  background: repeating-linear-gradient(to bottom, transparent 0, transparent 8px, white 8px, white 10px);
}

.temp-value {
  font-size: 38px;
  font-weight: 800;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  transition: color 0.3s;
}

.temp-value.danger {
  color: #ffcccc;
  animation: pulseText 0.5s infinite alternate;
}

.temp-status {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
.temp-status.critical {
  color: #ffcccc;
  animation: pulseText 0.5s infinite alternate;
}

.game-phase {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 10px;
  width: 100%;
}

.fade-in {
  animation: fadeIn 0.8s ease-out;
}

.pet-container {
  position: relative;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

.pet-image {
  max-width: 100px;
  max-height: 100px;
  object-fit: contain;
  filter: drop-shadow(0 10px 10px rgba(0,0,0,0.3));
  transition: all 0.3s;
}

.pet-image.bounce { animation: bounce 1.5s ease-in-out infinite; }
.pet-image.sleeping { 
  opacity: 0.7; 
  transform: scale(0.95);
  filter: brightness(0.8) drop-shadow(0 5px 5px rgba(0,0,0,0.3));
  animation: breathe 3s ease-in-out infinite; 
}
.pet-image.eating { animation: eatWobble 0.5s ease-in-out infinite; }
.pet-image.playing { animation: spinJump 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite; }

.pet-container.shake { animation: coughShake 0.4s cubic-bezier(.36,.07,.19,.97) both; }

.sunglasses {
  position: absolute;
  font-size: 40px;
  top: 30px;
  animation: dropIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.action-bubble {
  position: absolute;
  top: -20px;
  right: -10px;
  font-size: 32px;
  animation: floatBubble 2s ease-in-out infinite;
}
.play-bubble { font-size: 40px; animation: bounce 0.5s infinite; }
.food-bubble { font-size: 36px; animation: fallIn 1s forwards; right: 20px; top: 0; }
.cough-bubble { font-size: 28px; right: auto; left: -10px; top: 10px; animation: floatBubble 1s forwards; }

.heal-popup {
  position: absolute;
  top: 20px;
  font-size: 28px;
  font-weight: 900;
  color: #4ade80;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5), 0 0 10px white;
  z-index: 10;
}

.float-up-enter-active { animation: healFloat 1s ease-out forwards; }
.float-up-leave-active { transition: opacity 0.3s; }
.float-up-leave-to { opacity: 0; }

.stats { width: 100%; }
.stat { display: flex; align-items: center; gap: 12px; }
.stat-label { font-size: 14px; font-weight: 600; min-width: 60px; text-align: right; }
.stat-bar { flex: 1; height: 24px; background: rgba(0, 0, 0, 0.2); border-radius: 12px; overflow: hidden; }
.stat-fill { height: 100%; background: linear-gradient(90deg, #f0fdf4 0%, #ffffff 100%); transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1); border-radius: 12px; }
.stat-value { font-size: 14px; font-weight: bold; min-width: 40px; }

.actions { display: flex; gap: 12px; width: 100%; justify-content: center; flex-wrap: wrap; }
.actions button {
  display: flex; align-items: center; gap: 8px; padding: 10px 18px; border: none; border-radius: 25px;
  background: white; color: #49C963; font-weight: bold; cursor: pointer; transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.action-icon { font-size: 18px; }

.actions button:hover:not(:disabled) { transform: translateY(-2px) scale(1.05); box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); }
.actions button:disabled { opacity: 0.6; cursor: wait; filter: grayscale(0.2); }
.actions button.locked { opacity: 0.4; cursor: not-allowed; background: #e5e5e5; }

.messages-area { height: 30px; position: relative; width: 100%; display: flex; justify-content: center; }
.message { font-size: 18px; font-weight: bold; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.3); animation: popText 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.hint-message { font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.8); font-style: italic; }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes pulseText { from { transform: scale(1); } to { transform: scale(1.05); } }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes breathe { 0%, 100% { transform: scale(0.95); } 50% { transform: scale(1); } }
@keyframes eatWobble { 0%, 100% { transform: rotate(0deg) scale(1); } 25% { transform: rotate(-10deg) scale(1.1); } 75% { transform: rotate(10deg) scale(1.1); } }
@keyframes spinJump { 0% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-30px) rotate(180deg) scale(1.1); } 100% { transform: translateY(0) rotate(360deg); } }
@keyframes coughShake { 10%, 90% { transform: translate3d(-2px, 0, 0); } 20%, 80% { transform: translate3d(4px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-6px, 0, 0); } 40%, 60% { transform: translate3d(6px, 0, 0); } }
@keyframes dropIn { 0% { transform: translateY(-50px) scale(2); opacity: 0; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
@keyframes floatBubble { 0%, 100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(-15px); opacity: 0.8; } }
@keyframes fallIn { 0% { transform: translateY(-40px) scale(1.5); opacity: 0; } 100% { transform: translateY(20px) scale(0); opacity: 1; } }
@keyframes healFloat { 0% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(-40px) scale(1.5); opacity: 0; } }
@keyframes popText { 0% { opacity: 0; transform: scale(0.5) translateY(10px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
</style>