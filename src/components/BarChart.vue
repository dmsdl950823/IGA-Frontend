<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide } from 'vue'

use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])

// provide(THEME_KEY, 'dark')

const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  legend: {
    align: 'auto',
    bottom: 'bottom',
    data: ['Temperature', 'Evaporation']
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      // name: 'Precipitation',
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: '{value}k'
      }
    },
    {
      type: 'value',
      // name: 'TTT',
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        formatter: '{value}'
      }
    }
  ],
  series: [
    {
      name: 'Evaporation',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' ml'
        }
      },
      itemStyle: { color: '#4BA4F2' },
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: 'Temperature',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + ' °C'
        }
      },
      itemStyle: { color: '#0F4ABF' },
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ],

  grid: {
    left: '5%', // 왼쪽 패딩 (기본값: '10%')
    right: '5%', // 오른쪽 패딩 (기본값: '10%')
    top: '10%', // 위쪽 패딩 (기본값: '60')
    bottom: '18%' // 아래쪽 패딩 (기본값: '40')
  }

  // dataZoom: [
  //   {
  //     type: 'slider', // 슬라이더 형태로 표시
  //     start: 0, // 기본 표시 범위의 시작 인덱스
  //     end: 100 // 기본 표시 범위의 끝 인덱스
  //   },
  //   {
  //     type: 'inside', // 차트 영역 안에서 스크롤 가능
  //     start: 0,
  //     end: 100
  //   }
  // ]
})
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
