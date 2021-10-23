<template>
  <div class="flex-container">
    <!-- default cardbox with fallback header/media/content -->
    <MaterialCardBoxWithSlots />

    <!-- cardbox with passed slots header/media/content -->
    <MaterialCardBoxWithSlots>
      <template v-slot:header>
        <strong>Card Title</strong><br />
        <span>Card Sub-Title</span>
      </template>
      <template v-slot:media>
        <img src="https://via.placeholder.com/350x150" />
      </template>
      <p>Main Section</p>
      <template v-slot:action>
        <button>Action Button</button>
        <button>Action Button</button>
      </template>
    </MaterialCardBoxWithSlots>

    <!-- cardbox with passed props -->
    <MaterialCardBoxWithSlotsAndProps
      header="Material Card Header"
      sub-header="Card Sub Header"
      show-media
      show-actions
      img-src="https://picsum.photos/300/200"
      :main-text="`
        The path of the righteous man is beset on all sides by the iniquities
        of the selfish and the tyranny of evil men.`"
    >
      <!-- using # shorthand slot syntax instead of v-slot: -->
      <template #action>
        <button>Action Button</button>
        <button>Action Button</button>
      </template>
    </MaterialCardBoxWithSlotsAndProps>

    <!-- cardbox with passed props and functional component buttons-->
    <MaterialCardBoxWithSlotsAndProps
      header="Material Card Header"
      sub-header="Card Sub Header"
      show-media
      show-actions
      img-src="https://picsum.photos/300/200"
    >
      <!-- default slot content -->
      <p class="flex-container">
        <strong>Rate this place </strong>
        <StarRatingInput />
      </p>
      <p>
        The path of the righteous man is beset on all sides by the iniquities of
        the selfish and the tyranny of evil men.
      </p>
      <template #action>
        <div class="flex-container">
          <MaterialButton background-color="#027be3" text-color="#fff">
            Action 1
          </MaterialButton>
          <MaterialButton background-color="#26a69a" text-color="#fff" is-flat>
            Action 2
          </MaterialButton>
        </div>
      </template>
    </MaterialCardBoxWithSlotsAndProps>

    <MaterialCardBoxWithSlotsAndProps
      header="Material Card Header"
      sub-header="Card Sub Header"
      show-media
      show-actions
      img-src="https://picsum.photos/300/200"
    >
      <!-- default slot content -->
      <p>
        <StarRating ref="starRate" />
      </p>
      <p>
        The path of the righteous man is beset on all sides by the iniquities of
        the selfish and the tyranny of evil men.
      </p>
      <template #action>
        <div class="flex-container">
          <MaterialButton
            background-color="#027be3"
            text-color="#fff"
            @click="resetVote"
          >
            Reset
          </MaterialButton>
          <MaterialButton
            background-color="#26a69a"
            text-color="#fff"
            is-flat
            @click="forceVote"
          >
            Rate 5 Stars
          </MaterialButton>
        </div>
      </template>
    </MaterialCardBoxWithSlotsAndProps>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import MaterialCardBoxWithSlots from './components/MaterialCardBoxWithSlots.vue'
import MaterialCardBoxWithSlotsAndProps from './components/MaterialCardBoxWithSlotsAndProps.vue'
import MaterialButton from './components/MaterialButton.vue'
import StarRatingInput from './components/StarRatingInput.vue'

//normal loading of component
//import StarRating from './components/StarRating.vue'

//lazy-loading of component
const StarRating = defineAsyncComponent(
  () => import('./components/StarRating.vue')
)

/* Refs */
const starRate = ref(null)

/* Methods */
const resetVote = () => {
  //manipulate component's data by ref of component
  starRate.value.rank = 0
  starRate.value.voted = false
}

const forceVote = () => {
  //manipulate component's data by ref of component
  starRate.value.rank = 5
  starRate.value.voted = true
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
</style>
