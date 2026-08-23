describe("Softix Payment Gateway - Dashboard", () => {

  beforeEach(() => {
    cy.login();
  });

  it("TC018 - should login successfully and open dashboard", () => {
    cy.url()
      .should("not.include", "/system");
  });

  it("TC019 - should display dashboard page", () => {
    cy.get("body")
      .should("be.visible");
  });

   it("TC020 - should display page content after login", () => {
    cy.get("body")
      .invoke("text")
      .should("not.be.empty");
  });

it("TC021 - should redirect to system after successful login", () => {
  cy.visit("https://pgstage.softix.shop/system/login");

  cy.get("#login").type("9768755434");
  cy.get('input[type="password"]').type("kathbag@123");

  cy.get('button[type="submit"]').click();
  cy.wait(20000);

  cy.url().should("eq", "https://pgstage.softix.shop/system");
});
it("TC022 - should display dashboard", () => {
    cy.url().should("eq", "https://pgstage.softix.shop/system");
  });

  it("TC023 - should display navigation menu", () => {
    // Replace this with your working navigation selector
    cy.get("YOUR_NAV_SELECTOR").should("be.visible");
  });

});