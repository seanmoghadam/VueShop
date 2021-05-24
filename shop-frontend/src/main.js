import Vue from 'vue';
import App from "./App";
import VueRouter from "vue-router";
import router from "./router.js";
import store from "./store";

// https://benborgers.com/tailwind-postcss-error
import './index.css'

Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')