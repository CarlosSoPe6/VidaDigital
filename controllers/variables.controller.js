const variablesModel = require('../db/variables.model');

/**
 * GET /api/variables/
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
