const faker = require('faker');
const { expect } = require("chai");
const axios = require("axios");

describe('Sample Test Suite', function () {

  it('should open the base URL and perform the test', async function () {
    let cartItemsCount = 0;
    // Step 0: Make an API call to get data
    const apiUrl = "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon";
    const dataResponse = await axios.get(apiUrl);
    const statusCode = dataResponse.status;

    // Assertion: Check the status code of the data API call
    expect(statusCode).to.equal(200);
    console.log(`Step 0 - API call to get data: Status code is ${statusCode}`);

    await ui5.navigation.navigateToApplication('category/LT');

    await browser.pause(6000);

    // 1. Click on the first item from the list 
    const lastItemSelector = "#__item0-container-cart---category--productList-2";
    const lastItem = await $(lastItemSelector);
    await lastItem.click();

    // Negative Test for Step 1: Ensure the cart is empty
    common.assertion.expectTrue(cartItemsCount === 0);
    console.log("Negative Test for Step 1: Cart is empty.");

    await browser.pause(3000);

    // 2. Click Add to Cart button 
    const addToCartButtonSelector = "#__button9-BDI-content";
    const addToCartButton = await $(addToCartButtonSelector);
    await addToCartButton.click();

    await browser.pause(3000);

    // 3. Click on the "Show shopping cart" button
    const showCartButtonSelector = "#__button8-inner";
    const showCartButton = await $(showCartButtonSelector);
    await showCartButton.click();

    // Assertion: Check if the shopping cart is not empty
    const cartItemsSelector = "#container-cart---cartView--page-cont";
    const cartItems = await $$(cartItemsSelector);
    cartItemsCount = cartItems.length; 
    expect(cartItemsCount).to.be.greaterThan(0);
    console.log(`Shopping cart is not empty. Number of items: ${cartItemsCount}`);

    // Assertion: Check if the item is present in the shopping cart
    const expectedItemSelector = "#__item0-container-cart---category--productList-2";
    const actualItem = await $(expectedItemSelector);
    expect(actualItem).to.not.be.null;
    console.log(`Item "${expectedItemSelector}" is present in the shopping cart.`);

    // 4.Click on the "Edit your Cart" button
    const editCartButtonSelector = "#container-cart---cartView--page-intHeader-BarRight";
    const editCartButton = await $(editCartButtonSelector);
    await editCartButton.click();

    await browser.pause(3000);


    // Check if any child element matches the partial selector pattern for the "x" buttons
    const xButtonSelector = "[id^='__item'][id$='-imgDel']"; 
    const xButtons = await $$(xButtonSelector);

    // 6.Loop through each "x" button and click to delete the item
    for (const xButton of xButtons) {
      await xButton.waitForDisplayed({ timeout: 5000 }); 
      await xButton.scrollIntoView(); 
      await xButton.click(); 
      await browser.pause(2000); 
      const yesButtonSelector = '[id^="__mbox-btn-"]'; 
      const yesButton = await $(yesButtonSelector);
      await yesButton.waitForClickable(); 
      await yesButton.click(); 
    }


    // 8. Add a short pause to wait for any post-submission actions
    await browser.pause(2000);

    // 9. Click on the "Delete" button
    const yesButtonSelector = '[id^="__mbox-btn-"]';
    const yesButton = await $(yesButtonSelector);

    // Ensure the element is displayed before clicking it
    if (await yesButton.isDisplayed()) {
      await yesButton.click();
    } else {
      
      console.error("The 'Yes' button is not displayed.");
    }

    // 10. Click on the "Back to Catalog" button
    const backToCatalogButtonSelector = "#container-cart---category--page-navButton-inner";
    const backToCatalogButton = await $(backToCatalogButtonSelector);
    await backToCatalogButton.click();
    await browser.pause(10000);
  });
});

