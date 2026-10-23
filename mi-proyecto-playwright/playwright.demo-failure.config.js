'use strict';
require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');
const { getEnvironment } = require('./config/environments');
const env = getEnvironment();

module.exports = defineConfig({
  testDir: './tests',
  testMatch: /demo-failure\.spec\.js$/,
  fullyParallel: false,
  retries: 0,
  workers: 1,
  timeout: 30_000,
  expect: { timeout: 7_000 },
  reporter: [['list'], ['html', { outputFolder: 'playwright-demo-report', open: 'never' }]],
  outputDir: 'test-results-demo',
  use: {
    ...devices['Desktop Chrome'],
    browserName: 'chromium',
    baseURL: env.baseURL,
    headless: true,
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'on',
    actionTimeout: 10_000,
  },
  projects: [{ name: 'chromium-demo-failure', use: { ...devices['Desktop Chrome'] } }],
});