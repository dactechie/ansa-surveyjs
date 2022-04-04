// record2.spec.js created with Cypress
//
function clickButtonWithText(elementType, text) {
  cy.contains(elementType, text).click();
}

function selectRadioOption(sourceDivName, inputValue) {
  cy.get(`div[name="${sourceDivName}"]`)
    // .click({ force: true })
    .get(`input[value="${inputValue}"]`)
    .click({ force: true });
}

// function selectDropdownOption(AttributeType, controlName, inputValue) {
//   cy.get(`select[${AttributeType}="${controlName}"]`)
//     //  .click({ force: true })
//     .get(`option[value="${inputValue}"]`)
//     .click({ force: true });
// }

function selectDropdownOption(sourceDivName, inputValue) {
  cy.get(`div[name="${sourceDivName}"]`)
    //  .click({ force: true })
    .get(`option[value="${inputValue}"]`)
    .click({ force: true });
}

function selectDropdownWithAria(ariaLabel, selectedOption) {
  cy.get(`select[aria-label="${ariaLabel}"]`).select(selectedOption);
}

function page_ProgramAndStaff() {
  selectRadioOption("Program", "TSS");
  selectRadioOption("Staff", "Aftab.Jalal");
  selectRadioOption("ClientType", "ownuse");

  /* ==== Generated with Cypress Studio ==== */
  // cy.get('#sq_106i').select('Aboriginal but not Torres Strait Islander');
  selectDropdownOption(
    "IndigenousStatus",
    "Aboriginal but not Torres Strait Islander"
  );
  //selectDropdownOption("PreferredLanguage", "English");

  selectDropdownWithAria("Preferred Language", "Hindi"); // same as the one below in this case

  selectDropdownOption("CountryOfBirth", "Australia");
}

function page_PDC() {
  cy.get('select[aria-label="Drug of concern/Gambling"]').select("Heroin");
  selectDropdownWithAria("Method of Use", "Inject");
  selectDropdownWithAria("Days used in last 4 weeks?", "6");
  selectDropdownWithAria("Units", "standard drinks");
  selectDropdownWithAria("How much per occasion of use?", "0.6");
  cy.get(`input[aria-label="Age First Used"]`)
    .clear()
    .type(6);

  selectDropdownWithAria("Goals", "Reduce Harms");
}

function page_SDS() {
  selectRadioOption("SDSIsAODUseOutOfControl", "0");
  selectRadioOption("SDSDoesMissingFixMakeAnxious", "1");
  selectRadioOption("SDSHowMuchDoYouWorryAboutAODUse", "2");
  selectRadioOption("SDSDoYouWishToStop", "3");
  selectRadioOption("SDSHowDifficultToStopOrGoWithout", "4");
}

function page_CDS5() {
  selectRadioOption("DoYouSmoke", "Yes");
  cy.get('div[name="CDS5RateAddictiontoCigarettes"]')
    .get('input[aria-label="61-80"]')

    .click({ force: true });
}
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/* ==== Test Created with Cypress Studio ==== */
it("NewTestRecord", function() {
  cy.visit("http://localhost:8080");

  cy.get("#lookup_type > #by_slk").check();
  cy.get("#id_val").clear();
  cy.get("#id_val").type("ALLFT210719721");
  clickButtonWithText("span", "Fetch Client Data");
  clickButtonWithText("a", "’New Episode’ assessment");

  page_ProgramAndStaff();

  cy.get(".sv-footer__next-btn").click();

  page_PDC();

  cy.get(".sv-footer__next-btn").click();

  page_SDS();
  cy.get(".sv-footer__next-btn").click();

  page_CDS5();

  //https://stackoverflow.com/questions/56876330/how-do-i-target-a-nested-input-that-has-no-id-attribute-using-cypress

  //   cy.get("div[cl;ass='label']").contains("LABEL TEXT2").parent().within(() => {
  //     cy.get("input[type='text']").type("StackOverflowHelp")
  //  });

  //  <label class="Input">
  //   <div class="label">LABEL TEXT1</div>
  //   <input type="text">
  // </label>
  // <label class="Input">
  //   <div class="label">LABEL TEXT2</div>
  //   <input type="text">
  // </label>
  // cy.get("div[name='NotesODC']").type('some ODC notes')
  // cy.get("div[name='HaveYouEverInjected']").find()
  selectRadioOption("HaveYouEverInjected", "No");
});
