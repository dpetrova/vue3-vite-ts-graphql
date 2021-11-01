/* authentication middleware that we could redirect an already authenticated user */

import { boot } from 'quasar/wrappers';

export default boot(async ({ router, store }) => {
  try {
    if (!store.getters['user/getUserId']) {
      await store.dispatch('user/initialLogin');
    }
  } catch {
    await router.replace({ name: 'Index' });
  }
});
