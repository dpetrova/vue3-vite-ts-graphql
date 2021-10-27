<template>
  <component :is="componentIs" :src="src" spinner-color="primary" />
</template>

<script>
import { defineComponent, ref, computed, watch, onBeforeMount } from 'vue';
import { QImg } from 'quasar';
import useAvatar from '../composables/useAvatar'; //use a composable

export default defineComponent({
  name: 'AvatarDisplay',
  props: {
    avatarObject: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
    tag: {
      type: String,
      required: false,
      default: 'q-img',
    },
  },
  setup(props) {
    //use getAvatar as a composable
    const { getAvatar } = useAvatar();

    const src = ref('');

    const componentIs = computed(() => (props.tag === 'q-img' ? QImg : 'img'));

    const updateSrc = async () => {
      src.value = await getAvatar(props.avatarObject, props.name);
    };

    watch([props.avatarObject, props.name], async (newVal, oldVal) => {
      await this.updateSrc();
    });

    onBeforeMount(async () => {
      await updateSrc();
    });

    return { src, componentIs };
  },
});
</script>
