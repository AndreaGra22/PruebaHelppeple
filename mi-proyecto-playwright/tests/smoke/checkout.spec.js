const { test, expect } = require('@playwright/test');
const { loginAsStandardUser } = require('../helpers');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { createCustomer } = require('../../test-data/customer');

test('QA03 @smoke - compra de un producto termina con confirmación', async ({ page }) => {
  const inventory = await loginAsStandardUser(page);
  const productName = 'Sauce Labs Backpack';
  await inventory.addItem(productName);
  await inventory.openCart();
  const cart = new CartPage(page);
  await cart.expectItem(productName);
  await cart.checkout();
  const checkout = new CheckoutPage(page);
  await checkout.fillCustomer(createCustomer());
  await checkout.continue();
await expect(
  page.getByText(productName, { exact: true })
).toBeVisible();
  await checkout.finish();
  await checkout.expectOrderComplete();
});