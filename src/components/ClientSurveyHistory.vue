<template>
  <div class="sv-page sv-body__page">
    <button
      class="bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-red-300 hover:border-red-400 hover:bg-red-300 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
      @click="clearLookupResults"
    >
      Clear
    </button>
    <table class="table" v-if="clientData">
      <thead>
        <!-- <th>SLK</th> -->
        <th class="sv-table__cell sv-table__cell--header">Team</th>
        <th class="sv-table__cell sv-table__cell--header">Staff</th>
        <th class="sv-table__cell sv-table__cell--header">Commencement Date</th>
        <th class="sv-table__cell sv-table__cell--header">
          Principal Drug Of Concern
        </th>
        <th class="sv-table__cell sv-table__cell--header">Status</th>
        <th class="sv-table__cell sv-table__cell--header">Survey Type</th>
        <th class="sv-table__cell sv-table__cell--header">Action</th>
      </thead>
      <tbody>
        <tr v-for="(k, index) of myData.data" :key="index">
          <td
            v-for="(v, indx) of Object.values(k)"
            :key="indx"
            class="sv-table__cell"
          >
            <center>{{ v }}</center>
          </td>
          <td>
            <!-- {{  myData.actions[index] }} -->
            <button
              @click.prevent="
                openSurvey(myData.actions[index], k['Survey Type'], index)
              "
            >
              {{ myData.actions[index] }}
            </button>
            <!-- <router-link
              :to="{
                name: 'SurveyView',
                params: {
                  type: myData.actions[index],
                  index: index,
                  name: k['Survey Type']
                }
              }"
              tag="button"
            >
              {{ myData.actions[index] }}</router-link
            > -->
          </td>
        </tr>
      </tbody>
    </table>
    <div v-for="survey in surveys" :key="survey.id">
      <router-link
        class="bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
        :to="{
          name: 'SurveyView',
          params: { type: 'new', surveyid: survey.surveyid }
        }"
      >
        Create New {{ survey.name }}</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientSurveyHistory",
  props: ["clientData"],
  data() {
    return {
      surveys: this.$store.state["surveyNameIDList"]
    };
  },
  computed: {
    // QUESTION: Why is this a computed property ???????
    myData() {
      let colHeaders = [
        // "PartitionKey",
        "Team",
        "Staff",
        "CommencementDate",
        "PrincipalDrugOfConcern"
      ];
      const srvyMeta = this.clientData.map(e => {
        /// ANSWER :computed property because client data is set in an async way ?
        return e["SurveyMeta"];
      });
      const actions = srvyMeta.map(
        e => (e["status"] === "Complete" ? "clone" : "edit") // only the last one can be cloned
      );
      let tableVals = [];
      this.clientData.forEach(function(c, i) {
        let td = colHeaders.map(h => c[h]);
        td["Status"] = srvyMeta[i]["status"];
        td["Survey Type"] = srvyMeta[i]["type"];
        tableVals.push(td);
      });

      return { data: tableVals, actions: actions };
    }
  },
  methods: {
    // setSurveyName(surveyName) {
    //   this.$store.state["surveyName"] = surveyName;
    // },
    openSurvey(newEditOrClone, surveyName, selectedIndexToPrefillFrom) {
      this.$store.state["surveyMode"] = newEditOrClone;
      this.$store.state["prefillIndex"] = selectedIndexToPrefillFrom;
      const foundSurvey = this.surveys.find(s => s.name === surveyName);

      if (!foundSurvey) {
        console.log(" not found survey: ", surveyName);
        return;
      }
      this.$router.push({
        name: "SurveyView",
        params: { surveyid: foundSurvey.surveyid }
      });
    },
    clearLookupResults() {
      this.$emit("clear-lookup-results");
    }
  }
};
</script>
<style scoped>
/* https://css-tricks.com/complete-guide-table-element/ */

th {
  background: #00cccc;
  color: #fff;
  text-transform: uppercase;
  font-size: 12px;
}

tr:hover td {
  /* th:hover also if you wish */
  background: yellow;
}
tbody tr:nth-child(odd) {
  background: #eee;
}
/* col:nth-child(2) {
  background: yellow; 
} */
</style>
