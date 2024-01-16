<template>
  <v-chart class="chart" :option="option" autoresize />
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
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide } from 'vue'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

// provide(THEME_KEY, 'dark')

const option = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'horizontal',
    align: 'auto',
    bottom: 'bottom',
    data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines']
  },
  series: [
    {
      name: 'Traffic Sources',
      type: 'pie',
      radius: '60%',
      center: ['50%', '50%'],
      data: [
        { value: 505, name: 'Direct', itemStyle: { color: '#0F4ABF' } },
        { value: 310, name: 'Email', itemStyle: { color: '#163E73' } },
        { value: 234, name: 'Ad Networks', itemStyle: { color: '#327AD9' } },
        { value: 135, name: 'Video Ads', itemStyle: { color: '#CEDEF2' } },
        { value: 1548, name: 'Search Engines', itemStyle: { color: '#4BA4F2' } }
      ],
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
