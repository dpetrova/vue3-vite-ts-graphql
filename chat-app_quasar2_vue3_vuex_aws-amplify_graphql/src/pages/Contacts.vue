<template>
  <q-page>
    <q-list bordered>
      <q-item
        v-for="contact in getConversations"
        :key="contact.id"
        :to="{
          name: 'Messages',
          params: {
            id: contact.conversation,
            name: contact.name,
          },
        }"
        class="q-my-sm"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar>
            <avatar-display
              :avatar-object="contact.avatar"
              :name="contact.name"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="green" />
        </q-item-section>
      </q-item>
    </q-list>
    <!-- new chat button in bottom right corner -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="chat"
        color="accent"
        @click="dialogNewConversation = !dialogNewConversation"
      />
      <new-conversation v-model="dialogNewConversation" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import AvatarDisplay from 'components/AvatarDisplay.vue';
import NewConversation from 'components/NewConversation.vue';

export default defineComponent({
  name: 'ChatContacts',
  components: {
    AvatarDisplay,
    NewConversation,
  },
  setup(props, { root }) {
    const store = useStore();

    const dialogNewConversation = ref(false);
    const getConversations = computed(
      () => store.getters[`chat/getConversations`]
    );

    onMounted(async () => {
      await store.dispatch('chat/getMessages');
    });

    return { dialogNewConversation, getConversations };
  },
});
</script>
