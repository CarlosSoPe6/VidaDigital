/**
 * Módulo auxiliar para verificar nodos.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */
const { getNodo } = require('../db/nodes.model');

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

module.exports = {
  isValidNode,
};
