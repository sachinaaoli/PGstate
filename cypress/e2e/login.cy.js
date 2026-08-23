describe("Softix Payment Gateway - Login", () => {

  beforeEach(() => {
    cy.visit("/system");
  });

  it("TC001 - should display login page", () => {
    cy.contains("Sign In").should("be.visible");
  });

  it("TC002 - should display username field", () => {
    cy.get('input[placeholder="Username/Email/Phone"]').should("be.visible");
  });

  it("TC003 - should display password field", () => {
    cy.get('input[type="password"]').should("be.visible");
  });

  it("TC004 - should display Sign In button", () => {
    cy.contains("Sign In").should("be.visible");
  });

  it("TC005 - should display Forgot Password", () => {
    cy.contains("Forgot Password").should("be.visible");
  });

  it("TC006 - should not login with empty username and password", () => {
    cy.contains("Sign In").click();
    cy.url().should("include", "/login");
  });

  it("TC007 - should not login when username is empty", () => {
    cy.get('input[type="password"]').type(Cypress.env("password"));
    cy.contains("Sign In").click();
    cy.url().should("include", "/login");
  });

  it("TC008 - should not login when password is empty", () => {
    cy.get('input[placeholder="Username/Email/Phone"]').type(Cypress.env("username"));
    cy.contains("Sign In").click();
    cy.url().should("include", "/login");
  });

  it("TC009 - should login with valid credentials", () => {
    cy.get('input[placeholder="Username/Email/Phone"]').clear().type(Cypress.env("username"));
    cy.get('input[type="password"]').clear().type(Cypress.env("password"));
    cy.contains("Sign In").click();

    // Assert the actual outcome instead of just logging it, so this test
    // can fail on a broken login rather than always passing.
    cy.url({ timeout: 20000 }).should("eq", "https://pgstage.softix.shop/system");
  });

  it("TC010 - should reject invalid username", () => {
    cy.get('input[placeholder="Username/Email/Phone"]').type("9999999999");
    cy.get('input[type="password"]').type(Cypress.env("password"));
    cy.contains("Sign In").click();
    cy.url({ timeout: 10000 }).should("include", "/login");
  });

  it("TC011 - should reject invalid password", () => {
    cy.get('input[placeholder="Username/Email/Phone"]').type(Cypress.env("username"));
    cy.get('input[type="password"]').type("WrongPassword123");
    cy.contains("Sign In").click();
    cy.url({ timeout: 10000 }).should("include", "/login");
  });

  it("TC012 - should reject invalid username and password", () => {
    cy.get('input[placeholder="Username/Email/Phone"]').type("9999999999");
    cy.get('input[type="password"]').type("WrongPassword123");
    cy.contains("Sign In").click();
    cy.url({ timeout: 10000 }).should("include", "/login");
  });

  it("TC013 - should allow username to be cleared", () => {
    cy.get('input[placeholder="Username/Email/Phone"]')
      .type(Cypress.env("username"))
      .clear()
      .should("have.value", "");
  });

  it("TC014 - should allow password to be cleared", () => {
    cy.get('input[type="password"]')
      .type(Cypress.env("password"))
      .clear()
      .should("have.value", "");
  });

  it("TC015 - password should be hidden by default", () => {
    cy.get('input[type="password"]').should("have.attr", "type", "password");
  });

  it("TC016 - login page should work after refresh", () => {
    cy.reload();
    cy.contains("Sign In").should("be.visible");
    cy.get('input[placeholder="Username/Email/Phone"]').should("be.visible");
    cy.get('input[type="password"]').should("be.visible");
  });

  it("TC017 - Forgot Password should open", () => {
    cy.contains("Forgot Password").click();
    // TODO: once the forgot-password view is confirmed, assert what it
    // actually shows (a modal? a new route?) instead of just clicking.
  });
});