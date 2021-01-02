import { doPostAction } from "./RESTClient";
import {
  PARTITION_KEY,
  ROW_KEY,
  DB_ENTITY_NAME,
  DB_IDTYPE_CCARE,
  APPLICATION_MODE_NORMAL
} from "@/common/constants";
import { fromAZDataArray } from "@/common/AZDataAdapter";

const GET_URL = process.env.VUE_APP_GET_TABLESTORE_LOGAPP;
const UPSERT_URL = process.env.VUE_APP_UPSERT_TABLESTORE_LOGAPP;

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
    userMode: userMode
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
