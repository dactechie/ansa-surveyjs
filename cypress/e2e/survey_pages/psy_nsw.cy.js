import {
  checkDeepNestedRadio,
  selectDropdownWithAria,
  textareaWithinDiv,
  checkboxesWithinDiv2,
  selectRadioOption
} from "./utils.js";

import { k10, k10_plus } from "./sections/k10.cy";
import { hono } from "./sections/hono.cy";

export function page_ProgramAndStaff() {
  selectRadioOption("Program", "PSYNSW");
  selectRadioOption("Staff", "Aftab.Jalal");
  selectRadioOption("ClientType", "PsychiatristReferral");
  selectRadioOption("AssessmentType", "InitialAssessment");
  /* ==== Generated with Cypress Studio ==== */

  // selectDropdownOption(
  //   "IndigenousStatus",
  //   "Aboriginal but not Torres Strait Islander"
  // );
  selectDropdownWithAria("Language Spoken At Home", "Hindi"); // same as the one below in this case
  selectDropdownWithAria("Country of Birth", "New Zealand");
}

export function page_PDC() {
  // cy.get('select[aria-label="Drug of concern/Gambling"]').select("Heroin");
  selectRadioOption("SubstanceUse", "Yes");
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

export function dailyLivingImpact() {
  checkDeepNestedRadio("PrioritiseCare", "Not very well");
}

export function physicalHealth() {
  selectRadioOption("Past4WkPhysicalHealth", "4");
}

export function mentalHealth() {
  selectRadioOption("Past4WkMentalHealth", "6");

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

  k10();
  k10_plus();
  hono();
}

export function whereAreYouAtRightNow() {
  checkDeepNestedRadio("Past4WkQualityOfLifeScore", "6");
}
