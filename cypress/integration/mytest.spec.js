// /// <reference types="cypress" />

const { describe } = require("mocha");

// /// JSON fixture file can be loaded directly using
// // the built-in JavaScript bundler
// // @ts-ignore
// const requiredExample = require('../../fixtures/example')

// context('Misc', () => {
//   beforeEach(() => {
//     cy.visit('https://localhost:8080/')
//   })

//   it('.end() - end the command chain', () => {
//   })

// })

describe("My first Ttests", function() {
  it("Visit ATOM Home", function() {
    // expect(true).to.equal(false);
    cy.visit("http://localhost:8080");

    cy.get("#by_slk").click();
    cy.get("#id_val")
      .click()
      .type("ALLFT210719811");
    cy.get("button").click();

    // create new/continue existing survey
    cy.get("#main-content > div > div:nth-child(1) > div > div > a").click();
    // JSON.stringify($$("input:checked").map(e => [e.name, e.value])) ===
    //   JSON.stringify([
    //     ["Program_sq_101", "TSS"],
    //     ["Staff_sq_102", "Aftab.Jalal"],
    //     ["ClientType_sq_103", "ownuse"]
    //   ]);
    // expect(cy.get('input[value="TSS"]')[0].checked).to.equal(true)

    //expect(cy.get('input[value="TSS"]')[0].checked).to.equal(true)
  });
});
