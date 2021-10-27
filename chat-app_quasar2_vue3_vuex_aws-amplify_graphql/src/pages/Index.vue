<template>
  <q-page class="row items-center justify-evenly">
    <username-input />
    <password-input />
    <name-input />
    <email-input />
    <avatar-input />
    <!-- <avatar-display /> -->
  </q-page>
</template>

<script>
import UsernameInput from 'components/UsernameInput.vue';
import PasswordInput from 'components/PasswordInput.vue';
import NameInput from 'components/NameInput.vue';
import EmailInput from 'components/EmailInput.vue';
import AvatarInput from 'components/AvatarInput.vue';
//import AvatarDisplay from 'components/AvatarDisplay.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  components: {
    UsernameInput,
    PasswordInput,
    NameInput,
    EmailInput,
    AvatarInput,
    // AvatarDisplay,
  },
  setup() {
    const todos = [
      {
        id: 1,
        content: 'ct1',
      },
      {
        id: 2,
        content: 'ct2',
      },
      {
        id: 3,
        content: 'ct3',
      },
      {
        id: 4,
        content: 'ct4',
      },
      {
        id: 5,
        content: 'ct5',
      },
    ];
    const meta = {
      totalCount: 1200,
    };
    return { todos, meta };
  },
});
</script>
