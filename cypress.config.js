const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://pgstage.softix.shop',
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    video: true,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,
      openMode: 0
    },
    setupNodeEvents(on, config) {
      // register any node event listeners here if needed later
      return config;
    }
  },
  // No credentials live here. Cypress auto-loads cypress.env.json (gitignored)
  // and merges it into Cypress.env() — see cypress.env.json.example — or pass
  // CYPRESS_username / CYPRESS_password on the command line.
  env: {}
});