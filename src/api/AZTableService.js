import { doPostAction } from "./RESTClient";
import {
  PARTITION_KEY,
  ROW_KEY,
  DB_ENTITY_NAME,
  DB_IDTYPE_CCARE,
  APPLICATION_MODE_NORMAL
} from "@/common/constants";
import { fromAZDataArray } from "@/common/AZDataAdapter";

const GET_URL =
  process.env.VUE_APP_GET_TABLESTORE_LOGAPP ||
  "https://prod-17.australiaeast.logic.azure.com:443/workflows/be0a8dea3ab745a4a5d97eccd1b83031/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MCITViHJkPk8oYnoGZBsZ9Tt6Y5i2U4UJlQydDYt4xs";
const UPSERT_URL =
  process.env.VUE_APP_UPSERT_TABLESTORE_LOGAPP ||
  "https://prod-04.australiaeast.logic.azure.com:443/workflows/8f28bb73d4ef444087fba44ef000d926/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=fLjV1to0RFjB1TSpuNuMkojtcsDr5VmHXx9rvGJXmqg";

/**
 * In active mode
 */
function updateClientData(
  rowData,
  userMode = APPLICATION_MODE_NORMAL,
  entity = DB_ENTITY_NAME
) {
  //const azTableJSON = toAZDataStructure(rowData);
  let data = {
    Entity: entity,
    Operation: "update",
    PartitionKey: rowData[PARTITION_KEY],
    RowKey: rowData[ROW_KEY],
    EntityJSON: rowData,
    userMode: userMode,
    Status: rowData["Status"]
  };
  return doPostAction(UPSERT_URL, data);
}

async function getClientDataByPartitionKey(
  partitionKey,
  userMode = APPLICATION_MODE_NORMAL,
  entity = DB_ENTITY_NAME
) {
  let data = {
    Entity: entity,
    idType: PARTITION_KEY,
    clientID: partitionKey,
    requestType: "GET",
    userMode: userMode
  };
  const result = await doPostAction(GET_URL, data);
  return fromAZDataArray(await result.value);
}

async function getClientDataByClientID(
  clientID,
  idType = DB_IDTYPE_CCARE,
  userMode = APPLICATION_MODE_NORMAL,
  entity = DB_ENTITY_NAME
) {
  let data = {
    Entity: entity,
    idType: idType,
    clientID: clientID,
    requestType: "GET",
    userMode: userMode
  };
  const result = await doPostAction(GET_URL, data);
  return fromAZDataArray(await result.value);
}

export {
  getClientDataByPartitionKey,
  getClientDataByClientID,
  updateClientData
};
