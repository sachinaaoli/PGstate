Cypress.Commands.add("login", () => {

  cy.visit("/system");

  cy.get('input[placeholder="Username/Email/Phone"]')
    .should("be.visible")
    .clear()
    .type(Cypress.env("username"));

  cy.get('input[type="password"]')
    .should("be.visible")
    .clear()
    .type(Cypress.env("password"));

  cy.contains("button", "Sign In")
    .should("be.visible")
    .click();

  cy.url({ timeout: 89000 })
    .should("not.include", "/system/login");

});