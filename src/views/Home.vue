<template>
  <!-- <div class="home"> -->
  <div class="bg-gray-100 py-2  sm:py-12 mx-12">
    <div class="sv-body grid grid-cols-2 gap-2">
      <!-- <div class="sv-table__cell" id="lookup_new"> -->
      <div class="px-12">
        <input
          class="form-radio h-6 w-6"
          type="radio"
          id="lookup"
          name="picked_type"
          value="lookup"
          v-model="picked_type"
        />
        <label class="sv-table__cell" for="lookup"
          ><strong>Lookup Client</strong></label
        >
      </div>
      <div>
        <input
          class="form-radio h-6 w-6"
          type="radio"
          id="newclient"
          name="picked_type"
          value="newclient"
          v-model="picked_type"
        />
        <label class="sv-table__cell" for="newclient"
          ><strong>New Client </strong></label
        >
      </div>
    </div>

    <div class="sv-body" id="lookup" v-if="picked_type === 'lookup'">
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

    <div class="sv-body" id="newclient" v-else-if="picked_type === 'newclient'">
      <NewClientStart />
    </div>
  </div>

  <!-- </div> -->
</template>

<script>
// @ is an alias to /src
// import LookupFetchClient from "@/components/LookupFetchClient.vue";
import { mapActions } from "vuex";
import LookupFetchClientData from "@/components/LookupFetchClientData.vue";
import ClientSurveyHistory from "@/components/ClientSurveyHistory.vue";
import NewClientStart from "@/components/NewClientStart.vue";

//import { getSurveysNameID } from "@/api/SurveyQuestionnaireService";

export default {
  name: "Home",
  components: {
    //LookupFetchClient,
    LookupFetchClientData,
    ClientSurveyHistory,
    NewClientStart
  },
  data() {
    return {
      clientData: {},
      mode: 0,
      picked_type: ""
    };
  },
  mounted() {
    // fetch survey name:id list from surveyjs.io / azure
    this.GET_QUESTIONNAIRE_LISTING();
    //console.log("Home mounted State", this.$store.state["surveyNameIDList"]);
  },
  methods: {
    ...mapActions(["GET_QUESTIONNAIRE_LISTING"]),
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
