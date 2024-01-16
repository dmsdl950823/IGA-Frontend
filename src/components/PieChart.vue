<template>
  <v-chart
    class="chart"
    :option="option"
    autoresize
  />
</template>

<script setup>

import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { ref, watchEffect } from 'vue'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

const props = defineProps({
  data: { type: Array, default: () => [] }
})

const rawData = ref([])
const legend = ref([])
const seriesPie = ref([])

const setData = ({ value: data = [] }) => {
  const colors = ['#0F4ABF', '#163E73', '#327AD9', '#CEDEF2', '#4BA4F2']
  const seriesData = []
  const legendData = []

  if (data.length === 0) return { seriesData, legendData }

  for (let i = 0; i < 5; i++) { // Top 5
    const item = data[i]
    const name = item['adbrix$event$abx:ref_host']
    const value = item.unique_view

    seriesData.push({ name, value, itemStyle: { color: colors[i] } })
    legendData.push(name)
  }

  return { seriesData, legendData }
}

watchEffect(() => {
  rawData.value = props.data
  const { seriesData, legendData } = setData(rawData)

  seriesPie.value = seriesData
  legend.value = legendData
})

const option = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'horizontal',
    align: 'auto',
    bottom: 'bottom',
    data: legend
    // data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines']
  },
  series: [
    {
      name: 'Traffic Sources',
      type: 'pie',
      radius: '60%',
      center: ['50%', '40%'],
      data: seriesPie,
      // data: [
      //   { value: 505, name: 'Direct', itemStyle: { color: '#0F4ABF' } },
      //   { value: 310, name: 'Email', itemStyle: { color: '#163E73' } },
      //   { value: 234, name: 'Ad Networks', itemStyle: { color: '#327AD9' } },
      //   { value: 135, name: 'Video Ads', itemStyle: { color: '#CEDEF2' } },
      //   { value: 1548, name: 'Search Engines', itemStyle: { color: '#4BA4F2' } }
      // ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
