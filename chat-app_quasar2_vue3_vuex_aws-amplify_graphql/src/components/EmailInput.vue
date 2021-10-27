<template>
  <q-input
    :value="modelValue"
    :rules="[
      (val) =>
        (val && val.length > 0 && validateEmail(val)) ||
        'Please type a valid E-mail',
    ]"
    type="email"
    label="Your E-mail"
    outlined
    lazy-rules
    v-bind="$attrs"
  />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EmailInput',
  props: {
    modelValue: {
      type: String,
      default: '',
      required: false,
    },
  },
  setup() {
    const validateEmail = (email) => {
      const regex =
        /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/;
      return regex.test(email);
    };

    return { validateEmail };
  },
});
</script>
