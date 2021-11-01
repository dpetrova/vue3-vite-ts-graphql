<template>
  <q-dialog :value="value" @input="$emit('input', $event)">
    <q-card style="min-width: 400px; min-height: 100px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">New Conversation</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-list>
          <q-item
            v-for="contact in contactList"
            :key="contact.id"
            class="q-my-sm"
            clickable
            v-ripple
            @click="createConversation(contact.id)"
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
              <q-icon name="add_comment" color="green" />
            </q-item-section>
          </q-item>
        </q-list>
        <q-inner-loading :showing="pending">
          <q-spinner size="50px" color="primary" />
        </q-inner-loading>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
import AvatarDisplay from 'components/AvatarDisplay.vue';

export default defineComponent({
  name: 'NewConversation',
  components: {
    AvatarDisplay,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { root }) {
    const store = useStore();
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();

    const userList = ref([]);
    const pending = ref(false);
    const getUser = computed(() => store.getters[`user/getUser`]);
    const getConversations = computed(
      () => store.getters[`user/getConversations`]
    );
    const contactList = computed(() =>
      userList.value.filter(
        (user) =>
          getConversations.value.findIndex((u) => u.id === user.id) === -1
      )
    );

    const fetchUsers = async () => {
      pending.value = true;
      try {
        const users = await store.dispatch('user/listAllUsers');
        userList.value = users.filter((u) => u.id !== getUser.value.id);
      } catch (e) {
        $q.dialog({
          message: e.message,
        });
      } finally {
        pending.value = false;
      }
    };

    const createConversation = async (otherUserId) => {
      try {
        const conversation = await store.dispatch('chat/newConversation', {
          authorId: getUser.value.id,
          otherUserId,
        });
        await router.push({
          name: 'Messages',
          params: conversation,
        });
      } catch (e) {
        q.dialog({
          message: e.message,
        });
      }
    };

    watch(props.value, async (newVal, oldVal) => {
      if (newVal) {
        await fetchUsers();
      }
    });

    return { contactList, pending, createConversation };
  },
});
</script>
