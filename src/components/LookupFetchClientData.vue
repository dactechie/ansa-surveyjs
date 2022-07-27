<template>
  <div id="sp_100">
    <div class="sv-table__cell" id="by_slk">
      <br />
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-2xl font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        id="id_val"
        v-model="slk"
        placeholder="Enter an SLK"
      />
    </div>

    <div class="mt-10 pl-3 md:pl-10">
      <button
        :disabled="!canFetch"
        @click.prevent="fetchClientDataByLookupValues"
        class="bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6"
      >
        <span class="mx-auto">Fetch Client Data</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { isValidSLK } from "@/helper-functions/slk";
import {
  SLK_LENGTH,
  MODE_CLIENT_DATA_SET,
  MODE_EMPTY_CLIENT_DATA
} from "@/common/constants";
export default {
  name: "LookupFetchClientData",
  emits: ["search-initiated", "mode-updated"],
  props: ["mode"],
  data() {
    return {
      // idVal: "",
      slk: ""
    };
  },
  computed: {
    canFetch: function() {
      return isValidSLK(this.slk);
    }
  },
  methods: {
    ...mapActions(["GET_CLIENT_DATA_BYSLK", "GET_CLIENT_DATA_BYID"]),
    ...mapMutations(["setClientSLK", "clearState"]),

    async fetchClientDataByLookupValues() {
      let result = {};
      sessionStorage.removeItem("ClientData");
      this.clearState();
      let unableToFindWithIds = "";

      // doing this allows us to show the "Create New Survey"
      // buttons for a client that never existed in the DB.
      this.setClientSLK(this.slk);
      this.$emit("search-initiated");
      result = await this.GET_CLIENT_DATA_BYSLK(this.slk);
      unableToFindWithIds = `SLK : ${this.slk}`;

      if (this.slk.length === SLK_LENGTH) {
        // get action may set it to ""
        this.setClientSLK(this.slk);
        console.log("setting SLK ", this.$store.state.currentClientSLK);
      }
      //this.no_client_found = `Unable to find any results for client with ${this.idType}: ${this.idVal}`;
      this.$emit("mode-updated", {
        mode:
          (await result) && result.length > 0
            ? MODE_CLIENT_DATA_SET
            : MODE_EMPTY_CLIENT_DATA,
        text: `Unable to find any results for client with ${unableToFindWithIds}`,
        // WARNING : These keys need to be same as the SurveyJS field "Name"s
        data: {
          SLK: this.slk
        }
      });
    }
    // }
  }
};
</script>
<style scoped>
button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
</style>
