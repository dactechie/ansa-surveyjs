import {
  getClientEpisodesByPartitionKey,
  getClientEpisodesByClientID
} from "./AZTableService";

export async function getBySLK(slk) {
  return await getClientEpisodesByPartitionKey(slk);
}

export async function getByIDAndType(id, idType) {
  return await getClientEpisodesByClientID(id, idType);
}
