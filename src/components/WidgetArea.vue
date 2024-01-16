<template>
  <div class="widget bg-white border p-10 mb-4 shadow-md">
    <slot />

    <a class="block bg-blue-400 w-8 h-8 cursor-pointer">
      <font-awesome-icon :icon="['fas', 'up-right-and-down-left-from-center']" />
    </a>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>
