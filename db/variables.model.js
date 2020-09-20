/**
 * Módulo del modelo de variables.
 * Este archivo contiene consultas mapeadas a función para
 * consultar la tabla ValuesCatalog.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */
const { getConnection } = require('../config/dbConfig');

/**
 * Obtiene las variables de la base de datos.
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getVariables() {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.query('select * from ValuesCatalog', (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

module.exports = {
  getVariables,
};
