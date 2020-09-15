const lectuasModel = require('../db/lecturas.model');

async function postLectura(req, res) {
  res.send('postLectura;');
}

async function getTLecturas(req, res) {
  res.send('getTLecturas;');
}

async function getLecturaId(req, res) {
  res.send('getLecturaId');
}

async function getLecturasNodo(req, res) {
  res.send('getLecturasNodo');
}

/**
 * GET /api/lecturas/dia/{nodo}/{anio}/{mes}/{dia}
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getLecturasNodoDia(req, res) {
  const {
    nodo,
    anio,
    mes,
    dia,
  } = req.parms;
  const response = await lectuasModel.getLecturasNodoDia(nodo, anio, mes, dia);
  res.json(response);
}

/**
 * GET /api/lecturas/semana/{nodo}/{anio}/{mes}/{dia}
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getLecturasNodoSemana(req, res) {
  const {
    nodo,
    anio,
    mes,
    dia,
  } = req.parms;
  const response = await lectuasModel.getLecturasNodoSemana(nodo, anio, mes, dia);
  res.json(response);
}

/**
 * GET /api/lecturas/mes/{nodo}/{anio}/{mes}
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getLecturasNodoMes(req, res) {
  const {
    nodo,
    anio,
    mes,
  } = req.parms;
  const response = await lectuasModel.getLecturasNodoMes(nodo, anio, mes);
  res.json(response);
}

/**
 * GET /api/lecturas/anio/{nodo}/{anio}
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getLecturasNodoAnio(req, res) {
  const {
    nodo,
    anio,
  } = req.parms;
  const response = await lectuasModel.getLecturasNodoAnio(nodo, anio);
  res.json(response);
}

module.exports = {
  postLectura,
  getTLecturas,
  getLecturaId,
  getLecturasNodo,
  getLecturasNodoDia,
  getLecturasNodoSemana,
  getLecturasNodoMes,
  getLecturasNodoAnio,
};
