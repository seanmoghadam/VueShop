import "./index.scss";
import Vue from 'vue';
import App from "./App";
import VueRouter from "vue-router";
import router from "./router.js";

Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router
}).$mount('#root')