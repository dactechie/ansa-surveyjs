import Vue from "vue";
import Vuex from "vuex";
// import * as drugs from "./default_config_drugs";
// import survey from "./survey/";

import actions from "./actions";
import { mutations } from "./mutations";

Vue.use(Vuex);

// function setAndReturn(data) {
//   localStorage.setItem("config", JSON.stringify(data));
//   return drugs;
// }

export default new Vuex.Store({
  state: {
    //config: JSON.parse(localStorage.getItem("config")) || setAndReturn(drugs)
    navPages: [],
    sideBarOpen: false,
    surveyNameIDList: [],
    currentClientSLK: "",
    prefillIndex: 0,
    clientData: [],
    //surveyName: "",// this in the route url this.$route.params.type
    surveyMode: ""
  },
  getters: {
    sideBarOpen: state => {
      return state.sideBarOpen;
    },
    navPages: state => {
      return state.navPages;
    }
  },
  mutations: mutations,
  actions: actions
  //modules: { survey }
});
