/* eslint-disable no-restricted-globals */
/**
 * Módulo del controlador de node-values (valores).
 * Este archivo contiene todos los endpoints del controlador de node-values (valores).
 * @author Héctor Chávez Morales <hector.chavez.97@hotmail.com>
 */
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
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } else {
        res.status(500).send(err);
      }
    });
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
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } else {
        res.status(500).send(err);
      }
    });
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
      const ans = val[0].Exist;
      res.json(ans);
    })
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } else {
        res.status(500).send(err);
      }
    });
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
    .then(() => res.sendStatus(200))
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } else {
        res.status(500).send(err);
      }
    });
}

/**
 * PUT /api/node/:nodeID/sensor/:sensorID
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function addNodeSensor(req, res) {
  const nodeId = req.body.nodeID;
  const sensorId = req.body.sensorID;

  valuesController.addNodeSensor(nodeId, sensorId)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } else {
        res.status(500).send(err);
      }
    });
}

module.exports = {
  getSensores,
  getNodes,
  getNodeHasSensor,
  deleteNodeSensor,
  addNodeSensor,
};
