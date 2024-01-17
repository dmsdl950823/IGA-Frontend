<template>
  <WidgetArea
    :title="props.title"
    :editable="props.editable"
  >
    <TreeTable :tree-data="treeData" />
  </WidgetArea>
</template>

<script setup>
import { ref } from 'vue'

import WidgetArea from '@/components/WidgetArea.vue'
import TreeTable from '@/components/Grid/TreeTable.script.jsx'

import baseProps from '@/components/module/widgetprops'

const props = defineProps({
  ...baseProps
})

const treeData = ref([
  {
    label: 'Node 1',
    children: [
      { label: 'Node 1.1' },
      { label: 'Node 1.2' }
    ]
  },
  {
    label: 'Node 2',
    children: [
      { label: 'Node 2.1' },
      { label: 'Node 2.2' }
    ]
  }
])

</script>

<style scoped>

</style>
