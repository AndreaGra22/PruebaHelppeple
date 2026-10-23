const { test, expect } = require('@playwright/test');
const { users } = require('../../test-data/users');
const { LoginPage } = require('../../pages/LoginPage');

test('QA02 @smoke - usuario bloqueado no puede ingresar', async ({ page }) => {
  const login = new LoginPage(page);
  await login.open();
  await login.login(users.locked.username, users.locked.password);
  await login.expectLoginError('Sorry, this user has been locked out');
  await expect(page).not.toHaveURL(/inventory\.html/);
});