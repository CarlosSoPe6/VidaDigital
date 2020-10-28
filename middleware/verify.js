const validarUser = require('../validators/usuario');

/**
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 * @param {import('express').NextFunction} next Next
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
