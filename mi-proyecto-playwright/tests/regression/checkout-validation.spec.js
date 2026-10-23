const { test, expect } = require('@playwright/test');
const { loginAsStandardUser } = require('../helpers');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');

test('QA04 - checkout rechaza datos obligatorios incompletos', async ({ page }) => {
  const inventory = await loginAsStandardUser(page);
  await inventory.addItem('Sauce Labs Backpack');
  await inventory.openCart();
  await new CartPage(page).checkout();
  const checkout = new CheckoutPage(page);
  await checkout.continue();
  await checkout.expectValidation('Error: First Name is required');
  await expect(page).toHaveURL(/checkout-step-one\.html/);
});