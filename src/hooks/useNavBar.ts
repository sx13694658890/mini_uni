function getMenuButtonInfo(
  windowInfo: UniApp.GetWindowInfoResult | UniApp.GetSystemInfoResult,
) {
  if (typeof uni.getMenuButtonBoundingClientRect === 'function') {
    try {
      return uni.getMenuButtonBoundingClientRect()
    }
    catch {
      // H5 等非微信平台可能无此 API
    }
  }

  const statusBarHeight = windowInfo.statusBarHeight ?? 20
  const height = 32
  const navContentGap = 4
  const top = statusBarHeight + navContentGap
  const windowWidth = windowInfo.windowWidth ?? 375
  const sidePadding = 16

  return {
    width: 88,
    height,
    top,
    right: windowWidth - sidePadding,
    bottom: top + height,
    left: sidePadding,
  }
}

export function useNavBar() {
  const windowInfo = typeof uni.getWindowInfo === 'function'
    ? uni.getWindowInfo()
    : uni.getSystemInfoSync()
  const menuButton = getMenuButtonInfo(windowInfo)

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
