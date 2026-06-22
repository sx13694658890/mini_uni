<script setup lang="ts">
// #ifdef H5
import { animate, createScope, createTimeline, spring } from 'animejs'

import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
// #endif

defineProps<{
  image: string
}>()

const rootRef = ref<HTMLElement | null>(null)
const isHovering = ref(false)
const isPreview = ref(false)
const mpTilt = ref({ rotateX: 0, rotateY: 0, scale: 1 })

// #ifdef H5
let scope: ReturnType<typeof createScope> | null = null
let activeTilt: ReturnType<typeof animate> | null = null

function getRootEl(): HTMLElement | null {
  const node = rootRef.value as unknown as { $el?: HTMLElement } | HTMLElement | null
  if (!node)
    return null
  return (node as { $el?: HTMLElement }).$el ?? (node as HTMLElement)
}

function getImageEl(root: HTMLElement) {
  return root.querySelector('.hero-3d-image') as HTMLElement | null
}

function getShineEl(root: HTMLElement) {
  return root.querySelector('.hero-3d-shine') as HTMLElement | null
}

function cancelTilt() {
  activeTilt?.cancel()
  activeTilt = null
}

function animateTilt(x: number, y: number) {
  const root = getRootEl()
  const target = root ? getImageEl(root) : null
  if (!target)
    return

  const tilt = isPreview.value ? 32 : 20
  const scale = isPreview.value ? 1.14 : 1.07

  cancelTilt()
  activeTilt = animate(target, {
    rotateY: x * tilt * 2,
    rotateX: -y * tilt * 2,
    scale,
    duration: 520,
    ease: 'out(3)',
  })

  const shine = root ? getShineEl(root) : null
  if (shine) {
    animate(shine, {
      translateX: `${x * 36}%`,
      translateY: `${y * 36}%`,
      opacity: isHovering.value || isPreview.value ? 0.72 : 0,
      duration: 420,
      ease: 'out(2)',
    })
  }
}

function resetTilt() {
  const root = getRootEl()
  const target = root ? getImageEl(root) : null
  if (!target)
    return

  cancelTilt()
  animate(target, {
    rotateY: 0,
    rotateX: 0,
    scale: isPreview.value ? 1.1 : 1,
    duration: 760,
    ease: spring({ bounce: 0.55, duration: 760 }),
  })

  const shine = root ? getShineEl(root) : null
  if (shine) {
    animate(shine, {
      translateX: '0%',
      translateY: '0%',
      opacity: 0,
      duration: 360,
      ease: 'out(2)',
    })
  }
}

function enterPreview() {
  const root = getRootEl()
  const target = root ? getImageEl(root) : null
  if (!target)
    return

  createTimeline({ defaults: { ease: 'out(4)' } })
    .add(target, {
      scale: [1, 1.12],
      rotateY: [0, 12],
      duration: 680,
    }, 0)
    .add('.hero-3d-frame', {
      boxShadow: [
        '0 18px 48px rgba(0, 30, 64, 0.12)',
        '0 28px 64px rgba(0, 30, 64, 0.22)',
      ],
      duration: 680,
    }, 0)
    .add('.hero-3d-hint', {
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 420,
      ease: 'out(3)',
    }, 280)
}

function exitPreview() {
  const root = getRootEl()
  const target = root ? getImageEl(root) : null
  if (!target)
    return

  createTimeline({
    defaults: { ease: spring({ bounce: 0.5, duration: 720 }) },
  })
    .add(target, {
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      duration: 720,
    }, 0)
    .add('.hero-3d-frame', {
      boxShadow: '0 18px 48px rgba(0, 30, 64, 0.12)',
      duration: 720,
    }, 0)
    .add('.hero-3d-hint', {
      opacity: 0,
      translateY: 8,
      duration: 260,
    }, 0)
}

function initScope() {
  const root = getRootEl()
  if (!root)
    return

  scope = createScope({ root }).add(() => {
    animate('.hero-3d-image', {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      duration: 0,
    })
  })
}

function h5PointerMove(e: MouseEvent | TouchEvent) {
  if (!isHovering.value && !isPreview.value)
    return

  const root = getRootEl()
  if (!root)
    return

  const rect = root.getBoundingClientRect()
  const point = 'touches' in e ? e.touches[0] : e
  const x = (point.clientX - rect.left) / rect.width - 0.5
  const y = (point.clientY - rect.top) / rect.height - 0.5
  animateTilt(x, y)
}

function h5PointerEnter() {
  isHovering.value = true
}

function h5PointerLeave() {
  isHovering.value = false
  if (!isPreview.value)
    resetTilt()
}

onMounted(() => {
  nextTick(() => initScope())
})

onUnmounted(() => {
  cancelTilt()
  scope?.revert()
  scope = null
})
// #endif

const stageClass = computed(() =>
  isPreview.value ? 'h-[360px]' : 'h-[280px]',
)

const mpTransformStyle = computed(() => ({
  transform: `perspective(900px) rotateX(${mpTilt.value.rotateX}deg) rotateY(${mpTilt.value.rotateY}deg) scale(${mpTilt.value.scale})`,
}))

function onClick() {
  isPreview.value = !isPreview.value

  // #ifdef H5
  if (isPreview.value)
    enterPreview()
  else
    exitPreview()
  // #endif

  // #ifndef H5
  mpTilt.value.scale = isPreview.value ? 1.1 : 1
  if (!isPreview.value) {
    mpTilt.value.rotateX = 0
    mpTilt.value.rotateY = 0
  }
  // #endif
}

function onPointerEnter() {
  // #ifdef H5
  h5PointerEnter()
  // #endif
  // #ifndef H5
  isHovering.value = true
  // #endif
}

function onPointerLeave() {
  // #ifdef H5
  h5PointerLeave()
  // #endif
  // #ifndef H5
  isHovering.value = false
  if (!isPreview.value) {
    mpTilt.value = { rotateX: 0, rotateY: 0, scale: 1 }
  }
  // #endif
}

function onPointerMove(e: MouseEvent | TouchEvent) {
  // #ifdef H5
  h5PointerMove(e)
  // #endif
  // #ifndef H5
  const touch = (e as TouchEvent).touches?.[0]
  if (!touch)
    return
  uni.createSelectorQuery()
    .select('.hero-3d-stage')
    .boundingClientRect((rect) => {
      if (!rect || Array.isArray(rect))
        return
      const x = (touch.clientX - rect.left) / rect.width - 0.5
      const y = (touch.clientY - rect.top) / rect.height - 0.5
      const tilt = isPreview.value ? 24 : 14
      const scale = isPreview.value ? 1.1 : 1.05
      mpTilt.value = {
        rotateX: -y * tilt * 2,
        rotateY: x * tilt * 2,
        scale,
      }
    })
    .exec()
  // #endif
}
</script>

<template>
  <view
    ref="rootRef"
    class="hero-3d-stage relative w-full overflow-hidden transition-[height] duration-500"
    :class="stageClass"
    @click="onClick"
    @mouseenter="onPointerEnter"
    @mousemove="onPointerMove"
    @mouseleave="onPointerLeave"
    @touchstart="onPointerEnter"
    @touchmove.stop="onPointerMove"
    @touchend="onPointerLeave"
    @touchcancel="onPointerLeave"
  >
    <view class="hero-3d-frame [perspective:1000px] absolute inset-0">
      <!-- #ifndef H5 -->
      <view
        class="hero-3d-image [transform-style:preserve-3d] relative h-full w-full will-change-transform"
        :style="mpTransformStyle"
      >
        <image class="h-full w-full" :src="image" mode="aspectFill" />
        <view class="hero-3d-shine pointer-events-none absolute inset-0 opacity-0" />
        <view class="pointer-events-none absolute inset-0 from-white/20 to-transparent via-transparent bg-gradient-to-br" />
      </view>
      <!-- #endif -->
      <!-- #ifdef H5 -->
      <view class="hero-3d-image [transform-style:preserve-3d] relative h-full w-full will-change-transform">
        <image class="h-full w-full" :src="image" mode="aspectFill" />
        <view class="hero-3d-shine pointer-events-none absolute inset-0 opacity-0" />
        <view class="pointer-events-none absolute inset-0 from-white/20 to-transparent via-transparent bg-gradient-to-br" />
      </view>
      <!-- #endif -->
    </view>

    <view class="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs text-primary font-bold shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
      <view class="h-2 w-2 rounded-full bg-secondary-container" />
      <text>今日捕捞</text>
    </view>

    <view class="pointer-events-none absolute bottom-8 right-4 z-10 flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs text-primary font-bold">
      <u-icon name="camera" color="#001e40" size="12" />
      <text>{{ isPreview ? '3D' : '1/5' }}</text>
    </view>

    <view
      class="hero-3d-hint pointer-events-none absolute bottom-4 left-1/2 z-10 flex items-center gap-1.5 rounded-full bg-primary/85 px-4 py-1.5 text-[10px] text-white font-medium opacity-0 -translate-x-1/2"
    >
      <u-icon name="eye" color="#fff" size="12" />
      <text>{{ isPreview ? '点击退出 3D 预览' : '点击查看 3D 预览' }}</text>
    </view>
  </view>
</template>

<style scoped>
.hero-3d-shine {
  background: linear-gradient(
    115deg,
    transparent 38%,
    rgba(255, 255, 255, 0.42) 50%,
    transparent 62%
  );
}

.hero-3d-frame {
  box-shadow: 0 18px 48px rgba(0, 30, 64, 0.12);
}
</style>
