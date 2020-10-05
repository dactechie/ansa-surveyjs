import SurveyService from "@/api/SurveyService";

export default {
  ADD_SURVEY_DATASERVER: async function(context, surveyData) {
    try {
      const response = await SurveyService.createEpisode(surveyData);
      console.log(response);
      //commit( , response);
    } catch (error) {
      console.log("error ", error);
    }
  }
};
