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
import { getCurrentYearMonthDayString, gapInDays } from "@/common/utils";
// import Modal from "@/components/Modal";

//import simpleIAJSON from "../simpleIAJSON";
// import FakeEpisodes from "@/FakeEpisodes";

// eslint-disable-next-line
const Survey = SurveyVue.Survey;
SurveyVue.StylesManager.applyTheme("modern");

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
      "setQuestionsStatus",
      "setSurveyName"
    ]),
    ...mapGetters([
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
      //this.survey.data["SurveyID"] = this.$route.params.surveyid;
      this.ADD_SURVEY_DATASERVER({
        SLK: this.$store.state.currentClientSLK,
        surveyData: this.survey.data,
        surveyId: this.$route.params.surveyid,
        //surveyName: this.$store.state.surveyName,
        status: status
      });
      this.dirtyData = false;
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

      //if there is data to prefill for this type of survey, do that.
      let clientData = me.$store.state["clientData"];
      if (clientData.length === 0) {
        console.warn("Nothing in state, loading from sessionStorage");
        let ssClient = sessionStorage.getItem("ClientData");
        if (!ssClient) {
          //can't prefill
          // for Nav to work
          me.setCurrentSurvey(me.survey);
          return;
        } else {
          clientData = JSON.parse(ssClient);
        }
      }
      if (!this.$store.state.currentClientSLK) {
        if (!clientData || clientData.length === 0) {
          //no SLK found giving up
          me.$router.push("/");
          return;
        }
        console.log("setting slk.....");
        me.setClientSLK(clientData[0]["PartitionKey"]);
      }
      console.log(
        "Current client SLK >>>>>>> ",
        this.$store.state.currentClientSLK
      );
      //in case prefill survey not found ,we still want ..
      me.setCurrentSurvey(me.survey); // for Nav to work

      // for prefill, get the last survey done
      let foundSurvey = clientData[clientData.length - 1];

      if (foundSurvey) {
        // if (foundSurvey["Status"] !== "Complete") {
        //   // Continuing partially completed assessment
        //   // do you want to keep the original assessment date ?
        //   me.modalContent =
        //     "do you want to keep the original assessment date ?";
        //   me.showModal = true;
        // } else {

        // }
        console.log("Last survey that was found in history ", foundSurvey);
        let foundSurveyData = foundSurvey["SurveyData"];

        const gapDays = gapInDays(foundSurveyData["AssessmentDate"]);
        console.log(` Age of lat survey ${Math.round(gapDays)} days`);
        if (gapDays > 90) {
          alert(
            `Last Survey is too old (by ${Math.round(
              gapDays
            )} days) from which to prefill.`
          );
        } else {
          foundSurveyData["AssessmentDate"] = getCurrentYearMonthDayString("-");

          // important that instead of doing this :
          //        // me.survey.data = {
          //   ...foundSurvey["SurveyData"],
          // we do this instead :
          sender.getAllQuestions().forEach(e => {
            me.survey.setValue(e.name, foundSurveyData[e.name]);
          });
          // why? SurveyQuestionnaires evolve over time..we don't want to 'prefil' keys and values
          // from a previous submission when the current survey has no matching question or answer
          me.survey.setValue("Program", foundSurvey["Program"]);
          me.survey.setValue("Staff", foundSurvey["Staff"]);
        }
      }
      if (this.getCurrentSurveyName() === "") {
        // Reload page + if this client had no surveys done with this surveyID
        console.warn(
          "Unable to get survey name, setting it from the SuvrveyJS title"
        );
        me.setSurveyName(me.survey.title);
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

    // this.survey.onLoadedSurveyFromService.add((sender, options) => {
    //   this.survey.onCurrentPageChanged.add(function(surveyModel, pages) {
    //     //page two processing
    //     // ..  ().
    //     //
    //         if (me.clientSideDirtyData) {
    //             console.log(`old data  ${me.currentSurvey}`);
    //             sessionStorage.setItem('CurrentSurvey', JSON.stringify(this.survey.data));
    //             console.log(`new data  ${me.currentSurvey}`);
    //             me.clientSideDirtyData = false;
    //         }
    //         console.log(`old index ${pages.oldCurrentPage}  newIndex ${pages.newCurrentPage}`);
    //     });
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
