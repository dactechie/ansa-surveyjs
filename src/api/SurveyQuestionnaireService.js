// import { doGetAction } from "./RESTClient";

// const QUESTION_URL = process.env.VUE_APP_LOAD_QUESTIONNAIRES_URL;

export default {
  async getSurveysNameID() {
    return [
      {
        name: "ANSA InitialAssessment",
        surveyid: "ddc3dec4-6de5-4bc9-a963-87e20896feed"
      },
      {
        name: "ITSP Review V1",
        surveyid: "2509f4ab-f7ad-4be0-993d-a4884362b68a"
      },

      {
        name: "Minimum InitialAssessment",
        surveyid: "9fe4d164-8c6c-4b0a-ac60-aabf803413b7"
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
