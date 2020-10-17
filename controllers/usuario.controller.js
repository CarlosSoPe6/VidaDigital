/* eslint-disable no-restricted-globals */
/**
 * Módulo del controlador de usuarios.
 * Este archivo contiene todos los endpoints del controlador de usuarios.
 * @author Héctor Chávez Morales <hector.chavez.97@hotmail.com>
 */
const userModel = require('../db/usuario.model');
const { validarEsquema } = require('../validators/usuario');

/**
 * POST /api/usuario
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function addUsuario(req, res) {
  const user = req.body

  const errors = await validarEsquema(user);
  if (errors.length > 0) {
    res.status(400).send(errors[0].stack);
  }
  else if(user.type != 'admin' && user.type != 'user'){
    res.status(400).send("Wrong type. Must be 'admin' or 'user'")
  }
  else {
    userModel.addUsuario(user)
      .then(() => res.sendStatus(201))
      .catch((err) => {
        if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
          res.status(400).send(err.sqlMessage);
        } else {
          res.status(500).send(err);
        }
      });
  }
}

/**
 * GET /api/usuario/:id
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
 * PATCH /api/usuario/:id
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function patchUsuario(req, res) {
  const userId = req.params.userID;
  const data = req.body;

  userModel.patchUsuario(userId, data.password)
    .then((val) => {
      if (val.changedRows === 0) 
        res.sendStatus(400);
      else 
        res.sendStatus(200);
    })
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } else {
        res.status(500).send(err);
      }
    });
}

/**
 * DELETE /api/usuario/:id
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function deleteUsuario(req, res) {
  const userId = req.params.userID;

  userModel.deleteUsuario(userId)
    .then(() => res.sendStatus(200))
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } else {
        res.status(500).send(err);
      }
    });
}

/**
 * GET /api/todos/usuarios
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

module.exports = {
  addUsuario,
  getUsuario,
  patchUsuario,
  deleteUsuario,
  getUsuarios,
};
