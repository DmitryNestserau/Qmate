const faker = require('faker');
// const { expect } = require('chai');

describe('Sample Test Suite', function () {

  it('should open the base URL and perform the test', async function () {
    await ui5.navigation.navigateToApplication('category/LT');

    await browser.pause(6000);


    // 1.Click on the first item from the list 
    const lastItemSelector = "#__item0-container-cart---category--productList-2";
    const lastItem = await $(lastItemSelector);
    await lastItem.click();

    await browser.pause(3000);

    //2.Click Add to Cart button 
    const addToCartButtonSelector = "#__button9-BDI-content";
    const addToCartButton = await $(addToCartButtonSelector);
    await addToCartButton.click();

    await browser.pause(3000);

    // 3. Click on the "Show shopping cart" button
    const showCartButtonSelector = "#__button8-img";
    const showCartButton = await $(showCartButtonSelector);

    // // Wait for the button to be displayed
    // await showCartButton.waitForDisplayed();

    // // Get the text of the button
    // const buttonName = await showCartButton.getText();

    // // Expect the button name to not be empty
    // expect(buttonName, 'Show shopping Cart button name should not be empty').to.not.be.empty;

    //4.Click the button
    await showCartButton.click();

    // 3.Click on the "Edit your Cart" button
    const editCartButtonSelector = "#container-cart---cartView--page-intHeader-BarRight";
    const editCartButton = await $(editCartButtonSelector);
    await editCartButton.click();

    await browser.pause(3000);


    // 5. Verify that the container is not empty
    const containerSelector = "#container-cart---cartView--page-cont";
    const container = await $(containerSelector);

    // Get the child elements of the container
    const childElements = await container.$$('*');

    // Check if the container has any child elements (i.e., it's not empty)
    const isContainerNotEmpty = childElements.length > 0;

    // Assertion to verify that the container is not empty
    expect(isContainerNotEmpty).toBe(true);


    // Check if any child element matches the partial selector pattern for the "x" buttons
    const xButtonSelector = "[id^='__item'][id$='-imgDel']"; // Matches any element with an ID starting with "__item" and ending with "-imgDel"
    const xButtons = await $$(xButtonSelector);

    // 6.Loop through each "x" button and click to delete the item
    for (const xButton of xButtons) {
      await xButton.waitForDisplayed({ timeout: 5000 }); // Ensure the element is visible
      await xButton.scrollIntoView(); // Scroll the element into view if necessary
      await xButton.click(); // Click the element to delete the item
      await browser.pause(2000); // Add a short pause to wait for any post-submission actions
      const yesButtonSelector = '[id^="__mbox-btn-"]'; // Selector to match any element with an id starting with "__mbox-btn-"
      const yesButton = await $(yesButtonSelector);
      await yesButton.waitForClickable(); // Wait for the "Yes" button to be clickable
      await yesButton.click(); // Click on the "Yes" button
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
      // Optionally, you can log an error or perform some other action if the button is not displayed.
      console.error("The 'Yes' button is not displayed.");
    }

    // 10. Click on the "Back to Catalog" button
    const backToCatalogButtonSelector = "#container-cart---category--page-navButton-inner";
    const backToCatalogButton = await $(backToCatalogButtonSelector);
    await backToCatalogButton.click();
    await browser.pause(10000);
  });
});

