<template>
  <WidgetArea
    :title="props.title"
    :editable="props.editable"
  >
    데이터 대기중
  </WidgetArea>
</template>

<script setup>
import WidgetArea from '@/components/WidgetArea.vue'

import baseProps from '@/components/module/widgetprops'

const props = defineProps({
  ...baseProps
})
</script>

<style scoped>

</style>
