export const APPLICATION_MODE_NORMAL = 0;
export const APPLICATION_MODE_ADMIN = 1;

export const APP_ENVIRONMENT = process.env.VUE_APP_ENVIRONMENT || "prod";

export const PARTITION_KEY = "PartitionKey";
export const ROW_KEY = "RowKey";

export const MODE_EMPTY_CLIENT_DATA = 0;
export const MODE_CLIENT_DATA_SET = 1; // show client survey history

export const DB_EPISODE = "Episode";
export const DB_ENTITY_NAME = "ATOM";

export const SLK_LENGTH = 14;
export const PREFILL_EXPIRY_DAYS =
  process.env.VUE_APP_PREFILL_EXPIRY_DAYS || 365;

export const INCOMPLETE_CONTINUATION_EXPIRY_DAYS =
  process.env.VUE_APP_INCOMPLETE_CONTINUATION_EXPIRY_DAYS || 21;

export const MILLIS_IN_DAY = 86_400_000; // 24 * 60 * 60 * 1000
export const MILLIS_IN_YEAR = 31_536_000_000; // 365 * MILLIS_IN_DAY

export const DB_IDTYPE_CCARE = "CCARE";
//export const DB_IDTYPE_TED = "TED";

export const SURVEY_TYPE_MAP = {
  // Survey title : RowKey code
  "ATOM Initial Assessment": "INAS",
  "ATOM ITSP Review Assessment": "ITSP",
  TestSurvey: "TEST"
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
