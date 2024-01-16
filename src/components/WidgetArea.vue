<template>
  <div class="widget relative bg-white border p-10 mb-4 shadow-md">
    <slot />

    <a class="block absolute bottom-0 right-0 bg-blue-400 w-6 h-6 cursor-pointer">
      <font-awesome-icon :icon="['fas', 'up-right-and-down-left-from-center']" class="text-white p-1"/>
    </a>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>
