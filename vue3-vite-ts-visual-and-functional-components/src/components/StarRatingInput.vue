<template>
  <div class="starRating">
    <span class="rateThis">
      <slot />
    </span>
    <ul>
      <li
        v-for="rate in maxRating"
        :key="rate"
        @mouseenter="updateRating(rate)"
        @click="emitFinalVote(rate)"
        @focus="updateRating(rate)"
      >
        <i class="material-icons">
          {{ getStarName(rate) }}
        </i>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import useGetStarName from '../composables/useGetStarName' //use a composable

/* EMITS */
const emit = defineEmits<{
  (e: 'final-vote', value: number): void
}>()

/* PROPS */
const props = defineProps({
  maxRating: {
    type: Number,
    required: false,
    default: 5,
  },
})

/* REACTIVE DATA */
const rating = ref(0)

/* METHODS */
const updateRating = (value: number) => {
  rating.value = value
}

const emitFinalVote = (value: number) => {
  updateRating(value)
  emit('final-vote', rating.value)
}

// const getStarName = (rate: number) => {
//   if (rate <= rating.value) {
//     return 'star'
//   }
//   if (Math.fround(rate - rating.value) < 1) {
//     return 'star_half'
//   }
//   return 'star_border'
// }

//use getStarName as a composable
const { getStarName } = useGetStarName(rating)

/* INJECT */
//Inject provided data from parent
//The inject function takes two parameters: name of the property to inject; a default value (Optional)
const injectedStarRating = inject(
  'starRating',
  console.log('StarRatingInput need to be a child of StarRating')
)
</script>

<style scoped lang="scss">
@import '../assets/styles/starRating.scss';
.starRating {
  justify-content: space-between;
}
.starRating * {
  line-height: 1.7rem;
}
.starRating .material-icons {
  font-size: 1.6rem !important;
}
.rateThis {
  display: inline-block;
  color: rgba(0, 0, 0, 0.65);
  font-size: 1rem;
}
</style>
