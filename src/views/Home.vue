<template>
  <!-- <div class="home"> -->
  <div class="container mx-auto">
    <div class="flex flex-wrap ">
      <LeftsideNavbar :mode="mode" @mode-updated="updateMode" />
      <div class=" sm:w-3/5 lg:w-3/4 bg-gray-100 pl-2 pt-20" id="main-content">
        <span
          class="p-4 shadow font-bold text-red-900"
          v-if="searchResultText && mode === 0 && clientData.length === 0"
        >
          {{ searchResultText }}</span
        >
        <!-- <div v-if="getCurrenClientSLK === ''">
          <p class=" text-gray-200">
            no current SLK
          </p>
        </div> -->

        <div v-if="getCurrentClientSLK !== ''">
          <div
            class="py-6"
            v-for="survey in surveyListForClient"
            :key="survey.id"
          >
            <router-link
              class="bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
              @click.native="handleStartSurvey(survey.name)"
              :to="{
                name: 'SurveyView',
                params: { type: 'new', surveyid: survey.surveyid }
              }"
            >
              {{ survey.prefix }} {{ survey.name }}</router-link
            >
          </div>
        </div>
        <ClientSurveyHistory
          v-if="mode === 1"
          @clear-lookup-results="mode = 0"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import { getCurrentYearMonthDayString } from "../common/utils";

import { gapInDays } from "@/common/utils";
import {
  // APP_ENVIRONMENT,
  PREFILL_EXPIRY_DAYS,
  INCOMPLETE_CONTINUATION_EXPIRY_DAYS,
  MODE_EMPTY_CLIENT_DATA
} from "@/common/constants";

import LeftsideNavbar from "@/components/NavSidebars/Home/LeftsideNavbar";
import ClientSurveyHistory from "@/components/ClientSurveyHistory";

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
      picked_type: "lookup",
      surveyListForClient: []
    };
  },

  mounted() {
    sessionStorage.clear();
    // fetch survey name:id list from surveyjs.io / azure
    this.clearState();
    this.GET_QUESTIONNAIRE_LISTING();
  },
  methods: {
    ...mapGetters(["getCurrentClientSLK", "getClientData"]),
    ...mapActions(["GET_QUESTIONNAIRE_LISTING"]),
    ...mapMutations([
      "setSurveyName",
      "setSurveyMode",
      "unsetClientData",
      "clearState",
      "setClientLookupIDData",
      "setCurrentSurveyData"
    ]),
    filterButtonType(buttonTypeName, shouldContinue) {
      // if (APP_ENVIRONMENT === "test") {
      //   let surveys = this.$store.state["surveyNameIDList"].forEach((s) => {
      //     if (!s.name.startsWith(buttonTypeName)) {
      //       s.name = s.name + "(hidden in production)";
      //     }
      //   });
      //   return this.$store.state["surveyNameIDList"];
      // }
      let nameSurveyIDList = this.$store.state["surveyNameIDList"].filter(s =>
        s.name.startsWith(buttonTypeName)
      );
      if (shouldContinue) {
        return nameSurveyIDList.map(e => {
          return {
            prefix: "Continue ",
            name: `${e.name}`,
            surveyid: e.surveyid
          };
        });
      } else {
        return nameSurveyIDList.map(e => {
          return { ...e, prefix: "New " };
        });
      }
    },
    handleStartSurvey(surveyName) {
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
        sessionStorage.removeItem("ClientData");
      }
      this.showSurveyLaunchButtons();
    },
    showSurveyLaunchButtons() {
      // 0. if brand new client , show CREATE new IA
      this.clientData = this.getClientData();
      if (!this.clientData || this.clientData.length === 0) {
        this.surveyListForClient = this.filterButtonType("ATOM Initial");
        return;
      }
      const lastSurveyDone = this.clientData[this.clientData.length - 1];
      const lastSurveyDate = lastSurveyDone["SurveyData"]["AssessmentDate"];
      const lastSurveyStatus = lastSurveyDone["Status"];

      const gapInDaysSinceLastSurvey = gapInDays(lastSurveyDate);
      sessionStorage.setItem(
        "GapInDaysSinceLastSurvey",
        gapInDaysSinceLastSurvey + ""
      );

      console.log(
        ` Age of last survey ${Math.round(
          gapInDaysSinceLastSurvey
        )} days. expiry ${PREFILL_EXPIRY_DAYS}`
      );
      // 1. if the last survey done was "completed"
      //    a. if was done more than 1 year ago, show "CREATE NEW IA" button
      //    b. otherwise show CREATE ITSP  (prefills from the last survey)

      if (lastSurveyStatus === "Complete") {
        if (gapInDaysSinceLastSurvey > PREFILL_EXPIRY_DAYS) {
          this.surveyListForClient = this.filterButtonType("ATOM Initial");
          return;
        }
        lastSurveyDone["SurveyData"][
          "AssessmentDate"
        ] = getCurrentYearMonthDayString("-");
        this.surveyListForClient = this.filterButtonType("ATOM ITSP", false);
      } else if (lastSurveyStatus === "Incomplete") {
        if (gapInDaysSinceLastSurvey < INCOMPLETE_CONTINUATION_EXPIRY_DAYS) {
          this.surveyListForClient = this.filterButtonType(
            lastSurveyDone["SurveyName"],
            true // should continue
          );
        } else {
          this.surveyListForClient = this.filterButtonType(
            lastSurveyDone["SurveyName"],
            false // should not continue
          );
          lastSurveyDone["SurveyData"][
            "AssessmentDate"
          ] = getCurrentYearMonthDayString("-");
        }
        console.log(
          "INCOMPLETE_CONTINUATION_EXPIRY_DAYS>>> ",
          INCOMPLETE_CONTINUATION_EXPIRY_DAYS
        );
      } else {
        console.error("unknown state for last survey ", lastSurveyStatus);
      }
      this.setCurrentSurveyData(lastSurveyDone);
    }
  }
};
</script>
