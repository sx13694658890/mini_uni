export function useNavBar() {
  const windowInfo = typeof uni.getWindowInfo === 'function'
    ? uni.getWindowInfo()
    : uni.getSystemInfoSync()
  const menuButton = uni.getMenuButtonBoundingClientRect()

  const statusBarHeight = windowInfo.statusBarHeight || menuButton.top || 0
  const navContentGap = Math.max(menuButton.top - statusBarHeight, 0)
  const navBarHeight = menuButton.bottom + navContentGap

  // 左右留白取较大值，保证标题相对屏幕水平居中
  const sideWidth = Math.max(
    menuButton.left,
    windowInfo.windowWidth - menuButton.right,
  )

  return {
    statusBarHeight,
    navBarHeight,
    navContentGap,
    menuButton,
    sideWidth,
  }
}
