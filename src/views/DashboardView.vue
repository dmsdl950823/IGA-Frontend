<template>
  <div class="bg-gray-100">
    <!-- Navigation -->
    <HeaderArea
      @change="change"
      @save="saveLayoutPosition"
      @cancel="cancelLayoutPosition"
    />

    <!-- Dashboard Main Content -->
    <main class="container mx-auto mt-8">
      <GridLayout
        v-model:layout="layout"
        :col-num="10"
        :row-height="70"
        :is-draggable="editable"
        :is-resizable="editable"
        :margin="[20, 20]"
        vertical-compact
        use-css-transforms
        @layout-updated="layoutUpdated"
      >
        <GridItem
          v-for="item in layout"
          :key="item.i"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :class="['vue-grid-item', { '-disabled': editable }, 'shadow-md']"
        >
          <!-- {{ item.i }} -->
          <component
            v-bind="item.props"
            :is="item.component"
            :editable="editable"
          />

          <!-- @resize="handleResize" -->
        </GridItem>
      </GridLayout>
    </main>
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'
import { GridLayout, GridItem } from 'grid-layout-plus'

import HeaderArea from '@/components/HeaderArea.vue'
import UnitCountWidget from '@/components/widgets/UnitCountWidget.vue'
import DAUWidget from '@/components/widgets/DAUWidget.vue'
import TopReferralWidget from '@/components/widgets/TopReferralWidget.vue'
import TopReferralGrid from '@/components/widgets/TopReferralGrid.vue'

import { dataFormatter, sorting, dataGrouper } from '@/components/module/dataformat'
import { setLayout } from '@/components/module/layout'

import API from '@/apis'

// =======

const editable = ref(false) // 편집중 여부

// layout default 값 정의
const layout = ref([])
const tempLayout = ref([])

const layoutUpdated = (updatedLayout) => {
  // 레이아웃 업데이트 시 호출되는 메소드
  console.log('Layout Updated:', updatedLayout)
  console.log('Layout:', layout.value)
}

const change = (e) => {
  editable.value = e.value
  tempLayout.value = layout.value.map(({ component, ...item }) => item) // 현재 위치 정보 상태를 저장하는 임시 배열
}

/**
 * json 데이터 fetching
 */
const getEvent1 = async () => {
  try {
    const { data } = await API.event1()
    const rawData = dataFormatter(data)

    const sorted = sorting(rawData, 'daily', 'asc')
    return sorted
  } catch (error) {
    console.error('@@ getEvent1 > ', error)
    return []
  }
}

const getEvent3 = async () => {
  try {
    const { data } = await API.event3()
    const rawData = dataFormatter(data)

    const chart = []
    let sum = 0 // Top 5 외 나머지들은 모두 etc 합산

    const sorted = sorting(rawData, 'unique_view', 'desc')

    for (let i = 0; i < rawData.length; i++) {
      const item = sorted[i]

      if (i < 4) chart.push({ ...item, unique_view: Number(item.unique_view) })
      else sum += Number(item.unique_view)
    }

    chart.push({ 'adbrix$event$abx:ref_host': 'etc', unique_view: sum })
    return chart
  } catch (error) {
    console.error('@@ getEvent3 > ', error)
    return []
  }
}

const getEvent4 = async () => {
  try {
    const { data } = await API.event4()
    const rawData = dataFormatter(data)
    const grouper = dataGrouper(rawData, { codes: ['ip_country', 'ip_region', 'ip_city'], value: 'unique_view' })

    return grouper
  } catch (error) {
    console.error('@@ getEvent1 > ', error)
    return []
  }
}

// 위치 편집 저장 : 저장은 현재 그대로 그냥 저장하면 됨
const saveLayoutPosition = () => {
  const position = layout.value.map(({ component, ...item }) => item)
  localStorage.setItem('layout', JSON.stringify(position))
  editable.value = false
}

// 위치 편집 취소 : 기존의 layout 을 다시 복구
const cancelLayoutPosition = () => {
  const components = {}
  for (const item of layout.value) {
    components[item.i] = item.component
  }

  // 기존의 컴포넌트는 그대로 상태를 유지해야하므로 keep
  const result = []
  for (let i = 0; i < tempLayout.value.length; i++) {
    const item = tempLayout.value[i]
    result.push({ ...item, component: components[i] })
  }

  layout.value = result
  tempLayout.value = []

  editable.value = false
}

/**
 * init 함수
 */
const init = async () => {
  const data1 = await getEvent1()
  const data3 = await getEvent3()
  const data4 = await getEvent4()

  const unique = { value: 0, variance: 0 } // 접속 유저의 총합
  const event = { value: 0, variance: 0 } // 접속 횟수의 총합

  for (const item of data1) {
    unique.value += Number(item.unique_view)
    event.value += Number(item.page_view)
  }

  // 어제 vs 오늘 접속 유저 비교
  const yesterday = data1[data1.length - 1]
  const today = data1[data1.length - 2]

  unique.variance = Number(yesterday.unique_view) - Number(today.unique_view)
  event.variance = Number(yesterday.page_view) - Number(today.page_view)

  // 최종 결과 값 저장
  // 차트
  const components = {
    unit_widget1: { component: markRaw(UnitCountWidget), props: { value: unique.value, variance: unique.variance } },
    unit_widget2: { component: markRaw(UnitCountWidget), props: { value: event.value, variance: event.variance } },
    dau_widget: { component: markRaw(DAUWidget), props: { data: data1 } },
    pie_widget: { component: markRaw(TopReferralWidget), props: { data: data3 } },
    grid_widget: { component: markRaw(TopReferralGrid), props: { data: data4 } }
  }
  // console.log(setLayout(components), '--')

  layout.value = setLayout(components)
}

init()

</script>

<style scoped>

/* 위젯 스타일을 추가할 수 있습니다. */
.vue-grid-item {
  overflow: hidden;
  position: relative;
}
/*.vue-grid-item.-disabled::after {
  content: '';
  display: block;
  position: absolute;
  top: 0; right: 0; left: 0; bottom: 0;
  background-color: #d9d9d9;
  opacity: 0.2;
}*/

/* .vue-grid-item::deep .vgl-item__resizer {
  border: 1px solid blue;
  width: 20px;
  height: 20px;
}
.vue-grid-item::deep .vgl-item__resizer:before {
  inset: 0 0 0 0;
} */
</style>
