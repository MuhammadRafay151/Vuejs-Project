import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount("#app");
