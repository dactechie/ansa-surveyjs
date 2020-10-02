/* eslint-disable no-eval */
import {
  createTableServiceWithSas,
  TableQuery
  // TableBatch
} from "./azure-storage.table";
import { promisify } from "@/common/utils";
//  Constants.TableConstants.Operations
const tableService = createTableServiceWithSas(
  process.env.VUE_APP_DATASTORE_HOST_URI,
  process.env.VUE_APP_SAS_TOKEN_STORE_MDS
);

// export async function getMultiBatch() {
//   const entity = { PartitionKey:
//     {_: partitionKey, $: 'Edm.String'},
//     RowKey: {_: rowKey, $: 'Edm.String'},
//   };
//   TableBatch.addOperation(TableConstants.Operations.RETRIEVE, entity, options);

// }

export async function getBySLK(id, queryType = "Episode") {
  const query = new TableQuery().where(`PartitionKey eq ?`, id);
  return await promisify(
    tableService,
    tableService.queryEntities,
    queryType,
    query,
    null
  );
}

export async function getByIDAndType(
  id,
  idType = "MCARE",
  queryType = "Episode"
) {
  const query = new TableQuery()
    .where("ClientID == ? ", id)
    .and("IDType == ?", idType);

  // const query = new TableQuery()
  //                         .where( `${idType} eq ?`, id);
  return await promisify(
    tableService,
    tableService.queryEntities,
    queryType,
    query,
    null
  );
}
