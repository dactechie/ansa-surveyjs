export const PARTITION_KEY = "PartitionKey";
export const ROW_KEY = "RowKey";

export const DB_EPISODE = "Episode";

export const DB_IDTYPE_MCARE = "MCARE";
export const DB_IDTYPE_CCARE = "CCARE";
//export const DB_IDTYPE_TED = "TED";

export const SURVEY_TYPE_MAP = {
  // Survey title : RowKey code
  ClientRegistration: "REGO",
  // "ANSA Brief Intervention Assessment": "BRIV",
  InitialAssessment: "INAS",
  ITSPReviewAssessment: "ITSP"
};

export const SURVEY_ID_MAP = [
  // Survey title : RowKey code
  { name: "ClientRegistration", surveyid: "REGO" },
  // "ANSA Brief Intervention Assessment": "BRIV",
  {
    name: "InitialAssessment",
    surveyid: "ddc3dec4-6de5-4bc9-a963-87e20896feed"
  },
  {
    name: "ITSPReviewAssessment",
    surveyid: "2509f4ab-f7ad-4be0-993d-a4884362b68a"
  }
];
