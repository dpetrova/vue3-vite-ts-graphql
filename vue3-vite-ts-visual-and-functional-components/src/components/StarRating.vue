<template>
  <!-- using v-if-else to switch between different components -->
  <!-- <div>
    <StarRatingInput v-if="!voted" :max-rating="maxRating" @final-vote="vote">
      Rate this Place
    </StarRatingInput>
    <StarRatingDisplay
      v-else
      :max-rating="maxRating"
      :rating="rating || rank"
      :votes="votes"
    />
  </div> -->

  <!-- using a dynamically injected component defined by computed property-->
  <component
    :is="starComponent"
    :max-rating="maxRating"
    :rating="rating || rank"
    :votes="votes"
    @final-vote="vote"
  >
    Rate this Place
  </component>
</template>

<script setup lang="ts">
import { ref, computed, provide, readonly } from 'vue'
import StarRatingInput from './StarRatingInput.vue'
import StarRatingDisplay from './StarRatingDisplay.vue'

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

/* REACTIVE DATA */
const rank = ref(0)
const voted = ref(false)

/* DYNAMIC COMPONENT */
const starComponent = computed(() => {
  if (!voted.value) return StarRatingInput
  return StarRatingDisplay
})

/* METHODS */
const vote = (ranking: number) => {
  rank.value = ranking
  voted.value = true
}

/* PROVIDE */
// Usually, when we need to pass data from the parent to child component, we use props.
// Imagine the structure where you have some deeply nested components and you only need something from the parent component in the deep nested child.
// In this case, you still need to pass the prop down the whole component chain which might be annoying.
// For such cases, we can use the provide / inject pair.
// Parent components can serve as dependency provider for all its children, regardless how deep the component hierarchy is.
// This feature works on two parts: parent component has a provide option to provide data and child component has an inject option to start using this data.

//provide('starRating', readonly(rank)) //it is recommend using readonly on provided property, if you want to ensure that the data passed through provide cannot be mutated by the injected component
provide('starRating', rank)
//provide('starRating', computed(() => rank.value))

/* Expose some data to be accessed from outside the component (via ref to this component) */
defineExpose({
  rank,
  voted,
})
</script>

<style scoped></style>
