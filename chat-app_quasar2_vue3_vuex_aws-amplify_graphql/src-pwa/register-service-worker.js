import { register } from 'register-service-worker';
import { Notify } from 'quasar';

async function clearLocalCache() {
  const cachedFiles = await caches.keys();

  await cachedFiles.map(async (file) => {
    await caches.delete(file);
  });

  window.location.reload(); //reload the application
}

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  // registrationOptions: { scope: './' },

  ready(/* registration */) {
    // console.log('Service worker is active.')
  },

  registered(/* registration */) {
    // console.log('Service worker has been registered.')
  },

  cached(/* registration */) {
    // console.log('Content has been cached for offline use.')
  },

  updatefound(/* registration */) {
    // add an install verification so the new update notification will only be displayed for users that had the application installed on their browsers
    // console.log('New content is downloading.')
    const installKey = 'chatAppInstalled';
    if (localStorage.getItem(installKey)) {
      Notify.create({
        color: 'dark',
        message: 'An update is being downloaded from the server.',
      });
    } else {
      localStorage.setItem(installKey, '1');
    }
  },

  updated(/* registration */) {
    // add to the updated life cycle a notification for the update-finished process, and an action button for the user to clear the cache and restart the application
    // console.log('New content is available; please refresh.')
    Notify.create({
      type: 'positive',
      message: 'The application was updated successfully!',
      caption: 'Please refresh the page to apply the new update.',
      actions: [
        {
          label: 'Refresh',
          color: 'white',
          handler: clearLocalCache,
        },
      ],
    });
  },

  offline() {
    // console.log('No internet connection found. App is running in offline mode.')
  },

  error(/* err */) {
    // console.error('Error during service worker registration:', err)
  },
});
