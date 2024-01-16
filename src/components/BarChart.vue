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
import VChart from 'vue-echarts'
import { ref, watchEffect } from 'vue'

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

const props = defineProps({
  data: Array
})

// console.log(props, 'gg')
const rawData = ref([])
const xAxis = ref([])
const seriesBar = ref([])
const seriesLine = ref([])

/**
 * bar/line 동시 데이터 정의
 * @param {Object} rawData
 */
const setData = ({ value: data }) => {
  const xAxisData = [] // xAxis
  const barData = [] // bar data
  const lineData = [] // line data

  for (const item of data) {
    const date = item.daily.value
    const bar = item.page_view.value
    const line = item.unique_view.value

    xAxisData.push(date)
    barData.push(bar)
    lineData.push(line)
  }

  return { xAxisData, barData, lineData }
}

watchEffect(() => {
  rawData.value = props.data
  const { xAxisData, barData, lineData } = setData(rawData)

  xAxis.value = xAxisData
  seriesBar.value = barData
  seriesLine.value = lineData

  console.log()
})

// 차트 option 설정
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
    data: ['Unique Event Count', 'Total Event Count']
  },
  xAxis: [
    {
      type: 'category',
      data: xAxis, // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      // 좌측 차트 내용
      type: 'value',
      min: 0,
      interval: 3000,
      axisLabel: {
        formatter: function (value) {
          if (value >= 1000) return (value / 1000).toFixed(0) + 'k'
          else return value
          // return '{value}k'
        }
      }
    },
    {
      // 우측 차트 내용
      type: 'value',
      min: 0,
      // max: 25,
      interval: 100,
      axisLabel: { formatter: '{value}' }
    }
  ],
  series: [
    {
      name: 'Total Event Count',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value
        }
      },
      itemStyle: { color: '#4BA4F2' },
      // data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
      data: seriesBar
    },
    {
      name: 'Unique Event Count',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value
        }
      },
      itemStyle: { color: '#0F4ABF' },
      data: seriesLine
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
