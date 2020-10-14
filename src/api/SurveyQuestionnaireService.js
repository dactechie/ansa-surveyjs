// import { doGetAction } from "./RESTClient";

// const QUESTION_URL = process.env.VUE_APP_LOAD_QUESTIONNAIRES_URL;

export default {
  async getSurveysNameID() {
    return [
      {
        name: "ANSA ClientRegistration",
        surveyid: "ef269b86-8397-4d15-9a13-a46e683b9a12"
      },
      {
        name: "ANSA InitialAssessment",
        surveyid: "4f9a16b6-3ee2-4568-841f-194db4baef8c" //"ddc3dec4-6de5-4bc9-a963-87e20896feed"
      },
      {
        name: "ITSP ReviewAssessment",
        surveyid: "26c2c77a-e85d-43a3-b129-d4f70734fac7" //2509f4ab-f7ad-4be0-993d-a4884362b68a"
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
