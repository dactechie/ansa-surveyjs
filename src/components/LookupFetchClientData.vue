<template>
  <!-- <div class="sv-root-modern"> -->

  <div class="sv-page sv-body__page" id="sp_100">
    <span>How do you want to lookup the client ?</span>
    <div class="sv-table__cell" id="lookup_type">
      <input
        class="sv-table__cell"
        type="radio"
        id="by_id"
        name="lookup_type"
        value="by_id"
        v-model="picked_type"
      />
      <label class="sv-table__cell" for="by_id">By ID</label>
      <br />
      <input
        class="sv-table__cell"
        type="radio"
        id="by_name"
        name="lookup_type"
        value="by_name"
        v-model="picked_type"
      />
      <label class="sv-table__cell" for="by_name">By Name, DOB, Gender</label>
      <br />
    </div>
    <!-- <span class="sv-table__cell">Picked: {{ picked_type }}</span> -->

    <p></p>

    <div class="sv-table__cell" id="by_id" v-show="picked_type === 'by_id'">
      <input
        class="sv-table__cell"
        type="radio"
        id="slk"
        name="lookup_id"
        placeholder="slk_id"
      />
      <label class="sv-table__cell" for="slk_id">SLK</label>
      <br />
      <input
        class="sv-table__cell"
        type="radio"
        id="CCARE"
        name="lookup_id"
        placeholder="ccare_id"
      />
      <label class="sv-table__cell" for="ccare_id">CCARE ID</label>
      <br />
      <input
        class="sv-table__cell"
        type="radio"
        id="MCARE"
        name="lookup_id"
        placeholder="mcare_id"
      />
      <label class="sv-table__cell" for="mcare_id">MCARE ID</label>
      <p>
        <input
          class="sv-table__cell"
          type="text"
          id="id_val"
          value="ALLFT210719811"
          placeholder="Enter an ID"
        />
      </p>
    </div>

    <div class="sv-table__cell" id="by_name" v-show="picked_type === 'by_name'">
      <label class="sv-table__cell" for="fname">First Name</label>
      <input
        class="sv-table__cell"
        type="text"
        id="fname"
        name="lookup_name"
        placeholder="first name"
        value="Aftab"
      />

      <label class="sv-table__cell" for="lname">Last Name</label>
      <input
        class="sv-table__cell"
        type="text"
        id="lname"
        name="lookup_name"
        placeholder="last name"
        value="Jalal"
      />

      <label class="sv-table__cell" for="dob">DOB</label>
      <input
        class="sv-table__cell"
        type="date"
        id="dob"
        name="sex"
        placeholder="Date of birth"
        value="21071981"
      />
      <div class="sv-table__cell" id="sex_type">
        <input
          class="sv-table__cell"
          type="radio"
          id="male"
          name="sex"
          value="male"
        />
        <label class="sv-table__cell" for="male">Male</label>
        <br />
        <input
          class="sv-table__cell"
          type="radio"
          id="female"
          name="sex"
          value="female"
        />
        <label class="sv-table__cell" for="female">Female</label>
        <br />
        <input
          class="sv-table__cell"
          type="radio"
          id="other"
          name="sex"
          value="other"
        />
        <label class="sv-table__cell" for="other">Other</label>
        <br />
      </div>
    </div>

    <button
      class="sv-table__cell"
      @click.prevent="fetchClientDataByLookupValues"
    >
      Fetch Client Data
    </button>
    <span class="sv-table__cell" v-if="mode == 0"> {{ no_client_found }}</span>
  </div>
</template>

<script>
// import  LookupByID from '@/components/LookupByID.vue';
// import  LookupByNameDOB from '@/components/LookupByNameDOB.vue';
import { getLookupDetails } from "@/helper-functions/dom";
//import { getBySLK, getByIDAndType } from "../api/TableStorageService";
import { getBySLK, getByIDAndType } from "../api/SurveyService";

// import fetchClientData from "../api/SurveyService";
export default {
  name: "LookupFetchClientData",
  emits: ["survey-data-received", "mode-updated"],
  props: ["mode"],
  data() {
    return {
      picked_type: "",
      no_client_found: ""
    };
  },
  methods: {
    async fetchClientDataByLookupValues() {
      const { ClientID, IDType, errors } = getLookupDetails(this.picked_type);
      if (errors) {
        console.log("Error getting lookup details ", errors);
        return;
      }
      let result = {};
      if (IDType === "slk") {
        result = await getBySLK(ClientID);
      } else {
        console.table({ ClientID, IDType });
        result = await getByIDAndType(ClientID, IDType);
      }
      //if ((await result) && result.entries && result.entries.length > 0) {
      if (result && result.value && result.value.length > 0) {
        console.log(" vale ", result.value);
        this.$emit("survey-data-received", result.value);
      } else {
        this.no_client_found = `Unable to find any results for client with ${IDType}: ${ClientID}`;
        this.$emit("mode-updated", 0);
      }
    }
  }
};
</script>
