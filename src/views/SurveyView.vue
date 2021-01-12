<template>
  <!-- <div class="home"> 
    https://dev.to/fayaz/making-a-navigation-drawer-sliding-sidebar-with-tailwindcss-blueprint-581l
    -->
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
          <!-- @click.native="sideBarOpen ? 'ove' : ''"
            @search-index-built="onSearchReady" -->
          <SurveyComp
            :currentPage="currentPage"
            @survey-is-ready="surveyIsReady = true"
          />
        </div>
      </div>
    </div>
  </div>
  <!--<header class="border-t-4 border-blue-700 bg-white   w-full shadow-md">
      <nav
        class="container mx-auto px-8 flex flex-wrap justify-between items-center py-8"
      >
        <div class="block lg:hidden">
          <! -- @click="toggleMenu" -- >
          <button
            class="flex items-center px-3 py-2 border rounded border-gray-500 hover:text-gray-600 hover:border-gray-600"
          >
            <svg
              class="current-color h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                fill="gray"
              />
            </svg>
          </button>
        </div>
        <ul
          class="uppercase tracking-wide font-bold w-full block flex-grow lg:flex lg:flex-initial lg:w-auto items-center mt-8 lg:mt-0"
        >
          <! -- :class="menuOpen ? 'block' : 'hidden'" -- >
          <li class="mr-12 mb-6 lg:mb-0">
            <Search @page-change="visitPage" :searchIndex="searchIndexData" />
          </li>
        </ul>
      </nav>
    </header> -->
</template>

<script>
// @ is an alias to /src
// import Search from "@/components/Search.vue";
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
      // searchIndexData: {}
    };
  },
  components: {
    // Search,
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
    // onSearchReady(searchIndexData) {
    //   this.searchIndexData = searchIndexData;
    // },
    // toggleSidebar() {
    //   this.$store.dispatch("toggleSidebar");
    //   // if (this.sideBarOpen)
    //   //   document.getElementsByClassName("sv-body")[0].style.marginLeft =
    //   //     "150px";
    //   // else
    //   //   document.getElementsByClassName("sv-body")[0].style.marginLeft = "0px";
    // }
  }
};
</script>
