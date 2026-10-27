
'use strict';

const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

function requiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Falta la variable ${name}. ` +
      'Copia .env.example a .env y revisa su configuración.'
    );
  }

  return value;
}

function buildUser(usernameVariable, passwordVariable) {
  return {
    get username() {
      return requiredEnv(usernameVariable);
    },

    get password() {
      return requiredEnv(passwordVariable);
    }
  };
}

const standardUser = buildUser(
  'SAUCE_STANDARD_USER',
  'SAUCE_STANDARD_PASSWORD'
);

const lockedUser = buildUser(
  'SAUCE_LOCKED_USER',
  'SAUCE_LOCKED_PASSWORD'
);

const users = {
  standard: standardUser,
  valid: standardUser,
  locked: lockedUser
};

module.exports = { users };
