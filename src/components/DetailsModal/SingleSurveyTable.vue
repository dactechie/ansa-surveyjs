<template>
  <div>
    <!-- <div id="body"></div>    -->
    <table class="text-xs">
      <thead>
        <th
          v-if="includeFieldCodes"
          class="bg-teal-200 text-gray-800 text-center border border-gray-400"
        >
          Question
        </th>
        <th
          class="bg-teal-200 text-gray-800 text-center border border-gray-400"
        >
          Response
        </th>
      </thead>
      <tbody>
        <tr class="p-2" v-for="title in Object.keys(dataToShow)" :key="title">
          <td
            v-if="includeFieldCodes"
            class="text-center  font-semibold border border-gray-100"
          >
            {{ title }}
          </td>
          <td class="text-center" v-if="objectArrayTypeKeys.includes(title)">
            <DetailObjectListTable :tableData="dataToShow[title]" />
            <!-- exmaple : AODHistory : [ {} , {}...]  -->
          </td>
          <td
            class="text-center  border border-gray-400"
            v-else-if="objectOfObjectTypeKeys.includes(title)"
          >
            <DetailObjectofObjectsTable :tableData="dataToShow[title]" />
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
            <DetailObjectofStringsTable :tableData="dataToShow[title]" />
          </td>

          <td class="pl-2" v-else>
            {{ dataToShow[title] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import DetailObjectListTable from "./DetailObjectListTable";
import DetailObjectofObjectsTable from "./DetailObjectofObjectsTable";
import DetailObjectofStringsTable from "./DetailObjectofStringsTable";

export default {
  name: "SingleSurveyTable",
  props: ["surveyDataDescription", "dataToShow", "includeFieldCodes"],
  data() {
    return {
      objectArrayTypeKeys: [],
      objectOfObjectTypeKeys: [],
      objectOfStringsTypeKeys: []
    };
  },
  components: {
    DetailObjectListTable,
    DetailObjectofObjectsTable,
    DetailObjectofStringsTable
  },
  mounted() {
    this.objectArrayTypeKeys = this.surveyDataDescription[
      "objectArrayTypeKeys"
    ];
    this.objectOfObjectTypeKeys = this.surveyDataDescription[
      "objectOfObjectTypeKeys"
    ];
    this.objectOfStringsTypeKeys = this.surveyDataDescription[
      "objectOfStringsTypeKeys"
    ];
  }
};
</script>
