<template>
  <span clas="flex">
    <span class="bg-gray-200 px-2 py-1 rounded text-gray-500 text-xs"> {{ props.title }} </span>
    <span class="mx-2 text-gray-400"> {{ props.tag }} </span>
  </span>
</template>

<script setup>
const props = defineProps({
  title: String,
  tag: String
})
</script>

<style lang="scss" scoped>

</style>
