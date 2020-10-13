<template>
  <div class="sv-page sv-body__page">
    <label class="sv-table__cell" for="fname">First Name</label>
    <input
      class="sv-table__cell"
      type="text"
      id="fname"
      placeholder="first name"
      v-model="fname"
    />
    <br />
    <label class="sv-table__cell" for="lname">Last Name</label>
    <input
      class="sv-table__cell"
      type="text"
      id="lname"
      placeholder="last name"
      v-model="lname"
    />
    <br />
    <label class="sv-table__cell" for="dob">DOB</label>
    <input
      class="sv-table__cell"
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
    <!-- sex -->
    <div class="m-3">
      <button
        :disabled="!slk"
        @click.prevent="checkAndStartRego"
        class="bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
      >
        <span class="mx-auto">Start Registration</span>
      </button>
    </div>
    <br />
    SLK : {{ slk }}
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getCurrentYearMonthDay } from "@/common/utils";
import { getSLK } from "@/helper-functions/slk";

export default {
  name: "NewClientStart",

  data() {
    const { year, month, day } = getCurrentYearMonthDay();

    return {
      sex_type: "female",
      dob: "21071999",
      fname: "Aftab",
      lname: "Jackson",
      minDate: new Date(year - 90, month, day),
      maxDate: new Date(year - 15, month, day)
    };
  },
  computed: {
    slk: function() {
      if (this.picked_type === "by_id") {
        return this.idVal;
      }
      if (!this.fname || !this.lname || !this.dob || !this.sex_type) return "";
      return getSLK(this.fname, this.lname, this.dob, this.sex_type);
    }
  },
  mounted() {
    this.clearClientState();
    sessionStorage.clear();
  },
  methods: {
    ...mapMutations(["setClientSLK", "clearClientState", "setSurveyName"]),
    //...mapGetters(["getSurveyIDForName"]),
    checkAndStartRego() {
      console.log("can start rego..");
      this.$store.state["surveyMode"] = "new";
      this.setClientSLK(this.slk);
      const rego_survey = this.$store.state.surveyNameIDList.find(
        id_name => id_name.name === "ANSA ClientRegistration"
      );
      this.setSurveyName("ANSA ClientRegistration");
      this.$router.push({
        name: "SurveyView",
        params: { surveyid: rego_survey.surveyid }
      });
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
