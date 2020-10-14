<template>
  <div>
    <div id="body"></div>
    <button class="btn" @click="buildTable">buidl</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DetailsTable",
  props: ["selectedIndex"],
  data() {
    return {
      body: ""
    };
  },
  methods: {
    buildTable() {
      this.body = "";
      console.log("in ITSP", this.selectedIndex);
      console.log("in clientData", this.clientData);
      const surveyData = this.clientData[this.selectedIndex]["SurveyData"];

      // const cols = ["PrincipalDrugOfConcern", "how_many_days", "aod_harms_risks"];

      let bodyHtml = "<table><tr>";
      Object.keys(surveyData).forEach(k => {
        //if (cols.includes(k)) {
        bodyHtml = `${bodyHtml} \n <td> ${surveyData[k]}</td>`;
        //}
      });
      bodyHtml = `${bodyHtml} \n </tr></table>`;
      document.getElementById("body").innerHTML = bodyHtml;
    }
  },
  computed: {
    ...mapState(["clientData"])
  }
};
</script>

<style></style>
