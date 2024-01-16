<template>
  <WidgetArea
    :title="props.title"
    :editable="props.editable"
  >
    <SumTag
      title="SUM"
      :tag="props.tag"
    />
    <WidgetResult
      :value="200"
      :variance="200"
    />
  </WidgetArea>
</template>

<script setup>
import SumTag from '@/components/SumTag.vue'
import WidgetArea from '@/components/WidgetArea.vue'
import WidgetResult from '@/components/WidgetResult.vue'

import baseProps from '@/components/module/widgetprops'

const props = defineProps({
  ...baseProps
})
</script>

<style scoped>

</style>
