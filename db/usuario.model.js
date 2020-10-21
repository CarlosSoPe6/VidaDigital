async function addUsuario(connection, user) {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO User VALUES (?, ?, ?)',
      [user.username, user.password, user.type], (err, results) => {
        if (err) return reject(err);

        return resolve(results);
      });
  });
}

async function getUsuario(connection, userId) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT username, type FROM User WHERE username = ?',
      userId, (err, results) => {
        if (err) return reject(err);

        return resolve(results);
      });
  });
}

async function patchPassword(connection, userId, password) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE User SET password = ? 
    WHERE username = ?`,
    [password, userId], (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

async function patchType(connection, userId, type) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE User SET type = ? 
    WHERE username = ?`,
    [type, userId], (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

async function deleteUsuario(connection, userId) {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM User WHERE username = ?',
      userId, (err, results) => {
        if (err) return reject(err);

        return resolve(results);
      });
  });
}

async function getUsuarios(connection) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT username, type FROM User', (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

module.exports = {
  addUsuario,
  getUsuario,
  patchPassword,
  patchType,
  deleteUsuario,
  getUsuarios,
};
