export const APPLICATION_MODE_NORMAL = 1;
export const APPLICATION_MODE_ADMIN = 0;

export const APP_ENVIRONMENT = process.env.VUE_APP_ENVIRONMENT || "staging";

export const APP_AZSLOT = process.env.VUE_APP_AZSLOT || "staging";

export const CLIENT_HISTORY_URL = process.env.VUE_APP_CLIENT_HISTORY_URL;

export const SURVEY_IDS =
  process.env.VUE_APP_SURVEYIDS_INAS_ITSP ||
  "a756e7f0-2be0-4888-8326-e0fa97f9bf72_677c0e2a-1446-4dd6-bb61-4204ee693d79_8a3f9c55-c9ac-4824-9f82-6bf4bec93fae_708f01d7-20cb-4b98-948a-e7b8888bcbca_85e8b35d-5b10-4707-a550-8cb62ce1ea50_94c10760-f04d-4e5e-8ec3-1432c4cde1c8_aff3512e-057c-4792-b10a-872a584d2224_28b00db7-bb8a-4096-b326-04406806ba89";

export const PARTITION_KEY = "PartitionKey";
export const ROW_KEY = "RowKey";

export const MODE_EMPTY_CLIENT_DATA = 0;
export const MODE_CLIENT_DATA_SET = 1; // show client survey history

export const DB_ENTITY_NAME = "ATOM";

export const SLK_LENGTH = 14;

// export const PREFILL_EXCLUSIONS = process.env.VUE_APP_PREFILL_EXCLUSIONS || "";
// export const PREFILL_EXCLUSIONS_ALLCASES =
//   process.env.VUE_APP_PREFILL_EXCLUSIONS_ALLCASES || "";

// export const MANDATORY_FIELDS = process.env.VUE_APP_MANDATORY_FIELDS || "";

export const PREFILL_EXCLUSIONS_ALLCASES = "SDS_Score,K10_Score,CDS5_Score";
export const PREFILL_EXCLUSIONS =
  "AssessmentType,doK10,SubstanceUseITSPIssues,SubstanceUseITSPGoals,EverydayLivingITSPIssues,EverydayLivingITSPGoals,HousingSafetyITSPIssues,HousingSafetyITSPGoals,PhysicalHealthITSPIssues,PhysicalHealthITSPGoals,MentalITSPIssues,MentalHealthITSPGoals,RelationshipsITSPIssues,RelationshipsITSPGoals,LegalITSPIssues,LegalITSPGoals,SDSIsAODUseOutOfControl,SDSDoesMissingFixMakeAnxious,SDSHowMuchDoYouWorryAboutAODUse,SDSDoYouWishToStop,SDSHowDifficultToStopOrGoWithout,doK10,K10Q01,K10Q02,K10Q03,K10Q04,K10Q05,K10Q06,K10Q07,K10Q08,K10Q09,K10Q10,CDS5RateAddictiontoCigarettes,CDS5HowManyCigarettesPerDay,CDS5HowSoonAfterWaking,CDS5HowHardIsQuitting,CDS5HowStrongTheUrgeToSmoke,Past4WkDailyLivingImpacted,Past4WkDifficultyFindingHousing,Past4WkPhysicalHealth,Past4WkHowOftenPhysicalHealthCausedProblems,Past4WkMentalHealth,Past4WkHowOftenMentalHealthCausedProblems,Past4WkUseLedToProblemsWithFamilyFriend,Past4WkHowOftenIllegalActivities,Past4WkQualityOfLifeScore";
export const MANDATORY_FIELDS =
  "SDSIsAODUseOutOfControl,SDSDoesMissingFixMakeAnxious,SDSHowMuchDoYouWorryAboutAODUse,SDSDoYouWishToStop,SDSHowDifficultToStopOrGoWithout,Past4WkDailyLivingImpacted,Past4WkDifficultyFindingHousing,DoYouFeelSafeWhereYouLive,Past4WkPhysicalHealth,Past4WkHowOftenPhysicalHealthCausedProblems,Past4WkMentalHealth,Past4WkHowOftenMentalHealthCausedProblems,Past4WkUseLedToProblemsWithFamilyFriend,HaveDVOrFamilySafetyConcerns,Past4WkHowOftenIllegalActivities,HowCloseToManagingSubstanceUse,HowCloseToManagingImpactOfOthersUse";

// export const PREFILL_EXCLUSION_PREFIXES = (
//   process.env.VUE_APP_PREFILL_EXCLUSION_PREFIXES || []
// ).split(",");
// export const PREFILL_EXCLUSION_SUFFIXES = (
//   process.env.VUE_APP_PREFILL_EXCLUSION_SUFFIXES || []
// ).split(",");

export const MILLIS_IN_DAY = 86_400_000; // 24 * 60 * 60 * 1000
export const MILLIS_IN_YEAR = 31_536_000_000; // 365 * MILLIS_IN_DAY

export const DB_IDTYPE_CCARE = "CCARE";

export const SURVEY_TYPE_MAP = {
  // Survey title : RowKey code
  InitialAssessment: "INAS",
  ITSPReview: "ITSP",
  ArcadiaITSPReview: "ITSP",
  SupplementaryIntakeAssessment: "SITK",
  PostTreatmentAssessment: "POTA",
  PsyReview: "ITSP",
  PsyEnd: "PYND"
};

//mapping of SurveyJS.io survey title to Launch-Button display name
export const SURVEY_DISPLAY_NAMES = {
  "ATOM Initial Assessment": "’New Episode’ assessment",
  "ATOM ITSP Review Assessment": "ITSP review",
  "Arcadia House Assessments": "Arcadia House Assessments",
  "ATOM Psych Assessment": "Psych Program Assessments",
  "ATOM Butt-It-Out Assessment": "Butt-It-Out Assessment",
  "ATOM T25 Initial Assessment": "T-25 Initial Assessment",
  "ATOM T25 Review Assessment": "T-25 Review Assessment"
};

export const ARCA = "Arcadia";

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
