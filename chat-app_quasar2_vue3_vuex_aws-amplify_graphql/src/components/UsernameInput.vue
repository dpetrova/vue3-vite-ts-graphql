<template>
  <q-input
    :value="modelValue"
    :rules="[
      (val) => (val && val.length > 5) || 'Please type a valid Username',
    ]"
    outlined
    lazy-rules
    label="Your Username"
    v-bind="$attrs"
  />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UsernameInput',
  props: {
    modelValue: {
      type: String,
      default: '',
      required: false,
    },
  },
});
</script>
