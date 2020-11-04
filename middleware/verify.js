const validarUser = require('../validators/usuario');
const e = require('express');

/**
 * @exports verify
 * @param {e.Request} req Request parameter.
 * @param {e.Response} res Response parameter.
 * @param {e.NextFunction} next Next
 */
function verify(req, res, next) {
  const type = req.userType;

  if (type === undefined) {
    res.status(400).send('Invalid token: User type must be provided');
    return;
  }

  if (type !== validarUser.TYPES.ADMIN) {
    res.status(401).send('Invalid user type');
    return;
  }

  next();
}

module.exports = {
  verify,
};
