/**
 * Módulo del modelo de lecturas.
 * Este archivo contiene consultas mapeadas a función para
 * consultar la tabla LecturasNodos.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */
const { getConnection } = require('../config/dbConfig');

const DATE_QUERY_STRING_DAY = 'SELECT * FROM LecturasNodos WHERE idNodo = ? AND DATE(fecha_hora) = ?';
const DATE_QUERY_STRING_BETWEEN = 'SELECT * FROM LecturasNodos WHERE idNodo = ? AND fecha_hora BETWEEN ? and ?';
const POST_LECTURA_QUERY = 'INSERT INTO LecturasNodos (`idNodo`, fecha_hora, `data`) VALUES (?, ?, ?)';

async function postLectura(idNodo, fechaHora, data) {
  const connection = await getConnection();
  const valuesToEscape = [
    idNodo,
    fechaHora,
    data,
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
 * Obtiene las lecturas de un nodo en específico en un día.
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @param {string} nodo Id del nodo.
 * @param {number} anio Año de consulta.
 * @param {number} mes Mes de consulta.
 * @param {number} dia Día de consulta.
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getLecturasNodoDia(nodo, anio, mes, dia) {
  const connection = await getConnection();
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
 * @param {string} nodo Id del nodo.
 * @param {number} anio Año de consulta.
 * @param {number} mes Mes de consulta.
 * @param {number} dia Día de consulta.
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getLecturasNodoSemana(nodo, anio, mes, dia) {
  const connection = await getConnection();
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
 * @param {string} nodo Id del nodo.
 * @param {number} anio Año de consulta.
 * @param {number} mes Mes de consulta.
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getLecturasNodoMes(nodo, anio, mes) {
  const connection = await getConnection();
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
 * @param {string} nodo Id del nodo.
 * @param {number} anio Año de consulta.
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getLecturasNodoAnio(nodo, anio) {
  const connection = await getConnection();
  const firstDayOfYear = new Date(Date.UTC(anio, 0, 1, 0, 0, 0));
  const lastDayOfYear = new Date(Date.UTC(anio, 11, 31, 23, 59, 59, 999));
  console.log(lastDayOfYear);
  console.log(firstDayOfYear);
  const valuesToEscape = [
    nodo,
    firstDayOfYear.toISOString(),
    lastDayOfYear.toISOString(),
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
  getLecturasNodoDia,
  getLecturasNodoSemana,
  getLecturasNodoMes,
  getLecturasNodoAnio,
};
