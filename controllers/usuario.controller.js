/* eslint-disable no-restricted-globals */
/**
 * Módulo del controlador de usuarios.
 * Este archivo contiene todos los endpoints del controlador de usuarios.
 * @author Héctor Chávez Morales <hector.chavez.97@hotmail.com>
 */
const userModel = require('../db/usuario.model');
const encrypt = require('../config/encrypt');
const validarUser = require('../validators/usuario');
const { executionContext } = require('../db/executionContext');

/**
 * POST /api/usuario
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function addUsuario(req, res) {
  const user = req.body;

  const errors = await validarUser.validarEsquema(user);
  if (errors.length > 0) {
    res.status(400).send(errors[0].stack);
  } else if (
    user.type.toLowerCase() !== validarUser.TYPES.ADMIN
    && user.type.toLowerCase() !== validarUser.TYPES.USER
  ) {
    res.status(400).send("Wrong type. Must be 'admin' or 'user'");
  } else {
    try {
      user.password = await encrypt.hashPassword(user.password);

      await executionContext(async (context) => {
        const { connection } = context;

        await userModel.addUsuario(connection, user);
        res.sendStatus(201);
      });
    } catch (exception) {
      if (Object.prototype.hasOwnProperty.call(exception, 'sqlMessage')) {
        res.status(400).send(exception.sqlMessage);
      } else {
        res.status(500).send(exception);
      }
    }
  }
}

/**
 * GET /api/usuario/:id
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getUsuario(req, res) {
  const id = req.params.userID;

  executionContext((context) => {
    const { connection } = context;

    userModel
      .getUsuario(connection, id)
      .then((val) => res.send(val[0]))
      .catch((err) => {
        if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
          res.status(400).send(err.sqlMessage);
        } else {
          res.status(500).send(err);
        }
      });
  });
}

/**
 * PATCH /api/usuario/password/:id
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function patchPassword(req, res) {
  const userId = req.params.userID;
  const data = req.body;

  if (req.userName !== userId && req.userType !== validarUser.TYPES.ADMIN) {
    res
      .status(400)
      .send(
        'You can only edit your own password unless your role type is Admin',
      );
    return;
  }

  const passEncrypt = await encrypt.hashPassword(data.password);

  executionContext((context) => {
    const { connection } = context;

    userModel
      .patchPassword(connection, userId, passEncrypt)
      .then((val) => {
        if (val.changedRows === 0) res.sendStatus(400);
        else res.sendStatus(200);
      })
      .catch((err) => {
        if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
          res.status(400).send(err.sqlMessage);
        } else {
          res.status(500).send(err);
        }
      });
  });
}

/**
 * PATCH /api/usuario/tipo/:id
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function patchType(req, res) {
  const userId = req.params.userID;
  const data = req.body;

  executionContext((context) => {
    const { connection } = context;

    userModel
      .patchType(connection, userId, data.type)
      .then((val) => {
        if (val.changedRows === 0) res.sendStatus(400);
        else res.sendStatus(200);
      })
      .catch((err) => {
        if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
          res.status(400).send(err.sqlMessage);
        } else {
          res.status(500).send(err);
        }
      });
  });
}

/**
 * DELETE /api/usuario/:id
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
function deleteUsuario(req, res) {
  const userId = req.params.userID;

  if (req.userName !== userId && req.userType !== validarUser.TYPES.ADMIN) {
    res
      .status(400)
      .send(
        'You can only delete your own account unless your role type is Admin',
      );
    return;
  }

  executionContext((context) => {
    const { connection } = context;

    userModel
      .deleteUsuario(connection, userId)
      .then(() => res.sendStatus(200))
      .catch((err) => {
        if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
          res.status(400).send(err.sqlMessage);
        } else {
          res.status(500).send(err);
        }
      });
  });
}

/**
 * GET /api/todos/usuarios
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
function getUsuarios(req, res) {
  executionContext((context) => {
    const { connection } = context;

    userModel
      .getUsuarios(connection)
      .then((val) => res.send(val))
      .catch((err) => {
        if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
          res.status(400).send(err.sqlMessage);
        } else {
          res.status(500).send(err);
        }
      });
  });
}

module.exports = {
  addUsuario,
  getUsuario,
  patchPassword,
  patchType,
  deleteUsuario,
  getUsuarios,
};
