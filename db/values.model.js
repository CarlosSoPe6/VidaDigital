async function getSensores(connection, nodeId) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ValuesCatalog v JOIN NodeValues n ON n.id_value_catalog = v.id
        WHERE n.id_node = ?`,
      nodeId, (err, results) => {
        if (err) return reject(err);

        return resolve(results);
      },
    );
  });
}

async function getNodes(connection, sensorId) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Nodos n JOIN NodeValues nv ON nv.id_node = n.id
        WHERE nv.id_value_catalog = ?`,
      sensorId, (err, results) => {
        if (err) return reject(err);

        return resolve(results);
      },
    );
  });
}

async function getNodeHasSensor(connection, nodeId, sensorId) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT EXISTS(SELECT * FROM NodeValues 
        WHERE id_node = ? AND id_value_catalog = ?) AS Exist`,
      [nodeId, sensorId], (err, results) => {
        if (err) return reject(err);

        return resolve(results);
      },
    );
  });
}

async function deleteNodeSensor(connection, nodeId, sensorId) {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM NodeValues 
    WHERE id_node = ? AND id_value_catalog = ?`,
    [nodeId, sensorId], (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

async function addNodeSensor(connection, nodeId, sensorId) {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO NodeValues VALUES (?, ?)',
      [nodeId, sensorId], (err, results) => {
        if (err) return reject(err);

        return resolve(results);
      });
  });
}

async function deleteAllNodeSensors(connection, nodeId) {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM NodeValues WHERE id_node = ?',
      nodeId, (err, results) => {
        if (err) return reject(err);

        return resolve(results);
      });
  });
}

module.exports = {
  getSensores,
  getNodes,
  getNodeHasSensor,
  deleteNodeSensor,
  addNodeSensor,
  deleteAllNodeSensors,
};
