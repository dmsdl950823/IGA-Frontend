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
              <strong class="flex mt-3 text-5xl font-bold">18,204</strong>
          </WidgetArea>

          <WidgetArea>
              <WidgetTitle title="접속횟수"/>

              <SumTag title="SUM" tag="Total Event Count"/>
              <strong class="flex mt-3 text-5xl font-bold">18,204</strong>
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
import SumTag from '@/components/SumTag.vue'
import WidgetTitle from '@/components/WidgetTitle.vue'
import WidgetArea from '@/components/WidgetArea.vue'
</script>

<style lang="scss" scoped></style>
