<template>
  <div id="sp_100">
    <span class="text-md pl-1 font-semibold"
      >How do you want to lookup the client?</span
    >
    <div class="pt-5 sv-table__cell" id="lookup_type">
      <input
        class="form-radio h-6 w-6"
        type="radio"
        id="by_slk"
        name="lookup_type"
        value="by_slk"
        v-model="picked_type"
      />
      <label class="text-sm pl-2 font-semibold align-top" for="by_slk"
        >By SLK</label
      >
      <br />
      <input
        class="form-radio h-6 w-6"
        type="radio"
        id="by_name"
        name="lookup_type"
        value="by_name"
        v-model="picked_type"
      />
      <label class="text-sm pl-2 font-semibold align-top" for="by_name"
        >By Name, DOB, Gender</label
      >
      <br />
    </div>

    <div class="sv-table__cell" id="by_slk" v-show="picked_type === 'by_slk'">
      <br />
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        id="id_val"
        v-model="idVal"
        placeholder="Enter an SLK"
      />
    </div>

    <div id="by_name" v-show="picked_type === 'by_name'">
      <!-- <label class="sv-table__cell" for="fname">First Name</label> -->
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 font-semibold text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        id="fname"
        placeholder="first name"
        v-model="fname"
      />
      <br />
      <!-- <label class="sv-table__cell" for="lname">Last Name</label> -->
      <input
        class="shadow appearance-none border rounded w-full mt-1 py-2 px-3 font-semibold text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        id="lname"
        placeholder="last name"
        v-model="lname"
      />
      <div class="pt-3">
        <label class="text-sm pl-2 font-semibold" for="dob">DOB</label>
      </div>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 font-semibold text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="date"
        id="dob"
        name="DOB"
        v-model="dob"
        :min="minDate"
        :max="maxDate"
        placeholder="Date of birth"
      />
      <div class="sv-table__cell" id="sex_type">
        <input
          class="form-radio h-6 w-6"
          type="radio"
          id="male"
          v-model="sex_type"
          name="sex"
          value="male"
        />
        <label class="text-sm pl-2 font-semibold align-top" for="male"
          >Male</label
        >
        <br />
        <input
          class="form-radio h-6 w-6"
          type="radio"
          id="female"
          v-model="sex_type"
          name="sex"
          value="female"
        />
        <label class="text-sm pl-2 font-semibold align-top" for="female"
          >Female</label
        >
        <br />
        <input
          class="form-radio h-6 w-6"
          type="radio"
          id="other"
          v-model="sex_type"
          name="sex"
          value="other"
        />
        <label class="text-sm pl-2 font-semibold align-top" for="other"
          >Other</label
        >
        <br />
      </div>
      <label class="text-sm pl-2 font-semibold align-top"> SLK: </label>
      <span class="text-md pl-1 font-mono align-top">{{ slk }}</span>
    </div>

    <div class="m-3">
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
import { getSLK, isValidSLK } from "@/helper-functions/slk";
import { getCurrentYearMonthDay } from "@/common/utils";
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
    const { year, month, day } = getCurrentYearMonthDay();

    return {
      picked_type: "",
      // no_client_found: "",

      idVal: "",
      sex_type: "",
      dob: "",
      fname: "",
      lname: "",
      minDate: new Date(year - 90, month, day),
      maxDate: new Date(year - 15, month, day)
    };
  },
  computed: {
    canFetch: function() {
      if (this.picked_type === "by_slk") {
        return isValidSLK(this.idVal);
      }
      return isValidSLK(this.slk);
    },
    slk: function() {
      if (this.picked_type === "by_slk") {
        return this.idVal;
      }
      if (!this.fname || !this.lname || !this.dob || !this.sex_type) return "";
      return getSLK(this.fname, this.lname, this.dob, this.sex_type);
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
          // FirstName: this.fname,
          // LastName: this.lname,
          // Sex: this.sex_type,
          // DOB: this.dob,
          SLK: this.slk,
          ID: this.idVal
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
