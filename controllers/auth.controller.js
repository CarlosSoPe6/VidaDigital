/**
 * Módulo del controlador de autentificación.
 * Este archivo contiene todos los endpoints del controlador de autentificacion.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */

const jwt = require('jsonwebtoken');

const singOptions = require('../config/jwtToken');
const errorLog = require('../loggers/error');
const { executionContext } = require('../db/executionContext');
const { getUsuarioAuth } = require('../db/usuario.model');
/**
 * POST /api/auth/login
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function login(req, res) {
  const {
    username,
    password,
  } = req.body;
  let usuarioResult = {};
  if (username === undefined || password === undefined) {
    res.status(400).send('BAD REQUEST');
    return;
  }
  try {
    await executionContext(async (context) => {
      const { connection } = context;
      usuarioResult = await getUsuarioAuth(connection, username);
    });
  } catch (e) {
    errorLog(e.message);
    res.status(500).send(e.message);
    return;
  }

  if (usuarioResult.length === 0) {
    res.sendStatus(400);
  }
  // const usuario = usuarioResult[0];
  // const userHash = usuario.password;

  jwt.sign(
    { username },
    process.env.JWT_KEYPASS,
    singOptions,
    (err, encoded) => {
      if (err) {
        errorLog(err.message);
        res.sendStatus(500);
        return;
      }
      res.status(201).send({ encoded });
    },
  );
}

/**
 * DELETE /api/auth/logout
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function logout(req, res) {
  res.sendStatus(200);
}

module.exports = {
  login,
  logout,
};
