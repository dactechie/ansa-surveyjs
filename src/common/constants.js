export const PARTITION_KEY = "PartitionKey";
export const ROW_KEY = "RowKey";

export const MODE_EMPTY_CLIENT_DATA = 0;
export const MODE_CLIENT_DATA_SET = 1; // show client survey history

export const DB_EPISODE = "Episode";
export const DB_ANSA = "ANSA";

export const SLK_LENGTH = 14;

export const DB_IDTYPE_CCARE = "CCARE";
//export const DB_IDTYPE_TED = "TED";

export const SURVEY_TYPE_MAP = {
  // Survey title : RowKey code
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
