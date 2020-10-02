<template>
  <div class="sv-page sv-body__page">
    <button @click="clearLookupResults">Clear</button>
    <table class="table" v-if="clientData">
      <thead>
        <!-- <th>SLK</th> -->
        <th class="sv-table__cell sv-table__cell--header">Team</th>
        <th class="sv-table__cell sv-table__cell--header">Staff</th>
        <th class="sv-table__cell sv-table__cell--header">Commencement Date</th>
        <th class="sv-table__cell sv-table__cell--header">
          Principal Drug Of Concern
        </th>
        <th class="sv-table__cell sv-table__cell--header">Status</th>
        <th class="sv-table__cell sv-table__cell--header">Survey Type</th>
        <th class="sv-table__cell sv-table__cell--header">Action</th>
      </thead>
      <tbody>
        <tr v-for="(k, index) of myData.data" :key="index">
          <td
            v-for="(v, indx) of Object.values(k)"
            :key="indx"
            class="sv-table__cell"
          >
            <center>{{ v }}</center>
          </td>
          <td>
            <!-- {{  myData.actions[index] }} -->
            <router-link
              :to="{
                name: 'SurveyView',
                params: { type: myData.actions[index], index: index }
              }"
            >
              {{ myData.actions[index] }}</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ClientSurveyHistory",
  props: ["clientData"],
  computed: {
    myData() {
      let colHeaders = [
        // "PartitionKey",
        "Team",
        "Staff",
        "CommencementDate",
        "PrincipalDrugOfConcern"
      ];

      const srvyMeta = this.clientData.map(e => {
        return e["SurveyMeta"];
      });
      const actions = srvyMeta.map(
        e => (e["status"] === "Complete" ? "clone" : "edit") // only the last one can be cloned
      );
      let tableVals = [];
      this.clientData.forEach(function(c, i) {
        let td = colHeaders.map(h => c[h]);
        td["Status"] = srvyMeta[i]["status"];
        td["Survey Type"] = srvyMeta[i]["type"];
        tableVals.push(td);
      });
      return { data: tableVals, actions: actions };
    }
  },
  methods: {
    clearLookupResults() {
      this.$emit("clear-lookup-results");
    }
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
  background: yellow;
}
tbody tr:nth-child(odd) {
  background: #eee;
}
/* col:nth-child(2) {
  background: yellow; 
} */
</style>
