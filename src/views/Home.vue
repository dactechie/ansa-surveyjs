<template>
  <!-- <div class="home"> -->
  <div class="container mx-auto">
    <div class="flex flex-wrap ">
      <LeftsideNavbar
        :mode="mode"
        @mode-updated="updateMode"
        @survey-data-received="updateClientData"
      />
      <div class=" sm:w-3/5 lg:w-3/4 bg-gray-100 pl-2 pt-20" id="main-content">
        <span
          class="p-4 shadow font-bold text-red-900"
          v-if="searchResultText && mode === 0"
        >
          {{ searchResultText }}</span
        >
        <!-- <div v-if="getCurrenClientSLK === ''">
          <p class=" text-gray-200">
            no current SLK
          </p>
        </div> -->
        <div v-if="getCurrenClientSLK !== ''">
          <div class="py-6" v-for="survey in surveys" :key="survey.id">
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
//import { gapInDays } from "@/common/utils";
//import { APP_ENVIRONMENT, PREFILL_EXPIRY_DAYS } from "@/common/constants";

import LeftsideNavbar from "@/components/NavSidebars/Home/LeftsideNavbar";
import ClientSurveyHistory from "@/components/ClientSurveyHistory";

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
      clientData: [],
      mode: MODE_EMPTY_CLIENT_DATA, // TODO : remove, redundant -> same as clientData == undefined
      searchResultText: "",
      picked_type: "lookup"
    };
  },
  computed: {
    surveys: function() {
      return this.$store.state["surveyNameIDList"];
      // if (this.clientData && this.clientData.length > 0) {
      //   const lastSurveyDone = this.clientData[this.clientData.length - 1];
      //   const lastSurveyDate = lastSurveyDone["SurveyData"]["AssessmentDate"];
      //   const gapDays = gapInDays(lastSurveyDate);
      //   console.log(
      //     ` Age of last survey ${Math.round(
      //       gapDays
      //     )} days. expiry ${PREFILL_EXPIRY_DAYS}`
      //   );

      //   if (gapDays < PREFILL_EXPIRY_DAYS) {

      //     console.log("Show ITSP");

      // if (APP_ENVIRONMENT === "test") {
      //   this.$store.state["surveyNameIDList"].forEach(s => {
      //     if (!s.name.startsWith("ANSA ITSP")) {
      //       s.name = s.name + "(hidden in production)";
      //     }
      //   });
      //   return this.$store.state["surveyNameIDList"];
      // } else {
      //   return this.$store.state["surveyNameIDList"].filter(s =>
      //     s.name.startsWith("ANSA ITSP")
      //   );
      // }
      //   }
      // }
      // //if no surveys were ever done (or more than a year ago), only show initial assessment
      // if (APP_ENVIRONMENT === "test") {
      //   this.$store.state["surveyNameIDList"].forEach(s => {
      //     if (!s.name.startsWith("ANSA Initial")) {
      //       s.name = s.name + "(hidden in production)";
      //     }
      //   });
      //   return this.$store.state["surveyNameIDList"];
      // } else {
      //   return this.$store.state["surveyNameIDList"].filter(s =>
      //     s.name.startsWith("ANSA Initial")
      //   );
      // }

      //return this.$store.state["surveyNameIDList"];
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
    ...mapMutations([
      "setClientData",
      "setSurveyName",
      "setSurveyMode",
      "unsetClientData",
      "setClientLookupIDData"
    ]),

    handleClickNewSurvey(surveyName) {
      this.setSurveyMode("new");
      const sNameArray = surveyName.split(" ");
      const idx = sNameArray.findIndex(e => e.includes("rc")); // rc0.5 ABC.. (remove ReleaseCandidate descriptor)
      if (idx > 0) {
        const outSurveyName = sNameArray.slice(0, idx).join(" ");
        this.setSurveyName(outSurveyName);
      } else {
        this.setSurveyName(surveyName);
      }
    },
    updateMode({ mode, text, data }) {
      this.mode = mode;
      this.searchResultText = text;
      if (this.mode === MODE_EMPTY_CLIENT_DATA) {
        this.setClientLookupIDData(data);
        this.unsetClientData();
      }
    },
    updateClientData(data) {
      let cdata = [...data];

      this.clientData = cdata;
      if (!cdata) {
        this.mode = MODE_EMPTY_CLIENT_DATA;
        console.log("EMPTY DATA ", this.clientData);
        this.unsetClientData();
        return;
      }
      this.currentSLK = cdata[0]["PartitionKey"];
      this.setClientData(cdata);

      console.log("SET CLIENT DATA AFTER LOOKUP ", this.clientData);
      this.mode = MODE_CLIENT_DATA_SET;
    }
  }
};
</script>
