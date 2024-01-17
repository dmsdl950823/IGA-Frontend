<template>
  <WidgetArea
    :title="props.title"
    :editable="props.editable"
  >
    <TreeTable :tree-data="props.data" />
  </WidgetArea>
</template>

<script setup>
import WidgetArea from '@/components/WidgetArea.vue'
import TreeTable from '@/components/Grid/TreeTable.script.jsx'

import baseProps from '@/components/module/widgetprops'

const props = defineProps({
  ...baseProps
})

</script>

<style scoped>

</style>
