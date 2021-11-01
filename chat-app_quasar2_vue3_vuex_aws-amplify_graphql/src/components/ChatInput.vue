<template>
  <q-input
    v-model="text"
    bottom-slots
    label="Mesage"
    @keypress.enter="sendMessage"
  >
    <template v-slot:after>
      <q-btn round flat icon="send" @click="sendMessage" />
    </template>
  </q-input>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'ChatInput',
  setup(props, { root }) {
    const store = useStore();
    const route = useRoute();

    const text = ref('');

    const sendMessage = async () => {
      await store.dispatch('chat/newMessage', {
        message: text.value,
        conversationId: route.params.id,
      });

      await store.dispatch('chat/fetchNewMessages', {
        conversationId: route.params.id,
      });

      text.value = '';
    };

    return { sendMessage };
  },
});
</script>

<style scoped></style>
