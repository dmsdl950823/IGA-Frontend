<template>
  <strong class="flex mt-3 text-5xl font-bold">{{ value }}</strong>

  <span :class="`flex items-center text-${type.color}-500 mt-4`">
    <font-awesome-icon :icon="['fas', type.icon]" />
    <span class="ml-2">{{ variance }}</span>
  </span>
</template>

<script setup>
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

const type = (props.varians < 0)
  ? { icon: 'arrow-down', color: 'blue' }
  : { icon: 'arrow-up', color: 'red' }

</script>

<style lang="scss" scoped>

</style>
