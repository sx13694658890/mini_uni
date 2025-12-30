function withQueryParams<T extends Record<string, any> = Record<string, any>>(query: T) {
  return Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&')
}

export function navigateTo<T extends Record<string, any> = Record<string, any>>(url: NavigateToOptions['url'], query?: T) {
  if (query) {
    url += `?${withQueryParams(query)}`
  }
  uni.navigateTo({
    url,
  })
}

export function switchTab(url: NavigateToOptions['url']) {
  uni.switchTab({
    url,
  })
}
export function navigateBack() {
  uni.navigateBack({
    delta: 1,
  })
}
