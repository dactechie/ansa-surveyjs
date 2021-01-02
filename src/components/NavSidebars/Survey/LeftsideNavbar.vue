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
      <ul v-for="(nPage, index) in currentSurvey.visiblePages" :key="index">
        <li
          class="mb-4  lg:mb-2"
          :class="[
            nPage.isActive
              ? 'pl-1 text-teal-700 border-2 border-blue-300 border-opacity-50'
              : 'text-gray-600'
          ]"
        >
          <a
            class="px-2 -mx-2 py-1 transition duration-200 ease-in-out relative block hover:translate-x-2px hover:text-gray-900  font-medium"
            href="#"
            @click="gotoLink(index)"
          >
            <span
              class="mx-1 mr-2 rounded absolute inset-0 bg-teal-200 "
              :class="[nPage.isActive ? 'opacity-25' : 'opacity-0']"
            ></span
            ><span class="relative">{{ nPage.title }}</span></a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LeftsideNavbar",
  emits: ["page-change"],
  computed: {
    ...mapState(["sideBarOpen", "currentSurvey"])
  },
  methods: {
    gotoLink(index) {
      if (this.currentSurvey.pages[index]) {
        console.log("here", index);
        this.$emit("page-change", index);
      }
    }
  }
};
</script>
