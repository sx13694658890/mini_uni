import { onShow } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import { useNavBar } from './useNavBar'

/** 与 OceanTabBar 组件中 50px 内容区高度一致 */
export const TAB_BAR_HEIGHT = 50

/**
 * Tab 页 scroll-view 布局。
 * 小程序 scroll-view 内 width:100% 无法可靠约束子元素宽度，
 * 必须用 windowWidth(px) 锁定内容区宽度。
 */
export function useTabPageScroll() {
  const { navBarHeight } = useNavBar()
  const windowWidth = ref(uni.getWindowInfo().windowWidth)

  onShow(() => {
    windowWidth.value = uni.getWindowInfo().windowWidth
  })

  const scrollViewStyle = computed(() => ({
    position: 'fixed',
    left: 0,
    right: 0,
    top: `${navBarHeight}px`,
    bottom: `calc(${TAB_BAR_HEIGHT}px + env(safe-area-inset-bottom))`,
    width: `${windowWidth.value}px`,
    overflow: 'hidden',
  }))

  /** 直接作为 scroll-view 唯一子节点，锁死内容宽度 */
  const pageContentStyle = computed(() => ({
    width: `${windowWidth.value}px`,
    boxSizing: 'border-box',
  }))

  return { scrollViewStyle, pageContentStyle, TAB_BAR_HEIGHT }
}
