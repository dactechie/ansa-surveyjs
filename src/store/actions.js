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
      console.log("questsionnari service: ", response);
    } catch (error) {
      console.log("error ", error);
    }
  },
  GET_CLIENT_DATA_BYSLK: async function({ state, commit }, slk) {
    try {
      const result = await SurveyService.getBySLK(slk, state.applicationMode);
      if ((await result) && result.length > 0) {
        commit("setClientData", result);
        commit("setClientSLK", result[0][PARTITION_KEY]);
      }
      return await result;
    } catch (error) {
      console.log("error ", error);
    }
  },
  GET_CLIENT_DATA_BYID: async function({ state, commit }, id, idType) {
    try {
      const result = await SurveyService.getByIDAndType(
        id,
        idType,
        state.applicationMode
      );
      if ((await result) && result.length > 0) {
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
      // Meta Keys are common to all surveys. they are the columns in the backend database
      // before uploading, extract these values out of the surveyData to store them as individual fields for ease of lookup/reporting
      Object.entries(surveyData).forEach(([key, value]) => {
        if (DB_META_KEYS.indexOf(key) >= 0) dbObj[key] = value;
        else data[key] = value;
      });
      // if this is a brand new object to be stored, there won't be a 'Timestamp'
      // use this info to capture the created date time.
      if (!("Timestamp" in data)) {
        data["CreatedDatetime"] = getCurrentTimestamp();
      } else {
        console.log("Pre save timestamp: ", data["TimeStamp"]);
        // data update (Put):
        // no need to try and override the Timestamp that was drawn from the server
        delete data["Timestamp"];
      }
      dbObj = {
        ...dbObj,
        SurveyID: surveyId,
        Status: status,
        SurveyData: JSON.stringify(data),
        SurveyName: state.surveyName,
        IsActive: 1
      };
      let response = {};
      // if (status === "Incomplete") {
      //   response = await SurveyService.updateData(
      //     //use the orginal row key which has the Created date.   (no separate rows)
      //     dbObj, //partition key from db-meta-keys
      //     state.applicationMode // if admin, can override in Completed survey, creates a new entry and makes the old one inactive.
      //   );
      // } else {
      response = await SurveyService.createData(
        // may be a paritial save
        SLK, //partition key
        dbObj,
        surveyData["AssessmentDate"].replaceAll("-", ""),
        state.applicationMode // if admin, can override in Completed survey, creates a new entry and makes the old one inactive.
      );
      // }
      console.log(response);
    } catch (error) {
      console.log("error ", error);
    }
  }
};
