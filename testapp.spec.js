const faker = require('faker');

describe('Sample Test Suite', function () {

  it('should open the base URL and perform the test', async function () {
    await ui5.navigation.navigateToApplication("category/AC");

    await browser.pause(4000);

    // Add a 2-second delay to wait for the list of items to load
    await browser.pause(2000);

    // 1.Click on the first item from the list 
    const firstItemSelector = "#__item0-container-cart---category--productList-0-content";
    const firstItem = await $(firstItemSelector);
    await firstItem.click();

    await browser.pause(3000);

    // Add a 2-second delay to wait for the item details to load 
    await browser.pause(3000);

    // 2.Click on the "Add to Cart" button
    const addToCartButtonSelector = "#__button9-BDI-content";
    const addToCartButton = await $(addToCartButtonSelector);
    await addToCartButton.click();

    await browser.pause(3000);

    // 3.Click on the "Show shopping cart" button
    const showCartButtonSelector = "#__button8-inner";
    const showCartButton = await $(showCartButtonSelector);
    await showCartButton.click();

    // Add a 2-second delay to wait for the shopping cart to load 
    await browser.pause(3000);


    // 4.Click on the "Proceed" button
    const proceedButtonSelector = "#container-cart---cartView--proceedButton-BDI-content";
    const proceedButton = await $(proceedButtonSelector);
    await proceedButton.click();

    await browser.pause(3000);

    // 4.Click on the "Step 2" button
    const step2ButtonSelector = "#container-cart---checkoutView--contentsStep-nextButton-BDI-content";
    const step2Button = await $(step2ButtonSelector);
    await step2Button.click();

    await browser.pause(3000);

    // 5.Click on "Cash on Delivery"
    const cashOnDeliverySelector = "#container-cart---checkoutView--payViaCOD-button > div > div";
    const cashOnDeliveryButton = await $(cashOnDeliverySelector);
    await cashOnDeliveryButton.click();

    await browser.pause(2000);

    // 6.Click on the "Step 3" button
    const step3ButtonSelector = "#container-cart---checkoutView--paymentTypeStep-nextButton-BDI-content";
    const step3Button = await $(step3ButtonSelector);
    await step3Button.click();
    await browser.pause(3000);


    // 7.Fill in the fields with random data
    const firstNameFieldSelector = "#container-cart---checkoutView--cashOnDeliveryName-inner";
    await browser.pause(1000);
    const lastNameFieldSelector = "#container-cart---checkoutView--cashOnDeliveryLastName-inner";
    await browser.pause(1000);
    const phoneNumberFieldSelector = "#container-cart---checkoutView--cashOnDeliveryPhoneNumber-inner";
    await browser.pause(1000);
    const emailAddressFieldSelector = "#container-cart---checkoutView--cashOnDeliveryEmail-inner";

    const randomFirstName = faker.name.firstName();
    const randomLastName = faker.name.lastName();
    const randomPhoneNumber = faker.phone.phoneNumber('##########'); // Generates 10-digit phone number
    const randomEmailAddress = faker.internet.email();

    await $(firstNameFieldSelector).setValue(randomFirstName);
    await browser.pause(1000);
    await $(lastNameFieldSelector).setValue(randomLastName);
    await browser.pause(1000);
    await $(phoneNumberFieldSelector).setValue(randomPhoneNumber);
    await browser.pause(1000);
    await $(emailAddressFieldSelector).setValue(randomEmailAddress);

    await browser.pause(3000);

    // 6.Click on the Cash On Delivery Step Title
    const cashOnDeliveryStepTitleSelector = '#container-cart---checkoutView--cashOnDeliveryStep-Title';
    const cashOnDeliveryStepTitle = await $(cashOnDeliveryStepTitleSelector);
    await cashOnDeliveryStepTitle.click();

    expect(await $(firstNameFieldSelector).getValue()).toBe(randomFirstName, "First Name does not match");
    expect(await $(lastNameFieldSelector).getValue()).toBe(randomLastName, "Last Name does not match");
    expect(await $(phoneNumberFieldSelector).getValue()).toBe(randomPhoneNumber, "Phone Number does not match");
    expect(await $(emailAddressFieldSelector).getValue()).toBe(randomEmailAddress, "Email Address does not match");

    await browser.pause(3000);

    // 7.Click on the "Step 4" button
    const step4ButtonSelector = '#container-cart---checkoutView--cashOnDeliveryStep-nextButton-BDI-content';
    const step4Button = await $(step4ButtonSelector);
    await step4Button.waitForClickable();
    await step4Button.click();

    await browser.pause(2000);

    // 8.Fill the fields with random data
    const addressFieldSelector = '#container-cart---checkoutView--invoiceAddressAddress-inner';
    await browser.pause(1000);
    const cityFieldSelector = '#container-cart---checkoutView--invoiceAddressCity-inner';
    await browser.pause(1000);
    const zipCodeFieldSelector = '#container-cart---checkoutView--invoiceAddressZip-inner';
    await browser.pause(1000);
    const countryFieldSelector = '#container-cart---checkoutView--invoiceAddressCountry-inner';

    // Function to generate a random string of given length with only letters
    function generateRandomLetters(length) {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
      }
      return result;
    }

    // Function to generate a random 4-digit number
    function generateRandomZipCode() {
      return Math.floor(1000 + Math.random() * 9000);
    }

    const randomAddress = generateRandomLetters(4);
    const randomCity = faker.address.city();
    const randomZipCode = generateRandomZipCode().toString();

    // Function to generate a random country name
    function generateRandomCountry() {
      const availableCountries = ['German', 'USA', 'Belarus'];
      const randomIndex = Math.floor(Math.random() * availableCountries.length);
      return availableCountries[randomIndex];
    }

    const randomCountry = generateRandomCountry();

    await $(addressFieldSelector).setValue(randomAddress);
    await browser.pause(1000);
    await $(cityFieldSelector).setValue(randomCity);
    await browser.pause(1000);
    await $(zipCodeFieldSelector).setValue(randomZipCode);
    await browser.pause(1000);
    await $(countryFieldSelector).setValue(randomCountry);

    // Verification - Check if the fields contain the entered data
    expect(await $(addressFieldSelector).getValue()).toBe(randomAddress, 'Address does not match');
    expect(await $(cityFieldSelector).getValue()).toBe(randomCity, 'City does not match');
    expect(await $(zipCodeFieldSelector).getValue()).toBe(randomZipCode, 'Zip Code does not match');
    expect(await $(countryFieldSelector).getValue()).toBe(randomCountry, 'Country does not match');

    await browser.pause(3000);

    // 9.Click on the container element to activate Step 5 button
    const containerElementSelector = '#container-cart---checkoutView--invoiceStep-Title';
    const containerElement = await $(containerElementSelector);
    await containerElement.click();


    // 10.Click on the "Step 5" button
    const step5ButtonSelector = '#container-cart---checkoutView--invoiceStep-nextButton-BDI-content';
    const step5Button = await $(step5ButtonSelector);
    await step5Button.waitForClickable();
    await step5Button.click();

    await browser.pause(3000);

    // 11.Click on the "Order Summary" button
    const orderSummaryButtonSelector = '#container-cart---checkoutView--deliveryTypeStep-nextButton-BDI-content';
    const orderSummaryButton = await $(orderSummaryButtonSelector);

    await browser.pause(5000);

    await orderSummaryButton.waitForClickable();
    await orderSummaryButton.click();

    // 12.Click on the "Submit" button
    const submitButtonSelector = '#container-cart---checkoutView--submitOrder-inner';
    const submitButton = await $(submitButtonSelector);
    await submitButton.waitForClickable();
    await submitButton.click();

    // Add a short pause to wait for any post-submission actions
    await browser.pause(2000);
    // 13.Click on the "Yes" button
    const partialSelector = '[id^="__mbox-btn-"]'; // Selector to match any element with an id starting with "__mbox-btn-"
    const yesButton = await $(partialSelector);
    await yesButton.waitForClickable();
    await yesButton.click();

    await browser.pause(6000);

    // Step 14: Click on the "Return to Shop" button
    const returnToShopButtonSelector = '#container-cart---orderCompletedView--returnToShopButton-content';
    const returnToShopButton = await $(returnToShopButtonSelector);
    await returnToShopButton.waitForClickable();
    await returnToShopButton.click();

    await browser.pause(20000);
  });
});