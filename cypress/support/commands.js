// ---------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------
// Confirmed-working login flow against https://pgstage.softix.shop/system/login:
//   - username field: #login
//   - password field: input[type="password"]
//   - submit: button[type="submit"]
//   - on success, lands on /system
//
// Credentials come from Cypress.env('username') / Cypress.env('password')
// — NEVER hardcode real creds here, this repo is public. Set them via
// cypress.env.json (gitignored, see cypress.env.json.example) or:
//   CYPRESS_username=... CYPRESS_password=... npx cypress run
//
// cy.session() caches the authenticated session across specs/tests so we
// only pay the real login cost once per run.
Cypress.Commands.add('login', () => {
  const username = Cypress.env('username');
  const password = Cypress.env('password');

  if (!username || !password) {
    throw new Error(
      'Cypress.env("username")/("password") are not set. Create cypress.env.json from ' +
        'cypress.env.json.example, or pass CYPRESS_username / CYPRESS_password.'
    );
  }

  cy.session(
    'admin-session',
    () => {
      cy.visit('/system/login');
      cy.get('#login').clear().type(username);
      cy.get('input[type="password"]').clear().type(password, { log: false });
      cy.get('button[type="submit"]').click();
      // Login is slow on staging (TC021 needed a 20s wait) — give it room
      // rather than a hard cy.wait().
      cy.url({ timeout: 30000 }).should('eq', 'https://pgstage.softix.shop/system');
    },
    {
      validate() {
        cy.visit('/system');
        cy.url().should('eq', 'https://pgstage.softix.shop/system');
      },
      cacheAcrossSpecs: true
    }
  );
});

// Alias kept for the existing 01-08 specs, which call loginAsAdmin().
Cypress.Commands.add('loginAsAdmin', () => cy.login());

// ---------------------------------------------------------------------
// Dashboard helpers
// ---------------------------------------------------------------------

// Visit the dashboard and wait for the two metric AJAX calls
// (dashboard/metrics + dashboard/metrics/today) that populate the
// top cards to resolve, so assertions don't race "Loading...".
Cypress.Commands.add('visitDashboard', () => {
  cy.intercept('GET', '**/system/dashboard/metrics').as('metricsAll');
  cy.intercept('GET', '**/system/dashboard/metrics/today').as('metricsToday');
  cy.visit('/system');
  cy.wait(['@metricsAll', '@metricsToday'], { timeout: 20000 });
});

// Open one of the Bootstrap dropdown filters (Orders/Customers/
// Products/Vendors/Sales Analytics/Categories/Revenue/Payment/
// Province cards all share this same markup pattern) and pick an
// option by its visible text.
Cypress.Commands.add('selectDropdownFilter', (dropdownId, optionText) => {
  cy.get(`#${dropdownId}`).click({ force: true });
  cy.get(`#${dropdownId}`)
    .parent()
    .find('.dropdown-menu')
    .should('be.visible')
    .contains('.dropdown-item', optionText)
    .click({ force: true });
});

// Assert a metric-card canvas actually rendered (Chart.js stamps a
// non-zero width/height once it has drawn).
Cypress.Commands.add('assertChartRendered', (canvasSelector) => {
  cy.get(canvasSelector)
    .should('be.visible')
    .and(($canvas) => {
      expect($canvas[0].width).to.be.greaterThan(0);
      expect($canvas[0].height).to.be.greaterThan(0);
    });
});