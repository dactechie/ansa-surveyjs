<template>
  <div class="sv-page sv-body__page">
    <label class="sv-table__cell" for="fname">First Name</label>
    <input
      class="sv-table__cell"
      type="text"
      id="fname"
      placeholder="first name"
      value="Aftab"
      v-model="fname"
    />
    <br />
    <label class="sv-table__cell" for="lname">Last Name</label>
    <input
      class="sv-table__cell"
      type="text"
      id="lname"
      placeholder="last name"
      value="Jalal"
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
    <!-- sex -->
  </div>
</template>

<script>
import { getCurrentYearMonthDay } from "@/common/utils";
export default {
  name: "NewClientStart",

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
  }
};
</script>
<style scoped></style>
