<template>
  <div id="questionDescriptionPopup">
    <ModalComponent v-if="show && myData" @close="close">
      <template v-slot:header>
        <h3>Previous values</h3>
      </template>
      <template v-slot:body>
        <table class="mt-0 mx-5">
          <thead>
            <!-- <th>SLK</th> -->
            <th class="bg-teal-100 text-gray-700 border border-gray-300">
              Assessment Date
            </th>
            <th class="bg-teal-100 text-gray-700 border border-gray-300">
              Assessment Type
            </th>
            <!-- <th class="bg-teal-100 text-gray-700 border border-gray-300">
            
              Program
            </th> -->

            <th class="bg-teal-100 text-gray-700 border border-gray-300">
              Survey Name
            </th>
            <th class="bg-teal-100 text-gray-700 border border-gray-300">
              Question Values
            </th>
          </thead>
          <tbody>
            <tr v-for="(k, index) of myData" :key="index">
              <td
                v-for="(v, indx) of Object.values(k)"
                :key="indx"
                class="border px-4 py-2"
              >
                {{ v }}
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <DetailsTable :tableData="myData"> </DetailsTable> -->
      </template>
      <template v-slot:footer>
        <button
          class="modal-default-button font-semibold text-red-500"
          @click="close()"
        >
          Close
        </button>
      </template>
    </ModalComponent>
  </div>
</template>

<script>
// / / eslint-disable-line no-unused-vars
import { mapGetters } from "vuex";
import ModalComponent from "./ModalComponent";
// import DetailsTable from "@/components/DetailsModal/DetailsTable";

export default {
  name: "ResponseHistoryModal",
  components: { ModalComponent },
  emits: ["close"],
  props: ["show", "questionName"],

  methods: {
    ...mapGetters(["getClientData"]),
    close: function() {
      this.$emit("close");
    }
  },
  computed: {
    myData() {
      const tableVals = [];

      let colHeaders = [
        "AssessmentDate",
        "AssessmentType",
        "SurveyName",
        this.questionName
      ];
      const data = this.getClientData();

      data.forEach(function(c) {
        let d = { ...c, ...c["SurveyData"] };
        let td = {};
        colHeaders.forEach(h => (td[h] = d[h]));
        tableVals.push(td);
      });

      return tableVals;
    }
  }
};
</script>

<style scoped>
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}
</style>
