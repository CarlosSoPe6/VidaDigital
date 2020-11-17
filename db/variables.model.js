/**
 * Módulo del modelo de variables.
 * Este archivo contiene consultas mapeadas a función para
 * consultar la tabla ValuesCatalog.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */

/**
 * Obtiene las variables de la base de datos.
 * @async
 * @exports getVariables
 * @param {mysql.PoolConnection} connection Conexión a usar
 * @throws {mysql.MysqlError}
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
 * @exports getVariable
 * @param {mysql.PoolConnection} connection Conexión a usar
 * @param {*} code Código a buscar
 * @throws {mysqlMysqlError}
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

/**
 * Crea una vvariable nueva
 * @async
 * @exports postVariable
 * @param {mysql.PoolConnection} connection Conexión a usar
 * @param {object} variable Variable a insertar
 * @throws {mysql.MysqlError}
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function postVariable(connection, variable) {
  const {
    description,
    code,
    unit,
    abr,
    min,
    max,
    referenceVal,
    ambiental,
  } = variable;
  const valuesToEscape = [
    description,
    code,
    abr,
    unit,
    min,
    max,
    referenceVal,
    ambiental,
  ];
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO ValuesCatalog
      (description,
      code,
      abr,
      unit,
      min,
      max,
      referenceVal,
      ambiental)
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?);`,
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

/**
 * Actualiza una variable por su código
 * @async
 * @exports putVariable
 * @param {mysql.PoolConnection} connection Conexión a usar
 * @param {string} code Variable a actualizar
 * @param {object} variable Variable a actualizar
 * @throws {mysql.MysqlError}
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function putVariable(connection, code, variable) {
  const {
    description,
    unit,
    abr,
    min,
    max,
    referenceVal,
    ambiental,
  } = variable;
  const valuesToEscape = [
    description,
    unit,
    abr,
    min,
    max,
    referenceVal,
    ambiental,
    code,
  ];
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ValuesCatalog
      SET
      description = ?,
      abr = ?,
      unit = ?,
      min = ?,
      max = ?,
      referenceVal = ?,
      ambiental = ?
      WHERE code = ?;`,
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

/**
 * Elimina una variable por su código
 * @async
 * @exports deleteVariable
 * @param {mysql.PoolConnection} connection Conexión a usar
 * @param {string} code Variable a actualizar
 * @throws {mysql.MysqlError}
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function deleteVariable(connection, code) {
  const valuesToEscape = [
    code,
  ];
  return new Promise((resolve, reject) => {
    connection.query(
      'DELETE FROM ValuesCatalog WHERE code = ?;',
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
  postVariable,
  putVariable,
  deleteVariable,
};
