describe("Softix Payment Gateway - Dashboard", () => {

  beforeEach(() => {
    cy.login();
    cy.visit("/system");
  });

  it("TC018 - should login successfully and open dashboard", () => {

    cy.url().should("include", "/system");
  });

  it("TC019 - should display dashboard page", () => {
    cy.get("body").should("be.visible");
  });

  it("TC020 - should display page content after login", () => {
    cy.get("body").invoke("text").should("not.be.empty");
  });

  it("TC021 - should redirect to system after successful login", () => {
   
    cy.visit("https://pgstage.softix.shop/system/login");

    cy.get("#login").type(Cypress.env("username"));
    cy.get('input[type="password"]').type(Cypress.env("password"));

    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 30000 }).should("eq", "https://pgstage.softix.shop/system");
  });

  it("TC022 - should display dashboard", () => {
    cy.url().should("eq", "https://pgstage.softix.shop/system");
  });

  it("TC023 - should display navigation menu", () => {
    // Filled in from the dashboard's actual markup.
    cy.get("#kt_app_sidebar_menu").should("be.visible");
  });

});