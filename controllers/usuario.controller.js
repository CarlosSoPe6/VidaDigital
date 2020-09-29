/* eslint-disable no-restricted-globals */
/**
 * Módulo del controlador de usuarios.
 * Este archivo contiene todos los endpoints del controlador de usuarios.
 * @author Héctor Chávez Morales <hector.chavez.97@hotmail.com>
 */
const userModel = require('../db/usuario.model');

/**
 * GET /api/usuario/id/:id
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getUsuario(req, res) {
  const id = req.params.userID;

  userModel.getUsuario(id)
    .then((val) => res.send(val[0]))
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } else {
        res.status(500).send(err);
      }
    });
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

  userModel.patchUsuario(userId, userData)
    .then((val) => res.send(val))
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } else {
        res.status(500).send(err);
      }
    });
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

  userModel.deleteUsuario(userId)
    .then(() => res.status(200))
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } else {
        res.status(500).send(err);
      }
    });
}

/**
 * GET /api/usuarios
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getUsuarios(req, res) {
  userModel.getUsuarios()
    .then((val) => res.send(val))
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } else {
        res.status(500).send(err);
      }
    });
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

  userModel.getUsuarioByName(username)
    .then((val) => res.send(val[0]))
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } else {
        res.status(500).send(err);
      }
    });
}

module.exports = {
  getUsuario,
  patchUsuario,
  deleteUsuario,
  getUsuarios,
  getUsuarioByName,
};
