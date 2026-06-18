import type { IProduct } from '~/data/ocean'
import { createGlobalState } from '@vueuse/core'
import { computed, ref } from 'vue'
import { cartProducts } from '~/data/ocean'

export interface ICartItem {
  product: IProduct
  quantity: number
}

export const useCartStore = createGlobalState(() => {
  const items = ref<ICartItem[]>(
    cartProducts.map((product, index) => ({
      product,
      quantity: index === 2 ? 6 : 1,
    })),
  )

  const deliveryFee = 0
  const count = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  )
  const total = computed(() => subtotal.value + deliveryFee)

  function addItem(product: IProduct) {
    const existing = items.value.find(item => item.product.id === product.id)
    if (existing) {
      existing.quantity += 1
      return
    }
    items.value.push({ product, quantity: 1 })
  }

  function removeItem(productId: string) {
    items.value = items.value.filter(item => item.product.id !== productId)
  }

  function updateQuantity(productId: string, quantity: number) {
    const item = items.value.find(i => i.product.id === productId)
    if (!item)
      return
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    item.quantity = quantity
  }

  return {
    items,
    count,
    subtotal,
    total,
    deliveryFee,
    addItem,
    removeItem,
    updateQuantity,
  }
})
