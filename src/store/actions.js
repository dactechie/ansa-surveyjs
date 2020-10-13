import SurveyService from "@/api/SurveyService";
import QuestionnaireService from "@/api/SurveyQuestionnaireService";
import { PARTITION_KEY, DB_META_KEYS } from "@/common/constants";
import { getCurrentTimestamp } from "@/common/utils";

export default {
  toggleSidebar(context) {
    context.commit("toggleSidebar");
  },
  GET_QUESTIONNAIRE_LISTING: async function({ commit }) {
    try {
      const response = await QuestionnaireService.getSurveysNameID();
      commit("setSurveyList", await response);
      // state["surveyNameIDList"] = await response;
      console.log("questsionnari service: ", response);
    } catch (error) {
      console.log("error ", error);
    }
  },
  GET_CLIENT_DATA_BYSLK: async function({ commit }, slk) {
    try {
      const result = await SurveyService.getBySLK(slk);
      if (result && result.length > 0) {
        commit("setClientData", await result);
        commit("setClientSLK", await result[0][PARTITION_KEY]);
      }

      return await result;
    } catch (error) {
      console.log("error ", error);
    }
  },
  GET_CLIENT_DATA_BYID: async function({ commit }, id, idType) {
    try {
      const result = await SurveyService.getByIDAndType(id, idType);
      if (result && result.length > 0) {
        commit("setClientData", await result);
        commit("setClientSLK", await result[0][PARTITION_KEY]);
      }
      return await result;
    } catch (error) {
      console.log("error ", error);
    }
  },
  ADD_SURVEY_DATASERVER: async function(
    { state },
    { SLK, surveyData, surveyId, status }
  ) {
    try {
      let dbObj = {};
      const data = {};
      // Meta Keys are common to all surveys.
      // before uploading, unflatten the survey data and push it into "SurveyData" string
      Object.entries(surveyData).forEach(([key, value]) => {
        if (DB_META_KEYS.indexOf(key) >= 0) dbObj[key] = value;
        else data[key] = value;
      });
      // if this is a brand new object to be stored, there won't be a 'Timestamp'
      // use this info to capture the created date time.
      if (!("Timestamp" in data)) {
        data["CreatedDatetime"] = getCurrentTimestamp();
      } else {
        // data update (Put):
        // no need to try and override the Timestamp that was drawn from the server
        delete data["Timestamp"];
      }
      dbObj = {
        ...dbObj,
        SurveyID: surveyId,
        Status: status,
        SurveyData: JSON.stringify(data),
        SurveyName: state.surveyName
      };
      const response = await SurveyService.createOrUpdateData(SLK, dbObj);
      console.log(response);
    } catch (error) {
      console.log("error ", error);
    }
  }
};
