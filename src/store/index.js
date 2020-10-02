import Vue from "vue";
import Vuex from "vuex";
import * as drugs from "./default_config_drugs";
Vue.use(Vuex);

function setAndReturn(data) {
  localStorage.setItem("config", JSON.stringify(data));
  return drugs;
}

export default new Vuex.Store({
  state: {
    config: JSON.parse(localStorage.getItem("config")) || setAndReturn(drugs)
  },
  mutations: {},
  actions: {},
  modules: {}
});
