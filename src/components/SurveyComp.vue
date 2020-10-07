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
import { PARTITION_KEY, SURVEY_ID_MAP } from "@/common/constants";

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
    saveSurvey(asyncSaveMethod) {
      if (!this.isProgramSet) {
        console.error("Progarm not set . Unable to ssave");
        return;
      }
      asyncSaveMethod(
        this.survey.data,
        this.$route.params.name,
        this.survey.data["Team"]
      );
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
      this.survey.data = this.$store.state["clientData"][
        this.$route.params.index
      ];
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
      this.survey.data = this.$store.state["clientData"][
        this.$route.params.index
      ];
    }

    this.survey.data[PARTITION_KEY] = this.$store.currentClientSLK;
    this.survey.data["SurveyMeta"] = {
      type: this.$route.params.name,
      status: "Incomplete"
    };

    const me = this;
    this.survey.onValueChanged.add(() => {
      me.dirtyData = true;
    });
    this.survey.onComplete.add(function(survey, options) {
      console.log("survet options", options);
      //console.log("survey data (not saving..just logging) ", survey.data);
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
