import { doPostAction } from "./RESTClient";
import {
  PARTITION_KEY,
  ROW_KEY,
  DB_ANSA,
  DB_IDTYPE_CCARE
} from "@/common/constants";
import { fromAZDataArray } from "@/common/AZDataAdapter";

const GET_URL = process.env.VUE_APP_GET_TABLESTORE_LOGAPP;
const UPSERT_URL = process.env.VUE_APP_UPSERT_TABLESTORE_LOGAPP;

function createClientData(rowData, entity = DB_ANSA) {
  //const azTableJSON = toAZDataStructure(rowData);
  let data = {
    Entity: entity,
    EntityJSON: rowData
  };
  return doPostAction(UPSERT_URL, data);
}

function updateClientData(rowData, entity = DB_ANSA) {
  //const azTableJSON = toAZDataStructure(rowData);
  let data = {
    Entity: entity,
    Operation: "update",
    PartitionKey: rowData[PARTITION_KEY],
    RowKey: rowData[ROW_KEY],
    EntityJSON: rowData
  };
  return doPostAction(UPSERT_URL, data);
}

async function getClientDataByPartitionKey(partitionKey, entity = DB_ANSA) {
  let data = {
    Entity: entity,
    idType: PARTITION_KEY,
    clientID: partitionKey,
    requestType: "GET"
  };
  const result = await doPostAction(GET_URL, data);
  return fromAZDataArray(await result.value);
}

async function getClientDataByClientID(
  clientID,
  entity = DB_ANSA,
  idType = DB_IDTYPE_CCARE
) {
  let data = {
    Entity: entity,
    idType: idType,
    clientID: clientID,
    requestType: "GET"
  };
  const result = await doPostAction(GET_URL, data);
  return fromAZDataArray(await result.value);
}

export {
  getClientDataByPartitionKey,
  getClientDataByClientID,
  createClientData,
  updateClientData
};
