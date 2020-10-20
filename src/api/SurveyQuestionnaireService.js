// import { doGetAction } from "./RESTClient";

// const QUESTION_URL = process.env.VUE_APP_LOAD_QUESTIONNAIRES_URL;

export default {
  async getSurveysNameID() {
    return [
      {
        name: "ANSA InitialAssessment",
        surveyid: "fe8a031d-f505-43bd-b146-47e5acb0f3d6"
      },
      {
        name: "ITSP ReviewAssessment",
        surveyid: "ae192b2d-1793-471e-b937-e36ddb9badbf"
      }
    ];

    // const response = await doGetAction(QUESTION_URL);

    // const finalList = await response
    //   .filter(s => s["IsPublished"] !== false)
    //   .map(s => {
    //     return { name: s["Name"], surveyid: s["Id"] };
    //   });
    // console.log("surveys list", finalList);
    // return await finalList;
  }
};
