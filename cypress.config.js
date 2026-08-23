const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://pgstage.softix.shop",
    setupNodeEvents(on, config) {
      return config;
    }
  }
});