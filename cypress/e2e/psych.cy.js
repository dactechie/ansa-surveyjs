import {
  page_ProgramAndStaff,
  page_PDC,
  dailyLivingImpact,
  physicalHealth,
  mentalHealth,
  page_SDS,
  whereAreYouAtRightNow
} from "./survey_pages/psy_nsw.cy";
import { clickButtonWithText, gotoNextPage } from "./survey_pages/utils";

beforeEach(() => {
  // load example.json fixture file and store
  // in the test context object
  // cy.fixture("data_inas_tss.json").as("atom");
  // cy.fixture("config_pages_inas_tss.json").as("pages");
  cy.fixture(`config_${Cypress.env("atom_env")}`).then(function(data) {
    this.config = data;
    // this.SLK  = data["SLK"];
    // this.base_url = data["base_host_url"];
  });
});
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/* ==== Test Created with Cypress Studio ==== */
it("PsychNSWTest", function() {
  cy.visit(this.config.base_host_url);

  cy.get("#lookup_type > #by_slk").check();
  cy.get("#id_val").clear();
  cy.get("#id_val").type(this.config.SLK);
  clickButtonWithText("span", "Fetch Client Data");
  clickButtonWithText("a", "Psych Program Assessments");

  const blank_func = () => console.log("Not implemetned page");
  // page_ProgramAndStaff();
  // page_PDC();
  // blank_func();

  // dailyLivingImpact();
  // // housingSafety,
  // physicalHealth();
  // mentalHealth();
  // page_SDS();
  // whereAreYouAtRightNow();

  const page_funcs = [
    page_ProgramAndStaff,
    page_PDC,
    blank_func,
    page_SDS,
    dailyLivingImpact,
    physicalHealth,
    mentalHealth,

    whereAreYouAtRightNow
  ];

  page_funcs.forEach(pagefn => {
    pagefn();
    gotoNextPage();
  });
});
