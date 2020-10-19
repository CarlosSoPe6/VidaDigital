/**
 * Módulo para ejecutar las consutltas a la base de datos bajo un mismo contexto.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */

const { getConnection } = require('../config/dbConfig');

/**
 * Definición de tipo de pool context
 * @exports
 */
class PoolContext {
  /**
   * Constructor
   * @param {import('mysql').PoolConnection} connection Connection pool
   */
  constructor(connection) {
    this.connection = connection;
  }
}

/**
 * Definición de tipo del callback para la ejecución del contexto.
 * @callback PoolContextCallback
 * @param {PoolContext} context Context to execute with
 * @returns {Promise<void>} Promesa a ser ejecutada
 */

/**
 * Ejecuta una función con un contexto
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @param {PoolContextCallback} callback Callback a ejecutar con un contexto
 */
async function executionContext(callback) {
  const connection = await getConnection();
  let exception = null;
  const context = new PoolContext(connection);
  try {
    await callback(context);
  } catch (err) {
    exception = err;
  } finally {
    connection.release();
  }
  if (exception) {
    throw exception;
  }
}

module.exports = {
  executionContext,
};
