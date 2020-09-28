const userModel = require('../db/usuario.model');

/**
 * GET /api/usuario/id/:id
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getUsuarioById(req, res) {
  const id = req.params.userID;

  const data = userModel.getUsuario(id);
  res.json(data);
}

/**
 * PATCH /api/usuario/id/:id
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function patchUsuario(req, res) {
  const userId = req.params.userID;
  const userData = req.body;

  const data = userModel.patchUsuario(userId, userData);
  res.json(data);
}

/**
 * DELETE /api/usuario/id/:id
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function deleteUsuario(req, res) {
  const userId = req.params.userID;

  const data = userModel.patchUsuario(userId);
  res.json(data);
}

/**
 * GET /api/usuarios
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getUsuarios(req, res) {
  const data = userModel.getUsuarios();
  res.json(data);
}

/**
 * GET /api/usuario/nombre/:username
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getUsuarioByName(req, res) {
  const { username } = req.params;

  const data = userModel.patchUsuario(username);
  res.json(data);
}

module.exports = {
  getUsuarioById,
  patchUsuario,
  deleteUsuario,
  getUsuarios,
  getUsuarioByName,
};
