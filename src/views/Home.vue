<template>
  <!-- <div class="home"> -->
  <div class="container mx-auto">
    <div class="w-full h-20 border-b flex px-10 items-center justify-between">
      <img src="@/assets/images/ATOMLogo.png" alt="ATOM Logo" />
      <!-- <ul class="flex flex-row font-semibold text-indigo-700"> -->

      <div class="invisible md:visible">
        <a
          href="https://directionshealth.sharepoint.com/:b:/g/EcdkvQWSdwpPkGFLPbM3l60BQIjE5Zm5ZM5boV4juKizKg?e=6GCSgZ"
          class="font-semibold text-xs lg:text-sm no-underline hover:bg-gray-300 hover:text-indigo-800 shadow-md rounded-lg px-2 lg:px-4 py-2 rounded-bl-3xl"
          target="_blank"
        >
          Documentation</a
        >

        <a
          class="m-2 font-semibold text-xs lg:text-sm no-underline hover:bg-gray-300 hover:text-indigo-800  shadow-md rounded-lg px-2 lg:px-4 py-2 rounded-bl-3xl"
          href="mailto:ict@directionshealth.com"
          target="_blank"
          >Support (E-Mail)</a
        >

        <a
          class="m-2 font-semibold text-xs lg:text-sm no-underline hover:bg-gray-300 hover:text-indigo-800 shadow-md rounded-lg px-2 lg:px-4 py-2 rounded-bl-3xl"
          href="https://github.com/dactechie/ansa-surveyjs/issues"
          target="_blank"
          >Open Issues</a
        >
        <span class="ml-6 text-xs text-gray-500"> v: 7-Jan-2021</span>
      </div>
      <!-- </ul> -->
      <img src="@/assets/images/DirectionsLogoFull.png" alt="ATOM Logo" />
      <!-- <p class="font-semibold text-1xl text-blue-400 pl-4">
        Directions Health Services
      </p>
       -->
    </div>
    <div class="md:mt-1 flex flex-wrap">
      <LeftsideNavbar
        class="mt-4 sm:w-2/5 lg:w-1/4"
        :mode="mode"
        @search-initiated="showSpinner = true"
        @mode-updated="updateMode"
      />
      <div class="sm:w-3/5 lg:w-3/4 pl-2" id="main-content">
        <div v-if="showSpinner" class="absolute z-40 m-auto md:pl-40 md:py-40">
          <atom-spinner
            :animation-duration="1000"
            :size="120"
            color="#45b87f"
          />
        </div>
        <div class="static">
          <!-- <div v-if="getCurrenClientSLK === ''">
          <p class=" text-gray-200">
            no current SLK
          </p>
        </div> -->
          <div
            v-if="showInstructions"
            class="m-0 grid grid-cols-2 md:grid-cols-3 md:gap-2 text-sm lg:text-md subpixel-antialiased"
            :class="{ activeClass: showSpinner }"
          >
            <div
              class="m-10 mb-5 invisible md:visible md:col-span-2 shadow-md rounded-lg p-2 rounded-bl-3xl bg-gradient-to-b from-green-100 to-blue-100"
            >
              <!-- <div v-if="showInstructions"> -->
              <div class="m-10">
                <span class="font-semibold">
                  Start by entering your client's details using the search
                  function on the left.</span
                >
                (See the animation on the right for instructions)
              </div>

              <div class="pl-5 mx-5 mb-5">
                You'll be prompted to create a new ATOM, if the client doesn't
                exist
              </div>
              <div class="pl-5 mx-5 mb-5">
                If you have previously started/completed one/more ATOM(s) for a
                client, a table of previous ATOMs will be shown below. Click on
                a row to see the submission details.
              </div>
              <!-- </div> -->
            </div>
            <div
              class="mt-4 invisible md:visible shadow-md rounded-lg p-2 pl-3 rounded-bl-3xl bg-indigo-100"
            >
              <img src="@/assets/images/LookupAnimation.gif" />
            </div>
          </div>

          <div v-else>
            <div class="md:mt-10">
              <span
                class="pl-10 font-bold text-red-700"
                v-if="
                  searchResultText &&
                    mode === 0 &&
                    clientData.length === 0 &&
                    !showSpinner
                "
              >
                {{ searchResultText }}</span
              ><br />
              <div
                class="pl-10 py-6 relative inline-flex "
                v-for="survey in surveyListForClient"
                :key="survey.id"
              >
                <router-link
                  class="bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-2 md:px-6 inline-flex items-center"
                  @click.native="handleStartSurvey(survey.name)"
                  :to="{
                    name: 'SurveyView',
                    params: { type: 'new', surveyid: survey.surveyid }
                  }"
                >
                  {{ survey.prefix }} {{ survey.name }}</router-link
                >
                <span class="flex absolute h-3 w-3 top-2 right-2">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"
                  ></span>
                  <span
                    class="relative inline-flex rounded-full h-3 w-3 bg-purple-500"
                  ></span>
                </span>
              </div>
            </div>
          </div>
          <ClientSurveyHistory
            v-if="mode === 1"
            @clear-lookup-results="mode = 0"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import { AtomSpinner } from "epic-spinners";

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
    ClientSurveyHistory,
    AtomSpinner
  },
  data() {
    return {
      clientData: [],
      mode: MODE_EMPTY_CLIENT_DATA, // TODO : remove, redundant -> same as clientData == undefined
      searchResultText: "",
      picked_type: "lookup",
      surveyListForClient: [],
      showSpinner: false,
      showInstructions: true
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
      this.showSpinner = false;
      this.showInstructions = false;
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
<style scoped>
.activeClass {
  opacity: 0.1;
}
</style>
