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
import { PREFILL_EXPIRY_DAYS } from "@/common/constants";
// import Modal from "@/components/Modal";

//import simpleIAJSON from "../simpleIAJSON";
// import FakeEpisodes from "@/FakeEpisodes";

// eslint-disable-next-line
const Survey = SurveyVue.Survey;
SurveyVue.StylesManager.applyTheme("modern");
SurveyVue.FunctionFactory.Instance.register("sumUp", sumUp, false);
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
      "clearClientState",
      "setCurrentSurvey",
      "setCurrentPageTitle",
      "setClientSLK",
      "setStaff",
      "setQuestionsStatus",
      "setSurveyName"
    ]),
    ...mapGetters([
      "getCurrentSurvey",
      "getCurrentSurveyName",
      "getClientLookupIDs"
      // "totalTillNow"
    ]),
    savePartialSurvey() {
      // if the ROW-Key is not set  (program)
      console.log("survey data", this.survey.data);
      this.survey.data["Status"] = "Incomplete";

      //console.log("staff ", this.survey.data["Staff"]);
      this.saveSurvey("Incomplete");
    },
    saveSurvey(status) {
      if (!this.isProgramSet) {
        console.error("Progarm not set . Unable to ssave");
        return;
      }

      console.log("staff ", this.survey.data["Staff"]);

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
    getCurrentSurveyData(me) {
      let prefillSurvey = me.getCurrentSurvey();
      if (JSON.stringify(prefillSurvey) !== JSON.stringify({})) {
        // from vuex, so nothing to do
        return prefillSurvey;
      }
      // page was reloaded , vuex lost its state.
      const gapInDaysSinceLastSurvey = parseInt(
        sessionStorage.getItem("GapInDaysSinceLastSurvey")
      );
      const cd = sessionStorage.getItem("ClientData");
      if (!cd || !gapInDaysSinceLastSurvey) {
        console.error(
          "no data to continue gp: ${gapInDaysSinceLastSurvey}, data:",
          cd
        );
        return;
      }
      const clientData = JSON.parse(cd);
      this.setClientSLK(clientData["PartitionKey"]); // for when we save data to server
      const lastSurveyDone = clientData[clientData.length - 1];
      const lastSurveyStatus = lastSurveyDone["Status"];

      if (lastSurveyStatus === "Complete") {
        if (gapInDaysSinceLastSurvey <= PREFILL_EXPIRY_DAYS) {
          lastSurveyDone["SurveyData"][
            "AssessmentDate"
          ] = getCurrentYearMonthDayString("-");
          me.setCurrentSurvey(lastSurveyDone);
        }
        // nothign to prefill.. start fresh
      } else if (lastSurveyStatus === "Incomplete") {
        if (gapInDaysSinceLastSurvey > 21) {
          // even if not continuing , prefill from last survey compelte/incomplete.
          lastSurveyDone["SurveyData"][
            "AssessmentDate"
          ] = getCurrentYearMonthDayString("-");
        }
        // prefilling with expired data ?
        me.setCurrentSurvey(lastSurveyDone);
      } else {
        console.error("unknown state for last survey ", lastSurveyStatus);
      }

      return me.getCurrentSurvey();
    }
  },
  created() {
    this.survey = new SurveyVue.Model({
      surveyId: this.$route.params.surveyid
    });

    const me = this;
    this.survey.onLoadedSurveyFromService.add((sender, options) => {
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

      // this may be overridden if there is an incomplete survey
      //me.survey.setValue("AssessmentDate", getCurrentYearMonthDayString("-"));

      //if there is data to prefill for this type of survey, do that.
      let prefillSurvey = me.getCurrentSurveyData(me);

      if (prefillSurvey) {
        console.log("Last survey that was found in history ", prefillSurvey);
        let prefillSurveyData = prefillSurvey["SurveyData"];

        sender.getAllQuestions().forEach(e => {
          me.survey.setValue(e.name, prefillSurveyData[e.name]);
        });

        // for nav to work
        me.setSurveyName(me.survey.getSurvey().title);

        // why? SurveyQuestionnaires evolve over time..we don't want to 'prefil' keys and values
        // from a previous submission when the current survey has no matching question or answer
        me.survey.setValue("Program", prefillSurvey["Program"]);
        me.survey.setValue("Staff", prefillSurvey["Staff"]);
        me.setCurrentSurvey(me.survey);
        // }
      }
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
    this.clearClientState();
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
