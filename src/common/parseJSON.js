/*
 

const sample = [
  {
    AODHistory:
      '[{"drug_type":"nicotine","method_of_use":"smokes","age_first_used":15,"amount_used":15,"how_often_used": "weekly","units_consumed_per_period":"50 - 59","usage_units":"cigarettes"}]',
    ClientID: "2343",
    CommencementDate: "2020-06-14T00:00:00Z",
    "CommencementDate@odata.type": "Edm.DateTime",
    EndDate: "2020-07-14T00:00:00Z",
    "EndDate@odata.type": "Edm.DateTime",
    IDType: "MCARE",
    MethodOfUse: "ingests",
    OtherDrugsOfConcern:
      '[{"how_many_days":15,"drug_type":"opioids","method_of_use":"injects"}]',
    PartitionKey: "ALLFT210719811",
    PrincipalDrugOfConcern: "alcohol",
    RowKey: "TSS_20200614",
    Staff: "michelle.figares",
    SurveyMeta:
      '{"type":"InitialAssessment","version:":"1.0", "status":"Complete"}',
    Team: "BEGAPATH",
    Timestamp: "2020-09-28T13:49:03.8768148Z",
    "odata.etag": '"W/"datetime\'2020-09-28T13%3A49%3A03.8768148Z\'""'
  }
];
*/
const dataTypeKey = "@odata.type";
const lenDataTypeKey = dataTypeKey.length;

function getTypesAndNonTypeKeyValues(data) {
  let types = {},
    nonTypeKV = {};

  Object.keys(data).filter(s => {
    if (s.includes(dataTypeKey)) {
      types[s.substr(0, s.length - lenDataTypeKey)] = data[s];
    } else {
      nonTypeKV[s] = data[s];
    }
  });

  // Object.keys(data).forEach(e => {
  //   const diff = e.length - lenDataTypeKey;
  //   if (diff > 0 && e.substr(diff) === dataTypeKey)
  //     types[e.substr(0, diff)] = data[e];
  //   // ['EndDate'] : "Edm.DateTime"
  //   else nonTypeKV[e] = data[e];
  // });
  return [types, nonTypeKV];
}

function fixTypes(dataDict) {
  // don't assume that each row of data has same types
  const [types, goodKeysVals] = getTypesAndNonTypeKeyValues(dataDict);
  Object.keys(types).forEach(k => {
    if (types[k] === "Edm.DateTime") {
      goodKeysVals[k] = new Date(goodKeysVals[k]);
    }
  });
  return goodKeysVals;
}

function parseAZLogicAppRESTJSON(data) {
  let cdata = [];

  for (const dat in data) {
    let cd = {};
    let dataDict = fixTypes(data[dat]);

    delete dataDict["odata.etag"];
    for (const [k, v] of Object.entries(dataDict)) {
      if (!v) continue;
      if (v[0] === "[" || v[0] === "{") cd[k] = JSON.parse(v);
      else cd[k] = v;
    }
    cd["Timestamp"] = new Date(cd["Timestamp"]);
    cdata.push(cd);
  }
  return cdata;
}

/*function AZTableClientLibJSON(data) {
  let cdata = [];
  for (const dat in data) {
    let cd = {};
    for (const k in data[dat]) {
      let v = data[dat][k];
      if (!v || !v._) continue;
      if (v.$ && v.$ === "Edm.DateTime") {
        cd[k] = new Date(v._);
        continue;
      }
      if (v._[0] === "[") cd[k] = JSON.parse(v._);
      else cd[k] = v._;
    }
    cdata.push(cd);
  }
  return cdata;
}*/

//let result = parseAZLogicAppRESTJSON(sample);
//console.log(result);
export { parseAZLogicAppRESTJSON };
