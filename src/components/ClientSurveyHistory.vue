<template>
  <div class="sv-page sv-body__page">
    <button
      class="bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-red-300 hover:border-red-400 hover:bg-red-300 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
      @click="clearLookupResults"
    >
      Clear Results
    </button>
    <!-- <ITSPCompareModal
      v-if="showModal"
      :selectedIndex="selectedIndex"
      @close="showModal = false"
    ></ITSPCompareModal> -->

    <DetailsTable :selectedIndex="selectedIndex"></DetailsTable>
    <!-- https://tailwindcomponents.com/component/responsive-table -->
    <table class="table-auto" v-if="clientData">
      <thead>
        <!-- <th>SLK</th> -->
        <th>
          Last Modified
        </th>
        <th>
          Team
        </th>
        <th>
          Staff
        </th>

        <!-- <th class="sv-table__cell sv-table__cell--header">
          Principal Drug Of Concern
        </th> -->
        <th>
          Status
        </th>
        <th>
          Survey Name
        </th>
        <th
          class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
        >
          Action
        </th>
      </thead>
      <tbody>
        <tr
          v-for="(k, index) of myData.data"
          :key="index"
          @click="showModalWithIndex(index)"
        >
          <td
            v-for="(v, indx) of Object.values(k)"
            :key="indx"
            class="border px-4 py-2"
          >
            <center>{{ v }}</center>
          </td>
          <td>
            <!-- {{  myData.actions[index] }} -->
            <button
              class="btn btn--active"
              @click.prevent="
                cloneOrEditSurvey(
                  myData.actions[index],
                  myData.data[index][4],
                  index
                )
              "
            >
              {{ myData.actions[index] }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div flex v-for="survey in surveys" :key="survey.id">
      <router-link
        class="bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
        :to="{
          name: 'SurveyView',
          params: { type: 'new', surveyid: survey.surveyid }
        }"
        @click.native="setSurveyName(survey.name)"
      >
        Create New {{ survey.name }}</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
// eslint-disable-line no-unused-vars
// import ITSPCompareModal from "@/components/DetailsModal/ITSPCompareModal";
import DetailsTable from "@/components/DetailsModal/DetailsTable";

export default {
  name: "ClientSurveyHistory",
  components: {
    //ITSPCompareModal
    DetailsTable
  },
  props: ["clientData"],
  data() {
    return {
      surveys: this.$store.state["surveyNameIDList"],
      showModal: false,
      selectedIndex: 0
    };
  },
  computed: {
    // QUESTION: Why is this a computed property ???????
    myData() {
      let colHeaders = [
        // "PartitionKey",
        "Timestamp",
        "Program",
        "Staff",
        "Status",
        "SurveyName"
        //"PrincipalDrugOfConcern"
      ];

      const actions = this.clientData.map(
        e => (e["Status"] === "Complete" ? "clone" : "edit") // only the last one can be cloned
      );
      let tableVals = [];
      this.clientData.forEach(function(c) {
        let td = colHeaders.map(h => c[h]);
        //td["Survey Type"] = c["SurveyName"];
        tableVals.push(td);
      });

      return { data: tableVals, actions: actions };
    }
  },
  methods: {
    // setSurveyName(surveyName) {
    //   this.$store.state["surveyName"] = surveyName;
    // },
    ...mapMutations(["setSurveyName"]),

    cloneOrEditSurvey(cloneOrEdit, surveyName, selectedIndexToPrefillFrom) {
      this.$store.state["surveyMode"] = cloneOrEdit;
      this.$store.state["prefillIndex"] = selectedIndexToPrefillFrom;
      const foundSurvey = this.surveys.find(s => s.name === surveyName); // downloaded from survey.js

      if (!foundSurvey) {
        console.log(" not found survey: ", surveyName);
        return;
      }
      this.setSurveyName(surveyName);

      this.$router.push({
        name: "SurveyView",
        params: { surveyid: foundSurvey.surveyid }
      });
    },
    clearLookupResults() {
      this.$emit("clear-lookup-results");
    },

    showModalWithIndex(index) {
      this.selectedIndex = index;
      this.showModal = true;
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
  background: rgb(230, 227, 217);
}
tbody tr:nth-child(odd) {
  background: #eee;
}
/* col:nth-child(2) {
  background: yellow; 
} */
</style>
