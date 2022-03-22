<template>
  <div>
    <!-- <div id="body"></div>    -->
    <table>
      <thead>
        <!-- <th
          class="bg-teal-200 text-gray-800 text-center border border-gray-400"
        >
          Question (Code)
        </th> -->
        <th
          v-for="(assessmentDate, index) of assessmentDates"
          :key="index"
          class="bg-teal-200 text-gray-800 text-center border border-gray-400"
        >
          {{ assessmentDate }}
        </th>
      </thead>
      <tbody>
        <tr>
          <td
            v-for="({ surveyDataDescription, dataToShow },
            index) of displayData"
            :key="index"
          >
            <SingleSurveyTable
              :surveyDataDescription="surveyDataDescription"
              :dataToShow="dataToShow"
              :includeFieldCodes="index == 0"
            >
            </SingleSurveyTable>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { splitByTypes } from "@/common/utils";
import SingleSurveyTable from "./SingleSurveyTable";

export default {
  name: "DetailsTable",
  props: ["allData", "keysToShow"],
  components: { SingleSurveyTable },
  data() {
    return {
      displayData: [],
      assessmentDates: []
      // objectArrayTypeKeys: [],
      // objectOfObjectTypeKeys: [],
      // objectOfStringsTypeKeys: []
    };
  },
  mounted() {
    this.buildTable();
  },
  methods: {
    getResult(data) {
      let result = {};
      const [
        objectArrayTypeKeys,
        objectOfObjectTypeKeys,
        objectOfStringsTypeKeys
      ] = splitByTypes(data);
      result = {
        // AssessmentDate: objectOfStringsTypeKeys["AssessmentDate"],
        objectArrayTypeKeys,
        objectOfObjectTypeKeys,
        objectOfStringsTypeKeys
      };
      return result;
    },

    buildTable() {
      console.log("buildTable KeysTosShow", this.keysToShow);
      let result = [];
      this.assessmentDates = [];
      if (!Array.isArray(this.allData)) {
        this.displayData.push({
          surveyDataDescription: this.getResult(this.allData),
          dataToShow: this.allData
        });
        return;
      }

      for (let index = 0; index < this.allData.length; index++) {
        const element = this.allData[index];
        let r = {};
        for (const k in this.keysToShow) {
          const key = this.keysToShow[k];
          if (key in element) {
            r[key] = element[key];
          } else {
            r[key] = element["SurveyData"][key];
          }
        }
        this.assessmentDates.push(element["AssessmentDate"]);
        result.push({
          surveyDataDescription: this.getResult(r),
          dataToShow: r
        });
      }
      // this.allData.forEach(d => {
      //   let dct = this.keysToShow.map(k => k: d[k]);
      //   dct["AssessmentDate"] = d["AssessmentDate"];
      //   result.push({
      //     surveyDataDescription: this.getResult(dct),
      //     dataToShow: dct
      //   });
      // });
      this.displayData = result;
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
