<template>
  <div>
    <table class="text-xs">
      <thead>
        <th class="p-2 bg-teal-200" v-for="cTitle in colTitles" :key="cTitle">
          {{ cTitle }}
        </th>
      </thead>
      <tbody>
        <tr v-for="(obj, index) in Object.values(this.tableData)" :key="index">
          <td class="pl-2" v-for="cTitle in colTitles" :key="cTitle">
            {{ obj[cTitle] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "DetailObjectListTable",
  props: ["tableData"],
  data() {
    return {
      colTitles: []
    };
  },
  mounted() {
    this.colTitles = Object.keys(this.tableData[0]);
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
  background: rgb(238, 225, 247);
}
tbody tr:nth-child(odd) {
  background: rgb(225, 238, 215);
}
/* col:nth-child(2) {
  background: yellow; 
} */
</style>
