<template>
  <!-- give the sidebar z-50 class so its higher than the navbar if you want to see the logo -->
  <!-- you will need to add a little "X" button next to the logo in order to close it though -->
  <div
    class=" sm:w-2/5 lg:w-1/4 md:top-0 md:left-0 sm:block bg-gray-100 border-r"
    :class="sideBarOpen ? '' : 'hidden'"
    id="main-nav"
  >
    <div class="w-full h-20 border-b flex px-3 items-center mb-6">
      <p class="font-semibold text-1xl text-blue-400 pl-4">
        Directions Health Services
      </p>
      <img src="@/assets/images/ATOMLogo.png" alt="ATOM Logo" />
    </div>

    <div class="mt-10 mb-4 px-3">
      <p
        class="mb-3 lg:mb-2 uppercase tracking-wide font-bold text-sm lg:text-xs text-gray-500"
      >
        Look up Client
      </p>
      <LookupFetchClientData :mode="mode" @mode-updated="updateMode" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LookupFetchClientData from "@/components/LookupFetchClientData";
export default {
  name: "LeftsideNavbar",
  components: { LookupFetchClientData },
  emits: ["client-data-received", "mode-updated"],
  props: ["mode"],

  computed: {
    ...mapState(["sideBarOpen", "currentSurvey"])
  },
  methods: {
    gotoLink(index) {
      if (this.currentSurvey.pages[index]) {
        console.log("here", index);
        this.$emit("page-change", index);
      }
    },
    // updateClientData() {
    //   this.$emit("client-data-received");
    // },
    updateMode(data) {
      this.$emit("mode-updated", data);
    }
  }
};
</script>
