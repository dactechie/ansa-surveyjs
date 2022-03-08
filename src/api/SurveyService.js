import {
  getClientDataByPartitionKey,
  getClientDataByClientID,
  updateClientData
} from "./AZTableService";
import {
  ROW_KEY,
  PARTITION_KEY,
  SURVEY_TYPE_MAP
  // SURVEY_ID_MAP
} from "@/common/constants";
import { generateRowKey } from "@/helper-functions/survey-helpers";

export default {
  sortByAssessmentDate(surveyDataObject) {
    const result = surveyDataObject.sort((a, b) => {
      let aDate = new Date(Date.parse(a["SurveyData"]["AssessmentDate"]));
      let bDate = new Date(Date.parse(b["SurveyData"]["AssessmentDate"]));
      if (aDate > bDate) return -1;
      if (aDate < bDate) return 1;
      return 0;
    });
    return result;
  },

  async getBySLK(slk, userMode) {
    let result = await getClientDataByPartitionKey(slk, userMode);
    return this.sortByAssessmentDate(result);
  },

  async getByIDAndType(id, idType, userMode) {
    const result = await getClientDataByClientID(id, idType, userMode);
    return this.sortByAssessmentDate(result);
  },

  async createData(SLK, rowData, keyDate, userMode) {
    const { AssessmentType, Program } = rowData;
    rowData[ROW_KEY] = generateRowKey(
      SURVEY_TYPE_MAP[AssessmentType],
      Program,
      keyDate
    );
    rowData[PARTITION_KEY] = SLK;
    console.log(` in create data ${SLK}, ${rowData[ROW_KEY]}`);

    // if (rowData["SurveyData"]["DB_ID"]) {
    //   rowData["ClientID"] = rowData["SurveyData"]["clientID"];
    //   rowData["SourceDatabase"] = rowData["SurveyData"]["idType"];
    //   delete rowData["SurveyData"]["clientID"];
    //   delete rowData["SurveyData"]["idType"];
    // }
    return await updateClientData(rowData, userMode);
  },
  async updateData(rowData, userMode) {
    //const { SurveyName, Program } = rowData;
    //rowData[ROW_KEY] = generateRowKey(SURVEY_TYPE_MAP[SurveyName], Program);
    //rowData[PARTITION_KEY] = SLK;

    return await updateClientData(rowData, userMode);
  }
};
