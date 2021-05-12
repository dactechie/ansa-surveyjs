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
    sessionStorage.setItem("ClientData", JSON.stringify(payload));
  },
  setCurrentSurvey(state, payload) {
    state.currentSurvey = payload;
  },
  setCurrentSurveyData(state, payload) {
    state.currentSurveyData = payload;
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
  clearState(state) {
    state.currentClientSLK = "";
    state.currentSurveyData = {};
    state.currentSurvey = {};
    state.prefillIndex = 0;
    state.clientData = [];
    state.currentStaff = "";
    (state.surveyName = ""), (state.surveyMode = "");
    state.currentPageTitle = "";
  },
  toggleSidebar(state) {
    state.sideBarOpen = !state.sideBarOpen;
  },
  hideSideBar(state) {
    state.sideBarOpen = false;
  },
  setSidebarState(state, payload) {
    state.sideBarOpen = payload;
  },
  setMissingMandatoryFields(state, payload) {
    state.missingMandatoryFields = payload;
  }
};
