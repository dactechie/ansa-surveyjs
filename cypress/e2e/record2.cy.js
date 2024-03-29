import {
  page_ProgramAndStaff,
  page_PDC,
  page_CDS5,
  impactOfSubstanceUse,
  dailyLivingImpact,
  housingSafety,
  physicalHealth,
  mentalHealth,
  relationships,
  legal,
  page_SDS,
  smoking,
  whereAreYouAtRightNow,
  officialUseOnly
} from "./survey_pages/index.cy";
import { clickButtonWithText, gotoNextPage } from "./survey_pages/utils";

beforeEach(() => {
  // load example.json fixture file and store
  // in the test context object
  cy.fixture("data_inas_tss.json").as("atom");
  cy.fixture("config_pages_inas_tss.json").as("pages");
  const envl = Cypress.env("atom_env") || "local";
  cy.fixture(`config_${envl}`).then(function(data) {
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
it("NewTestRecord", function() {
  cy.visit(this.config.base_host_url);

  cy.get("#id_val").clear();
  cy.get("#id_val").type(this.config.SLK);
  clickButtonWithText("span", "Fetch Client Data");
  clickButtonWithText("a", "’New Episode’ assessment");

  const blank_func = () => console.log("Not implemetned page");

  const page_funcs = [
    page_ProgramAndStaff,
    page_PDC,
    blank_func,
    page_SDS,
    smoking,
    page_CDS5,
    impactOfSubstanceUse,
    dailyLivingImpact,
    housingSafety,
    physicalHealth,
    mentalHealth,
    relationships,
    legal,
    whereAreYouAtRightNow
  ];

  page_funcs.forEach(pagefn => {
    // console.log(this.atom);
    pagefn(this.atom);
    cy.pause();
    gotoNextPage();
  });
  officialUseOnly();

  // page_ProgramAndStaff();
  // // page_ProgramAndStaff();

  // gotoNextPage()

  // page_PDC();

  // gotoNextPage()

  // // ODC, injecting
  // gotoNextPage()

  // page_SDS();
  // gotoNextPage()

  // smoking();
  // gotoNextPage()
  // page_CDS5();
  // gotoNextPage()
  // impactOfSubstanceUse();
  // gotoNextPage()
  // dailyLivingImpact();
  // gotoNextPage()
  // housingSafety();

  // //PHYSICAL HEALTH

  // gotoNextPage()
  // mentalHealth();
  // gotoNextPage()
  // relationships();
  // gotoNextPage()
  // legal();

  // page_CDS5();

  // //https://stackoverflow.com/questions/56876330/how-do-i-target-a-nested-input-that-has-no-id-attribute-using-cypress

  // //   cy.get("div[cl;ass='label']").contains("LABEL TEXT2").parent().within(() => {
  // //     cy.get("input[type='text']").type("StackOverflowHelp")
  // //  });

  // //  <label class="Input">
  // //   <div class="label">LABEL TEXT1</div>
  // //   <input type="text">
  // // </label>
  // // <label class="Input">
  // //   <div class="label">LABEL TEXT2</div>
  // //   <input type="text">
  // // </label>
  // // cy.get("div[name='NotesODC']").type('some ODC notes')
  // // cy.get("div[name='HaveYouEverInjected']").find()
  // selectRadioOption("HaveYouEverInjected", "No");
});
