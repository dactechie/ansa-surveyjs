export const APPLICATION_MODE_NORMAL = 1;

export const APP_AZSLOT = process.env.VUE_APP_AZSLOT;

export const CLIENT_HISTORY_URL = process.env.VUE_APP_CLIENT_HISTORY_URL;

export const SURVEY_IDS = process.env.VUE_APP_SURVEY_IDS;

export const PARTITION_KEY = "PartitionKey";
export const ROW_KEY = "RowKey";

export const MODE_EMPTY_CLIENT_DATA = 0;
export const MODE_CLIENT_DATA_SET = 1; // show client survey history

export const DB_ENTITY_NAME = "ATOM";

export const SLK_LENGTH = 14;

export const PREFILL_EXCLUSIONS_ALLCASES = "SDS_Score,K10_Score,CDS5_Score";

export const MANDATORY_FIELDS =
  "SDSIsAODUseOutOfControl,SDSDoesMissingFixMakeAnxious,SDSHowMuchDoYouWorryAboutAODUse,SDSDoYouWishToStop,SDSHowDifficultToStopOrGoWithout,Past4WkDailyLivingImpacted,Past4WkDifficultyFindingHousing,DoYouFeelSafeWhereYouLive,Past4WkPhysicalHealth,Past4WkHowOftenPhysicalHealthCausedProblems,Past4WkMentalHealth,Past4WkHowOftenMentalHealthCausedProblems,Past4WkUseLedToProblemsWithFamilyFriend,HaveDVOrFamilySafetyConcerns,Past4WkHowOftenIllegalActivities,HowCloseToManagingSubstanceUse,HowCloseToManagingImpactOfOthersUse";

export const MILLIS_IN_DAY = 86_400_000; // 24 * 60 * 60 * 1000
export const MILLIS_IN_YEAR = 31_536_000_000; // 365 * MILLIS_IN_DAY

export const DB_IDTYPE_CCARE = "CCARE";

export const SURVEY_TYPE_MAP = {
  // Survey title : RowKey code
  // ClinicalAssessment: "CLINICAL",
  // InitialOutcome: "INTOUTC",
  // ReviewOutcome: "REVOUTC",
  Start: "START",
  Final: "FINAL",
  "3MonthFollowUp": "3MTHFUP"
};

//mapping of SurveyJS.io survey title to Launch-Button display name
export const SURVEY_DISPLAY_NAMES = {
  "ATOM Family Member Questionnaire": "Family Member Questionnaire"
};

export const ARCA = "Arcadia";

export const DB_META_KEYS = [
  PARTITION_KEY,
  ROW_KEY,
  "BPClientID",
  "Program",
  "Staff",
  "SurveyName",
  "Status",
  "SurveyID"
];
