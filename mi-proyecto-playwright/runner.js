#!/usr/bin/env node
'use strict';

const path = require('node:path');
const fs = require('node:fs');
const { spawnSync } = require('node:child_process');
try {
  require('dotenv').config();
} catch (error) {
  // Permite mostrar --help o informar que faltan dependencias antes de npm ci.
  if (error.code !== 'MODULE_NOT_FOUND' || !String(error.message).includes('dotenv')) throw error;
}

function usage() {
  console.log(`\nHelpPeople QA Lead — runner Playwright\n\nUso:\n  node runner.js --env=demo --suite=smoke\n  node runner.js --env=demo --suite=regression\n  node runner.js --env=example --suite=smoke\n  node runner.js --suite=all --headed\n  node runner.js --list\n  node runner.js --demo-failure\n\nOpciones:\n  --env=demo|example       Selecciona el perfil de ambiente (por defecto: demo).\n  --suite=smoke|regression|all\n                           Smoke ejecuta los casos @smoke. Regression/all ejecutan todos los casos.\n  --headed                 Abre Chromium con interfaz visible.\n  --workers=N              Cantidad de workers (entero positivo).\n  --list                   Lista las pruebas sin ejecutarlas.\n  --demo-failure           Ejecuta por separado una aserción incorrecta controlada.\n  --help                   Muestra esta ayuda.\n\nEl reporte HTML normal se genera en playwright-report/. El fallo controlado usa\nplaywright-demo-report/ y test-results-demo/ para no sobrescribir evidencias normales.\n`);
}

function parseArgs(argv) {
  const options = { env: process.env.TEST_ENV || 'demo', suite: 'regression', headed: false, list: false, demoFailure: false, workers: null, help: false };
  for (const arg of argv) {
    if (arg === '--help' || arg === '-h') options.help = true;
    else if (arg === '--headed') options.headed = true;
    else if (arg === '--list') options.list = true;
    else if (arg === '--demo-failure') options.demoFailure = true;
    else if (arg.startsWith('--env=')) options.env = arg.slice('--env='.length);
    else if (arg.startsWith('--suite=')) options.suite = arg.slice('--suite='.length);
    else if (arg.startsWith('--workers=')) options.workers = arg.slice('--workers='.length);
    else throw new Error(`Argumento desconocido: ${arg}. Usa --help para consultar opciones.`);
  }
  if (!['demo', 'example'].includes(options.env)) throw new Error(`Ambiente no válido: ${options.env}. Usa demo o example.`);
  if (!['smoke', 'regression', 'all'].includes(options.suite)) throw new Error(`Suite no válida: ${options.suite}. Usa smoke, regression o all.`);
  if (options.workers !== null && (!/^\d+$/.test(options.workers) || Number(options.workers) < 1)) throw new Error('--workers debe ser un entero mayor que cero.');
  if (options.demoFailure && (options.list || options.headed || options.workers !== null)) throw new Error('--demo-failure se ejecuta de forma aislada; no combinar con --list, --headed ni --workers.');
  return options;
}

function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 2;
    return;
  }
  if (options.help) { usage(); return; }

  const cli = path.join(__dirname, 'node_modules', '@playwright', 'test', 'cli.js');
  if (!fs.existsSync(cli)) {
    console.error('No se encontró Playwright. Ejecuta primero: npm ci');
    process.exitCode = 2;
    return;
  }

  const env = { ...process.env, TEST_ENV: options.env };
  const args = ['test'];
  if (options.demoFailure) {
    args.push('--config=playwright.demo-failure.config.js', 'tests/demo-failure.spec.js');
    console.log('Ejecutando fallo controlado aislado. Se espera un código de salida distinto de cero.');
  } else {
    if (options.suite === 'smoke') args.push('--grep', '@smoke');
    if (options.list) args.push('--list');
    if (options.headed) args.push('--headed');
    if (options.workers !== null) args.push(`--workers=${options.workers}`);
    console.log(`Ambiente: ${options.env} | Suite: ${options.suite} | Chromium | ${options.headed ? 'headed' : 'headless'}`);
  }
  const result = spawnSync(process.execPath, [cli, ...args], { cwd: __dirname, env, stdio: 'inherit' });
  if (result.error) {
    console.error(`No se pudo iniciar Playwright: ${result.error.message}`);
    process.exitCode = 2;
  } else if (result.status === null) {
    process.exitCode = 2;
  } else {
    process.exitCode = result.status;
  }
}

main();