<template>
  <WidgetArea
    :title="props.title"
    :editable="props.editable"
  >
    <PieChart :data="[]" />
  </WidgetArea>
</template>

<script setup>
import WidgetArea from '@/components/WidgetArea.vue'
import PieChart from '@/components/PieChart.vue'

import baseProps from '@/components/module/widgetprops'

const props = defineProps({
  ...baseProps
})
</script>

<style scoped>

</style>
