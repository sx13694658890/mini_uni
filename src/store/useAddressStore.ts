import type { IAddressItem } from '~/data/mine'
import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'
import { addresses as initialAddresses } from '~/data/mine'

function buildAddress(region: string[], detail: string) {
  return [region.filter(Boolean).join(' '), detail.trim()].filter(Boolean).join(' ')
}

export const useAddressStore = createGlobalState(() => {
  const items = ref<IAddressItem[]>([...initialAddresses])

  function getById(id: string) {
    return items.value.find(item => item.id === id)
  }

  function clearDefaultExcept(id?: string) {
    items.value.forEach((item) => {
      if (item.id !== id)
        item.isDefault = false
    })
  }

  function addAddress(payload: Omit<IAddressItem, 'id' | 'address'> & { address?: string }) {
    const region = payload.region ?? []
    const detail = payload.detail ?? ''
    const address = payload.address ?? buildAddress(region, detail)
    const id = `${Date.now()}`

    if (payload.isDefault)
      clearDefaultExcept()

    items.value.unshift({
      ...payload,
      id,
      region,
      detail,
      address,
    })

    return id
  }

  function updateAddress(id: string, payload: Partial<Omit<IAddressItem, 'id'>>) {
    const item = getById(id)
    if (!item)
      return

    Object.assign(item, payload)

    if (payload.region || payload.detail) {
      const region = payload.region ?? item.region ?? []
      const detail = payload.detail ?? item.detail ?? ''
      item.address = buildAddress(region, detail)
    }

    if (payload.isDefault)
      clearDefaultExcept(id)
  }

  function removeAddress(id: string) {
    items.value = items.value.filter(item => item.id !== id)
  }

  return {
    items,
    getById,
    addAddress,
    updateAddress,
    removeAddress,
  }
})
