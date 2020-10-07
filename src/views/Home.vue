<template>
  <!-- <div class="home"> -->
  <div class="sv-container-modern">
    <div class="sv-body">
      <LookupFetchClientData
        :mode="mode"
        @mode-updated="updateMode"
        @survey-data-received="updateClientData"
      />
      <ClientSurveyHistory
        v-if="mode == 1"
        @clear-lookup-results="mode = 0"
        :clientData="clientData"
      />
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
// @ is an alias to /src
// import LookupFetchClient from "@/components/LookupFetchClient.vue";
import LookupFetchClientData from "@/components/LookupFetchClientData.vue";
import ClientSurveyHistory from "@/components/ClientSurveyHistory.vue";

export default {
  name: "Home",
  components: {
    //LookupFetchClient,
    LookupFetchClientData,
    ClientSurveyHistory
  },
  data() {
    return {
      clientData: {},
      mode: 0
    };
  },
  methods: {
    updateMode(data) {
      this.mode = data;
    },
    updateClientData(data) {
      let cdata = [...data];

      this.clientData = cdata;
      if (!cdata) {
        this.mode = 0;
        console.log("EMPTY DATA ", this.clientData);
        return;
      }
      let str_data = JSON.stringify(cdata);
      console.log(str_data);
      //sessionStorage.setItem("ClientData", btoa(str_data));
      sessionStorage.setItem("ClientData", str_data);
      this.$store.state["clientData"] = cdata;

      console.log("DATA ", this.clientData);
      this.mode = 1;
    }
  }
};
</script>
