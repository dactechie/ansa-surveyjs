import { getByID, getByIDAndType } from "./src/api/TableStorageService";

export default {
  // getIncompleteSurveyData (client_id, id_type='SLK')  {
  //   console.log(`get partial survey for client ${client_id}`);
  //   return myAxios.get(
  //     `${myAxios.defaults.baseURL}?request_type=get_partial_ia&client_id=${client_id}&id_type=${id_type}`);
  //   // return myAxios.get(`/survey_answers/${clientId}`);
  // },
  async fetchClientData(client_lookup) {
    let result = {};

    if (client_lookup["IDType"] === "slk") {
      console.log("calling get Client iD", client_lookup["ClientID"]);
      result = await getByID(client_lookup["ClientID"]);
    } else {
      console.log("hererere ");
      console.table(client_lookup);
      result = await getByIDAndType(
        client_lookup["ClientID"],
        client_lookup["IDType"],
        "Episode"
      );
    }
    if (!result) {
      console.log("No episode data for client ", client_lookup);
    } else {
      delete result["undefined"];
    }

    return result;
  }
};
