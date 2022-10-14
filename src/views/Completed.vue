<template>
  <div class="container mx-auto font-semibold">
    <h2 class="py-10">Thanks for completing an ATOM</h2>
    <p>A summary will be emailed to: {{ staff }}@directionshealth.com</p>
    <p>
      Please ensure the summary is uploaded to the client file (SLK:
      {{ slk }})
    </p>
    <p class="text-md-bold mx-5 my-5">
      <a
        :href="getClientHistoryUrl()"
        target="_blank"
        class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
      >
        Graphical Client History
      </a>
    </p>
    <router-link
      to="/"
      tag="button"
      class="bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 my-10 inline-flex items-center"
    >
      Home
    </router-link>

    <!-- <ClientSurveyHistory v-if="clientData" :clientData="clientData" /> -->
  </div>
</template>

<script>
// import ClientSurveyHistory from "@/components/ClientSurveyHistory";
import { mapGetters } from "vuex";
import { CLIENT_HISTORY_URL } from "@/common/constants";
export default {
  name: "CompletedPage",
  // components: { ClientSurveyHistory },
  data() {
    return {
      slk: "",
      staff: ""
    };
  },
  methods: {
    ...mapGetters(["getCompletedDetails"]),
    getClientHistoryUrl() {
      return `${CLIENT_HISTORY_URL}${sessionStorage.ClientData.substr(18, 14)}`;
    }
  },
  // computed: {
  //   staff() {
  //     if (!this.clientData || this.clientData.length < 1) {
  //       alert("no client data");
  //       return "";
  //     }
  //     return this.clientData[clientData.length - 1]["Staff"];
  //   }
  // },
  created() {
    // const cData = sessionStorage.getItem("ClientData");
    // if (!cData) {
    //   alert("No client data in session.");
    //   return;
    // }
    // this.clientData = JSON.parse(cData);
    // if (!this.clientData || this.clientData.length < 1) {
    //   alert("no client data");
    //   return;
    // }
    // // this.clientData["Timestamp"] = new Date(this.clientData["Timestamp"]);
    // // clientSurveyHstory expects a date :  c["Timestamp"] = getFriendlyTimestampString(c["Timestamp"]);

    // let lastClientRecord = this.clientData[this.clientData.length - 1];
    let { currentClientSLK, currentStaff } = this.getCompletedDetails();
    this.slk = currentClientSLK;
    this.staff = currentStaff;
  }
};
</script>

<style></style>
