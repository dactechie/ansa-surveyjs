export const mutations = {
  setSurveyList(state, payload) {
    state.surveyNameIDList = payload;
  },

  setClientData(state, payload) {
    state.clientData = payload;
  },

  setClientSLK(state, payload) {
    state.currentClientSLK = payload;
  },
  setSurveyName(state, payload) {
    state.surveyName = payload;
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
  },
  setNavPages(state, payload) {
    state.navPages = payload;
  }
};
