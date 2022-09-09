export function gotoNextPage() {
  cy.get('input[value="Next"]').click();
  // cy.get(".sv-footer__next-btn").click();
}

// export function checkboxes(parentDiv, checks) {
//   cy.get(`input[name="${parentDiv}"]`).check(checks);
// }

export function checkboxesWithinDiv2(parentDiv, checks) {
  checks.forEach(checkValue => {
    cy.get(`input[name="${parentDiv}"][value="${checkValue}"]`).check({
      force: true
    });
  });
}

// export function checkboxesWithinDiv(parentDiv, checks) {
//   cy.get(`div[name="${parentDiv}"]`).check(checks);
// }

export function clickButtonWithText(elementType, text) {
  cy.contains(elementType, text).click();
}

export function selectRadioOption(sourceDivName, inputValue) {
  cy.get(`div[data-name="${sourceDivName}"]`)
    // .click({ force: true })
    .get(`input[value="${inputValue}"]`)
    .click({ force: true });
}

// export function selectRadioOption(sourceDivName, inputValue) {
//   cy.get(`div[name="${sourceDivName}"]`)
//     // .click({ force: true })
//     .get(`input[value="${inputValue}"]`)
//     .click({ force: true });
// }

export function selectDropdownOption(sourceDivName, inputValue) {
  cy.get(`div[data-name="${sourceDivName}"]`).within(() => {
    cy.get(`option[value="${inputValue}"]`).click({ force: true });
  });
  //  .click({ force: true })
}

export function selectDropdownWithAria(ariaLabel, selectedOption) {
  cy.get(`select[aria-label="${ariaLabel}"]`).select(selectedOption);
}

export function inputWithAria(ariaLabel, text) {
  cy.get(`input[aria-label="${ariaLabel}"]`)
    .clear()
    .type(text);
}

export function textareaWithinDiv(wrapperDivName, text, options = {}) {
  cy.get(`div[data-name='${wrapperDivName}']`).within(() => {
    cy.get("textarea")
      .clear(options)
      .type(text);
  });
}

export function inputTypeTextWithinDiv(wrapperDivName, text, options = {}) {
  cy.get(`div[data-name='${wrapperDivName}']`).within(() => {
    cy.get("input[type='text']")
      .clear(options)
      .type(text);
  });
}

export function inputTypeWithinDiv(
  wrapperDivName,
  inputType,
  text,
  options = {}
) {
  cy.get(`div[data-name='${wrapperDivName}']`).within(() => {
    cy.get(`input[type='${inputType}']`)
      .clear(options)
      .type(text);
  });
}

/*<div
    class="sv-question sv-row__question"
    id="sq_139"
    role="radiogroup"
    aria-labelledby="sq_139_ariaTitle"
    name="SDSDoesMissingFixMakeAnxious"
    style="flex: 1 1 100%; width: 100%; min-width: 300px; max-width: initial; display: inline-block;"
  >
    <div class="sv-question__header sv-question__header--location--top">
      <h5
        aria-label="Does the prospect of missing a session / fix make you very anxious or nervous?"
        id="sq_139_ariaTitle"
        class="sv-title sv-question__title sv-question__title--answer"
      >
        <!---->
        <span class="sv-question__num" style="position: static;">14.</span>
        <!---->
        <span style="position: static;"
          ><span style="position: static;"
            >Does the prospect of missing a session / fix make you very anxious
            or nervous?</span
          ></span
        >
        <!---->
      </h5>
      <div class="sv-description sv-question__description">
        <span style="position: static;"
          ><span style="position: static;"></span
        ></span>
      </div>
    </div>
    <div class="sv-question__content">
      <div
        role="alert"
        id="sq_139_errors"
        class="sv-question__erbox sv-question__erbox--location--top"
        style="display: none;"
      ></div>
      <fieldset class="sv-selectbase">
        <legend
          aria-label="Does the prospect of missing a session / fix make you very anxious or nervous?"
        ></legend>
        <!----><!----><!----><!---->
        <div class="sv-selectbase__column sv-q-column-4">
          <div class="sv-item sv-radio sv-selectbase__item sv-radio--checked">
            <label class="sv-selectbase__label ">
              <input
                type="radio"
                name="SDSDoesMissingFixMakeAnxious_sq_139"
                id="sq_139i_00"
                role="radio"
                aria-label="Never or almost never"
                class="sv-visuallyhidden sv-item__control"
                value="0"
              />
*/
// https://stackoverflow.com/questions/23747439/how-to-get-element-by-its-partial-class-name-css
export function checkDeepNestedRadio(radioControlprefix, value) {
  cy.get(`input[name*="${radioControlprefix}"][value="${value}"]`).check({
    force: true
  });
}

// function checkRadio(sourceName, inputValue) {
//   cy.get(`div[name="${sourceName}"]`).check(inputValue);
// }

// function checkRadio2(qName, selectedOption) {
//   cy.get(`div[name="${qName}"]`)
//     .find(`input[type="radio"][value="${selectedOption}"]`)
//     .check();
// }

// function selectDropdownOption(AttributeType, controlName, inputValue) {
//   cy.get(`select[${AttributeType}="${controlName}"]`)
//     //  .click({ force: true })
//     .get(`option[value="${inputValue}"]`)
//     .click({ force: true });
// }
