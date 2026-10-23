const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { users } = require('../test-data/users');

// DEMOSTRACIÓN INTENCIONAL: se espera que falle. No está en smoke/regression.
// Ejecutar solo con `npm run demo:failure`; el fallo esperado produce código de salida distinto de cero.
test('DEMO CONTROLADA - expectativa incorrecta para demostrar captura y traza', async ({ page }) => {
  const login = new LoginPage(page);
  await login.open();
  await login.login(users.standard.username, users.standard.password);
  await expect(page).toHaveURL(/esta-url-no-existe/);
});