const { getConnection } = require('../config/dbConfig');

/**
 * Obtiene las lecturas de un nodo en específico en un día.
 * @param {string} nodo Id del nodo.
 * @param {number} anio Año de consulta.
 * @param {number} mes Mes de consulta.
 * @param {number} dia Día de consulta.
 * @return {Promise<Object>} Resultado de la consulta.
 */
async function getLecturasNodoDia(nodo, anio, mes, dia) {
  const connection = await getConnection();
  const valuesToEscape = [
    nodo,
    anio,
    mes,
    dia,
  ];
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM LecturasNodos WHERE idNodo = ?', valuesToEscape, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

/**
 * Obtiene las lecturas de un nodo en específico en una semana.
 * @param {string} nodo Id del nodo.
 * @param {number} anio Año de consulta.
 * @param {number} mes Mes de consulta.
 * @param {number} dia Día de consulta.
 * @return {Promise<Object>} Resultado de la consulta.
 */
async function getLecturasNodoSemana(nodo, anio, mes, dia) {
  const connection = await getConnection();
  const valuesToEscape = [
    nodo,
    anio,
    mes,
    dia,
  ];
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM LecturasNodos WHERE idNodo = ?', valuesToEscape, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

/**
 * Obtiene las lecturas de un nodo en específico en un mes.
 * @param {string} nodo Id del nodo.
 * @param {number} anio Año de consulta.
 * @param {number} mes Mes de consulta.
 * @return {Promise<Object>} Resultado de la consulta.
 */
async function getLecturasNodoMes(nodo, anio, mes) {
  const connection = await getConnection();
  const valuesToEscape = [
    nodo,
    anio,
    mes,
  ];
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM LecturasNodos WHERE idNodo = ?', valuesToEscape, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

/**
 * Obtiene las lecturas de un nodo en específico en un año.
 * @param {string} nodo Id del nodo.
 * @param {number} anio Año de consulta.
 * @return {Promise<Object>} Resultado de la consulta.
 */
async function getLecturasNodoAnio(nodo, anio) {
  const connection = await getConnection();
  const valuesToEscape = [
    nodo,
    anio,
  ];
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM LecturasNodos WHERE idNodo = ?', valuesToEscape, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}

module.exports = {
  getLecturasNodoDia,
  getLecturasNodoSemana,
  getLecturasNodoMes,
  getLecturasNodoAnio,
};
