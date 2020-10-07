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
import { mapActions } from "vuex"; //mapGetters, mapState
import * as SurveyVue from "survey-vue";
//import simpleIAJSON from "../simpleIAJSON";
// import FakeEpisodes from "@/FakeEpisodes";
import {
  ROW_KEY,
  PARTITION_KEY,
  SURVEY_TYPE_MAP,
  SURVEY_ID_MAP
} from "@/common/constants";
import {
  generateRowKey,
  serializeDeepObjects,
  deSerializeDeepObjects
} from "@/helper-functions/survey-helpers";
// import { createEpisode } from "@/api/SurveyService";
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
      return !!this.survey.data["Team"];
    }
  },
  methods: {
    ...mapActions(["ADD_SURVEY_DATASERVER", "UPDATE_SURVEY_DATASERVER"]),

    savePartialSurvey() {
      // if the ROW-Key is not set  (program)
      console.log("survey data", this.survey.data);
      this.saveSurvey(this.UPDATE_SURVEY_DATASERVER);
    },
    saveSurvey(saveMethod) {
      //if (!this.$store.state.program) {
      if (!this.isProgramSet) {
        console.error("Progarm not set . Unable to ssave");
        return;
      }
      const surveyTypeCode = SURVEY_TYPE_MAP[this.$route.params.name];
      this.survey.data[ROW_KEY] = generateRowKey(
        //to be cautious, ALWAYS re-generate the rowKey
        surveyTypeCode,
        this.survey.data["Team"]
      );
      const flatSurveyData = serializeDeepObjects(this.survey.data);
      saveMethod(flatSurveyData);
      this.dirtyData = false;
    }
  },
  created() {
    console.log("survey type in component ", this.$route.params.type);

    if (this.$route.params.type === "new") {
      this.survey = new SurveyVue.Model({
        surveyId: this.$route.params.surveyid
      });
      //find data to prefil
      // last survey with this survet name

      // TEMPORARY HACK : works only if there are prior episodes
      this.survey.data = deSerializeDeepObjects(
        this.$store.state["clientData"][this.$route.params.index]
      );
    } else {
      // type: clone or edit

      const surveyIdDict = SURVEY_ID_MAP.find(
        kv => kv.name === this.$route.params.name
      );
      if (!surveyIdDict) {
        console.log("surveyID not found. Survey : ", this.$route.params.name);
        return;
      }
      // QUESTION: unset the program ? this should be set by the staff who logs in ?
      this.survey = new SurveyVue.Model({
        surveyId: surveyIdDict.surveyid
      });
      this.survey.data = deSerializeDeepObjects(
        this.$store.state["clientData"][this.$route.params.index]
      );
    }

    this.survey.data[PARTITION_KEY] = this.$store.currentClientSLK;
    this.survey.data[
      "SurveyMeta"
    ] = `{type: ${this.$route.params.name}, status: "Incomplete"}`;

    const me = this;
    this.survey.onValueChanged.add(() => {
      me.dirtyData = true;
    });
    this.survey.onComplete.add(function(survey, options) {
      console.log("survet options", options);
      console.log("survey data (not saving..just logging) ", survey.data);
      me.survey.data["SurveyMeta"] = {
        type: me.$route.params.name,
        status: "Complete"
      };
      me.saveSurvey(me.ADD_SURVEY_DATASERVER);
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
    /*  const clientDataEnc = sessionStorage.getItem("ClientData");
    this.survey.data[PARTITION_KEY] = this.$store.currentClientSLK;

    if (!clientDataEnc) {
      return;
    }
    //const alldata = atob(clientDataEnc);
    const thisSurvey = JSON.parse(clientDataEnc)[this.$route.params.index];

    const surveyType = this.$route.params.type;
    if (surveyType === "edit") {
      this.survey.data = thisSurvey;
    } else if (this.$route.params.type === "clone") {
      // for completed Surve
      // TODO: if it is the same day - warn the user !

      thisSurvey["SurveyMeta"] =
        '{type: "InitialAssessment","version:": "1.0",status: "Incomplete"}';
      //in the clone case, we want to set a different Row Key

      this.survey.data = thisSurvey;
    } // else -> "Incomplete" :  "edit"
*/
    console.log(" mounted -> survey data", this.survey.data);
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
