const { getConnection } = require('../config/dbConfig');

async function addNodo(nodo) {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO Nodos 
              VALUES (?, ?, ?, ?, ?, ?)`,
    [nodo.id, nodo.nombre, nodo.direccion, nodo.longitud, nodo.latitud, nodo.descripcion],
    (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

async function getNodo(nodeId) {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Nodos WHERE id = ?', nodeId, (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

async function getNodos() {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Nodos', (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

async function deleteNodo(nodeId) {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query('DELETE FROM Nodos WHERE id = ?', nodeId, (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

async function putNodo(nodeId, nodeData) {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Nodos', (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

module.exports = {
  getNodos,
  addNodo,
  getNodo,
  putNodo,
  deleteNodo,
};
