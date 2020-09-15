const { getConnection } = require('../config/dbConfig');

/**
 * Obtiene las variables de la base de datos.
 * @return {Promise<Object>} Resultado de la consulta.
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
