<script setup lang="ts">
import type { IProduct } from '~/data/ocean'
import { computed, getCurrentInstance, ref } from 'vue'
import { useCartStore } from '~/store'

const props = defineProps<{
  product: IProduct
  compact?: boolean
}>()

const emit = defineEmits<{ tap: [] }>()
const { addItem } = useCartStore()

const MAGNIFY = 2.4
const instance = getCurrentInstance()
const hovering = ref(false)
const ballPos = ref({ x: 50, y: 50 })
const imageRect = ref<{ left: number, top: number, width: number, height: number } | null>(null)

const lensSize = computed(() => uni.upx2px(props.compact ? 104 : 148))

const lensBallStyle = computed(() => ({
  left: `${ballPos.value.x}%`,
  top: `${ballPos.value.y}%`,
  width: `${lensSize.value}px`,
  height: `${lensSize.value}px`,
}))

const lensImageStyle = computed(() => {
  const rect = imageRect.value
  if (!rect)
    return {}
  const radius = lensSize.value / 2
  const lx = (ballPos.value.x / 100) * rect.width
  const ly = (ballPos.value.y / 100) * rect.height
  return {
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    left: `${radius - lx * MAGNIFY}px`,
    top: `${radius - ly * MAGNIFY}px`,
    transform: `scale(${MAGNIFY})`,
    transformOrigin: '0 0',
  }
})

function tagClass(style?: string) {
  const base = 'absolute left-16rpx top-16rpx z-3 rounded-full px-16rpx py-4rpx text-20rpx font-bold'
  if (style === 'default')
    return `${base} bg-primary-container text-[#799dd6]`
  return `${base} bg-secondary-container text-white`
}

function clampBallPos(x: number, y: number) {
  ballPos.value = {
    x: Math.max(10, Math.min(90, x)),
    y: Math.max(10, Math.min(90, y)),
  }
}

function updateBallFromClient(clientX: number, clientY: number) {
  const rect = imageRect.value
  if (!rect?.width || !rect?.height)
    return
  const x = ((clientX - (rect.left ?? 0)) / rect.width) * 100
  const y = ((clientY - (rect.top ?? 0)) / rect.height) * 100
  clampBallPos(x, y)
}

function measureImageRect(callback?: () => void) {
  if (!instance)
    return
  uni.createSelectorQuery()
    .in(instance)
    .select('.grid-image-wrap')
    .boundingClientRect((rect) => {
      if (rect && !Array.isArray(rect) && rect.width && rect.height) {
        imageRect.value = {
          left: rect.left ?? 0,
          top: rect.top ?? 0,
          width: rect.width,
          height: rect.height,
        }
      }
      callback?.()
    })
    .exec()
}

function getClientPoint(e: any) {
  if (e.clientX != null && e.clientY != null)
    return { x: e.clientX, y: e.clientY }
  const touch = e.touches?.[0] ?? e.changedTouches?.[0]
  if (touch)
    return { x: touch.clientX, y: touch.clientY }
  return null
}

function onPointerEnter(e: any) {
  hovering.value = true
  measureImageRect(() => {
    const point = getClientPoint(e)
    if (point)
      updateBallFromClient(point.x, point.y)
  })
}

function onPointerMove(e: any) {
  if (!hovering.value)
    return
  const point = getClientPoint(e)
  if (point)
    updateBallFromClient(point.x, point.y)
}

function onPointerLeave() {
  hovering.value = false
  imageRect.value = null
}

function handleAdd(product: IProduct) {
  addItem(product)
  uni.showToast({ title: '已加入购物车', icon: 'none' })
}
</script>

<template>
  <view
    class="box-border w-full overflow-hidden rounded-[24rpx] bg-white shadow-[0_4rpx_20rpx_rgba(0,51,102,0.06)]"
    @tap="emit('tap')"
  >
    <view
      class="grid-image-wrap relative w-full overflow-hidden pb-full"
      @mouseenter="onPointerEnter"
      @mousemove="onPointerMove"
      @mouseleave="onPointerLeave"
      @touchstart.stop="onPointerEnter"
      @touchmove.stop="onPointerMove"
      @touchend="onPointerLeave"
      @touchcancel="onPointerLeave"
    >
      <image class="absolute inset-0 h-full w-full" :src="product.image" mode="aspectFill" />
      <view
        v-if="hovering && imageRect"
        class="pointer-events-none absolute z-2 drop-shadow-[0_10rpx_24rpx_rgba(0,30,64,0.28)] transition-[opacity,transform] duration-300 ease-out -translate-x-1/2 -translate-y-1/2"
        :class="hovering ? 'scale-100 opacity-100' : 'scale-50 opacity-0'"
        :style="lensBallStyle"
      >
        <view class="lens-viewport-animate relative isolate h-full w-full overflow-hidden">
          <image
            class="will-change-[left,top,transform] absolute"
            :src="product.image"
            mode="aspectFill"
            :style="lensImageStyle"
          />
          <view class="pointer-events-none absolute inset-0 z-2 border-[3rpx] border-white/82 rounded-[inherit] shadow-[inset_0_0_18rpx_rgba(255,255,255,0.55),inset_0_-10rpx_20rpx_rgba(0,51,102,0.12),inset_0_0_0_1rpx_rgba(255,255,255,0.35)]" />
          <view class="pointer-events-none absolute left-[14%] top-[10%] z-3 h-[28%] w-[42%] rotate-[-18deg] rounded-full from-white/95 to-transparent bg-gradient-to-br" />
          <view class="pointer-events-none absolute bottom-[14%] right-[16%] z-3 h-[24%] w-[24%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0)_70%)]" />
        </view>
      </view>
      <view v-if="product.tag" :class="tagClass(product.tagStyle)">
        {{ product.tag }}
      </view>
    </view>
    <view :class="compact ? 'p-16rpx' : 'p-24rpx'">
      <text
        class="block overflow-hidden text-on-surface font-bold leading-snug"
        :class="compact ? 'line-clamp-2 text-28rpx' : 'truncate text-32rpx'"
      >
        {{ product.name }}
      </text>
      <text
        class="mt-8rpx block overflow-hidden text-ellipsis whitespace-nowrap text-outline"
        :class="compact ? 'mb-16rpx text-22rpx' : 'mb-24rpx text-24rpx'"
      >
        <template v-if="product.origin">
          产地：{{ product.origin }}
        </template>
        <template v-if="product.origin && product.spec">
          ·
        </template>
        <template v-if="product.spec">
          {{ product.spec }}
        </template>
      </text>
      <view class="flex items-end justify-between gap-16rpx">
        <view class="min-w-0 flex-1">
          <view class="flex flex-nowrap items-baseline whitespace-nowrap">
            <text class="text-secondary font-bold leading-none" :class="compact ? 'text-32rpx' : 'text-44rpx'">
              ¥{{ product.price }}
            </text>
            <text v-if="product.unit" class="ml-8rpx text-24rpx text-outline">
              {{ product.unit }}
            </text>
          </view>
          <text v-if="product.originalPrice" class="mt-4rpx block text-20rpx text-outline line-through">
            ¥{{ product.originalPrice }}
          </text>
        </view>
        <view
          class="flex shrink-0 items-center justify-center rounded-full bg-secondary-container shadow-[0_8rpx_24rpx_rgba(254,126,79,0.25)]"
          :class="compact ? 'h-48rpx w-48rpx' : 'h-64rpx w-64rpx'"
          @tap.stop="handleAdd(product)"
        >
          <u-icon name="plus" color="#fff" size="14" />
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
@keyframes lens-wobble {
  0%, 100% {
    border-radius: 58% 42% 45% 55% / 52% 48% 52% 48%;
  }
  50% {
    border-radius: 44% 56% 53% 47% / 47% 53% 47% 53%;
  }
}

.lens-viewport-animate {
  animation: lens-wobble 3.8s ease-in-out infinite;
  border-radius: 58% 42% 45% 55% / 52% 48% 52% 48%;
}
</style>
