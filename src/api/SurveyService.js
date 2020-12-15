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
  async getBySLK(slk, userMode) {
    return await getClientDataByPartitionKey(slk, userMode);
  },

  async getByIDAndType(id, idType, userMode) {
    return await getClientDataByClientID(id, idType, userMode);
  },

  async createData(SLK, rowData, keyDate, userMode) {
    const { SurveyName, Program } = rowData;
    rowData[ROW_KEY] = generateRowKey(
      SURVEY_TYPE_MAP[SurveyName],
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
