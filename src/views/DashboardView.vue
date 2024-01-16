<template>
  <div class="bg-gray-100">
     <!-- Navigation -->
     <nav class="bg-blue-500 p-4">
      <a class="text-white" href="#">Dashboard</a>
    </nav>

    <!-- Dashboard Main Content -->
    <main class="container mx-auto mt-8">

      <!-- Top Widgets -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <WidgetArea>
            <WidgetTitle title="접속유저"/>

            <SumTag title="SUM" tag="Unique Event Count"/>
            <WidgetResult :value="totalUnique.value" :variance="totalUnique.diff"/>
          </WidgetArea>

          <WidgetArea>
              <WidgetTitle title="접속횟수"/>

              <SumTag title="SUM" tag="Total Event Count"/>
              <WidgetResult :value="totalEvent.value" :variance="totalEvent.diff"/>
          </WidgetArea>
      </div>

      <!-- Middle Widget -->
      <WidgetArea>
          <WidgetTitle title="DAU"/>
      </WidgetArea>

      <!-- Bottom Widgets -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <WidgetArea>
            <WidgetTitle title="Top Referral"/>
          </WidgetArea>

          <WidgetArea>
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

import API from '@/apis'

const totalUnique = ref({}) // 접속유저
const totalEvent = ref({}) // 접속횟수

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

/**
 * init 함수
 */
const init = async () => {
  const data = await getEvent1()
  // console.log(data)

  const unique = { value: 0, diff: 0 } // 접속 유저의 총합
  const event = { value: 0, diff: 0 } // 접속 횟수의 총합

  for (const item of data) {
    unique.value += Number(item.unique_view.value)
    event.value += Number(item.page_view.value)
  }

  // console.log(unique)
  // console.log(event)

  // 어제 vs 오늘 접속 유저 비교
  const yesterday = data[data.length - 1]
  const today = data[data.length - 2]

  unique.diff = Number(yesterday.unique_view.value) - Number(today.unique_view.value)
  event.diff = Number(yesterday.page_view.value) - Number(today.page_view.value)

  // 최종 결과 값 저장
  totalUnique.value = unique
  totalEvent.value = event
}

init()

</script>

<style lang="scss" scoped></style>
