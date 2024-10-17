import { doGetAction } from "./RESTClient";
// import { APP_AZSLOT as PROD_STAGING } from "../common/constants";

const QUESTION_URL =
  process.env.VUE_APP_LOAD_QUESTIONNAIRES_URL ||
  "https://api.surveyjs.io/private/Surveys/getActive?accessKey=d02a998d146f47d980be07e34a6abc82";
//"https://surveyjs.io/api/MySurveys/getActive?accessKey=d02a998d146f47d980be07e34a6abc82";

const INAS_ITSP = process.env.VUE_APP_SURVEYIDS_INAS_ITSP;
const SurveyIds_INAS_ITSP = INAS_ITSP.split("_");

export default {
  async getSurveysNameID() {
    // return [
    //   {
    //     name: "ANSA InitialAssessment",
    //     surveyid: "7fa3ef89-dd2f-4dfe-88ba-b7cc90f3489d"
    //   },
    //   {
    //     name: "ITSP ReviewAssessment",
    //     surveyid: "ae192b2d-1793-471e-b937-e36ddb9badbf"
    //   }
    // ];
    // Prod

    // ["8a434de3-a367-42ea-a5a2-21a95cb1d65c", "15ca1eb1-3ffa-4af4-81dc-d3a89c76002b"]

    const response = await doGetAction(QUESTION_URL);
    const finalList = await response
      .filter(
        s => s["IsPublished"] !== false && SurveyIds_INAS_ITSP.includes(s["Id"])
      )
      .map(s => {
        return { name: s["Name"].replace("Staging_", ""), surveyid: s["Id"] };
      });

    // const finalList = await response
    //   .filter(s => s["IsPublished"] !== false)
    //   .filter(s => {
    //     if (PROD_STAGING === "staging") {
    //       return s["Name"].startsWith("Staging_");
    //     }
    //     return s;
    //   })
    //   .map(s => {
    //     return { name: s["Name"].replace("Staging_", ""), surveyid: s["Id"] };
    //   });
    console.log("surveys list", finalList);
    return await finalList;
  }
};
