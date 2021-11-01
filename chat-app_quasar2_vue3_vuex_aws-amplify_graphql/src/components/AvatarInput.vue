<template>
  <q-file
    v-model="file"
    outlined
    bottom-slots
    label="Your Avatar"
    class="q-pr-md"
    @input="getFile"
  >
    <template v-if="photoUrl" v-slot:before>
      <q-avatar>
        <img :src="photoUrl" />
      </q-avatar>
    </template>
    <template v-slot:after>
      <q-btn round dense flat icon="cloud_upload" @click="fileUpload" />
    </template>
  </q-file>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { uid } from 'quasar';
import { uploadFile } from 'driver/bucket'; //use the driver of the AWS-Amplify Storage API; by doing this, we can upload files directly through the component

export default defineComponent({
  name: 'AvatarInput',
  props: {
    value: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  //setup(props, {emit}) { //using destructuring of context
  setup(props, context) {
    const avatar = reactive({
      file: [],
      type: '',
      name: '',
      s3file: {
        key: '',
        bucket: '',
        region: '',
      },
      photoUrl: '',
      canUpload: false,
    });

    const fileUpload = async () => {
      try {
        if (avatar.canUpload) {
          const file = await uploadFile(avatar.file, avatar.name, avatar.type);
          avatar.s3file = file;
          //emit('input', file);
          context.emit('input', file);
          avatar.canUpload = false;
        }
      } catch (err) {
        console.error(err);
      }
    };

    const getFile = ($event) => {
      avatar.file = $event.target.files[0];
      avatar.type = $event.type;
      avatar.name = `${uid()}`;
      const reader = new FileReader();
      //create a listener for the FileReader instance
      reader.onload = ({ target }) => {
        avatar.photoUrl = target.result;
        avatar.canUpload = true;
      };
      //reader.readAsDataURL($event.target.files[0]);
      if (avatar.file && avatar.file?.type?.match('image.*')) {
        reader.readAsDataURL(avatar.file);
      }
    };

    context.expose({
      fileUpload,
    });

    return { ...toRefs(avatar), fileUpload, getFile };
  },
});
</script>
