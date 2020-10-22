const jwt = require('jsonwebtoken');

/**
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
function auth(role) {
  return (req, res, next) => {
    const bearer = req.headers.authorization;

    if (bearer === undefined) {
      res.sendStatus(401);
      return;
    }

    const token = bearer.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEYPASS);
      const { type } = decoded;
      if (type === undefined) {
        res.status(400).send('Invalid token');
        return;
      }
      if (type === role) {
        next();
        return;
      }
      res.sendStatus(403);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };
}

module.exports = {
  auth,
};
