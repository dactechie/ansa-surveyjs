import { getDataAsync } from "./RESTClient";

const URL = process.env.VUE_APP_DATASTORE_LOGAPP;

function getClientEpisodesByPartitionKey(partitionKey) {
  let data = {
    Entity: "Episode",
    idType: "PartitionKey",
    clientID: partitionKey,
    requestType: "GET"
  };
  return getDataAsync(URL, data);
}

function getClientEpisodesByClientID(clientID, idType = "MCARE") {
  let data = {
    Entity: "Episode",
    idType: idType,
    clientID: clientID,
    requestType: "GET"
  };
  return getDataAsync(URL, data);
}

export { getClientEpisodesByPartitionKey, getClientEpisodesByClientID };

// const partitionKey = "ALLFT210719811";

// getClientEpisodesByPartitionKey(partitionKey)
//   .then(result => {
//     console.log(result);
//   })
//   .catch(err => {
//     console.error(err);
//   });
