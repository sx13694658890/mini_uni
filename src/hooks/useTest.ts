import { computed, ref } from 'vue'

export function useTest() {
  const number = ref(1)

  const doubleNumber = computed(() => number.value * 2)

  return {
    number,
    doubleNumber,
  }
}
