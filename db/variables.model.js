/**
 * Módulo del modelo de variables.
 * Este archivo contiene consultas mapeadas a función para
 * consultar la tabla ValuesCatalog.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */

/**
 * Obtiene las variables de la base de datos.
 * @async
 * @exports
 * @param {import('mysql').PoolConnection} connection Conexión a usar
 * @throws {import('mysql').MysqlError}
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getVariables(connection) {
  return new Promise((resolve, reject) => {
    connection.query('select * from ValuesCatalog', (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

/**
 * Obtiene una variable por su código
 * @async
 * @exports
 * @param {import('mysql').PoolConnection} connection Conexión a usar
 * @param {*} code Código a buscar
 * @throws {import('mysql').MysqlError}
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getVariable(connection, code) {
  const valuesToEscape = [
    code,
  ];
  return new Promise((resolve, reject) => {
    connection.query(
      'select * from ValuesCatalog WHERE code=?',
      valuesToEscape,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      },
    );
  });
}

module.exports = {
  getVariables,
  getVariable,
};
