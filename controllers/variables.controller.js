/**
 * Módulo del controlador de variables.
 * Este archivo contiene todos los endpoints del controlador de variables.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */
const variablesModel = require('../db/variables.model');

/**
 * GET /api/variables/
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getVariables(req, res) {
  const result = await variablesModel.getVariables();
  res.json(result);
}

module.exports = {
  getVariables,
};
