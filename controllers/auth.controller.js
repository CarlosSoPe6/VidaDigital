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
const encrypt = require('../config/encrypt');
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
    res.status(400).send('You must send username and password');
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
    res.status(401).send('The username or password you entered is incorrect');
    return;
  }

  const userHash = usuarioResult[0].password;
  const hashCompareResult = await encrypt.comparePassword(password, userHash);
  if (!hashCompareResult) {
    res.status(401).send('The username or password you entered is incorrect');
    return;
  }

  const { type } = usuarioResult[0];

  jwt.sign(
    { username, type },
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
