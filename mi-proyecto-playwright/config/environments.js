'use strict';

const environments = {
  demo: {
    baseURL: process.env.BASE_URL_DEMO || process.env.BASE_URL || 'https://www.saucedemo.com',
    description: 'SauceDemo (sitio de demostración público)',
  },
  example: {
    // Perfil adicional sin credenciales. Configure BASE_URL_EXAMPLE con una URL de pruebas autorizada.
    baseURL: process.env.BASE_URL_EXAMPLE || 'https://example.invalid',
    description: 'Perfil de ejemplo configurable por quien ejecuta la prueba',
  },
};

function getEnvironment() {
  const name = process.env.TEST_ENV || 'demo';
  const environment = environments[name];
  if (!environment) {
    throw new Error(`TEST_ENV "${name}" no está definido. Opciones: ${Object.keys(environments).join(', ')}`);
  }
  let parsed;
  try { parsed = new URL(environment.baseURL); } catch {
    throw new Error(`La URL configurada para TEST_ENV="${name}" no es válida: ${environment.baseURL}`);
  }
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error(`La URL del ambiente debe usar HTTP o HTTPS: ${environment.baseURL}`);
  }
  return { name, ...environment };
}

module.exports = { getEnvironment };