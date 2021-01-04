<template>
  <!-- <div class="home"> -->
  <div class="container mx-auto font-sans">
    <div
      class="w-full h-20 border-b flex px-20 items-center justify-between bg-gray-100"
    >
      <img src="@/assets/images/ATOMLogo.png" alt="ATOM Logo" />
      <img
        src="@/assets/images/DirectionsLogoFull.jpg"
        height="200"
        alt="ATOM Logo"
      />
      <!-- <p class="font-semibold text-1xl text-blue-400 pl-4">
        Directions Health Services
      </p>
       -->
    </div>
    <div class="flex flex-wrap ">
      <LeftsideNavbar
        class="sm:w-2/5 lg:w-1/4"
        :mode="mode"
        @mode-updated="updateMode"
      />
      <div class="sm:w-3/5 lg:w-3/4 bg-gray-100 pl-2" id="main-content">
        <span
          class="p-3 shadow font-bold text-red-900"
          v-if="searchResultText && mode === 0 && clientData.length === 0"
        >
          {{ searchResultText }}</span
        >
        <!-- <div v-if="getCurrenClientSLK === ''">
          <p class=" text-gray-200">
            no current SLK
          </p>
        </div> -->
        <div class="invisible md:visible  m-4 grid grid-cols-2 gap-3 text-sm">
          <div class=" shadow-md rounded-lg p-2 rounded-bl-3xl bg-green-100 ">
            <span class="mt-5 py-3 font-semibold">ATOM Assessments</span>
            <ul class="px-5 mx-5 list-disc  text-xs font-semibold mb-3">
              <li class="mb-2">
                When a client commences engagement with our service, an ATOM
                Initial Assessment should be undertaken, to identify their
                particular circumstances and service goals at commencement of
                service, enabling the practitioner to match these with the most
                appropriate type of Directions / Pathways service support. ATOM
                assessment should be repeated <u>every 4-6 weeks.</u>
              </li>
              <li>
                <span class="underline"
                  >ITSP (Individual Treatment Support Plan) Review</span
                ><br />
                Progress towards client goals are to be reviewed and re-assessed
                on a regular basis to assess any changed or evolving needs and
                goals. ATOM ITSP Review Assessment will pre-fill with the
                responses from the previous assessment. Practitioners will need
                to review each section with the client and clarify whether the
                client has experienced any relevant changes since the previous
                assessment was completed and update the informatation in the
                (pre-filled) ATOM ITSP Review Assessment before submission.
              </li>
            </ul>

            <span class="text-xs font-semibold">
              The ATOM is divided into <b>7 assessment sections</b>, reflecting
              the common life domains impacted by substance use
              <ul class="px-5 list-disc align-center mx-5">
                <li>Substance Use</li>
                <li>Everyday Living</li>
                <li>Housing & Safety</li>
                <li>Physical Health & Wellbeing</li>
                <li>Mental Health & Wellbeing</li>
                <li>Relationships, Parenting & Social Wellbeing</li>
                <li>Legal</li>
              </ul>
            </span>
          </div>
          <div class=" shadow-md rounded-lg p-2 rounded-bl-3xl bg-indigo-100 ">
            <span class="mt-5 py-3 font-semibold">Features</span>
            <ul class="px-5 mx-5 list-disc leading-5 text-xs font-semibold">
              <li>
                Navigation Menu to visit any section in the questionnaire.
              </li>
              <li>Pre-fill with entries from the last submission</li>
              <li>
                Instant E-mail with 2 attachments : A summary of the entire ATOM
                Questionnaire (Q & A) and Treatment Summary Report with Client
                Goals
              </li>
            </ul>
          </div>
        </div>
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
