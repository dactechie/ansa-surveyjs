<template>
  <div>
    <table class="text-xs">
      <thead>
        <th class="p-3" v-for="cTitle in colTitles" :key="cTitle">
          <!-- yesNo   | Days |  -->
          {{ cTitle }}
        </th>
      </thead>
      <tbody>
        <tr>
          <td class="align-center" v-for="cTitle in colTitles" :key="cTitle">
            {{ tableData[cTitle] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!--  	{ 
          legalnotes	{ "legal_issues": "legal current issues", "legal_goals": "legal goals notes." }
                }-->
</template>

<script>
export default {
  name: "DetailObjectofStringsTable",
  props: ["tableData"],
  data() {
    return {
      colTitles: [] // [mental_usses , mental_goals]
    };
  },
  mounted() {
    this.colTitles = Object.keys(this.tableData); // [legal_issues , legal_goals]
  }
};
</script>

<style scoped>
/* https://css-tricks.com/complete-guide-table-element/ */

th {
  background: #00cccc;
  color: #fff;
  text-transform: uppercase;
  font-size: 12px;
}

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
