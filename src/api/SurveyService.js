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
  async getBySLK(slk) {
    return await getClientDataByPartitionKey(slk);
  },

  async getByIDAndType(id, idType) {
    return await getClientDataByClientID(id, idType);
  },

  async createOrUpdateData(SLK, rowData) {
    const { SurveyName, Program } = rowData;
    rowData[ROW_KEY] = generateRowKey(SURVEY_TYPE_MAP[SurveyName], Program);
    rowData[PARTITION_KEY] = SLK;

    if (rowData["SurveyData"]["DB_ID"]) {
      rowData["ClientID"] = rowData["SurveyData"]["clientID"];
      rowData["SourceDatabase"] = rowData["SurveyData"]["idType"];
      delete rowData["SurveyData"]["clientID"];
      delete rowData["SurveyData"]["idType"];
    }
    return await updateClientData(rowData);
  }
};
