//node save-sjon-to-azblob.js env=Staging

//curl -d '@surveyid.json' -H "Content-Type: application/json" -X POST  "https://prod-06.australiaeast.logic.azure.com:443/workflows/cc96c931f1304807b72543d1fc977f46/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TZh2DtUqiBIG5MKCvviZzAbjFHSa9Ue_TS58eDclyNI"

//curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST  "https://prod-06.australiaeast.logic.azure.com:443/workflows/cc96c931f1304807b72543d1fc977f46/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TZh2DtUqiBIG5MKCvviZzAbjFHSa9Ue_TS58eDclyNI"

// VUE_APP_SURVEYIDS_INAS_ITSP
"use strict";
const curlCommand = require("./curl_command.js");
const fs = require("fs");

const rawdata = fs.readFileSync("survey-ids.json");
const surveyids_config = JSON.parse(rawdata);

const progArgs = {};
// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

const kvPairs = process.argv.filter(kv => kv.includes("="));
kvPairs.forEach(kv => {
  const [k, v] = kv.split("=");
  progArgs[k] = v;
});
const environment = progArgs["env"];
const surveyType = progArgs["name"];
if (environment === undefined || surveyType === undefined) {
  console.error("Error: Environement (env) or Survey Code (name) was missing");
  process.exit(9); // invalid argument
}

const env_survey_ids = surveyids_config[environment];

const nameIds = env_survey_ids[surveyType];
const surveyId = nameIds["id"];
// TODO have to construct SURVEY URL
//http:api.surhejs,.io.GetSurvey?id= ... and then insert that in to stringifiedCURLArgs
// const surveyUrl = `https://api.surveyjs.io/public/Survey/getSurvey?surveyId=${surveyId}`;
// const curlParams = {
//   name: nameIds["name"] + ".json",
//   surveyURL:
//     "https://api.surveyjs.io/public/Survey/getSurvey?surveyId=8a3f9c55-c9ac-4824-9f82-6bf4bec93fae" //surveyUrl
// };
let curlParams = nameIds; //changed to ID.. wont work ..change back to surveyURL to match the logic app TODO TODO TODO TODO
const stringifiedCURLArgs = JSON.stringify(curlParams);

const curlCommandString = ` -d '${stringifiedCURLArgs}' -H "Content-Type: application/json" -X POST "https://prod-06.australiaeast.logic.azure.com:443/workflows/cc96c931f1304807b72543d1fc977f46/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TZh2DtUqiBIG5MKCvviZzAbjFHSa9Ue_TS58eDclyNI"`;
console.log(curlCommandString);

// TODO: copty and past of trhe url con CLI works .. but the below doesnt work..
// Logic app :
// InvalidTemplate. Unable to process template language expressions in action 'HTTP' inputs at line '0' and column '0': 'The template language expression 'triggerBody()?['surveyURL']'
// cannot be evaluated because property 'surveyURL' cannot be selected. Property selection is not supported on values of type 'String'. Please see https://aka.ms/logicexpressions for usage details.'.
// curlCommand.executeCommand(curlCommandString);
