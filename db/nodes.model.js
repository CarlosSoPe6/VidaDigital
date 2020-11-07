const QUERY_GET_NODO_VARIABLES = 'SELECT * FROM ValuesCatalog JOIN NodeValues ON ValuesCatalog.id = NodeValues.id_value_catalog WHERE NodeValues.id_node = ?';

/**
 * Obtiene las variables de la base de datos.
 * @async
 * @exports getNodoVariables
 * @throws {mysql.MysqlError}
 * @param {mysql.PoolConnection} connection Id del nodo a buscar
 * @param {string} idNodo Id del nodo a buscar
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getNodoVariables(connection, idNodo) {
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

async function addNodo(connection, nodo) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO Nodos 
              VALUES (?, ?, ?, ?, ?, ?)`,
    [nodo.id, nodo.nombre, nodo.direccion, nodo.longitud, nodo.latitud, nodo.descripcion],
    (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

async function getNodo(connection, nodeId) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Nodos WHERE id = ?',
      nodeId, (err, results) => {
        if (err) return reject(err);

        return resolve(results);
      });
  });
}

async function getNodos(connection) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Nodos', (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

async function deleteNodo(connection, nodeId) {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM Nodos WHERE id = ?', nodeId, (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

async function putNodo(connection, node) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE Nodos SET nombre = ?, direccion = ?, 
      longitud = ?, latitud = ?, descripcion = ? WHERE id = ?`,
    [node.nombre, node.direccion, node.longitud, node.latitud, node.descripcion, node.id],
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
