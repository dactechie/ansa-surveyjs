<template>
  <!-- give the sidebar z-50 class so its higher than the navbar if you want to see the logo -->
  <!-- you will need to add a little "X" button next to the logo in order to close it though -->
  <div
    class="w-1/2 md:w-1/6 sm:w-32 lg:w-64 fixed overflow-y-auto md:top-0 sm:left-0 h-screen bg-gray-100 border-r z-30"
    :class="sideBarOpen ? '' : 'hidden'"
    id="main-nav"
  >
    <!-- :class="sideBarOpen ? '' : 'hidden'" -->

    <!-- <div class="w-full h-20 border-b flex px-3 items-center mb-6">
      <p class="font-semibold text-1xl text-blue-400 pl-4">
        Directions Health Services
      </p>
    </div> -->

    <div class="mt-20 mb-4 px-4">
      <p
        class="mb-3 lg:mb-2 uppercase tracking-wide font-bold text-sm lg:text-xs text-gray-500"
      >
        Survey Pages Navigation
      </p>
      <ul>
        <li
          v-for="(nPage, index) in visiblePages"
          :key="index"
          class="mb-4  lg:mb-2"
          :class="getPageClass(nPage)"
        >
          <button
            class="mx-auto py-1 focus:outline-none transition duration-200 ease-in-out relative hover:translate-x-2px hover:text-gray-900  font-medium"
            href="#"
            @click="gotoLink(index)"
          >
            <span class="px-1">{{ nPage.title }}</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "LeftsideNavbar",
  emits: ["page-change"],
  computed: {
    ...mapState(["sideBarOpen"]),

    visiblePages: function() {
      return this.getCurrentSurvey().visiblePages;
    },
    missingMandatoryFields: function() {
      return this.getMissingMandatoryFields();
    }
  },
  methods: {
    ...mapGetters(["getCurrentSurvey", "getMissingMandatoryFields"]),

    getPageClass(page) {
      const missingMandatoryQuestions = page.questions.filter(
        q =>
          this.missingMandatoryFields.includes(q.name) && !q.value && q.visible // HowCloseToManagingImpactOfOthersUse was not visible
      );
      if (missingMandatoryQuestions.length > 0) {
        return page.isActive
          ? [
              "pl-1 text-red-700 rounded border-2 border-yellow-500 border-opacity-50 bg-red-100 opacity-80"
            ]
          : ["text-red-400"];
      } else {
        return page.isActive
          ? [
              "pl-1 text-teal-700 rounded border-2 border-blue-300 border-opacity-50 bg-teal-100 opacity-80"
            ]
          : ["text-gray-600"];
      }
    },
    gotoLink(index) {
      if (this.getCurrentSurvey().pages[index]) {
        console.log("here", index);
        this.$emit("page-change", index);
      }
    }
  }
};
</script>
