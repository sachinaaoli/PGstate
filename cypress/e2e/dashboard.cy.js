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

  it("TC021 - should not redirect back to login after refresh", () => {
    cy.reload();

    cy.url()
      .should("not.include", "/system");
  });

});