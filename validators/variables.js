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
 * @param {string} idNodo Nodo a buscar.
 * @param {Object} data Datos a validar
 * @returns {boolean} True si el nodo existe.
 */
async function areValidVars(idNodo, data) {
  const vars = await getNodoVariables(idNodo);
  if (vars.length === 0) {
    return { valid: false, data: `No existe nodo ${idNodo}` };
  }
  let matchVerify = 0;
  const keys = ['id', 'ts', 'ac'];
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
async function validarEsquema(obj) {
  const validation = validator.validate(obj, schema);
  if (validation.errors.length === 0) {
    return true;
  }
  return false;
}

module.exports = {
  areValidVars,
  validarEsquema,
};
