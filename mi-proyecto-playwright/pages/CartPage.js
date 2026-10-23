const { expect } = require('@playwright/test');
class CartPage {
  constructor(page) { this.page = page; }
  get items() { return this.page.getByTestId('inventory-item'); }
  itemByName(name) { return this.page.locator('[data-test="inventory-item"]').filter({ hasText: name }); }
  async expectItem(name) { await expect(this.itemByName(name)).toBeVisible(); }
  async removeItem(name) { await this.itemByName(name).getByRole('button', { name: 'Remove' }).click(); }
  async expectItemAbsent(name) { await expect(this.itemByName(name)).toHaveCount(0); }
async checkout() {
  await this.page.getByRole('button', {
    name: 'Checkout',
    exact: true
  }).click();
}
}
module.exports = { CartPage };