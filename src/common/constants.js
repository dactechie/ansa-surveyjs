export const PARTITION_KEY = "PartitionKey";
export const ROW_KEY = "RowKey";

export const DB_EPISODE = "Episode";
export const DB_ANSA = "ANSA";

export const DB_IDTYPE_MCARE = "MCARE";
export const DB_IDTYPE_CCARE = "CCARE";
//export const DB_IDTYPE_TED = "TED";

export const SURVEY_TYPE_MAP = {
  // Survey title : RowKey code
  "ANSA ClientRegistration": "REGO",
  // "ANSA Brief Intervention Assessment": "BRIV",
  "ANSA InitialAssessment": "INAS",
  "ANSA ITSPReviewAssessment": "ITSP"
};

export const DB_META_KEYS = [
  PARTITION_KEY,
  ROW_KEY,
  "ClientID",
  "SourceDatabase",
  "Program",
  "Staff",
  "SurveyName",
  "Status",
  "SurveyID"
];
