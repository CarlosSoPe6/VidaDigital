/**
 * Módulo auxiliar para verificar variables.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */
const schema = require('../config/swagger.nodos.json').components.schemas.Values;
const validator = require('./index');
const {
  getNodoVariables,
} = require('../db/nodes.model');

/**
 * Verifica si un nodo existe en la base de datos.
 * @param {Object} connection Nodo a buscar.
 * @param {string} idNodo Nodo a buscar.
 * @param {Object} data Datos a validar
 * @returns {boolean} True si el nodo existe.
 */
async function areValidVars(connection, idNodo, data) {
  const vars = await getNodoVariables(connection, idNodo);
  if (vars.length === 0) {
    return { valid: false, data: `No existe nodo ${idNodo}` };
  }
  let matchVerify = 0;
  const keys = ['id', 'ac', 'tn'];
  const missing = [];
  vars.forEach((variable) => {
    if (data[variable.code] === undefined) {
      missing.push(variable.code);
      return;
    }
    if (variable.min > data[variable.code] || variable.max < data[variable.code]) {
      missing.push(variable.code);
      return;
    }
    keys.push(variable.code);
    matchVerify += 1;
  });
  if (matchVerify !== vars.length) {
    const message = missing.join(',');
    return { valid: false, data: `Faltantes o fuera de rango: ${message}` };
  }

  const dataToReturn = {};
  keys.forEach((key) => {
    dataToReturn[key] = data[key];
  });

  return { valid: true, data: dataToReturn };
}

/**
 * Valida el esquema para las variables
 * @param {Object} obj Es
 */
function validarEsquema(obj) {
  const validation = validator.validate(obj, schema);
  if (validation.errors.length === 0) {
    return { valid: true, errors: null };
  }
  return { valid: false, errors: validation.errors };
}

module.exports = {
  areValidVars,
  validarEsquema,
};
