<template>
  <div class="widget relative bg-white border p-10 mb-4">
    <WidgetTitle :title="title" />

    <slot />

    <a
      v-if="status"
      class="block absolute bottom-0 right-0 bg-blue-400 w-6 h-6 cursor-pointer"
    >
      <font-awesome-icon
        :icon="['fas', 'up-right-and-down-left-from-center']"
        class="text-white p-1"
      />
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import WidgetTitle from '@/components/WidgetTitle.vue'

const props = defineProps({
  title: {
    type: String,
    default: '-'
  },
  editable: Boolean
})

const status = computed(() => {
  return props.editable
})
</script>

<style scoped>
.widget {
  height: 100%;
}

</style>
