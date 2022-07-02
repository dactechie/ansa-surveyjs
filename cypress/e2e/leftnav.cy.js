import {
  clickButtonWithText,
  checkDeepNestedRadio
} from "./survey_pages/utils";

// Program: checkDeepNestedRadio,
// Staff: checkDeepNestedRadio,
// ClientType: checkDeepNestedRadio,

context("ATOMs", () => {
  beforeEach(() => {
    // load example.json fixture file and store
    // in the test context object
    cy.fixture("data_inas_tss.json").as("atom");
    cy.fixture("config_pages_inas_tss.json").as("pages");
    cy.fixture("config").then(function(data) {
      this.config = data;
      this.base_url = data[data["base_host_url"]];
    });
  });

  it("NewTestRecord", function() {
    // cy.visit("http://ansaweb.azurewebsites.net/");
    console.log(`HOST NAME : ${this.base_url}`);
    cy.visit(this.base_url);
    cy.wait(2000);
    cy.get("#lookup_type > #by_slk").check();
    cy.get("#id_val").clear();
    cy.get("#id_val").type(this.atom.SLK);
    clickButtonWithText("span", "Fetch Client Data");

    clickButtonWithText("a", "’New Episode’ assessment");
    console.log(this.atom);
    cy.wait(2000);
    checkDeepNestedRadio("Program", "TSS");
    cy.get("li > button> span").contains("Smoking");

    checkDeepNestedRadio("Staff", "Aftab.Jalal");
    checkDeepNestedRadio("ClientType", "ownuse");
    cy.get("li > button> span").contains(
      "Current Main Substance of Concern / Gambling"
    );
  });
});
