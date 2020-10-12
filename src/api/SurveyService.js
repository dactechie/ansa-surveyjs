import {
  getClientDataByPartitionKey,
  getClientDataByClientID,
  createClientData,
  updateClientData
} from "./AZTableService";
import {
  ROW_KEY,
  // PARTITION_KEY,
  SURVEY_TYPE_MAP
  // SURVEY_ID_MAP
} from "@/common/constants";
import { generateRowKey } from "@/helper-functions/survey-helpers";

export default {
  async getBySLK(slk) {
    return await getClientDataByPartitionKey(slk);
  },

  async getByIDAndType(id, idType) {
    return await getClientDataByClientID(id, idType);
  },

  async createData(rowData, surveyName, teamProgram) {
    rowData[ROW_KEY] = generateRowKey(SURVEY_TYPE_MAP[surveyName], teamProgram);
    return await createClientData(rowData);
  },

  async updateData(rowData, surveyName, teamProgram) {
    //let data = {SurveyData: rowData
    rowData[ROW_KEY] = generateRowKey(SURVEY_TYPE_MAP[surveyName], teamProgram);
    return await updateClientData(rowData);
  }
};
