/**
 * Módulo del controlador de lecturas.
 * Este archivo contiene todos los endpoints del controlador de lecturas.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */
const lectuasModel = require('../db/lecturas.model');

/**
 * GET /api/lecturas
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function postLectura(req, res) {
  const cmdArray = req.query.cmd.split(';');
  const idNodo = cmdArray[1];
  const dateCmd = cmdArray[4];
  let fechaHora = Date.now();
  if (dateCmd === 'TS') {
    fechaHora = Date(cmdArray[5]);
  } else if ((dateCmd === 'TS')) {
    fechaHora = Date(cmdArray[5]);
  }
  const data = {};
  for (let i = 6; i < cmdArray.length; i += 2) {
    const dataMember = cmdArray[i];
    const dataValue = cmdArray[i + 1];
    data[dataMember] = dataValue;
  }
  try {
    await lectuasModel.postLectura(idNodo, fechaHora, data);
    res.status(201).send('CREATED');
  } catch (e) {
    res.status(501).send(e.message);
  }
}

async function getLecturas(req, res) {
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
  getLecturas,
  getLecturaId,
  getLecturasNodo,
  getLecturasNodoDia,
  getLecturasNodoSemana,
  getLecturasNodoMes,
  getLecturasNodoAnio,
};
