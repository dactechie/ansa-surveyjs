<template>
  <div>
    <ModalComponent v-if="show" @close="close">
      <template v-slot:header>
        <h3>Survey Responses</h3>
      </template>
      <template v-slot:body>
        <DetailsTable
          v-if="myData && selectedIndex >= 0"
          :selectedIndex="selectedIndex"
        >
        </DetailsTable>
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
import DetailsTable from "@/components/DetailsModal/DetailsTable";

export default {
  name: "SurveyResponsesModal",
  components: { ModalComponent, DetailsTable },
  emits: ["close"],
  props: ["show", "selectedIndex"],

  methods: {
    ...mapGetters(["getClientData"]),
    close: function() {
      this.$emit("close");
    }
  },
  computed: {
    myData() {
      let data = this.getClientData();
      if (!data || data.length < 1) return undefined;

      let colHeaders = [
        // "PartitionKey",
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
        // c["Timestamp"] = getFriendlyTimestampString(c["Timestamp"]);
        let td = colHeaders.map(h => c[h]);
        tableVals.push(td);
      });

      return tableVals;
    }
    // clientData:  this.getClientData()
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
