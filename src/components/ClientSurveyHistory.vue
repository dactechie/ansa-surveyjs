<template>
  <div>
    <!-- <button
      class="bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-red-300 hover:border-red-400 hover:bg-red-300 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
      @click="clearLookupResults"
    >
      Clear Results
    </button> -->
    <!-- <ITSPCompareModal
      v-if="showModal"
      :selectedIndex="selectedIndex"
      @close="showModal = false"
    ></ITSPCompareModal> -->

    <!-- https://tailwindcomponents.com/component/responsive-table -->
    <table class="mt-0 mx-5">
      <thead>
        <!-- <th>SLK</th> -->
        <th class="bg-teal-100 text-gray-700 border border-gray-300">
          Assessment Date
        </th>
        <th class="bg-teal-100 text-gray-700 border border-gray-300">
          Last Modified
        </th>

        <th class="bg-teal-100 text-gray-700 border border-gray-300">Team</th>
        <th class="bg-teal-100 text-gray-700 border border-gray-300">Staff</th>
        <th class="bg-teal-100 text-gray-700 border border-gray-300">Status</th>
        <th
          class="text-center font-bold bg-teal-100 text-gray-700 border border-gray-300 hidden lg:table-cell"
        >
          Survey Name
        </th>
      </thead>
      <tbody>
        <tr
          v-for="(k, index) of myData"
          :key="index"
          @click="showModalWithIndex(index)"
          class="cursor-pointer"
          :class="index == selectedIndex ? 'bg-red-300' : ''"
        >
          <td
            v-for="(v, indx) of Object.values(k)"
            :key="indx"
            class="border px-4 py-2"
          >
            <center>{{ v }}</center>
          </td>
        </tr>
      </tbody>
    </table>
    <SurveyResponsesModal
      v-if="myData && selectedIndex >= 0"
      :selectedIndex="selectedIndex"
      :show="showModal"
      @close="showModal = false"
    ></SurveyResponsesModal>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import SurveyResponsesModal from "@/components/SurveyResponsesModal";
import { getFriendlyTimestampString } from "@/common/utils";

export default {
  name: "ClientSurveyHistory",
  components: {
    SurveyResponsesModal
  },

  data() {
    return {
      showModal: false,
      selectedIndex: -1
    };
  },
  computed: {
    // QUESTION: Why is this a computed property ???????
    myData() {
      let data = this.getClientData();
      if (!data || data.length < 1) return undefined;

      let colHeaders = [
        // "PartitionKey",
        // "AssessmentDate",
        "Timestamp",
        "Program",
        "Staff",
        "Status",
        "SurveyName"
        //"PrincipalDrugOfConcern"
      ];

      let tableVals = [];

      console.log("client data in histry ", data);

      data.forEach(function(c) {
        c["Timestamp"] = getFriendlyTimestampString(c["Timestamp"]);

        let td = colHeaders.map(h => c[h]);

        const assdate = getFriendlyTimestampString(
          new Date(Date.parse(c["SurveyData"]["AssessmentDate"]))
        );

        td.unshift(assdate.substr(0, 10));

        tableVals.push(td);
      });

      return tableVals;
    }
  },
  methods: {
    // setSurveyName(surveyName) {
    //   this.$store.state["surveyName"] = surveyName;
    // },
    ...mapGetters(["getClientData"]),
    ...mapMutations(["setSurveyName"]),

    // cloneOrEditSurvey(cloneOrEdit, surveyName, selectedIndexToPrefillFrom) {
    //   this.$store.state["surveyMode"] = cloneOrEdit;
    //   this.$store.state["prefillIndex"] = selectedIndexToPrefillFrom;
    //   const foundSurvey = this.surveys.find(s => s.name === surveyName); // downloaded from survey.js

    //   if (!foundSurvey) {
    //     console.log(" not found survey: ", surveyName);
    //     return;
    //   }
    //   this.setSurveyName(surveyName);

    //   this.$router.push({
    //     name: "SurveyView",
    //     params: { surveyid: foundSurvey.surveyid }
    //   });
    // },
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
  background: #35b6b6;
  color: #fff;
}

tr:hover td {
  background: rgb(228, 226, 219);
}
tbody tr:nth-child(odd) {
  background: #eee;
}
/* col:nth-child(2) {
  background: yellow; 
} */
</style>
