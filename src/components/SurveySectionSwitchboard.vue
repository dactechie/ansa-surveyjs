<template>
  <!-- https://tailwindgrids.com/#/ -->
  <div class="flex flex-wrap -mx-px overflow-hidden sm:-mx-px md:-mx-1">
    <div
      v-for="(s, idx) in survey_sections"
      :key="idx"
      class="my-px px-px w-1/2 overflow-hidden sm:my-px sm:px-px sm:w-1/2 md:my-1 md:px-1 md:w-1/2"
    >
      <!-- Column Content -->
      {{ s }}
    </div>
  </div>
</template>

<script>
export default {
  name: "SurveySectionSwitchboard",
  data() {
    return {
      survey_sections: [
        "Demographics",
        "Princple Drug and Use",
        "AOD History",
        "Risks",
        "Impact on Lifestyle"
      ]
    };
  }
};
</script>
