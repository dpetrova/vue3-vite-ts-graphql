<template>
  <q-page padding class="flex flex-center bg-grey-1">
    <q-card style="width: 350px">
      <q-card-section>
        <h6 class="no-margin">Chat Application</h6>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-md">
          <email-input v-model.trim="email" />
          <password-input v-model.trim="password" />
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Create new account"
          color="primary"
          flat
          class="q-ml-sm"
          @click="createAccount"
        />
        <q-btn label="Login" type="submit" color="primary" @click="onSubmit" />
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
//import { useGetters, useActions } from 'vuex-composition-helpers';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useQuasar, LocalStorage } from 'quasar';
import PasswordInput from 'components/PasswordInput.vue';
import EmailInput from 'components/EmailInput.vue';

export default defineComponent({
  name: 'Index',
  components: {
    // PasswordInput: () => import('components/PasswordInput'),
    // EmailInput: () => import('components/EmailInput'),
    PasswordInput,
    EmailInput,
  },
  setup(props, { root }) {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const $q = useQuasar();

    const credentials = reactive({
      email: '',
      password: '',
    });

    // const { getUserId } = useGetters({
    //   getUserId: 'getUserId',
    // });
    // const { signInUser } = useActions({
    //   signInUser: 'signInUser'
    // })
    //const isLoading = computed(() => root.$store.getters.isLoading)
    //const getUserId = computed(() => root.$store.getters.getUserId)
    const isLoading = computed(() => store.getters[`user/isLoading`]);
    const getUserId = computed(() => store.getters[`user/getUserId`]);

    const onSubmit = async () => {
      try {
        await store.dispatch('user/signInUser', credentials);
        await router.push({ name: 'Contacts' });
      } catch (e) {
        $q.dialog({
          message: e.message,
        });
      }
    };

    const createAccount = () => {
      router.push({ name: 'SignUp' });
    };

    onBeforeMount(async () => {
      if (getUserId.value) {
        await router.replace({ name: 'Contacts' });
      }
    });

    return { ...toRefs(credentials), isLoading, createAccount, onSubmit };
  },
});
</script>
