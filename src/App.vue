<template>
  <div id="app" :style="backgroundStyle">
    <div
      class="font-semibold text-xs text-white"
      v-if="APP_AZSLOT === 'staging'"
    >
      <div class="lg:ml-40 md:ml-20 pl-10">
        "Staging env" | | SURVEY_IDS
        {{ SURVEY_IDS }} | | ConsoleDebugNotes: VueExtn, Components>Expand
        "survey" node>
        $vm0.survey.setValue("PDC",[{"PDCSubstanceOrGambling":"Organic Opiate
        Analgesics, n.e.c.","PDCMethodOfUse":"Smoke"}])
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import {
  // APP_ENVIRONMENT,
  SURVEY_IDS,
  APP_AZSLOT
} from "@/common/constants";

export default {
  data() {
    console.log("app slot : ", APP_AZSLOT);
    return {
      SURVEY_IDS,
      APP_AZSLOT
    };
  },
  computed: {
    backgroundStyle: function() {
      if (APP_AZSLOT === "staging") {
        return { backgroundColor: "#e9e7f5" };
      }
      return "";
    }
  }
};
</script>
<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
} */
/*
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}*/
</style>
