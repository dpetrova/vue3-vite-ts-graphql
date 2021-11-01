<template>
  <q-input
    :value="value"
    :type="isPwd ? 'password' : 'text'"
    :label="label"
    :rules="[
      (val) => (val !== null && val !== '') || 'Please type your password',
      (val) =>
        val.length >= 8 || 'Your password need to have 8 or more characters',
    ]"
    :hint="
      value.length < 8 ? 'Your password has a minimum of 8 characters' : ''
    "
    outlined
    lazy-rules
    v-bind="$attrs"
  >
    <template v-slot:append>
      <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      />
    </template>
  </q-input>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PasswordInput',
  props: {
    value: {
      type: String,
      default: '',
      required: false,
    },
    label: {
      type: String,
      default: 'Your password',
      required: false,
    },
  },
  setup() {
    const isPwd = ref(true);

    return { isPwd };
  },
});
</script>
