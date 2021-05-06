<template>
  <div>
    <!-- <button id="show-modal" @click="showModal = true">Show Modal</button>
    <modal v-if="showModal" @close="showModal = false">
      <template v-slot:body>
        {{ modalContent }}
      </template>
      <h3 slot="header">Question</h3>
    </modal> -->

    <survey :survey="survey"></survey>
    <!-- && (!survey || survey.state !== 'completed') -->
    <!-- <button
      v-if="dirtyData && isProgramSet && !survey.isCompleted"
      class="bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
      @click.prevent="savePartialSurvey"
    >
      Save Incomplete Survey
    </button> -->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex"; //mapGetters, mapState
import * as SurveyVue from "survey-vue";
import { getCurrentYearMonthDayString, sumUp } from "@/common/utils"; //gapInDays
import {
  PREFILL_EXPIRY_DAYS,
  PREFILL_EXCLUSIONS,
  INCOMPLETE_CONTINUATION_EXPIRY_DAYS,
  MANDATORY_FIELDS
} from "@/common/constants";
// import Modal from "@/components/Modal";

//import simpleIAJSON from "../simpleIAJSON";
// import FakeEpisodes from "@/FakeEpisodes";

// eslint-disable-next-line
const Survey = SurveyVue.Survey;
SurveyVue.StylesManager.applyTheme("modern");
SurveyVue.FunctionFactory.Instance.register("sumUp", sumUp);
//const fakeData = FakeEpisodes[0];

export default {
  name: "SurveyComp",
  props: ["currentPage"],
  emits: ["survey-is-ready"], //search-index-built"],
  data() {
    return {
      survey: {},
      dirtyData: false,
      showModal: false,
      modalContent: ""
    };
  },
  // components: {
  //   Modal
  // },
  watch: {
    currentPage: function(newVal, oldVal) {
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      this.survey.currentPageNo = newVal;
    }
  },
  computed: {
    isProgramSet() {
      return !!this.survey.data["Program"];
    }
  },
  methods: {
    ...mapActions(["ADD_SURVEY_DATASERVER", "UPDATE_SURVEY_DATASERVER"]),
    ...mapMutations([
      "clearState",
      "setCurrentSurvey",
      "setCurrentSurveyData",
      "setCurrentPageTitle",
      "setClientSLK",
      "setStaff",
      "setQuestionsStatus",
      "setSurveyName"
    ]),
    ...mapGetters([
      "getCurrentSurveyData",
      "getCurrentSurvey",
      "getCurrentSurveyName",
      "getClientLookupIDs"
      // "totalTillNow"
    ]),
    savePartialSurvey() {
      // if the ROW-Key is not set  (program)
      console.log("survey data", this.survey.data);
      this.survey.data["Status"] = "Incomplete";
      this.saveSurvey("Incomplete");
    },
    saveSurvey(status) {
      if (!this.isProgramSet) {
        console.error("Progarm not set . Unable to ssave");
        return;
      }
      let sdsQuestions = this.survey
        .getAllQuestions()
        .filter(e => e.name.startsWith("SDS"));
      if (sdsQuestions && sdsQuestions.length > 2) {
        const intList = sdsQuestions.map(e => parseInt(e.value));
        const sds_score = sumUp(intList);
        console.log("SAVE SURVEY -------  SDS SCORE .............", sds_score);
        this.survey.setValue("SDS_Score", sds_score);
      }
      // for the thank you page.
      this.setStaff(this.survey.data["Staff"]);

      //this.survey.data["SurveyID"] = this.$route.params.surveyid;
      const response = this.ADD_SURVEY_DATASERVER({
        SLK: this.$store.state.currentClientSLK,
        surveyData: this.survey.data,
        surveyId: this.$route.params.surveyid,
        //surveyName: this.$store.state.surveyName,
        status: status
      });
      console.log("save survey response :::: ", response);
      this.dirtyData = false;
    },
    getDataForSurvey(me) {
      let prefillSurvey = me.getCurrentSurveyData();
      if (prefillSurvey && prefillSurvey["SurveyData"]) {
        return prefillSurvey;
      }

      const cd = sessionStorage.getItem("ClientData");
      if (!cd) {
        console.log("no client data");
        return undefined;
      }
      // page was reloaded , vuex lost its state.
      let gapInDaysSinceLastSurvey = sessionStorage.getItem(
        "GapInDaysSinceLastSurvey"
      );

      if (!gapInDaysSinceLastSurvey) {
        console.error(`no data to continue gp: undefined, data:`, cd);
        return undefined;
      }
      gapInDaysSinceLastSurvey = parseInt(gapInDaysSinceLastSurvey);
      const clientData = JSON.parse(cd);
      //this.setClientSLK(clientData["PartitionKey"]); // for when we save data to server
      const lastSurveyDone = clientData[clientData.length - 1];
      const lastSurveyStatus = lastSurveyDone["Status"];

      if (lastSurveyStatus === "Complete") {
        if (gapInDaysSinceLastSurvey <= PREFILL_EXPIRY_DAYS) {
          lastSurveyDone["SurveyData"][
            "AssessmentDate"
          ] = getCurrentYearMonthDayString("-");
          me.setCurrentSurveyData(lastSurveyDone);
        }
        // nothign to prefill.. start fresh
      } else if (lastSurveyStatus === "Incomplete") {
        if (gapInDaysSinceLastSurvey > INCOMPLETE_CONTINUATION_EXPIRY_DAYS) {
          // even if not continuing , prefill from last survey compelte/incomplete.
          lastSurveyDone["SurveyData"][
            "AssessmentDate"
          ] = getCurrentYearMonthDayString("-");
          me.setCurrentSurveyData(lastSurveyDone);
        }
        console.log(
          "INCOMPLETE_CONTINUATION_EXPIRY_DAYS>>> ",
          INCOMPLETE_CONTINUATION_EXPIRY_DAYS
        );
        // DON't prefill with expired data ?
      } else {
        console.error("unknown state for last survey ", lastSurveyStatus);
      }
      return me.getCurrentSurveyData();
    }
  },
  created() {
    window.onbeforeunload = function a() {
      if (me.dirtyData) {
        return "Please navigate to another page on the survey to save your changes. Are you sure you want to exit without saving the changes on this page ?";
      }
    };
    this.survey = new SurveyVue.Model({
      surveyId: this.$route.params.surveyid
    });

    const me = this;
    this.survey.onLoadedSurveyFromService.add((sender, options) => {
      // for nav and survey title to work
      me.setSurveyName(me.survey.getSurvey().title);

      console.log("sender ", sender);
      console.log("options", options);

      // regardless of whether data was found in vuex/local/session store..
      // we can prefill data that was just enetered into the lookup fields for Firstname etc.
      //TODO: prefill name DOB sex
      const lookupIds = me.getClientLookupIDs();
      if (lookupIds) {
        for (const [k, v] of Object.entries(lookupIds)) {
          me.survey.setValue(k, v);
        }
      }

      //if there is data to prefill for this type of survey, do that.
      let prefillSurvey = me.getDataForSurvey(me);

      if (
        typeof prefillSurvey !== "undefined" &&
        prefillSurvey["PartitionKey"] !== undefined
      ) {
        console.log("Last survey that was found in history ", prefillSurvey);
        let prefillSurveyData = prefillSurvey["SurveyData"];
        //
        // if continuing a survey, we want to prefill everything.
        //
        if (prefillSurvey["Status"] !== "Incomplete") {
          const prefillExclusionList = PREFILL_EXCLUSIONS.split(",");
          sender
            .getAllQuestions()
            .filter(e => !prefillExclusionList.includes(e.name))
            .forEach(e => {
              me.survey.setValue(e.name, prefillSurveyData[e.name]);
            });
        } else {
          sender.getAllQuestions().forEach(e => {
            me.survey.setValue(e.name, prefillSurveyData[e.name]);
          });
        }
        // using sender.getAllQuestions() instead of  me.survey.data = prefilleSurveyData
        // why? SurveyQuestionnaires evolve over time..we don't want to 'prefil' keys and values
        // from a previous submission when the current survey has no matching question or answer

        me.survey.setValue("Program", prefillSurvey["Program"]);
        me.survey.setValue("Staff", prefillSurvey["Staff"]);
        me.setClientSLK(prefillSurvey["PartitionKey"]);
      } else {
        if (!me.$store.state.currentClientSLK) {
          console.log("missing slk. Lookup IDs: ", lookupIds);
          me.$router.push("/");
        }

        me.survey.setValue("AssessmentDate", getCurrentYearMonthDayString("-"));
      }

      me.dirtyData = false; // so we don't save to backend after the prefil/initial assessment date set
      me.setCurrentSurvey(me.survey); // for the nav to work
      me.$emit("survey-is-ready");

      me.survey.onValueChanged.add(() => {
        me.dirtyData = true;
      });
    });

    this.survey.onCurrentPageChanged.add(function(surveyModel) {
      //}, options) {
      window.scrollTo(0, 0);
      me.setCurrentPageTitle(surveyModel.currentPage.title);
      // if (
      //   !!options.oldCurrentPage &&
      //   !!options.newCurrentPage &&
      //   options.newCurrentPage.visibleIndex ===
      //     options.oldCurrentPage.visibleIndex + 1
      // ) {
      //   // handle the progress bar when the user clicks on next page
      //   me.isAutoNavigatingFromPreview = false;
      // }
      // let q = me.survey.getAllQuestions(true); //true=> visible
      // let answered = Object(q).filter(e => e.isAnswered);

      // let required = Object(q).filter(e => e.isRequired);
      // let reqAnswered = Object(required).filter(e => e.isAnswered);

      // me.setQuestionsStatus({
      //   answered: answered.length,
      //   // totalTillNow: me.totalTillNow() +  me.survey.getCurrentPageQuestions().length,
      //   total: q.length,
      //   required: required.length,
      //   reqAnswered: reqAnswered.length
      // });

      if (me.survey.isShowingPreview) {
        //&& !me.isAutoNavigatingFromPreview
        // mandatory list -> superset to all questionnaires  (Initial assess: own, other, ITSP review etc.)

        const mandatoryFieldList = MANDATORY_FIELDS.split(",");

        let missingMandatoryFields = [];
        let missingFieldPageQuestionNames = [];
        let answeredKeys = Object.keys(me.survey.getAllValues());
        me.survey
          .getAllQuestions(true) //true=> visible
          .filter(
            e =>
              mandatoryFieldList.includes(e.name) &&
              !answeredKeys.includes(e.name)
          )
          // get all mandatory & visible but not answered questions

          .forEach(e => {
            if (!me.survey.getValue(e.name)) {
              missingMandatoryFields.push(e.name);
              missingFieldPageQuestionNames.push(`Question: ${e.title} \n`); // Page:${e.page.title} :
            }
          });
        if (missingMandatoryFields.length > 0) {
          // alert("Missing mandatory fields ", missingMandatoryFields);
          alert(
            "Missing mandatory fields " +
              missingFieldPageQuestionNames.join(",")
          );
          // me.isAutoNavigatingFromPreview = true;
          me.survey.cancelPreview(); // 	Cancels preview and switches back to the "running" state.
          const firstMissingQuestion = me.survey.getQuestionByName(
            missingMandatoryFields[0]
          );
          me.survey.currentPage = firstMissingQuestion.page.visibleIndex;

          return;
        }
      } else if (me.dirtyData && me.isProgramSet && !me.survey.isCompleted) {
        me.savePartialSurvey();
      }
    });

    this.survey.onComplete.add(function(survey, options) {
      console.log("survet options", options);
      me.saveSurvey("Complete");
      // remove the button to save incomplete survey
    });
    // TODO : build search index from pages
    //  survey.visiblePages
    // pages [
    //   {
    //     title: "page title",
    //     elements: [
    //       {
    //         name:"ElementName"
    //       }
    //     ]
    //   }
    // ]
    //this.$emit('search-index-built', searchIndex);

    // {
    //   surveyId: "9fe4d164-8c6c-4b0a-ac60-aabf803413b7"
    // });
  },
  mounted() {
    console.log(" mounted -> survey data", this.survey.data);
  },
  beforeDestroy() {
    if (this.dirtyData && !this.survey.isCompleted) {
      let addnl = this.isProgramSet ? "" : "Please set the Program (team).";
      if (
        confirm(`You have unsaved changes. Do you want to save them? ${addnl}`)
      ) {
        this.savePartialSurvey();
        console.log("Saved changes");
      }
    }
    console.log("before destroy, clearing client sate");
    this.clearState();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.sv-question__title {
  font-size: 1em;
}
.sv-page__title {
  font-size: 1.5em;
}
.sv-root-modern .sv-description {
  color: black;
}

@media only screen and (min-width: 600px) {
  .sv-body__footer {
    margin-right: 25%;
    margin-left: 25%;
  }
}
.sv-matrix__cell {
  min-width: 1em;
}
/*h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}*/
.atom-spinner,
.atom-spinner * {
  box-sizing: border-box;
}

.atom-spinner {
  height: 60px;
  width: 60px;
  overflow: hidden;
}

.atom-spinner .spinner-inner {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
}

.atom-spinner .spinner-circle {
  display: block;
  position: absolute;
  color: #45b87f;
  font-size: calc(60px * 0.24);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.atom-spinner .spinner-line {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation-duration: 1s;
  border-left-width: calc(60px / 25);
  border-top-width: calc(60px / 25);
  border-left-color: #45b87f;
  border-left-style: solid;
  border-top-style: solid;
  border-top-color: transparent;
}

.atom-spinner .spinner-line:nth-child(1) {
  animation: atom-spinner-animation-1 1s linear infinite;
  transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg);
}

.atom-spinner .spinner-line:nth-child(2) {
  animation: atom-spinner-animation-2 1s linear infinite;
  transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg);
}

.atom-spinner .spinner-line:nth-child(3) {
  animation: atom-spinner-animation-3 1s linear infinite;
  transform: rotateZ(360deg) rotateX(66deg) rotateZ(0deg);
}

@keyframes atom-spinner-animation-1 {
  100% {
    transform: rotateZ(120deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes atom-spinner-animation-2 {
  100% {
    transform: rotateZ(240deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes atom-spinner-animation-3 {
  100% {
    transform: rotateZ(360deg) rotateX(66deg) rotateZ(360deg);
  }
}
</style>
