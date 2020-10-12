/*{
  "SurveyData": {
    "Timestamp": "Mon Oct 12 2020",
    "Status": "Incomplete",
    "SurveyID": "ddc3dec4-6de5-4bc9-a963-87e20896feed",
    "PartitionKey": "ALLFT210719811",
    "RowKey": "undefined_undefined_2020912",
    "ClientID": "1234",
    "Program": "SAPPHIRE",
    "SourceDatabase": "CCARE",
    "Staff": "Tim.Ireson",
    "SurveyName": "ANSA InitialAssessment"

    // Survey data: 
    "AODHistory": [
      { "drug_type": "nicotine", "method_of_use": "smokes",   "age_first_used": 15, "amount_used": 15, "how_often_used": "weekly",
        "units_consumed_per_period": "50 - 59", "usage_units": "cigarettes"}],
    "MethodOfUse": "ingests",
    "OtherDrugsOfConcern": [{ "how_many_days": 15,"drug_type": "opioids","method_of_use": "injects" }],
    "PrincipalDrugOfConcern": "alcohol",
    "AddictiveBehaviours": ["sex","gambling"],
    "Risks": ["usealone", "other", "violence" ],
    "RisksOtherComments": "",
    "ImpactOnDailyActivities": 3,
    "aod_history": [
      { "drug_type": "alcohol","method_of_use": "ingests", "how_often_used": "daily","age_first_used": 2, "usage_units": "shots", "units_consumed_per_period": "15 - 19" } ],
    "aod_harms_risks": ["usealone" ],
    "impctdaily": "1",
    "additive_behaviours": [ "sex" ]
  }
}*/

// const dataTypeKey = "@odata.type";
//const lenDataTypeKey = dataTypeKey.length;

// function setTypesAndTypeKVs(data) {
//   const dates = ["CommencementDate", "EndDate"];
//   //"2020-06-14T00:00:00Z", , is it in this format ? if not set to this.
//   dates.forEach(d => {
//     if (data[d] !== null) {
//       //QUESTION : undefined ?
//       data[d] = data[d].toISOString();
//       data[`${data[d]}${dataTypeKey}`] = "Edm.DateTime";
//     }
//   });
// }
/**
 * @function toAZDataStructure
 * @returns  Stringified (flattened) format for storage into AZ Table
 * @param {*} data
 */
// export function toAZDataStructure(data) {
//   const azTypedData = setTypesAndTypeKVs({ ...data });
//   //stringify objects
//   // for (const [k, v] of azTypedData) {
//   //   if (typeof v === "object" && v !== null) {
//   //     azTypedData[k] = JSON.stringify(v);
//   //   }
//   // }

//   // no need to stringify :
//   //> JSON.stringify({ b: {d:"sd"}, c: new Date() })  > '{"b":{"d":"sd"},"c":"2020-10-07T12:34:23.103Z"}'

//   return azTypedData;
// }

/**
 * @function fromAZDataArray
 * @returns Parsed (unflattened) dict with Dates and Objects
 * @param {*} data
 */
export function fromAZDataArray(data) {
  let cdata = [];

  for (const dat in data) {
    let cd = {};
    //let dataDict = _fixTypes(data[dat]);
    let dataDict = {
      ...data[dat],
      Timestamp: new Date(data[dat]["Timestamp"]).toDateString()
    };

    delete dataDict["odata.etag"];
    for (const [k, v] of Object.entries(dataDict)) {
      if (!v) continue;
      if (v[0] === "[" || v[0] === "{") cd[k] = JSON.parse(v);
      else cd[k] = v;
    }
    cdata.push(cd);
  }
  return cdata;
}
