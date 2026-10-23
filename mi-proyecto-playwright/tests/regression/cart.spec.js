const { test, expect } = require('@playwright/test');
const { loginAsStandardUser } = require('../helpers');
const { CartPage } = require('../../pages/CartPage');

test('QA05 - retirar un producto actualiza el carrito', async ({ page }) => {
  const inventory = await loginAsStandardUser(page);
  const productName = 'Sauce Labs Backpack';
  await inventory.addItem(productName);
  await inventory.openCart();
  const cart = new CartPage(page);
  await cart.expectItem(productName);
  await cart.removeItem(productName);
  await cart.expectItemAbsent(productName);
  await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);
});