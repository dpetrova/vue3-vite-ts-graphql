<!-- Validation page of user creation -->
<!-- Once the user has created an account, AWS Amplify will send an email with a validation pin-code that we will need to be sent back for validation purposes -->

<template>
  <q-page padding class="flex flex-center bg-grey-1">
    <q-card style="width: 350px">
      <q-card-section>
        <h6 class="no-margin">Validate new account</h6>
        <div class="text-subtitle2">{{ getUserEmail }}</div>
      </q-card-section>
      <q-card-section>
        <p>A validation code were sent to you E-mail.</p>
        <p>Please enter it to validate your new account.</p>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            v-model.trim="code"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Please type the validation code',
            ]"
            outlined
            label="Validation Code"
            lazy-rules
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
        <q-btn
          flat
          label="Re-send code"
          color="secondary"
          class="q-ml-sm"
          @click="resendCode"
        />
        <q-btn
          label="Validate"
          type="submit"
          color="primary"
          @click="onSubmit"
        />
      </q-card-actions>
      <q-inner-loading :showing="isLoading">
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, toRefs, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useQuasar, LocalStorage } from 'quasar';
import { resendValidationCode } from 'src/driver/auth';

export default defineComponent({
  name: 'Validate',
  setup(props, { root }) {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const $q = useQuasar();

    const code = ref('');

    const isLoading = computed(() => store.getters[`user/isLoading`]);
    const getUserEmail = computed(() => store.getters[`user/getUserEmail`]);

    const onSubmit = async () => {
      try {
        await store.dispatch('user/createNewUser', code.value);
        await router.replace({ name: 'Index' });
      } catch (e) {
        console.error(e);
        $q.dialog({
          message: e.message,
        });
      }
    };

    const resendCode = async () => {
      await resendValidationCode(getUserEmail.value);
    };

    const onReset = () => {
      code.value = '';
    };

    return { code, isLoading, getUserEmail, onSubmit, resendCode, onReset };
  },
});
</script>
