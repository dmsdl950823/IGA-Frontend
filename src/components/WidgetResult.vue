<template>
  <strong class="flex mt-3 text-5xl font-bold">{{ displayValue }}</strong>

  <span :class="`flex items-center text-${type.color}-500 mt-4`">
    <font-awesome-icon :icon="['fas', type.icon]" />
    <span class="ml-2">{{ displayVariance }}</span>
  </span>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
const props = defineProps({
  value: {
    type: Number,
    default: 0
  },
  variance: {
    type: Number,
    default: 0
  }
})

const displayValue = ref(props.value)
const displayVariance = ref(props.variance)
const type = ref({ icon: 'arrow-down', color: 'blue' })

watchEffect(() => {
  displayValue.value = props.value.toLocaleString()
  displayVariance.value = props.variance.toLocaleString()
  type.value = (props.variance < 0)
    ? { icon: 'arrow-down', color: 'blue' }
    : { icon: 'arrow-up', color: 'red' }
})
</script>

<style lang="scss" scoped>

</style>
