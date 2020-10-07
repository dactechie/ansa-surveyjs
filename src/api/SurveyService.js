import {
  getClientEpisodesByPartitionKey,
  getClientEpisodesByClientID,
  createClientEpisode,
  updateClientEpisode
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
    return await getClientEpisodesByPartitionKey(slk);
  },

  async getByIDAndType(id, idType) {
    return await getClientEpisodesByClientID(id, idType);
  },

  async createEpisode(episodeData, surveyName, teamProgram) {
    episodeData[ROW_KEY] = generateRowKey(
      SURVEY_TYPE_MAP[surveyName],
      teamProgram
    );
    return await createClientEpisode(episodeData);
  },

  async updateEpisode(episodeData, surveyName, teamProgram) {
    episodeData[ROW_KEY] = generateRowKey(
      SURVEY_TYPE_MAP[surveyName],
      teamProgram
    );
    return await updateClientEpisode(episodeData);
  }
};
