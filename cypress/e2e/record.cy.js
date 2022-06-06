// describe("recording test", function() {
//   //dsfsdf
//   it("add stpes ", () => {
//     cy.visit("http://localhost:8080/");
//   });
// });

function clickSurveyNextButton() {
  cy.get(".sv-footer__next-btn").click();
}

function openAssessmentSurvey(AssessmentButtonText) {
  //constants.js
  // export const SURVEY_DISPLAY_NAMES = {
  //   "ATOM Initial Assessment": "’New Episode’ assessment",
  //   "ATOM ITSP Review Assessment": "ITSP review",
  //   "Arcadia House Assessments": "Arcadia House Assessments"
  // };
  //'a.contains('My Text')'
  cy.contains("a", AssessmentButtonText).click();
  //cy.get(":nth-child(4) > .bg-white").click();
}

function setProgramAssessment() {
  // Program : 'CoCo (Continuum of Care)' , 'Arcadia House'
  cy.get(
    "#sq_101 > .sv-question__content > .sv-selectbase > :nth-child(2) > .sv-item > .sv-selectbase__label > .sv-item__decorator > .sv-item__svg"
  ).click();
  cy.get("#sq_101i_00").check();

  /// AssessmentType : 'Arcadia Supplementary Intake Assessment', 'Arcadia Post Treatment Assessment'
  cy.get(
    ":nth-child(3) > .sv-selectbase__label > .sv-item__decorator > .sv-item__svg"
  ).click();
  cy.get("#sq_102i_1").check();
}

function doPDC() {
  cy.get(".sv-footer__next-btn").click();
  cy.get("#sq_245i").select("Nicotine");
  cy.get("#sq_246i").select("Smoke");
  cy.get("#sq_247i").select("10");
  cy.get("#sq_247i").select("14");
  cy.get("#sq_249i").select("40-49");
  cy.get("#sq_111i").click();
}

function doODC() {
  cy.get(
    "#sq_112 > .sv-question__content > .sv-selectbase > :nth-child(2) > .sv-item > .sv-selectbase__label > .sv-item__decorator > .sv-item__svg"
  ).click();
  cy.get("#sq_112i_00").check();
  cy.get(
    "#sq_112 > .sv-question__content > .sv-selectbase > :nth-child(3) > .sv-item > .sv-selectbase__label > .sv-item__decorator > .sv-item__svg"
  ).click();
  cy.get("#sq_112i_10").check();
  cy.get("#sq_250i").select("Amphetamines, n.f.d.");
  cy.get("#sq_251i").select("Sublingual");
  cy.get("#sq_252i").select("17");
  cy.get("#sq_253i").select("lines");
  cy.get("#sq_254i").select("15-19");
  cy.get("#sq_119i").click();
  cy.get(
    "#sq_120 > .sv-question__content > .sv-selectbase > :nth-child(3) > .sv-item > .sv-selectbase__label > .sv-item__decorator > .sv-item__svg"
  ).click();
  cy.get("#sq_120i_10").check();
}

function doInjectingDrugUse() {
  cy.get("#sq_121i").select("Within last 4 weeks");
  cy.get(
    "#sq_122 > .sv-question__content > .sv-selectbase > :nth-child(3) > .sv-item > .sv-selectbase__label > .sv-item__decorator > .sv-item__svg > circle"
  ).click();
  cy.get("#sq_122i_10").check();
  cy.get(
    "#sq_122 > .sv-question__content > .sv-selectbase > :nth-child(2) > .sv-item > .sv-selectbase__label > .sv-item__decorator > .sv-item__svg"
  ).click();
  cy.get("#sq_122i_00").check();
  cy.get(
    "#sq_122 > .sv-question__content > .sv-selectbase > :nth-child(3) > .sv-item > .sv-selectbase__label > .sv-item__decorator > .sv-item__svg"
  ).click();
  cy.get("#sq_122i_10").check();
  cy.get("#sq_123i").select("16");
}

function doSmoking() {
  cy.get(
    "#sq_124 > .sv-question__content > .sv-selectbase > :nth-child(3) > .sv-item > .sv-selectbase__label > .sv-item__decorator > .sv-item__svg > circle"
  ).click();
  cy.get("#sq_124i_10").check();
  cy.get(
    "#sq_124 > .sv-question__content > .sv-selectbase > :nth-child(2) > .sv-item > .sv-selectbase__label > .sv-item__decorator > .sv-item__svg > circle"
  ).click();
  cy.get("#sq_124i_00").check();
  cy.get(".sv-question__form-group > .form-group > .sv-comment").click();
}

const PAGES = {
  Home: visitATOMHomeAndLoadClient,
  SurveyType: openAssessmentSurvey, //INAS, ITSP, RESI  - Arcadia assessments
  AssessmentType: setProgramAssessment
};

function visitATOMHomeAndLoadClient(SLK) {
  cy.visit("http://localhost:8080");
  cy.get("#lookup_type > #by_slk").check();
  cy.get("#id_val").clear();
  cy.get("#id_val").type(SLK);
  cy.get(".bg-white").click();
}

/* Pre-setup on Azure Storage: StagingATOM  
  (having to do this because no routing to local/mock resources have been setup)
  1. 'ALLFT210719811' :Brand new cliet -> no Arcdaa assessemnts button
  2. '' 
  3. 
*/
describe("Arcadia CoCo - supplementtary test", function() {
  /* ==== Test Created with Cypress Studio ==== */
  it("Recorded", function() {
    /* ==== Generated with Cypress Studio ==== */
    const SLK = "ALLFT210719811";
    // visitATOMHomeAndLoadClient();
    PAGES["Home"](SLK);

    PAGES["SurveyType"]("Arcadia House Assessments");
    PAGES["AssessmentType"](); // this step only exists for arcadia assessments

    // gotoCOCOSupplementary();
    /* ==== Generated with Cypress Studio ==== */
    doPDC();
    clickSurveyNextButton();

    doODC();
    doInjectingDrugUse();
    doSmoking();

    clickSurveyNextButton();

    /* ==== End Cypress Studio ==== */
  });
});
