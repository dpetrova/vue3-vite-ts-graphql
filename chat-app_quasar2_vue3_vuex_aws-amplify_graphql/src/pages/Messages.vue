<template>
  <q-page class="q-pa-md row justify-center">
    <!-- to can use dynamic refs you should declare these refs in the setup() and in the template use them as :ref="el => { refname = el }" -->
    <q-chat-message
      v-for="message in currentMessages"
      :ref="
        (el) => {
          messagesDivs[message.id] = el;
        }
      "
      :key="message.id"
      :stamp="message.createdAt"
      :text="[message.content]"
      :sent="getUser.id === message.authorId"
      :name="message.author.name"
      class="col-12"
    >
      <template v-slot:avatar>
        <avatar-display
          :avatar-object="message.author.avatar"
          :name="message.author.name"
          tag="img"
          class="q-message-avatar"
          :class="
            getUser.id !== message.authorId
              ? 'q-message-avatar--received'
              : 'q-message-avatar--sent'
          "
        />
      </template>
    </q-chat-message>
  </q-page>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  watch,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { date } from 'quasar';
import AvatarDisplay from 'components/AvatarDisplay.vue';

export default defineComponent({
  name: 'MessagesPage',
  components: {
    AvatarDisplay,
  },
  setup(props, { root }) {
    const store = useStore();
    const route = useRoute();

    const messagesDivs = ref({}); //to use as dynamic refs
    const interval = ref(null);
    const getUser = computed(() => store.getters[`user/getUser`]);
    const getChatMessages = computed(
      () => store.getters[`chat/getChatMessages`]
    );
    const currentMessages = computed(() => {
      const messages = getChatMessages.value(route.params.id);
      if (!messages.length) return [];
      return messages.map((m) => ({
        ...m,
        createdAt: date.formatDate(
          new Date(parseInt(m.createdAt, 10)),
          'YYYY/MM/DD HH:mm:ss'
        ),
      }));
    });

    onBeforeMount(async () => {
      //this will auto-refreshing page that fetches new content every second, and always displays the new messages for the user
      interval.value = setInterval(async () => {
        await store.dispatch('chat/fetchNewMessages', {
          conversationId: route.params.id,
        });
      }, 1000);
    });

    onBeforeUpdate(() => {
      // make sure to reset the refs before each update
      messagesDivs.value = {};
    });

    onBeforeUnmount(() => {
      clearInterval(interval.value);
      interval.value = null;
    });

    watch(currentMessages.value, async (newVal, oldVal) => {
      if (newVal.length > oldVal.length) {
        //a timeout function, that will scroll the screen to the last visible element
        setTimeout(() => {
          const lastMessage = [...newVal].pop();
          const [{ $el: el }] = messagesDivs.value[`${lastMessage.id}`];
          el.scrollIntoView();
        }, 250);
      }
    });

    return { messagesDivs, currentMessages, getUser };
  },
});
</script>
