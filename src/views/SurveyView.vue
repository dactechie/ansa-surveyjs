<template>
  <div
    class="leading-normal tracking-normal text-xs md:text-sm "
    id="main-body"
  >
    <Navbar />
    <div class="flex flex-wrap justify-center">
      <LeftsideNavbar
        v-if="sideBarOpen && surveyIsReady"
        class="flex-auto"
        @page-change="visitPage"
      />
      <div
        class="lg:w-full lg:ml-40 md:ml-20 bg-gray-100 pl-10  min-h-screen"
        id="main-content"
      >
        <div class="p-10 bg-gray-100 mb-20">
          <SurveyComp
            :currentPage="currentPage"
            @survey-is-ready="surveyIsReady = true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LeftsideNavbar from "@/components/NavSidebars/Survey/LeftsideNavbar"; // https://tailwindcss-layouts.netlify.app/ https://github.com/Murked/vue-tailwind-admin/tree/master/src/components
import Navbar from "@/components/NavSidebars/Survey/Navbar";
import SurveyComp from "@/components/SurveyComp";

export default {
  name: "SurveyView",
  data() {
    return {
      currentPage: 1,
      surveyIsReady: false
    };
  },
  components: {
    SurveyComp,
    LeftsideNavbar,
    Navbar
  },
  computed: {
    ...mapState(["sideBarOpen"])
  },
  methods: {
    visitPage(page) {
      this.currentPage = page;
    }
  }
};
</script>
