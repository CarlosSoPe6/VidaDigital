const { getConnection } = require('../config/dbConfig');

async function addUsuario(user) {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query('INSERT INTO User VALUES (?, ?, ?)',
      [user.username, user.password, user.type], (err, results) => {
        if (err) return reject(err);

        return resolve(results);
      });
  });
}

async function getUsuario(userId) {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query('SELECT username, type FROM User WHERE username = ?',
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
    [password, userId], (err, results) => {
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
    db.query('SELECT username, type FROM User', (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

/**
 * Crea un registro de lectura
 * @throws {import('mysql').MysqlError}
 * @param {import('mysql').PoolConnection} connection Conexión a usar
 * @param {string} username Usuario a buscar
 */
async function getUsuarioAuth(connection, username) {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * from User WHERE username = ? LIMIT 1',
      [username],
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      },
    );
  });
}

module.exports = {
  addUsuario,
  getUsuario,
  patchUsuario,
  deleteUsuario,
  getUsuarios,
  getUsuarioAuth,
};
