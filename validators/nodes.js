/**
 * Módulo auxiliar para verificar nodos.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */
const { getNodo } = require('../db/nodes.model');
const schema = require('../config/swagger.nodos.json').components.schemas.Node;
const validator = require('./index');

/**
 * Verifica si un nodo existe en la base de datos.
 * @param {string} idNodo Nodo a buscar.
 * @returns {boolean} True si el nodo existe.
 */
async function isValidNode(idNodo) {
  let node = [];
  node = await getNodo(idNodo);
  return node.length === 1;
}

/**
 * Valida el esquema para las variables
 * @param {Object} obj Es
 */
async function validarEsquema(obj) {
  const validation = validator.validate(obj, schema);

  return validation.errors;
}

module.exports = {
  isValidNode,
  validarEsquema,
};
