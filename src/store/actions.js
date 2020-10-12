import SurveyService from "@/api/SurveyService";
import QuestionnaireService from "@/api/SurveyQuestionnaireService";
import { PARTITION_KEY, DB_META_KEYS } from "@/common/constants";
export default {
  toggleSidebar(context) {
    context.commit("toggleSidebar");
  },
  GET_QUESTIONNAIRE_LISTING: async function({ commit }) {
    try {
      const response = await QuestionnaireService.getSurveysNameID();
      commit("setSurveyList", await response);
      // state["surveyNameIDList"] = await response;
      // debugger;
      console.log("questsionnari service: ", response);
      //commit( , response);
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
  ADD_SURVEY_DATASERVER: async function(context, data) {
    try {
      let dbObj = { SurveyData: {} };
      //get keys to push into "SurveyData" key for database
      Object.keys(data).forEach(key => {
        if (DB_META_KEYS.indexOf(key) >= 0) {
          dbObj[key] = data[key];
        } else {
          dbObj["SurveyData"][key] = data[key];
        }
      });
      delete dbObj["SurveyData"]["Timestamp"];
      dbObj["SurveyData"] = JSON.stringify(dbObj["SurveyData"]);

      const response = await SurveyService.createData(
        dbObj,
        dbObj["SurveyName"],
        dbObj["Program"]
      );
      console.log(response);
      //commit( , response);
    } catch (error) {
      console.log("error ", error);
    }
  },

  UPDATE_SURVEY_DATASERVER: async function(
    context,
    surveyData,
    surveyName,
    teamProgram
  ) {
    try {
      const response = await SurveyService.updateData(
        surveyData,
        surveyName,
        teamProgram
      );
      console.log(response);
      //commit( , response);
    } catch (error) {
      console.log("error ", error);
    }
  }
};
