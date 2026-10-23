const { users } = require('../test-data/users');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

async function loginAsStandardUser(page) {
  const login = new LoginPage(page);
  await login.open();
  await login.login(users.standard.username, users.standard.password);
  const inventory = new InventoryPage(page);
  await inventory.expectLoaded();
  return inventory;
}
module.exports = { loginAsStandardUser };