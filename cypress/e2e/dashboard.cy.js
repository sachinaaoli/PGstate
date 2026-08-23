describe("Softix Payment Gateway - Dashboard", () => {

  beforeEach(() => {
    cy.login();
  });


  it("TC018 - should login successfully and open dashboard", () => {

    cy.url()
      .should("not.include", "/login");

  });


  it("TC019 - should display dashboard page", () => {

    cy.get("body")
      .should("be.visible");

  });


  it("TC020 - should display navigation menu", () => {

    cy.get("nav")
      .should("be.visible");

  });


  it("TC021 - should not redirect back to login after refresh", () => {

    cy.reload();

    cy.url()
      .should("not.include", "/login");

  });

});