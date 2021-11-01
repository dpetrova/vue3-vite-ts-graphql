<template>
  <q-input
    :value="value"
    :rules="[(val) => (val && val.length > 0) || 'Please type a valid Name']"
    outlined
    label="Your Name"
    lazy-rules
    v-bind="$attrs"
  />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NameInput',
  props: {
    value: {
      type: String,
      default: '',
      required: false,
    },
  },
});
</script>
