<template>
  <div class="sv-page sv-body__page" id="sp_100">
    <span class="font-semibold">How do you want to lookup the client ?</span>
    <div class="sv-table__cell" id="lookup_type">
      <input
        class="form-radio h-6 w-6"
        type="radio"
        id="by_id"
        name="lookup_type"
        value="by_id"
        v-model="picked_type"
      />
      <label class="sv-table__cell" for="by_id">By ID</label>
      <br />
      <input
        class="form-radio h-6 w-6"
        type="radio"
        id="by_name"
        name="lookup_type"
        value="by_name"
        v-model="picked_type"
      />
      <label class="sv-table__cell" for="by_name">By Name, DOB, Gender</label>
      <br />
    </div>
    <p></p>

    <div class="sv-table__cell" id="by_id" v-show="picked_type === 'by_id'">
      <input
        class="form-radio h-6 w-6"
        type="radio"
        id="slk"
        value="slk"
        name="lookup_id"
        v-model="idType"
        placeholder="slk_id"
      />
      <label class="sv-table__cell" for="slk_id">SLK</label>
      <br />
      <input
        class="form-radio h-6 w-6"
        type="radio"
        id="CCARE"
        name="lookup_id"
        value="CCARE"
        v-model="idType"
        placeholder="ccare_id"
      />
      <label class="sv-table__cell" for="ccare_id">CCARE ID</label>
      <br />
      <input
        class="form-radio h-6 w-6"
        type="radio"
        id="MCARE"
        name="lookup_id"
        value="MCARE"
        v-model="idType"
        placeholder="mcare_id"
      />
      <label class="sv-table__cell" for="mcare_id">MCARE ID</label>
      <br />
      <input
        class="sv-table__cell"
        type="text"
        id="id_val"
        v-model="idVal"
        value="ALLFT210719811"
        placeholder="Enter an ID"
      />
    </div>

    <div class="sv-table__cell" id="by_name" v-show="picked_type === 'by_name'">
      <!-- <label class="sv-table__cell" for="fname">First Name</label> -->
      <input
        class="sv-table__cell"
        type="text"
        id="fname"
        placeholder="first name"
        value="Aftab"
        v-model="fname"
      />
      <br />
      <!-- <label class="sv-table__cell" for="lname">Last Name</label> -->
      <input
        class="sv-table__cell"
        type="text"
        id="lname"
        placeholder="last name"
        value="Jalal"
        v-model="lname"
      />
      <br />
      <label for="dob">DOB</label>
      <input
        type="date"
        id="dob"
        name="DOB"
        v-model="dob"
        :min="minDate"
        :max="maxDate"
        placeholder="Date of birth"
        value="21071981"
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
        <label class="sv-table__cell" for="male">Male</label>
        <br />
        <input
          class="form-radio h-6 w-6"
          type="radio"
          id="female"
          v-model="sex_type"
          name="sex"
          value="female"
        />
        <label class="sv-table__cell" for="female">Female</label>
        <br />
        <input
          class="form-radio h-6 w-6"
          type="radio"
          id="other"
          v-model="sex_type"
          name="sex"
          value="other"
        />
        <label class="sv-table__cell" for="other">Other</label>
        <br />
      </div>
      <br />
      SLK : {{ slk }}
    </div>

    <div class="m-3">
      <button
        :disabled="!canFetch"
        @click.prevent="fetchClientDataByLookupValues"
        class="bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
      >
        <span class="mx-auto">Fetch Client Data</span>
      </button>
    </div>
    <span class="sv-table__cell" v-if="mode == 0"> {{ no_client_found }}</span>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getSLK } from "@/helper-functions/slk";
import { getCurrentYearMonthDay } from "@/common/utils";
import { SLK_LENGTH, MODE_EMPTY_CLIENT_DATA } from "@/common/constants";
export default {
  name: "LookupFetchClientData",
  emits: ["survey-data-received", "mode-updated"],
  props: ["mode"],
  data() {
    const { year, month, day } = getCurrentYearMonthDay();

    return {
      picked_type: "",
      no_client_found: "",
      idType: "",
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
      if (this.picked_type === "by_id") {
        if (this.idType === "slk") return this.idVal.length === SLK_LENGTH;
        else return this.idVal.length > 1;
      }
      return this.slk.length === SLK_LENGTH;
    },
    slk: function() {
      if (this.picked_type === "by_id") {
        return this.idVal;
      }
      if (!this.fname || !this.lname || !this.dob || !this.sex_type) return "";
      return getSLK(this.fname, this.lname, this.dob, this.sex_type);
    }
  },
  methods: {
    ...mapActions(["GET_CLIENT_DATA_BYSLK", "GET_CLIENT_DATA_BYID"]),

    async fetchClientDataByLookupValues() {
      let result = {};

      if (this.picked_type === "by_name" || this.idType === "slk") {
        result = await this.GET_CLIENT_DATA_BYSLK(this.slk);
      } else {
        result = await this.GET_CLIENT_DATA_BYID(this.idVal, this.idType);
      }

      if ((await result) && result.length > 0) {
        console.log(" vale ", result);
        this.$emit("survey-data-received", result);
      } else {
        this.no_client_found = `Unable to find any results for client with ${this.idType}: ${this.idVal}`;
        this.$emit("mode-updated", MODE_EMPTY_CLIENT_DATA);
      }
    }
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
