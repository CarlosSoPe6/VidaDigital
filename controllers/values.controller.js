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

  valuesController.getSensores(nodeId)
    .then((val) => res.send(val))
    .catch((err) => res.status(400).send(err));
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

  valuesController.getNodes(sensorId)
    .then((val) => res.send(val))
    .catch((err) => res.status(400).send(err));
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

  valuesController.getNodeHasSensor(nodeId, sensorId)
    .then((val) => {
      const ans = val[0].Exist
      res.json(ans)
    })
    .catch((err) => res.sendStatus(400).send(err));
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

  valuesController.deleteNodeSensor(nodeId, sensorId)
    .then((val) => res.send(val))
    .catch((err) => res.sendStatus(400).send(err));
}

/**
 * PUT /api/node/:nodeID/sensor/:sensorID
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function postNodeSensor(req, res) {
  const nodeId = req.body.nodeID;
  const sensorId = req.body.sensorID;
  
  valuesController.postNodeSensor(nodeId, sensorId)
  .then((val) => res.status(201).send(val))
  .catch((err) =>{
    if (err.code === 'ER_NO_REFERENCED_ROW_2'){
      res.status(400).send(err.sqlMessage)
    }  
    else{
      res.status(500).send(err)
    } 
  })
}

module.exports = {
  getSensores,
  getNodes,
  getNodeHasSensor,
  deleteNodeSensor,
  postNodeSensor,
};
