<template>
  <div class="hello">
    <survey :survey="survey"></survey>
  </div>
</template>

<script>
import * as SurveyVue from "survey-vue";
import simpleIAJSON from "../simpleIAJSON";

// eslint-disable-next-line
const Survey = SurveyVue.Survey;
SurveyVue.StylesManager.applyTheme("modern");

export default {
  name: "SurveyComp",
  props: ["currentPage"],
  //emits: ["search-index-built"],
  data() {
    return {
      survey: {},
      surveys: []
    };
  },
  watch: {
    currentPage: function(newVal, oldVal) {
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      this.survey.currentPageNo = newVal;
    }
  },
  created() {
    console.log(simpleIAJSON);
    this.survey = new SurveyVue.Model(simpleIAJSON);
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
    this.survey.data = JSON.parse(alldata)[this.$route.params.index];
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
