const bcrypt = require('bcryptjs');

const saltRounds = 8;

function hashPassword(password) {
  return bcrypt.hash(password, saltRounds);
}

function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = {
  hashPassword,
  comparePassword,
};
