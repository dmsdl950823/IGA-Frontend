<template>
  <header class="flex items-center justify-between bg-blue-500 p-4">
    <nav class="flex items-center justify-between bg-blue-500 p-4">
      <a
        class="text-white"
        href="#"
      >Dashboard</a>
    </nav>

    <div
      v-if="!editable"
      class="flex items-center gap-2"
    >
      <button
        class="bg-blue-400 hover:bg-blue-600 px-4 py-2 rounded-md text-white"
        @click="event"
      >
        편집
      </button>
    </div>
    <div
      v-else
      class="flex items-center gap-2"
    >
      <button
        class="bg-blue-400 hover:bg-blue-600 px-4 py-2 rounded-md text-white"
        @click="cancel"
      >
        편집취소
      </button>
      <button
        class="bg-blue-400 hover:bg-blue-600 px-4 py-2 rounded-md text-white"
        @click="save"
      >
        편집완료
      </button>
    </div>
  </header>
</template>

<script setup>

import { ref } from 'vue'

const emit = defineEmits(['change', 'save', 'cancel'])
const editable = ref(false)

const event = e => {
  editable.value = !editable.value
  emit('change', editable)
}

const save = e => {
  editable.value = !editable.value
  emit('save', true)
}

const cancel = e => {
  editable.value = !editable.value
  emit('cancel', false)
}

</script>

<style lang="scss" scoped>

</style>
