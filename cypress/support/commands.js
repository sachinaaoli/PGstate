Cypress.Commands.add("login", () => {

  cy.visit("/system");

  cy.get('input[placeholder="Username/Email/Phone"]')
    .type(Cypress.env("username"));

  cy.get('input[type="password"]')
    .type(Cypress.env("password"));

  cy.contains("Sign In")
    .click();

  cy.url({ timeout: 15000 })
    .should("not.include", "/login");

});