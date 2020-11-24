export const mutations = {
  setSurveyList(state, payload) {
    state.surveyNameIDList = payload;
  },
  setClientLookupIDData(state, payload) {
    state.clientLookupIDs = payload;
  },
  setClientData(state, payload) {
    state.clientData = payload;
    let str_data = JSON.stringify(payload);
    sessionStorage.setItem("ClientData", str_data);
  },
  setCurrentSurvey(state, payload) {
    state.currentSurvey = payload;
  },
  setSurveyMode(state, payload) {
    state.surveyMode = payload;
  },
  setClientSLK(state, payload) {
    state.currentClientSLK = payload;
  },
  setSurveyName(state, payload) {
    state.surveyName = payload;
  },
  setCurrentPageTitle(state, payload) {
    state.currentPageTitle = payload;
  },

  unsetClientData(state) {
    state.clientData = [];
    sessionStorage.removeItem("ClientData");
  },
  clearClientState(state) {
    state.currentClientSLK = "";
    state.prefillIndex = 0;
    state.clientData = [];
    //surveyName: "",// this in the route url this.$route.params.type
    state.surveyMode = "";
  },
  toggleSidebar(state) {
    state.sideBarOpen = !state.sideBarOpen;
  }
};
