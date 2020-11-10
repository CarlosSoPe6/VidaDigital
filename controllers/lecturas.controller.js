/* eslint-disable no-restricted-globals */
/**
 * Módulo del controlador de lecturas.
 * Este archivo contiene todos los endpoints del controlador de lecturas.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */
const fs = require('fs');
const { parse } = require('json2csv');

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "express" }] */
const express = require('express');
const lecturasModel = require('../db/lecturas.model');
const lectuasModel = require('../db/lecturas.model');
const { areValidVars } = require('../validators/variables');
const lecturasLog = require('../loggers/lecturas');
const errorLog = require('../loggers/error');
const { executionContext } = require('../db/executionContext');

/**
 * Converite la respuesta de la db en un JSON
 * @param {Array} response Respuesta de DB
 * @returns {Array} Respuesta de DB procesada
 */
function getJson(response) {
  const json = [];
  response.forEach((lectura) => {
    json.push(JSON.parse(lectura.data));
  });
  return json;
}

/**
 * Construye el objeto para insertar en la base de datos.
 * @param {Array<String>} cmdArray Arreglo del comando recivido.
 */
function buildCmdDataObject(cmdArray) {
  const idNodo = cmdArray[1];
  const dateCmd = cmdArray[4];
  const action = cmdArray[3].toLowerCase();
  let fechaHora = new Date(Date.now());
  if (dateCmd === 'TS') {
    fechaHora = new Date(cmdArray[5]);
  } else if (dateCmd === 'TU') {
    fechaHora = new Date(Number(cmdArray[5]) * 1000);
  }
  const data = {};
  data.id = idNodo;
  data.ac = action;
  data.tn = fechaHora;
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
 * @exports postLectura
 * @param {express.Request} req Request parameter.
 * @param {express.Response} res Response parameter.
 */
async function postLectura(req, res) {
  const { cmd } = req.query;
  if (cmd === undefined) {
    res.status(400).send('BAD REQUEST. No cmd;');
    return;
  }
  lecturasLog(cmd);
  const cmdArray = cmd.trim().split(';');
  if (cmdArray[cmdArray.length - 1] !== '') {
    res.status(400).send('BAD REQUEST. cmd not structured;');
    return;
  }
  const idNodo = cmdArray[1];
  cmdArray.pop();
  if (cmdArray.length % 2 !== 0) {
    res.status(400).send('BAD REQUEST. cmd not structured;');
    return;
  }
  const data = buildCmdDataObject(cmdArray);
  // eslint-disable-next-line no-restricted-globals
  if (data.tn === undefined || isNaN(data.tn)) {
    res.status(400).send(`ID;${data.id};RS;Incorrect time format;`);
    return;
  }
  if (data.ac !== 'td') {
    res.status(400).send(`ID;${data.id};RS;No insert cmd;`);
    return;
  }
  try {
    await executionContext(async (context) => {
      const { connection } = context;
      const validationResult = await areValidVars(connection, idNodo, data);
      if (!validationResult.valid) {
        res.status(400).send(`ID;${data.id};RS;${validationResult.data};`);
        return;
      }
      const cleanData = validationResult.data;
      await lectuasModel.postLectura(connection, idNodo, cleanData.tn, cleanData);
      res.status(201).send(`ID;${data.id};RS;Correct;`);
    });
  } catch (e) {
    errorLog(e.message);
    res.status(501).send(`ID;${data.id};RS;Incorrect;Err;${e.message};`);
  }
}

/**
 * GET /api/lecturas/t?count=100
 * @async
 * @exports getLecturas
 * @param {express.Request} req Request parameter.
 * @param {express.Response} res Response parameter.
 */
async function getLecturas(req, res) {
  let { count } = req.query;
  if (count === undefined) {
    count = 100;
  }
  count = Number(count);
  if (isNaN(count)) {
    res.status(400).send('count is not number');
    return;
  }
  try {
    await executionContext(async (context) => {
      const { connection } = context;
      const response = await lecturasModel.getLecturas(connection, count);
      res.json(response);
    });
  } catch (e) {
    errorLog(e.message);
    res.status(500).send(e.message);
  }
}

/**
 * GET /api/lecturas/id/:id
 * @async
 * @exports getLecturaId
 * @param {express.Request} req Request parameter.
 * @param {express.Response} res Response parameter.
 */
async function getLecturaId(req, res) {
  const { id } = req.params;
  try {
    await executionContext(async (context) => {
      const { connection } = context;
      const response = await lecturasModel.getLecturaId(connection, id);
      if (response.length === 0) {
        res.status(404).send('NOT FOUND');
        return;
      }
      res.json(response);
    });
  } catch (e) {
    errorLog(e.message);
    res.status(500).send(e.message);
  }
}

/**
 * PUT /api/lecturas/id/:id
 * @async
 * @exports putLecturaId
 * @param {express.Request} req Request parameter.
 * @param {express.Response} res Response parameter.
 */
async function putLecturaId(req, res) {
  res.send('NOT IMPLEMENTED');
}

/**
 * DELETE /api/lecturas/id/:id
 * @async
 * @exports deleteLecturaId
 * @param {express.Request} req Request parameter.
 * @param {express.Response} res Response parameter.
 */
async function deleteLecturaId(req, res) {
  const { id } = req.params;
  try {
    await executionContext(async (context) => {
      const { connection } = context;
      const response = await lecturasModel.deleteLecturaId(connection, id);
      res.json(response);
    });
  } catch (e) {
    errorLog(e.message);
    res.status(500).send(e.message);
  }
}

/**
 * GET /api/lecturas/n/:id
 * @async
 * @exports getLecturasNodo
 * @param {express.Request} req Request parameter.
 * @param {express.Response} res Response parameter.
 */
async function getLecturasNodo(req, res) {
  const { id } = req.params;
  const { format } = req.query;
  let { count } = req.query;
  if (count === undefined) {
    count = 100;
  }
  count = Number(count);
  if (isNaN(count)) {
    res.status(400).send('count is not number');
    return;
  }
  try {
    await executionContext(async (context) => {
      const { connection } = context;
      const response = await lecturasModel.getLecturasNodo(connection, id, count);
      if (response.length === 0) {
        res.status(404).send('NOT FOUND');
        return;
      }
      const json = getJson(response);
      if (format === 'csv') {
        const csv = parse(json);
        res.send(csv).end();
        return;
      }
      res.json(json).end();
    });
  } catch (e) {
    errorLog(e.message);
    res.status(500).send(e.message);
  }
}

/**
 * GET /api/lecturas/dia/{nodo}/{anio}/{mes}/{dia}
 * @async
 * @exports getLecturasNodoDia
 * @param {express.Request} req Request parameter.
 * @param {express.Response} res Response parameter.
 */
async function getLecturasNodoDia(req, res) {
  const {
    nodo,
    anio,
    mes,
    dia,
  } = req.params;
  const {
    format,
  } = req.query;
  const date = new Date(anio, mes - 1, dia);
  if (isNaN(date)) {
    res.status(400).send('BAD REQUEST. Año, mes, o día inválidos');
    return;
  }
  try {
    await executionContext(async (context) => {
      const { connection } = context;
      const response = await lectuasModel.getLecturasNodoDia(connection, nodo, anio, mes, dia);
      if (response.length === 0) {
        res.status(404).send('NOT FOUND');
        return;
      }
      const json = getJson(response);
      if (format === 'csv') {
        const csv = parse(json);
        res.send(csv).end();
        return;
      }
      res.json(json).end();
    });
  } catch (e) {
    errorLog(e.message);
    res.status(500).send(e.message);
  }
}

/**
 * GET /api/lecturas/semana/{nodo}/{anio}/{mes}/{dia}
 * @async
 * @exports getLecturasNodoSemana
 * @param {express.Request} req Request parameter.
 * @param {express.Response} res Response parameter.
 */
async function getLecturasNodoSemana(req, res) {
  const {
    nodo,
    anio,
    mes,
    dia,
  } = req.params;
  const {
    format,
  } = req.query;
  const startWeek = new Date(anio, mes - 1, dia, 0, 0, 0, 0);
  const endWeek = new Date(anio, mes - 1, dia, 23, 59, 59, 999);
  if (isNaN(startWeek) || isNaN(endWeek)) {
    res.status(400).send('BAD REQUEST. Año, mes, o día inválidos');
    return;
  }
  try {
    await executionContext(async (context) => {
      const { connection } = context;
      const response = await lectuasModel.getLecturasNodoSemana(connection, nodo, anio, mes, dia);
      if (response.length === 0) {
        res.status(404).send('NOT FOUND');
        return;
      }
      const json = getJson(response);
      if (format === 'csv') {
        const csv = parse(json);
        res.send(csv).end();
        return;
      }
      res.json(json).end();
    });
  } catch (e) {
    errorLog(e.message);
    res.status(500).send(e.message);
  }
}

/**
 * GET /api/lecturas/mes/{nodo}/{anio}/{mes}
 * @async
 * @exports getLecturasNodoMes
 * @param {express.Request} req Request parameter.
 * @param {express.Response} res Response parameter.
 */
async function getLecturasNodoMes(req, res) {
  const {
    nodo,
    anio,
    mes,
  } = req.params;
  const {
    format,
  } = req.query;
  const firstDayOfMonth = new Date(anio, mes - 1, 1, 0, 0, 0, 0);
  const lastDatyOfMonth = new Date(anio, mes, 0, 23, 59, 59, 999);
  if (isNaN(firstDayOfMonth) || isNaN(lastDatyOfMonth)) {
    res.status(400).send('BAD REQUEST. Año o mes inválidos');
    return;
  }
  try {
    await executionContext(async (context) => {
      const { connection } = context;
      const response = await lectuasModel.getLecturasNodoMes(connection, nodo, anio, mes);
      if (response.length === 0) {
        res.status(404).send('NOT FOUND');
        return;
      }
      const json = getJson(response);
      if (format === 'csv') {
        const csv = parse(json);
        res.send(csv).end();
        return;
      }
      res.json(json).end();
    });
  } catch (e) {
    errorLog(e.message);
    res.status(500).send(e.message);
  }
}

/**
 * GET /api/lecturas/anio/{nodo}/{anio}
 * @async
 * @exports getLecturasNodoAnio
 * @param {express.Request} req Request parameter.
 * @param {express.Response} res Response parameter.
 */
async function getLecturasNodoAnio(req, res) {
  const {
    nodo,
    anio,
  } = req.params;
  const {
    format,
  } = req.query;
  const firstDayOfYear = new Date(Date.UTC(anio, 0, 1, 0, 0, 0));
  const lastDayOfYear = new Date(Date.UTC(anio, 11, 31, 23, 59, 59, 999));
  if (isNaN(firstDayOfYear) || isNaN(lastDayOfYear)) {
    res.status(400).send('BAD REQUEST. Año inválido');
    return;
  }
  try {
    await executionContext(async (context) => {
      const { connection } = context;
      const response = await lectuasModel.getLecturasNodoAnio(connection, nodo, anio);
      if (response.length === 0) {
        res.status(404).send('NOT FOUND');
        return;
      }
      const json = getJson(response);
      if (format === 'csv') {
        const csv = parse(json);
        res.send(csv).end();
        return;
      }
      res.json(json).end();
    });
  } catch (e) {
    errorLog(e.message);
    res.status(500).send(e.message);
  }
}

/**
 * GET /api/lecturas/logs
 * @async
 * @exports getLogs
 * @param {express.Request} req Request parameter.
 * @param {express.Response} res Response parameter.
 */
async function getLogs(req, res) {
  fs.readFile('lecturas.log', (err, data) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.send(data.toString());
  });
}

module.exports = {
  postLectura,
  getLecturas,
  getLecturaId,
  putLecturaId,
  deleteLecturaId,
  getLecturasNodo,
  getLecturasNodoDia,
  getLecturasNodoSemana,
  getLecturasNodoMes,
  getLecturasNodoAnio,
  getLogs,
};
