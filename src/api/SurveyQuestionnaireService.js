import { doGetAction } from "./RESTClient";
import { APP_AZSLOT as PROD_STAGING } from "../common/constants";

const QUESTION_URL = process.env.VUE_APP_LOAD_QUESTIONNAIRES_URL;

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

    const response = await doGetAction(QUESTION_URL);

    const finalList = await response
      .filter(s => s["IsPublished"] !== false)
      .filter(s => {
        if (PROD_STAGING === "staging") {
          return s["Name"].startsWith("Staging_");
        }
        return s;
      })
      .map(s => {
        return { name: s["Name"].replace("Staging_", ""), surveyid: s["Id"] };
      });
    console.log("surveys list", finalList);
    return await finalList;
  }
};
