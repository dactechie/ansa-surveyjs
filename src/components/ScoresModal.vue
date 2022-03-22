<template>
  <div>
    <ModalComponent v-if="show" @close="close" class="flex overflow-hidden">
      <template v-slot:header>
        <h3>Survey Scores</h3>
      </template>
      <template v-slot:body>
        <DetailsTable
          :keysToShow="currentPageQuestions"
          :allData="allClientData"
          class="text-xs flex-1 overflow-x-auto"
        >
        </DetailsTable>
        <!-- <ul>
          <li class="font-semibold text-sm text-blue-700 pl-4">
            SDS Score : 20
          </li>
          <li class="font-semibold text-sm text-orange-700 pl-4">
            K 10 Score : 30
          </li>
          <li class="font-semibold text-sm text-green-700 pl-4">
            CDS-5 Score : 5
          </li>
        </ul> -->
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
  name: "ScoresModal", // SurveyResponsesModal
  components: { ModalComponent, DetailsTable },
  emits: ["close"],
  props: ["show"],

  methods: {
    ...mapGetters(["getCurrentPageQuestions", "getClientData"]),
    close: function() {
      this.$emit("close");
    }
  },
  data() {
    return {
      allClientData: {}
    };
  },
  computed: {
    currentPageQuestions: function() {
      return this.getCurrentPageQuestions();
    }
  },
  mounted() {
    //this.currentPageQuestions = this.getCurrentPageQuestions();
    this.allClientData = this.getClientData();
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
