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
    <button
      v-if="dirtyData && isProgramSet && !survey.isCompleted"
      class="bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
      @click.prevent="savePartialSurvey"
    >
      Save Incomplete Survey
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex"; //mapGetters, mapState
import * as SurveyVue from "survey-vue";
import { getCurrentYearMonthDayString, sumUp } from "@/common/utils"; //gapInDays
import {
  PREFILL_EXPIRY_DAYS,
  INCOMPLETE_CONTINUATION_EXPIRY_DAYS
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
  //emits: ["search-index-built"],
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
      this.ADD_SURVEY_DATASERVER({
        SLK: this.$store.state.currentClientSLK,
        surveyData: this.survey.data,
        surveyId: this.$route.params.surveyid,
        //surveyName: this.$store.state.surveyName,
        status: status
      });
      this.dirtyData = false;
    },
    getDataForSurvey(me) {
      let prefillSurvey = me.getCurrentSurveyData();
      if (prefillSurvey) {
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
      this.setClientSLK(clientData["PartitionKey"]); // for when we save data to server
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
    var myCss = {
          question: {
              description: "mj-description"
          },
      };
    this.survey = new SurveyVue.Model({
      surveyId: this.$route.params.surveyid
    });
    this.survey.css = myCss;

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

      if (prefillSurvey["PartitionKey"] !== undefined) {
        console.log("Last survey that was found in history ", prefillSurvey);
        let prefillSurveyData = prefillSurvey["SurveyData"];
        sender.getAllQuestions().forEach(e => {
          me.survey.setValue(e.name, prefillSurveyData[e.name]);
        });
        // why? SurveyQuestionnaires evolve over time..we don't want to 'prefil' keys and values
        // from a previous submission when the current survey has no matching question or answer
        me.survey.setValue("Program", prefillSurvey["Program"]);
        me.survey.setValue("Staff", prefillSurvey["Staff"]);
      } else {
        me.survey.setValue("AssessmentDate", getCurrentYearMonthDayString("-"));
      }
      me.setCurrentSurvey(me.survey); // for the nav to work
    });

    this.survey.onCurrentPageChanged.add(function(surveyModel) {
      window.scrollTo(0, 0);
      me.setCurrentPageTitle(surveyModel.currentPage.title);
      let q = me.survey.getAllQuestions(true); //true=> visible
      let answered = Object(q).filter(e => e.isAnswered);

      let required = Object(q).filter(e => e.isRequired);
      let reqAnswered = Object(required).filter(e => e.isAnswered);

      me.setQuestionsStatus({
        answered: answered.length,
        // totalTillNow: me.totalTillNow() +  me.survey.getCurrentPageQuestions().length,
        total: q.length,
        required: required.length,
        reqAnswered: reqAnswered.length
      });
    });
    this.survey.onValueChanged.add(() => {
      me.dirtyData = true;
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
</style>
