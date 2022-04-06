import Vue from "vue";
import Vuex from "vuex";
// import * as drugs from "./default_config_drugs";
// import survey from "./survey/";

import actions from "./actions";
import { mutations } from "./mutations";
import { APPLICATION_MODE_NORMAL } from "@/common/constants";
//import {DBSurveyObject} from "./survey/state";

Vue.use(Vuex);

// function setAndReturn(data) {
//   localStorage.setItem("config", JSON.stringify(data));
//   return drugs;
// }

export default new Vuex.Store({
  state: {
    //config: JSON.parse(localStorage.getItem("config")) || setAndReturn(drugs)
    currentSurvey: {},
    currentSurveyData: {},
    sideBarOpen: true,
    // shouldPrefill: true,
    surveyNameIDList: [],
    currentClientSLK: "",
    currentStaff: "",
    prefillIndex: 0,
    clientData: [],
    surveyName: "",
    surveyMode: "",
    applicationMode: APPLICATION_MODE_NORMAL,
    currentPageTitle: "",
    clientLookupIDs: {},
    questionsStatus: {},
    missingMandatoryFields: [],
    continuingSurvey: false
  },
  getters: {
    isContinuingSurvey: state => {
      return state.continuingSurvey;
    },
    getApplicationMode: state => {
      return state.applicationMode;
    },
    getClientLookupIDs: state => {
      return state.clientLookupIDs;
    },
    getCurrentPageTitle: state => {
      return state.currentPageTitle;
    },
    getCompletedDetails: state => {
      return {
        currentClientSLK: state.currentClientSLK,
        currentStaff: state.currentStaff
      };
    },
    // shouldPrefill: state => {
    //   return state.shouldPrefill;
    // },
    totalQuestions: state => {
      return state.questionsStatus["total"];
    },
    totalTillNow: state => {
      return state.questionsStatus["totalTillNow"] || 0;
    },
    answeredQuestions: state => {
      return state.questionsStatus["answered"];
    },
    requiredQuestions: state => {
      return state.questionsStatus["required"];
    },
    reqAnsweredQuestions: state => {
      return state.questionsStatus["reqAnswered"];
    },
    getQuestionsStatus: state => {
      return state.questionsStatus;
    },
    sideBarOpen: state => {
      return state.sideBarOpen;
    },
    getClientData: state => {
      return state.clientData;
    },
    getCurrentClientSLK: state => {
      return state.currentClientSLK;
    },
    getCurrentSurvey: state => {
      return state.currentSurvey;
    },
    getCurrentSurveyData: state => {
      return state.currentSurveyData;
    },
    getMissingMandatoryFields: state => {
      return state.missingMandatoryFields;
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
