export const mutations = {
  setSurveyList(state, payload) {
    state.surveyNameIDList = payload;
  },
  setQuestionsStatus(state, payload) {
    state.questionsStatus = payload;
  },
  setClientLookupIDData(state, payload) {
    state.clientLookupIDs = payload;
  },
  setClientData(state, payload) {
    state.clientData = payload;
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
  setStaff(state, payload) {
    state.currentStaff = payload;
  },
  setSurveyName(state, payload) {
    state.surveyName = payload;
  },
  setCurrentPageTitle(state, payload) {
    state.currentPageTitle = payload;
  },
  unsetClientData(state) {
    state.clientData = [];
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
