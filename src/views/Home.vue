<template>
  <!-- <div class="home"> -->
  <div>
    <div class="container mx-auto px-4 h-full">
      <div class="flex content-center items-center justify-center h-full">
        <div class="w-full lg:w-6/12 px-4">
          <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
          >
            <div class="rounded-t mb-0 px-6 py-6  lg:px-8 lg:mx-6">
              <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <button
                    class="btn btn--active"
                    id="lookup"
                    @click.prevent="picked_type = 'lookup'"
                  >
                    Lookup
                  </button>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <button
                    class="btn btn--inactive"
                    id="newRego"
                    @click.prevent="picked_type = 'newclient'"
                  >
                    New Client Rego
                  </button>
                </li>
              </ul>
              <div
                v-if="mode === 0"
                class="  relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
              >
                <div class="px-4 py-5 flex-auto">
                  <div class="tab-content tab-space">
                    <div v-if="picked_type === 'lookup'">
                      <LookupFetchClientData
                        :mode="mode"
                        @mode-updated="updateMode"
                        @survey-data-received="updateClientData"
                      />
                    </div>
                    <div v-else-if="picked_type === 'newclient'">
                      <NewClientStart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ClientSurveyHistory
        v-if="mode === 1"
        @clear-lookup-results="mode = 0"
        :clientData="clientData"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import LookupFetchClient from "@/components/LookupFetchClient.vue";
import { mapActions, mapMutations } from "vuex";
import LookupFetchClientData from "@/components/LookupFetchClientData.vue";
import ClientSurveyHistory from "@/components/ClientSurveyHistory.vue";
import NewClientStart from "@/components/NewClientStart.vue";
import {
  MODE_CLIENT_DATA_SET,
  MODE_EMPTY_CLIENT_DATA
} from "@/common/constants";
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
      mode: MODE_EMPTY_CLIENT_DATA, // TODO : remove, redundant -> same as clientData == undefined
      picked_type: "lookup"
    };
  },
  mounted() {
    // fetch survey name:id list from surveyjs.io / azure
    this.GET_QUESTIONNAIRE_LISTING();
    //console.log("Home mounted State", this.$store.state["surveyNameIDList"]);
  },
  methods: {
    ...mapActions(["GET_QUESTIONNAIRE_LISTING"]),
    ...mapMutations(["setClientData"]),
    updateMode(data) {
      this.mode = data;
    },
    updateClientData(data) {
      let cdata = [...data];

      this.clientData = cdata;
      if (!cdata) {
        this.mode = MODE_EMPTY_CLIENT_DATA;
        console.log("EMPTY DATA ", this.clientData);
        return;
      }
      let str_data = JSON.stringify(cdata);
      console.log(str_data);
      //sessionStorage.setItem("ClientData", btoa(str_data));
      sessionStorage.setItem("ClientData", str_data);
      this.setClientData(cdata);

      console.log("DATA ", this.clientData);
      this.mode = MODE_CLIENT_DATA_SET;
    }
  }
};
</script>
