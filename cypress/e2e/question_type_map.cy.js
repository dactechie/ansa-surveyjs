import {
  checkDeepNestedRadio,
  selectDropdownOption,
  selectDropdownWithAria,
  textareaWithinDiv,
  // checkboxes,
  inputWithAria,
  checkboxesWithinDiv2,
  selectRadioOption,
  inputTypeTextWithinDiv
} from "./survey_pages/utils";

export const qmap = {
  Program: checkDeepNestedRadio,
  Staff: checkDeepNestedRadio,
  ClientType: checkDeepNestedRadio,
  IndigenousStatus: selectDropdownOption,
  "Preferred Language": selectDropdownWithAria,
  CountryOfBirth: selectDropdownOption,

  "Drug of concern/Gambling": selectDropdownWithAria,
  "Method of Use": selectDropdownWithAria,
  "Days used in last 4 weeks?": selectDropdownWithAria,
  Units: selectDropdownWithAria,
  "How much per occasion of use?": selectDropdownWithAria,
  "Age First Used": inputWithAria,
  "Age Last Used": inputWithAria,
  Goals: selectDropdownWithAria,

  SDSIsAODUseOutOfControl: checkDeepNestedRadio,
  SDSDoesMissingFixMakeAnxious: checkDeepNestedRadio,
  SDSHowMuchDoYouWorryAboutAODUse: checkDeepNestedRadio,
  SDSDoYouWishToStop: checkDeepNestedRadio,
  SDSHowDifficultToStopOrGoWithout: checkDeepNestedRadio,

  CDS5RateAddictiontoCigarettes: checkDeepNestedRadio,
  CDS5HowManyCigarettesPerDay: checkDeepNestedRadio,
  CDS5HowSoonAfterWaking: checkDeepNestedRadio,
  CDS5HowHardIsQuitting: checkDeepNestedRadio,
  CDS5HowStrongTheUrgeToSmoke: checkDeepNestedRadio,

  DoYouSmoke: selectRadioOption,
  MotivationtoQuit: checkDeepNestedRadio,
  ManagingQuitting: checkDeepNestedRadio,

  //impactOfSubstanceUse
  Past4WkAodRisks: checkboxesWithinDiv2,

  //missing
  //Past4WkAodRisks:textareaWithinDiv --> same key, include in the above handler : textareaWithinDiv("Past4WkAodRisks", "AOD risk text");
  Past4WkAnyOtherAddictiveB: checkDeepNestedRadio,
  BehavioursOfDependenceNotes: textareaWithinDiv,
  SubstanceUseITSPIssues: textareaWithinDiv,
  SubstanceUseITSPGoals: textareaWithinDiv,

  //dailyLivingImpact
  Past4WkDailyLivingImpacted: checkDeepNestedRadio,
  PrioritiseCare: checkDeepNestedRadio,
  EverydayLivingITSPIssues: textareaWithinDiv,
  EverydayLivingITSPGoals: textareaWithinDiv,

  // Housing
  UsualAccommodation: selectDropdownOption,
  LivingArrangement: selectDropdownOption,
  YourCurrentHousing: selectDropdownOption,
  Past4WkDifficultyFindingHousing: checkDeepNestedRadio,
  DoYouFeelSafeWhereYouLive: checkDeepNestedRadio,
  HousingSafetyITSPIssues: textareaWithinDiv,
  HousingSafetyITSPGoals: textareaWithinDiv,

  //Physical Health
  Past4WkPhysicalHealth: selectRadioOption,
  Past4WkHowOftenPhysicalHealthCausedProblems: checkDeepNestedRadio,
  Past4WkBeenHospCallAmbulance: checkDeepNestedRadio,
  Past4WkBeenHospCallAmbulanceNotes: textareaWithinDiv,
  HealthChecklist_STAFF: checkboxesWithinDiv2,
  PhysicalHealthITSPIssues: textareaWithinDiv,
  PhysicalHealthITSPGoals: textareaWithinDiv,

  //Mental Health
  Past4WkMentalHealth: selectRadioOption,
  Past4WkHowOftenMentalHealthCausedProblems: checkDeepNestedRadio,
  EverDiagnosedMentalHealthIssue: checkDeepNestedRadio,
  "When were you diagnosed?": selectDropdownWithAria, //selectDropdownOption,

  // cy.get('textarea[aria-label="When were you diagnosed?"]')
  // .clear({ force: true })
  // .first()
  // .type("diagnosed 2 days ago with depression", { force: true });

  MHRecentRiskIssues: checkboxesWithinDiv2, // MHRecentRiskIssues text part of this  textareaWithinDiv
  MHHistoricalRiskIssues: checkboxesWithinDiv2, //textareaWithinDiv("MHHistoricalRiskIssues",
  K10Q01: checkDeepNestedRadio,
  K10Q02: checkDeepNestedRadio,
  K10Q03: checkDeepNestedRadio,
  K10Q04: checkDeepNestedRadio,
  K10Q05: checkDeepNestedRadio,
  K10Q06: checkDeepNestedRadio,
  K10Q07: checkDeepNestedRadio,
  K10Q08: checkDeepNestedRadio,
  K10Q09: checkDeepNestedRadio,
  K10Q10: checkDeepNestedRadio,
  MentalITSPIssues: textareaWithinDiv, // shouold this be MentalHeatlhITSPIssues?????  .............
  MentalHealthITSPGoals: textareaWithinDiv,

  //relationships
  HaveAnySocialSupport: checkDeepNestedRadio, // combo with HaveAnySocialSupport text textareaWithinDiv
  Past4WkUseLedToProblemsWithFamilyFriend: checkDeepNestedRadio,
  HaveDVOrFamilySafetyConcerns: checkDeepNestedRadio, /// combo with HaveDVOrFamilySafetyConcerns text textareaWithinDiv
  Past4WkHaveYouViolenceAbusive: checkDeepNestedRadio, // combo with checkDeepNestedRadio textareas
  Past4WkHadCaregivingResponsibilities: checkDeepNestedRadio,
  PrimaryCaregiver: checkboxesWithinDiv2, //combo with textarea
  ChildProtectionConcerns: checkDeepNestedRadio,
  ChildProtectionDetails: textareaWithinDiv,
  RelationshipsITSPIssues: textareaWithinDiv,
  RelationshipsITSPGoals: textareaWithinDiv,

  //legal
  HaveYouServedCustodialSentenceInPast: checkDeepNestedRadio, // combo woth textarea
  Past4WkBeenArrested: checkDeepNestedRadio, //combo with textarea

  Past4WkHowOftenIllegalActivities: checkDeepNestedRadio,
  SubjectToCourtOrdersOrPendingCharges: checkDeepNestedRadio,
  NeedHelpWrkDevlpmntOrdrPayingOutstndngFines: checkDeepNestedRadio,
  LegalITSPIssues: textareaWithinDiv,
  LegalITSPGoals: textareaWithinDiv,

  // hwere are you at right now
  HowImportantIsChangeToYou: textareaWithinDiv, //combo wth text area
  HowCloseToManagingSubstanceUse: checkDeepNestedRadio,
  "Notes-HowCloseToManagingSubstanceUse": inputTypeTextWithinDiv,
  HowSatisfiedWithProgress: checkDeepNestedRadio,
  Past4WkQualityOfLifeScore: checkDeepNestedRadio,
  "Notes-Past4WkQualityOfLifeScore": inputTypeTextWithinDiv,
  AreYouAccessingOtherServices: checkDeepNestedRadio,
  SupportFromWhichOtherServices: checkboxesWithinDiv2,

  //official use
  SupportTypeBestMatchesNeedsGoals: checkboxesWithinDiv2,
  ExternalReferrals: checkboxesWithinDiv2, //combo with textarea.,
  RiskAssessmentChecklist: checkboxesWithinDiv2,
  RiskAssessmentNotes: textareaWithinDiv,

  FinalChecklist: checkboxesWithinDiv2
};
