import { checkAssign } from "../common/utils";
import { calculateSLK } from "../helper-functions/slk";
import SurveyService from "@/api/SurveyService";

function setupLookup(survey, options) {
  let lookup_details = {};
  if (survey.data["DB_ID"]) {
    let client_id = survey.data["DB_ID"];
    let id_type = survey.data["DB_ID_TYPE"];
    if (!client_id || !id_type) {
      console.log("reruning undefined from setuplookp");
      return undefined;
    }
    lookup_details["ClientID"] = client_id;
    lookup_details["IDType"] = id_type;
  } else {
    let result = checkAssign(
      lookup_details,
      {
        Firstname: survey.data.first_name,
        Surname: survey.data.last_name,
        Sex: "male", //survey.data.sex,
        DOB: survey.data.DOB
      },
      options.errors
    );
    if (result !== 1)
      console.log(" ERRORRRRRRRRRRRRRRRRR lookupdetails : ", lookup_details);
    else {
      lookup_details["ClientID"] = calculateSLK(lookup_details);
      lookup_details["IDType"] = "SLK";
    }

    console.log(`Lookup Details ${JSON.stringify(lookup_details)}`);
  }
  return lookup_details;
}

export default async function(survey, options) {
  let lkpdeets = setupLookup(survey, options);
  if (!lkpdeets) {
    options.errors["DB_ID"] = "Could not setup lookup";
    options.complete();
    return undefined;
  }
  console.table(lkpdeets);
  // does this come back in chronological  order , last one is incomplete
  let result = await SurveyService.fetchClientData(lkpdeets);
  if (
    (await result) &&
    (await result.entries) &&
    (await result.entries.length) > 0
  ) {
    return await result.entries;
    // survey.data = result.entries[0];
    //this.$emit("survey-data-received", result.entries);
  } else {
    console.log(" no results found ");
    //this.no_client_found = `Unable to find any results for client with ${id_type}: ${id_val}`;
    //this.$emit("mode-updated", 0);
    return undefined;
  }
}
