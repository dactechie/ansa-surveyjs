import { getDataAsync, doPostAction } from "./RESTClient";

const GET_URL = process.env.VUE_APP_GET_TABLESTORE_LOGAPP;
const CREATE_URL = process.env.VUE_APP_CREATE_TABLESTORE_LOGAPP;

function createClientEpisode(episodeData) {
  let data = {
    Entity: "Episode",
    EntityJSON: episodeData
  };

  return doPostAction(CREATE_URL, data);
}

function getClientEpisodesByPartitionKey(partitionKey) {
  let data = {
    Entity: "Episode",
    idType: "PartitionKey",
    clientID: partitionKey,
    requestType: "GET"
  };
  return getDataAsync(GET_URL, data);
}

function getClientEpisodesByClientID(clientID, idType = "MCARE") {
  let data = {
    Entity: "Episode",
    idType: idType,
    clientID: clientID,
    requestType: "GET"
  };
  return getDataAsync(GET_URL, data);
}

export {
  getClientEpisodesByPartitionKey,
  getClientEpisodesByClientID,
  createClientEpisode
};

// const partitionKey = "ALLFT210719811";

// getClientEpisodesByPartitionKey(partitionKey)
//   .then(result => {
//     console.log(result);
//   })
//   .catch(err => {
//     console.error(err);
//   });
