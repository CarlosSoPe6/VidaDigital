const { getConnection } = require('../config/dbConfig');

async function getUsuario(userId) {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM User WHERE username = ?',
      userId, (err, results) => {
        if (err) return reject(err);

        return resolve(results);
      });
  });
}

async function patchUsuario(userId, password) {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query(`UPDATE User SET password = ? 
    WHERE username = ?`,
    [userId, password], (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

async function deleteUsuario(userId) {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query('DELETE FROM User WHERE username = ?',
      userId, (err, results) => {
        if (err) return reject(err);

        return resolve(results);
      });
  });
}

async function getUsuarios() {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM User', (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

async function getUsuarioByName(username) {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM User WHERE username = ?',
      username, (err, results) => {
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
