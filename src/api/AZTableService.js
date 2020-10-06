import { doPostAction } from "./RESTClient";
import {
  PARTITION_KEY,
  ROW_KEY,
  DB_EPISODE,
  DB_IDTYPE_MCARE
} from "@/common/constants";

const GET_URL = process.env.VUE_APP_GET_TABLESTORE_LOGAPP;
const UPSERT_URL = process.env.VUE_APP_UPSERT_TABLESTORE_LOGAPP;

function createClientEpisode(episodeData, entity = DB_EPISODE) {
  let data = {
    Entity: entity,
    EntityJSON: episodeData
  };
  return doPostAction(UPSERT_URL, data);
}

function updateClientEpisode(episodeData, entity = DB_EPISODE) {
  let data = {
    Entity: entity,
    Operation: "update",
    PartitionKey: episodeData[PARTITION_KEY],
    RowKey: episodeData[ROW_KEY],
    EntityJSON: episodeData
  };
  return doPostAction(UPSERT_URL, data);
}

function getClientEpisodesByPartitionKey(partitionKey, entity = DB_EPISODE) {
  let data = {
    Entity: entity,
    idType: PARTITION_KEY,
    clientID: partitionKey,
    requestType: "GET"
  };
  return doPostAction(GET_URL, data);
}

function getClientEpisodesByClientID(
  clientID,
  entity = DB_EPISODE,
  idType = DB_IDTYPE_MCARE
) {
  let data = {
    Entity: entity,
    idType: idType,
    clientID: clientID,
    requestType: "GET"
  };
  return doPostAction(GET_URL, data);
}

export {
  getClientEpisodesByPartitionKey,
  getClientEpisodesByClientID,
  createClientEpisode,
  updateClientEpisode
};
