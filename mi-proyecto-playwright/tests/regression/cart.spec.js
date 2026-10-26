
'use strict';

const { test, expect } = require('@playwright/test');
const { loginAsStandardUser } = require('../helpers');
const { CartPage } = require('../../pages/CartPage');

test('QA05 - retirar un producto actualiza el carrito al volver a consultarlo', async ({ page }) => {
  const inventory = await loginAsStandardUser(page);

  const removedProduct = 'Sauce Labs Backpack';
  const retainedProduct = 'Sauce Labs Bike Light';

  // 1. Agregar dos productos
  await inventory.addItem(removedProduct);
  await inventory.addItem(retainedProduct);

  const cartBadge = page.locator(
    '[data-test="shopping-cart-badge"]'
  );

  // 2. Verificar que ambos productos se agregaron
  await expect(cartBadge).toHaveText('2');

  // 3. Abrir el carrito y comprobar los productos
  await inventory.openCart();

  const cart = new CartPage(page);

  await cart.expectItem(removedProduct);
  await cart.expectItem(retainedProduct);

  // 4. Retirar solo el primer producto
  await cart.removeItem(removedProduct);

  // 5. Verificar el cambio inmediatamente
  await cart.expectItemAbsent(removedProduct);
  await cart.expectItem(retainedProduct);
  await expect(cartBadge).toHaveText('1');

  // 6. Volver al inventario y consultar otra vez el carrito
  await page.getByRole('button', {
    name: 'Continue Shopping',
    exact: true
  }).click();

  await expect(page).toHaveURL(/inventory\.html/);

  await inventory.openCart();

  // 7. Verificar que el cambio sigue reflejado
  await cart.expectItemAbsent(removedProduct);
  await cart.expectItem(retainedProduct);
  await expect(cartBadge).toHaveText('1');
});
