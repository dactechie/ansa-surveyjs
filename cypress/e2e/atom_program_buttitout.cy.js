import {
  page_ProgramAndStaff,
  smoking,
  smoking_notes_quitline,
  physicalHealth
  // officialUseOnly
} from "./survey_pages/butt_it_out.cy";
import { CDS5 } from "./survey_pages/sections/CDS5.cy";
import { clickButtonWithText, gotoNextPage } from "./survey_pages/utils";

beforeEach(() => {
  // load example.json fixture file and store in the test context object
  cy.fixture("data_buttitout_tss.json").as("atom");
  cy.fixture("config_pages_buttitout_tss.json").as("pages");
  const envl = Cypress.env("atom_env") || "local";
  cy.fixture(`config_${envl}`).then(function(data) {
    this.config = data;
  });
});
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/* ==== Test Created with Cypress Studio ==== */
it("NewTestRecord", function() {
  cy.visit(this.config.base_host_url);

  cy.get("#id_val").clear();
  cy.get("#id_val").type(this.config.SLK);
  clickButtonWithText("span", "Fetch Client Data");
  clickButtonWithText("a", "Butt-It-Out Assessment");

  // const blank_func = () => console.log("Not implemetned page");

  const page_funcs = [
    page_ProgramAndStaff,
    smoking,
    CDS5,
    smoking_notes_quitline,
    physicalHealth
  ];

  page_funcs.forEach(pagefn => {
    // console.log(this.atom);
    pagefn(this.atom);
    cy.pause();
    gotoNextPage();
  });
  // officialUseOnly();
});
