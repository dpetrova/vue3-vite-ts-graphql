<template>
  <div class="starRating">
    <ul>
      <li v-for="rate in maxRating" :key="rate">
        <i class="material-icons">
          {{ getStarName(rate) }}
        </i>
      </li>
    </ul>
    <span class="rating">
      {{ rating }}
    </span>
    <span v-if="votes" class="votes"> ({{ votes }}) </span>
  </div>
</template>

<script setup lang="ts">
import { inject, watch } from 'vue'
import useGetStarName from '../composables/useGetStarName' //use a composable

/* PROPS */
const props = defineProps({
  maxRating: {
    type: Number,
    required: false,
    default: 5,
  },
  rating: {
    type: Number,
    required: false,
    default: 0,
  },
  votes: {
    type: Number,
    required: false,
    default: 0,
  },
})

/* METHODS */
// const getStarName = (rate: number) => {
//   if (rate <= props.rating) {
//     return 'star'
//   }
//   if (Math.fround(rate - props.rating) < 1) {
//     return 'star_half'
//   }
//   return 'star_border'
// }

//use getStarName as a composable
const { getStarName } = useGetStarName(props.rating)

/* INJECT */
//Inject provided data from parent
//The inject function takes two parameters: name of the property to inject; a default value (Optional)
const injectedStarRating = inject(
  'starRating',
  console.log('StarRatingDisplay need to be a child of StarRating')
)
console.log('injectedStarRating from parent:', injectedStarRating.value)

/* WATCH */
watch(
  injectedStarRating, //not a function but an observable
  (newVal, oldVal) => {
    console.log(
      `new_injectedStarRating: ${newVal}, old_injectedStarRating: ${oldVal}`
    )
  }
)
</script>

<style scoped lang="scss">
@import '../assets/styles/starRating.scss';

.rating,
.votes {
  display: inline-block;
  color: rgba(0, 0, 0, 0.65);
  font-size: 0.75rem;
  margin-left: 0.4rem;
}
</style>
