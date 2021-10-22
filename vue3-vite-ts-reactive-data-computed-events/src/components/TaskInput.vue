<template>
  <div class="cardBox">
    <div class="container tasker">
      <strong>My task is:</strong>
      <!-- using v-model directive sugar syntax -->
      <input type="text" v-model="task" class="taskInput" />

      <!-- use the base syntax behind v-model-->
      <!-- <input
        type="text"
        :value="task"
        @input="task = ($event.target as HTMLInputElement).value"
        class="taskInput"
      /> -->
      <button v-on:click="addTask">Add Task</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

//const emit = defineEmits(['update:modelValue', 'submit', 'change', 'add-task']);
const emit = defineEmits<{
  (e: 'input', value: string): void
  (e: 'change', id: number): void
  (e: 'update', value: string): void
  (e: 'add-task', value: string): void
}>()

const task = ref('')

const addTask = () => {
  emit('add-task', task.value)
  task.value = ''
}
</script>

<style scoped lang="scss">
.tasker {
  margin: 20px;
  .taskInput {
    font-size: 14px;
    margin: 0 10px;
    border: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.75);
  }
  button {
    border: 1px solid rgba(0, 0, 0, 0.75);
    border-radius: 3px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  }
}
</style>
