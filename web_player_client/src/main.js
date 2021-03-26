import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";

import state from "./vue/state";
import getters from "./vue/getters";
import actions from "./vue/actions";
import mutations from "./vue/mutations";

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
