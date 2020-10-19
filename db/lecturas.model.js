/**
 * Módulo del modelo de lecturas.
 * Este archivo contiene consultas mapeadas a función para
 * consultar la tabla LecturasNodos.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */

const DELETE_LECTURA_ID = 'DELETE FROM LecturasNodos WHERE id=?;';
const QUERY_LECTURAS_NODO = 'SELECT * FROM LecturasNodos WHERE idNodo=? ORDER BY fecha_hora DESC LIMIT ?;';
const QUERY_LECTURAS = 'SELECT * FROM LecturasNodos ORDER BY fecha_hora DESC LIMIT ?;';
const QUERY_LECTURA_ID = 'SELECT * FROM LecturasNodos WHERE id = ?;';
const DATE_QUERY_STRING_DAY = 'SELECT * FROM LecturasNodos WHERE idNodo = ? AND DATE(fecha_hora) = ?;';
const DATE_QUERY_STRING_BETWEEN = 'SELECT * FROM LecturasNodos WHERE idNodo = ? AND fecha_hora BETWEEN ? and ?;';
const POST_LECTURA_QUERY = 'INSERT INTO LecturasNodos (`idNodo`, fecha_hora, `data`) VALUES (?, ?, ?);';

/**
 * Returns the date objet to the ISOstrig of the timezone
 * @param {Date} date Date to parse
 */
function toIsoString(date) {
  const tzo = -date.getTimezoneOffset();
  const dif = tzo >= 0 ? '+' : '-';
  const pad = (num) => {
    const norm = Math.floor(Math.abs(num));
    return (norm < 10 ? '0' : '') + norm;
  };
  return `${date.getFullYear()
  }-${pad(date.getMonth() + 1)
  }-${pad(date.getDate())
  }T${pad(date.getHours())
  }:${pad(date.getMinutes())
  }:${pad(date.getSeconds())
  }${dif}${pad(tzo / 60)
  }${pad(tzo % 60)}`;
}

/**
 * Crea un registro de lectura
 * @throws {import('mysql').MysqlError}
 * @param {import('mysql').PoolConnection} connection Conexión a usar
 * @param {string} idNodo Id del nodo
 * @param {Date} fechaHora Hora y fecha
 * @param {Object} data Datos en JSON strinf
 * @returns {Promise<Array<Object>} Resultado de la consulta.
 */
async function postLectura(connection, idNodo, fechaHora, data) {
  const dataToInsert = data;
  dataToInsert.tn = toIsoString(data.tn);
  const valuesToEscape = [
    idNodo,
    fechaHora,
    JSON.stringify(data),
  ];
  return new Promise((resolve, reject) => {
    connection.query(
      POST_LECTURA_QUERY,
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
 * Obtiene las últimas <límite> lecturas
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @param {import('mysql').PoolConnection} connection Conexión a usar
 * @param {number} limit Límite
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getLecturas(connection, limit) {
  const valuesToEscape = [
    limit,
  ];
  return new Promise((resolve, reject) => {
    connection.query(
      QUERY_LECTURAS,
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
 * Obtiene una lectura por su ID
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @param {import('mysql').PoolConnection} connection Conexión a usar
 * @param {number} id Id de la lectura
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getLecturaId(connection, id) {
  const valuesToEscape = [
    id,
  ];
  return new Promise((resolve, reject) => {
    connection.query(
      QUERY_LECTURA_ID,
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
 * Elimina una lectura por su ID
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @param {import('mysql').PoolConnection} connection Conexión a usar
 * @param {number} id Id de la lectura
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function deleteLecturaId(connection, id) {
  const valuesToEscape = [
    id,
  ];
  return new Promise((resolve, reject) => {
    connection.query(
      DELETE_LECTURA_ID,
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

async function getLecturasNodo(connection, id, count) {
  const valuesToEscape = [
    id,
    count,
  ];
  return new Promise((resolve, reject) => {
    connection.query(
      QUERY_LECTURAS_NODO,
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
 * Obtiene las lecturas de un nodo en específico en un día.
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @param {import('mysql').PoolConnection} connection Conexión a usar
 * @param {string} nodo Id del nodo.
 * @param {number} anio Año de consulta.
 * @param {number} mes Mes de consulta.
 * @param {number} dia Día de consulta.
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getLecturasNodoDia(connection, nodo, anio, mes, dia) {
  const date = new Date(anio, mes - 1, dia);
  const valuesToEscape = [
    nodo,
    date,
  ];
  return new Promise((resolve, reject) => {
    connection.query(
      DATE_QUERY_STRING_DAY,
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
 * Obtiene las lecturas de un nodo en específico en una semana.
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @param {import('mysql').PoolConnection} connection Conexión a usar
 * @param {string} nodo Id del nodo.
 * @param {number} anio Año de consulta.
 * @param {number} mes Mes de consulta.
 * @param {number} dia Día de consulta.
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getLecturasNodoSemana(connection, nodo, anio, mes, dia) {
  const startWeek = new Date(anio, mes - 1, dia, 0, 0, 0, 0);
  const endWeek = new Date(anio, mes - 1, dia, 23, 59, 59, 999);
  startWeek.setDate(startWeek.getDate() - 7);
  const valuesToEscape = [
    nodo,
    startWeek,
    endWeek,
  ];
  return new Promise((resolve, reject) => {
    connection.query(
      DATE_QUERY_STRING_BETWEEN,
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
 * Obtiene las lecturas de un nodo en específico en un mes.
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @param {import('mysql').PoolConnection} connection Conexión a usar
 * @param {string} nodo Id del nodo.
 * @param {number} anio Año de consulta.
 * @param {number} mes Mes de consulta.
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getLecturasNodoMes(connection, nodo, anio, mes) {
  const firstDayOfMonth = new Date(anio, mes - 1, 1, 0, 0, 0, 0);
  const lastDatyOfMonth = new Date(anio, mes - 1, 0, 23, 59, 59, 999);
  const valuesToEscape = [
    nodo,
    firstDayOfMonth,
    lastDatyOfMonth,
  ];
  return new Promise((resolve, reject) => {
    connection.query(
      DATE_QUERY_STRING_BETWEEN,
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
 * Obtiene las lecturas de un nodo en específico en un año.
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @param {import('mysql').PoolConnection} connection Conexión a usar
 * @param {string} nodo Id del nodo.
 * @param {number} anio Año de consulta.
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getLecturasNodoAnio(connection, nodo, anio) {
  const firstDayOfYear = new Date(Date.UTC(anio, 0, 1, 0, 0, 0));
  const lastDayOfYear = new Date(Date.UTC(anio, 11, 31, 23, 59, 59, 999));
  const valuesToEscape = [
    nodo,
    firstDayOfYear,
    lastDayOfYear,
  ];
  return new Promise((resolve, reject) => {
    connection.query(
      DATE_QUERY_STRING_BETWEEN,
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
  postLectura,
  getLecturas,
  getLecturaId,
  deleteLecturaId,
  getLecturasNodo,
  getLecturasNodoDia,
  getLecturasNodoSemana,
  getLecturasNodoMes,
  getLecturasNodoAnio,
};
