import {
  checkDeepNestedRadio,
  selectDropdownOption,
  selectDropdownWithAria,
  textareaWithinDiv,
  // checkboxes,
  // checkboxesWithinDiv,
  checkboxesWithinDiv2,
  selectRadioOption,
  inputTypeWithinDiv
} from "./utils.js";

export function page_ProgramAndStaff() {
  selectRadioOption("Program", "TSS");
  selectRadioOption("Staff", "Aftab.Jalal");
  selectRadioOption("ClientType", "ownuse");

  /* ==== Generated with Cypress Studio ==== */

  selectDropdownOption(
    "IndigenousStatus",
    "Aboriginal but not Torres Strait Islander"
  );
  selectDropdownWithAria("Preferred Language", "Hindi"); // same as the one below in this case
  selectDropdownOption("CountryOfBirth", "Australia");
}

export function page_PDC() {
  // cy.get('select[aria-label="Drug of concern/Gambling"]').select("Heroin");

  selectDropdownWithAria("Drug of concern/Gambling", "Heroin");
  selectDropdownWithAria("Method of Use", "Inject");
  selectDropdownWithAria("Days used in last 4 weeks?", "6");
  selectDropdownWithAria("Units", "standard drinks");
  selectDropdownWithAria("How much per occasion of use?", "0.6");
  cy.get(`input[aria-label="Age First Used"]`)
    .clear()
    .type(6);

  selectDropdownWithAria("Goals", "Reduce Harms");
}

export function page_SDS() {
  checkDeepNestedRadio("SDSIsAODUseOutOfControl", 0);
  checkDeepNestedRadio("SDSDoesMissingFixMakeAnxious", 1);
  checkDeepNestedRadio("SDSHowMuchDoYouWorryAboutAODUse", 2);
  checkDeepNestedRadio("SDSDoYouWishToStop", 3);
  checkDeepNestedRadio("SDSHowDifficultToStopOrGoWithout", 1);
}

export function page_CDS5() {
  checkDeepNestedRadio("CDS5RateAddictiontoCigarettes", "1");
  checkDeepNestedRadio("CDS5HowManyCigarettesPerDay", "2");
  checkDeepNestedRadio("CDS5HowSoonAfterWaking", "3");
  checkDeepNestedRadio("CDS5HowHardIsQuitting", "4");
  checkDeepNestedRadio("CDS5HowStrongTheUrgeToSmoke", "5");
}

export function smoking() {
  selectRadioOption("DoYouSmoke", "Yes");
  checkDeepNestedRadio("MotivationtoQuit", "4");
  checkDeepNestedRadio("ManagingQuitting", "3");
}

export function impactOfSubstanceUse() {
  checkboxesWithinDiv2("Past4WkAodRisks", [
    "Using more than one drug at a time",
    "Unsafe sex",
    "Attended by an ambulance or been in hospital",
    "Overdose or hospitalisation from drinking / using drugs"
  ]);

  //table of tables
  // cy.get("div[name='OtherAddictiveBehaviours']").within(() => {
  //   const rowHoarding = Array.from(cy.get("table > tbody").children).find(
  //     el =>
  //       el.querySelector("td:first-child > span > span").textContent ===
  //       "Hoarding"
  //   );
  // });
  //https://stackoverflow.com/questions/60055725/how-to-get-a-row-and-select-a-specific-td-in-cypress
  // cy.get("div[name='OtherAddictiveBehaviours']").within(() => {
  //   cy.contains('td', 'text-to-search-for')  // gives you the cell
  //   .siblings()                            // gives you all the other cells in the row
  //   .contains('a', 'DELETE')               // finds the delete button
  //   .click()
  // });
  // cy.get("#Past4WkAodRisks > textarea").type("AOD risk text");

  textareaWithinDiv("Past4WkAodRisks", "AOD risk text");
  // cy.get("div[name='Past4WkAodRisks']").within(() => {
  //   cy.get("textarea").type("AOD risk text");
  // });

  checkDeepNestedRadio("Past4WkAnyOtherAddictiveB", "Yes");
  textareaWithinDiv("BehavioursOfDependenceNotes", "Behav of depedent notes");
  textareaWithinDiv("SubstanceUseITSPIssues", "SubstanceUseITSPIssues text");
  textareaWithinDiv("SubstanceUseITSPGoals", "SubstanceUseITSPGoals text");
}

export function dailyLivingImpact() {
  checkDeepNestedRadio(
    "Past4WkDailyLivingImpacted",
    "Three or four times per week"
  );
  //33. In the last 4 weeks, have you engaged in any of the following?

  // checkboxes("HowDoYouSpendTime", ["FamilyHome", "OtherBehavioursDependence"]);
  // <input type="checkbox" name="HowDoYouSpendTime" id="sq_165i_2" aria-label="Me Time" class="sv-visuallyhidden sv-item__control" value="MeTime"></input>

  // cy.get('input[name="HowDoYouSpendTime"][value="MeTime"]').check();  //TODO fixme
  // checkboxesWithinDiv("", [
  //   "FamilyHome",
  //   "OtherBehavioursDependence"
  // ]);

  checkDeepNestedRadio("PrioritiseCare", "Not very well");
  textareaWithinDiv(
    "EverydayLivingITSPIssues",
    "EverydayLivingITSPIssues text"
  );
  textareaWithinDiv("EverydayLivingITSPGoals", "EverydayLivingITSP Goals text");
}

export function housingSafety() {
  selectDropdownOption("UsualAccommodation", "Residential aged care facility");
  selectDropdownOption(
    "LivingArrangement",
    "Friend(s)/parent(s)/relative(s) and child(ren)"
  );
  selectDropdownOption(
    "YourCurrentHousing",
    "Temporary housing / couch surfing"
  );

  checkDeepNestedRadio(
    "Past4WkDifficultyFindingHousing",
    "Three or four times per week"
  );
  checkDeepNestedRadio(
    "DoYouFeelSafeWhereYouLive",
    "Mostly safe. Sometimes feel threatened"
  );
  textareaWithinDiv("HousingSafetyITSPIssues", "HousingSafetyITSPIssues text");
  textareaWithinDiv("HousingSafetyITSPGoals", "HousingSafetyITSPGoals text");
}

export function physicalHealth() {
  selectRadioOption("Past4WkPhysicalHealth", "4");
  checkDeepNestedRadio(
    "Past4WkHowOftenPhysicalHealthCausedProblems",
    "Three or four times per week"
  );
  checkDeepNestedRadio("Past4WkBeenHospCallAmbulance", "Yes");
  textareaWithinDiv(
    "Past4WkBeenHospCallAmbulanceNotes",
    "Past4WkBeenHospCallAmbulanceNotes text"
  );
  checkDeepNestedRadio("AreYouCurrentlyTakingMeds", "Yes");
  textareaWithinDiv("MedicationsNotes", "MedicationsNotes text");

  checkboxesWithinDiv2("HealthChecklist_STAFF", [
    "SexualHealth",
    "Vaccinations"
  ]);

  textareaWithinDiv(
    "PhysicalHealthITSPIssues",
    "PhysicalHealthITSPIssues text"
  );
  textareaWithinDiv("PhysicalHealthITSPGoals", "PhysicalHealthITSPGoals text");
}

export function mentalHealth() {
  selectRadioOption("Past4WkMentalHealth", "6");
  checkDeepNestedRadio(
    "Past4WkHowOftenMentalHealthCausedProblems",
    "Once or twice per week"
  );
  checkDeepNestedRadio("EverDiagnosedMentalHealthIssue", "Yes"); // if not selected or no is slected , no next qusetion:
  selectDropdownOption(
    "WhenMentalHealthDiagnosis",
    "More than 3 months but less than 12 months ago"
  );

  // textareaWithinDiv("WhenMentalHealthDiagnosis", "diagnosed 2 days ago with depression")
  cy.get('textarea[aria-label="When were you diagnosed?"]')
    .clear({ force: true })
    .first()
    .type("diagnosed 2 days ago with depression", { force: true });

  // textareaWithinDiv(
  //   "WhenMentalHealthDiagnosis",
  //   "WhenMentalHealthDiagnosis dcetails",
  //   { force: true }
  // );
  checkboxesWithinDiv2("MHRecentRiskIssues", [
    "Recent physical abuse",
    "Self Injury",
    "Suicidal thoughts, ideation, planning, attempts (RISK ASSESSMENT)"
  ]);
  textareaWithinDiv("MHRecentRiskIssues", "MHRecentRiskIssues notes");
  checkboxesWithinDiv2("MHHistoricalRiskIssues", [
    "Prison, custody, legal problems"
  ]);
  textareaWithinDiv("MHHistoricalRiskIssues", "MHHistoricalRiskIssues notes");

  //doK10 -> yes (default yes for tss, so not excplicitly clicking)
  checkDeepNestedRadio("K10Q01", "1");
  checkDeepNestedRadio("K10Q02", "2");
  checkDeepNestedRadio("K10Q03", "3");
  checkDeepNestedRadio("K10Q04", "4");
  checkDeepNestedRadio("K10Q05", "5");
  checkDeepNestedRadio("K10Q06", "4");
  checkDeepNestedRadio("K10Q07", "3");
  checkDeepNestedRadio("K10Q08", "2");
  checkDeepNestedRadio("K10Q09", "1");
  checkDeepNestedRadio("K10Q10", "2");

  textareaWithinDiv("MentalITSPIssues", "MentalITSPIssues text");
  textareaWithinDiv("MentalHealthITSPGoals", "MentalHealthITSPGoals text");
}

export function relationships() {
  checkDeepNestedRadio("HaveAnySocialSupport", "Quite a lot");
  textareaWithinDiv("HaveAnySocialSupport", "HaveAnySocialSupport text");
  checkDeepNestedRadio(
    "Past4WkUseLedToProblemsWithFamilyFriend",
    "Three or four times per week"
  );

  checkDeepNestedRadio(
    "HaveDVOrFamilySafetyConcerns",
    "Yes - in the past 4 weeks (risk assessment required)"
  );
  textareaWithinDiv(
    "HaveDVOrFamilySafetyConcerns",
    "HaveDVOrFamilySafetyConcerns notes"
  );

  checkDeepNestedRadio(
    "Past4WkHaveYouViolenceAbusive",
    "Yes (risk assessment required)"
  );
  textareaWithinDiv(
    "Past4WkHaveYouViolenceAbusive",
    "Past4WkHaveYouViolenceAbusive mptes"
  );

  checkDeepNestedRadio("Past4WkHadCaregivingResponsibilities", "Yes");
  checkboxesWithinDiv2("PrimaryCaregiver", [
    ///         combo with textarea
    "Yes - primary caregiver: children 15 - 18 years old",
    "No"
  ]);
  textareaWithinDiv("PrimaryCaregiver", "PrimaryCaregiver notes");

  checkDeepNestedRadio("ChildProtectionConcerns", "Yes");
  textareaWithinDiv("ChildProtectionDetails", "ChildProtectionDetails text");

  textareaWithinDiv("RelationshipsITSPIssues", "RelationshipsITSPIssues text");
  textareaWithinDiv("RelationshipsITSPGoals", "RelationshipsITSPGoals text");
}

export function legal() {
  checkDeepNestedRadio("HaveYouServedCustodialSentenceInPast", "Yes");
  textareaWithinDiv(
    "HaveYouServedCustodialSentenceInPast",
    "HaveYouServedCustodialSentenceInPast notes"
  );

  checkDeepNestedRadio("Past4WkBeenArrested", "Yes");
  textareaWithinDiv("Past4WkBeenArrested", "Past4WkBeenArrested notes");

  checkDeepNestedRadio(
    "Past4WkHowOftenIllegalActivities",
    "Once or twice per week"
  );

  checkDeepNestedRadio("SubjectToCourtOrdersOrPendingCharges", "Yes");
  checkDeepNestedRadio("NeedHelpWrkDevlpmntOrdrPayingOutstndngFines", "Yes");

  textareaWithinDiv("LegalITSPIssues", "LegalITSPIssues notes");
  textareaWithinDiv("LegalITSPGoals", "LegalITSPGoals notes");
}

export function whereAreYouAtRightNow() {
  checkDeepNestedRadio(
    "HowImportantIsChangeToYou",
    "Critical for me. I need to change"
  );
  textareaWithinDiv(
    "HowImportantIsChangeToYou",
    "HowImportantIsChangeToYou text"
  );
  checkDeepNestedRadio("HowCloseToManagingSubstanceUse", "3"); //regular radio didnt work (multiple items for click)
  inputTypeWithinDiv(
    "Notes-HowCloseToManagingSubstanceUse",
    "text",
    "Notes-HowCloseToManagingSubstanceUse t4eext"
  );
  checkDeepNestedRadio("HowSatisfiedWithProgress", "Moderately");

  checkDeepNestedRadio("Past4WkQualityOfLifeScore", "6"); //cy.click() can only be called on a single element. Your subject contained 2 elements. Pass { multiple: true } if you want to serially click each element.Learn more

  inputTypeWithinDiv(
    "Notes-Past4WkQualityOfLifeScore",
    "text",
    "notes Past4WkQualityOfLifeScore textareaWithinDiv"
  );
  checkDeepNestedRadio("AreYouAccessingOtherServices", "Yes");

  // checkboxes("SupportFromWhichOtherServices")
  checkboxesWithinDiv2("SupportFromWhichOtherServices", [
    "Other community health care service",
    "Hospital"
  ]);
}

export function officialUseOnly() {
  checkboxesWithinDiv2("SupportTypeBestMatchesNeedsGoals", [
    "AOD counselling & support (3 - 6 sessions, then review)",
    "Support, information and/or counselling as a family member or friend of a person with a substance use issues",
    "Althea GP"
  ]);
  checkboxesWithinDiv2("ExternalReferrals", [
    "Physical Health",
    "Relationships / Parenting / Social Wellbeing",
    "Other"
  ]);

  textareaWithinDiv("ExternalReferrals", "ExternalReferrals notes");

  checkboxesWithinDiv2("RiskAssessmentChecklist", ["PotentialOD"]);
  textareaWithinDiv("RiskAssessmentNotes", "RiskAssessmentNotes text");

  checkboxesWithinDiv2("FinalChecklist", [
    "ProvidedWithRightsResponsibilities",
    "BriefInterventionOptionExplained"
  ]);
}
