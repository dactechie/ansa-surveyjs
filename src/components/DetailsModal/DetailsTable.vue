<template>
  <div>
    <!-- <div id="body"></div>    -->
    <table class="text-xs">
      <thead>
        <th
          class="bg-teal-200 text-gray-800 text-center border border-gray-400"
        >
          Question (Code)
        </th>
        <th
          class="bg-teal-200 text-gray-800 text-center border border-gray-400"
        >
          Response
        </th>
      </thead>
      <tbody>
        <tr
          class="p-2"
          v-for="title in Object.keys(selectedSurveyData)"
          :key="title"
        >
          <td class="text-center  font-semibold border border-gray-100">
            {{ title }}
          </td>
          <td class="text-center " v-if="objectArrayTypeKeys.includes(title)">
            <DetailObjectListTable :tableData="selectedSurveyData[title]" />
            <!-- exmaple : AODHistory : [ {} , {}...]  -->
          </td>
          <td
            class="text-center  border border-gray-400"
            v-else-if="objectOfObjectTypeKeys.includes(title)"
          >
            <DetailObjectofObjectsTable
              :tableData="selectedSurveyData[title]"
            />
          </td>
          <!-- AddictiveBehaviours	{ 
                "Gambling": { "yesNo": false, "Days": "25-28" }, 
                "Sex": { "yesNo": true }, 
                "Internet / Social Media": { "yesNo": false }, 
                "Gaming": { "yesNo": true, "Days": "10-14" },
                "Hoarding": { "yesNo": false, "Days": "15-19" }, 
                "Other": { "yesNo": false, "Days": "0" } 
                }-->
          <td v-else-if="objectOfStringsTypeKeys.includes(title)">
            <DetailObjectofStringsTable
              :tableData="selectedSurveyData[title]"
            />
          </td>

          <td class="pl-2" v-else>
            {{ selectedSurveyData[title] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DetailObjectListTable from "./DetailObjectListTable";
import DetailObjectofObjectsTable from "./DetailObjectofObjectsTable";
import DetailObjectofStringsTable from "./DetailObjectofStringsTable";

export default {
  name: "DetailsTable",
  props: ["selectedIndex"],
  components: {
    DetailObjectListTable,
    DetailObjectofObjectsTable,
    DetailObjectofStringsTable
  },
  data() {
    return {
      body: "",
      selectedSurveyData: {},
      objectArrayTypeKeys: [],
      objectOfObjectTypeKeys: [],
      objectOfStringsTypeKeys: []
    };
  },
  watch: {
    selectedIndex: {
      immediate: true,
      handler() {
        this.buildTable();
      }
    }
  },
  methods: {
    buildTable() {
      this.body = "";
      console.log("in ITSP", this.selectedIndex);
      console.log("in clientData", this.clientData);
      let data = this.clientData[this.selectedIndex]["SurveyData"];

      this.objectArrayTypeKeys = Object.keys(data).filter(k => {
        let v = data[k];
        return (
          Array.isArray(v) &&
          typeof v[0] === "object" &&
          v[0] !== null &&
          Object.keys(v[0]).length > 0
        );
      });
      // data :  { "... ", "AddictiveBehaviours" : { "Gambling": {"YesNo" : False, "Days": 34 }} }
      //result :["Gambling", .. ]
      this.objectOfObjectTypeKeys = Object.keys(data).filter(k => {
        let v = data[k];
        if (typeof v === "object") {
          //"AddictiveBehaviours" : { "Gambling": {"YesNo" : False, "Days": 34 }} }
          const keys = Object.keys(v); // ["Gambling" ,..]
          if (keys.length > 0 && typeof v[keys[0]] === "object") {
            return Object.keys(v[keys[0]]).length > 0; //{"YesNo"}
          }
        }
        return false;
      });
      this.objectOfStringsTypeKeys = Object.keys(data).filter(k => {
        let v = data[k]; // mhealthnotes : {...}
        if (typeof v === "object") {
          const values = Object.values(v); // ["mental_issues" , "goals"]
          return typeof v[0] === "undefined" && typeof values[0] === "string";
        }
        return false;
      });
      console.log("objectOfStringsTypeKeys", this.objectOfStringsTypeKeys);
      this.selectedSurveyData = data;
    }
  },
  computed: {
    ...mapState(["clientData"])
  }
};
</script>

<style scoped>
/* https://css-tricks.com/complete-guide-table-element/ */

/* th {
  background: #00cccc;
  color: #fff;
  text-transform: uppercase;
  font-size: 12px;
} */

tr:hover td {
  /* th:hover also if you wish */
  background: rgb(230, 227, 217);
}
tbody tr:nth-child(odd) {
  background: #eee;
}
/* col:nth-child(2) {
  background: yellow; 
} */
</style>
