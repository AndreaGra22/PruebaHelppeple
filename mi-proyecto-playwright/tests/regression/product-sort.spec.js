const { test, expect } = require('@playwright/test');
const { loginAsStandardUser } = require('../helpers');

test('QA06 - ordenar por precio ascendente muestra precios de menor a mayor', async ({ page }) => {
  const inventory = await loginAsStandardUser(page);
  await inventory.sortPriceLowToHigh();
  const priceTexts = await page.locator('[data-test="inventory-item"] [data-test="inventory-item-price"]').allTextContents();
  const prices = priceTexts.map(text => Number(text.replace('$', '').trim()));
  expect(prices.length).toBeGreaterThan(1);
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});