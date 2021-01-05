<template>
  <div>
    <table class="text-xs">
      <thead>
        <th class="p-2 bg-teal-200 text-gray-800 border border-gray-400">
          Type
        </th>
        <th
          class="p-2 bg-teal-200 text-gray-800 border border-gray-400"
          v-for="cTitle in colTitles"
          :key="cTitle"
        >
          <!-- yesNo   | Days |  -->
          {{ cTitle }}
        </th>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in Object.values(this.tableData)"
          :key="index"
          class="border border-gray-400"
        >
          <td>{{ rowTitles[index] }}</td>
          <!-- Addition Type-->
          <td class="pl-2" v-for="cTitle in colTitles" :key="cTitle">
            {{ item[cTitle] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!--  	{ 
                "Gambling": { "yesNo": false, "Days": "25-28" }, 
                "Sex": { "yesNo": true }, 
                "Internet / Social Media": { "yesNo": false }, 
                "Gaming": { "yesNo": true, "Days": "10-14" },
                "Hoarding": { "yesNo": false, "Days": "15-19" }, 
                "Other": { "yesNo": false, "Days": "0" } 
                }-->
</template>

<script>
export default {
  name: "DetailObjectofObjectsTable",
  props: ["tableData"],
  data() {
    return {
      colTitles: [],
      rowTitles: []
    };
  },
  mounted() {
    this.rowTitles = Object.keys(this.tableData); // Gambling, sex . internet

    let allCols = [];
    // not all objects (values of tableData)  have the same sub-keys,
    // gather the comprehensive set
    Object.values(this.tableData).forEach(obj => {
      allCols = [...allCols, ...Object.keys(obj)].filter(
        (el, i, arr) => arr.indexOf(el) === i
      );
    });
    this.colTitles = allCols;
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
  background: rgb(226, 230, 217);
}
tbody tr:nth-child(odd) {
  background: rgb(243, 222, 222);
}
/* col:nth-child(2) {
  background: yellow; 
} */
</style>
