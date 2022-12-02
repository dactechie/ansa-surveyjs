<template>
  <div>
    {{ body }}
    <!-- <Modal v-if="show" @close="close">
      <div class="modal-header">
        <h3>New Post</h3>
      </div>
      <div class="modal-body">
        {{ body }}
      </div>
      <div class="modal-footer text-right">
        <button class="modal-default-button" @click="savePost()">
          Save
        </button>
      </div>
    </Modal> -->
  </div>
</template>

<script>
// eslint-disable-line no-unused-vars
// import Modal from "./Modal";
import { mapState } from "vuex";

export default {
  name: "ITSPCompareModal",
  // components: { Modal },
  emits: ["close"],
  props: ["show", "selectedIndex"],
  data() {
    return {
      title: "",
      body: ""
    };
  },
  mounted() {
    this.body = "";
    console.log("in ITSP", this.selectedIndex);
    console.log("in clientData", this.clientData);
    const surveyData = this.clientData[this.selectedIndex]["SurveyData"];

    // const cols = ["PrincipalDrugOfConcern", "how_many_days", "aod_harms_risks"];

    let bodyHtml = "<table><tr>";
    Object.keys(surveyData).forEach(k => {
      //if (cols.includes(k)) {
      bodyHtml = `${bodyHtml} \n <td> ${surveyData[k]}</td>`;
      //}
    });
    bodyHtml = `${bodyHtml} \n </tr></table>`;
    this.body = bodyHtml;
    // const bodyText = [];
    // console.log(relevant);

    // relevant.map((e => {

    // })
    // relevant.forEach(r =>{

    // })
  },
  computed: {
    ...mapState(["clientData"])
    // clientData:  this.getClientData()
  },
  methods: {
    close: function() {
      this.$emit("close");
      this.title = "";
      this.body = "";
    },
    savePost: function() {
      // Some save logic goes here...

      this.close();
    }
  }
};
</script>

<style scoped>
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}
</style>
