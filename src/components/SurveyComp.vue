<template>
  <div>
    <survey :survey="survey"></survey>
    <button
      v-if="dirtyData && isProgramSet"
      class="bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
      @click.prevent="savePartialSurvey"
    >
      Save Incomplete Survey
    </button>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex"; //mapGetters, mapState
import * as SurveyVue from "survey-vue";
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
      dirtyData: false
      // surveys: []
    };
  },
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
    ...mapMutations(["clearClientState", "setCurrentSurvey"]),
    savePartialSurvey() {
      // if the ROW-Key is not set  (program)
      console.log("survey data", this.survey.data);
      this.survey.data["Status"] = "Incomplete";
      this.saveSurvey(
        this.ADD_SURVEY_DATASERVER,
        "Incomplete",
        this.$route.params.surveyid
      );
    },
    saveSurvey(asyncSaveMethod, status, surveyId) {
      if (!this.isProgramSet) {
        console.error("Progarm not set . Unable to ssave");
        return;
      }
      //this.survey.data["SurveyID"] = this.$route.params.surveyid;
      asyncSaveMethod({
        SLK: this.$store.state.currentClientSLK,
        surveyData: this.survey.data,
        surveyId: surveyId,
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
      if (me.$store.state["surveyMode"] !== "new") {
        // QUESTION: unset the program ? this should be set by the staff who logs in ?
        const currentSurvey =
          me.$store.state["clientData"][me.$store.state["prefillIndex"]];

        //TODO: move this to a  vuex action for GET or SurveyService
        if (!currentSurvey) {
          console.log("Could not find survey. reload ?");
          //TODO Add toast
        } else {
          Object.entries(currentSurvey["SurveyData"]).forEach(([k, v]) => {
            currentSurvey[k] = v;
          });
          delete currentSurvey["SurveyData"];

          // {
          //   me.survey.data[mk] = currentSurvey[mk];
          // });
          me.survey.data = { ...currentSurvey };
        }
      } else {
        console.log("nothing to prefil ?");
      }
      me.setCurrentSurvey(me.survey); // for Nav to work
    });

    this.survey.onValueChanged.add(() => {
      me.dirtyData = true;
    });
    this.survey.onComplete.add(function(survey, options) {
      console.log("survet options", options);
      //console.log("survey data (not saving..just logging) ", survey.data);
      //me.survey.data["Status"] = "Complete";

      me.saveSurvey(
        me.ADD_SURVEY_DATASERVER,
        "Complete",
        me.$route.params.surveyid
      );
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
<style scoped>
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
