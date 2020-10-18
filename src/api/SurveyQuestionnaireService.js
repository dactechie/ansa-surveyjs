// import { doGetAction } from "./RESTClient";

// const QUESTION_URL = process.env.VUE_APP_LOAD_QUESTIONNAIRES_URL;

export default {
  async getSurveysNameID() {
    return [
      {
        name: "ANSA InitialAssessment",
        surveyid: "064fd0f3-42da-48ff-bc91-f647c6cc2c60"
      },
      {
        name: "ITSP ReviewAssessment",
        surveyid: "04aa908a-5a88-4557-b4f5-be455e8a6347"
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
