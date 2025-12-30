<script lang="ts" setup>
import { useDictData } from './useDictData'

defineOptions({
  name: 'DictData',
})
const props = defineProps<{ code: string }>()
const { dictData, loading } = useDictData(() => props.code)
</script>

<template>
  <slot :dict-data="dictData" :loading="loading" />
</template>
