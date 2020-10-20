<template>
  <!-- <div class="home"> -->
  <div class="container mx-auto h-full">
    <div class="flex flex-wrap">
      <LeftsideNavbar
        :mode="mode"
        @mode-updated="updateMode"
        @survey-data-received="updateClientData"
      />
      <div class="w-full bg-gray-100 pl-0 lg:pl-64 " id="main-content">
        <div v-if="currentSLK === ''">
          <p>
            no current SLK
          </p>
        </div>
        <div v-else flex v-for="survey in surveys" :key="survey.id">
          <router-link
            class="bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
            @click.native="handleClickSurvey(survey.name)"
            :to="{
              name: 'SurveyView',
              params: { type: 'new', surveyid: survey.surveyid }
            }"
          >
            Create New {{ survey.name }}</router-link
          >
        </div>
        <ClientSurveyHistory
          v-if="mode === 1"
          @clear-lookup-results="mode = 0"
          :clientData="clientData"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import LookupFetchClient from "@/components/LookupFetchClient.vue";
import { mapActions, mapMutations } from "vuex";
import LeftsideNavbar from "@/components/NavSidebars/Home/LeftsideNavbar";
//import Navbar from "@/components/NavSidebars/Home/Navbar";
// import LookupFetchClientData from "@/components/LookupFetchClientData.vue";

import ClientSurveyHistory from "@/components/ClientSurveyHistory.vue";
// import NewClientStart from "@/components/NewClientStart.vue";
import {
  MODE_CLIENT_DATA_SET,
  MODE_EMPTY_CLIENT_DATA
} from "@/common/constants";
//import { getSurveysNameID } from "@/api/SurveyQuestionnaireService";

export default {
  name: "Home",
  components: {
    LeftsideNavbar,
    // LookupFetchClientData,
    ClientSurveyHistory
    // NewClientStart
  },
  data() {
    return {
      clientData: {},
      mode: MODE_EMPTY_CLIENT_DATA, // TODO : remove, redundant -> same as clientData == undefined
      picked_type: "lookup"
    };
  },
  computed: {
    surveys: function() {
      return this.$store.state["surveyNameIDList"];
    },
    currentSLK: function() {
      return this.$store.state["currentClientSLK"];
    }
  },
  mounted() {
    // fetch survey name:id list from surveyjs.io / azure
    this.GET_QUESTIONNAIRE_LISTING();
    //this.surveys =  this.$store.state["surveyNameIDList"];
    console.log("suveyin home view ", this.surveys);
    //console.log("Home mounted State", this.$store.state["surveyNameIDList"]);
  },
  methods: {
    ...mapActions(["GET_QUESTIONNAIRE_LISTING"]),
    ...mapMutations(["setClientData", "setSurveyName"]),

    handleClickSurvey(surveyName) {
      this.setSurveyName(surveyName);
    },
    updateMode(data) {
      this.mode = data;
      if (this.mode === MODE_EMPTY_CLIENT_DATA) {
        this.clientData == {};
      }
    },
    updateClientData(data) {
      let cdata = [...data];

      this.clientData = cdata;
      if (!cdata) {
        this.mode = MODE_EMPTY_CLIENT_DATA;
        console.log("EMPTY DATA ", this.clientData);
        return;
      }
      let str_data = JSON.stringify(cdata);
      //console.log(str_data);
      //sessionStorage.setItem("ClientData", btoa(str_data));
      sessionStorage.setItem("ClientData", str_data);
      this.setClientData(cdata);

      console.log("DATA ", this.clientData);
      this.mode = MODE_CLIENT_DATA_SET;
    }
  }
};
</script>
