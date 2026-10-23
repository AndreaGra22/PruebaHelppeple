const { test } = require('@playwright/test');
const { users } = require('../../test-data/users');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');

test('QA01 @smoke - acceso válido abre el inventario', async ({ page }) => {
  const login = new LoginPage(page);
  await login.open();
  await login.login(users.standard.username, users.standard.password);
  await new InventoryPage(page).expectLoaded();
});