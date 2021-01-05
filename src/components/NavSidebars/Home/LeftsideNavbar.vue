<template>
  <!-- give the sidebar z-50 class so its higher than the navbar if you want to see the logo -->
  <!-- you will need to add a little "X" button next to the logo in order to close it though -->
  <div class="md:top-0 md:left-0 sm:block bg-gray-100 border-r" id="main-nav">
    <div class="mt-5 mb-4 px-3">
      <LookupFetchClientData :mode="mode" @mode-updated="updateMode" />
    </div>
  </div>
</template>

<script>
import LookupFetchClientData from "@/components/LookupFetchClientData";
export default {
  name: "LeftsideNavbar",
  components: { LookupFetchClientData },
  emits: ["client-data-received", "mode-updated"],
  props: ["mode"],

  methods: {
    // updateClientData() {
    //   this.$emit("client-data-received");
    // },
    updateMode(data) {
      this.$emit("mode-updated", data);
    }
  }
};
</script>
