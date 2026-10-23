'use strict';
require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');
const { getEnvironment } = require('./config/environments');
const env = getEnvironment();

module.exports = defineConfig({
  testDir: './tests',
  testMatch: /.*\.spec\.js/,
  testIgnore: ['**/demo-failure.spec.js'],
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  // En CI, un reintento ayuda a detectar flakiness; el reporte marca el test como flaky si el segundo pasa.
  // No se oculta el fallo inicial: revisar siempre el resultado de la primera ejecución y la traza.
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 7_000 },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  outputDir: 'test-results',
  use: {
    ...devices['Desktop Chrome'],
    browserName: 'chromium',
    baseURL: env.baseURL,
    headless: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});