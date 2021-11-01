<template>
  <q-page class="flex flex-center bg-grey-1">
    <q-card style="width: 350px">
      <q-card-section>
        <h6 class="no-margin">Create a new account</h6>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-md">
          <name-input v-model.trim="name" />
          <username-input v-model.trim="username" />
          <email-input v-model.trim="email" />
          <password-input v-model.trim="password" />
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
          @click="onReset"
        />
        <q-btn label="Create" type="submit" color="primary" @click="onSubmit" />
      </q-card-actions>
      <q-inner-loading :showing="isLoading">
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-page>
</template>

<script>
import {
  defineComponent,
  reactive,
  computed,
  toRefs,
  onBeforeMount,
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useQuasar, LocalStorage } from 'quasar';
import PasswordInput from 'components/PasswordInput.vue';
import EmailInput from 'components/EmailInput.vue';
import UsernameInput from 'components/UsernameInput.vue';
import NameInput from 'components/NameInput.vue';

export default defineComponent({
  name: 'SignUp',
  components: {
    PasswordInput,
    EmailInput,
    UsernameInput,
    NameInput,
  },
  setup(props, { root }) {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const $q = useQuasar();

    const credentials = reactive({
      name: '',
      username: '',
      email: '',
      password: '',
    });

    const isLoading = computed(() => store.getters[`user/isLoading`]);

    const onSubmit = async () => {
      try {
        await store.dispatch('user/signUpNewUser', credentials);
        await router.replace({ name: 'Validate' });
      } catch (e) {
        $q.dialog({
          message: e.message,
        });
      }
    };

    const onReset = () => {
      credentials.email = '';
      credentials.password = '';
    };

    return { ...toRefs(credentials), isLoading, onSubmit, onReset };
  },
});
</script>
