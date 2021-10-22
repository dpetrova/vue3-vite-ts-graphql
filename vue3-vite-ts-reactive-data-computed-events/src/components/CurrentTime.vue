<template>
  <div class="cardBox">
    <div class="container">
      <h2>Today is:</h2>
      <h3>{{ time }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUnmount } from 'vue'

const interval = ref(0)
const time = ref('')

const setDateTime = () => {
  // use the navigator global variable to get the local format
  const browserLocale =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language

  // use the native Intl.DateTimeFormat function to format and parse dates to declared locations
  const intlDateTime = new Intl.DateTimeFormat(browserLocale, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })

  time.value = intlDateTime.format(new Date())
}

onBeforeMount(() => {
  interval.value = setInterval(setDateTime, 1000)
})

onBeforeUnmount(() => {
  clearInterval(interval.value)
})
</script>

<style scoped></style>
