<template>
  <div>
    <survey :survey="survey"></survey>
    <button @click.prevent="savePartialSurvey">Save Incomplete Survey</button>
  </div>
</template>

<script>
import { mapActions } from "vuex"; //mapGetters, mapState
import * as SurveyVue from "survey-vue";
import simpleIAJSON from "../simpleIAJSON";
// import { createEpisode } from "@/api/SurveyService";
// eslint-disable-next-line
const Survey = SurveyVue.Survey;
SurveyVue.StylesManager.applyTheme("modern");
const fakeData = {
  PartitionKey: "SLKFT010820012",
  RowKey: "TSS_20200614",
  AODHistory:
    '[{ drug_type: "nicotine", method_of_use: "smokes",  age_first_used: 15,  amount_used: 15,   how_often_used: "weekly",  units_consumed_per_period: "50 - 59",  usage_units: "cigarettes" }]',
  ClientID: "1111",
  "CommencementDate@odata.type": "Edm.DateTime",
  CommencementDate: "2020-06-14T00:00:00Z",
  IDType: "CCARE",
  MethodOfUse: "ingests",
  OtherDrugsOfConcern:
    '[{ how_many_days: 15, drug_type: "opioids", method_of_use: "injects" }]',
  PrincipalDrugOfConcern: "alcohol",
  Staff: "ronan.oconnor",
  SurveyMeta:
    '{type: "InitialAssessment","version:": "1.0",status: "Incomplete"}',
  Team: "SAPPHIRE"
};

export default {
  name: "SurveyComp",
  props: ["currentPage"],
  //emits: ["search-index-built"],
  data() {
    return {
      survey: {}
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
    ...mapActions(["ADD_SURVEY_DATASERVER"]),
    savePartialSurvey() {
      console.log("survey data", this.survey.data);
      this.ADD_SURVEY_DATASERVER(fakeData); //survey.data);
    }
  },
  created() {
    console.log(simpleIAJSON);
    this.survey = new SurveyVue.Model(simpleIAJSON);
    let me = this;
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
