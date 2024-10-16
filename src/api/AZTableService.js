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
  "https://prod-05.australiaeast.logic.azure.com:443/workflows/bd761dc501c242ff8b9660bbe376f2f9/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=EWT2HvlbvI393jINSYDkzTS3orRmsUpOe6B4Y4DD8fI";
const UPSERT_URL =
  process.env.VUE_APP_UPSERT_TABLESTORE_LOGAPP ||
  "https://prod-24.australiaeast.logic.azure.com:443/workflows/19d45fab43ae44b9bc34b2a9d77a09aa/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uKMLzsdtlM9zstml81N1sXtnQjaIfeQ1z63FjopUSJ4";

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
