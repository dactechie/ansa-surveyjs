import { qmap } from "./question_type_map.cy";
import { clickButtonWithText, gotoNextPage } from "./survey_pages/utils";

context("ATOMs", () => {
  beforeEach(() => {
    // load example.json fixture file and store
    // in the test context object
    cy.fixture("data_inas_tss.json").as("atom");
    cy.fixture("config_pages_inas_tss.json").as("pages");
  });

  it("NewTestRecord", function() {
    cy.visit("http://localhost:8080");

    cy.get("#lookup_type > #by_slk").check();
    cy.get("#id_val").clear();
    cy.get("#id_val").type(this.atom.SLK);
    clickButtonWithText("span", "Fetch Client Data");
    clickButtonWithText("a", "’New Episode’ assessment");
    console.log(this.atom);
    this.pages.forEach(page => {
      page.forEach(question => {
        const fn = qmap[question];
        fn(question, this.atom[question]);
      });
      gotoNextPage(); // TODO : final page, review, not next
    });
    // qmap["Program"]("Program", this.atom.Program)
  });
});
