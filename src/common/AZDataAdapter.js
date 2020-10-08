/*{
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
  }*/

const dataTypeKey = "@odata.type";
const lenDataTypeKey = dataTypeKey.length;

function setTypesAndTypeKVs(data) {
  const dates = ["CommencementDate", "EndDate"];
  //"2020-06-14T00:00:00Z", , is it in this format ? if not set to this.
  dates.forEach(d => {
    if (data[d] !== null) {
      //QUESTION : undefined ?
      data[d] = data[d].toISOString();
      data[`${data[d]}${dataTypeKey}`] = "Edm.DateTime";
    }
  });
}
/**
 * @function toAZDataStructure
 * @returns  Stringified (flattened) format for storage into AZ Table
 * @param {*} data
 */
export function toAZDataStructure(data) {
  const azTypedData = setTypesAndTypeKVs({ ...data });
  //stringify objects
  // for (const [k, v] of azTypedData) {
  //   if (typeof v === "object" && v !== null) {
  //     azTypedData[k] = JSON.stringify(v);
  //   }
  // }

  // no need to stringify :
  //> JSON.stringify({ b: {d:"sd"}, c: new Date() })  > '{"b":{"d":"sd"},"c":"2020-10-07T12:34:23.103Z"}'

  return azTypedData;
}

function _getTypesAndNonTypeKVs(data) {
  let types = {},
    nonTypeKV = {};

  Object.keys(data).filter(s => {
    // TODO: this should not be filter() rite ?
    if (s.includes(dataTypeKey)) {
      types[s.substr(0, s.length - lenDataTypeKey)] = data[s];
    } else {
      nonTypeKV[s] = data[s];
    }
  });
  return [types, nonTypeKV];
}
function _fixTypes(dataDict) {
  // don't assume that each row of data has same types
  const [types, goodKeysVals] = _getTypesAndNonTypeKVs(dataDict);
  Object.keys(types).forEach(k => {
    if (types[k] === "Edm.DateTime") {
      goodKeysVals[k] = new Date(goodKeysVals[k]);
    }
  });
  return goodKeysVals;
}

/**
 * @function fromAZDataArray
 * @returns Parsed (unflattened) dict with Dates and Objects
 * @param {*} data
 */
export function fromAZDataArray(data) {
  let cdata = [];

  for (const dat in data) {
    let cd = {};
    let dataDict = _fixTypes(data[dat]);

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
