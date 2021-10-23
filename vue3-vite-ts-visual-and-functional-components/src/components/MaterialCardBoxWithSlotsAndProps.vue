<!-- VISUAL COMPONENT WITH SLOTS AND PROPS-->

<template>
  <div class="cardBox" :class="cardElevation">
    <div v-if="showHeader" class="header">
      <slot v-if="$slots.header" name="header" />
      <div v-else>
        <h1 class="cardHeader cardText">
          {{ header }}
        </h1>
        <h2 class="cardSubHeader cardText">
          {{ subHeader }}
        </h2>
      </div>
    </div>
    <div v-if="showMediaContent" class="media">
      <slot v-if="$slots.media" name="media" />
      <img v-else :src="imgSrc" />
    </div>
    <div
      v-if="showMainContent"
      class="section cardText"
      :class="{
        noBottomPadding: $slots.action,
        halfPaddingTop: $slots.media,
      }"
    >
      <slot v-if="$slots.default" />
      <p v-else class="cardText">
        {{ mainText }}
      </p>
    </div>
    <div v-if="showActionsButtons" class="action">
      <slot v-if="$slots.action" name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()

/* PROPS */
const props = defineProps({
  header: {
    type: String,
    required: false,
    default: '',
    validator: (v) => typeof v === 'string',
  },
  subHeader: {
    type: String,
    required: false,
    default: '',
    validator: (v) => typeof v === 'string',
  },
  mainText: {
    type: String,
    required: false,
    default: '',
    validator: (v) => typeof v === 'string',
  },
  showMedia: {
    type: Boolean,
    required: false,
    default: false,
    validator: (v) => typeof v === 'boolean',
  },
  imgSrc: {
    type: String,
    required: false,
    default: '',
    validator: (v) => typeof v === 'string',
  },
  showActions: {
    type: Boolean,
    required: false,
    default: false,
    validator: (v) => typeof v === 'boolean',
  },
  elevation: {
    type: Number,
    required: false,
    default: 2,
    validator: (v) => typeof v === 'number',
  },
})

/* COMPUTED visual manipulation rules that will be used to render the card */
const showMediaContent = computed(() => {
  return (slots.media || props.imgSrc) && props.showMedia
})
const showActionsButtons = computed(() => {
  return slots.action && props.showActions
})
const showHeader = computed(() => {
  return slots.header || props.header || props.subHeader
})
const showMainContent = computed(() => {
  return slots.default || props.mainText
})
const cardElevation = computed(() => {
  return `elevation_${Math.round(props.elevation)}`
})
</script>

<style scoped lang="scss">
// import the Roboto font family and apply it to all the elements that will be wrapped inside this component
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');
@import '../assets/styles/elevation.scss';
@import '../assets/styles/cardStyles.scss';

* {
  font-family: 'Roboto', sans-serif;
}
.cardBox {
  width: 100%;
  max-width: 300px;
  background-color: #fff;
  position: relative;
  display: inline-block;
  border-radius: 0.25rem;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);

  .header {
    padding: 1rem;
    position: relative;
    display: block;
  }
  .media {
    overflow: hidden;
    position: relative;
    display: block;
    max-width: 100%;
  }
  .section {
    padding: 1rem;
    position: relative;
    margin-bottom: 1.5rem;
    display: block;
  }
  .action {
    padding: 0.5rem;
    position: relative;
    display: block;
  }
  .action > *:not(:first-child) {
    margin-left: 0.4rem;
  }
  .noBottomPadding {
    padding-bottom: 0 !important;
  }
  .halfPaddingTop {
    padding-top: 0.5rem !important;
  }
}
</style>
