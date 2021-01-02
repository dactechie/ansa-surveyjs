<template>
  <div class="sticky top-0 z-40">
    <div
      class="w-full px-6 bg-gray-100 border-b flex items-center justify-between"
    >
      <!-- left navbar -->
      <div class="flex">
        <!-- mobile hamburger -->
        <div class="flex items-center mr-4">
          <button
            class="hover:text-blue-500 hover:border-white focus:outline-none navbar-burger"
            @click="toggleSidebar()"
          >
            <svg
              class="h-5 w-5"
              v-bind:style="{ fill: 'black' }"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <router-link to="/" tag="button">
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="16.000000pt"
            height="16.000000pt"
            viewBox="0 0 1280.000000 1206.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,1206.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <path
                d="M5828 11600 c-282 -250 -1418 -1256 -2523 -2235 -1106 -978 -2165
                -1917 -2355 -2085 -190 -168 -460 -407 -600 -530 -140 -124 -276 -245 -302
                -270 l-48 -45 330 -370 c181 -203 336 -369 343 -369 8 1 603 521 1323 1156
                3778 3332 4388 3868 4395 3866 4 -2 470 -413 1036 -914 565 -501 1842 -1631
                2836 -2512 994 -881 1812 -1602 1817 -1602 5 0 12 5 15 10 5 8 11 7 21 -1 19
                -15 -10 -45 339 351 153 173 293 331 312 351 l34 36 -838 739 c-461 407 -1544
                1363 -2408 2124 -863 762 -1919 1693 -2347 2070 l-776 685 -45 0 -45 0 -514
                -455z"
              />
              <path
                d="M5707 9301 c-364 -322 -1370 -1213 -2235 -1979 l-1572 -1393 2 -2872
                3 -2872 22 -41 c12 -23 41 -58 64 -77 83 -72 -24 -67 1561 -67 l1428 0 2 1273
                c3 1266 3 1272 24 1317 26 58 76 108 134 134 45 21 52 21 1224 24 1304 3 1248
                5 1322 -60 52 -46 81 -97 93 -163 8 -40 11 -454 11 -1292 l0 -1233 1484 2
                1485 3 30 29 c17 16 45 63 63 105 l33 76 2 2860 2 2860 -2240 1975 c-1270
                1120 -2249 1976 -2260 1976 -13 1 -247 -200 -682 -585z"
              />
            </g>
          </svg>
        </router-link>
        <!-- </div> -->
        <div class="font-bold text-1xl text-indigo-700 pl-4 pr-4">
          {{ surveyName }}

          <div class="hidden lg:block  font-semibold text-xs text-red-300 ">
            Created: 10/10/2020 Modified: 11/10/2020
          </div>
        </div>
        <!-- search bar -->
        <!-- <div class="relative text-gray-600">
          <input
            type="search"
            name="serch"
            placeholder="Search pages..."
            class="bg-white h-10 w-full  px-5 rounded-lg border text-sm focus:outline-none"
            size="40"
          />
          <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
            <svg
              class="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              style="enable-background:new 0 0 56.966 56.966;"
              xml:space="preserve"
              width="512px"
              height="512px"
            >
              <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
              />
            </svg>
          </button>
        </div> -->
      </div>
      <p class="hidden lg:flex font-semibold text-md text-blue-900 pl-5 pr-5">
        {{ getCurrentPageTitle }}
      </p>
      <!-- right navbar -->
      <div class="hidden md:flex items-center relative space-x-2   pl-4">
        <p class="font-mono font-semibold text-md text-green-800">
          SLK: {{ currentClientSLK }}
        </p>
        <!-- <button
          v-if="dirtyData && isProgramSet"
          class="bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
          @click.prevent="savePartialSurvey"
        >
          Save Incomplete Survey
        </button> -->
        <p class="hidden lg:flex font-semibold text-sm text-blue-700 pl-4">
          Total: {{ totalQuestions }}
        </p>
        <p class="hidden lg:flex font-semibold text-sm text-orange-400 pl-4">
          Answered: {{ answeredQuestions }}
        </p>
        <!-- {{ totalTillNow }} -->
        <p class="hidden lg:flex font-semibold text-sm text-red-600 pl-4 pr-4">
          Mandatory: {{ reqAnsweredQuestions }}/{{ requiredQuestions }}
        </p>

        <div class="px-2"></div>
        <img
          src="@/assets/images/ATOMLogoSmall.png"
          @click="dropDownOpen = !dropDownOpen"
        />
      </div>
    </div>

    <!-- dropdown menu -->
    <div
      class="absolute bg-gray-100 border border-t-0 shadow-xl text-gray-700 rounded-b-lg w-48 bottom-10 right-0 mr-6"
      :class="dropDownOpen ? '' : 'hidden'"
    >
      <!-- <a href="#" class="block px-4 py-2 hover:bg-gray-200">Account</a> -->
      <!-- <a href="#" class="block px-4 py-2 hover:bg-gray-200">Settings</a> -->
      <a href="#" class="block px-4 py-2 hover:bg-gray-200"
        >Logout Aftab.Jalal</a
      >
    </div>
    <!-- dropdown menu end -->
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Navbar",
  computed: {
    ...mapState(["sideBarOpen", "surveyName", "currentClientSLK"]),
    ...mapGetters([
      "getCurrentPageTitle",
      "totalQuestions",
      // "totalTillNow",
      "answeredQuestions",
      "requiredQuestions",
      "reqAnsweredQuestions"
    ])
  },
  // methods:{

  // },
  data() {
    return {
      dropDownOpen: false
    };
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch("toggleSidebar");
    }
  }
};
</script>
