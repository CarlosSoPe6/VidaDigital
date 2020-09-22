/**
 * Módulo del controlador de lecturas.
 * Este archivo contiene todos los endpoints del controlador de lecturas.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */
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
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getLecturasNodoDia(req, res) {
  const {
    nodo,
    anio,
    mes,
    dia,
  } = req.params;
  const response = await lectuasModel.getLecturasNodoDia(nodo, anio, mes, dia);
  res.json(response);
}

/**
 * GET /api/lecturas/semana/{nodo}/{anio}/{mes}/{dia}
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getLecturasNodoSemana(req, res) {
  const {
    nodo,
    anio,
    mes,
    dia,
  } = req.params;
  const response = await lectuasModel.getLecturasNodoSemana(nodo, anio, mes, dia);
  res.json(response);
}

/**
 * GET /api/lecturas/mes/{nodo}/{anio}/{mes}
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getLecturasNodoMes(req, res) {
  const {
    nodo,
    anio,
    mes,
  } = req.params;
  const response = await lectuasModel.getLecturasNodoMes(nodo, anio, mes);
  res.json(response);
}

/**
 * GET /api/lecturas/anio/{nodo}/{anio}
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getLecturasNodoAnio(req, res) {
  const {
    nodo,
    anio,
  } = req.params;
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
