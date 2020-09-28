const { getConnection } = require('../config/dbConfig');

const QUERY_GET_NODO_VARIABLES = 'SELECT * FROM ValuesCatalog JOIN NodeValues  ON ValuesCatalog.id = NodeValues.id_value_catalog WHERE NodeValues.id_node = ?';

/**
 * Obtiene las variables de la base de datos.
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @param {string} idNodo Id del nodo a buscar
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getNodoVariables(idNodo) {
  const connection = await getConnection();
  const valuesToEscape = [
    idNodo,
  ];
  return new Promise((resolve, reject) => {
    connection.query(
      QUERY_GET_NODO_VARIABLES,
      valuesToEscape,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      },
    );
  });
}

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
      db.query(`SELECT * FROM Nodos WHERE id = ?`, 
      nodeId ,(err, results) => {
        if (err) return reject(err);
        
        return resolve(results);
      });
  }); 
}

async function getNodos() {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Nodos', (err, results, fields) => {
      console.log(fields);
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

async function putNodo(node){
  const db = await getConnection()

  return new Promise((resolve, reject) => {
      db.query(`UPDATE Nodos SET nombre = ?, direccion = ?, 
      longitud = ?, latitud = ?, descripcion = ? WHERE id = ?`, 
      [node.name, node.direccion, node.longitud, node.latitud, node.descripcion, node.id], 
      (err, results) => {
        if (err) return reject(err);
        
        return resolve(results);
      });
  });
}

module.exports = {
  getNodoVariables,
  getNodos,
  addNodo,
  getNodo,
  putNodo,
  deleteNodo,
};
