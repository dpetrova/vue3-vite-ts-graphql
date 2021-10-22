<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <CurrentTime class="col-2" />
  <TaskInput @add-task="addNewTask" class="col-8" />
  <div class="col-12">
    <div class="cardBox">
      <div class="container">
        <h2>My Tasks</h2>
        <hr />
        <div class="col-4">
          <input
            v-model="hideDone"
            type="checkbox"
            id="hideDone"
            name="hideDone"
          />
          <label for="hideDone"> Hide Done Tasks </label>
        </div>
        <div class="col-4">
          <input
            v-model="reverse"
            type="checkbox"
            id="reverse"
            name="reverse"
          />
          <label for="reverse"> Reverse Order </label>
        </div>
        <div class="col-4">
          <input
            v-model="sortById"
            type="checkbox"
            id="sortById"
            name="sortById"
          />
          <label for="sortById"> Sort By Id </label>
        </div>
        <ul class="taskList">
          <li
            v-for="(taskItem, index) in displayTaskList"
            :key="`${index}_${Math.random()}`"
            :class="!!taskItem.finishedAt ? 'taskDone' : ''"
          >
            <input
              type="checkbox"
              :checked="!!taskItem.finishedAt"
              @input="changeStatus(taskItem.id)"
            />
            #{{ taskItem.id }} - {{ taskItem.task }}
            <span v-if="taskItem.finishedAt">
              | Done at:
              {{ formatDate(taskItem.finishedAt) }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import CurrentTime from './components/CurrentTime.vue'
import TaskInput from './components/TaskInput.vue'
import { ref, reactive, computed, watch } from 'vue'
import { Ref, Task } from './types'

/* REACTIVE DATA */
//const taskList: Ref<Task[]> = ref([])
const taskList = ref<Task[]>([])
const hideDone = ref(false)
const reverse = ref(false)
const sortById = ref(false)

/* COMPUTED PROPERTIES */
//when using the computed property to pass a value to the template, this value is now cached
//this means we will only trigger the rendering process when the value is updated
//and won't rerendering the DOM tree for changes that have no effect on the data being displayed
const baseTaskList = computed(() => {
  return [...taskList.value].map((task, index) => ({
    ...task,
    id: index + 1,
  }))
})

const filteredTaskList = computed(() => {
  return hideDone.value
    ? [...baseTaskList.value].filter((task) => !task.finishedAt)
    : [...baseTaskList.value]
})

const sortedTaskList = computed(() => {
  return [...filteredTaskList.value].sort((a, b) =>
    sortById.value ? b.id - a.id : (a.finishedAt || 0) - (b.finishedAt || 0)
  )
})

const displayTaskList = computed(() => {
  const list = [...sortedTaskList.value]
  return reverse.value ? list.reverse() : list
})

/* METHODS */
const addNewTask = (task: string) => {
  taskList.value.push({
    task,
    createdAt: Date.now(),
    finishedAt: undefined,
  })
}

const changeStatus = (taskId: number) => {
  const task = taskList.value[taskId - 1]
  if (task.finishedAt) {
    task.finishedAt = undefined
  } else {
    task.finishedAt = Date.now()
  }
}

const formatDate = (value: number | string | undefined) => {
  if (!value) return ''
  if (typeof value !== 'number') return value
  const browserLocale =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language
  const intlDateTime = new Intl.DateTimeFormat(browserLocale, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
  return intlDateTime.format(new Date(value))
}
</script>

<style lang="scss">
@keyframes colorChange {
  from {
    background-color: inherit;
  }
  to {
    background-color: rgba(0, 160, 24, 0.577);
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.taskList {
  li {
    list-style: none;
    text-align: left;
    padding: 5px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }
  li:last-child {
    border-bottom: 0px;
  }
  li:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.05);
  }
  li.taskDone {
    animation: colorChange 1s ease;
    background-color: rgba(106, 240, 126, 0.577);
  }
}
</style>
