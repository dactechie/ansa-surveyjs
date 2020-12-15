<template>
  <!-- <div class="home"> -->
  <div class="container mx-auto">
    <div class="flex flex-wrap ">
      <LeftsideNavbar
        :mode="mode"
        @mode-updated="updateMode"
        @client-data-received="showSurveyLaunchButtons"
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
          <div
            class="py-6"
            v-for="survey in surveyListForClient"
            :key="survey.id"
          >
            <router-link
              class="bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
              @click.native="handleClickNewSurvey(survey.name)"
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
          :clientData="clientData"
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
  MODE_CLIENT_DATA_SET,
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
  // computed: {
  //   surveys: function() {

  //     //
  //     // 2. if the last survey was "incomplete"
  //     //    a. if done within 3 weeks, show "continue survey" button (IA / ITSP)
  //     //    b. otherwise if show the "CREATE new xx" button, where xx is the same type as the last incompleted survey.

  //     if (gapInDaysSinceLastSurvey < PREFILL_EXPIRY_DAYS) {
  //       console.log("Show ITSP");
  //       return filterButtonType("ANSA ITSP");
  //     }

  //     //if no surveys were ever done (or more than a year ago), only show initial assessment
  //     return filterButtonType("ANSA Initial");

  //     //return this.$store.state["surveyNameIDList"];
  //   },

  // },

  mounted() {
    sessionStorage.clear();
    // fetch survey name:id list from surveyjs.io / azure
    this.GET_QUESTIONNAIRE_LISTING();
    //this.surveys =  this.$store.state["surveyNameIDList"];
    // console.log("suveyin home view ", this.surveys);
    //console.log("Home mounted State", this.$store.state["surveyNameIDList"]);
  },
  methods: {
    ...mapGetters(["getCurrenClientSLK"]),
    ...mapActions(["GET_QUESTIONNAIRE_LISTING"]),
    ...mapMutations([
      "setClientData",
      "setSurveyName",
      "setSurveyMode",
      "unsetClientData",
      "setClientLookupIDData",
      "setCurrentSurvey"
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
        sessionStorage.removeItem("ClientData");
      }
    },
    showSurveyLaunchButtons() {
      // byu this time clientData in sessionStroe (setClientData Mutation)
      //const fullSurveyList = this.getFullSurveyList(); // from state

      // buttonStruct = {
      //   name :"",
      //   surveyid: "",
      //   prefill: false
      // }

      // 0. if brand new client , show CREATE new IA
      let clientData = this.$store.state["clientData"];
      if (!clientData || clientData.length === 0) {
        this.surveyListForClient = this.filterButtonType("ANSA Initial");
        //this.updateClientData(data);
        return;
      }
      const lastSurveyDone = clientData[clientData.length - 1];
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

      // this.surveyListForClient = this.getSurveyList(lastSurveyDone);

      if (lastSurveyStatus === "Complete") {
        if (gapInDaysSinceLastSurvey > PREFILL_EXPIRY_DAYS) {
          this.surveyListForClient = this.filterButtonType("ANSA Initial");
        } else {
          // move the last survey to vuex -> "prefillData"
          // when survet loads, do the prefill and delete the PrefillData, store the current session survey Data in vuex, and sessionStorage(in case of accidental page reload)
          //when the user hits "next buton after any changes. the server gets the update" )
          lastSurveyDone["SurveyData"][
            "AssessmentDate"
          ] = getCurrentYearMonthDayString("-");
          this.setCurrentSurvey(lastSurveyDone);
          this.surveyListForClient = this.filterButtonType("ANSA ITSP", false);
        }
      } else if (lastSurveyStatus === "Incomplete") {
        let prefillSurvey = lastSurveyDone;
        if (gapInDaysSinceLastSurvey < 21) {
          this.surveyListForClient = this.filterButtonType(
            lastSurveyDone["SurveyName"],
            true // should continue
          );
        } else {
          // even if not continuing , prefill from last survey compelte/incomplete.
          this.surveyListForClient = this.filterButtonType(
            lastSurveyDone["SurveyName"],
            false // should not continue
          );
          prefillSurvey["SurveyData"][
            "AssessmentDate"
          ] = getCurrentYearMonthDayString("-");
        }
        this.setCurrentSurvey(prefillSurvey);
      } else {
        console.error("unknown state for last survey ", lastSurveyStatus);
      }
      console.log(" Current survey list ", this.surveyListForClient);

      this.updateClientData(clientData);
    },

    /**
     * updates session storage with the data from the server
     */
    updateClientData(clientData) {
      // if (!clientData) {
      //   this.mode = MODE_EMPTY_CLIENT_DATA;
      //   return;
      // }
      this.clientData = clientData;
      let str_data = JSON.stringify(clientData);
      if (sessionStorage.getItem("ClientData") === str_data) {
        console.log("\t\t is client data already in vuex ? :: YES");
      } else {
        console.log("\t\t is client data already in vuex ? ::: NO ");
        // this.setClientData(cdata);
        sessionStorage.setItem("ClientData", str_data);
      }
      this.mode = MODE_CLIENT_DATA_SET;
    }
  }
};
</script>
