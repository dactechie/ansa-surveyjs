import {
  getClientEpisodesByPartitionKey,
  getClientEpisodesByClientID,
  createClientEpisode
} from "./AZTableService";

export default {
  async getBySLK(slk) {
    return await getClientEpisodesByPartitionKey(slk);
  },

  async getByIDAndType(id, idType) {
    return await getClientEpisodesByClientID(id, idType);
  },

  async createEpisode(episodeData) {
    return await createClientEpisode(episodeData);
  }
};
