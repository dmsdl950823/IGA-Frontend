<template>
  <div class="bg-gray-100">
    <!-- Navigation -->
    <header class="flex items-center justify-between bg-blue-500 p-4">
      <nav class="flex items-center justify-between bg-blue-500 p-4">
        <a class="text-white" href="#">Dashboard</a>

      </nav>

      <div class="flex items-center gap-2" v-if="!editable">
        <button class="bg-blue-400 hover:bg-blue-600 px-4 py-2 rounded-md text-white" @click="editable = !editable">편집</button>
      </div>
      <div class="flex items-center gap-2" v-else>
        <button class="bg-blue-400 hover:bg-blue-600 px-4 py-2 rounded-md text-white" @click="editable = !editable">편집취소</button>
        <button class="bg-blue-400 hover:bg-blue-600 px-4 py-2 rounded-md text-white" @click="editable = !editable">편집완료</button>
      </div>
    </header>

    <!-- Dashboard Main Content -->
    <main class="container mx-auto mt-8">

      <!-- Top Widgets -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <WidgetArea :editable="editable">
            <WidgetTitle title="접속유저"/>

            <SumTag title="SUM" tag="Unique Event Count"/>
            <WidgetResult :value="totalUnique.value" :variance="totalUnique.diff"/>
          </WidgetArea>

          <WidgetArea :editable="editable">
              <WidgetTitle title="접속횟수"/>

              <SumTag title="SUM" tag="Total Event Count"/>
              <WidgetResult :value="totalEvent.value" :variance="totalEvent.diff"/>
          </WidgetArea>
      </div>

      <!-- Middle Widget -->
      <WidgetArea :editable="editable">
        <WidgetTitle title="DAU"/>
        <BarChart :data="rawData1"/>
      </WidgetArea>

      <!-- Bottom Widgets -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <WidgetArea :editable="editable">
          <WidgetTitle title="Top Referral"/>
          <PieChart :data="rawData2"/>
        </WidgetArea>

        <WidgetArea :editable="editable">
          <WidgetTitle title="Top Referral"/>
        </WidgetArea>
      </div>

  </main>

  </div>
</template>

<script setup>
import { ref } from 'vue'

import SumTag from '@/components/SumTag.vue'
import WidgetTitle from '@/components/WidgetTitle.vue'
import WidgetArea from '@/components/WidgetArea.vue'
import WidgetResult from '@/components/WidgetResult.vue'
import PieChart from '@/components/PieChart.vue'
import BarChart from '@/components/BarChart.vue'

import { dataFormatter, sorting } from '@/components/module/dataformat'

import API from '@/apis'

const rawData1 = ref([])
const rawData2 = ref([])

const totalUnique = ref({}) // 접속유저
const totalEvent = ref({}) // 접속횟수

const editable = ref(false)

/**
 * json 데이터 fetching
 */
const getEvent1 = async () => {
  const { data } = await API.event1()

  const { headers, rows } = data

  // 날짜별로 sorting ...
  rows.sort((a, b) => {
    if (a[0] < b[0]) return -1
    else if (a[0] > b[0]) return 1
    return 0
  })

  // console.log(rows)

  const chart = rows.map(row => {
    const item = {}

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]
      const value = row[i]
      // const key = header.key.split('_')

      item[header.key] = {
        ...header,
        // propertyType: header.property_type, // camel case 전환
        // valueType: header.value_type,
        value
      }
    }

    return item
  })

  // console.log(chart)
  return chart
}

const getEvent3 = async () => {
  const { data } = await API.event3()
  const rawData = dataFormatter(data)

  const chart = []
  let sum = 0 // Top 5 외 나머지들은 모두 합산

  const sorted = sorting(rawData, 'unique_view', 'desc')

  for (let i = 0; i < rawData.length; i++) {
    const item = sorted[i]

    if (i < 4) chart.push({ ...item, unique_view: Number(item.unique_view) })
    else sum += Number(item.unique_view)
  }

  chart.push({ 'adbrix$event$abx:ref_host': 'etc', unique_view: sum })
  return chart
}

/**
 * init 함수
 */
const init = async () => {
  const data1 = await getEvent1()
  const data3 = await getEvent3()

  const unique = { value: 0, diff: 0 } // 접속 유저의 총합
  const event = { value: 0, diff: 0 } // 접속 횟수의 총합

  for (const item of data1) {
    unique.value += Number(item.unique_view.value)
    event.value += Number(item.page_view.value)
  }

  // console.log(unique)
  // console.log(event)

  // 어제 vs 오늘 접속 유저 비교
  const yesterday = data1[data1.length - 1]
  const today = data1[data1.length - 2]

  unique.diff = Number(yesterday.unique_view.value) - Number(today.unique_view.value)
  event.diff = Number(yesterday.page_view.value) - Number(today.page_view.value)

  // 최종 결과 값 저장
  totalUnique.value = unique
  totalEvent.value = event

  rawData1.value = data1
  rawData2.value = data3
}

init()

</script>

<style lang="scss" scoped></style>
