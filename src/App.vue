<template>
  <div id="app">
    <div class="font-semibold text-xs text-white" v-if="APP_AZSLOT === 'staging'">
      "Staging env" | | INCOMPLETE_CONTINUATION_EXPIRY_DAYS:
      {{ INCOMPLETE_CONTINUATION_EXPIRY_DAYS }} | | VUE_APP_PREFILL_EXPIRY_DAYS:
      {{ PREFILL_EXPIRY_DAYS }} | | SURVEY_IDS {{ SURVEY_IDS }}
    </div>
    <router-view />
  </div>
</template>

<script>
import {
  // APP_ENVIRONMENT,
  SURVEY_IDS,
  PREFILL_EXPIRY_DAYS,
  INCOMPLETE_CONTINUATION_EXPIRY_DAYS,
  APP_AZSLOT
} from "@/common/constants";

export default {
  data() {
    return {
      SURVEY_IDS,
      PREFILL_EXPIRY_DAYS,
      INCOMPLETE_CONTINUATION_EXPIRY_DAYS,
      APP_AZSLOT
    };
  }
};
</script>
<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  background-color: mediumslateblue;
  /* color: #2c3e50; */
}
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
