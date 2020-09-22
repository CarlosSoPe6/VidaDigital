const { getConnection } = require('../config/dbConfig');

async function getUsuario(userID) {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM User
                    WHERE id = ?`, userID, (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

async function patchUsuario(userId, data) {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM User
                    WHERE username = ?`, userID, (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

async function deleteUsuario(userId) {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM User
                    WHERE username = ?`, userID, (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

async function getUsuarios() {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM User', userID, (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

async function getUsuarioByName(username) {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query(`ELECT * FROM User
                    WHERE username = ?`, userID, (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

module.exports = {
  getUsuario,
  patchUsuario,
  deleteUsuario,
  getUsuarios,
  getUsuarioByName,
};
