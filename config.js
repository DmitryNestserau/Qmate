const QmateService = require("@sap_oss/wdio-qmate-service");

exports.config = {
    
  baseUrl:"https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon",

  after: function (capabilities, specs) {
    // Add the following line to keep the browser open after the test execution.
    browser.pause(50000); // Adjust the time (in milliseconds) as needed.

    // If you need to perform additional actions after the test execution, add them here.

    // Close the browser after the pause (optional).
   
  },

  specs: [
    
    [
     "./spec/testapp.spec.js",
     
    ],
  ],


  framework: "mocha",
  mochaOpts: {
   
    timeout: 100000, // 60 seconds
    bail: true,
  },

  maxInstances: 1,


  services: [[QmateService], ["chromedriver"]],
  capabilities: [
    {
      browserName: 'chrome',
      acceptInsecureCerts: true,
      'goog:chromeOptions': {
        args: [
          '--output=/dev/null',
          '--window-size=1920,1080'
          // '--headless',
          // '--disable-gpu',
          // '--window-size=1920,1080',
          // '--no-sandbox',
          // '--disable-infobars',
          // '--disable-dev-shm-usage',
          // '--disable-notifications',
          // '--disable-extensions',
          // '--disable-popup-blocking',
          // '--disable-web-security',
          // '--allow-insecure-localhost',
          // '--disable-network-throttling',
          // '--disable-background-networking',
          // '--lang=en-US',
          // '--use-mock-keychain',
          // '--disable-background-timer-throttling',
          // '--disable-backgrounding-occluded-windows',
          // '--enable-logging',
          // '--disable-translate',
          // '--metrics-recording-only'
        ]
      },
    },
  ],

 
};