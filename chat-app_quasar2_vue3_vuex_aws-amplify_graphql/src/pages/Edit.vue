<template>
  <q-page padding class="bg-grey-1 flex flex-center">
    <q-card style="width: 350px">
      <q-card-section>
        <h6 class="no-margin">Edit user account</h6>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-md">
          <avatar-input v-model="avatar" ref="avatarRef" />
          <name-input v-model.trim="name" />
          <username-input v-model.trim="username" />
          <q-separator />
          <password-input v-model.trim="password" label="Your old password" />
          <password-input
            v-model.trim="newPassword"
            label="Your new password"
          />
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
        <q-btn label="Update" type="submit" color="primary" @click="onSubmit" />
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
  ref,
  reactive,
  computed,
  toRefs,
  onBeforeMount,
} from 'vue';

import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useQuasar, LocalStorage } from 'quasar';
import PasswordInput from 'components/PasswordInput.vue';
import AvatarInput from 'components/AvatarInput.vue';
import UsernameInput from 'components/UsernameInput.vue';
import NameInput from 'components/NameInput.vue';

export default defineComponent({
  name: 'EditUser',
  components: {
    PasswordInput,
    AvatarInput,
    UsernameInput,
    NameInput,
  },
  setup(props, { root }) {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const $q = useQuasar();

    const avatarRef = ref(null);

    const credentials = reactive({
      name: '',
      username: '',
      avatar: '',
      password: '',
      newPassword: '',
    });

    const isLoading = computed(() => store.getters[`user/isLoading`]);
    const getUser = computed(() => store.getters[`user/getUser`]);

    credentials.name = getUser.value.name;
    credentials.username = getUser.value.username;
    credentials.avatar = getUser.value.avatar;

    const onSubmit = async () => {
      try {
        // console.log(avatarRef.value.fileUpload);
        await avatarRef.value.fileUpload();
        await store.dispatch('user/editUser', credentials);
        await router.replace({ name: 'Contacts' });
      } catch (e) {
        $q.dialog({
          message: e.message,
        });
      }
    };

    const onReset = () => {
      credentials.name = getUser.value.name;
      credentials.username = getUser.value.username;
      credentials.password = '';
      credentials.newPassword = '';
    };

    return { avatarRef, ...toRefs(credentials), isLoading, onSubmit, onReset };
  },
});
</script>
