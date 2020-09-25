const { getNodoVariables } = require('../db/nodes.model');

/**
 * Verifica si un nodo existe en la base de datos.
 * @param {string} idNodo Nodo a buscar.
 * @param {Object} data Datos a validar
 * @returns {boolean} True si el nodo existe.
 */
async function areValidVars(idNodo, data) {
  const vars = await getNodoVariables(idNodo);
  if (vars.length === 0) {
    return false;
  }
  let matchVerify = 0;
  const keys = ['id', 'ts'];
  vars.forEach((variable) => {
    if (data[variable.code] === undefined) {
      return;
    }
    if (variable.min > data[variable.code] || variable.max < data[variable.code]) {
      return;
    }
    keys.push(variable.code);
    matchVerify += 1;
  });
  if (matchVerify !== vars.length) {
    return { valid: false, data: {} };
  }

  const dataToReturn = {};
  keys.forEach((key) => {
    dataToReturn[key] = data[key];
  });

  return { valid: true, data: dataToReturn };
}

module.exports = {
  areValidVars,
};
