const { defineConfig } = require("cypress");

module.exports = defineConfig({
  experimentalStudio: true,
  viewportWidth: 1800,
  viewportHeight: 1260,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    // setupNodeEvents(on, config) {
    //   return require('./cypress/plugins/index.js')(on, config)
    // },
  }
});
