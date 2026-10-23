
'use strict';

const { expect } = require('@playwright/test');

class InventoryPage {
  constructor(page) {
    this.page = page;

    // SauceDemo utiliza data-test, no data-testid
    this.title = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator(
      '[data-test="inventory-item"]'
    );
    this.sortSelect = page.locator(
      '[data-test="product-sort-container"]'
    );
    this.cartLink = page.locator(
      '[data-test="shopping-cart-link"]'
    );
  }

  itemByName(name) {
    return this.page
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: name });
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.title).toHaveText('Products');
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async addItem(name) {
    await this.itemByName(name)
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async sortPriceLowToHigh() {
    await this.sortSelect.selectOption('lohi');
  }
}

module.exports = { InventoryPage };
