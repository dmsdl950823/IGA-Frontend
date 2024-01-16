<template>
  <WidgetArea
    :title="props.title"
    :editable="props.editable"
  >
    <BarChart :data="[]" />
  </WidgetArea>
</template>

<script setup>
import WidgetArea from '@/components/WidgetArea.vue'
import BarChart from '@/components/BarChart.vue'

import baseProps from '@/components/module/widgetprops'

const props = defineProps({
  ...baseProps
})
</script>

<style scoped>

</style>
