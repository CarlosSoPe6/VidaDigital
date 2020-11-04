const jwt = require('jsonwebtoken');
const e = require('express');

/**
 * @exports auth
 * @param {e.Request} req Request parameter.
 * @param {e.Response} res Response parameter.
 * @param {e.NextFunction} next Next
 */
function auth(req, res, next) {
  const bearer = req.headers.authorization;

  if (bearer === undefined) {
    res.sendStatus(401);
    return;
  }

  const token = bearer.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEYPASS);
    const { type } = decoded;
    const { username } = decoded;

    req.userType = type;
    req.userName = username;

    next();
  } catch (e) {
    res.status(418).send(e.message);
  }
}

module.exports = {
  auth,
};
