const valuesController = require('../db/values.model');

/**
 * GET /api/values/sensores/:nodeID
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getSensores(req, res) {
  const nodeId = req.params.nodeID;

  const data = await valuesController.getSensores(nodeId)
    .catch((err) => res.status(400).send(err));

  res.json(data);
}

/**
 * GET /api/values/nodes/:sensorID
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getNodes(req, res) {
  const sensorId = req.params.sensorID;

  const data = await valuesController.getNodes(sensorId).catch((err) => res.status(400).send(err));

  res.json(data);
}

/**
 * GET /api/node/:nodeID/sensor/:sensorID
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getNodeHasSensor(req, res) {
  const nodeId = req.params.nodeID;
  const sensorId = req.params.sensorID;

  const data = await valuesController.getNodeHasSensor(nodeId, sensorId)
    .catch((err) => res.sendStatus(400).send(err));

  res.json(data[0].Exist);
}

/**
 * DELETE /api/node/:nodeID/sensor/:sensorID
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function deleteNodeSensor(req, res) {
  const nodeId = req.params.nodeID;
  const sensorId = req.params.sensorID;

  const data = await valuesController.getNodeHasSensor(nodeId, sensorId)
    .catch((err) => res.sendStatus(400).send(err));

  res.json(data[0].Exist);
}

/**
 * PUT /api/node/:nodeID/sensor/:sensorID
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function putNodeSensor(req, res) {
  const nodeId = req.params.nodeID;
  const sensorId = req.params.sensorID;

  const data = await valuesController.getNodeHasSensor(nodeId, sensorId)
    .catch((err) => res.sendStatus(400).send(err));

  res.json(data[0].Exist);
}

module.exports = {
  getSensores,
  getNodes,
  getNodeHasSensor,
  deleteNodeSensor,
  putNodeSensor,
};
