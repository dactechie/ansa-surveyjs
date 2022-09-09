<template>
  <!-- give the sidebar z-50 class so its higher than the navbar if you want to see the logo -->
  <!-- you will need to add a little "X" button next to the logo in order to close it though -->
  <div
    class="md:top-0 md:left-0 sm:block shadow-lg bg-gradient-to-r from-white to-green-100 border-r rounded-lg "
    id="main-nav"
  >
    <div class="mt-10 px-3">
      <LookupFetchClientData
        :mode="mode"
        @search-initiated="$emit('search-initiated')"
        @mode-updated="updateMode"
      />
    </div>
  </div>
</template>

<script>
import LookupFetchClientData from "@/components/LookupFetchClientData";
export default {
  name: "LeftsideNavbar",
  components: { LookupFetchClientData },
  emits: ["search-initiated", "mode-updated"],
  props: ["mode"],

  methods: {
    updateMode(data) {
      this.$emit("mode-updated", data);
    }
  }
};
</script>
