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
        <span class="p-4 block shadow font-bold text-red-900" v-if="mode === 0">
          {{ searchResultText }}</span
        >
        <div v-if="getCurrenClientSLK === ''">
          <p class=" text-gray-200">
            no current SLK
          </p>
        </div>
        <div v-if="getCurrenClientSLK !== ''">
          <div flex v-for="survey in surveys" :key="survey.id">
            <router-link
              class="bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
              @click.native="handleClickNewSurvey(survey.name)"
              :to="{
                name: 'SurveyView',
                params: { type: 'new', surveyid: survey.surveyid }
              }"
            >
              Create New {{ survey.name }}</router-link
            >
          </div>
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
import { mapActions, mapMutations, mapGetters } from "vuex";
import LeftsideNavbar from "@/components/NavSidebars/Home/LeftsideNavbar";
import ClientSurveyHistory from "@/components/ClientSurveyHistory.vue";

import {
  MODE_CLIENT_DATA_SET,
  MODE_EMPTY_CLIENT_DATA
} from "@/common/constants";

export default {
  name: "Home",
  components: {
    LeftsideNavbar,
    ClientSurveyHistory
    // NewClientStart
  },
  data() {
    return {
      clientData: {},
      mode: MODE_EMPTY_CLIENT_DATA, // TODO : remove, redundant -> same as clientData == undefined
      searchResultText: "",
      picked_type: "lookup"
    };
  },
  computed: {
    surveys: function() {
      return this.$store.state["surveyNameIDList"];
    },
    ...mapGetters(["getCurrenClientSLK"])
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
    ...mapMutations(["setClientData", "setSurveyName", "setSurveyMode"]),

    handleClickNewSurvey(surveyName) {
      this.setSurveyMode("new");
      this.setSurveyName(surveyName);
    },
    updateMode({ mode, text }) {
      this.mode = mode;
      this.searchResultText = text;
      if (this.mode === MODE_EMPTY_CLIENT_DATA) {
        this.clientData == {};
        //this.currentSLK = "";
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
      this.currentSLK = cdata[0]["PartitionKey"];
      this.setClientData(cdata);

      console.log("DATA ", this.clientData);
      this.mode = MODE_CLIENT_DATA_SET;
    }
  }
};
</script>
