import Vue from "vue";
import Vuex from "vuex";
// import * as drugs from "./default_config_drugs";
// import survey from "./survey/";

import actions from "./actions";
import { mutations } from "./mutations";
//import {DBSurveyObject} from "./survey/state";

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
    surveyName: "",
    surveyMode: ""
  },
  getters: {
    sideBarOpen: state => {
      return state.sideBarOpen;
    },
    navPages: state => {
      return state.navPages;
    },
    getCurrentSurveyName: state => {
      return state.surveyName;
    }
    // getSurveyIDForName: (state, surveyName) => {
    //   console.log("getting id for ", surveyName);
    //   debugger;
    //   const result = state.surveyNameIDList.find(id_name => {
    //     console.log(id_name)
    //     if (id_name.name === surveyName) return id_name.surveyid;
    //   });
    //   return result;
    // }
  },
  mutations: mutations,
  actions: actions
  //modules: { survey }
});
