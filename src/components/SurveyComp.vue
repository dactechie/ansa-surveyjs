<template>
  <div>
    <survey :survey="survey"></survey>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex"; //mapGetters, mapState
import * as SurveyVue from "survey-vue";
import { getDaysDifference } from "@/helper-functions/survey-helpers";
import "survey-vue/defaultV2.css";

// import QuestionnaireService from "@/api/SurveyQuestionnaireService";
import {
  getCurrentYearMonthDayString,
  calculateAgeFromSLK
  // wordWithPreOrSuffix
} from "@/common/utils"; //gapInDays
import {
  PREFILL_EXCLUSIONS_ALLCASES,
  MANDATORY_FIELDS
  // PREFILL_EXCLUSION_PREFIXES,
  // PREFILL_EXCLUSION_SUFFIXES
} from "@/common/constants";

// import SurveyService from "../api/SurveyService";

SurveyVue.StylesManager.applyTheme("defaultV2");

export default {
  name: "SurveyComp",
  props: ["currentPage"],
  emits: ["survey-is-ready"], //search-index-built"],F
  data() {
    return {
      survey: {},
      dirtyData: false,

      questionName: "",

      mandatoryFieldList: MANDATORY_FIELDS.split(","),
      scores: {}
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
    },
    hasMissingMandatoryFields() {
      if (!this.survey) return true;
      let answeredKeys = Object.keys(this.survey.getAllValues());
      return this.survey
        .getAllQuestions(true)
        .some(
          e =>
            (this.mandatoryFieldList.includes(e.name) || e.isRequired) &&
            !answeredKeys.includes(e.name) &&
            !this.survey.getValue(e.name)
        );
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
      "setSurveyName",
      "setSidebarState",
      "setMissingMandatoryFields"
      // "setCurrentPageQuestions"
    ]),
    ...mapGetters([
      "getCurrentSurveyData",
      "getCurrentClientSLK",
      "sideBarOpen",
      "isContinuingSurvey"
      // "totalTillNow"
    ]),

    savePartialSurvey() {
      // if the ROW-Key is not set  (program)
      this.survey.data["Status"] = "Incomplete";
      this.saveSurvey("Incomplete");
    },
    saveSurvey(status) {
      if (!this.isProgramSet) {
        console.error("Progarm not set . Unable to ssave");
        return;
      }

      // for the thank you page.
      this.setStaff(this.survey.data["Staff"]);

      // console.log(
      //   `Going to Add To Server ${this.survey.data["AssessmentType"]}`
      // );
      let dataObj = { ...this.survey.data, ...this.scores };
      const response = this.ADD_SURVEY_DATASERVER({
        SLK: this.$store.state.currentClientSLK,
        surveyData: dataObj,
        surveyId: this.$route.params.surveyid,
        //surveyName: this.$store.state.surveyName,
        status: status
      });
      console.log("save survey response :::: ", response);
      this.dirtyData = false;
    }
  },
  // setClientAge(survey, slk, caclAgeQuestion) {
  //   if (caclAgeQuestion ?? null !== null) {
  //     const age = calculateAgeFromSLK(slk);
  //     survey.setValue("ClientAge", age);
  //   }
  // },
  created() {
    window.onbeforeunload = function a() {
      if (me.dirtyData) {
        return "Please navigate to another page on the survey to save your changes. Are you sure you want to exit without saving the changes on this page ?";
      }
    };
    // this.survey = QuestionnaireService.getSurveyModel(
    //   SurveyVue,
    //   this.$route.params.surveyid
    // );
    this.survey = new SurveyVue.Model({
      surveyId: this.$route.params.surveyid
    });

    const me = this;
    this.survey.onLoadedSurveyFromService.add((sender, options) => {
      // for nav and survey title to work
      me.setSurveyName(me.survey.getSurvey().title);

      console.log("sender ", sender);
      console.log("options", options);
      const caclAgeQuestion = sender.getQuestionByName("ClientAge");

      //if there is data to prefill for this type of survey, do that.
      let prefillSurvey = me.getCurrentSurveyData(); //me.getDataForSurvey(me);

      //load question ssettings from survey question and then remove it so it is not saved in the client's survey submisison
      //QuestionSettings
      // me.survey.setValue("slk", String(me.getCurrentClientSLK()));
      // console.log("age ", age);
      if (
        typeof prefillSurvey !== "undefined" &&
        prefillSurvey["PartitionKey"] !== undefined
      ) {
        console.log("Last survey that was found in history ", prefillSurvey);
        let prefillSurveyData = prefillSurvey["SurveyData"];

        if (
          !me.isContinuingSurvey() //&&
          //prefillSurvey["Status"] !== "Incomplete"
        ) {
          // we're not continuing an incomplete survey, but starting a new one
          if (prefillSurvey["BPClientID"] !== undefined) {
            me.survey.setValue("BPClientID", prefillSurvey["BPClientID"]);
          }
          if (prefillSurveyData["IndigenousStatus"] !== undefined) {
            me.survey.setValue(
              "IndigenousStatus",
              prefillSurveyData["IndigenousStatus"]
            );
          }

          // const qAssessType = me.survey.getQuestionByName("AssessmentType");

          if (prefillSurveyData["AssessmentType"] === "ClinicalAssessment") {
            me.survey.setValue("AssessmentType", "InitialOutcome");
          } else if (
            //  initial or review
            getDaysDifference(new Date(), prefillSurveyData["AssessmentDate"]) <
            90 // 3 months ->  3 * 30
          ) {
            // if (qAssessType.visibleChoices.length > 1) {
            // Question hasn't been answered, can't be Clinical because it defaults
            // so this is a completed outcomes survey, which means now it cant be
            // an initial outcomes assessment
            me.survey.setValue("AssessmentType", "ReviewOutcome");
            // }
          }
          // else if (qAssessType.visibleChoices.length > 1) { // >= 90 days
          else me.survey.setValue("AssessmentType", "InitialOutcome");
          // }
        } else {
          //
          // if continuing a survey, we want to prefill everything.
          //
          const allCasesPrefillExclusions = PREFILL_EXCLUSIONS_ALLCASES.split(
            ","
          );
          const prefillQuestionNamesList = sender
            .getAllQuestions(false) //even hidden questions (they maybe hidd)
            .map(q => q.name)
            .filter(qname => !allCasesPrefillExclusions.includes(qname)); // exclude scores
          // some questions have a comment field which is not returned in the by getAllQuestions
          //so include those as well
          prefillQuestionNamesList.forEach(qname => {
            me.survey.setValue(qname, prefillSurveyData[qname]);
          });
          const prefillCommentQuestionsList = sender
            .getAllQuestions(false)
            .filter(q => q.hasComment);
          prefillCommentQuestionsList.forEach(commentQuestion => {
            commentQuestion.comment =
              prefillSurveyData[`${commentQuestion.name}-Comment`];
          });
          me.survey.setValue("Program", prefillSurvey["Program"]);
          me.survey.setValue("Staff", prefillSurvey["Staff"]);
          if (prefillSurvey["BPClientID"] !== undefined) {
            me.survey.setValue("BPClientID", prefillSurvey["BPClientID"]);
          }
        }
        // using sender.getAllQuestions() instead of  me.survey.data = prefilleSurveyData
        // why? SurveyQuestionnaires evolve over time..we don't want to 'prefil' keys and values
        // from a previous submission when the current survey has no matching question or answer

        // me.setClientSLK(prefillSurvey["PartitionKey"]);
      } else {
        //nothing to prefill - first ever
        if (!me.$store.state.currentClientSLK) {
          console.log("missing slk");
          me.$router.push("/");
        }
        me.survey.setValue("AssessmentDate", getCurrentYearMonthDayString("-"));
      }
      // me.setClientAge(me.survey, me.getCurrentClientSLK(), caclAgeQuestion);
      if (caclAgeQuestion ?? null !== null) {
        const age = calculateAgeFromSLK(me.getCurrentClientSLK());
        me.survey.setValue("ClientAge", age);
      }
      console.log("Set client age to  ", me.getCurrentClientSLK());

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
      me.setCurrentPageTitle(surveyModel.currentPage?.title || "Complete");
      console.log(
        "Curre surveyModel.currentPageNo ",
        surveyModel.currentPageNo
      );
      console.log(
        "Curren  surveyModel.visiblePageCount ",
        surveyModel.visiblePageCount
      );
      // Add this to update preview button visibility when page changes
      const lastPageIndex = surveyModel.visiblePageCount - 1;
      if (surveyModel.currentPageNo === lastPageIndex) {
        me.$nextTick(() => {
          let missingMandatoryFields = [];
          let missingFieldPageQuestionNames = [];
          let answeredKeys = Object.keys(me.survey.getAllValues());

          me.survey
            .getAllQuestions(true)
            .filter(
              e =>
                (me.mandatoryFieldList.includes(e.name) || e.isRequired) &&
                !answeredKeys.includes(e.name) &&
                e.page.visibleIndex < lastPageIndex // Exclude questions from the last page
            )
            .forEach(e => {
              if (!me.survey.getValue(e.name)) {
                missingMandatoryFields.push(e.name);
                missingFieldPageQuestionNames.push(`Question: ${e.title} \n`);
              }
            });
          if (missingMandatoryFields.length > 0) {
            alert(
              "Missing mandatory fields " +
                missingFieldPageQuestionNames.join(",")
            );
            const firstMissingQuestion = me.survey.getQuestionByName(
              missingMandatoryFields[0]
            );
            me.survey.currentPageNo = firstMissingQuestion.page.visibleIndex;
          }
        });
      }

      if (me.dirtyData && me.isProgramSet && !me.survey.isCompleted) {
        me.savePartialSurvey();
        // me.showSideBar();
      }
    });

    this.survey.onCompleting.add(function(survey) {
      console.log("On Completing survey");
      console.log(survey.data);
      survey
        .getAllQuestions(false)
        .filter(qq => qq.name.endsWith("_Score"))
        .forEach(q => {
          me.scores[q.name] = Math.round(survey.getValue(q.name));
        });
      // survey.surveyShowDataSaving = true;
      // survey.showBrandInfo = true;
    });
    //https://surveyjs.io/form-library/documentation/handle-survey-results-store
    //https://surveyjs.answerdesk.io/ticket/details/t3317/show-data-saving-error
    //https://surveyjs.io/form-library/documentation/surveymodel#onComplete
    //https://surveyjs.io/form-library/documentation/surveymodel#onCompleting
    this.survey.onComplete.add(function(survey, options) {
      console.log("survet options", options);
      // survey.surveyShowDataSaving = true;
      me.saveSurvey("Complete");
      // survey.surveyShowDataSaving = false;
      // remove the button to save incomplete survey
    });
    //https://surveyjs.io/form-library/examples/survey-titleactions/vuejs#content-js
    // this.survey.onGetQuestionTitleActions.add((_, opt) => {
    //   opt.titleActions = [
    //     {
    //       title: "Response History",
    //       innerCss: "btn-more-info",
    //       action: () => {
    //         me.questionName = opt.question.name;
    //         me.showMoreInfo = true;
    //       }
    //     }
    //   ];
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

input.sd-btn.sd-btn--action.sd-navigation__complete-btn {
  background-color: green;
}
</style>
