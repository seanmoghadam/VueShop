import './index.scss';
import { createApp, h } from 'vue';
import App from './App';
import routes from './router.js';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

const app = createApp({
  render: () => h(App),
  router,
});

app.use(router);

app.mount('#root');
