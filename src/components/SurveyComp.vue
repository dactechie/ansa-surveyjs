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
import { PARTITION_KEY } from "@/common/constants";

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
    ...mapMutations(["clearClientState"]),
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
    },
    getSurveyNameFromID(id) {
      // store GETTER
      const foundDict = this.$store.state["surveyNameIDList"].find(s => {
        if (s.surveyid === id) return s.name;
      });
      if (foundDict) {
        return foundDict;
      }
      console.log(" NOT FOUND SURVEY FOR ID>>>", id);
    }
  },
  created() {
    //console.log("survey type in component ", this.$route.params.type);
    this.survey = new SurveyVue.Model({
      surveyId: this.$route.params.surveyid
    });
    const me = this;
    this.survey.onLoadedSurveyFromService.add((sender, options) => {
      console.log("sender ", sender);
      console.log("options", options);
      if (me.$store.state["surveyMode"] !== "new") {
        // QUESTION: unset the program ? this should be set by the staff who logs in ?
        me.survey.data =
          me.$store.state["clientData"][me.$store.state["prefillIndex"]];
        me.survey.data["SurveyMeta"] = {
          type: me.getSurveyNameFromID(me.$route.params.surveyid)
        };
      } else {
        console.log("nothing to prefil ?");
        // fill with last survey with this survet name
      }

      me.survey.data[PARTITION_KEY] = me.$store.state.currentClientSLK;
      console.log(me.survey.data);

      me.survey.data["SurveyMeta"]["status"] = "Incomplete";
    });

    this.survey.onValueChanged.add(() => {
      me.dirtyData = true;
    });
    this.survey.onComplete.add(function(survey, options) {
      console.log("survet options", options);
      //console.log("survey data (not saving..just logging) ", survey.data);
      this.survey.data["SurveyMeta"]["status"] = "Incomplete";

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
