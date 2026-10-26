
'use strict';

const path = require('path');

// Cargar el archivo .env situado en la raíz del proyecto
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

function requiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Falta la variable de entorno ${name}. ` +
      'Verifica el archivo .env en la raíz del proyecto.'
    );
  }

  return value;
}

const standardUser = {
  username: requiredEnv('SAUCE_STANDARD_USER'),
  password: requiredEnv('SAUCE_STANDARD_PASSWORD')
};

const lockedUser = {
  username: requiredEnv('SAUCE_LOCKED_USER'),
  password: requiredEnv('SAUCE_LOCKED_PASSWORD')
};

const users = {
  standard: standardUser,
  valid: standardUser,
  locked: lockedUser
};

module.exports = { users };
