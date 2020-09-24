const { getConnection } = require("../config/dbConfig");

async function getSensores(nodeId) {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM ValuesCatalog v JOIN NodeValues n ON n.id_value_catalog = v.id
        WHERE n.id_node = ?`,
      nodeId,
      (err, results) => {
        if (err) return reject(err);

        return resolve(results);
      }
    );
  });
}

async function getNodes(sensorId) {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM Nodos n JOIN NodeValues nv ON nv.id_node = n.id
        WHERE nv.id_value_catalog = ?`,
      sensorId,
      (err, results) => {
        if (err) return reject(err);

        return resolve(results);
      }
    );
  });
}

async function getNodeHasSensor(nodeId, sensorId) {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query(
      `SELECT EXISTS(SELECT * FROM NodeValues 
        WHERE id_node = ? AND id_value_catalog = ?) AS Exist`,
      [nodeId, sensorId],
      (err, results) => {
        if (err) return reject(err);

        return resolve(results);
      }
    );
  });
}

async function deleteNodeSensor(nodeId, sensorId) {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query(
      `SELECT EXISTS(SELECT * FROM NodeValues 
        WHERE id_node = ? AND id_value_catalog = ?) AS Exist`,
      [nodeId, sensorId],
      (err, results) => {
        if (err) return reject(err);

        return resolve(results);
      }
    );
  });
}

async function putNodeSensor(nodeId, sensorId) {
  const db = await getConnection();

  return new Promise((resolve, reject) => {
    db.query(
      `SELECT EXISTS(SELECT * FROM NodeValues 
        WHERE id_node = ? AND id_value_catalog = ?) AS Exist`,
      [nodeId, sensorId],
      (err, results) => {
        if (err) return reject(err);

        return resolve(results);
      }
    );
  });
}

module.exports = {
  getSensores,
  getNodes,
  getNodeHasSensor,
  deleteNodeSensor,
  putNodeSensor,
};
