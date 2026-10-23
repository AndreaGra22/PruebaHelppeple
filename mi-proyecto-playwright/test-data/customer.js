'use strict';
const { randomUUID } = require('node:crypto');

// Identificador distinto por ejecución para facilitar el diagnóstico y evitar colisiones
// si una aplicación equivalente persiste los datos introducidos.
function createCustomer() {
  return {
    firstName: 'QA',
    lastName: `Run${randomUUID().slice(0, 8).replace(/-/g, '').toUpperCase()}`,
    postalCode: '110111',
  };
}

module.exports = { createCustomer };