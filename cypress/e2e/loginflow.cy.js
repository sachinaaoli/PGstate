describe("Softix Payment Gateway - Dashboard", () => {

  beforeEach(() => {
    cy.login();
    cy.visit("/system");
  });

  it("TC018 - should login successfully and open dashboard", () => {
    // Original assertion checked the URL did NOT include "/system", which
    // is backwards for a page that only exists once you're logged in —
    // flipped to assert we actually landed there.
    cy.url().should("include", "/system");
  });

  it("TC019 - should display dashboard page", () => {
    cy.get("body").should("be.visible");
  });

  it("TC020 - should display page content after login", () => {
    cy.get("body").invoke("text").should("not.be.empty");
  });

  it("TC021 - should redirect to system after successful login", () => {
    // This is a fresh, non-cached login (bypassing cy.login()'s cy.session
    // cache) to explicitly verify the end-to-end redirect. Credentials come
    // from Cypress.env — never hardcode real creds in a public repo.
    cy.visit("https://pgstage.softix.shop/system/login");

    cy.get("#login").type(Cypress.env("username"));
    cy.get('input[type="password"]').type(Cypress.env("password"));

    cy.get('button[type="submit"]').click();

    // Replaced the fixed 20s wait with a polling assertion — passes as
    // soon as the redirect happens instead of always burning 20s.
    cy.url({ timeout: 30000 }).should("eq", "https://pgstage.softix.shop/system");
  });

  it("TC022 - should display dashboard", () => {
    cy.url().should("eq", "https://pgstage.softix.shop/system");
  });

  it("TC023 - should display navigation menu", () => {
    // Filled in from the dashboard's actual markup (sidebar menu wrapper).
    cy.get("#kt_app_sidebar_menu").should("be.visible");
  });

});