/**
 * Módulo auxiliar para verificar nodos.
 * @author Héctor Chávez <carlos348@outlook.com>
 */
const schema = require('../config/swagger.nodos.json').components.schemas.Users;
const validator = require('./index');

const TYPES = {
  ADMIN: 'admin',
  USER: 'user',
};

/**
 * Valida el esquema para las variables
 * @param {Object} obj Es
 */
async function validarEsquema(obj) {
  const validation = validator.validate(obj, schema);

  return validation.errors;
}

module.exports = {
  TYPES,
  validarEsquema,
};
