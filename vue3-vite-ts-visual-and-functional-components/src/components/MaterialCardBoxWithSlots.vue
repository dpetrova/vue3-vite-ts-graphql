<!-- VISUAL COMPONENT WITH SLOTS -->

<template>
  <div class="cardBox elevation_2">
    <div class="header">
      <!-- named slot header -->
      <slot v-if="$slots.header" name="header" />
      <div v-else>
        <h1 class="cardHeader cardText">Card Header</h1>
        <h2 class="cardSubHeader cardText">Card Sub Header</h2>
      </div>
    </div>
    <div class="media">
      <!-- named slot media -->
      <slot v-if="$slots.media" name="media" />
      <img v-else src="https://via.placeholder.com/350x250" />
    </div>
    <div
      v-if="$slots.default"
      class="section cardText"
      :class="{
        noBottomPadding: $slots.action,
        halfPaddingTop: $slots.media,
      }"
    >
      <!-- default slot -->
      <slot />
    </div>
    <div v-if="$slots.action" class="action">
      <!-- named slot action -->
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
