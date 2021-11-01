/* In the iOS platform on Safari, there is no installation banner for the PWA application in the browser. 
In these steps, we will add the a2hs.js plugin to add this missing feature */

import { boot } from 'quasar/wrappers';
import AddToHomeScreen from 'a2hs.js';

const api = axios.create({ baseURL: 'https://api.example.com' });

export default boot(() => {
  const options = {
    brandName: 'Chat App',
  };
  AddToHomeScreen(options);
});
