/**
 * Módulo del controlador de variables.
 * Este archivo contiene todos los endpoints del controlador de variables.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */
const variablesModel = require('../db/variables.model');
const { validarEsquema } = require('../validators/variables');
const { executionContext } = require('../db/executionContext');
/**
 * GET /api/variables/
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getVariables(req, res) {
  try {
    await executionContext(async (context) => {
      const { connection } = context;
      const result = await variablesModel.getVariables(connection);
      res.json(result);
    });
  } catch (err) {
    res.status(500).send('Internal server error');
  }
}

/**
 * POST /api/variables
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function postVarialbe(req, res) {
  const {
    description,
    code,
    abr,
    min,
    max,
    referenceVal,
    ambiental,
  } = req.body;
  const dataObj = {
    description,
    code,
    abr,
    min,
    max,
    referenceVal,
    ambiental,
  };
  try {
    await executionContext(async (context) => {
      const { connection } = context;
      const result = await variablesModel.postVariable(connection, dataObj);
      if (result.length === 0) {
        res.status(404).send();
        return;
      }
      res.staus(201).json(result[0]);
    });
  } catch (err) {
    res.status(500).send('Internal server error');
  }
}

/**
 * GET /api/variables/:code
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getVarialbe(req, res) {
  const { code } = req.params;
  try {
    await executionContext(async (context) => {
      const { connection } = context;
      const result = await variablesModel.getVariable(connection, code);
      if (result.length === 0) {
        res.status(404).send();
        return;
      }
      res.json(result);
    });
  } catch (err) {
    res.status(500).send('Internal server error');
  }
}

/**
 * PUT /api/variables/:code
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function putVarialbe(req, res) {
  const searchCode = req.params.code;
  const {
    id,
    description,
    code,
    abr,
    min,
    max,
    referenceVal,
    ambiental,
  } = req.body;
  const dataObj = {
    id,
    description,
    code,
    abr,
    min,
    max,
    referenceVal,
    ambiental,
  };
  const validation = await validarEsquema(dataObj);
  if (!validation) {
    res.status(400).send('BAD REQUEST');
    return;
  }
  try {
    await executionContext(async (context) => {
      const { connection } = context;
      const result = await variablesModel.putVariable(connection, searchCode, dataObj);
      res.json(result[0]);
    });
  } catch (err) {
    res.status(500).send('Internal server error');
  }
}

/**
 * DELETE /api/variables/:code
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function deleteVarialbe(req, res) {
  const { code } = req.params;
  try {
    await executionContext(async (context) => {
      const { connection } = context;
      await variablesModel.deleteVariable(connection, code);
      res.status(200).send('DELETED');
    });
  } catch (err) {
    res.status(500).send('Internal server error');
  }
}

module.exports = {
  getVariables,
  postVarialbe,
  getVarialbe,
  putVarialbe,
  deleteVarialbe,
};
