/* eslint-disable no-restricted-globals */
/**
 * Módulo del controlador de lecturas.
 * Este archivo contiene todos los endpoints del controlador de lecturas.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */
const SimpleLogger = require('simple-node-logger');
const lecturasModel = require('../db/lecturas.model');
const lectuasModel = require('../db/lecturas.model');
const { areValidVars } = require('../validators/variables');

const log = SimpleLogger.createSimpleLogger('lecturas.log');
log.setLevel('info');

/**
 * Construye el objeto para insertar en la base de datos.
 * @param {Array<String>} cmdArray Arreglo del comando recivido.
 */
function buildCmdDataObject(cmdArray) {
  const idNodo = cmdArray[1];
  const dateCmd = cmdArray[4];
  let fechaHora = new Date(Date.now());
  if (dateCmd === 'TS') {
    fechaHora = new Date(cmdArray[5]);
  } else if (dateCmd === 'TD') {
    fechaHora = new Date(Number(cmdArray[5]) * 1000);
  }
  const data = {};
  data.id = idNodo;
  data.ts = fechaHora;
  for (let i = 6; i < cmdArray.length; i += 2) {
    const dataMember = cmdArray[i].toLowerCase();
    const dataValue = Number(cmdArray[i + 1]);
    data[dataMember] = dataValue;
  }
  return data;
}

/**
 * GET /api/lecturas?cmd=:cmd
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function postLectura(req, res) {
  const { cmd } = req.query;
  if (cmd === undefined) {
    res.status(400).send('BAD REQUEST. No cmd');
    return;
  }
  log.info(cmd);
  const cmdArray = cmd.trim().split(';');
  if (cmdArray[cmdArray.length - 1] !== '') {
    res.status(400).send('BAD REQUEST. cmd not structured');
    return;
  }
  const idNodo = cmdArray[1];
  cmdArray.pop();
  if (cmdArray.length % 2 !== 0) {
    res.status(400).send('BAD REQUEST. cmd not structured');
    return;
  }
  const data = buildCmdDataObject(cmdArray);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(data.ts)) {
    res.status(400).send(`ID;${data.id};RS;Incorrect`);
    return;
  }
  try {
    const validationResult = await areValidVars(idNodo, data);
    if (!validationResult.valid) {
      res.status(400).send(`ID;${data.id};RS;Incorrect`);
      return;
    }
    const cleanData = validationResult.data;
    await lectuasModel.postLectura(idNodo, cleanData.ts, JSON.stringify(cleanData));
    res.status(201).send(`ID;${data.id};RS;Correct`);
  } catch (e) {
    res.status(501).send(`ID;${data.id};RS;Incorrect;Err;${e.message}`);
  }
}

/**
 * GET /api/lecturas/t?count=100
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getLecturas(req, res) {
  let { count } = req.query;
  if (count === undefined) {
    count = 100;
  }
  count = Number(count);
  const response = await lecturasModel.getLecturas(count);
  res.json(response);
}

/**
 * GET /api/lecturas/id/:id
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getLecturaId(req, res) {
  const { id } = req.params;
  const response = await lecturasModel.getLecturaId(id);
  if (response.length === 0) {
    res.status(404).send('NOT FOUND');
  }
  res.json(response);
}

async function getLecturasNodo(req, res) {
  const { id } = req.params;
  let { count } = req.query;
  if (count === undefined) {
    count = 100;
  }
  count = Number(count);
  const response = await lecturasModel.getLecturasNodo(id, count);
  if (response.length === 0) {
    res.status(404).send('NOT FOUND');
  }
  res.json(response);
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
  const date = new Date(anio, mes - 1, dia);
  if (isNaN(date)) {
    res.status(400).send('BAD REQUEST. Año, mes, o día inválidos');
    return;
  }
  const response = await lectuasModel.getLecturasNodoDia(nodo, anio, mes, dia);
  if (response.length === 0) {
    res.status(404).send('NOT FOUND');
  }
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
  const startWeek = new Date(anio, mes - 1, dia, 0, 0, 0, 0);
  const endWeek = new Date(anio, mes - 1, dia, 23, 59, 59, 999);
  if (isNaN(startWeek) || isNaN(endWeek)) {
    res.status(400).send('BAD REQUEST. Año, mes, o día inválidos');
    return;
  }
  const response = await lectuasModel.getLecturasNodoSemana(nodo, anio, mes, dia);
  if (response.length === 0) {
    res.status(404).send('NOT FOUND');
  }
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
  const firstDayOfMonth = new Date(anio, mes - 1, 1, 0, 0, 0, 0);
  const lastDatyOfMonth = new Date(anio, mes - 1, 0, 23, 59, 59, 999);
  if (isNaN(firstDayOfMonth) || isNaN(lastDatyOfMonth)) {
    res.status(400).send('BAD REQUEST. Año o mes inválidos');
    return;
  }
  const response = await lectuasModel.getLecturasNodoMes(nodo, anio, mes);
  if (response.length === 0) {
    res.status(404).send('NOT FOUND');
  }
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
  const firstDayOfYear = new Date(Date.UTC(anio, 0, 1, 0, 0, 0));
  const lastDayOfYear = new Date(Date.UTC(anio, 11, 31, 23, 59, 59, 999));
  if (isNaN(firstDayOfYear) || isNaN(lastDayOfYear)) {
    res.status(400).send('BAD REQUEST. Año inválido');
    return;
  }
  const response = await lectuasModel.getLecturasNodoAnio(nodo, anio);
  if (response.length === 0) {
    res.status(404).send('NOT FOUND');
  }
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
