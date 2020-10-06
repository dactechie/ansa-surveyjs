<template>
  <div>
    <survey :survey="survey"></survey>
    <button
      v-if="dirtyData"
      class="bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
      @click.prevent="savePartialSurvey"
    >
      Save Incomplete Survey
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex"; //mapGetters, mapState
import * as SurveyVue from "survey-vue";
import simpleIAJSON from "../simpleIAJSON";
import FakeEpisodes from "@/FakeEpisodes";
import { ROW_KEY } from "@/common/constants";
import { generateRowKey } from "@/helper-functions/survey-helpers";
// import { createEpisode } from "@/api/SurveyService";
// eslint-disable-next-line
const Survey = SurveyVue.Survey;
SurveyVue.StylesManager.applyTheme("modern");

const fakeData = FakeEpisodes[0];

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
  methods: {
    ...mapActions(["ADD_SURVEY_DATASERVER", "UPDATE_SURVEY_DATASERVER"]),
    savePartialSurvey() {
      console.log("survey data", this.survey.data);
      this.UPDATE_SURVEY_DATASERVER(fakeData); //survey.data);
      this.dirtyData = false;
    }
  },
  created() {
    console.log(simpleIAJSON);
    this.survey = new SurveyVue.Model(simpleIAJSON);
    let me = this;
    this.survey.data["SurveyMeta"] =
      '{type: "InitialAssessment","version:": "1.0",status: "Incomplete"}';

    this.survey.onValueChanged.add(() => {
      me.dirtyData = true;
    });

    this.survey.onComplete.add(function(survey, options) {
      // if (me.isNewSurvey) {
      //   console.log("new survey");
      // } else {
      //   console.log(" NOT A new survey");
      // }
      console.log("survet options", options);
      console.log("survey data", survey.data);
      fakeData["SurveyMeta"] =
        '{type: "InitialAssessment","version:": "1.0",status: "Complete"}';
      me.ADD_SURVEY_DATASERVER(fakeData); //survey.data);
      //createEpisode(survey.data);
      //addUpdate(survey.data);
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
    const clientDataEnc = sessionStorage.getItem("ClientData");
    if (!clientDataEnc) return;
    const alldata = atob(clientDataEnc);
    const thisSurvey = JSON.parse(alldata)[this.$route.params.index];
    const surveyType = this.$route.params.type;
    //const rowKey = getRowKey(this.survey.title);
    if (surveyType === "edit") {
      // don't re-generate the Row Key
    } else if (
      // this.$route.params.type !== undefined &&
      this.$route.params.type === "clone" // this is done when a survey was "Complete"
    ) {
      // TODO: if it is the same day - warn the user !

      thisSurvey["SurveyMeta"] =
        '{type: "InitialAssessment","version:": "1.0",status: "Incomplete"}';
      //in the clone case, we want to set a different Row Key
      thisSurvey[ROW_KEY] = generateRowKey(this.survey.title);
      this.survey.data = thisSurvey;
    } // else -> "Incomplete" :  "edit"

    console.log("survey data", this.survey.data);
  },
  beforeDestroy() {
    sessionStorage.removeItem("ClientData");
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
